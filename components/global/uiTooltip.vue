<script lang="ts" setup>
const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const handleClickOutside = (event: Event) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    isOpen.value = false;
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
const contentWidth = ref(document.body.clientWidth);
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
  if (contentLeft.value) $obj.left = arrLeft.value + 'px';
  return $obj;
});

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

const onClose = () => {
  isOpen.value = false;
};

onMounted(() => {
  const $wrap = wrapper.value;
  const $content = content.value;
  if ($wrap) {
    const tooltipBtn = $wrap.querySelector('.tooltip-btn');
    if (tooltipBtn) {
      tooltipBtn.addEventListener('click', () => {
        if ($content) {
          setStyle();
          isOpen.value = !isOpen.value;
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
    <uiButton v-if="!$slots.btn" no-effect not class="tooltip-btn" aria-label="자세한 내용 확인">
      <icon name="tooltip"></icon>
    </uiButton>
    <slot name="btn" />
    <div v-if="!!$slots.default" ref="content" class="tooltip-cont" :class="{ open: isOpen }" :style="contentStyle" role="tooltip">
      <i class="tooltip-arr" :style="arrStyle" aria-hidden="true"></i>
      <div class="tooltip-inner">
        <slot />
        <uiButton not class="tooltip-close" aria-label="툴팁닫기" @click="onClose" />
      </div>
    </div>
  </div>
</template>
