<script lang="ts" setup>
const pageTitle = 'Guide - Text Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);
</script>
<template>
  <uiInner>
    <uiButton to="/guide/font/" line>폰트확인</uiButton>

    <h1 class="gd__h1">제목요소</h1>
    <uiTitleBar>
      <h1 class="tit-h1">제목타이틀</h1>
    </uiTitleBar>
    <uiTitleBar>
      <h1 class="tit-h1">제목타이틀</h1>
      <template #right>제목서브요소</template>
    </uiTitleBar>
    <uiTitleBar>
      <template #right>제목서브요소만 필요케이스</template>
    </uiTitleBar>
    <h1 class="tit-h1">1번째 제목요소</h1>
    <h2 class="tit-h2">2번째 제목요소</h2>
    <h3 class="tit-h3">3번째 제목요소</h3>
  </uiInner>
</template>
