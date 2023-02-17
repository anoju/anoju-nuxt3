<template>
  <div class="section" :class="[full ? 'full-contents' : '', bottom ? 'bottom-contents' : '']">
    <slot />
  </div>
</template>

<script setup lang="ts">
// const uiInnerProps = defineProps({
//   full: { type: Boolean, default: false },
//   bottom: { type: Boolean, default: false }
// });
</script>
<script lang="ts">
export default {
  props: {
    full: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false }
  }
};
</script>
