<script lang="ts" setup>
import eventBus from '~/utils/eventBus';
interface ModalObj {
  component: Component;
  componentProps?: Record<string, any>;
  componentName?: string;
  modalProps?: Record<string, any>;
  resolve?: (value: unknown) => void;
  show: boolean;
  type: any;
  addClass: any;
  returnFocus?: HTMLElement | null;
}

const modals = ref<ModalObj[]>([]);

const isDuplicated = (componentName: string | undefined): boolean => {
  return componentName !== undefined && modals.value.length > 0 && modals.value.some((modal) => modal.componentName === componentName);
};

const addModal = async (
  resolve: (value: unknown) => void,
  component: Component | (() => Promise<Component>),
  componentProps: Record<string, any> = {},
  modalProps: Record<string, any> = {},
  returnFocus: HTMLElement | null = null
): Promise<void> => {
  console.log(component);
  // const componentName = ((component as Component).name !== undefined ? component : await (component as () => Promise<Component>)()).name || undefined;

  // 이미 열린 팝업 처리
  // if (isDuplicated(componentName)) {
  //   const modalObj = modals.value.find((modal) => modal.componentName === componentName);
  //   if (modalObj) {
  //     onOpen(modals.value.indexOf(modalObj), modalObj?.type, modalObj?.addClass);
  //   }
  //   return;
  // }

  const modalObj: ModalObj = {
    component,
    componentProps: componentProps || {},
    // componentName,
    modalProps: modalProps || {},
    resolve,
    show: false,
    type: '',
    addClass: '',
    returnFocus
  };

  modals.value.push(modalObj);
};

const el = ref<HTMLElement | null>(null);
const isClosing = ref(false);
const onOpen = (index: number, type?: string, addClass?: string[] | string): void => {
  if (isClosing.value) return;
  const idx = index;
  if (!el.value) return;
  console.log('popOpen onOpen', el.value);
  const $popup = el.value.children[idx] as HTMLElement;
  const $wrap = $popup.querySelector('.pop-wrap') as HTMLElement;
  console.log(modals.value[idx], type);
  if (type) modals.value[idx].type = type;
  if (addClass) modals.value[idx].addClass = addClass;

  if (idx === 0 && document.querySelector('.lock') === null) {
    // uiEventBus.$emit('lock-wrap');
  }

  setTimeout(() => {
    modals.value[idx].show = true;
    $popup.setAttribute('aria-hidden', 'false');
    if (idx > 0) {
      ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'true');
    }
  }, 50);

  setTimeout(() => {
    const popHeadH1 = $wrap.querySelector('.pop-head h1') as HTMLElement;
    const popHeadClose = $wrap.querySelector('.pop-head .pop-close') as HTMLElement;

    if (popHeadH1 !== null) {
      popHeadH1.focus();
    } else if (popHeadClose !== null) {
      popHeadClose.focus();
    }
    if (type !== 'full') {
      $popup.classList.add('opened');
    }
  }, 650);
};

const onClose = (index: number | string, { payload }: { payload?: any } = {}): void => {
  isClosing.value = true;
  const idx = Number(index);
  if (!el.value) return;
  const $popup = el.value.children[idx] as HTMLElement;
  const modal = modals.value[idx];
  if (modal.resolve) modal.resolve({ payload });
  modals.value[idx].show = false;
  if (idx > 0) ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'false');
  // if (idx === 0) uiEventBus.$emit('unlock-wrap');
  let focusEl = modal.returnFocus;
  setTimeout(() => {
    modals.value.splice(idx, 1);
    if (focusEl) {
      if (focusEl.closest('.button') !== null) focusEl = focusEl.closest('.button') as HTMLElement;
      focusEl.focus();
    }
    isClosing.value = false;
  }, 600);
};

interface Like {
  idx: number;
  class: string;
  show: boolean;
}

const likes = ref<Like[]>([]);
const likeIdx = ref(0);

const like = (addClass: string): void => {
  const idx = likeIdx.value;
  likes.value.push({
    idx,
    class: addClass,
    show: false
  });
  likeIdx.value += 1;
  setTimeout(() => {
    likes.value[idx].show = true;
    setTimeout(() => {
      likes.value[idx].show = false;
    }, 2000);
  }, 50);
};

onMounted(() => {
  // const nuxtApp = useNuxtApp();
  // const eventBus = nuxtApp.$eventBus;
  eventBus.on('addModal', (payload: any) => {
    const { resolve, component, componentProps, modalProps, returnFocus } = payload;
    addModal(resolve, component, componentProps, modalProps, returnFocus);
  });
  eventBus.on('likeModal', (payload: any) => {
    const { className } = payload;
    like(className);
  });
  eventBus.on('popOpen', (payload: any) => {
    const idx = payload[0];
    const type = payload[1];
    const addClass = payload[2];
    onOpen(idx, type, addClass);
  });
  eventBus.on('popClose', (payload: any) => {
    const idx = payload[0];
    const options = payload[1];
    onClose(idx, options);
  });
});
</script>
<template>
  <div v-if="modals.length || likes.length" ref="el" class="modal-container">
    <div v-for="(modal, i) in modals" :key="i" class="popup" :class="[modal.type, modal.addClass, { show: modal.show }]">
      <component :is="modal.component" v-bind="modal.componentProps" :data-idx="i" @close="onClose(i, $event)" />
    </div>

    <!-- like -->
    <div v-if="likes.length" class="layer_like_wrap">
      <div v-for="(lk, j) in likes" :key="j" class="layer_like" :class="{ show: lk.show }" aria-hidden="true">
        <div :class="lk.class"></div>
      </div>
    </div>
  </div>
</template>
