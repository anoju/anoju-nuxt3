<script lang="ts" setup>
const pageTitle = 'Guide - Swiper type';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const slides = [{ content: 'Slide 1' }, { content: 'Slide 2' }, { content: 'Slide 3' }, { content: 'Slide 4' }, { content: 'Slide 5' }];
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">Swiper</h1>
    <h2 class="gd__h2">default</h2>
    <uiSwiper>
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="swiper-box" :class="'box-' + index">
          {{ slide.content }}
        </div>
      </div>
    </uiSwiper>
    <h2 class="gd__h2">pagination</h2>
    <uiSwiper pagination>
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="swiper-box" :class="'box-' + index">
          {{ slide.content }}
        </div>
      </div>
    </uiSwiper>

    <h2 class="gd__h2">Navigation</h2>
    <uiSwiper navi>
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="swiper-box" :class="'box-' + index">
          {{ slide.content }}
        </div>
      </div>
    </uiSwiper>

    <h2 class="gd__h2">autoHeight</h2>
    <uiSwiper auto-height>
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="swiper-box" :class="['box-' + index, 'height-' + index]">
          {{ slide.content }}
        </div>
      </div>
    </uiSwiper>

    <h2 class="gd__h2">loop</h2>
    <uiSwiper loop>
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="swiper-box" :class="'box-' + index">
          {{ slide.content }}
        </div>
      </div>
    </uiSwiper>
  </uiInner>
</template>
<style lang="scss">
.swiper-box {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  @for $i from 0 through 10 {
    &.box-#{$i} {
      background-color: lighten(#d00, $i * 5%);
    }
    &.height-#{$i} {
      height: ($i + 1) * 50px;
    }
  }
}
</style>
