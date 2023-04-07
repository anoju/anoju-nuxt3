<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: [Number, String], default: null }
});

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: number | string): void;
// }>();
const emit = defineEmits(['update:modelValue']);

const activeTab = ref(props.modelValue ?? 0);

watch(activeTab, (newValue) => {
  emit('update:modelValue', newValue);
});

const setActiveTab = (index: number | string) => {
  if (typeof props.modelValue === 'number') {
    activeTab.value = Number(index);
  } else {
    activeTab.value = index;
  }
};

defineExpose({ activeTab, setActiveTab });

provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);
provide('modelValueType', typeof props.modelValue);
</script>
<template>
  <div>
    <div class="tabs">
      <slot></slot>
    </div>
    <div class="tab-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped>
.tabs {
  display: flex;
}
.tab-content {
  display: none;
}
</style>
