import eslintPlugin from 'vite-plugin-eslint';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: 'page' },
    head: {
      title: 'Nuxt3 연습'
    }
  },
  ssr: true, // SSR 활성화
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/base/_variables.scss";@import "@/assets/scss/base/_mixin.scss";@import "@/assets/scss/base/_function.scss";'
        }
      }
    }
  },
  css: ['~/assets/scss/front.scss'],
  plugins: ['~/plugins/global-function.ts', '~/plugins/modal.ts', '@/plugins/highlightjs.ts']
});
