<script setup lang="ts">
useHead({
  title: '페이지 제목'
});

const count: Ref<number> = ref(0);
const rdoVal: Ref<string> = ref('');
const chkVal: Ref<boolean> = ref(false);
const chkVal2: Ref<string> = ref('N');
const inpVal: Ref<string> = ref('');

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
      <br />
      <div class="flex full">
        <uiRadio v-model="rdoVal" button value="남자">남자</uiRadio>
        <uiRadio v-model="rdoVal" button value="여자">여자</uiRadio>
      </div>
      <br />
      {{ rdoVal }}
      <br />
      <br />
      <div>
        <uiCheckbox v-model="chkVal">선택1</uiCheckbox>
        <uiCheckbox v-model="chkVal2" small true-value="Y" false-value="N">선택2</uiCheckbox>
        <br />
        <br />
        {{ chkVal }}, {{ chkVal2 }}
      </div>
      <br />
      <uiInput v-model="inpVal"></uiInput>
      <br />
      {{ inpVal }}
      <br />
      <div style="background-color: #f1f1f1; height: 200vh"></div>
    </uiInner>
    <uiBottomFixed flex full>
      <uiButton to="/guide/text" primary>Go to Guide</uiButton>
    </uiBottomFixed>
  </uiPage>
</template>
