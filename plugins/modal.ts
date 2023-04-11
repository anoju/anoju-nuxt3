// import { onGlobalSetup } from '@nuxtjs/composition-api';
import eventBus from '~/utils/eventBus';

export default defineNuxtPlugin((nuxtApp) => {
  // const nuxtApp = useNuxtApp();
  nuxtApp.provide('eventBus', eventBus);

  nuxtApp.provide('modal', (options: any) => {
    eventBus.emit('addModal', options);
  });

  nuxtApp.provide('like', (options: any) => {
    eventBus.emit('likeModal', options);
  });
});
