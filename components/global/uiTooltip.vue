<script lang="ts" setup>
// props
const props = defineProps({
  class: { type: [String, Array], default: null }
});

const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isShow = ref(false);
const isOpen = ref(false);

const tooltipClass = computed(() => {
  let rtnAry = [props.class];
  return rtnAry;
});
const handleClickOutside = (event: Event) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    onClose();
  }
};

const $getOffset = useNuxtApp().$getOffset;
const isBottom = ref(false);
const isMax = ref(false);

const setStyle = () => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($wrap && $content) {
    let tooltipBtn = $wrap.querySelector('.tooltip-btn') as HTMLElement;
    if (!tooltipBtn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head && $head.firstElementChild) tooltipBtn = $head.firstElementChild as HTMLElement;
    }
    const tooltipWidth = $content.offsetWidth;
    const tooltipHeight = $content.offsetHeight;
    const maxWidth = 760;
    const windowHeight = window.innerHeight;
    if (tooltipWidth >= maxWidth) isMax.value = true;
    else isMax.value = false;
    const $btnCenter = $getOffset(tooltipBtn).left + tooltipBtn.offsetWidth / 2;
    let $left = $btnCenter - tooltipWidth / 2 - window.scrollX;
    const $leftMax = document.body.clientWidth - tooltipWidth - 16;
    if ($leftMax < $left) $left = $leftMax;
    const $leftMin = 16;
    if ($left < $leftMin) $left = $leftMin;

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
const contentLeft = ref(0);
const contentTop = ref(0);
const contentStyle = computed(() => {
  const $obj: any = {};
  if (contentLeft.value) $obj.left = contentLeft.value + 'px';
  if (contentTop.value) $obj.top = contentTop.value + 'px';
  return $obj;
});

const arrLeft = ref(0);
const arrStyle = computed(() => {
  const $obj: any = {};
  if (arrLeft.value) $obj.left = arrLeft.value + 'px';
  return $obj;
});

// watch(isShow, (newValue) => {
//   if (newValue) {
//     document.addEventListener('click', handleClickOutside);
//   } else {
//     document.removeEventListener('click', handleClickOutside);
//   }
// });
const onOpen = () => {
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
    setTimeout(() => {
      setStyle();
    }, 1);
  });
};
const onClose = () => {
  isOpen.value = false;
};
const bodyTransitionEnd = () => {
  if (!isOpen.value) isShow.value = false;
};
const slots = useSlots();

let isEvt = false;
onMounted(() => {
  const $wrap = wrapper.value;
  const $content = content.value;
  // if ($content) contentWidth.value = document.body.clientWidth;
  if ($wrap) {
    if (!!slots.btn) {
      const $head = $wrap.querySelector('.tooltip-head');
      if ($head && $head.firstElementChild) $head.firstElementChild.classList.add('tooltip-btn');
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

onUnmounted(() => {
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
        <!-- <uiButton not class="tooltip-close" aria-label="툴팁닫기" @click="onClose" /> -->
      </div>
    </div>
  </div>
</template>
