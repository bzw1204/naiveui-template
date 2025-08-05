import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerCompileClass
} from 'unocss'

const colorPattern = /fill=".*"/
export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 4
    }),
    presetWind3(),
    presetIcons({
      autoInstall: false,
      extraProperties: {
        display: 'inline-block',
        width: '1em',
        height: '1em'
      },
      collections: {
        color: FileSystemIconLoader('src/assets/color'),
        local: FileSystemIconLoader('src/assets/icons', svg =>
          svg.replace(colorPattern, 'fill="currentColor"'))
      }
    }),
    presetAttributify()
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)'
    }
  },
  transformers: [transformerDirectives(), transformerCompileClass()],
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
    'uno-autoborder-b': 'border-b-1 border-gray-2 dark-border-gray-7',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-center': 'flex-center flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'i-flex-col': 'flex-col inline-flex',
    'i-flex-col-center': 'flex-col i-flex-center',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden'
  },
  rules: [[/^wh-(\d+)$/, ([, d]) => ({ width: `${d}px`, height: `${d}px` })]]
})
