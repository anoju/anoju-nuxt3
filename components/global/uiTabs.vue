<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Number, default: null },
  type: { type: String, default: null },
  line: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  navi: { type: Boolean, default: false },
  box: { type: Boolean, default: false },
  txt: { type: Boolean, default: false }
});

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
const tablist = ref<HTMLElement | null>(null);

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
  if (!$tablist) return;
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

defineExpose({ activeTab, setActiveTab });
provide('activeTab', activeTab);
provide('setActiveTab', setActiveTab);

const index = ref<number>(0);
provide('index', index);

watch(activeTab, (newValue) => {
  emit('update:modelValue', newValue);
});
onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', lineMoveEvt);
  });
});
onUnmounted(() => {
  window.removeEventListener('resize', lineMoveEvt);
});
</script>
<template>
  <div :class="[`tab-${$type}-menu`, { 'tab-line-moving': lineMoving }]">
    <div class="tab-inner">
      <i class="tab-line" aria-hidden="true" :style="{ width: `${lineWidth}px`, left: `${lineLeft}px` }" @transitionend="lineEndEvt"></i>
      <ul ref="tablist" class="tab-list" role="tablist">
        <slot />
      </ul>
    </div>
  </div>
</template>
