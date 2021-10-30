import babel from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser' // 压缩js
// import sass from 'node-sass'
// import { eslint } from 'rollup-plugin-eslint'
import Components from 'unplugin-vue-components/rollup'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/rollup'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js', // 配置文件打包的入口
  output: {
    file: './dist/dytable.js', // 出口路径
    name: 'DyTable', // 指定打包后全局变量的名字
    format: 'umd', // 统一模块规范
    sourcemap: true, // es6=>es5 开启源码调试 可以找到源码的报错位置
    globals: {
      vue: 'Vue', // 告诉rollup全局变量Vue即是vue
    },
    plugins: [terser()],
  },
  plugins: [
    vue({
      // css: true,
      compileTemplate: true,
      // include: /\.vue$/,
      // compiler,
      // compilerOptions,
    }),
    resolve(),
    //使用插件
    commonjs({ extensions: ['.js', '.ts', , '.vue'] }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    postcss(),
    // sass(),
    terser(),
    // eslint(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
