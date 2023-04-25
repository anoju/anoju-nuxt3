<script lang="ts" setup>
const pageTitle = 'Guide - Text Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const code1 = `<uiTitleBar>
  <h1 class="tit-h1">타이틀</h1>
</uiTitleBar>`;

const code2 = `<uiTitleBar>
  <h1 class="tit-h1">타이틀</h1>
  <template #right>서브요소</template>
</uiTitleBar>`;

const code3 = `<uiTitleBar>
  <template #right>서브요소만 필요케이스</template>
</uiTitleBar>`;

const code4 = `<h1 class="tit-h1">1번 타이틀</h1>
<h2 class="tit-h2">2번 타이틀</h2>
<h3 class="tit-h3">3번 타이틀</h3>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">텍스트</h1>
    <h2 class="gd__h2">폰트</h2>
    <div class="flex full">
      <uiButton to="/guide/font/" line>폰트정보 확인</uiButton>
    </div>

    <h2 class="gd__h2">타이틀요소(tit-h), title-bar</h2>
    <h3 class="gd__h3">title-bar</h3>
    <uiTitleBar>
      <h1 class="tit-h1">타이틀</h1>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="code1"></uiCodeHighlight>

    <uiTitleBar>
      <h1 class="tit-h1">타이틀</h1>
      <template #right>서브요소</template>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="code2"></uiCodeHighlight>

    <uiTitleBar>
      <template #right>서브요소만 필요케이스</template>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="code3"></uiCodeHighlight>

    <h1 class="tit-h1">1번 타이틀</h1>
    <h2 class="tit-h2">2번 타이틀</h2>
    <h3 class="tit-h3">3번 타이틀</h3>
    <uiCodeHighlight lang="html" :code="code4"></uiCodeHighlight>
  </uiInner>
</template>
