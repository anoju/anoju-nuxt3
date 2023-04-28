<script lang="ts" setup>
const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isShow = ref(false);
const isOpen = ref(false);

const handleClickOutside = (event: Event) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    onClose();
  }
};

const $getOffset = useNuxtApp().$getOffset;
const setStyle = () => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($wrap && $content) {
    const tooltipBtn = $wrap.querySelector('.tooltip-btn') as HTMLElement;
    const $left = $getOffset(tooltipBtn).left;
    contentWidth.value = document.body.clientWidth;
    contentLeft.value = $left * -1;
    arrLeft.value = $left + tooltipBtn.offsetWidth / 2;
  }
};
const contentWidth = ref(0);
const contentLeft = ref(0);
const contentStyle = computed(() => {
  const $obj: any = {};
  if (contentWidth.value) $obj.width = contentWidth.value + 'px';
  if (contentLeft.value) $obj.left = contentLeft.value + 'px';
  return $obj;
});

const arrLeft = ref(0);
const arrStyle = computed(() => {
  const $obj: any = {};
  if (arrLeft.value) $obj.left = arrLeft.value + 'px';
  return $obj;
});

watch(isShow, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});
const onOpen = () => {
  setStyle();
  isShow.value = true;
  setTimeout(() => {
    isOpen.value = true;
  });
};
const onClose = () => {
  isOpen.value = false;
};
const bodyTransitionEnd = () => {
  if (!isOpen.value) isShow.value = false;
};
onMounted(() => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($content) contentWidth.value = document.body.clientWidth;
  if ($wrap) {
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
    if ($content) window.addEventListener('resize', setStyle);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', setStyle);
});
</script>
<template>
  <div ref="wrapper" class="tooltip-wrap" @click.stop>
    <div class="tooltip-head">
      <uiButton v-if="!$slots.btn" no-effect not class="tooltip-btn" aria-label="자세한 내용 확인">
        <icon name="tooltip"></icon>
      </uiButton>
      <slot name="btn" />
    </div>
    <div v-if="!!$slots.default" ref="content" class="tooltip-body" :class="{ show: isShow, open: isOpen }" :style="contentStyle" role="tooltip" @transitionend="bodyTransitionEnd">
      <i class="tooltip-arr" :style="arrStyle" aria-hidden="true"></i>
      <div class="tooltip-inner">
        <slot />
        <uiButton not class="tooltip-close" aria-label="툴팁닫기" @click="onClose" />
      </div>
    </div>
  </div>
</template>
