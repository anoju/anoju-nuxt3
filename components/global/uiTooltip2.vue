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
  class: string | string[] | null;
  notHead?: boolean;
  isMobile?: boolean;
  sideMargin?: number;
  targetSelector?: string;
  container?: HTMLElement | null;
}

const props = withDefaults(defineProps<Props>(), {
  class: null,
  notHead: false,
  isMobile: true,
  sideMargin: 16,
  targetSelector: '',
  container: null
});

const slots = useSlots();
const wrapper = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const targetElements = ref<HTMLElement[]>([]);
const eventTarget = ref<HTMLElement | null>(null);
const currentTarget = ref<HTMLElement | null>(null);
const isShow = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const tooltipClass = computed((): (string | string[] | null | undefined)[] => {
  return [props.class];
});

const isBottom = ref<boolean>(false);
const isMax = ref<boolean>(false);

const setStyle = (targetBtn?: HTMLElement): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if ($wrap && $content) {
    let tooltipBtn: HTMLElement | null = null;

    if (props.notHead && targetBtn) {
      tooltipBtn = targetBtn;
    } else {
      tooltipBtn = $wrap.querySelector('.tooltip-btn') as HTMLElement | null;
      if (!tooltipBtn) {
        const $head = $wrap.querySelector('.tooltip-head');
        if ($head?.firstElementChild) tooltipBtn = $head.firstElementChild as HTMLElement;
      }
    }

    if (!tooltipBtn) return;

    const tooltipWidth = $content.offsetWidth;
    const tooltipHeight = $content.offsetHeight;
    const maxWidth = window.innerHeight - props.sideMargin * 2;
    const windowHeight = window.innerHeight;

    isMax.value = tooltipWidth >= maxWidth;

    const btnRect = tooltipBtn.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    const $btnCenter = btnRect.left + scrollX + btnRect.width / 2;
    let $left = $btnCenter - tooltipWidth / 2;
    const $leftMax = document.body.clientWidth - tooltipWidth - props.sideMargin;

    $left = Math.min(Math.max($left, props.sideMargin), $leftMax);

    let $top = btnRect.bottom + scrollY;
    if ($top + tooltipHeight > windowHeight - tooltipHeight) {
      $top = btnRect.top + scrollY - tooltipHeight;
      isBottom.value = true;
    } else {
      isBottom.value = false;
    }

    contentLeft.value = $left;
    contentTop.value = $top;
    arrLeft.value = $btnCenter - $left;
  }
};

const contentLeft = ref<number>(0);
const contentTop = ref<number>(0);

const contentStyle = computed((): StyleObject => {
  const styleObject: StyleObject = {};
  if (contentLeft.value) styleObject.left = `${contentLeft.value}px`;
  if (contentTop.value) styleObject.top = `${contentTop.value}px`;
  return styleObject;
});

const arrLeft = ref<number>(0);

const arrStyle = computed((): StyleObject => {
  const styleObject: StyleObject = {};
  if (arrLeft.value) styleObject.left = `${arrLeft.value}px`;
  return styleObject;
});

const onOpen = (): void => {
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
    setTimeout(() => {
      setStyle();
    }, 1);
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
  if (props.isMobile) return;
  let targetElement = event.currentTarget as HTMLElement;
  if (props.notHead && props.container) {
    // targetElement이 targetSelector과 일치한지 확인
    targetElement = targetElement.closest(props.targetSelector) as HTMLElement;
    if (!targetElement) return;
  }
  currentTarget.value = targetElement;
  onOpen();
  setTimeout(() => setStyle(targetElement));
};

const handleMouseLeave = (event: MouseEvent): void => {
  if (props.isMobile) return;
  let targetElement = event.currentTarget as HTMLElement;
  if (props.notHead && props.container) {
    // targetElement이 targetSelector과 일치한지 확인
    targetElement = targetElement.closest(props.targetSelector) as HTMLElement;
    if (!targetElement) return;
  }
  onClose();
};

const handleFocus = (event: FocusEvent): void => {
  if (props.isMobile) return;
  let targetElement = event.currentTarget as HTMLElement;
  if (props.notHead && props.container) {
    // targetElement이 targetSelector과 일치한지 확인
    targetElement = targetElement.closest(props.targetSelector) as HTMLElement;
    if (!targetElement) return;
  }
  currentTarget.value = targetElement;
  onOpen();
  setTimeout(() => setStyle(targetElement));
};

const handleBlur = (event: FocusEvent): void => {
  if (props.isMobile) return;
  let targetElement = event.currentTarget as HTMLElement;
  if (props.notHead && props.container) {
    // targetElement이 targetSelector과 일치한지 확인
    targetElement = targetElement.closest(props.targetSelector) as HTMLElement;
    if (!targetElement) return;
  }
  onClose();
};

// 모바일용 이벤트 핸들러
const handleTargetClick = (event: MouseEvent): void => {
  let clickedTarget = event.currentTarget as HTMLElement;
  if (props.notHead && props.container) {
    // event.currentTarget이 targetSelector과 일치한지 확인
    clickedTarget = clickedTarget.closest(props.targetSelector) as HTMLElement;
    if (!clickedTarget) return;
  }

  if (isShow.value && currentTarget.value === clickedTarget) {
    onClose();
  } else {
    currentTarget.value = clickedTarget;
    onOpen();
    setTimeout(() => setStyle(clickedTarget));
  }
};

// 외부클릭시 닫힘
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as Node;
  if (wrapper.value && !wrapper.value.contains(target) && !targetElements.value.some((el) => el.contains(target))) {
    onClose();
  }
};

let isEvt = false;

// 이벤트 바인딩
const bindEvents = (): void => {
  if (!eventTarget.value) return;
  if (props.isMobile) {
    eventTarget.value.addEventListener('click', handleTargetClick);
  } else {
    eventTarget.value.addEventListener('mouseenter', handleMouseEnter);
    eventTarget.value.addEventListener('mouseleave', handleMouseLeave);
    eventTarget.value.addEventListener('focus', handleFocus);
    eventTarget.value.addEventListener('blur', handleBlur);
  }
};

const unbindEvents = (): void => {
  if (!eventTarget.value) return;
  if (props.isMobile) {
    eventTarget.value.removeEventListener('click', handleTargetClick);
  } else {
    eventTarget.value.removeEventListener('mouseenter', handleMouseEnter);
    eventTarget.value.removeEventListener('mouseleave', handleMouseLeave);
    eventTarget.value.removeEventListener('focus', handleFocus);
    eventTarget.value.removeEventListener('blur', handleBlur);
  }
};

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if (!$wrap) return;
  if (props.notHead && props.container) {
    eventTarget.value = props.container;
  } else if (slots.btn) {
    const $head = $wrap.querySelector('.tooltip-head');
    const $btn = $wrap.querySelector('.tooltip-btn');
    if (!$btn && $head?.firstElementChild) {
      $head.firstElementChild.classList.add('tooltip-btn');
    }
  }

  console.log(eventTarget.value, props.container);

  if (!props.notHead) {
    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) eventTarget.value = tooltipBtn as HTMLElement;
  }

  if ($content && eventTarget.value) {
    isEvt = true;
    bindEvents();
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', () => setStyle(currentTarget.value || undefined));
    window.addEventListener('scroll', () => setStyle(currentTarget.value || undefined));
  }
});

onUnmounted((): void => {
  const $wrap = wrapper.value;
  if (!$wrap) return;
  if (isEvt) {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', () => setStyle(currentTarget.value || undefined));
    window.removeEventListener('scroll', () => setStyle(currentTarget.value || undefined));
    unbindEvents();
    isEvt = false;
  }
});
</script>

<template>
  <div ref="wrapper" class="tooltip-wrap" :classs="tooltipClass">
    <div v-if="!notHead" class="tooltip-head">
      <uiButton v-if="!$slots.btn" no-effect not class="tooltip-btn" aria-label="자세한 내용 확인" v-bind="$attrs">
        <icon name="tooltip"></icon>
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
      <i class="tooltip-arr" :style="arrStyle" aria-hidden="true"></i>
      <div class="tooltip-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
