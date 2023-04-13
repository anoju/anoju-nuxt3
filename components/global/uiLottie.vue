<script lang="ts" setup>
import lottie from 'lottie-web';
const props = defineProps({
  // animationData: {
  //   type: Object,
  //   required: true
  // },
  path: {
    type: String,
    required: true
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  }
});
const container = ref(null);
let animationInstance: any;

onMounted(() => {
  if (container.value) {
    animationInstance = lottie.loadAnimation({
      container: container.value as HTMLElement,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      path: props.path
      // animationData: props.animationData
    });
  }
});

onBeforeUnmount(() => {
  animationInstance.destroy();
});
</script>
<template>
  <div ref="container" class="lottie"></div>
</template>
