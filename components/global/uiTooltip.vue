<script lang="ts" setup>
import { CSSProperties } from 'vue';

interface StyleObject extends CSSProperties {
  left?: string;
  top?: string;
}

interface Props {
  class: string | string[] | null;
  notHead?: boolean;
  isMobile?: boolean;
  sideMargin?: number;
  target?: HTMLElement | null;
}

const props = withDefaults(defineProps<Props>(), {
  class: null,
  notHead: false,
  isMobile: true,
  sideMargin: 16,
  target: null
});

const wrapper = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const currentTarget = ref<HTMLElement | null>(null);
const isShow = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const isBottom = ref<boolean>(false);
const isMax = ref<boolean>(false);
const contentLeft = ref<number>(0);
const contentTop = ref<number>(0);
const arrLeft = ref<number>(0);
let isEvt = false;

const tooltipClass = computed(() => [props.class]);

const contentStyle = computed(
  (): StyleObject => ({
    ...(contentLeft.value && { left: `${contentLeft.value}px` }),
    ...(contentTop.value && { top: `${contentTop.value}px` })
  })
);

const arrStyle = computed(
  (): StyleObject => ({
    ...(arrLeft.value && { left: `${arrLeft.value}px` })
  })
);

const setStyle = (targetBtn?: HTMLElement): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if (!$wrap || !$content || !targetBtn) return;

  const tooltipWidth = $content.offsetWidth;
  const tooltipHeight = $content.offsetHeight;
  const maxWidth = window.innerHeight - props.sideMargin * 2;
  const windowHeight = window.innerHeight;
  const btnRect = targetBtn.getBoundingClientRect();
  const btnCenter = btnRect.left + btnRect.width / 2;

  // .page 요소를 찾아서 있으면 해당 요소 기준으로 left 값 계산
  const pageElement = $wrap.closest('.page');
  const pageRect = pageElement ? pageElement.getBoundingClientRect() : { left: 0, width: window.innerWidth };
  let left = btnCenter - tooltipWidth / 2;
  const pageWidth = pageRect.left + pageRect.width;
  // 최소/최대 범위 제한
  left = Math.min(Math.max(left, pageRect.left + props.sideMargin), pageWidth - tooltipWidth - props.sideMargin);

  let top = btnRect.bottom;
  if (top + tooltipHeight > windowHeight - tooltipHeight) {
    top = btnRect.top - tooltipHeight;
    isBottom.value = true;
  } else {
    isBottom.value = false;
  }

  contentLeft.value = left;
  contentTop.value = top;
  arrLeft.value = btnCenter - left;
};

const onOpen = (): void => {
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
    isBottom.value = false;
    setTimeout(() => setStyle(currentTarget.value || undefined), 1);
  });
};

const onClose = (): void => {
  isOpen.value = false;
};

const bodyTransitionEnd = (): void => {
  if (!isOpen.value) {
    isShow.value = false;
    isBottom.value = false;
  }
};

// PC용 이벤트 핸들러
const handleMouseEnter = (event: MouseEvent): void => {
  if (!props.isMobile) {
    currentTarget.value = event.currentTarget as HTMLElement;
    onOpen();
  }
};

const handleMouseLeave = (): void => {
  if (!props.isMobile) onClose();
};

const handleFocus = (event: FocusEvent): void => {
  if (!props.isMobile) {
    currentTarget.value = event.currentTarget as HTMLElement;
    onOpen();
  }
};

const handleBlur = (): void => {
  if (!props.isMobile) onClose();
};

// 모바일용 이벤트 핸들러
const handleClick = (event: MouseEvent): void => {
  if (!props.isMobile) return;

  const clickedTarget = event.currentTarget as HTMLElement;
  if (isShow.value && currentTarget.value === clickedTarget) {
    onClose();
  } else {
    currentTarget.value = clickedTarget;
    onOpen();
  }
};

// 외부클릭시 닫힘
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as Node;
  if (wrapper.value && !wrapper.value.contains(target) && !props.target?.contains(target)) {
    onClose();
  }
};

// 이벤트 바인딩
const bindEvents = (element: HTMLElement): void => {
  if (props.isMobile) {
    element.addEventListener('click', handleClick);
  } else {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
  }
};

const unbindEvents = (element: HTMLElement): void => {
  if (props.isMobile) {
    element.removeEventListener('click', handleClick);
  } else {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.removeEventListener('focus', handleFocus);
    element.removeEventListener('blur', handleBlur);
  }
};

const slots = useSlots();

watch(
  () => props.target,
  (newTarget) => {
    if (!props.notHead) return; // notHead가 false면 동작하지 않음

    if (newTarget) {
      currentTarget.value = newTarget;
      onOpen();
    } else {
      onClose();
    }
  },
  { immediate: true }
);

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if (!$wrap || !$content) return;

  isEvt = true;
  if (!props.notHead && slots.btn) {
    const $head = $wrap.querySelector('.tooltip-head');
    const firstElement = $head?.firstElementChild;
    if (firstElement) firstElement.classList.add('tooltip-btn');
  }

  const tooltipBtn = $wrap.querySelector('.tooltip-btn');
  if (tooltipBtn) bindEvents(tooltipBtn as HTMLElement);
  if (props.isMobile) document.addEventListener('click', handleClickOutside);
  const handleResize = () => setStyle(currentTarget.value || undefined);
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleResize);
});

onUnmounted((): void => {
  const $wrap = wrapper.value;
  if (!isEvt || !$wrap) return;

  const tooltipBtn = $wrap.querySelector('.tooltip-btn');
  if (tooltipBtn) unbindEvents(tooltipBtn as HTMLElement);
  if (props.isMobile) document.removeEventListener('click', handleClickOutside);
  const handleResize = () => setStyle(currentTarget.value || undefined);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleResize);
  isEvt = false;
});
</script>

<template>
  <div ref="wrapper" class="tooltip-wrap" :class="tooltipClass">
    <div v-if="!notHead" class="tooltip-head">
      <uiButton v-if="!$slots.btn" no-effect not class="tooltip-btn" aria-label="자세한 내용 확인" v-bind="$attrs">
        <icon name="tooltip" />
      </uiButton>
      <slot name="btn" />
    </div>
    <div
      v-if="!!$slots.default"
      ref="content"
      class="tooltip-body"
      :class="{ show: isShow, open: isOpen, bottom: isBottom, max: isMax }"
      :style="contentStyle"
      role="tooltip"
      @transitionend="bodyTransitionEnd"
    >
      <i class="tooltip-arr" :style="arrStyle" aria-hidden="true" />
      <div class="tooltip-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
