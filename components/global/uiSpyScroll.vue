<script lang="ts" setup>
interface Section {
  id: string;
  name?: string;
}
const props = defineProps({
  sections: { type: Array as () => Section[], required: true },
  notNavi: { type: Boolean, default: false },
  naviSticky: { type: Boolean, default: false },
  naviStickyCenter: { type: Boolean, default: false }
});

const activeSectionId = ref<string | null>(null);
const el = ref<HTMLElement | null>(null);
const navi = ref<HTMLElement | null>(null);
const $scrollTo = useNuxtApp().$scrollTo;
const $getOffset = useNuxtApp().$getOffset;
const $getTopFixedHeight = useNuxtApp().$getTopFixedHeight;

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const $top = $getOffset(element).top;
    const $topFixedH = $getTopFixedHeight(element);
    // element.scrollIntoView({ behavior: 'smooth' });
    $scrollTo('window', { top: $top - $topFixedH }, 300);
  }
};
const naviTop = ref<number | null>(null);
const naviFixed = ref<boolean>(false);
const setNaviTop = () => {
  const $sclTop = window.pageYOffset;
  const $el = el.value;
  const $navi = navi.value;
  if (!$el || !$navi) return;
  const $elTop = $getOffset($el).top;
  const $elBottom = $elTop + $el.offsetHeight;
  if ($elBottom + 100 < $sclTop) return;
  const $topFixedH = $getTopFixedHeight($el);
  const $maxTop = $el.offsetHeight - $navi.offsetHeight;
  if ($elBottom - $topFixedH - $navi.offsetHeight < $sclTop) {
    naviTop.value = $maxTop;
    naviFixed.value = false;
  } else if ($sclTop + $topFixedH > $elTop) {
    // naviTop.value = Math.min($maxTop, $sclTop + $topFixedH - $elTop);
    naviTop.value = null;
    naviFixed.value = true;
  } else {
    naviTop.value = null;
    naviFixed.value = false;
  }
};
const naviStyle = computed(() => {
  const $obj: any = {};
  if (naviTop.value) $obj.top = naviTop.value + 'px';
  return $obj;
});

const onScroll = () => {
  let closestSection = null;
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
  if (props.naviSticky) setNaviTop();
};

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
          <a :href="`#${section.id}`" :class="{ active: section.id === activeSectionId }" @click.prevent="scrollTo(section.id)">{{ section.name }}</a>
        </li>
      </ul>
    </nav>
    <div class="spy-scroll-body">
      <slot />
    </div>
  </div>
</template>
