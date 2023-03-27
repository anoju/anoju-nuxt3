<script setup lang="ts">
const props = defineProps({
  full: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false }
});
</script>
<template>
  <div class="section" :class="[full ? 'full-contents' : '', full && center ? 'justify-center' : '', bottom ? 'bottom-contents' : '']">
    <slot />
  </div>
</template>
