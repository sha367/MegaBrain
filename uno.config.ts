import {
  defineConfig,
  presetUno,
  transformerDirectives,
  presetIcons
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ],
  transformers: [
    transformerDirectives()
  ]
});
