<script lang="ts" setup>
// Types
interface Props {
  full?: boolean;
  center?: boolean;
  bottom?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  full: false,
  center: false,
  bottom: false
});

// Computed properties
const sectionClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    'section',
    {
      'full-contents': props.full,
      'justify-center': props.center,
      'bottom-contents': props.bottom
    }
  ];
  return rtnAry;
});
</script>

<template>
  <div :class="sectionClass">
    <slot />
  </div>
</template>
