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

const setActiveTab = (value: number | string, index: number) => {
  if (typeof props.modelValue === 'number') {
    activeTab.value = Number(value);
  } else {
    activeTab.value = value;
  }
  console.log(index);
};

defineExpose({ activeTab, setActiveTab });

provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);
provide('modelValueType', typeof props.modelValue);

const tabs = ref<Array<{ value: number | string }>>([]);
provide('tabs', tabs);
const registerTab = (tab: { value: number | string }) => {
  tabs.value.push(tab);
  tabs.value.sort((a, b) => {
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value - b.value;
    }
    return String(a.value).localeCompare(String(b.value));
  });
};
provide('registerTab', registerTab);

const unregisterTab = (tab: { value: number | string }) => {
  const index = tabs.value.findIndex((t) => t.value === tab.value);
  if (index !== -1) {
    tabs.value.splice(index, 1);
  }
};
provide('unregisterTab', unregisterTab);
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
