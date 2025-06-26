<script lang="ts" setup>
const pageTitle = 'Guide - Swiper type';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const slides = [{ content: 'Slide 1' }, { content: 'Slide 2' }, { content: 'Slide 3' }, { content: 'Slide 4' }, { content: 'Slide 5' }];
const swiperVal = ref(1);

const swiperCode1 = `<uiSwiper>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode2 = `<uiSwiper pagination>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>
<uiSwiper pagination pagination-class="type2">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode3 = `<uiSwiper pagination pagination-type="fraction">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode4 = `<uiSwiper navigation>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode5 = `<uiSwiper slides-per-view="2">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode6 = `<uiSwiper auto-height>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode7 = `<uiSwiper loop>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode8 = `<uiSwiper loop autoplay>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>
<uiSwiper pagination loop autoplay>
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>`;
const swiperCode9 = `<uiSwiper v-model="swiperVal">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>
`;
const swiperStyleCode1 = `<uiSwiper class="full">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>
<uiInput v-model="swiperVal" class="mt-10"></uiInput>`;
const swiperStyleCode2 = `<uiSwiper class="items">
  <div class="swiper-slide">content</div>
  ...
</uiSwiper>
<uiSwiper class="items">
  <div class="swiper-slide w-250">content</div>
  ...
</uiSwiper>`;
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
      <uiCodeHighlight lang="html" :code="swiperCode1"></uiCodeHighlight>

      <h3 class="gd__h3">v-model(+ initialSlide 기능)</h3>
      <uiSwiper v-model="swiperVal">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiInput v-model="swiperVal" class="mt-10"></uiInput>
      <uiCodeHighlight lang="html" :code="swiperCode9"></uiCodeHighlight>

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
      <uiCodeHighlight lang="html" :code="swiperCode2"></uiCodeHighlight>

      <h2 class="gd__h2">fraction</h2>
      <uiSwiper pagination pagination-type="fraction">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiCodeHighlight lang="html" :code="swiperCode3"></uiCodeHighlight>

      <h3 class="gd__h3">Navigation</h3>
      <uiSwiper navigation>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiCodeHighlight lang="html" :code="swiperCode4"></uiCodeHighlight>

      <h3 class="gd__h3">slidesPerView</h3>
      <uiSwiper slides-per-view="2">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="['box-' + index]">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiCodeHighlight lang="html" :code="swiperCode5"></uiCodeHighlight>

      <h3 class="gd__h3">autoHeight</h3>
      <uiSwiper auto-height>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="['box-' + index, 'height-' + index]">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiCodeHighlight lang="html" :code="swiperCode6"></uiCodeHighlight>

      <h3 class="gd__h3">loop</h3>
      <uiSwiper loop>
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="swiper-box" :class="'box-' + index">
            {{ slide.content }}
          </div>
        </div>
      </uiSwiper>
      <uiCodeHighlight lang="html" :code="swiperCode7"></uiCodeHighlight>

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
      <uiCodeHighlight lang="html" :code="swiperCode8"></uiCodeHighlight>
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
      <uiCodeHighlight lang="html" :code="swiperStyleCode1"></uiCodeHighlight>

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
      <uiCodeHighlight lang="html" :code="swiperStyleCode2"></uiCodeHighlight>
    </div>
  </uiInner>
</template>
