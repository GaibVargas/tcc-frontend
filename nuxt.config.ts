// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'QAV',
      meta: [
        { name: 'description', content: 'Quiz ao vivo integrado a LMS' },
      ]
    }
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    preset: 'netlify'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
