import eslintPlugin from 'vite-plugin-eslint';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
    head: {
      title: 'Nuxt3 연습'
    }
  },
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_global.scss";@import "@/assets/scss/_mixin.scss";@import "@/assets/scss/_function.scss";'
        }
      }
    }
  },
  css: ['~/assets/scss/front.scss'],
  plugins: ['~/plugins/ui-front.ts']
});
