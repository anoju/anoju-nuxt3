<script lang="ts" setup>
const layout = 'guide';
definePageMeta({
  pageTransition: false,
  // layout: layout,
  layoutTransition: {
    name: 'slide-in'
  }
});
const pageTitle = 'Guide - Popup Type';
provide('headerTitle', pageTitle);
useHead({
  title: pageTitle
});
</script>
<template>
  <NuxtLayout :name="layout">
    <h1>팝업들</h1>
  </NuxtLayout>
</template>
