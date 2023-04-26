<script lang="ts" setup>
import Swiper, {
  Swiper as SwiperInstance,
  Navigation,
  Pagination,
  Autoplay,
  Parallax,
  A11y,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  EffectCreative,
  EffectCards
} from 'swiper';
// A11y,   Autoplay,  Controller,  EffectCoverflow,  EffectCube,  EffectFade,  EffectFlip,  EffectCreative,  EffectCards,  HashNavigation,  History,  Keyboard,  Lazy,  Mousewheel,  Navigation,  Pagination,  Parallax,  Scrollbar,  humbs,  Virtual,  Zoom,  FreeMode,  Grid,  Manipulation,

// import 'swiper/css/bundle';

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
  // initialSlide: { type: Number, default: null },
  direction: { type: String, default: null },

  effect: { type: String, default: null },
  breakpoints: { type: Object, default: null },
  autoplay: { type: Boolean, default: false },
  autopDelay: { type: Number, default: 3000 },
  navigation: { type: Boolean, default: null },
  pagination: { type: Boolean, default: null },
  paginationType: { type: String, default: 'bullets' },
  paginationClass: { type: String, default: null },
  // scrollbar: { type: Boolean, default: null },

  activeIndexChange: { type: Function, default: null },
  afterInit: { type: Function, default: null },
  beforeDestroy: { type: Function, default: null },
  beforeInit: { type: Function, default: null },
  beforeLoopFix: { type: Function, default: null },
  beforeResize: { type: Function, default: null },
  beforeSlideChangeStart: { type: Function, default: null },
  beforeTransitionStart: { type: Function, default: null },
  breakpoint: { type: Function, default: null },
  changeDirection: { type: Function, default: null },
  click: { type: Function, default: null },
  destroy: { type: Function, default: null },
  doubleClick: { type: Function, default: null },
  doubleTap: { type: Function, default: null },
  fromEdge: { type: Function, default: null },
  init: { type: Function, default: null },
  lock: { type: Function, default: null },
  loopFix: { type: Function, default: null },
  momentumBounce: { type: Function, default: null },
  observerUpdate: { type: Function, default: null },
  orientationchange: { type: Function, default: null },
  progress: { type: Function, default: null },
  reachBeginning: { type: Function, default: null },
  reachEnd: { type: Function, default: null },
  realIndexChange: { type: Function, default: null },
  resize: { type: Function, default: null },
  setTransition: { type: Function, default: null },
  setTranslate: { type: Function, default: null },
  slideChange: { type: Function, default: null },
  slideChangeTransitionEnd: { type: Function, default: null },
  slideChangeTransitionStart: { type: Function, default: null },
  slideNextTransitionEnd: { type: Function, default: null },
  slideNextTransitionStart: { type: Function, default: null },
  slidePrevTransitionEnd: { type: Function, default: null },
  slidePrevTransitionStart: { type: Function, default: null },
  slideResetTransitionEnd: { type: Function, default: null },
  slideResetTransitionStart: { type: Function, default: null },
  sliderFirstMove: { type: Function, default: null },
  sliderMove: { type: Function, default: null },
  slidesGridLengthChange: { type: Function, default: null },
  slidesLengthChange: { type: Function, default: null },
  snapGridLengthChange: { type: Function, default: null },
  snapIndexChange: { type: Function, default: null },
  tap: { type: Function, default: null },
  toEdge: { type: Function, default: null },
  touchEnd: { type: Function, default: null },
  touchMove: { type: Function, default: null },
  touchMoveOpposite: { type: Function, default: null },
  touchStart: { type: Function, default: null },
  transitionEnd: { type: Function, default: null },
  transitionStart: { type: Function, default: null },
  unlock: { type: Function, default: null },
  update: { type: Function, default: null }
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

Swiper.use([Parallax, A11y, EffectCoverflow, EffectCube, EffectFade, EffectFlip, EffectCreative, EffectCards]);
const swiperOption = computed(() => {
  const returnVal: any = {
    slidesPerView: props.slidesPerView,
    parallax: true,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
      paginationBulletMessage: '{{index}}번 슬라이드로 이동'
    },
    on: {
      activeIndexChange: function (swiper: Swiper) {
        if (props.activeIndexChange) props.activeIndexChange(swiper);
      },
      afterInit: function (swiper: Swiper) {
        if (props.afterInit) props.afterInit(swiper);
      },
      beforeDestroy: function (swiper: Swiper) {
        if (props.beforeDestroy) props.beforeDestroy(swiper);
      },
      beforeInit: function (swiper: Swiper) {
        if (props.beforeInit) props.beforeInit(swiper);
      },
      beforeLoopFix: function (swiper: Swiper) {
        if (props.beforeLoopFix) props.beforeLoopFix(swiper);
      },
      beforeResize: function (swiper: Swiper) {
        if (props.beforeResize) props.beforeResize(swiper);
      },
      beforeSlideChangeStart: function (swiper: Swiper) {
        if (props.beforeSlideChangeStart) props.beforeSlideChangeStart(swiper);
      },
      beforeTransitionStart: function (swiper: Swiper, speed: any, internal: any) {
        if (props.beforeSlideChangeStart) props.beforeSlideChangeStart(swiper, speed, internal);
      },
      breakpoint: function (swiper: Swiper, breakpointParams: any) {
        if (props.breakpoint) props.breakpoint(swiper, breakpointParams);
      },
      changeDirection: function (swiper: Swiper) {
        if (props.changeDirection) props.changeDirection(swiper);
      },
      click: function (swiper: Swiper, event: Event) {
        if (props.click) props.click(swiper, event);
      },
      destroy: function (swiper: Swiper) {
        if (props.destroy) props.destroy(swiper);
      },
      doubleClick: function (swiper: Swiper, event: Event) {
        if (props.doubleClick) props.doubleClick(swiper, event);
      },
      doubleTap: function (swiper: Swiper, event: Event) {
        if (props.doubleTap) props.doubleTap(swiper, event);
      },
      fromEdge: function (swiper: Swiper) {
        if (props.fromEdge) props.fromEdge(swiper);
      },
      init: function (swiper: Swiper) {
        if (props.init) props.init(swiper);
      },
      lock: function (swiper: Swiper) {
        if (props.lock) props.lock(swiper);
      },
      loopFix: function (swiper: Swiper) {
        if (props.loopFix) props.loopFix(swiper);
      },
      momentumBounce: function (swiper: Swiper) {
        if (props.momentumBounce) props.momentumBounce(swiper);
      },
      observerUpdate: function (swiper: Swiper) {
        if (props.observerUpdate) props.observerUpdate(swiper);
      },
      orientationchange: function (swiper: Swiper) {
        if (props.orientationchange) props.orientationchange(swiper);
      },
      progress: function (swiper: Swiper, progress: any) {
        if (props.progress) props.progress(swiper, progress);
      },
      reachBeginning: function (swiper: Swiper) {
        if (props.reachBeginning) props.reachBeginning(swiper);
      },
      reachEnd: function (swiper: Swiper) {
        if (props.reachEnd) props.reachEnd(swiper);
      },
      realIndexChange: function (swiper: Swiper) {
        if (props.realIndexChange) props.realIndexChange(swiper);
      },
      resize: function (swiper: Swiper) {
        if (props.resize) props.resize(swiper);
      },
      setTransition: function (swiper: Swiper, transition: any) {
        if (props.setTransition) props.setTransition(swiper, transition);
      },
      setTranslate: function (swiper: Swiper, translate: any) {
        if (props.setTranslate) props.setTranslate(swiper, translate);
      },
      slideChange: function (swiper: Swiper) {
        if (swiperIdx.value !== swiper.realIndex) swiperIdx.value = swiper.realIndex;
        if (props.slideChange) props.slideChange(swiper);
      },
      slideChangeTransitionEnd: function (swiper: Swiper) {
        if (props.slideChangeTransitionEnd) props.slideChangeTransitionEnd(swiper);
      },
      slideChangeTransitionStart: function (swiper: Swiper) {
        if (props.slideChangeTransitionStart) props.slideChangeTransitionStart(swiper);
      },
      slideNextTransitionEnd: function (swiper: Swiper) {
        if (props.slideNextTransitionEnd) props.slideNextTransitionEnd(swiper);
      },
      slideNextTransitionStart: function (swiper: Swiper) {
        if (props.slideNextTransitionStart) props.slideNextTransitionStart(swiper);
      },
      slidePrevTransitionEnd: function (swiper: Swiper) {
        if (props.slidePrevTransitionEnd) props.slidePrevTransitionEnd(swiper);
      },
      slidePrevTransitionStart: function (swiper: Swiper) {
        if (props.slidePrevTransitionStart) props.slidePrevTransitionStart(swiper);
      },
      slideResetTransitionEnd: function (swiper: Swiper) {
        if (props.slideResetTransitionEnd) props.slideResetTransitionEnd(swiper);
      },
      slideResetTransitionStart: function (swiper: Swiper) {
        if (props.slideResetTransitionStart) props.slideResetTransitionStart(swiper);
      },
      sliderFirstMove: function (swiper: Swiper, event: Event) {
        if (props.sliderFirstMove) props.sliderFirstMove(swiper, event);
      },
      sliderMove: function (swiper: Swiper, event: Event) {
        if (props.sliderMove) props.sliderMove(swiper, event);
      },
      slidesGridLengthChange: function (swiper: Swiper) {
        if (props.slidesGridLengthChange) props.slidesGridLengthChange(swiper);
      },
      slidesLengthChange: function (swiper: Swiper) {
        if (props.slidesLengthChange) props.slidesLengthChange(swiper);
      },
      snapGridLengthChange: function (swiper: Swiper) {
        if (props.snapGridLengthChange) props.snapGridLengthChange(swiper);
      },
      snapIndexChange: function (swiper: Swiper) {
        if (props.snapIndexChange) props.snapIndexChange(swiper);
      },
      tap: function (swiper: Swiper, event: Event) {
        if (props.tap) props.tap(swiper, event);
      },
      toEdge: function (swiper: Swiper) {
        if (props.toEdge) props.toEdge(swiper);
      },
      touchEnd: function (swiper: Swiper, event: Event) {
        if (props.touchEnd) props.touchEnd(swiper, event);
      },
      touchMove: function (swiper: Swiper, event: Event) {
        if (props.touchMove) props.touchMove(swiper, event);
      },
      touchMoveOpposite: function (swiper: Swiper, event: Event) {
        if (props.touchMoveOpposite) props.touchMoveOpposite(swiper, event);
      },
      touchStart: function (swiper: Swiper, event: Event) {
        if (props.touchStart) props.touchStart(swiper, event);
      },
      transitionEnd: function (swiper: Swiper) {
        if (props.transitionEnd) props.transitionEnd(swiper);
      },
      transitionStart: function (swiper: Swiper) {
        if (props.transitionStart) props.transitionStart(swiper);
      },
      unlock: function (swiper: Swiper) {
        if (props.unlock) props.unlock(swiper);
      },
      update: function (swiper: Swiper) {
        if (props.update) props.update(swiper);
      }
    }
  };
  if (props.loop) returnVal.loop = true;
  if (props.autoHeight) returnVal.autoHeight = props.autoHeight;
  if (props.centeredSlides) returnVal.centeredSlides = props.centeredSlides;

  if (!props.allowTouchMove) returnVal.allowTouchMove = props.allowTouchMove;
  if (props.spaceBetween) returnVal.spaceBetween = props.spaceBetween;
  if (props.slidesOffsetBefore) returnVal.slidesOffsetBefore = props.slidesOffsetBefore;
  if (props.slidesOffsetAfter) returnVal.slidesOffsetAfter = props.slidesOffsetAfter;
  if (props.speed) returnVal.speed = props.speed;
  if (props.modelValue) returnVal.initialSlide = props.modelValue;

  const directionAry = ['horizontal', 'vertical'];
  if (props.direction) returnVal.direction = props.direction;

  const effectAry = ['slide', 'fade', 'cube', 'coverflow', 'flip', 'creative', 'cards'];
  if (props.effect) returnVal.effect = props.effect;

  if (props.breakpoints) returnVal.breakpoints = props.breakpoints;

  if (props.autoplay) {
    Swiper.use([Autoplay]);
    returnVal.autoplay = {
      delay: props.autopDelay
      // disableOnInteraction: false
    };
  }

  if (props.navigation && el.value) {
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

const autoPlayButton = () => {
  isAutoplay.value = !isAutoplay.value;
  if (!swiperInstance.value) return;
  if (isAutoplay.value) {
    swiperInstance.value.autoplay.start();
  } else {
    swiperInstance.value.autoplay.stop();
  }
};

watch(swiperIdx, (newValue) => {
  if (props.modelValue && props.modelValue !== newValue) {
    emit('update:modelValue', newValue);
  }
});
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (!swiperInstance.value || !newValue) return;
    const $realIndex = swiperInstance.value.realIndex;
    if (newValue !== $realIndex) swiperInstance.value.slideTo(newValue, 300);
  }
);

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
      <button v-if="navigation" type="button" class="swiper-button swiper-button-prev"></button>
      <button v-if="navigation" type="button" class="swiper-button swiper-button-next"></button>
    </div>
    <div v-if="pagination && autoplay" class="swiper-pagination-wrap">
      <div class="swiper-pagination" :class="paginationClass"></div>
      <button class="swiper-auto-ctl" :class="{ play: !isAutoplay }" :aria-label="autoplayText" @click="autoPlayButton"></button>
    </div>
    <div v-else-if="pagination" class="swiper-pagination" :class="paginationClass"></div>
    <div v-else-if="autoplay" class="swiper-auto">
      <button class="swiper-auto-ctl" :class="{ play: !isAutoplay }" :aria-label="autoplayText" @click="autoPlayButton"></button>
    </div>
    <!-- <div v-if="scrollbar" class="swiper-scrollbar"></div> -->
  </div>
</template>
