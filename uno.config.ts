import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  presetMini,
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
    presetMini(),
  ],
  transformers: [transformerDirectives()],
});
