<script lang="ts" setup>
import eventBus from '~/utils/eventBus';
interface ModalObj {
  component: Component;
  componentProps?: Record<string, any>;
  componentID?: string;
  modalProps?: Record<string, any>;
  resolve?: (value: unknown) => void;
  show: boolean;
  open: boolean;
  type: any;
  addClass: any;
  returnFocus?: HTMLElement | null;
}

const modals = ref<ModalObj[]>([]);

const isDuplicated = (componentID: string | undefined): boolean => {
  return componentID !== undefined && modals.value.length > 0 && modals.value.some((modal) => modal.componentID === componentID);
};

const addModal = async (
  resolve: (value: unknown) => void,
  component: Component | (() => Promise<Component>),
  componentProps: Record<string, any> = {},
  modalProps: Record<string, any> = {},
  returnFocus: HTMLElement | null = null
): Promise<void> => {
  const componentID = (component as any).__hmrId;
  // const componentFile = (component as any).__file;

  // 이미 열린 팝업 처리
  if (isDuplicated(componentID)) {
    const modalObj = modals.value.find((modal) => modal.componentID === componentID);
    if (modalObj) onOpen(modals.value.indexOf(modalObj));
    return;
  }

  const modalObj: ModalObj = {
    component: markRaw(component),
    componentProps: componentProps || {},
    componentID,
    modalProps: modalProps || {},
    resolve,
    show: false,
    open: false,
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
  const $popup = el.value.children[idx] as HTMLElement;
  const $wrap = $popup.querySelector('.pop-wrap') as HTMLElement;
  if (type) modals.value[idx].type = type;
  if (addClass) modals.value[idx].addClass = addClass;

  if (idx === 0 && document.querySelector('.lock') === null) {
    eventBus.emit('lockPage');
  }

  modals.value[idx].show = true;
  setTimeout(() => {
    modals.value[idx].open = true;
    $popup.setAttribute('aria-hidden', 'false');
    if (idx > 0) {
      ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'true');
    }
  }, 1);

  setTimeout(() => {
    const popHeadH1 = $wrap.querySelector('.pop-head h1') as HTMLElement;
    const popHeadClose = $wrap.querySelector('.pop-head .pop-close') as HTMLElement;

    if (popHeadH1 !== null) {
      popHeadH1.focus();
    } else if (popHeadClose !== null) {
      popHeadClose.focus();
    }
    $popup.classList.add('opened');
  }, 501);
};

const onClose = (index: number | string, { payload }: { payload?: any } = {}): void => {
  isClosing.value = true;
  const idx = Number(index);
  if (!el.value) return;
  const $popup = el.value.children[idx] as HTMLElement;
  const modal = modals.value[idx];
  if (modal.resolve) modal.resolve({ payload });
  modals.value[idx].open = false;
  if (idx > 0) ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'false');
  if (idx === 0) eventBus.emit('unlockPage');
  let focusEl = modal.returnFocus;
  setTimeout(() => {
    modals.value[idx].show = false;
    // modals.value.splice(idx, 1);
    const showModals = modals.value.filter((obj) => obj.show);
    if (showModals.length === 0) modals.value = [];
    if (focusEl) {
      if (focusEl.closest('.button') !== null) focusEl = focusEl.closest('.button') as HTMLElement;
      focusEl.focus();
    }
    isClosing.value = false;
  }, 500);
};

interface Like {
  idx: number;
  type: string;
  show: boolean;
  visible: boolean;
}

const likes = ref<Like[]>([]);
const likeIdx = ref(0);

const like = (likeType: string): void => {
  console.log('like');
  const idx = likeIdx.value;
  likes.value.push({
    idx,
    type: likeType,
    show: false,
    visible: false
  });
  likeIdx.value += 1;
  setTimeout(() => {
    const $like = likes.value[idx];
    $like.show = true;
    let $type = $like.type;
    let timer = 2000;
    // if ($type === 'heart') timer = 4000;
    setTimeout(() => {
      $like.show = false;
      setTimeout(() => {
        $like.visible = false;
        const showLikes = likes.value.filter((obj) => obj.show);
        if (showLikes.length === 0) {
          likes.value = [];
          likeIdx.value = 0;
        }
      }, 300);
    }, timer);
  }, 1);
};

interface Loading {
  txt?: string;
  type?: string;
}
const isObject = (options: Loading | string | boolean): options is Loading => {
  return typeof options === 'object';
};
const isLoading: Ref<boolean> = ref(false);
const loadingShow: Ref<boolean> = ref(false);
const loadingTxt: Ref<string | null> = ref(null);
const loading = (options: Loading | string | boolean) => {
  if (options) {
    isLoading.value = true;
    if (isObject(options) && options.txt) loadingTxt.value = options.txt;
    else if (typeof options === 'string') loadingTxt.value = options;
    setTimeout(() => {
      loadingShow.value = true;
    }, 1);
  } else if (options === false) {
    loadingShow.value = false;
    setTimeout(() => {
      isLoading.value = false;
      loadingTxt.value = null;
    }, 200);
  }
};

onMounted(() => {
  // const nuxtApp = useNuxtApp();
  // const eventBus = nuxtApp.$eventBus;
  eventBus.on('addModal', (payload: any) => {
    const { resolve, component, componentProps, modalProps, returnFocus } = payload;
    addModal(resolve, component, componentProps, modalProps, returnFocus);
  });
  eventBus.on('likeModal', (likeType: any) => {
    like(likeType);
  });
  eventBus.on('popOpen', (payload: any) => {
    const idx = payload[0];
    const type = payload[1];
    const addClass = payload[2];
    onOpen(idx, type, addClass);
  });
  eventBus.on('popClose', (payload: any) => {
    const idx = payload;
    onClose(idx);
  });
  eventBus.on('loading', (payload: any) => {
    loading(payload);
  });
});
</script>
<template>
  <div v-if="modals.length || likes.length || isLoading" ref="el" class="modal-container">
    <!-- popup -->
    <div v-for="(modal, i) in modals" :key="i" class="popup" :class="[modal.type, modal.addClass, { show: modal.show, open: modal.open }]">
      <div class="pop-bg-close" role="button" aria-label="팝업창 닫기" @click="onClose(i)"></div>
      <component :is="modal.component" v-bind="modal.componentProps" :data-idx="i" @close="onClose(i, $event)" />
    </div>

    <!-- like -->
    <div v-for="(lk, j) in likes" :key="j" class="layer-like" :class="{ show: lk.show }" aria-hidden="true">
      <uiLottie v-if="lk.type === 'heart'" path="/lottie/temp-love.json" autoplay></uiLottie>
    </div>

    <!-- loading -->
    <div v-if="isLoading" class="loading-wrap" :class="{ show: loadingShow }">
      <div class="tl">
        <div>
          <div class="loading-lottie" role="img" :aria-label="!loadingTxt ? '화면을 불러오는중입니다.' : ''">
            <uiLottie path="/lottie/loading.json" autoplay loop aria-hidden="true"></uiLottie>
          </div>
          <div v-if="loadingTxt" class="txt">{{ loadingTxt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
