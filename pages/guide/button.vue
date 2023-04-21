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
    <h1 class="gd__h1">버튼</h1>
    <h2 class="gd__h2">태그</h2>
    <div>
      <uiButton>버튼</uiButton>
      <uiButton line>button 태그</uiButton>
      <uiButton line anchor>a 태그</uiButton>
    </div>
    <h2 class="gd__h2">컬러</h2>
    <div class="flex full">
      <uiButton primary>primary</uiButton>
      <uiButton gray>gray</uiButton>
      <uiButton gray2>gray2</uiButton>
      <uiButton gray3>gray3</uiButton>
    </div>
    <div class="flex full">
      <uiButton line>line</uiButton>
      <uiButton line primary>line+primary</uiButton>
      <uiButton line gray>line+gray</uiButton>
    </div>
    <h2 class="gd__h2">크기</h2>
    <div class="flex full">
      <uiButton line h24>h24</uiButton>
      <uiButton line h32>h32</uiButton>
      <uiButton line h38>h38</uiButton>
      <uiButton line>기본</uiButton>
      <uiButton line h60>h60</uiButton>
    </div>
    <h2 class="gd__h2">크기</h2>
    <div class="flex full">
      <uiButton line round>round</uiButton>
      <uiButton line round2>round2</uiButton>
    </div>
  </uiInner>
</template>
