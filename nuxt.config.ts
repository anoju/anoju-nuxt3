// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  app: {
    // pageTransition: { name: 'page' },
    head: {
      title: 'Nuxt3 연습'
    }
  },
  ssr: true, // SSR 활성화
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/base/_variables.scss";@import "@/assets/scss/base/_mixin.scss";@import "@/assets/scss/base/_function.scss";'
        }
      }
    }
  },
  css: ['~/assets/scss/front.scss'],
  plugins: ['~/plugins/global-function.ts', '~/plugins/modal.ts', '@/plugins/highlightjs.ts'],
  nitro: {
    routeRules: {
      '/.well-known/**': {
        headers: { 'cache-control': 's-maxage=0' }
        // 또는 단순히 무시
      }
    }
  }
});
