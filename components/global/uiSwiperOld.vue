<script lang="ts" setup>
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip, EffectCreative, EffectCards, A11y, Parallax } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper/types';

const props = defineProps({
  modelValue: { type: Number, default: null },

  slidesPerView: { type: [Number, String], default: 'auto' },
  loop: { type: Boolean, default: false },
  autoHeight: { type: Boolean, default: false },
  centeredSlides: { type: Boolean, default: false },
  allowTouchMove: { type: Boolean, default: true },
  spaceBetween: { type: Number, default: null },
  slidesOffsetBefore: { type: Number, default: null },
  slidesOffsetAfter: { type: Number, default: null },
  speed: { type: Number, default: null },
  direction: { type: String, default: null },

  effect: { type: String, default: null },
  breakpoints: { type: Object, default: null },
  autoplay: { type: Boolean, default: false },
  autopDelay: { type: Number, default: 3000 },
  navigation: { type: Boolean, default: null },
  pagination: { type: Boolean, default: null },
  paginationType: { type: String, default: 'bullets' },
  paginationClass: { type: String, default: null },

  // 이벤트 핸들러들
  activeIndexChange: { type: Function, default: null },
  afterInit: { type: Function, default: null },
  beforeDestroy: { type: Function, default: null },
  beforeInit: { type: Function, default: null },
  slideChange: { type: Function, default: null },
  slideChangeTransitionEnd: { type: Function, default: null },
  slideChangeTransitionStart: { type: Function, default: null },
  reachBeginning: { type: Function, default: null },
  reachEnd: { type: Function, default: null },
  realIndexChange: { type: Function, default: null }
});

const emit = defineEmits(['update:modelValue']);
const el = ref<HTMLElement | null>(null);
const swiperInstance = ref<SwiperInstance | null>(null);
const isAutoplay = ref<Boolean>(true);
const swiperIdx = ref(props.modelValue ?? 0);

const autoplayText = computed(() => {
  let txt = '슬라이드 자동롤링 ';
  txt += isAutoplay.value ? '중지' : '시작';
  return txt;
});

const isArryInclude = (ary: string[], val: string) => {
  return ary.includes(val);
};

const swiperOption = computed(() => {
  const modules = [A11y, Parallax];

  const returnVal: any = {
    modules,
    slidesPerView: props.slidesPerView,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
      paginationBulletMessage: '{{index}}번 슬라이드로 이동'
    },
    on: {
      activeIndexChange: function (swiper: SwiperInstance) {
        if (props.activeIndexChange) props.activeIndexChange(swiper);
      },
      afterInit: function (swiper: SwiperInstance) {
        if (props.afterInit) props.afterInit(swiper);
      },
      beforeDestroy: function (swiper: SwiperInstance) {
        if (props.beforeDestroy) props.beforeDestroy(swiper);
      },
      beforeInit: function (swiper: SwiperInstance) {
        if (props.beforeInit) props.beforeInit(swiper);
      },
      slideChange: function (swiper: SwiperInstance) {
        if (swiperIdx.value !== swiper.realIndex) swiperIdx.value = swiper.realIndex;
        if (props.slideChange) props.slideChange(swiper);
      },
      slideChangeTransitionEnd: function (swiper: SwiperInstance) {
        if (props.slideChangeTransitionEnd) props.slideChangeTransitionEnd(swiper);
      },
      slideChangeTransitionStart: function (swiper: SwiperInstance) {
        if (props.slideChangeTransitionStart) props.slideChangeTransitionStart(swiper);
      },
      reachBeginning: function (swiper: SwiperInstance) {
        if (props.reachBeginning) props.reachBeginning(swiper);
      },
      reachEnd: function (swiper: SwiperInstance) {
        if (props.reachEnd) props.reachEnd(swiper);
      },
      realIndexChange: function (swiper: SwiperInstance) {
        if (props.realIndexChange) props.realIndexChange(swiper);
      }
    }
  };

  // 기본 옵션들
  if (props.loop) returnVal.loop = true;
  if (props.autoHeight) returnVal.autoHeight = props.autoHeight;
  if (props.centeredSlides) returnVal.centeredSlides = props.centeredSlides;
  if (!props.allowTouchMove) returnVal.allowTouchMove = props.allowTouchMove;
  if (props.spaceBetween) returnVal.spaceBetween = props.spaceBetween;
  if (props.slidesOffsetBefore) returnVal.slidesOffsetBefore = props.slidesOffsetBefore;
  if (props.slidesOffsetAfter) returnVal.slidesOffsetAfter = props.slidesOffsetAfter;
  if (props.speed) returnVal.speed = props.speed;
  if (props.modelValue !== null) returnVal.initialSlide = props.modelValue;

  // Direction 설정
  const directionAry = ['horizontal', 'vertical'];
  if (props.direction && isArryInclude(directionAry, props.direction)) {
    returnVal.direction = props.direction;
  }

  // Effect 설정
  const effectAry = ['slide', 'fade', 'cube', 'coverflow', 'flip', 'creative', 'cards'];
  if (props.effect && isArryInclude(effectAry, props.effect)) {
    returnVal.effect = props.effect;

    // Effect 모듈 추가
    switch (props.effect) {
      case 'fade':
        modules.push(EffectFade);
        break;
      case 'cube':
        modules.push(EffectCube);
        break;
      case 'coverflow':
        modules.push(EffectCoverflow);
        break;
      case 'flip':
        modules.push(EffectFlip);
        break;
      case 'creative':
        modules.push(EffectCreative);
        break;
      case 'cards':
        modules.push(EffectCards);
        break;
    }
  }

  // Breakpoints 설정
  if (props.breakpoints) returnVal.breakpoints = props.breakpoints;

  // Autoplay 설정
  if (props.autoplay) {
    modules.push(Autoplay);
    returnVal.autoplay = {
      delay: props.autopDelay,
      disableOnInteraction: false
    };
  }

  // Navigation 설정
  if (props.navigation) {
    modules.push(Navigation);
    returnVal.navigation = {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    };
  }

  // Pagination 설정
  if (props.pagination) {
    modules.push(Pagination);
    const paginationEl = el.value?.querySelector('.swiper-pagination') || '.swiper-pagination';
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

  // 모듈 배열을 업데이트
  returnVal.modules = modules;

  return returnVal;
});

const autoPlayButton = () => {
  isAutoplay.value = !isAutoplay.value;
  if (!swiperInstance.value || !props.autoplay) return;

  if (isAutoplay.value) {
    swiperInstance.value.autoplay.start();
  } else {
    swiperInstance.value.autoplay.stop();
  }
};

watch(swiperIdx, (newValue) => {
  if (props.modelValue !== null && props.modelValue !== newValue) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (!swiperInstance.value || newValue === null) return;
    const $realIndex = swiperInstance.value.realIndex;
    if (newValue !== $realIndex) {
      swiperInstance.value.slideTo(newValue, 300);
    }
  }
);

onMounted(() => {
  if (!process.client) return; // 클라이언트에서만 실행

  nextTick(async () => {
    if (el.value) {
      const swiperEl = el.value.querySelector('.swiper') as HTMLElement;
      if (swiperEl) {
        try {
          // 동적으로 Swiper import (Swiper 클래스만)
          const { default: Swiper } = await import('swiper');
          swiperInstance.value = new Swiper(swiperEl, swiperOption.value);
        } catch (error) {
          console.error('Swiper 로드 실패:', error);
        }
      }
    }
  });
});

onUnmounted(() => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy();
    swiperInstance.value = null;
  }
});
</script>

<template>
  <div ref="el" class="ui-swiper">
    <div class="swiper">
      <div class="swiper-wrapper">
        <slot />
      </div>
      <button v-if="navigation" type="button" class="swiper-button swiper-button-prev"></button>
      <button v-if="navigation" type="button" class="swiper-button swiper-button-next"></button>
    </div>
    <div v-if="pagination && autoplay" class="swiper-pagination-wrap">
      <div class="swiper-pagination" :class="paginationClass"></div>
      <button v-if="autoplay" class="swiper-auto-ctl" :class="{ play: !isAutoplay }" :aria-label="autoplayText" @click="autoPlayButton"></button>
    </div>
    <div v-else-if="pagination" class="swiper-pagination" :class="paginationClass"></div>
    <div v-else-if="autoplay" class="swiper-auto">
      <button class="swiper-auto-ctl" :class="{ play: !isAutoplay }" :aria-label="autoplayText" @click="autoPlayButton"></button>
    </div>
  </div>
</template>
