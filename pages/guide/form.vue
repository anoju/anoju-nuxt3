<script lang="ts" setup>
const layout = 'guide';
definePageMeta({
  pageTransition: false,
  // layout: layout,
  layoutTransition: {
    name: 'slide-in'
  }
});
const pageTitle = 'Guide - Form Elements';
provide('headerTitle', pageTitle);
useHead({
  title: pageTitle
});
</script>
<template>
  <NuxtLayout :name="layout">
    <h1>폼요소들</h1>
  </NuxtLayout>
</template>
