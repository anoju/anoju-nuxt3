<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
const props = defineProps({
  panel: { type: String, default: null },
  tabClass: { type: String, default: null }
});

const activeTab = inject<Ref<number | string> | undefined>('activeTab');
const setActiveTab = inject<(index: number) => void | undefined>('setActiveTab');

if (!activeTab || !setActiveTab) {
  throw new Error('uiTab component must be a child of uiTabs component');
}
/*
const slots = useSlots();
const slotContent = ref<string>('');
const getSlotContent = (slotName = 'default') => {
  slotContent.value = '';
  const $slot = slots[slotName] as Function;
  if ($slot && $slot().length) slotContent.value = $slot()[0].children;
};
getSlotContent();
*/

const href = computed<string>((): string => {
  let val = '#';
  if (!!props.panel) val += props.panel;
  return val;
});

const isEqual = (a: number | string, b: number | string): boolean => {
  return a === b;
};
const tabIndex = ref<number>(-1);
const index = inject<Ref<number> | undefined>('index');
if (index) {
  tabIndex.value = index.value;
  index.value += 1;
}
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
  activeTabEvt();
  nextTick(() => {
    if (isActive.value) setActiveTab(tabIndex.value);
  });
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
