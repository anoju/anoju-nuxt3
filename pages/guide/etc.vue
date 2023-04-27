<script lang="ts" setup>
const pageTitle = 'Guide - Etc UI';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const spyScrollVal = ref(0);
const sections = [
  { id: 'section1', name: 'Section 1' },
  { id: 'section2', name: 'Section 2' },
  { id: 'section3', name: 'Section 3' },
  { id: 'section4', name: 'Section 4' },
  { id: 'section5', name: 'Section 5' }
];

const spyScrollCode1_1 = `const spyScrollVal = ref(0);
const sections = [
  { id: 'section1', name: 'Section 1' },
  { id: 'section2', name: 'Section 2' },
  { id: 'section3', name: 'Section 3' },
  { id: 'section4', name: 'Section 4' },
  { id: 'section5', name: 'Section 5' }
];`;
const spyScrollCode1_2 = `<uiSpyScroll v-model="spyScrollVal" :sections="sections" navi-sticky>
  <section id="section1">Section 1</section>
  <section id="section2">Section 2</section>
  <section id="section3">Section 3</section>
  <section id="section4">Section 4</section>
  <section id="section5">Section 5</section>
</uiSpyScroll>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">SpyScroll</h1>
    <uiSpyScroll v-model="spyScrollVal" :sections="sections" navi-sticky class="gd__spy-scroll">
      <section id="section1" class="sec-1">Section 1</section>
      <section id="section2" class="sec-2">Section 2</section>
      <section id="section3" class="sec-3">Section 3</section>
      <section id="section4" class="sec-4">Section 4</section>
      <section id="section5" class="sec-5">Section 5</section>
    </uiSpyScroll>
    <uiCodeHighlight lang="typescript" :code="spyScrollCode1_1"></uiCodeHighlight>
    <uiCodeHighlight lang="html" :code="spyScrollCode1_2"></uiCodeHighlight>

    <div style="height: 200vh; background: #fafafa"></div>
    <uiBottomFixed>
      <div class="flex">
        <div class="nowrap align-self-center">spyScroll value</div>
        <uiInput v-model="spyScrollVal"></uiInput>
      </div>
    </uiBottomFixed>
  </uiInner>
</template>
