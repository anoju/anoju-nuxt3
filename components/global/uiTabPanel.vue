<script lang="ts" setup>
const props = defineProps({
  id: { type: String, default: null },
  tab: { type: String, default: null }
});
const activePanel = inject<Ref<number>>('activePanel');
if (!activePanel) {
  throw new Error('uiTabPanel component must be a child of uiTabPanels component');
}
const isEqual = (a: number | string, b: number | string): boolean => {
  return a === b;
};

const panelIndex = ref<number>(-1);
const childIdx = inject<Ref<number> | undefined>('childIdx');
if (childIdx) {
  panelIndex.value = childIdx.value;
  childIdx.value += 1;
}
const tabsId = inject<Ref<string> | undefined>('tabsId');
const panelsId = inject<Ref<string> | undefined>('panelsId');
const tabId = computed<string | undefined>((): string | undefined => {
  let rtnVal;
  if (tabsId) {
    rtnVal = `${tabsId.value}_${panelIndex.value}`;
  }
  if (props.tab) rtnVal = props.tab;
  return rtnVal;
});
const panelId = computed<string | undefined>((): string | undefined => {
  let rtnVal;
  if (panelsId) {
    rtnVal = `${panelsId.value}_${panelIndex.value}`;
  }
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const firstActive = isEqual(panelIndex.value, activePanel.value);
const isActive = ref(firstActive);

watch(activePanel, (newValue, oldValue) => {
  isActive.value = isEqual(panelIndex.value, activePanel.value);
});
</script>
<template>
  <div :id="panelId" class="tab-panel" :class="{ active: isActive }" role="tabpanel" :aria-labelledby="tabId" :aria-expanded="isActive ? 'true' : 'false'">
    <slot />
  </div>
</template>
