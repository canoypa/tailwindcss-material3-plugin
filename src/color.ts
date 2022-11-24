import {
  hexFromArgb,
  Scheme,
  Theme,
  TonalPalette,
} from "@material/material-color-utilities";
import kebab from "kebab-case";
import { ThemeConfig } from "tailwindcss/types/config";

const schemeColors = (scheme: Scheme) => {
  const schemeJson = scheme.toJSON();
  const toEntries = Object.entries(schemeJson);
  const mapEntries = toEntries.map(([key, value]) => {
    return [kebab(key), hexFromArgb(value)];
  });
  const toObject = Object.fromEntries(mapEntries);

  return toObject;
};

const paletteColors = (palette: TonalPalette) => {
  const tones = [
    0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
  ];
  const map = tones.map((tone) => [tone, hexFromArgb(palette.tone(tone))]);
  const toObject = Object.fromEntries(map);

  return toObject;
};

export const colors = (m3Theme: Theme) => ({
  light: schemeColors(m3Theme.schemes.light),
  dark: schemeColors(m3Theme.schemes.dark),

  palette: {
    primary: paletteColors(m3Theme.palettes.primary),
    secondary: paletteColors(m3Theme.palettes.secondary),
    tertiary: paletteColors(m3Theme.palettes.tertiary),
    neutral: paletteColors(m3Theme.palettes.neutral),
    "neutral-variant": paletteColors(m3Theme.palettes.neutralVariant),
    error: paletteColors(m3Theme.palettes.error),
  },
});

export const backgroundColor: ThemeConfig["backgroundColor"] = ({ theme }) => ({
  "surface-1": theme("colors.primary / 5%"),
  "surface-2": theme("colors.primary / 8%"),
  "surface-3": theme("colors.primary / 11%"),
  "surface-4": theme("colors.primary / 12%"),
  "surface-5": theme("colors.primary / 14%"),
});
