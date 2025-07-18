<script lang="ts" setup>
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip, EffectCreative, EffectCards, A11y, Parallax } from 'swiper/modules';
import type { Swiper as SwiperInstance, SwiperOptions } from 'swiper/types';

// Types
type SwiperEventHandler = (swiper: SwiperInstance) => void;
type Direction = 'horizontal' | 'vertical';
type Effect = 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards';
type PaginationType = 'bullets' | 'fraction' | 'progressbar' | 'custom';

interface Props {
  modelValue?: number | null;

  // Basic options
  slidesPerView?: number | string;
  loop?: boolean;
  autoHeight?: boolean;
  centeredSlides?: boolean;
  allowTouchMove?: boolean;
  spaceBetween?: number | null;
  slidesOffsetBefore?: number | null;
  slidesOffsetAfter?: number | null;
  speed?: number | null;
  direction?: string | null;

  // Advanced options
  effect?: string | null;
  breakpoints?: Record<string, unknown> | null;
  autoplay?: boolean;
  autopDelay?: number;
  navigation?: boolean | null;
  pagination?: boolean | null;
  paginationType?: string;
  paginationClass?: string | null;

  // Event handlers
  activeIndexChange?: SwiperEventHandler | null;
  afterInit?: SwiperEventHandler | null;
  beforeDestroy?: SwiperEventHandler | null;
  beforeInit?: SwiperEventHandler | null;
  slideChange?: SwiperEventHandler | null;
  slideChangeTransitionEnd?: SwiperEventHandler | null;
  slideChangeTransitionStart?: SwiperEventHandler | null;
  reachBeginning?: SwiperEventHandler | null;
  reachEnd?: SwiperEventHandler | null;
  realIndexChange?: SwiperEventHandler | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  slidesPerView: 'auto',
  loop: false,
  autoHeight: false,
  centeredSlides: false,
  allowTouchMove: true,
  spaceBetween: null,
  slidesOffsetBefore: null,
  slidesOffsetAfter: null,
  speed: null,
  direction: null,
  effect: null,
  breakpoints: null,
  autoplay: false,
  autopDelay: 3000,
  navigation: null,
  pagination: null,
  paginationType: 'bullets',
  paginationClass: null,
  activeIndexChange: null,
  afterInit: null,
  beforeDestroy: null,
  beforeInit: null,
  slideChange: null,
  slideChangeTransitionEnd: null,
  slideChangeTransitionStart: null,
  reachBeginning: null,
  reachEnd: null,
  realIndexChange: null
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

// Template refs and reactive state
const el = ref<HTMLElement | null>(null);
const swiperInstance = ref<SwiperInstance | null>(null);
const isAutoplay = ref<boolean>(true);
const swiperIdx = ref<number>(props.modelValue ?? 0);

// Computed properties
const autoplayText = computed<string>(() => {
  let txt = '슬라이드 자동롤링 ';
  txt += isAutoplay.value ? '중지' : '시작';
  return txt;
});

// Utility functions
const isArryInclude = (ary: string[], val: string): boolean => {
  return ary.includes(val);
};

const swiperOption = computed<SwiperOptions>(() => {
  const modules = [A11y, Parallax];

  const returnVal: SwiperOptions = {
    modules,
    slidesPerView: props.slidesPerView === 'auto' ? 'auto' : Number(props.slidesPerView) || 'auto',
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

  // Basic options
  if (props.loop) returnVal.loop = true;
  if (props.autoHeight) returnVal.autoHeight = props.autoHeight;
  if (props.centeredSlides) returnVal.centeredSlides = props.centeredSlides;
  if (!props.allowTouchMove) returnVal.allowTouchMove = props.allowTouchMove;
  if (props.spaceBetween) returnVal.spaceBetween = props.spaceBetween;
  if (props.slidesOffsetBefore) returnVal.slidesOffsetBefore = props.slidesOffsetBefore;
  if (props.slidesOffsetAfter) returnVal.slidesOffsetAfter = props.slidesOffsetAfter;
  if (props.speed) returnVal.speed = props.speed;
  if (props.modelValue !== null) returnVal.initialSlide = props.modelValue;

  // Direction setting
  const directionAry: Direction[] = ['horizontal', 'vertical'];
  if (props.direction && isArryInclude(directionAry, props.direction)) {
    returnVal.direction = props.direction as Direction;
  }

  // Effect setting
  const effectAry: Effect[] = ['slide', 'fade', 'cube', 'coverflow', 'flip', 'creative', 'cards'];
  if (props.effect && isArryInclude(effectAry, props.effect)) {
    returnVal.effect = props.effect as Effect;

    // Add effect modules
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

  // Breakpoints setting
  if (props.breakpoints) {
    returnVal.breakpoints = props.breakpoints as { [width: number]: SwiperOptions; [ratio: string]: SwiperOptions; };
  }

  // Autoplay setting
  if (props.autoplay) {
    modules.push(Autoplay);
    returnVal.autoplay = {
      delay: props.autopDelay,
      disableOnInteraction: false
    };
  }

  // Navigation setting
  if (props.navigation) {
    modules.push(Navigation);
    returnVal.navigation = {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    };
  }

  // Pagination setting
  if (props.pagination) {
    modules.push(Pagination);
    const paginationEl = (el.value?.querySelector('.swiper-pagination') as HTMLElement) || '.swiper-pagination';
    returnVal.pagination = {
      el: paginationEl,
      type: props.paginationType as PaginationType
    };

    if (props.paginationType === 'bullets' && typeof returnVal.pagination === 'object') {
      returnVal.pagination.clickable = true;
      returnVal.pagination.renderBullet = (index: number, className: string) => {
        return `<button type="button" class="${className}">${index + 1}번째 슬라이드</button>`;
      };
    }
  }

  // Update modules array
  returnVal.modules = modules;

  return returnVal;
});

// Methods
const autoPlayButton = (): void => {
  isAutoplay.value = !isAutoplay.value;
  if (!swiperInstance.value || !props.autoplay) return;

  if (isAutoplay.value) {
    swiperInstance.value.autoplay.start();
  } else {
    swiperInstance.value.autoplay.stop();
  }
};

// Watchers
watch(swiperIdx, (newValue: number) => {
  if (props.modelValue !== null && props.modelValue !== newValue) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue: number | null, oldValue: number | null) => {
    if (!swiperInstance.value || newValue === null) return;
    const $realIndex = swiperInstance.value.realIndex;
    if (newValue !== $realIndex) {
      swiperInstance.value.slideTo(newValue, 300);
    }
  }
);

// Lifecycle hooks
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
      <button v-if="navigation" type="button" class="swiper-button swiper-button-prev" />
      <button v-if="navigation" type="button" class="swiper-button swiper-button-next" />
    </div>
    <div v-if="pagination && autoplay" class="swiper-pagination-wrap">
      <div class="swiper-pagination" :class="paginationClass" />
      <button 
        v-if="autoplay" 
        class="swiper-auto-ctl" 
        :class="{ play: !isAutoplay }" 
        :aria-label="autoplayText" 
        @click="autoPlayButton"
      />
    </div>
    <div v-else-if="pagination" class="swiper-pagination" :class="paginationClass" />
    <div v-else-if="autoplay" class="swiper-auto">
      <button 
        class="swiper-auto-ctl" 
        :class="{ play: !isAutoplay }" 
        :aria-label="autoplayText" 
        @click="autoPlayButton"
      />
    </div>
  </div>
</template>
