import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tailwindDir = path.join(root, 'node_modules/tailwindcss')

// Leaves out preflight so that snapshots only hold what the plugin adds.
export const pluginCss = `
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@plugin "material3";
`

export const configCss = pluginCss.replace('@plugin "material3";', '@config "./tailwind.config.js";')

export async function build(css, plugin, candidates) {
  const compiler = await compile(css, {
    base: root,
    loadStylesheet: async (id, base) => {
      const file = id.startsWith('tailwindcss/') ? path.join(tailwindDir, id.slice('tailwindcss/'.length)) : path.resolve(base, id)
      return { path: file, base: path.dirname(file), content: fs.readFileSync(file, 'utf8') }
    },
    loadModule: async (id, base, resourceHint) => ({
      path: id,
      base,
      module: resourceHint === 'config' ? { plugins: [plugin] } : plugin,
    }),
  })
  return compiler.build(candidates)
}
