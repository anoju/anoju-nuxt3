<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
const props = defineProps({
  // value: { type: [Number, String], default: null },
  panel: { type: String, default: null },
  tabClass: { type: String, default: null }
});

const activeTab = inject<Ref<number | string> | undefined>('activeTab');
const setActiveTab = inject<(index: number) => void | undefined>('setActiveTab');
const modelValueType = inject<string | undefined>('modelValueType');

if (!activeTab || !setActiveTab || !modelValueType) {
  throw new Error('uiTab component must be a child of uiTabs component');
}

const slots = useSlots();
const slotContent = ref<string>('');
const getSlotContent = (slotName = 'default') => {
  slotContent.value = '';
  const $slot = slots[slotName] as Function;
  if ($slot && $slot().length) slotContent.value = $slot()[0].children;
};
getSlotContent();

const href = computed<string>((): string => {
  let val = '#';
  if (!!props.panel) val += props.panel;
  return val;
});

const isEqual = (a: number | string, b: number | string): boolean => {
  return modelValueType === 'number' ? Number(a) === Number(b) : a === b;
};

const tabs = inject<Ref<Array<{ value: string }>> | undefined>('tabs');
const tab = { value: slotContent.value };
const registerTab = inject<(tab: { value: string }) => void | undefined>('registerTab');
const unregisterTab = inject<(tab: { value: string }) => void | undefined>('unregisterTab');
const tabIndex = computed<number>((): number => {
  let idx = -1;
  if (tabs) idx = tabs.value.findIndex((t) => t.value === slotContent.value);
  return idx;
});
const firstActive = isEqual(tabIndex.value, activeTab.value);
const isActive = ref(firstActive);

const activeTabEvt = () => {
  isActive.value = isEqual(tabIndex.value, activeTab.value);
};

const selectTab = (e: Event) => {
  e.preventDefault();
  setActiveTab(tabIndex.value);
};

onMounted(() => {
  if (registerTab) registerTab(tab);
  activeTabEvt();
  nextTick(() => {
    if (isActive.value) setActiveTab(tabIndex.value);
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
