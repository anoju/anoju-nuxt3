<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: [Number, String], default: null }
});

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: number | string): void;
// }>();
const emit = defineEmits(['update:modelValue']);
const tablist = ref<HTMLElement | null>(null);

const activeTab = ref(props.modelValue ?? 0);
const lineWidth = ref(0);
const lineLeft = ref(0);
const lineMoving = ref(false);
let moveIndex = -1;
const setActiveTab = (value: number | string, index: number) => {
  if (typeof props.modelValue === 'number') {
    activeTab.value = Number(value);
  } else {
    activeTab.value = value;
  }
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
provide('modelValueType', typeof props.modelValue);

const tabs = ref<Array<{ value: number | string }>>([]);
provide('tabs', tabs);

const registerTab = (tab: { value: number | string }) => {
  tabs.value.push(tab);
  tabs.value.sort((a, b) => {
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value - b.value;
    }
    return String(a.value).localeCompare(String(b.value));
  });
};
provide('registerTab', registerTab);

const unregisterTab = (tab: { value: number | string }) => {
  const index = tabs.value.findIndex((t) => t.value === tab.value);
  if (index !== -1) {
    tabs.value.splice(index, 1);
  }
};
provide('unregisterTab', unregisterTab);

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
  <div class="tab-line-menu" :class="{ 'tab-line-moving': lineMoving }">
    <div class="tab-inner">
      <i class="tab-line" aria-hidden="true" :style="{ width: `${lineWidth}px`, left: `${lineLeft}px` }" @transitionend="lineEndEvt"></i>
      <ul ref="tablist" class="tab-list" role="tablist">
        <slot />
      </ul>
    </div>
  </div>
</template>
