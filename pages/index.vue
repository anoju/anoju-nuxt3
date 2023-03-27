<script setup lang="ts">
const count: Ref<number> = ref(0);

const incrementCount = (): void => {
  count.value++;
};
</script>
<template>
  <uiPage page-title="Index page" btn-back>
    <uiInner>
      <p><uiButton2 to="/home" line>move home</uiButton2></p>
      <p><uiButton2 line @click="incrementCount">버튼</uiButton2></p>
      <p>Count: {{ count }}</p>
    </uiInner>
  </uiPage>
</template>
