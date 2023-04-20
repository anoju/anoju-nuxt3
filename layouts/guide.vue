<script lang="ts" setup>
const headerTitle = inject('headerTitle', 'Guide page');
</script>
<template>
  <uiPage :page-title="headerTitle" btn-back>
    <uiTabs>
      <uiTab to="/guide/text">text</uiTab>
      <uiTab to="/guide/button">button</uiTab>
      <uiTab to="/guide/form">form</uiTab>
      <uiTab to="/guide/popup">popup</uiTab>
    </uiTabs>
    <uiInner>
      <slot />
    </uiInner>
  </uiPage>
</template>
