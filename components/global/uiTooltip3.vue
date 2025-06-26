<script lang="ts" setup>
// CSSProperties 타입을 직접 정의 (Vue 3에서는 CSSProperties가 export되지 않음)
type CSSProperties = {
  [key: string]: string | number | undefined;
};

interface StyleObject extends CSSProperties {
  left?: string;
  top?: string;
}

interface Props {
  btnSmall?: boolean;
  notHead?: boolean;
  isMobile?: boolean;
  sideMargin?: number;
  label?: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  btnSmall: false,
  notHead: false,
  isMobile: true,
  sideMargin: 12,
  label: undefined
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

const setTitle = computed(() => {
  let txt = '툴팁 확인';
  if (props.label) txt = props.label + ' ' + txt;
  return txt;
});

const setStyle = (targetElement?: HTMLElement): void => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if (!$wrap || !$content || !targetElement) return;

  const tooltipBtn = (targetElement.closest('.tooltip-head') as HTMLElement) || (targetElement.querySelector('.tooltip-head') as HTMLElement) || targetElement;
  const tooltipWidth = $content.offsetWidth;
  const maxWidth = props.isMobile ? window.innerHeight - props.sideMargin * 2 : parseInt(window.getComputedStyle($content).maxWidth);
  isMax.value = tooltipWidth >= maxWidth;
  setTimeout(() => {
    const windowHeight = window.innerHeight;
    const btnRect = targetElement.getBoundingClientRect();
    const btnCenter = btnRect.left + btnRect.width / 2;

    // .page 요소를 찾아서 있으면 해당 요소 기준으로 left 값 계산
    const pageElement = $wrap.closest('.page') || $wrap.closest('.popup');
    const pageRect = pageElement ? pageElement.getBoundingClientRect() : { left: 0, width: window.innerWidth };
    let left = btnCenter - tooltipWidth / 2;
    const pageWidth = pageRect.left + pageRect.width;
    // 최소/최대 범위 제한
    left = Math.min(Math.max(left, pageRect.left + props.sideMargin), pageWidth - tooltipWidth - props.sideMargin);
    const tooltipHeight = $content.offsetHeight;
    let top = btnRect.bottom;
    if (top + tooltipHeight > windowHeight - 40) {
      top = btnRect.top - tooltipHeight;
      isBottom.value = true;
    } else {
      isBottom.value = false;
    }

    contentLeft.value = left;
    contentTop.value = top;
    arrLeft.value = btnCenter - left;
  }, 1);
};

const onOpen = (): void => {
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
    isBottom.value = false;
    isMax.value = false;
    setTimeout(() => setStyle(currentTarget.value || undefined), 1);
  }, 1);
};

const onClose = (): void => {
  isOpen.value = false;
};

const bodyTransitionEnd = (): void => {
  if (!isOpen.value) {
    isShow.value = false;
    isBottom.value = false;
    isMax.value = false;
  }
};

// PC용 이벤트 핸들러
const handleMouseEnter = (event: MouseEvent): void => {
  if (props.isMobile) return;
  if (!props.notHead) currentTarget.value = event.currentTarget as HTMLElement;
  onOpen();
};

const handleMouseLeave = (): void => {
  if (props.isMobile) return;
  onClose();
};

const handleFocus = (event: FocusEvent): void => {
  if (props.isMobile) return;
  if (!props.notHead) currentTarget.value = event.currentTarget as HTMLElement;
  onOpen();
};

const handleBlur = (): void => {
  if (props.isMobile) return;
  onClose();
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
  if (wrapper.value && !wrapper.value.contains(target) && !currentTarget.value?.contains(target)) {
    onClose();
  }
};

const handleResize = () => setStyle(currentTarget.value || undefined);

// 이벤트 바인딩
const bindEvents = (): void => {
  if (props.isMobile) {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    document.addEventListener('click', handleClickOutside);
  } else {
    window.addEventListener('resize', onClose);
    window.addEventListener('scroll', onClose);
  }
};

const unbindEvents = (): void => {
  if (props.isMobile) {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize);
    document.removeEventListener('click', handleClickOutside);
  } else {
    window.removeEventListener('resize', onClose);
    window.removeEventListener('scroll', onClose);
  }
};

// 외부에서 사용할 메서드들
const open = (targetElement: HTMLElement): void => {
  if (!props.notHead) return;
  currentTarget.value = targetElement;
  onOpen();
};

const close = (): void => {
  if (!props.notHead) return;
  onClose();
};

// 외부로 노출할 메서드들을 정의
defineExpose({
  open,
  close
});

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if (!$wrap || !$content) return;

  bindEvents();
});

onUnmounted((): void => {
  const $wrap = wrapper.value;
  if (!$wrap) return;

  unbindEvents();
});
</script>

<template>
  <div
    ref="wrapper"
    class="tooltip-wrap"
    :class="{ 'not-head': notHead }"
    @focusin="handleFocus"
    @focusout="handleBlur"
    @mouseover="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="!notHead" class="tooltip-head" @click="handleClick">
      <uiButton
        v-if="!$slots.btn"
        no-effect
        not
        class="tooltip-btn"
        :class="{ small: btnSmall }"
        :aria-label="isMobile ? setTitle : undefined"
        :title="isMobile ? undefined : setTitle"
      >
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
