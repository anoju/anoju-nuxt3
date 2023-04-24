<script lang="ts" setup>
import Swiper, { Swiper as SwiperInstance, Navigation, Pagination, Autoplay, Parallax, A11y } from 'swiper';
// A11y,   Autoplay,  Controller,  EffectCoverflow,  EffectCube,  EffectFade,  EffectFlip,  EffectCreative,  EffectCards,  HashNavigation,  History,  Keyboard,  Lazy,  Mousewheel,  Navigation,  Pagination,  Parallax,  Scrollbar,  humbs,  Virtual,  Zoom,  FreeMode,  Grid,  Manipulation,

// import 'swiper/css/bundle';

const props = defineProps({
  pagination: { type: Boolean, default: null },
  paginationType: { type: String, default: 'bullets' },
  navi: { type: Boolean, default: null },
  scrollbar: { type: Boolean, default: null },

  slidesPerView: { type: [Number, String], default: 'auto' },
  autoplay: { type: Boolean, default: false },
  autopDelay: { type: Number, default: 3000 },
  loop: { type: Boolean, default: false },
  autoHeight: { type: Boolean, default: false }
});

const el = ref<HTMLElement | null>(null);
const swiperInstance = ref<SwiperInstance | null>(null);

Swiper.use([A11y]);
const swiperOption = computed(() => {
  const returnVal: any = {
    slidesPerView: props.slidesPerView,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
      paginationBulletMessage: '{{index}}번 슬라이드로 이동'
    }
  };
  if (props.loop) returnVal.loop = true;
  if (props.autoHeight) returnVal.autoHeight = true;

  if (props.autoplay) {
    Swiper.use([Autoplay]);
    returnVal.autoplay = {
      delay: props.autopDelay
      // disableOnInteraction: false
    };
  }

  if (props.navi && el.value) {
    const prevEl = el.value.querySelector('.swiper-button-prev') as HTMLElement;
    const nextEl = el.value.querySelector('.swiper-button-next') as HTMLElement;
    if (prevEl && nextEl) {
      Swiper.use([Navigation]);
      returnVal.navigation = {
        prevEl: prevEl,
        nextEl: nextEl
      };
    }
  }
  if (props.pagination && el.value) {
    const paginationEl = el.value.querySelector('.swiper-pagination') as HTMLElement;
    if (paginationEl) {
      Swiper.use([Pagination]);
      returnVal.pagination = {
        el: paginationEl,
        type: props.paginationType
      };
      if (props.paginationType === 'bullets') {
        returnVal.pagination.clickable = true;
        returnVal.pagination.renderBullet = (index: number, className: string) => {
          return `<button type="button" class="${className}">${index + 1}번째 슬라이드</button>`;
        };
      }
    }
  }
  return returnVal;
});

onMounted(() => {
  if (el.value) {
    const swiperEl = el.value.querySelector('.swiper') as HTMLElement;
    if (swiperEl) swiperInstance.value = new Swiper(swiperEl, swiperOption.value);
  }
});
</script>
<template>
  <div ref="el" class="ui-swiper">
    <div class="swiper">
      <div class="swiper-wrapper">
        <slot />
      </div>
      <button v-if="navi" type="button" class="swiper-button swiper-button-prev"></button>
      <button v-if="navi" type="button" class="swiper-button swiper-button-next"></button>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
    <div v-if="scrollbar" class="swiper-scrollbar"></div>
  </div>
</template>
