import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/vs2015.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueHighlightJS);
});
