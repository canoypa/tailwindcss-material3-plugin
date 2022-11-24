import plugin from "tailwindcss/plugin";

export type Material3PluginOptions = {
  seed: number;
};

export const Material3Plugin = plugin.withOptions<Material3PluginOptions>(
  (option) => (tw) => {},
  (option) => {
    return {};
  }
);

export default Material3Plugin;
