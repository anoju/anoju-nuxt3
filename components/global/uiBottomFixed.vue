<script lang="ts" setup>
// Types
interface Props {
  flex?: boolean;
  full?: boolean;
  noGap?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  flex: false,
  full: false,
  noGap: false
});

// Computed properties
const innerClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    {
      flex: props.flex,
      full: props.full,
      'no-gap': props.noGap
    }
  ];
  return rtnAry;
});
</script>

<template>
  <div class="bottom-fixed">
    <div :class="innerClass">
      <slot />
    </div>
  </div>
</template>
