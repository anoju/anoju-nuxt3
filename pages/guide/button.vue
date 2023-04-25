<script lang="ts" setup>
const pageTitle = 'Guide - Button Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const isBtnLoading = ref(false);
const toggleLoading = () => {
  isBtnLoading.value = !isBtnLoading.value;
};

const tabVal = ref(0);
const tabVal2 = ref(1);
const tabVal3 = ref(2);
const tabVal4 = ref(0);
const tabVal5 = ref(1);

const buttonCode1 = `<uiButton>버튼</uiButton>
<uiButton line>button 태그</uiButton>
<uiButton line anchor>a 태그</uiButton>`;
const buttonCode2 = `<uiButton primary>primary</uiButton>
<uiButton gray>gray</uiButton>
<uiButton gray2>gray2</uiButton>
<uiButton gray3>gray3</uiButton>
<uiButton line>line</uiButton>
<uiButton line primary>line+primary</uiButton>
<uiButton line gray>line+gray</uiButton>`;
const buttonCode3 = `<uiButton line h24>h24</uiButton>
<uiButton line h32>h32</uiButton>
<uiButton line h38>h38</uiButton>
<uiButton line>기본</uiButton>
<uiButton line h60>h60</uiButton>`;
const buttonCode4 = `<uiButton line round>round</uiButton>
<uiButton line round2>round2</uiButton>`;
const buttonCode5 = `<uiButton line :loading="isBtnLoading">button loading</uiButton>`;

const tabCode1 = `<uiTabs v-model="tabVal">
  <uiTab>메뉴명1</uiTab>
  <uiTab>메뉴명2</uiTab>
  <uiTab>메뉴명3</uiTab>
</uiTabs>
<uiTabPanels v-model="tabVal">
  <uiTabPanel>컨텐츠1</uiTabPanel>
  <uiTabPanel>컨텐츠2</uiTabPanel>
  <uiTabPanel>컨텐츠3</uiTabPanel>
</uiTabPanels>`;
const tabCode2 = `<uiTabs v-model="tabVal" round>
  <uiTab>메뉴명1</uiTab>
  <uiTab>메뉴명2</uiTab>
  <uiTab>메뉴명3</uiTab>
</uiTabs>
<uiTabPanels v-model="tabVal">
  <uiTabPanel>컨텐츠1</uiTabPanel>
  <uiTabPanel>컨텐츠2</uiTabPanel>
  <uiTabPanel>컨텐츠3</uiTabPanel>
</uiTabPanels>`;
const tabCode3 = `<uiTabs v-model="tabVal" navi>
  <uiTab>메뉴명1</uiTab>
  <uiTab>메뉴명2</uiTab>
  <uiTab>메뉴명3</uiTab>
</uiTabs>
<uiTabPanels v-model="tabVal">
  <uiTabPanel>컨텐츠1</uiTabPanel>
  <uiTabPanel>컨텐츠2</uiTabPanel>
  <uiTabPanel>컨텐츠3</uiTabPanel>
</uiTabPanels>`;
const tabCode4 = `<uiTabs v-model="tabVal" box>
  <uiTab>메뉴명1</uiTab>
  <uiTab>메뉴명2</uiTab>
  <uiTab>메뉴명3</uiTab>
</uiTabs>
<uiTabPanels v-model="tabVal">
  <uiTabPanel>컨텐츠1</uiTabPanel>
  <uiTabPanel>컨텐츠2</uiTabPanel>
  <uiTabPanel>컨텐츠3</uiTabPanel>
</uiTabPanels>`;
const tabCode5 = `<uiTabs v-model="tabVal" txt>
  <uiTab>메뉴명1</uiTab>
  <uiTab>메뉴명2</uiTab>
  <uiTab>메뉴명3</uiTab>
</uiTabs>
<uiTabPanels v-model="tabVal">
  <uiTabPanel>컨텐츠1</uiTabPanel>
  <uiTabPanel>컨텐츠2</uiTabPanel>
  <uiTabPanel>컨텐츠3</uiTabPanel>
</uiTabPanels>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">Button</h1>
    <h2 class="gd__h2">tag</h2>
    <div>
      <uiButton>버튼</uiButton>
      <uiButton line>button 태그</uiButton>
      <uiButton line anchor>a 태그</uiButton>
    </div>
    <uiCodeHighlight lang="html" :code="buttonCode1"></uiCodeHighlight>

    <h2 class="gd__h2">color</h2>
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
    <uiCodeHighlight lang="html" :code="buttonCode2"></uiCodeHighlight>

    <h2 class="gd__h2">size</h2>
    <div class="flex full">
      <uiButton line h24>h24</uiButton>
      <uiButton line h32>h32</uiButton>
      <uiButton line h38>h38</uiButton>
      <uiButton line>기본</uiButton>
      <uiButton line h60>h60</uiButton>
    </div>
    <uiCodeHighlight lang="html" :code="buttonCode3"></uiCodeHighlight>

    <h2 class="gd__h2">round</h2>
    <div class="flex full">
      <uiButton line round>round</uiButton>
      <uiButton line round2>round2</uiButton>
    </div>
    <uiCodeHighlight lang="html" :code="buttonCode4"></uiCodeHighlight>

    <h2 class="gd__h2">button loading</h2>
    <div class="flex">
      <uiButton line :loading="isBtnLoading" @click="toggleLoading">button loading</uiButton>
      <uiButton v-if="isBtnLoading" line class="ml-auto" @click="toggleLoading">button loading off</uiButton>
    </div>
    <uiCodeHighlight lang="html" :code="buttonCode5"></uiCodeHighlight>

    <h1 class="gd__h1">Tabmenu</h1>
    <div>
      <h2 class="gd__h2">line type</h2>
      <div>
        <p>tabVal : {{ tabVal }}</p>
        <uiTabs v-model="tabVal">
          <uiTab>메뉴명1</uiTab>
          <uiTab>메뉴명2</uiTab>
          <uiTab>메뉴명3</uiTab>
        </uiTabs>
        <uiTabPanels v-model="tabVal">
          <uiTabPanel>
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠2 <br />
            컨텐츠2 <br />
            컨텐츠2 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
          </uiTabPanel>
        </uiTabPanels>

        <uiCodeHighlight lang="html" :code="tabCode1"></uiCodeHighlight>
      </div>
      <h2 class="gd__h2">round type</h2>
      <div>
        <p>tabVal2 : {{ tabVal2 }}</p>
        <uiTabs v-model="tabVal2" round>
          <uiTab>메뉴명1</uiTab>
          <uiTab>메뉴명2</uiTab>
          <uiTab>메뉴명3</uiTab>
        </uiTabs>
        <uiTabPanels v-model="tabVal2">
          <uiTabPanel>
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠2 <br />
            컨텐츠2 <br />
            컨텐츠2 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
          </uiTabPanel>
        </uiTabPanels>

        <uiCodeHighlight lang="html" :code="tabCode2"></uiCodeHighlight>
      </div>
      <h2 class="gd__h2">navi type</h2>
      <div>
        <p>tabVal3 : {{ tabVal3 }}</p>
        <uiTabs v-model="tabVal3" navi>
          <uiTab>메뉴명1</uiTab>
          <uiTab>메뉴명2</uiTab>
          <uiTab>메뉴명3</uiTab>
        </uiTabs>
        <uiTabPanels v-model="tabVal3">
          <uiTabPanel>
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠2 <br />
            컨텐츠2 <br />
            컨텐츠2 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
          </uiTabPanel>
        </uiTabPanels>

        <uiCodeHighlight lang="html" :code="tabCode3"></uiCodeHighlight>
      </div>
      <h2 class="gd__h2">box type</h2>
      <div>
        <p>tabVal4 : {{ tabVal4 }}</p>
        <uiTabs v-model="tabVal4" box>
          <uiTab>메뉴명1</uiTab>
          <uiTab>메뉴명2</uiTab>
          <uiTab>메뉴명3</uiTab>
        </uiTabs>
        <uiTabPanels v-model="tabVal4">
          <uiTabPanel>
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠2 <br />
            컨텐츠2 <br />
            컨텐츠2 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
          </uiTabPanel>
        </uiTabPanels>

        <uiCodeHighlight lang="html" :code="tabCode4"></uiCodeHighlight>
      </div>
      <h2 class="gd__h2">text type</h2>
      <div>
        <p>tabVal5 : {{ tabVal5 }}</p>
        <uiTabs v-model="tabVal5" txt>
          <uiTab>메뉴명1</uiTab>
          <uiTab>메뉴명2</uiTab>
          <uiTab>메뉴명3</uiTab>
        </uiTabs>
        <uiTabPanels v-model="tabVal5">
          <uiTabPanel>
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
            컨텐츠1 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠2 <br />
            컨텐츠2 <br />
            컨텐츠2 <br />
          </uiTabPanel>
          <uiTabPanel>
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
            컨텐츠3 <br />
          </uiTabPanel>
        </uiTabPanels>

        <uiCodeHighlight lang="html" :code="tabCode5"></uiCodeHighlight>
      </div>
    </div>
  </uiInner>
</template>
