import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 10086,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-import.d.ts',
    }),
  ],
})
