<script lang="ts" setup>
import { CSSProperties } from 'vue';

interface StyleObject extends CSSProperties {
  left?: string;
  top?: string;
}

interface Props {
  class: string | string[] | null;
  notHead?: boolean;
  targetSelector?: string;
  isMobile?: boolean;
  sideMargin?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: null,
  notHead: false,
  targetSelector: '',
  isMobile: true,
  sideMargin: 16
});

const slots = useSlots();
const wrapper = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const targetElements = ref<HTMLElement[]>([]);
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
  const targetElement = event.currentTarget as HTMLElement;
  currentTarget.value = targetElement;
  onOpen();
  setTimeout(() => setStyle(targetElement));
};

const handleMouseLeave = (event: MouseEvent): void => {
  if (props.isMobile) return;
  onClose();
};

const handleFocus = (event: FocusEvent): void => {
  if (props.isMobile) return;
  const targetElement = event.currentTarget as HTMLElement;
  currentTarget.value = targetElement;
  onOpen();
  setTimeout(() => setStyle(targetElement));
};

const handleBlur = (event: FocusEvent): void => {
  if (props.isMobile) return;
  onClose();
};

// 모바일용 이벤트 핸들러
const handleTargetClick = (event: MouseEvent): void => {
  const clickedTarget = event.currentTarget as HTMLElement;

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
const bindEvents = (element: HTMLElement): void => {
  if (props.isMobile) {
    element.addEventListener('click', handleTargetClick);
  } else {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
  }
};

const unbindEvents = (element: HTMLElement): void => {
  if (props.isMobile) {
    element.removeEventListener('click', handleTargetClick);
  } else {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.removeEventListener('focus', handleFocus);
    element.removeEventListener('blur', handleBlur);
  }
};

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if (!$wrap) return;
  if (props.notHead && props.targetSelector) {
    const targets = document.querySelectorAll<HTMLElement>(props.targetSelector);
    targetElements.value = Array.from(targets);
    targetElements.value.forEach((target) => {
      bindEvents(target);
    });
  } else if (slots.btn) {
    const $head = $wrap.querySelector('.tooltip-head');
    const $btn = $wrap.querySelector('.tooltip-btn');
    if (!$btn && $head?.firstElementChild) {
      $head.firstElementChild.classList.add('tooltip-btn');
    }
  }

  if (!props.notHead) {
    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) bindEvents(tooltipBtn as HTMLElement);
  }

  if ($content) {
    isEvt = true;
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
    isEvt = false;
  }
  if (props.notHead) {
    targetElements.value.forEach((target) => {
      unbindEvents(target);
    });
  } else {
    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) unbindEvents(tooltipBtn as HTMLElement);
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
