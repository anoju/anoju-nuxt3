<script lang="ts" setup>
const pageTitle = 'Guide - Text Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const titleCode1 = `// 태그는 상관없이 클래스로 스타일 적용
<h1 class="tit-h1">타이틀1</h1>
<h2 class="tit-h2">타이틀2</h2>
<h3 class="tit-h3">타이틀3</h3>
<h4 class="tit-h4">타이틀4</h4>`;

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
      <div>기본:#606060</div>
      <div class="fc-primary">fc-primary</div>
      <div class="fc-white bg-black">fc-fff</div>
      <div class="fc-212121">fc-212121</div>
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
    <h3 class="gd__h3">font-weight</h3>
    <div class="gd__grid grid-col-3 t-center">
      <strong class="fw-normal">fw-normal</strong>
      <span class="fw-medium">fw-medium</span>
      <span class="fw-bold">fw-bold</span>
      <span v-for="i in 9" :key="i" :class="`fw-${i}00`">fw-{{ i }}00</span>
    </div>
    <h2 class="gd__h2">정렬</h2>
    <h3 class="gd__h3">text-align</h3>
    <div>
      <div class="t-left">t-left</div>
      <div class="t-center">t-center</div>
      <div class="t-right">t-right</div>
    </div>
    <h3 class="gd__h3">vertical-align</h3>
    <div class="tbl">
      <div class="td t-center h-100 va-top">va-top</div>
      <div class="td t-center h-100 va-middle">va-middle</div>
      <div class="td t-center h-100 va-bottom">va-bottom</div>
    </div>
    <h3 class="gd__h3">float</h3>
    <div>
      <div class="f-left">f-left</div>
      <div class="f-right">f-right</div>
      <div class="clear">clear</div>
    </div>
    <h3 class="gd__h3">flex</h3>
    <div>
      <div class="flex full">
        <div class="bg-ddd t-center">full</div>
        <div class="bg-ddd t-center">full</div>
      </div>
      <div class="flex full no-gap">
        <div class="bg-ddd t-center">full + no-gap</div>
        <div class="bg-ddd t-center">full + no-gap</div>
      </div>
      <div class="flex h-100 space-between">
        <div class="flex align-start">
          <div>align-start</div>
        </div>
        <div class="flex align-center">
          <div>align-center</div>
        </div>
        <div class="flex align-end">
          <div>align-end</div>
        </div>
      </div>
      <br />
      <div class="flex h-100 space-between">
        <div class="flex">
          <div class="align-self-start">align-self-start</div>
        </div>
        <div class="flex">
          <div class="align-self-center">align-self-center</div>
        </div>
        <div class="flex">
          <div class="align-self-end">align-self-end</div>
        </div>
      </div>
      <br />
      <div class="flex justify-start">
        <div>justify-start</div>
      </div>
      <div class="flex justify-center">
        <div>justify-center</div>
      </div>
      <div class="flex justify-end">
        <div>justify-end</div>
      </div>
      <br />
      <p class="t-center">space-between</p>
      <div class="flex space-between">
        <div>★</div>
        <div>★</div>
        <div>★</div>
      </div>
      <br />
      <p class="t-center">space-around</p>
      <div class="flex space-around">
        <div>★</div>
        <div>★</div>
        <div>★</div>
      </div>
      <br />
      <p class="t-center">space-evenly</p>
      <div class="flex space-evenly">
        <div>★</div>
        <div>★</div>
        <div>★</div>
      </div>
      <br />
      <p class="t-center">flex-column</p>
      <div class="flex flex-column align-center">
        <div>★</div>
        <div>★</div>
        <div>★</div>
      </div>
      <br />
      <p class="t-center">flex-wrap</p>
      <div class="flex flex-wrap justify-center">
        <div>★★★★★★★★★★</div>
        <div>★★★★★★★★★★</div>
        <div>★★★★★★★★★★</div>
        <div>★★★★★★★★★★</div>
        <div>★★★★★★★★★★</div>
        <div>★★★★★★★★★★</div>
      </div>
    </div>

    <h2 class="gd__h2">타이틀요소</h2>
    <h3 class="gd__h3">title</h3>
    <h1 class="tit-h1">타이틀1 - font-size: 2.2rem</h1>
    <h2 class="tit-h2">타이틀2 - font-size: 2rem</h2>
    <h3 class="tit-h3">타이틀3 - font-size: 1.8rem</h3>
    <h4 class="tit-h4">타이틀4 - font-size: 1.6rem</h4>
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
