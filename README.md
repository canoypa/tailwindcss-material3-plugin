# Tailwindcss Material3 Plugin

## Usage

### CSS-first (Tailwind v4)

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

### JS config (Tailwind v4)

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
<div class="text-body-medium text-dark-primary">Hello World!</div>
```
