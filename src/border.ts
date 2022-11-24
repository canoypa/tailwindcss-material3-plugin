import type { ThemeConfig } from "tailwindcss/types/config";

export const borderRadius = {
  none: "0",
  "extra-small": "4px",
  small: "8px",
  medium: "12px",
  large: "16px",
  "extra-large": "28px",
  full: "9999px",
};

export const borderColor: ThemeConfig["borderColor"] = ({ theme }) => ({
  DEFAULT: theme("colors.outline"),
});
