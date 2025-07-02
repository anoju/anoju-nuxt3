<script lang="ts" setup>
// Types
interface Props {
  id?: string | null;
  tab?: string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  id: null,
  tab: null
});

// Inject from parent uiTabPanels component
const activePanel = inject<Ref<number>>('activePanel');
const childIdx = inject<Ref<number>>('childIdx');
const tabsId = inject<Ref<string>>('tabsId');
const panelsId = inject<Ref<string>>('panelsId');

// Validate required injections
if (!activePanel) {
  throw new Error('uiTabPanel component must be a child of uiTabPanels component');
}

// Reactive state
const panelIndex = ref<number>(-1);

// Initialize panel index
if (childIdx) {
  panelIndex.value = childIdx.value;
  childIdx.value += 1;
}

// Utility functions
const isEqual = (a: number | string, b: number | string): boolean => {
  return a === b;
};

// Computed properties
const tabId = computed<string | undefined>(() => {
  let rtnVal: string | undefined;
  if (tabsId) {
    rtnVal = `${tabsId.value}_${panelIndex.value}`;
  }
  if (props.tab) rtnVal = props.tab;
  return rtnVal;
});

const panelId = computed<string | undefined>(() => {
  let rtnVal: string | undefined;
  if (panelsId) {
    rtnVal = `${panelsId.value}_${panelIndex.value}`;
  }
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

// Initialize active state
const firstActive = isEqual(panelIndex.value, activePanel.value);
const isActive = ref<boolean>(firstActive);

// Watchers
watch(activePanel, (newValue: number, oldValue: number) => {
  isActive.value = isEqual(panelIndex.value, activePanel.value);
});
</script>

<template>
  <div 
    :id="panelId" 
    class="tab-panel" 
    :class="{ active: isActive }" 
    role="tabpanel" 
    :aria-labelledby="tabId" 
    :aria-expanded="isActive"
  >
    <slot />
  </div>
</template>
