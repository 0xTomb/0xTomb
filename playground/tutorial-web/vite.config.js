import { resolve } from 'path'

const { defineConfig } = require('vite')

module.exports = defineConfig({
  resolve: {
    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js'
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
