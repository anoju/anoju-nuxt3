<script lang="ts" setup>
const props = defineProps({
  thick: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  ty2: { type: Boolean, default: false }
});
</script>
<template>
  <hr class="hr-line" :class="{ thick: thick, inset: inset, ty2: ty2 }" aria-hidden="true" />
</template>
