<script lang="ts" setup>
const pageTitle = 'Guide - Etc UI';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const sections = [
  { id: 'section1', name: 'Section 1' },
  { id: 'section2', name: 'Section 2' },
  { id: 'section3', name: 'Section 3' },
  { id: 'section4', name: 'Section 4' },
  { id: 'section5', name: 'Section 5' }
];
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">SpyScroll</h1>
    <div class="gd__spy-scroll">
      <uiSpyScroll :sections="sections" />
      <section id="section1" class="sec-1">Section 1</section>
      <section id="section2" class="sec-2">Section 2</section>
      <section id="section3" class="sec-3">Section 3</section>
      <section id="section4" class="sec-4">Section 4</section>
      <section id="section5" class="sec-5">Section 5</section>
    </div>
  </uiInner>
</template>
<style lang="scss">
.gd__spy-scroll {
  position: relative;
  section {
    height: calc(100vh - 8.8rem);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 3rem;

    $bgColors: #f66fa0, #fbc846, #00caca, #5846ff, #fd7e64;
    @for $i from 1 through length($bgColors) {
      $color: nth($bgColors, $i);
      &.sec-#{$i} {
        background-color: $color;
      }
    }
  }
  .spy-scroll-navi {
    position: fixed;
    display: inline-block;
    top: 50%;
    right: 0;
    z-index: 1;
    transform: translateY(-50%);
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    a {
      color: #fff;
      font-size: 1.6rem;
      &.active {
        font-weight: bold;
        font-size: 2rem;
      }
    }
  }
}
</style>
