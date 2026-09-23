# Tailwindcss Material3 Plugin

Material Design 3 tokens for Tailwind CSS v4, with colors generated from a source color by [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) (2025 color spec).

## Usage

### CSS-first

```js
// m3-plugin.js
import { material3 } from "tailwindcss-material3-plugin";

export default material3({
  sourceColor: 0x8282f4,
  customColors: [{ name: "info", value: 0x42a5f5, blend: true }],
});
```

```css
/* app.css */
@import "tailwindcss";
@plugin "./m3-plugin.js";
```

### JS config

```js
// tailwind.config.js
import { material3 } from "tailwindcss-material3-plugin";

export default {
  plugins: [
    material3({
      sourceColor: 0x8282f4,
      customColors: [{ name: "info", value: 0x42a5f5, blend: true }],
    }),
  ],
};
```

```css
/* app.css */
@import "tailwindcss";
@config "./tailwind.config.js";
```

```html
<div class="bg-md-surface text-md-on-surface text-md-body-medium">Hello World!</div>
```

Every class carries the `md-` prefix and follows the Material Design token name (`md.sys.color.primary` → `bg-md-primary`). Tailwind's own theme is extended, not replaced.

## Dark mode

`md-{role}` colors read CSS variables (`--md-sys-color-*`, `--md-ref-palette-*`) set on `:root`, and switch to the dark scheme with Tailwind's `dark` variant. By default that follows the OS setting. To switch with a class, redefine the variant:

```css
@import "tailwindcss";
@plugin "./m3-plugin.js";
@custom-variant dark (&:where(.dark, .dark *));
```

The variables are set on `:root`, so the variant has to match the root element itself: `&:where(.dark, .dark *)` works with `class="dark"` on `<html>`, but `&:is(.dark *)` never matches `:root`, and a `.dark` class on a subtree does not switch these colors.

A specific mode can be used with `md-light-` / `md-dark-`, e.g. `bg-md-dark-surface`.

## Options

| Option           | Default        | Description |
| ---------------- | -------------- | ----------- |
| `sourceColor`    | (required)     | Source color as an RGB number. |
| `customColors`   | `[]`           | Extra color roles. `blend: true` harmonizes the color with `sourceColor`; `fidelity: true` makes the container tone match the input color. |
| `variant`        | `"tonal-spot"` | Dynamic color scheme: `"tonal-spot"`, `"vibrant"`, `"expressive"` or `"neutral"`. |
| `contrastLevel`  | `0`            | `-1` (reduced) to `1` (high). `0.5` is medium contrast. |
| `motionScheme`   | `"standard"`   | Spring motion scheme: `"standard"` or `"expressive"`. |
| `languageHeight` | `"medium"`     | Line heights for the script: `"small"` (Latin, Cyrillic, Greek, Hebrew), `"medium"` (CJK, Arabic, Thai and most other scripts), `"large"` (Burmese, Telugu) or `"extra-large"` (Nastaliq). |
| `typeface`       | `{}`           | `{ brand?, plain? }` font-family values, available as `font-md-brand` / `font-md-plain`. Material uses brand for display, headline and title-large, and plain for the rest. The type scale classes do not set the font family, so combine them, e.g. `font-md-brand text-md-display-large`. Loading the fonts is up to you. |

## Tokens

| Material token                                  | Class |
| ----------------------------------------------- | ----- |
| `md.sys.color.primary`                          | `bg-md-primary`, `text-md-primary`, … (`md-light-primary`, `md-dark-primary`) |
| `md.ref.palette.primary40`                      | `bg-md-primary40` (`md-light-primary40`, `md-dark-primary40`) |
| `md.sys.typescale.body-large`                   | `text-md-body-large` |
| `md.sys.typescale.emphasized.body-large`        | `text-md-emphasized-body-large` |
| `md.sys.typescale.variable.body-large`          | `text-md-variable-body-large`, `text-md-variable-emphasized-body-large` |
| `md.sys.typescale.label-large.weight.prominent` | `font-md-label-large-weight-prominent` |
| `md.ref.typeface.brand`                         | `font-md-brand` |
| `md.sys.shape.corner.medium`                    | `rounded-md-medium` |
| `md.sys.elevation.level1`                       | `shadow-md-level1` |
| `md.sys.state.hover.state-layer-opacity`        | `opacity-md-hover`, `bg-md-on-surface/md-hover` |
| `md.sys.measurement.space100`                   | `p-md-space100`, `gap-md-space100`, … |
| `md.sys.state.focus-indicator.thickness`        | `outline-md-focus-indicator-thickness` |
| `md.sys.state.focus-indicator.outer-offset`     | `outline-offset-md-focus-indicator-outer-offset` |
| `md.sys.motion.duration.short1`                 | `duration-md-short1` |
| `md.sys.motion.easing.emphasized.decelerate`    | `ease-md-emphasized-decelerate` |
| `md.sys.motion.spring.default.spatial`          | `ease-md-spring-default-spatial` with `duration-md-spring-default-spatial` |

Type scale classes set font size, line height, letter spacing and font weight. To change only the line height, use `leading-*` (`text-md-body-medium leading-7`): the `text-md-body-medium/7` form is Tailwind's font size and line height shorthand and drops the letter spacing and font weight.

Breakpoints are the Material window size classes: `md-medium:` (600px), `md-expanded:` (840px), `md-large:` (1200px), `md-extra-large:` (1600px).

`surface-tint` is deprecated in Material Design 3; use elevation instead.

## Migrating from 0.3

- **Names:** every class gets the `md-` prefix.

  | 0.3                                             | now |
  | ----------------------------------------------- | --- |
  | `bg-light-primary dark:bg-dark-primary`         | `bg-md-primary` |
  | `bg-light-primary`                              | `bg-md-light-primary` |
  | `bg-primary-40`                                 | `bg-md-primary40` |
  | `text-body-medium`                              | `text-md-body-medium` |
  | `rounded-medium`                                | `rounded-md-medium` |
  | `shadow-1`                                      | `shadow-md-level1` |
  | `opacity-hover`                                 | `opacity-md-hover` |
  | `duration-short-1`                              | `duration-md-short1` |
  | `ease-standard-accelerate`                      | `ease-md-standard-accelerate` |
  | `sm:` / `md:` / `lg:` / `xl:` (600 / 905 / 1240 / 1440px) | `md-medium:` / `md-expanded:` / `md-large:` / `md-extra-large:` (600 / 840 / 1200 / 1600px) |

- **Tailwind defaults are back:** 0.3 replaced Tailwind's font sizes, radii, shadows and easings, and changed the `sm`–`xl` breakpoints. They are now available again (`text-sm`, `rounded-md`, `shadow-sm`, `ease-in`), and `sm:` / `md:` / `lg:` / `xl:` are Tailwind's 40 / 48 / 64 / 80rem again.
- **Back to Tailwind's values without an error:** `z-1`–`z-5` and `opacity-1`–`opacity-5` no longer come from the plugin, so they are Tailwind's plain numbers (`z-3` is 3 instead of 6, `opacity-1` is 1% instead of 5%).
- **Removed:** the `shadow-light` / `shadow-dark` colors and the default border color (both had no effect in Tailwind v4), and palette tones 25 / 35.
- **Changed values:**
  - Colors follow the 2025 color spec. Palettes are generated per mode, so `md-light-primary40` and `md-dark-primary40` can differ.
  - Custom colors are built from their input color with contrast against the main scheme's surfaces.
  - Focus and pressed state layer opacity is 0.1 (was 0.12).
  - Type scale sizes are in rem and letter spacing in em. Line heights default to the `medium` language height (e.g. body-medium 23px instead of 20px); use `languageHeight: "small"` for the previous line heights.
- **Dark mode** switches with Tailwind's `dark` variant instead of always following `prefers-color-scheme`.
