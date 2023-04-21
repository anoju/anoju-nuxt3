<script lang="ts" setup>
const pageTitle = 'Guide - Popup Type';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);
</script>
<template>
  <uiInner>
    <h1>팝업들</h1>
  </uiInner>
</template>
