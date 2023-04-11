<script lang="ts" setup>
// props
const props = defineProps({
  title: { type: String, default: null },
  titleClass: { type: String, default: null },
  noHead: { type: Boolean, default: false },
  noClose: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
  modal: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
  tooltip: { type: Boolean, default: false },
  close: { type: Function, default: null },
  type: { type: String, default: null }
});

const nuxtApp = useNuxtApp();
const el = ref<HTMLElement | null>(null);
const isLayer: Ref<boolean> = ref(false);
const defaultType: string = 'modal';
const idx: Ref<number | null> = ref(null);
const addClass = ref<string[]>([]);

type popTypes = 'full' | 'bottom' | 'modal';
const typeAry: popTypes[] = ['full', 'bottom', 'modal'];
const matchingType = typeAry.find((type) => props[type]);
const modalType = computed<string>((): string => {
  if (props.type && typeAry.includes(props.type as popTypes)) {
    return props.type as popTypes;
  } else if (matchingType) {
    return matchingType;
  }
  return defaultType;
});

const isLayerChk = () => {
  const $el = el.value;
  if (!$el) return false;
  const $parent = $el.parentElement as HTMLElement;
  isLayer.value = $parent.classList.contains('popup');
};
const addClassChk = () => {
  if (props.tooltip) addClass.value.push('tooltip');
};
const maxHeight = () => {
  let wrap = window;
  let wrapH = wrap.innerHeight;
  let wrapPdT = 0;
  let wrapPdB = 0;
  const $el = el.value;
  if (!$el) return;
  const $parent = $el.parentElement as HTMLElement;
  if ($parent && $parent.classList.contains('popup')) {
    wrapH = $parent.offsetHeight;
    // wrapPdT = parseInt(window.getComputedStyle(wrap, null).getPropertyValue('padding-top'), 10)
    // wrapPdB = parseInt(window.getComputedStyle(wrap, null).getPropertyValue('padding-bottom'), 10)
    wrapPdT = parseInt(nuxtApp.$getStyle($parent, 'padding-top'), 10);
    wrapPdB = parseInt(nuxtApp.$getStyle($parent, 'padding-bottom'), 10);
  }
  // const headH = (this.$el.querySelector('.pop_head') != null) ? this.$el.querySelector('.pop_head').offsetHeight : 0;
  // const footH = (this.$el.querySelector('.pop_foot') != null) ? this.$el.querySelector('.pop_foot').offsetHeight : 0;
  // const rtnVal = wrapH - wrapPdT - wrapPdB - headH - footH;
  const rtnVal = wrapH - wrapPdT - wrapPdB;
  const $body = $el.querySelector('.pop-body') as HTMLElement;
  if (!$body) return;
  $body.style.maxHeight = `${rtnVal}px`;
};
const emitClose = defineEmits(['close']);
const popClose = () => {
  if (props.close) {
    props.close();
  } else if (isLayer.value) {
    emitClose('close', idx);
    // eventBus.emit('popClose', idx);
  } else {
    window.history.back();
  }
};

onMounted(() => {
  const eventBus = nuxtApp.$eventBus;
  if (el.value) idx.value = Number(el.value.dataset.idx);
  isLayerChk();
  addClassChk();
  if (idx.value !== null) eventBus.emit('popOpen', [idx.value, modalType, addClass.value]);
  nextTick(() => {
    setTimeout(() => {
      if (modalType.value !== 'full') maxHeight();
    }, 10);
  });
});
</script>
<template>
  <article ref="el" class="pop-wrap" :class="{ page: !isLayer }">
    <div v-if="!noHead" class="pop-head" :class="[{ no_title: (title == null || title == '') && !$slots.title }, titleClass]">
      <div>
        <slot name="title-prev" />
        <h1 v-if="title != null" ref="title" tabindex="-1" v-html="title" />
        <slot name="title" />
        <slot name="title-next" />
        <template v-if="!noClose">
          <uiButton class="pop-close" not aria-label="팝업창 닫기" @click="popClose()">팝업창 닫기</uiButton>
        </template>
      </div>
    </div>
    <slot name="head" />
    <div class="pop-body">
      <slot />
    </div>
    <div v-if="$slots['foot']" class="pop-foot">
      <div>
        <slot name="foot" />
      </div>
    </div>
  </article>
</template>
