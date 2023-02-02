import {
  CorePalette,
  hexFromArgb,
  Scheme,
  Theme,
  TonalPalette,
} from "@material/material-color-utilities";
import kebab from "kebab-case";

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

type CustomColors = {
  light: Record<string, string>;
  dark: Record<string, string>;
  palette: Record<string, Record<number, string>>;
};
export const colors = (m3Theme: Theme) => {
  const customColors = m3Theme.customColors.reduce<CustomColors>(
    (p, c) => {
      const tones = CorePalette.of(c.value).a1;

      return {
        light: {
          ...p.light,
          [c.color.name]: hexFromArgb(tones.tone(40)),
          [`on-${c.color.name}`]: hexFromArgb(tones.tone(100)),
          [`${c.color.name}-container`]: hexFromArgb(tones.tone(90)),
          [`on-${c.color.name}-container`]: hexFromArgb(tones.tone(10)),
        },
        dark: {
          ...p.dark,
          [c.color.name]: hexFromArgb(tones.tone(80)),
          [`on-${c.color.name}`]: hexFromArgb(tones.tone(20)),
          [`${c.color.name}-container`]: hexFromArgb(tones.tone(30)),
          [`on-${c.color.name}-container`]: hexFromArgb(tones.tone(90)),
        },
        palette: {
          ...p.palette,
          ...paletteColors(tones),
        },
      };
    },
    { light: {}, dark: {}, palette: {} }
  );

  return {
    light: {
      ...schemeColors(m3Theme.schemes.light),
      ...customColors.light,
    },
    dark: {
      ...schemeColors(m3Theme.schemes.dark),
      ...customColors.dark,
    },

    palette: {
      primary: paletteColors(m3Theme.palettes.primary),
      secondary: paletteColors(m3Theme.palettes.secondary),
      tertiary: paletteColors(m3Theme.palettes.tertiary),
      neutral: paletteColors(m3Theme.palettes.neutral),
      "neutral-variant": paletteColors(m3Theme.palettes.neutralVariant),
      error: paletteColors(m3Theme.palettes.error),
      ...customColors.palette,
    },
  };
};
