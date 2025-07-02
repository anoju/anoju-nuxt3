<script lang="ts" setup>
// Types
interface Section {
  id: string;
  name?: string;
}

interface Props {
  modelValue?: number | null;
  sections: Section[];
  notNavi?: boolean;
  naviSticky?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  notNavi: false,
  naviSticky: false
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

// Composables
const { $scrollTo } = useNuxtApp();
const $getOffset = useNuxtApp().$getOffset;
const $getTopFixedHeight = useNuxtApp().$getTopFixedHeight;

// Template refs and reactive state
const el = ref<HTMLElement | null>(null);
const navi = ref<HTMLElement | null>(null);
const activeIndex = ref<number>(props.modelValue ?? 0);
const activeSectionId = ref<string | null>(null);
const naviTop = ref<number | null>(null);
const naviFixed = ref<boolean>(false);

// Utility functions
const getArryIndex = (ary: Section[], val: string): number => {
  return ary.findIndex((item) => item.id === val);
};

// Computed properties
const naviStyle = computed<Record<string, string>>(() => {
  const styleObj: Record<string, string> = {};
  if (naviTop.value !== null) {
    styleObj.top = `${naviTop.value}px`;
  }
  return styleObj;
});

// Methods
const scrollTo = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    const $top = $getOffset(element).top;
    const $topFixedH = $getTopFixedHeight(element);
    $scrollTo('window', { top: $top - $topFixedH }, 300);
  }
};

const setNaviTop = (): void => {
  const $sclTop = window.pageYOffset;
  const $el = el.value;
  const $navi = navi.value;
  if (!$el || !$navi) return;
  
  const $elTop = $getOffset($el).top;
  const $elBottom = $elTop + $el.offsetHeight;
  if ($elBottom + window.innerHeight / 2 < $sclTop) return;
  
  const $topFixedH = $getTopFixedHeight($el);
  const $maxTop = $el.offsetHeight - $navi.offsetHeight;
  
  if ($elBottom - $topFixedH - $navi.offsetHeight < $sclTop) {
    naviTop.value = $maxTop;
    naviFixed.value = false;
  } else if ($sclTop + $topFixedH > $elTop) {
    naviTop.value = null;
    naviFixed.value = true;
  } else {
    naviTop.value = null;
    naviFixed.value = false;
  }
};

const onScroll = (): void => {
  let closestSection: string | null = null;
  let minDistance = Number.MAX_VALUE;
  
  for (const section of props.sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section.id;
      }
    }
  }
  
  activeSectionId.value = closestSection;
  if (closestSection) {
    const idx = getArryIndex(props.sections, closestSection);
    activeIndex.value = idx;
  }
  
  if (props.naviSticky) {
    setNaviTop();
  }
};

// Watchers
watch(activeIndex, (newValue: number) => {
  if (props.modelValue !== null && props.modelValue !== newValue) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue: number | null, oldValue: number | null) => {
    if (!newValue || newValue === activeIndex.value) return;
    const $targetId = props.sections[newValue].id;
    scrollTo($targetId);
  }
);

// Lifecycle hooks
onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div ref="el" class="spy-scroll">
    <nav v-if="!notNavi" ref="navi" class="spy-scroll-navi" :class="{ fixed: naviFixed }" :style="naviStyle">
      <ul>
        <li v-for="(section, i) in sections" :key="i">
          <a 
            :href="`#${section.id}`" 
            :class="{ active: section.id === activeSectionId }" 
            @click.prevent="scrollTo(section.id)"
          >
            {{ section.name }}
          </a>
        </li>
      </ul>
      <slot name="navi" />
    </nav>
    <div class="spy-scroll-body">
      <slot />
    </div>
  </div>
</template>
