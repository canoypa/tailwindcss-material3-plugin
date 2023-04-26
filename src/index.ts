import {
  CustomColor,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import plugin from "tailwindcss/plugin";
import { borderColor, borderRadius } from "./border";
import { colors } from "./color";
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

export const Material3Plugin = plugin.withOptions<Material3PluginOptions>(
  (options) =>
    ({ addComponents, theme }) => {},
  (options) => {
    const source = options.sourceColor;

    if (typeof source !== "number" && source > 0xffffff) {
      throw new Error("Invalid source color.");
    }

    const m3Theme = themeFromSourceColor(
      options.sourceColor,
      options.customColors
    );

    return {
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
    };
  }
);
