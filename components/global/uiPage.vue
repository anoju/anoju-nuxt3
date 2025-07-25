<script lang="ts" setup>
import { ModalSystemKey } from '~/composables/useModalSystem';

// Types
type ButtonAction = boolean | string | (() => void);
type ClassValue = string | Record<string, boolean> | Array<string | Record<string, boolean>>;

interface Props {
  pageTitle?: string | number | null;
  pageClass?: ClassValue | null;
  headClass?: ClassValue | null;
  bodyClass?: ClassValue | null;
  noHeader?: boolean;
  btnBack?: ButtonAction;
  btnClose?: ButtonAction;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  pageTitle: null,
  pageClass: null,
  headClass: null,
  bodyClass: null,
  noHeader: false,
  btnBack: false,
  btnClose: false
});

// Modal system injection
const modalSystem = inject(ModalSystemKey);
if (!modalSystem) {
  throw new Error('Modal system not provided');
}

// Composables
const router = useRouter();
const { $scrollTo } = useNuxtApp();

// Template refs and reactive state
const el = ref<HTMLElement | null>(null);
const spaceHeight = ref<number>(0);
const isBtnTopOn = ref<boolean>(false);

// Timer for button top auto-hide
let btnTopTime: ReturnType<typeof setTimeout> | null = null;

// Modal system properties
const { isLock, lockStyle } = modalSystem;

// Methods
const backClick = (): void => {
  if (typeof props.btnBack === 'function') {
    props.btnBack();
  } else if (typeof props.btnBack === 'string') {
    router.push({ path: props.btnBack });
  } else {
    router.back();
  }
};

const closeClick = (): void => {
  if (typeof props.btnClose === 'function') {
    props.btnClose();
  } else if (typeof props.btnClose === 'string') {
    router.push({ path: props.btnClose });
  } else {
    router.back();
  }
};

const fixedSpace = (): void => {
  const _el = el.value;
  if (!_el) return;

  const $bottomFixed = _el.querySelector('.bottom-fixed') as HTMLElement;
  if (!$bottomFixed) return;
  const child = $bottomFixed.firstElementChild as HTMLElement;
  let $height = 0;
  if (getComputedStyle($bottomFixed).position === 'fixed') {
    $height = $bottomFixed.offsetHeight;
  } else if (getComputedStyle(child).position === 'fixed') {
    $height = child.offsetHeight;
  }
  spaceHeight.value = $height;

  const wrap = window.document.scrollingElement || window.document.body || window.document.documentElement;
  let sclTop = wrap.scrollTop;
  if (wrap.scrollHeight - sclTop - 5 <= wrap.clientHeight - 5) {
    $bottomFixed.classList.add('end');
  } else {
    $bottomFixed.classList.remove('end');
  }
};

const btnTopChk = (): void => {
  const _el = el.value;
  if (!_el) return;
  
  if (btnTopTime) {
    clearTimeout(btnTopTime);
    btnTopTime = null;
  }
  
  const wrap = window.document.scrollingElement || window.document.body || window.document.documentElement;
  let sclTop = wrap.scrollTop;
  
  if (sclTop > 100) {
    isBtnTopOn.value = true;
  } else {
    isBtnTopOn.value = false;
  }
  
  if (!btnTopTime && isBtnTopOn.value) {
    btnTopTime = setTimeout(() => {
      isBtnTopOn.value = false;
    }, 3000);
  }
};

const btnTopClick = (): void => {
  $scrollTo('window', { top: 0 }, 300);
};

const wrapScrollEvt = (): void => {
  fixedSpace();
  btnTopChk();
};

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', wrapScrollEvt);
    fixedSpace();
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', wrapScrollEvt);
  if (btnTopTime) {
    clearTimeout(btnTopTime);
    btnTopTime = null;
  }
});
</script>

<template>
  <article ref="el" class="page" :class="[pageClass, { lock: isLock }]" :style="lockStyle">
    <header v-if="!noHeader" class="page-head" :class="headClass">
      <div v-if="!!$slots.header">
        <slot name="header" />
      </div>
      <div v-else>
        <div v-if="!!btnBack || !!$slots.headLeft" class="head-left">
          <uiButton v-if="!!btnBack" not class="head-back" aria-label="이전화면" @click="backClick" />
          <slot name="headLeft" />
        </div>
        <h1 v-if="pageTitle">{{ pageTitle }}</h1>
        <div v-if="!!btnClose || !!$slots.headRight" class="head-right">
          <slot name="headRight" />
          <uiButton v-if="!!btnClose" not class="head-close" aria-label="화면닫기" @click="closeClick" />
        </div>
      </div>
    </header>

    <main class="page-body" :class="[bodyClass, noHeader ? 'no-header' : '']">
      <slot />
    </main>
    
    <div class="floating-btn" :style="{ bottom: `${spaceHeight + 10}px` }">
      <slot name="floating" />
      <uiButton 
        to="#none" 
        not 
        class="btn-page-top" 
        :class="{ on: isBtnTopOn }" 
        title="컨텐츠 상단으로 이동" 
        aria-label="컨텐츠 상단으로 이동" 
        @click="btnTopClick"
      >
        TOP
      </uiButton>
    </div>
    
    <div class="bottom-fixed-space" aria-hidden="true" :style="{ height: `${spaceHeight}px` }" />
  </article>
</template>
