import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
} from 'unocss';
import { presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: '_',
      prefixedOnly: true,
    }),
    presetIcons(),
  ],
  transformers: [transformerDirectives()],
});
