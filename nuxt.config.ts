// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  app: {
    // pageTransition: { name: 'page' },
    head: {
      title: 'Nuxt3 연습'
    }
  },
  // ssr: true, // SSR 활성화
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@import "@/assets/scss/base/_variables.scss";@import "@/assets/scss/base/_mixin.scss";@import "@/assets/scss/base/_function.scss";'
  //       }
  //     }
  //   }
  // },

  // css: ['~/public/css/fonts.css', '~/public/css/lib/animated.4.1.1.css', '~/public/css/lib/swiper-bundle.9.2.4.min.css', '~/assets/scss/front.scss'],
  css: ['~/assets/scss/front.scss'],

  //plugins: ['~/plugins/global-function.ts', '~/plugins/modal.ts', '@/plugins/highlightjs.ts'],
  plugins: ['~/plugins/global-function.ts', '~/plugins/modal.ts', { src: '@/plugins/highlightjs.ts', mode: 'client' }, '~/plugins/client-setup.client.ts'],

  nitro: {
    routeRules: {
      '/.well-known/**': {
        headers: { 'cache-control': 's-maxage=0' }
        // 또는 단순히 무시
      }
    }
  }
});
