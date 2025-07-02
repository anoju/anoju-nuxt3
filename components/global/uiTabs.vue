<script lang="ts" setup>
// Types
type Type = 'line' | 'round' | 'navi' | 'box' | 'txt';

interface Props {
  modelValue?: number | null;
  fixed?: boolean;
  id?: string | null;
  panels?: string | null;
  type?: string | null;
  line?: boolean;
  round?: boolean;
  navi?: boolean;
  box?: boolean;
  txt?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  fixed: false,
  id: null,
  panels: null,
  type: null,
  line: false,
  round: false,
  navi: false,
  box: false,
  txt: false
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

// Composables
const nuxtApp = useNuxtApp();

// Global counter for unique IDs
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

// Template refs and reactive state
const el = ref<HTMLElement | null>(null);
const tablist = ref<HTMLElement | null>(null);
const lineEl = ref<HTMLElement | null>(null);
const activeTab = ref<number>(props.modelValue ?? 0);
const childIdx = ref<number>(0);
const lineWidth = ref<number>(0);
const lineLeft = ref<number>(0);
const lineMoving = ref<boolean>(false);
const isFixed = ref<boolean>(false);

// Line animation state
let moveIndex = -1;

// Computed properties
const tabsId = computed<string>(() => {
  let rtnVal = `tab_btn_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const panelsId = computed<string>(() => {
  let rtnVal = `tab_panel_${instanceId}`;
  if (props.panels) rtnVal = props.panels;
  return rtnVal;
});

const typeAry: Type[] = ['line', 'round', 'navi', 'box', 'txt'];
const matchingType = computed(() => typeAry.find((type) => props[type]));
const $type = computed<Type>(() => {
  if (props.type && typeAry.includes(props.type as Type)) {
    return props.type as Type;
  }
  return matchingType.value || 'line';
});

// Methods
const setActiveTab = (index: number): void => {
  activeTab.value = index;
  if (moveIndex === index) return;
  moveIndex = index;
  lineMoveEvt();
};

// Provide data to child components
provide('tabsId', tabsId);
provide('panelsId', panelsId);
provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);
provide('childIdx', childIdx);

const lineMoveEvt = (): void => {
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

const lineEndEvt = (): void => {
  lineMoving.value = false;
};

const tabFixed = (): void => {
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

// Watchers
watch(activeTab, (newValue: number) => {
  emit('update:modelValue', newValue);
});

// Lifecycle hooks
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
  <div 
    ref="el" 
    :class="[
      `tab-${$type}-menu`, 
      { 'tab-fixed': fixed }, 
      { 'top-fixed': isFixed }, 
      { 'tab-line-moving': lineMoving }
    ]"
  >
    <div class="tab-inner">
      <i 
        v-if="$type !== 'txt'" 
        ref="lineEl" 
        class="tab-line" 
        aria-hidden="true" 
        :style="{ width: `${lineWidth}px`, left: `${lineLeft}px` }" 
        @transitionend="lineEndEvt"
      />
      <ul ref="tablist" class="tab-list" role="tablist">
        <slot />
      </ul>
    </div>
  </div>
</template>
