<script lang="ts" setup>
// const headerTitle = inject('headerTitle', 'Guide page');
definePageMeta({
  // you can also pass a string or a computed property
  // keepalive: {
  //   exclude: ['guide/font']
  // }
});
</script>
<template>
  <uiPage page-title="Guide" btn-back>
    <uiTabs>
      <uiTab to="/guide/text">text</uiTab>
      <uiTab to="/guide/button">button</uiTab>
      <uiTab to="/guide/form">form</uiTab>
      <uiTab to="/guide/popup">popup</uiTab>
    </uiTabs>
    <uiInner>
      <NuxtPage />
    </uiInner>
  </uiPage>
</template>
