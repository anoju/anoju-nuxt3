<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
const props = defineProps({
  id: { type: String, default: null },
  panel: { type: String, default: null },
  tabClass: { type: String, default: null }
});

const activeTab = inject<Ref<number> | undefined>('activeTab');
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
  if (panelId) val += panelId.value;
  return val;
});

const isEqual = (a: number | string, b: number | string): boolean => {
  return a === b;
};
const tabIndex = ref<number>(-1);
const childIdx = inject<Ref<number> | undefined>('childIdx');
if (childIdx) {
  tabIndex.value = childIdx.value;
  childIdx.value += 1;
}
const tabsId = inject<Ref<string> | undefined>('tabsId');
const panelsId = inject<Ref<string> | undefined>('panelsId');
const tabId = computed<string | undefined>((): string | undefined => {
  let rtnVal;
  if (tabsId) {
    rtnVal = `${tabsId.value}_${tabIndex.value}`;
  }
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
const panelId = computed<string | undefined>((): string | undefined => {
  let rtnVal;
  if (panelsId) {
    rtnVal = `${panelsId.value}_${tabIndex.value}`;
  }
  if (props.panel) rtnVal = props.panel;
  return rtnVal;
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
  activeTabEvt();
  nextTick(() => {
    if (isActive.value) setActiveTab(tabIndex.value);
  });
});
//onUnmounted(() => {
onBeforeUnmount(() => {
  if (childIdx) {
    childIdx.value -= 1;
  }
});
watchEffect(() => {
  activeTabEvt();
});

defineExpose({ isActive, selectTab });
</script>
<template>
  <li class="tab" :class="{ tabClass, active: isActive }" role="presentation">
    <a :id="tabId" :href="href" role="tab" :aria-selected="isActive ? true : false" :aria-controls="panelId" v-bind="$attrs" @click="selectTab"><slot /></a>
  </li>
</template>
