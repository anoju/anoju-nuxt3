<script setup lang="ts">
const count: Ref<number> = ref(0);

const incrementCount = (): void => {
  count.value++;
};
</script>
<template>
  <uiPage page-title="Index page" btn-back>
    <uiInner>
      <p><uiButton to="/home" line>move home</uiButton></p>
      <p><uiButton line @click="incrementCount">버튼</uiButton></p>
      <p>Count: {{ count }}</p>
    </uiInner>
  </uiPage>
</template>
