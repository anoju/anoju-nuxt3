// import { defineComponent, ref } from 'vue';
// import { defineNuxtPlugin } from '#app';

interface ModalParams {
  component: any;
  componentProps?: Record<string, any>;
  modalProps?: Record<string, any>;
  returnFocus?: HTMLElement | null;
}

const ModalContainer = defineComponent({
  name: 'ModalContainer',

  setup() {
    const showModal = ref(false);
    const modalInstance = ref<any>(null);

    const addModal = (
      resolve: (value: unknown) => void,
      component: any,
      componentProps: Record<string, any> = {},
      modalProps: Record<string, any> = {},
      returnFocus: HTMLElement | null = null
    ) => {
      modalInstance.value = {
        resolve,
        component,
        componentProps,
        modalProps,
        returnFocus
      };
      showModal.value = true;
    };

    const like = (addClass: string | null = null) => {
      modalInstance.value?.like(addClass);
    };

    return {
      showModal,
      modalInstance,
      addModal,
      like
    };
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('$modal', (params: ModalParams) => {
    return new Promise((resolve) => {
      nuxtApp.vueApp?.component(ModalContainer.name)?.addModal(resolve, params.component, params.componentProps, params.modalProps, params.returnFocus);
    });
  });

  nuxtApp.provide('$like', (addClass: string | null = null) => {
    nuxtApp.vueApp?.component(ModalContainer.name)?.like(addClass);
  });

  nuxtApp.vueApp?.mixin({
    created() {
      this.$modalInstance = null;
    },

    watch: {
      $modalInstance: {
        immediate: true,
        handler(instance: any) {
          if (instance === null) return;
          if (instance.$vnode.tag.endsWith('ModalContainer')) {
            ModalContainer.instance = instance;
          }
        }
      }
    }
  });
});
