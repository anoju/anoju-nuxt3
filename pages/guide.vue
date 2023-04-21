<script lang="ts" setup>
definePageMeta({
  pageTransition: false
});
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
  { text: 'popup', url: '/guide/popup' }
];
const defaultTitle = 'Guide page';
let beforeTitle = defaultTitle;
const headerTitle = ref(defaultTitle);

// watch(
//   headerTitle,
//   (value) => {
//     console.log(value);
//   },
//   { deep: true, immediate: true }
// );

const updatePageTitle = (newVal: string) => {
  if (beforeTitle === newVal) return;
  headerTitle.value = newVal;
  beforeTitle = newVal;
};

watch(
  route,
  (value) => {
    isTabShow.value = tabInfo.some((tab) => tab.url === value.path);

    console.log(headerTitle.value, beforeTitle);
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <uiPage :page-title="headerTitle" btn-back>
    <uiTabs v-if="isTabShow">
      <template v-for="(tab, i) of tabInfo" :key="i">
        <uiTab :to="tab.url">{{ tab.text }}</uiTab>
      </template>
    </uiTabs>
    <NuxtPage @page-title="updatePageTitle" />
  </uiPage>
</template>
