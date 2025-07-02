<script lang="ts" setup>
// Types
interface Props {
  type?: string;
  name?: string | null;
  ariaLabel?: string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  type: 'ico',
  name: null,
  ariaLabel: null
});

// Computed properties
const iconClass = computed<string>(() => {
  if (!props.name) {
    return `i-${props.type}`;
  }
  return `i-${props.type}-${props.name}`;
});

const ariaHidden = computed<boolean>(() => {
  // ariaLabel이 있으면 스크린 리더가 읽어야 하므로 aria-hidden="false"
  // ariaLabel이 없으면 장식용 아이콘이므로 aria-hidden="true"
  return !props.ariaLabel;
});

const ariaLabelValue = computed<string | undefined>(() => {
  return props.ariaLabel || undefined;
});
</script>

<template>
  <i 
    :class="iconClass" 
    :aria-hidden="ariaHidden" 
    :aria-label="ariaLabelValue"
  />
</template>
