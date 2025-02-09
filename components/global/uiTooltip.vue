<script lang="ts" setup>
import { CSSProperties } from 'vue';

interface StyleObject extends CSSProperties {
  left?: string;
  top?: string;
}

interface Props {
  class: string | string[] | null;
  notHead?: boolean;
  targetSelector?: string; // 클래스나 data 속성 선택자
}

const props = withDefaults(defineProps<Props>(), {
  class: null,
  notHead: false,
  targetSelector: ''
});

const wrapper = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const targetElements = ref<HTMLElement[]>([]);
const currentTarget = ref<HTMLElement | null>(null);
const isShow = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const tooltipClass = computed((): (string | string[] | null | undefined)[] => {
  return [props.class];
});

const $getOffset = useNuxtApp().$getOffset;
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
    const maxWidth = 760;
    const windowHeight = window.innerHeight;

    isMax.value = tooltipWidth >= maxWidth;

    const $btnCenter = $getOffset(tooltipBtn).left + tooltipBtn.offsetWidth / 2;
    let $left = $btnCenter - tooltipWidth / 2 - window.scrollX;
    const $leftMax = document.body.clientWidth - tooltipWidth - 16;

    $left = Math.min(Math.max($left, 16), $leftMax);

    let $top = $getOffset(tooltipBtn).top + tooltipBtn.offsetHeight - window.scrollY;
    if ($top + tooltipHeight > windowHeight - tooltipHeight) {
      $top = $top - tooltipHeight - tooltipBtn.offsetHeight;
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
  isBottom.value = false;
};

const bodyTransitionEnd = (): void => {
  if (!isOpen.value) isShow.value = false;
};

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

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as Node;
  if (wrapper.value && !wrapper.value.contains(target) && !targetElements.value.some((el) => el.contains(target))) {
    onClose();
  }
};
const slots = useSlots();

let isEvt = false;

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if ($wrap) {
    if (props.notHead && props.targetSelector) {
      const targets = document.querySelectorAll<HTMLElement>(props.targetSelector);
      targetElements.value = Array.from(targets);
      targetElements.value.forEach((target) => {
        target.addEventListener('click', handleTargetClick);
      });
    } else if (slots.btn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head?.firstElementChild) {
        $head.firstElementChild.classList.add('tooltip-btn');
      }
    }

    if (!props.notHead) {
      const tooltipBtn = $wrap.querySelector('.tooltip-btn');
      if (tooltipBtn) {
        tooltipBtn.addEventListener('click', handleTargetClick as EventListener);
      }
    }

    if ($content) {
      isEvt = true;
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('resize', () => setStyle(currentTarget.value || undefined));
      window.addEventListener('scroll', () => setStyle(currentTarget.value || undefined));
    }
  }
});

onUnmounted((): void => {
  if (isEvt) {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', () => setStyle(currentTarget.value || undefined));
    window.removeEventListener('scroll', () => setStyle(currentTarget.value || undefined));
    if (props.notHead) {
      targetElements.value.forEach((target) => {
        target.removeEventListener('click', handleTargetClick);
      });
    }
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
