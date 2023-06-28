# Tailwindcss Material3 Plugin

## Usage

```javascript
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

```html
<div class="text-body-medium color-primary">Hello World!</div>
```
