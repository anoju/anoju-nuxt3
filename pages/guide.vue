<script lang="ts" setup>
// definePageMeta({
//   pageTransition: false
// });
const isTabShow = ref(true);
const route = useRoute();
interface Tab {
  text: string;
  url: string;
}
const tabInfo: Tab[] = [
  { text: 'text', url: '/guide/text' },
  { text: 'button', url: '/guide/button' },
  { text: 'form', url: '/guide/form' },
  { text: 'popup', url: '/guide/popup' },
  { text: 'swiper', url: '/guide/swiper' },
  { text: 'anime', url: '/guide/anime' },
  { text: 'etc', url: '/guide/etc' }
];
const defaultTitle = 'Guide page';
const headerTitle = ref(defaultTitle);

const updatePageTitle = (newVal: string) => {
  headerTitle.value = newVal;
};

watch(
  route,
  (value) => {
    isTabShow.value = tabInfo.some((tab) => tab.url === value.path);
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <uiPage :page-title="headerTitle" btn-back>
    <template #headRight>
      <uiButton to="/">홈으로</uiButton>
    </template>
    <uiTabs v-if="isTabShow" fixed>
      <template v-for="(tab, i) of tabInfo" :key="i">
        <uiTab :to="tab.url">{{ tab.text }}</uiTab>
      </template>
    </uiTabs>
    <NuxtPage @page-title="updatePageTitle" />
  </uiPage>
</template>
