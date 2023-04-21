<script lang="ts" setup>
const pageTitle = 'Guide - Button Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);
</script>
<template>
  <uiInner>
    <h1>버튼들</h1>
  </uiInner>
</template>
