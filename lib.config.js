const { resolve } = require('path')
const { defineConfig } = require('vite')

// A Vite config that produces a bundled library in /dist
module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ttty',
      formats: ['es', 'iife'],
      fileName: (format) => `ttty.${format}.js`
    }
  }
})
