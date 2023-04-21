<script lang="ts" setup>
const pageTitle = 'Guide - Form Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);
</script>
<template>
  <uiInner>
    <h1>폼요소들</h1>
  </uiInner>
</template>
