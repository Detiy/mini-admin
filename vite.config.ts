import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import inject from '@rollup/plugin-inject'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    inject({
      'window.Quill': ['@vueup/vue-quill', 'Quill'],
      Quill: ['@vueup/vue-quill', 'Quill'],
    })
  ],
  build: {
    outDir: 'dist', // 打包输出目录
    assetsDir: 'assets', // 静态资源目录
    minify: 'esbuild', // 代码压缩方式，可选terser/esbuild
    sourcemap: true, // 是否生成source map
  },
  resolve: {
    alias: {
      '@':path.resolve(__dirname, './src')
    },
  },
  server: {
    port: 3000, // 启动端口号
    // open: true, // 自动打开浏览器
    hmr: { // 热更新
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://81.68.150.188:9090',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  }
})
