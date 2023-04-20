<script lang="ts" setup>
definePageMeta({
  pageTransition: false
});
const isTabShow = ref(true);
const route = useRoute();
watch(
  route,
  (value) => {
    if (value.path.indexOf('/font') === -1) {
      isTabShow.value = true;
    } else {
      isTabShow.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <uiPage page-title="Guide" btn-back>
    <uiTabs v-if="isTabShow">
      <uiTab to="/guide/text">text</uiTab>
      <uiTab to="/guide/button">button</uiTab>
      <uiTab to="/guide/form">form</uiTab>
      <uiTab to="/guide/popup">popup</uiTab>
    </uiTabs>
    <NuxtPage />
  </uiPage>
</template>
