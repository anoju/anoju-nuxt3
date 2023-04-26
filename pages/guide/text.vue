<script lang="ts" setup>
const pageTitle = 'Guide - Text Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const alignCode1 = `<!-- 간격이 필요한 경우 -->
<div class="flex full">
  <div class="bg-ddd t-center">full</div>
  <div class="bg-ddd t-center">full</div>
</div>

<!-- 간격이 필요없는 경우 -->
<div class="flex full no-gap">
  <div class="bg-ddd t-center">full + no-gap</div>
  <div class="bg-ddd t-center">full + no-gap</div>
</div>`;
const titleCode1 = `<!-- 태그는 상관없이 클래스로 스타일 적용 -->
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
</uiTitleBar>
<!-- .t-right 으로 대체가능하면 변경해서 사용해도 무방 -->
<div class="t-right mt-20">서브요소만 필요케이스</div>`;

const lineCode1 = `<hrLine thick />
<hrLine inset />
<hrLine ty2 />
<hrLine ty2 inset />`;

const badgeCode1 = `<badge>base</badge>
<badge gray>gray</badge>
<badge gray2>gray2</badge>
<badge red>red</badge>
<badge green>green</badge>
<badge blue>blue</badge>
<badge blue2>blue2</badge>
<badge orange>orange</badge>
<badge black>black</badge>

<!-- size -->
<badge gray small>small</badge>
<badge red>default</badge>
<badge green large>large</badge>
<badge blue h28>h28</badge>

<!-- line -->
<badge line>line</badge>
<badge line round h28 primary>line2</badge>

<!-- square, round -->
<badge line square>line + square</badge>
<badge line round>line + round</badge>

<!-- ty2, ty3 -->
<badge ty2>ty2</badge>
<badge ty3>ty3</badge>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">Text Elements</h1>
    <div>
      <h2 class="gd__h2">font</h2>
      <p><strong>Noto Sans KR(v27), Roboto(v30)</strong></p>
      <div class="flex full mt-10">
        <uiButton to="/guide/font/" line>폰트정보</uiButton>
      </div>
      <h2 class="gd__h2">Text Common Class</h2>
      <h3 class="gd__h3">font-famly</h3>
      <div>
        <p>기본: Roboto(숫자+콤마만 적용), Noto Sans KR(숫자+콤마 외 모두 적용)</p>
        <p class="ff-roboto fz-20">ff-roboto: 가나다라 ABCD abcd 123</p>
        <p class="ff-noto fz-20">ff-noto: 가나다라 ABCD abcd 123</p>
      </div>
      <h3 class="gd__h3">color</h3>
      <div class="gd__grid grid-col-3 t-center">
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
      <div class="gd__grid grid-col-3 t-center">
        <span v-for="i in 40" :key="i" :class="`fz-${i}`">fz-{{ i }}</span>
      </div>
      <h3 class="gd__h3">font-weight</h3>
      <div class="gd__grid grid-col-3 t-center">
        <strong class="fw-normal">fw-normal</strong>
        <span class="fw-medium">fw-medium</span>
        <span class="fw-bold">fw-bold</span>
        <span v-for="i in 9" :key="i" :class="`fw-${i}00`">fw-{{ i }}00</span>
      </div>
      <h2 class="gd__h2">Align</h2>
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
        <uiCodeHighlight lang="html" :code="alignCode1"></uiCodeHighlight>

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

      <h2 class="gd__h2">Title Elements</h2>
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

      <h2 class="gd__h2">line</h2>
      <div>
        <hrLine thick />
        <br />
        <hrLine inset />
        <br />
        <hrLine ty2 />
        <br />
        <hrLine ty2 inset />
      </div>
      <uiCodeHighlight lang="html" :code="lineCode1"></uiCodeHighlight>
    </div>

    <h1 class="gd__h1">Badge</h1>
    <div>
      <h2 class="gd__h2">color</h2>
      <div>
        <badge>base</badge>
        <badge gray>gray</badge>
        <badge gray2>gray2</badge>
        <badge red>red</badge>
        <badge green>green</badge>
        <badge blue>blue</badge>
        <badge blue2>blue2</badge>
        <badge orange>orange</badge>
        <badge black>black</badge>
      </div>
      <h2 class="gd__h2">size</h2>
      <div>
        <badge gray small>small</badge>
        <badge red>default</badge>
        <badge green large>large</badge>
        <badge blue h28>h28</badge>
      </div>
      <h2 class="gd__h2">line</h2>
      <div>
        <badge line>line</badge>
        <badge line round h28 primary>line2</badge>
      </div>
      <h2 class="gd__h2">square, round</h2>
      <div>
        <badge line square>line + square</badge>
        <badge line round>line + round</badge>
      </div>
      <h2 class="gd__h2">ty2, ty3</h2>
      <div>
        <badge ty2>ty2</badge>
        <badge ty3>ty3</badge>
      </div>
      <uiCodeHighlight lang="html" :code="badgeCode1"></uiCodeHighlight>
    </div>
  </uiInner>
</template>
