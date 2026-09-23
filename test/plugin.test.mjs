import { test } from 'node:test'
import { material3 } from '../dist/index.mjs'
import { build, configCss, pluginCss } from './compile.mjs'

const sourceColor = 0x8282f4

// Stored as plain CSS so that snapshot diffs are readable. The banner line
// holds the Tailwind version, which would change the snapshot on every upgrade.
function snapshot(t, css, name) {
  const body = css.slice(css.indexOf('\n') + 1)
  t.assert.fileSnapshot(body, new URL(`__snapshots__/${name}.css`, import.meta.url).pathname, {
    serializers: [(value) => value],
  })
}

// Every key the plugin adds to a theme, as a class of the utility that reads it.
function candidatesOf(plugin) {
  const theme = plugin.config.theme.extend
  const utilities = {
    screens: (key) => `${key}:p-1`,
    borderRadius: (key) => `rounded-${key}`,
    outlineWidth: (key) => `outline-${key}`,
    outlineOffset: (key) => `outline-offset-${key}`,
    boxShadow: (key) => `shadow-${key}`,
    opacity: (key) => `opacity-${key}`,
    spacing: (key) => `p-${key}`,
    fontSize: (key) => `text-${key}`,
    fontFamily: (key) => `font-${key}`,
    fontWeight: (key) => `font-${key}`,
    transitionDuration: (key) => `duration-${key}`,
    transitionTimingFunction: (key) => `ease-${key}`,
  }
  const candidates = Object.entries(utilities).flatMap(([name, toClass]) => Object.keys(theme[name]).map(toClass))
  const colors = Object.keys(theme.colors.md).filter((key) => typeof theme.colors.md[key] === 'string')
  candidates.push(...colors.map((key) => `bg-md-${key}`))
  for (const mode of ['light', 'dark']) {
    candidates.push(...Object.keys(theme.colors.md[mode]).map((key) => `bg-md-${mode}-${key}`))
  }
  return candidates
}

test('output', async (t) => {
  const plugin = material3({
    sourceColor,
    customColors: [
      { name: 'info', value: 0x42a5f5, blend: true },
      { name: 'warning', value: 0xffee58 },
      { name: 'success', value: 0x66bb6a, fidelity: true },
    ],
  })
  const candidates = candidatesOf(plugin)
  const css = await build(pluginCss, plugin, [...candidates, 'bg-md-primary/40', 'bg-md-on-surface/md-hover'])

  for (const candidate of candidates) {
    const selector = '.' + candidate.replace(/[:/]/g, '\\$&').replace(/^(\d)/, '\\3$1 ')
    t.assert.ok(css.includes(selector), `${candidate} is not generated`)
  }
  snapshot(t, css, 'output')
})

test('options', async (t) => {
  const plugin = material3({
    sourceColor,
    variant: 'expressive',
    contrastLevel: 0.5,
    motionScheme: 'expressive',
    languageHeight: 'small',
    typeface: { brand: 'Comfortaa, sans-serif', plain: 'Roboto, sans-serif' },
    customColors: [{ name: 'info', value: 0x42a5f5 }],
  })
  const css = await build(pluginCss, plugin, [
    'bg-md-primary',
    'bg-md-info',
    'text-md-title-large',
    'text-md-body-large',
    'text-md-emphasized-display-large',
    'text-md-variable-body-medium',
    'text-md-variable-emphasized-label-large',
    'font-md-brand',
    'font-md-plain',
    'ease-md-spring-fast-spatial',
    'duration-md-spring-slow-spatial',
  ])
  snapshot(t, css, 'options')
})

test('dark colors follow the dark variant through @config', async (t) => {
  const plugin = material3({ sourceColor })
  const css = await build(`${configCss}\n@custom-variant dark (&:where(.dark, .dark *));`, plugin, [])
  t.assert.match(css, /:root \{\n\s+--md-sys-color-background: #[0-9a-f]{6};[^]*&:where\(\.dark, \.dark \*\) \{\n\s+--md-sys-color-background: #[0-9a-f]{6};/)
  t.assert.doesNotMatch(css, /prefers-color-scheme/)
})

test('dark mode redefines only the colors that change', async (t) => {
  for (const variant of ['tonal-spot', 'vibrant', 'expressive', 'neutral']) {
    const plugin = material3({ sourceColor, variant, customColors: [{ name: 'info', value: 0x42a5f5 }] })
    const { light, dark } = plugin.config.theme.extend.colors.md
    const changed = Object.keys(light).filter((key) => light[key] !== dark[key])
    const css = await build(pluginCss, plugin, [])
    const darkBlock = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'))
    const redefined = [...darkBlock.matchAll(/--md-(?:sys-color|ref-palette)-([\w-]+):/g)].map((m) => m[1])
    t.assert.deepStrictEqual(redefined.sort(), changed.sort(), variant)
  }
})

test('invalid input', (t) => {
  const make = (options) => () => material3({ sourceColor, ...options })
  const invalid = [
    { sourceColor: 0x1000000 },
    { sourceColor: -1 },
    { sourceColor: 1.5 },
    { sourceColor: NaN },
    { sourceColor: '0x648d24' },
    { customColors: [{ name: 'brand', value: 0xff0000 }, { name: 'brand2', value: 0x00ff00 }] },
    { customColors: [{ name: 'surface', value: 0xff0000 }] },
    { customColors: [{ name: 'blue', value: 0x2196f3 }, { name: 'light-blue', value: 0x03a9f4 }] },
    { customColors: [{ name: 'dark', value: 0x000000 }] },
    { customColors: [{ name: 'DEFAULT', value: 0xff0000 }] },
    { customColors: [{ name: 'a}b', value: 0xff0000 }] },
    { variant: 'fidelity' },
    { motionScheme: 'fast' },
    { languageHeight: 'extraLarge' },
  ]
  for (const options of invalid) t.assert.throws(make(options), undefined, JSON.stringify(options))
})
