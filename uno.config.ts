import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 4
    }),
    presetWind3(),
    presetIcons({
      autoInstall: true,
      extraProperties: {
        display: 'inline-block',
        width: '1em',
        height: '1em'
      },
      collections: {
        custom: FileSystemIconLoader('src/assets/icons', svg => svg.replace(/fill=".*"/, 'fill="currentColor"'))
      }
    }),
    presetAttributify()
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)'
    }
  },
  transformers: [
    transformerDirectives()
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'wh-screen': 'w-screen h-screen',
    'flex-center': 'flex justify-center items-center',
    'flex-bc': 'flex justify-between items-center',
    'cool-green': 'bg-green-500 text-black',
    'n-logo': 'w-full h-54 flex justify-start items-center',
    'general-shadow': 'shadow-xl shadow-gray/10 ring-1 ring-gray/10',
    'uno-autoborder': 'border-1 border-gray-2 dark-border-gray-7',
    'uno-autoborder-l': 'border-l-1 border-gray-2 dark-border-gray-7',
    'uno-autoborder-b': 'border-b-1 border-gray-2 dark-border-gray-7'
  },
  rules: [
    [/^wh-(\d+)$/, ([,d]) => ({ width: `${d}px`, height: `${d}px` })]
  ]
})
