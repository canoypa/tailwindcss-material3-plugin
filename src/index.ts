import { themeFromSourceColor } from "@material/material-color-utilities";
import plugin from "tailwindcss/plugin";
import { borderColor, borderRadius } from "./border";
import { backgroundColor, colors } from "./color";
import { opacity } from "./opacity";
import { screens } from "./screens";
import { boxShadow, boxShadowColor } from "./shadow";
import { transitionDuration, transitionTimingFunction } from "./transition";
import { typography } from "./typography";

export type Material3PluginOptions = {
  sourceColor: number;
};

export const Material3Plugin = plugin.withOptions<Material3PluginOptions>(
  (options) =>
    ({ addComponents, theme }) => {
      addComponents({
        ".elevation-1": {
          boxShadow: theme("boxShadow.1"),
          backgroundColor: theme("backgroundColor.surface-1"),
        },
        ".elevation-2": {
          boxShadow: theme("boxShadow.2"),
          backgroundColor: theme("backgroundColor.surface-2"),
        },
        ".elevation-3": {
          boxShadow: theme("boxShadow.3"),
          backgroundColor: theme("backgroundColor.surface-3"),
        },
        ".elevation-4": {
          boxShadow: theme("boxShadow.4"),
          backgroundColor: theme("backgroundColor.surface-4"),
        },
        ".elevation-5": {
          boxShadow: theme("boxShadow.5"),
          backgroundColor: theme("backgroundColor.surface-5"),
        },
      });
    },
  (options) => {
    const source = options.sourceColor;

    if (typeof source !== "number" && source > 0xffffff) {
      throw new Error("Invalid source color.");
    }

    const m3Theme = themeFromSourceColor(options.sourceColor);

    return {
      theme: {
        screens: screens,
        colors: colors(m3Theme),
        borderRadius: borderRadius,
        borderColor: borderColor,
        boxShadow: boxShadow,
        boxShadowColor: boxShadowColor,
        fontSize: typography,
        transitionDuration: transitionDuration,
        transitionTimingFunction: transitionTimingFunction,
        extend: {
          opacity: opacity,
          backgroundColor: backgroundColor,
        },
      },
    };
  }
);

export default Material3Plugin;
