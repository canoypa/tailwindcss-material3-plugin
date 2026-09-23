import plugin, { type Config, type PluginCreator } from 'tailwindcss/plugin'
import { borderRadius, outlineOffset, outlineWidth } from './border'
import { makeColors, type ColorOptions } from './color'
import { opacity } from './opacity'
import { screens } from './screens'
import { boxShadow } from './shadow'
import { spacing } from './spacing'
import {
  makeTransitionDuration,
  makeTransitionTimingFunction,
  type MotionScheme,
} from './transition'
import {
  fontWeight,
  makeFontFamily,
  makeFontSize,
  type LanguageHeight,
  type Typeface,
} from './typography'

export type { CustomColor, SchemeVariant } from './color'
export type { MotionScheme } from './transition'
export type { LanguageHeight, Typeface } from './typography'

export type Options = ColorOptions & {
  motionScheme?: MotionScheme
  languageHeight?: LanguageHeight
  typeface?: Typeface
}

export const material3 = (
  options: Options,
): { handler: PluginCreator; config?: Partial<Config> } => {
  const {
    sourceColor,
    motionScheme = 'standard',
    languageHeight = 'medium',
    typeface = {},
  } = options

  if (
    !Number.isInteger(sourceColor) ||
    sourceColor < 0 ||
    sourceColor > 0xffffff
  ) {
    throw new Error('Invalid source color.')
  }

  const colors = makeColors(options)

  return plugin(
    ({ addBase }) => {
      addBase({
        ':root': {
          ...colors.lightVariables,
          '@variant dark': colors.darkVariables,
        },
      })
    },
    {
      theme: {
        extend: {
          colors: colors.theme,
          screens,
          borderRadius,
          outlineWidth,
          outlineOffset,
          boxShadow,
          opacity,
          spacing,
          fontSize: makeFontSize(languageHeight),
          fontFamily: makeFontFamily(typeface),
          fontWeight,
          transitionDuration: makeTransitionDuration(motionScheme),
          transitionTimingFunction: makeTransitionTimingFunction(motionScheme),
        },
      },
    },
  )
}
