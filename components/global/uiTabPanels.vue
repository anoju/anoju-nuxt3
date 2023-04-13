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

const el = ref<HTMLElement | null>(null);

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

const isTransition = ref<boolean>(false);
const setHeight = ref<number | null>(null);
const getActiveHeight = () => {
  const $el = el.value;
  if (!$el) return null;
  const $active = $el.querySelector('.tab-panel.active') as HTMLElement;
  const $height = $active.offsetHeight;
  return $height;
};
const setHeightEnd = () => {
  isTransition.value = false;
  setHeight.value = null;
};
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    setHeight.value = getActiveHeight();
    isTransition.value = true;
    activePanel.value = newValue;
    setTimeout(() => {
      setHeight.value = getActiveHeight();
    }, 1);
  }
);
onUnmounted(() => {
  childIdx.value = 0;
});
</script>
<template>
  <div ref="el" class="tab-panels" :class="{ transition: isTransition }" :style="{ height: setHeight ? setHeight + 'px' : '' }" @transitionend="setHeightEnd">
    <slot />
  </div>
</template>
