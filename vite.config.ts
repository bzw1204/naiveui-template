import { resolve } from 'node:path'
import { XNaiveUIResolver } from '@skit/x.naive-ui/unplugin'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
// import VueDevTools from 'vite-plugin-vue-devtools'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@layout',
        replacement: resolve(__dirname, 'src/layouts')
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, 'src/assets')
      }
    ]
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown({ }),
    MetaLayouts(),
    // VueDevTools(),
    VueSetupExtend(),
    UnoCSS(),
    Icons({
      autoInstall: false,
      customCollections: {
        formula: FileSystemIconLoader('src/assets/icons/formula'),
        custom: FileSystemIconLoader('src/assets/icons')
      }
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': ['useVModel', 'useVModels', 'useDebounceFn', 'useStorage', 'useIntervalFn', 'useToggle']
        },
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        },
        unheadVueComposablesImports
      ],
      dirs: ['src/store'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/types/auto-imports.d.ts'
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      dts: 'src/types/components.d.ts',
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), XNaiveUIResolver(), IconsResolver({ prefix: false, customCollections: ['custom', 'formula'] })]
    })
  ]
})
