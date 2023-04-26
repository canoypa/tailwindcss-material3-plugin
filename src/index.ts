import { CustomColor } from "@material/material-color-utilities";
import plugin from "tailwindcss/plugin";
import { borderColor, borderRadius } from "./border";
import { colors } from "./color";
import { createTheme } from "./create_theme";
import { opacity } from "./opacity";
import { screens } from "./screens";
import { boxShadow, boxShadowColor } from "./shadow";
import { transitionDuration, transitionTimingFunction } from "./transition";
import { typography } from "./typography";
import { zIndex } from "./z-index";

export type Material3PluginOptions = {
  sourceColor: number;
  customColors: CustomColor[];
};

export const Material3Plugin = ({
  sourceColor,
  customColors,
}: Material3PluginOptions) => {
  if (typeof sourceColor !== "number" || sourceColor > 0xffffff) {
    throw new Error("Invalid source color.");
  }

  const m3Theme = createTheme({ sourceColor, customColors });

  return plugin(({}) => {}, {
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
  });
};
