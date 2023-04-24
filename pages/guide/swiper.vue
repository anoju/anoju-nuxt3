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
    <h2 class="gd__h2">기능</h2>
    <div>
      <h3 class="gd__h3">default</h3>
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
      <br />
      <uiSwiper pagination pagination-class="type2">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h2 class="gd__h2">fraction</h2>
      <uiSwiper pagination pagination-type="fraction">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h3 class="gd__h3">Navigation</h3>
      <uiSwiper navi>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h3 class="gd__h3">slidesPerView</h3>
      <uiSwiper slides-per-view="2">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="['box-' + index]">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h3 class="gd__h3">autoHeight</h3>
      <uiSwiper auto-height>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="['box-' + index, 'height-' + index]">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h3 class="gd__h3">loop</h3>
      <uiSwiper loop>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>

      <h3 class="gd__h3">autoplay</h3>
      <uiSwiper loop autoplay>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <br />
      <uiSwiper pagination loop autoplay>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
    </div>

    <h2 class="gd__h2">style</h2>
    <div>
      <h3 class="gd__h3">full</h3>
      <uiSwiper class="full">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <h3 class="gd__h3">items</h3>
      <uiSwiper class="items">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <br />
      <uiSwiper class="items">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide w-250">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
    </div>
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
