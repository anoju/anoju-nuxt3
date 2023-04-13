<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const componentName = 'tabPanels';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

const props = defineProps({
  modelValue: { type: Number, default: null },
  id: { type: String, default: null },
  tabs: { type: String, default: null }
});

const tabsId = computed<string>((): string => {
  let rtnVal = `tab_btn_${instanceId}`;
  if (props.tabs) rtnVal = props.tabs;
  return rtnVal;
});
const panelsId = computed<string>((): string => {
  let rtnVal = `tab_panel_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
provide('tabsId', tabsId);
provide('panelsId', panelsId);

const childIdx = ref<number>(0);
provide('childIdx', childIdx);

const activePanel = ref(props.modelValue ?? 0);
provide('activePanel', activePanel);

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    activePanel.value = newValue;
  }
);
onUnmounted(() => {
  childIdx.value = 0;
});
</script>
<template>
  <div class="tab-panels">
    <slot />
  </div>
</template>
