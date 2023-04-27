import { hexFromArgb, TonalPalette } from "@material/material-color-utilities";
import { Theme } from "./create_theme";
import { kebab } from "./kebab_case";

const schemeColors = (scheme: Record<string, number>, mode: string) => {
  const result: Record<string, string> = {};

  for (const key in scheme) {
    result[`${kebab(key)}-${mode}`] = hexFromArgb(scheme[key]);
  }

  return result;
};

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
const paletteColors = (palette: Record<string, TonalPalette>) => {
  const result: Record<string, string> = {};

  for (const key in palette) {
    tones.forEach((tone) => {
      result[`${key}-${tone}`] = hexFromArgb(palette[key].tone(tone));
    });
  }

  return result;
};

export const colors = (m3Theme: Theme) => {
  return {
    ...schemeColors(m3Theme.schemes.light, "light"),
    ...schemeColors(m3Theme.schemes.dark, "dark"),
    ...paletteColors(m3Theme.palettes),
  };
};
