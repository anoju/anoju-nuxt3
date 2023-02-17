<template>
  <NuxtPage />
</template>
<script lang="ts">
export default {
  mounted() {
    this.vhChk();
    window.addEventListener('resize', this.vhChk);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.vhChk);
  },
  methods: {
    vhChk() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
};
</script>
