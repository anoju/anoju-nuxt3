<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const props = defineProps({
  modelValue: { type: Number, default: null },
  fixed: { type: Boolean, default: false },
  id: { type: String, default: null },
  panels: { type: String, default: null },
  type: { type: String, default: null },
  line: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  navi: { type: Boolean, default: false },
  box: { type: Boolean, default: false },
  txt: { type: Boolean, default: false }
});
let instanceId = 0;
if (props.modelValue) {
  const componentName = 'tabs';
  if (!nuxtApp.$globalCounters[componentName]) {
    nuxtApp.$globalCounters[componentName] = 1;
  } else {
    nuxtApp.$globalCounters[componentName]++;
  }
  instanceId = nuxtApp.$globalCounters[componentName];
}

const tabsId = computed<string>((): string => {
  let rtnVal = `tab_btn_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
const panelsId = computed<string>((): string => {
  let rtnVal = `tab_panel_${instanceId}`;
  if (props.panels) rtnVal = props.panels;
  return rtnVal;
});
provide('tabsId', tabsId);
provide('panelsId', panelsId);

type Type = 'line' | 'round' | 'navi' | 'box' | 'txt';
const typeAry: Type[] = ['line', 'round', 'navi', 'box', 'txt'];
const matchingType = typeAry.find((type) => props[type]);
const $type = computed<Type>((): Type => {
  if (props.type && typeAry.includes(props.type as Type)) {
    return props.type as Type;
  } else if (matchingType) {
    return matchingType;
  }
  return 'line';
});

const emit = defineEmits(['update:modelValue']);
const el = ref<HTMLElement | null>(null);
const tablist = ref<HTMLElement | null>(null);
const lineEl = ref<HTMLElement | null>(null);

const activeTab = ref(props.modelValue ?? 0);
const lineWidth = ref(0);
const lineLeft = ref(0);
const lineMoving = ref(false);
let moveIndex = -1;
const setActiveTab = (index: number) => {
  activeTab.value = index;
  if (moveIndex === index) return;
  moveIndex = index;
  lineMoveEvt();
};
const lineMoveEvt = () => {
  const $tablist = tablist.value;
  const $line = lineEl.value;
  if (!$tablist || !$line) return;
  const $tabs = $tablist.querySelectorAll<HTMLElement>('.tab');
  if (!$tabs.length || moveIndex < 0) return;
  const $tab = $tabs[moveIndex];
  lineMoving.value = true;
  lineWidth.value = $tab.offsetWidth;
  lineLeft.value = $tab.offsetLeft;
};
const lineEndEvt = () => {
  lineMoving.value = false;
};

// defineExpose({ activeTab, setActiveTab });
provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);

const childIdx = ref<number>(0);
provide('childIdx', childIdx);

watch(activeTab, (newValue) => {
  emit('update:modelValue', newValue);
});
const isFixed = ref(false);
const tabFixed = () => {
  const $el = el.value;
  if (!$el) return;
  const $getOffset = nuxtApp.$getOffset($el);
  const $top = $getOffset.top;
  const $sclTop = window.pageYOffset;
  if ($top <= $sclTop) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};
onMounted(() => {
  nextTick(() => {
    if (props.fixed) {
      tabFixed();
      window.addEventListener('scroll', tabFixed);
    }
    window.addEventListener('resize', lineMoveEvt);
  });
});
onUnmounted(() => {
  if (props.fixed) window.removeEventListener('scroll', tabFixed);
  window.removeEventListener('resize', lineMoveEvt);
  childIdx.value = 0;
});
</script>
<template>
  <div ref="el" :class="[`tab-${$type}-menu`, { 'tab-fixed': fixed }, { 'top-fixed': isFixed }, { 'tab-line-moving': lineMoving }]">
    <div class="tab-inner">
      <i v-if="$type !== 'txt'" ref="lineEl" class="tab-line" aria-hidden="true" :style="{ width: `${lineWidth}px`, left: `${lineLeft}px` }" @transitionend="lineEndEvt"></i>
      <ul ref="tablist" class="tab-list" role="tablist">
        <slot />
      </ul>
    </div>
  </div>
</template>
