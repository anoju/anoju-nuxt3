<script setup lang="ts">
const props = defineProps({
  flex: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
  noGap: { type: Boolean, default: false }
});
</script>
<template>
  <div class="bottom-fixed">
    <div :class="[{ flex: flex, full: full ? 'no-gap' : full && noGap }]">
      <slot />
    </div>
  </div>
</template>
