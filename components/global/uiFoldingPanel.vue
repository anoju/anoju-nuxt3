<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean, default: null },
  active: { type: Boolean, default: false },
  duration: { type: Number, default: 300 },
  endScroll: { type: Boolean, default: true },
  scrolling: { type: Boolean, default: null }
});

const nuxtApp = useNuxtApp();
const el = ref<HTMLElement | null>(null);
const show = ref(props.modelValue ?? false);

const setStyle = computed(() => {
  const rtnVal: any = {};
  if (show.value) {
    rtnVal.display = 'block';
  } else {
    rtnVal.display = 'none';
  }
  return rtnVal;
});

const emit = defineEmits(['update:modelValue']);
const $duration = 300;

// show 값이 변경될 때 부모에게 알림
watch(show, (newValue) => {
  if (props.modelValue !== null) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    const $el = el.value;
    if (!$el) return;
    if (newValue) {
      show.value = true;
      nuxtApp.$slideDown($el, $duration, () => {
        // isFolding = false;
      });
    } else {
      nuxtApp.$slideUp($el, $duration, () => {
        show.value = false;
      });
    }
  }
);
</script>
<template>
  <div ref="el" :style="setStyle" :aria-hidden="show ? 'false' : 'true'">
    <slot />
  </div>
</template>
