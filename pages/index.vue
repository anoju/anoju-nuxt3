<script setup lang="ts">
useHead({
  title: '페이지 제목'
});

const count: Ref<number> = ref(0);
const rdoVal: Ref<string> = ref('');

const incrementCount = (): void => {
  count.value++;
};
</script>
<template>
  <uiPage page-title="Index page" btn-back>
    <uiInner>
      <h1 class="tit-h1">NUXT3 컴포넌트 가이즈 제작</h1>
      <p class="t-right">by. 안효주</p>
      <br />
      <br />
      <div class="flex space-between align-center">
        <p><uiButton line @click="incrementCount">count++</uiButton></p>
        <p>Count: {{ count }}</p>
      </div>
      <uiRadio v-model="rdoVal" value="남자">남자</uiRadio>
      <uiRadio v-model="rdoVal" value="여자">여자</uiRadio>
      <P>{{ rdoVal }}</P>
    </uiInner>
    <uiBottomFixed flex full>
      <uiButton to="/guide/text" primary>Go to Guide</uiButton>
    </uiBottomFixed>
  </uiPage>
</template>
