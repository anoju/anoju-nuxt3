import eventBus from '~/utils/eventBus';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('eventBus', eventBus);

  nuxtApp.provide('modal', (options: any) => {
    eventBus.emit('addModal', options);
  });

  nuxtApp.provide('like', (likeType: string = 'heart') => {
    eventBus.emit('likeModal', likeType);
  });

  nuxtApp.provide('loading', (options: any = true) => {
    eventBus.emit('loading', options);
  });
});
