<script setup lang="ts">
const props = defineProps({
  full: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false }
});
</script>
<template>
  <div class="section" :class="[{ 'full-contents': full, 'justify-center': center ? 'bottom-contents' : bottom }]">
    <slot />
  </div>
</template>
