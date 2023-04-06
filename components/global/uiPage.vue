<script setup lang="ts">
const props = defineProps({
  pageTitle: { type: [String, Number], default: null },
  pageClass: { type: [String, Object], default: null },
  headClass: { type: [String, Object], default: null },
  bodyClass: { type: [String, Object], default: null },
  noHeader: { type: Boolean, default: false },
  btnBack: { type: [Boolean, String, Function], default: false },
  btnClose: { type: [Boolean, String, Function], default: false }
});

// methods
const backClick = (): void => {
  const router = useRouter();
  if (typeof props.btnBack === 'function') {
    props.btnBack();
  } else if (typeof props.btnBack === 'string') {
    router.push({ path: props.btnBack });
  } else {
    router.back();
  }
};

const closeClick = (): void => {
  const router = useRouter();
  if (typeof props.btnClose === 'function') {
    props.btnClose();
  } else if (typeof props.btnClose === 'string') {
    router.push({ path: props.btnClose });
  } else {
    router.back();
  }
};

const el = ref<HTMLElement | null>(null);
const spaceHeight = ref<number>(0);
const isBtnTopOn = ref<boolean>(false);

const fixedSpace = (): void => {
  const heightAry: Array<number> = [];
  const _el = el.value;
  if (!_el) return;
  const $bottomFixed = _el.querySelectorAll('.bottom-fixed');
  if (!$bottomFixed.length) return;

  $bottomFixed.forEach((item: Element) => {
    const child = item.firstElementChild as HTMLElement;
    if (getComputedStyle(child).position === 'fixed') {
      heightAry.push(child.offsetHeight);
    }
  });

  const $maxHeight = heightAry.length > 0 ? Math.max.apply(null, heightAry) : 0;
  spaceHeight.value = $maxHeight;
};

let btnTopTime: ReturnType<typeof setTimeout> | null = null;
const btnTopChk = (): void => {
  const _el = el.value;
  if (!_el) return;
  if (!!btnTopTime) {
    clearTimeout(btnTopTime);
    btnTopTime = null;
  }
  const wrap = window.document.scrollingElement || window.document.body || window.document.documentElement;
  let sclTop = wrap.scrollTop;
  if (sclTop > 100) isBtnTopOn.value = true;
  else isBtnTopOn.value = false;
  if (!btnTopTime && isBtnTopOn.value) {
    btnTopTime = setTimeout(() => {
      isBtnTopOn.value = false;
    }, 3000);
  }
};

const $scrollTo = useNuxtApp().$scrollTo;
const btnTopClick = (): void => {
  $scrollTo('window', { top: 0 }, 300);
};

const wrapScrollEvt = (): void => {
  fixedSpace();
  btnTopChk();
};

// life cycle
onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', wrapScrollEvt);
    fixedSpace();
  });
});
onUnmounted(() => {
  window.removeEventListener('scroll', wrapScrollEvt);
});
</script>
<template>
  <article ref="el" class="page" :class="pageClass">
    <header v-if="!noHeader" class="page-head" :class="headClass">
      <div v-if="!!$slots.header">
        <slot name="header" />
      </div>
      <div v-else>
        <div v-if="!!btnBack || !!$slots.headLeft" class="head-left">
          <button v-if="!!btnBack" type="button" class="head-back button" aria-label="이전화면" @click="backClick"></button>
          <slot name="headLeft" />
        </div>
        <h1 v-if="pageTitle">{{ pageTitle }}</h1>
        <div v-if="!!btnClose || !!$slots.headRight" class="head-right">
          <slot name="headRight" />
          <button v-if="!!btnClose" type="button" class="head-close button" role="button" aria-label="화면닫기" @click="closeClick"></button>
        </div>
      </div>
    </header>

    <main class="page-body" :class="[bodyClass, noHeader ? 'no-header' : '']">
      <slot />
    </main>
    <div class="floating-btn" :style="{ bottom: `${spaceHeight + 10}px` }">
      <slot name="floating" />
      <uiButton to="#none" class="btn-page-top" :class="{ on: isBtnTopOn }" title="컨텐츠 상단으로 이동" aria-label="컨텐츠 상단으로 이동" @click="btnTopClick">TOP</uiButton>
    </div>
    <div class="bottom-fixed-space" aria-hidden="true" :style="{ height: `${spaceHeight}px` }"></div>
  </article>
</template>
