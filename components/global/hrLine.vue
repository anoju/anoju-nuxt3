<script lang="ts" setup>
// Types
interface Props {
  thick?: boolean;
  inset?: boolean;
  ty2?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  thick: false,
  inset: false,
  ty2: false
});

// Computed properties
const hrClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    'hr-line',
    {
      thick: props.thick,
      inset: props.inset,
      ty2: props.ty2
    }
  ];
  return rtnAry;
});
</script>

<template>
  <hr :class="hrClass" aria-hidden="true" />
</template>
