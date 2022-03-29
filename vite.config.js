const { resolve } = require('path'),
  { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        us_gdp: resolve(__dirname, 'us_gdp/index.html'),
        doping_plot: resolve(__dirname, 'doping_plot/index.html'),
        heat_map: resolve(__dirname, 'heat_map/index.html')
      },
    },
  },
})
