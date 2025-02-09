<script lang="ts" setup>
import { CSSProperties } from 'vue';

interface StyleObject extends CSSProperties {
  left?: string;
  top?: string;
}

interface Props {
  class: string | string[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  class: null
});

const wrapper = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const isShow = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const tooltipClass = computed((): (string | string[] | null | undefined)[] => {
  return [props.class];
});

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as Node;
  if (wrapper.value && !wrapper.value.contains(target)) {
    onClose();
  }
};

const $getOffset = useNuxtApp().$getOffset;
const isBottom = ref<boolean>(false);
const isMax = ref<boolean>(false);

const setStyle = (): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if ($wrap && $content) {
    let tooltipBtn = $wrap.querySelector('.tooltip-btn') as HTMLElement | null;
    if (!tooltipBtn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head?.firstElementChild) tooltipBtn = $head.firstElementChild as HTMLElement;
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

const slots = useSlots();

let isEvt = false;

onMounted((): void => {
  const $wrap = wrapper.value;
  const $content = content.value;

  if ($wrap) {
    if (slots.btn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head?.firstElementChild) {
        $head.firstElementChild.classList.add('tooltip-btn');
      }
    }

    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) {
      tooltipBtn.addEventListener('click', () => {
        if ($content) {
          if (isShow.value) {
            onClose();
          } else {
            onOpen();
          }
        }
      });
    }

    if ($content) {
      isEvt = true;
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('resize', setStyle);
      window.addEventListener('scroll', setStyle);
    }
  }
});

onUnmounted((): void => {
  if (isEvt) {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', setStyle);
    window.removeEventListener('scroll', setStyle);
    isEvt = false;
  }
});
</script>

<template>
  <div ref="wrapper" class="tooltip-wrap" :classs="tooltipClass">
    <div class="tooltip-head">
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
