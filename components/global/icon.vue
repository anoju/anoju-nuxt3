<script lang="ts" setup>
const props = defineProps({
  type: { type: String, default: 'ico' },
  name: { type: String, default: null },
  ariaLabel: { type: String, default: null }
});
const ariaHidden = computed(() => {
  if (props.ariaLabel) return true;
  return false;
});
</script>
<template>
  <i :class="`i-${type}-${name}`" :aria-hidden="ariaHidden" :aria-label="ariaLabel" />
</template>
