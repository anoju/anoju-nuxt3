<script lang="ts" setup>
// Types
interface Props {
  modelValue?: number | null;
  id?: string | null;
  tabs?: string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  id: null,
  tabs: null
});

// Composables
const nuxtApp = useNuxtApp();

// Global counter for unique IDs
let instanceId = 0;
if (props.modelValue) {
  const componentName = 'tabPanels';
  if (!nuxtApp.$globalCounters[componentName]) {
    nuxtApp.$globalCounters[componentName] = 1;
  } else {
    nuxtApp.$globalCounters[componentName]++;
  }
  instanceId = nuxtApp.$globalCounters[componentName];
}

// Template refs and reactive state
const el = ref<HTMLElement | null>(null);
const childIdx = ref<number>(0);
const activePanel = ref<number>(props.modelValue ?? 0);
const isTransition = ref<boolean>(false);
const setHeight = ref<number | null>(null);

// Computed properties
const tabsId = computed<string>(() => {
  let rtnVal = `tab_btn_${instanceId}`;
  if (props.tabs) rtnVal = props.tabs;
  return rtnVal;
});

const panelsId = computed<string>(() => {
  let rtnVal = `tab_panel_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const panelStyle = computed<Record<string, string>>(() => {
  const rtnVal: Record<string, string> = {};
  if (setHeight.value) rtnVal.height = `${setHeight.value}px`;
  return rtnVal;
});

// Provide data to child components
provide('tabsId', tabsId);
provide('panelsId', panelsId);
provide('childIdx', childIdx);
provide('activePanel', activePanel);

// Methods
const getActiveHeight = (): number | null => {
  const $el = el.value;
  if (!$el) return null;
  const $active = $el.querySelector('.tab-panel.active') as HTMLElement;
  if (!$active) return null;
  return $active.offsetHeight;
};

const setHeightEnd = (): void => {
  isTransition.value = false;
  setHeight.value = null;
};

// Watchers
watch(
  () => props.modelValue,
  (newValue: number | null, oldValue: number | null) => {
    setHeight.value = getActiveHeight();
    isTransition.value = true;
    activePanel.value = newValue ?? 0;
    setTimeout(() => {
      setHeight.value = getActiveHeight();
    }, 1);
  }
);

// Lifecycle hooks
onUnmounted(() => {
  childIdx.value = 0;
});
</script>

<template>
  <div 
    ref="el" 
    class="tab-panels" 
    :class="{ transition: isTransition }" 
    :style="panelStyle" 
    @transitionend="setHeightEnd"
  >
    <slot />
  </div>
</template>
