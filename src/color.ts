import { hexFromArgb, TonalPalette } from '@material/material-color-utilities'
import { Theme } from './create_theme'
import { kebab } from './kebab_case'

const schemeColors = (scheme: Record<string, number>) => {
  const result: Record<string, string> = {}

  for (const key in scheme) {
    result[kebab(key)] = hexFromArgb(scheme[key])
  }

  return result
}

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
const paletteColors = (palette: Record<string, TonalPalette>) => {
  const result: Record<string, string> = {}

  for (const key in palette) {
    tones.forEach((tone) => {
      result[`${key}-${tone}`] = hexFromArgb(palette[key].tone(tone))
    })
  }

  return result
}

export const colors = (m3Theme: Theme) => {
  return {
    light: schemeColors(m3Theme.schemes.light),
    dark: schemeColors(m3Theme.schemes.dark),
    ...paletteColors(m3Theme.palettes),
  }
}

export const cssVariables = (m3Theme: Theme) => {
  const light: Record<string, string> = {}
  const dark: Record<string, string> = {}
  const ref: Record<string, string> = {}

  for (const key in m3Theme.schemes.light) {
    light[`--md-sys-color-${kebab(key)}`] = hexFromArgb(m3Theme.schemes.light[key])
  }

  for (const key in m3Theme.schemes.dark) {
    dark[`--md-sys-color-${kebab(key)}`] = hexFromArgb(m3Theme.schemes.dark[key])
  }

  for (const key in m3Theme.palettes) {
    tones.forEach((tone) => {
      ref[`--md-ref-palette-${kebab(key)}${tone}`] = hexFromArgb(m3Theme.palettes[key].tone(tone))
    })
  }

  return { light, dark, ref }
}
