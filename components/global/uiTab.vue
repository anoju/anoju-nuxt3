<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
// Types
interface Props {
  to?: string | null;
  id?: string | null;
  panel?: string | null;
  tabClass?: string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  to: null,
  id: null,
  panel: null,
  tabClass: null
});

// Composables
const route = useRoute();

// Inject from parent uiTabs component
const activeTab = inject<Ref<number>>('activeTab');
const setActiveTab = inject<(index: number) => void>('setActiveTab');
const childIdx = inject<Ref<number>>('childIdx');
const tabsId = inject<Ref<string>>('tabsId');
const panelsId = inject<Ref<string>>('panelsId');

// Validate required injections
if (!activeTab || !setActiveTab) {
  throw new Error('uiTab component must be a child of uiTabs component');
}

// Reactive state
const isActive = ref<boolean>(false);
const tabIndex = ref<number>(-1);

// Initialize tab index
if (childIdx) {
  tabIndex.value = childIdx.value;
  childIdx.value += 1;
}

// Computed properties
const href = computed<string>(() => {
  let val = '#';
  if (panelId.value) val += panelId.value;
  if (props.to) val = '#';
  return val;
});

const tabId = computed<string | undefined>(() => {
  let rtnVal: string | undefined;
  if (props.to) return undefined;
  if (tabsId) {
    rtnVal = `${tabsId.value}_${tabIndex.value}`;
  }
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const panelId = computed<string | undefined>(() => {
  let rtnVal: string | undefined;
  if (props.to) return undefined;
  if (panelsId) {
    rtnVal = `${panelsId.value}_${tabIndex.value}`;
  }
  if (props.panel) rtnVal = props.panel;
  return rtnVal;
});

// Utility functions
const isEqual = (a: number | string, b: number | string): boolean => {
  return a === b;
};

// Methods
const activeTabEvt = (): void => {
  if (props.to) {
    isActive.value = isEqual(route.path, props.to);
  } else {
    isActive.value = isEqual(tabIndex.value, activeTab.value);
  }
};

const selectTab = (e: Event): void => {
  e.preventDefault();
  if (props.to) {
    const router = useRouter();
    router.push({ path: props.to });
  } else {
    setActiveTab(tabIndex.value);
  }
};

// Watchers
watch(
  route,
  (value) => {
    if (props.to && isEqual(value.path, props.to)) {
      setActiveTab(tabIndex.value);
    }
  },
  { deep: true }
);

watchEffect(() => {
  activeTabEvt();
});

// Lifecycle hooks
onMounted(() => {
  activeTabEvt();
  nextTick(() => {
    if (isActive.value) setActiveTab(tabIndex.value);
  });
});

onBeforeUnmount(() => {
  if (childIdx) {
    childIdx.value -= 1;
  }
});

// Expose public methods
defineExpose({ 
  isActive, 
  selectTab 
});
</script>

<template>
  <li class="tab" :class="[{ active: isActive }, tabClass]" role="presentation">
    <NuxtLink 
      v-if="to" 
      :to="to" 
      role="tab" 
      :aria-selected="isActive"
    >
      <slot />
    </NuxtLink>
    <a 
      v-else 
      :id="tabId" 
      :href="href" 
      role="tab" 
      :aria-selected="isActive" 
      :aria-controls="panelId" 
      v-bind="$attrs" 
      @click="selectTab"
    >
      <slot />
    </a>
  </li>
</template>
