<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie';

const props = defineProps({
  // JSON 데이터를 직접 전달할 때 사용
  animationData: {
    type: Object,
    required: false,
    default: undefined
  },
  // JSON 파일 경로를 전달할 때 사용 (외부 URL 또는 로컬 경로)
  animationLink: {
    type: String,
    required: false,
    default: undefined
  },
  // 로컬 경로 (기존 path prop과 호환)
  path: {
    type: String,
    required: false,
    default: undefined
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  speed: {
    type: Number,
    default: 1
  },
  width: {
    type: [Number, String],
    default: undefined
  },
  height: {
    type: [Number, String],
    default: undefined
  }
});

// path prop이 있으면 animationLink로 변환
const computedAnimationLink = computed(() => {
  return props.animationLink || props.path;
});

// 컴포넌트 참조
const lottieRef = ref<InstanceType<typeof Vue3Lottie>>();

// 애니메이션 제어 메서드들
const play = () => {
  lottieRef.value?.play();
};

const pause = () => {
  lottieRef.value?.pause();
};

const stop = () => {
  lottieRef.value?.stop();
};

const setSpeed = (speed: number) => {
  lottieRef.value?.setSpeed(speed);
};

const setDirection = (direction: 'forward' | 'reverse' | 1 | -1) => {
  const directionValue = direction === 'forward' ? 1 : direction === 'reverse' ? -1 : direction;
  lottieRef.value?.setDirection(directionValue as any);
};

// 메서드들을 외부에서 사용할 수 있도록 expose
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
      v-if="animationData || computedAnimationLink"
      ref="lottieRef"
      :animation-data="animationData"
      :animation-link="computedAnimationLink"
      :loop="loop"
      :autoplay="autoplay"
      :speed="speed"
      :width="width"
      :height="height"
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
