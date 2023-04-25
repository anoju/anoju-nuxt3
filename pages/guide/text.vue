<script lang="ts" setup>
const pageTitle = 'Guide - Text Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const titleCode1 = `<h1 class="tit-h1">1번째 title</h1>
<h2 class="tit-h2">2번째 title</h2>
<h3 class="tit-h3">3번째 title</h3>`;

const titleCode2 = `<uiTitleBar>
  <h1 class="tit-h1">타이틀</h1>
</uiTitleBar>`;

const titleCode3 = `<uiTitleBar>
  <h1 class="tit-h1">타이틀</h1>
  <template #right>서브요소</template>
</uiTitleBar>`;

const titleCode4 = `<uiTitleBar>
  <template #right>서브요소만 필요케이스</template>
</uiTitleBar>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">텍스트</h1>
    <h2 class="gd__h2">font</h2>
    <p><strong>Noto Sans KR, Roboto</strong></p>
    <div class="flex full">
      <uiButton to="/guide/font/" line>폰트정보</uiButton>
    </div>
    <h2 class="gd__h2">text common class</h2>
    <h3 class="gd__h3">color</h3>
    <div class="gd__grid grid-col-3">
      <div>기본:#222</div>
      <div class="fc-primary">fc-primary</div>
      <div class="fc-white bg-black">fc-white, fc-fff</div>
      <div class="fc-212121">fc-black,fc-212121</div>
      <div class="fc-424242">fc-424242</div>
      <div class="fc-606060">fc-606060</div>
      <div class="fc-818892">fc-818892</div>
      <div class="fc-979797">fc-979797</div>
      <div class="fc-b0b0b0">fc-b0b0b0</div>
      <div class="fc-15b071">fc-15b071</div>
      <div class="fc-23adfa">fc-23adfa</div>
      <div class="fc-b9c1c9">fc-b9c1c9</div>
      <div class="fc-25b69c">fc-25b69c</div>
      <div class="fc-e94187">fc-e94187</div>
      <div class="fc-e45055">fc-e45055</div>
      <div class="fc-447eee">fc-447eee</div>
      <div class="fc-fd7e64">fc-fd7e64</div>
    </div>
    <h3 class="gd__h3">font-size</h3>
    <div class="gd__grid grid-col-4 t-center">
      <span v-for="i in 40" :key="i" :class="`fz-${i}`">fz-{{ i }}</span>
    </div>

    <h2 class="gd__h2">타이틀요소</h2>
    <h3 class="gd__h3">title</h3>
    <h1 class="tit-h1">1번째 title</h1>
    <h2 class="tit-h2">2번째 title</h2>
    <h3 class="tit-h3">3번째 title</h3>
    <uiCodeHighlight lang="html" :code="titleCode1"></uiCodeHighlight>

    <h3 class="gd__h3">title-bar</h3>
    <uiTitleBar>
      <h1 class="tit-h1">타이틀</h1>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="titleCode2"></uiCodeHighlight>

    <uiTitleBar>
      <h1 class="tit-h1">타이틀</h1>
      <template #right>서브요소</template>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="titleCode3"></uiCodeHighlight>

    <uiTitleBar>
      <template #right>서브요소만 필요케이스</template>
    </uiTitleBar>
    <uiCodeHighlight lang="html" :code="titleCode4"></uiCodeHighlight>
  </uiInner>
</template>
