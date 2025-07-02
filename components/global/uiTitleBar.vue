<script lang="ts" setup>
// Slots
const slots = useSlots();

// Computed properties
const hasRightSlot = computed<boolean>(() => {
  return !!slots.right;
});
</script>

<template>
  <div class="title-bar">
    <slot />
    <div v-if="hasRightSlot" class="right">
      <slot name="right" />
    </div>
  </div>
</template>
