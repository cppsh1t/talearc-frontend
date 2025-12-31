import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  shortcuts: {
    'horizontal-center': 'absolute left-1/2 -translate-x-1/2',
    'vertical-center': 'absolute top-1/2 -translate-y-1/2',
    'center-center': 'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2',
  },
  presets: [presetWind3, presetRemToPx()],
  transformers: [],
  rules: [
    [
      'hide-scrollbar',
      {
        'scrollbar-width': 'none' /* Firefox */,
        '-ms-overflow-style': 'none' /* IE and Edge */,
      },
    ],
  ],
})
