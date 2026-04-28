import { CustomColor } from '@material/material-color-utilities'
import plugin, { type Config, type PluginCreator } from 'tailwindcss/plugin'
import { borderColor, borderRadius } from './border'
import { colors, cssVariables } from './color'
import { createTheme } from './create_theme'
import { opacity } from './opacity'
import { screens } from './screens'
import { boxShadow, boxShadowColor } from './shadow'
import { transitionDuration, transitionTimingFunction } from './transition'
import { typography } from './typography'
import { zIndex } from './z-index'

export type Options = {
  sourceColor: number
  customColors: CustomColor[]
}

export const material3 = ({ sourceColor, customColors }: Options): { handler: PluginCreator; config?: Partial<Config> } => {
  if (typeof sourceColor !== 'number' || sourceColor > 0xffffff) {
    throw new Error('Invalid source color.')
  }

  const m3Theme = createTheme({ sourceColor, customColors })
  const { light, dark, ref } = cssVariables(m3Theme)

  return plugin(({ addBase }) => {
    addBase({
      ':root': { ...ref, ...light },
      '@media (prefers-color-scheme: dark)': {
        ':root': dark,
      },
    })
  }, {
    theme: {
      screens: screens,
      borderRadius: borderRadius,
      borderColor: borderColor,
      boxShadow: boxShadow,
      boxShadowColor: boxShadowColor,
      fontSize: typography,
      transitionDuration: transitionDuration,
      transitionTimingFunction: transitionTimingFunction,
      zIndex: zIndex,
      extend: {
        opacity: opacity,
        colors: colors(m3Theme),
      },
    },
  })
}
