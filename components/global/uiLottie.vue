<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie';

// Types
type Direction = 'forward' | 'reverse' | 1 | -1;

interface Props {
  // JSON 데이터를 직접 전달할 때 사용
  animationData?: Record<string, unknown> | null;
  // JSON 파일 경로를 전달할 때 사용 (외부 URL 또는 로컬 경로)
  animationLink?: string | null;
  // 로컬 경로 (기존 path prop과 호환)
  path?: string | null;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number | string | null;
  height?: number | string | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  animationData: null,
  animationLink: null,
  path: null,
  loop: false,
  autoplay: false,
  speed: 1,
  width: null,
  height: null
});

// Template refs
const lottieRef = ref<InstanceType<typeof Vue3Lottie> | null>(null);

// Computed properties
const computedAnimationLink = computed<string | undefined>(() => {
  return props.animationLink || props.path || undefined;
});

const hasAnimation = computed<boolean>(() => {
  return !!(props.animationData || computedAnimationLink.value);
});

// Computed properties for Vue3Lottie props (null to undefined conversion)
const lottieWidth = computed<string | number | undefined>(() => {
  return props.width || undefined;
});

const lottieHeight = computed<string | number | undefined>(() => {
  return props.height || undefined;
});

// Animation control methods
const play = (): void => {
  lottieRef.value?.play();
};

const pause = (): void => {
  lottieRef.value?.pause();
};

const stop = (): void => {
  lottieRef.value?.stop();
};

const setSpeed = (speed: number): void => {
  lottieRef.value?.setSpeed(speed);
};

const setDirection = (direction: Direction): void => {
  const directionValue = direction === 'forward' ? 1 : direction === 'reverse' ? -1 : direction;
  if (lottieRef.value && 'setDirection' in lottieRef.value) {
    (lottieRef.value as any).setDirection(directionValue);
  }
};

// Public API - expose methods for external use
defineExpose({
  play,
  pause,
  stop,
  setSpeed,
  setDirection,
  lottieRef
});
</script>

<template>
  <ClientOnly>
    <Vue3Lottie
      v-if="hasAnimation"
      ref="lottieRef"
      :animation-data="animationData"
      :animation-link="computedAnimationLink"
      :loop="loop"
      :autoplay="autoplay"
      :speed="speed"
      :width="lottieWidth"
      :height="lottieHeight"
      class="lottie"
    />
    <template #fallback>
      <div class="lottie-loading">Loading animation...</div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.lottie-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  color: #666;
}
</style>
