<script lang="ts" setup>
import Swiper, { Swiper as SwiperInstance } from 'swiper';
const props = defineProps({
  pagination: { type: Boolean, default: true },
  navi: { type: Boolean, default: true }
});

const swiperInstance = ref<SwiperInstance | null>(null);

onMounted(() => {
  if (swiperInstance.value) {
    swiperInstance.value = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }
});
</script>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
    <div v-if="navi" class="swiper-button-next"></div>
    <div v-if="navi" class="swiper-button-prev"></div>
  </div>
</template>
