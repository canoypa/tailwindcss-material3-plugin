export type LanguageHeight = 'small' | 'medium' | 'large' | 'extra-large'

export type Typeface = { brand?: string; plain?: string }

type TypeStyle = {
  size: number
  lineHeight: Record<LanguageHeight, number>
  weight: number
  tracking: number
  emphasized: { weight: number; tracking: number; variableWeight: number }
}

// px values from m3.material.io type scale tokens, 3P (non-Google) audience.
// prettier-ignore
const typeScale: Record<string, TypeStyle> = {
  'display-large': { size: 57, lineHeight: { small: 64, medium: 73, large: 89, 'extra-large': 120 }, weight: 400, tracking: -0.25, emphasized: { weight: 500, tracking: -0.25, variableWeight: 500 } },
  'display-medium': { size: 45, lineHeight: { small: 52, medium: 56, large: 71, 'extra-large': 99 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'display-small': { size: 36, lineHeight: { small: 44, medium: 47, large: 57, 'extra-large': 80 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-large': { size: 32, lineHeight: { small: 40, medium: 42, large: 50, 'extra-large': 75 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-medium': { size: 28, lineHeight: { small: 36, medium: 38, large: 45, 'extra-large': 66 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-small': { size: 24, lineHeight: { small: 32, medium: 35, large: 41, 'extra-large': 59 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'body-large': { size: 16, lineHeight: { small: 24, medium: 27, large: 31, 'extra-large': 41 }, weight: 400, tracking: 0.5, emphasized: { weight: 500, tracking: 0.5, variableWeight: 500 } },
  'body-medium': { size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 35 }, weight: 400, tracking: 0.25, emphasized: { weight: 500, tracking: 0.25, variableWeight: 500 } },
  'body-small': { size: 12, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 30 }, weight: 400, tracking: 0.4, emphasized: { weight: 500, tracking: 0.4, variableWeight: 500 } },
  'label-large': { size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 36 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1, variableWeight: 600 } },
  'label-medium': { size: 12, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 30 }, weight: 500, tracking: 0.5, emphasized: { weight: 700, tracking: 0.5, variableWeight: 600 } },
  'label-small': { size: 11, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 29 }, weight: 500, tracking: 0.5, emphasized: { weight: 700, tracking: 0.5, variableWeight: 600 } },
  'title-large': { size: 22, lineHeight: { small: 28, medium: 31, large: 36, 'extra-large': 53 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'title-medium': { size: 16, lineHeight: { small: 24, medium: 27, large: 31, 'extra-large': 42 }, weight: 500, tracking: 0.15, emphasized: { weight: 700, tracking: 0.15, variableWeight: 600 } },
  'title-small': { size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 36 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1, variableWeight: 600 } },
}

const rem = (px: number) => `${px / 16}rem`
const em = (tracking: number, size: number) => `${tracking / size}em`

type FontSize = [
  string,
  { lineHeight: string; letterSpacing: string; fontWeight: number },
]

export function makeFontSize(languageHeight: LanguageHeight) {
  if (!Object.hasOwn(typeScale['body-large'].lineHeight, languageHeight)) {
    throw new Error(
      `Unknown languageHeight "${languageHeight}". Expected one of: ${Object.keys(typeScale['body-large'].lineHeight).join(', ')}.`,
    )
  }
  const fontSize: Record<string, FontSize> = {}

  for (const [name, style] of Object.entries(typeScale)) {
    const size = rem(style.size)
    const lineHeight = rem(style.lineHeight[languageHeight])

    const variants: Record<string, FontSize> = {
      [`md-${name}`]: [
        size,
        {
          lineHeight,
          letterSpacing: em(style.tracking, style.size),
          fontWeight: style.weight,
        },
      ],
      [`md-emphasized-${name}`]: [
        size,
        {
          lineHeight,
          letterSpacing: em(style.emphasized.tracking, style.size),
          fontWeight: style.emphasized.weight,
        },
      ],
      // Tracking is 0 for every style in the variable type scale.
      [`md-variable-${name}`]: [
        size,
        { lineHeight, letterSpacing: '0em', fontWeight: style.weight },
      ],
      [`md-variable-emphasized-${name}`]: [
        size,
        {
          lineHeight,
          letterSpacing: '0em',
          fontWeight: style.emphasized.variableWeight,
        },
      ],
    }

    Object.assign(fontSize, variants)
  }

  return fontSize
}

export function makeFontFamily(typeface: Typeface) {
  const fontFamily: Record<string, string> = {}
  for (const [role, value] of Object.entries(typeface)) {
    if (value) fontFamily[`md-${role}`] = value
  }
  return fontFamily
}

export const fontWeight = {
  'md-label-large-weight-prominent': '700',
  'md-label-medium-weight-prominent': '700',
}
