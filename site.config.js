const { resolve } = require('path')
const { defineConfig } = require('vite')

// A Vite config that produces a bundled website in /dist
module.exports = defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
