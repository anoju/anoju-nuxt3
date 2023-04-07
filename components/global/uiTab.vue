<script lang="ts" setup>
const props = defineProps({
  index: { type: [Number, String], default: null }
});

const activeTab = inject<Ref<number | string> | undefined>('activeTab');
const setActiveTab = inject<(index: number | string) => void | undefined>('setActiveTab');
const modelValueType = inject<string | undefined>('modelValueType');

if (!activeTab || !setActiveTab || !modelValueType) {
  throw new Error('uiTab component must be a child of uiTabs component');
}

const isEqual = (a: number | string, b: number | string): boolean => {
  return modelValueType === 'number' ? Number(a) === Number(b) : a === b;
};
const firstActive = isEqual(props.index, activeTab.value);
const isActive = ref(firstActive);

onMounted(() => {
  isActive.value = isEqual(props.index, activeTab.value);
});

watchEffect(() => {
  isActive.value = isEqual(props.index, activeTab.value);
});

const selectTab = () => {
  setActiveTab(props.index);
};

defineExpose({ isActive, selectTab });
</script>
<template>
  <div class="tab" :class="{ active: isActive }" @click="selectTab">
    <slot />
  </div>
</template>

<style scoped>
.tab {
  cursor: pointer;
  padding: 10px;
}
.active {
  font-weight: bold;
}
</style>
