<script lang="ts" setup>
const props = defineProps({
  value: { type: [Number, String], default: null },
  panel: { type: String, default: null },
  tabClass: { type: String, default: null }
});

const activeTab = inject<Ref<number | string> | undefined>('activeTab');
const setActiveTab = inject<(value: number | string, index: number) => void | undefined>('setActiveTab');
const modelValueType = inject<string | undefined>('modelValueType');

if (!activeTab || !setActiveTab || !modelValueType) {
  throw new Error('uiTab component must be a child of uiTabs component');
}

const isEqual = (a: number | string, b: number | string): boolean => {
  return modelValueType === 'number' ? Number(a) === Number(b) : a === b;
};
const firstActive = isEqual(props.value, activeTab.value);
const isActive = ref(firstActive);

const tabs = inject<Ref<Array<{ value: number | string }>> | undefined>('tabs');
const tab = { value: modelValueType === 'number' ? Number(props.value) : props.value };
const tabIndex = ref(-1);
const registerTab = inject<(tab: { value: number | string }) => void | undefined>('registerTab');
const unregisterTab = inject<(tab: { value: number | string }) => void | undefined>('unregisterTab');

const href = computed<string>((): string => {
  let val = '#';
  if (!!props.panel) val += props.panel;
  return val;
});

const activeTabEvt = () => {
  isActive.value = isEqual(props.value, activeTab.value);
  if (tabs) tabIndex.value = tabs.value.findIndex((t) => t.value === tab.value);
};

const selectTab = (e: Event) => {
  e.preventDefault();
  setActiveTab(props.value, tabIndex.value);
};

onMounted(() => {
  if (registerTab) registerTab(tab);
  activeTabEvt();
  nextTick(() => {
    if (isActive.value) setActiveTab(props.value, tabIndex.value);
  });
});
onBeforeUnmount(() => {
  if (unregisterTab) unregisterTab(tab);
});
watchEffect(() => {
  activeTabEvt();
});

defineExpose({ isActive, selectTab });
</script>
<template>
  <li class="tab" :class="{ tabClass, active: isActive }" role="presentation">
    <a :href="href" role="tab" :aria-selected="isActive ? true : false" :aria-controls="panel" v-bind="$attrs" @click="selectTab"><slot /></a>
  </li>
</template>
