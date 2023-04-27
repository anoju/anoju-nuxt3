<script lang="ts" setup>
const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const handleClickOutside = (event: Event) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

onMounted(() => {
  if (wrapper.value) {
    const tooltipBtn = wrapper.value.querySelector('.tooltip-btn');
    if (tooltipBtn) {
      tooltipBtn.addEventListener('click', () => {
        isOpen.value = !isOpen.value;
      });
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
  <div ref="wrapper" class="tooltip-wrap" @click.stop>
    <uiButton v-if="!$slots.btn" not class="tooltip-btn" aria-label="자세한 내용 확인">
      <icon name="tooltip"></icon>
    </uiButton>
    <slot name="btn" />
    <div v-if="!!$slots.default" ref="content" class="tooltip-cont" role="tooltip">
      <i class="tooltip-arr" aria-hidden="true"></i>
      <div class="tooltip-inner"><slot /></div>
    </div>
  </div>
</template>
