import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  //* build modules
  buildModules: ['@pinia/nuxt', '@nuxtjs/color-mode'],

  //* css
  css: ['@/assets/scss/index.scss'],

  //* vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/variables.scss";`,
        },
      },
    },
  },

  //* env
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost:8081',
  },

  //* modules
  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
})
