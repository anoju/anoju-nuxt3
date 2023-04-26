<script lang="ts" setup>
interface Section {
  id: string;
  name: string;
}
const props = defineProps({
  sections: { type: Array as () => Section[], required: true }
});

const activeSectionId = ref<string | null>(null);

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
  <nav class="spy-scroll-navi">
    <ul>
      <li v-for="(section, i) in sections" :key="i">
        <a :href="`#${section.id}`" :class="{ active: section.id === activeSectionId }" @click.prevent="scrollTo(section.id)">{{ section.name }}</a>
      </li>
    </ul>
  </nav>
</template>
