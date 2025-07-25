<script lang="ts" setup>
import { ModalSystemKey } from '~/composables/useModalSystem';

// Types
type PopTypes = 'full' | 'bottom' | 'modal';

interface Props {
  title?: string | null;
  titleClass?: string | null;
  noHead?: boolean;
  noClose?: boolean;
  full?: boolean;
  modal?: boolean;
  bottom?: boolean;
  tooltip?: boolean;
  close?: (() => void) | null;
  type?: string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  title: null,
  titleClass: null,
  noHead: false,
  noClose: false,
  full: false,
  modal: false,
  bottom: false,
  tooltip: false,
  close: null,
  type: null
});

// Modal system injection
const modalSystem = inject(ModalSystemKey);
if (!modalSystem) {
  throw new Error('Modal system not provided');
}

const { openModal, closeModal } = modalSystem;

// Composables and refs
const nuxtApp = useNuxtApp();
const el = ref<HTMLElement | null>(null);
const isLayer = ref<boolean>(false);
const defaultType: string = 'modal';
const idx = ref<number | null>(null);
const addClass = ref<string[]>([]);

// Computed properties
const typeAry: PopTypes[] = ['full', 'bottom', 'modal'];
const matchingType = computed(() => typeAry.find((type) => props[type]));
const modalType = computed<string>(() => {
  if (props.type && typeAry.includes(props.type as PopTypes)) {
    return props.type as PopTypes;
  } else if (matchingType.value) {
    return matchingType.value;
  }
  return defaultType;
});

// Methods
const isLayerChk = (): void => {
  const $el = el.value;
  if (!$el) return;
  const $parent = $el.parentElement as HTMLElement;
  isLayer.value = $parent.classList.contains('popup');
};

const addClassChk = (): void => {
  if (props.tooltip) addClass.value.push('tooltip');
};

const maxHeight = (): void => {
  let wrap = window;
  let wrapH = wrap.innerHeight;
  let wrapPdT = 0;
  let wrapPdB = 0;
  const $el = el.value;
  if (!$el) return;
  const $parent = $el.parentElement as HTMLElement;
  if ($parent && $parent.classList.contains('popup')) {
    wrapH = $parent.offsetHeight;
    wrapPdT = parseInt(nuxtApp.$getStyle($parent, 'padding-top') || '0', 10);
    wrapPdB = parseInt(nuxtApp.$getStyle($parent, 'padding-bottom') || '0', 10);
  }
  const rtnVal = wrapH - wrapPdT - wrapPdB;
  const $body = $el.querySelector('.pop-body') as HTMLElement;
  if (!$body) return;
  $body.style.maxHeight = `${rtnVal}px`;
};

const popClose = (): void => {
  if (props.close) {
    props.close();
  } else if (isLayer.value && idx.value !== null) {
    closeModal(idx.value);
  } else {
    window.history.back();
  }
};

// Lifecycle
onMounted(() => {
  if (el.value) idx.value = Number(el.value.dataset.idx);
  isLayerChk();
  addClassChk();
  if (idx.value !== null) {
    openModal(idx.value, modalType.value, addClass.value);
  }
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
        <h1 v-if="title || !!$slots.title" ref="title" tabindex="-1">
          {{ title }}
          <slot name="title" />
        </h1>
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
