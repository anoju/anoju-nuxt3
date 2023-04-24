<script lang="ts" setup>
const pageTitle = 'Guide - Form Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const chkVal: Ref<boolean> = ref(false);
const chkVal2: Ref<string> = ref('N');
const rdoVal: Ref<string> = ref('');
const rdoVal2: Ref<string> = ref('');
const rdoVal3: Ref<string> = ref('');
const inpVal: Ref<string> = ref('');
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">checkbox</h1>
    <div>
      <h2 class="gd__h2">base</h2>
      <div class="flex">
        <uiCheckbox v-model="chkVal">선택</uiCheckbox>
        <div class="ml-auto">value : {{ chkVal }}</div>
      </div>
      <h2 class="gd__h2">true-value, false-value</h2>
      <div class="flex">
        <uiCheckbox v-model="chkVal2" true-value="Y" false-value="N">
          <template v-if="chkVal2 == 'Y'">선택하면 Y</template>
          <template v-if="chkVal2 == 'N'">선택안하면 N</template>
        </uiCheckbox>
        <div class="ml-auto">value: {{ chkVal2 }}</div>
      </div>
      <h2 class="gd__h2">size</h2>
      <div>
        <uiCheckbox v-model="chkVal" large>large</uiCheckbox>
        <uiCheckbox v-model="chkVal2" true-value="Y" false-value="N">default</uiCheckbox>
        <uiCheckbox v-model="chkVal" small>small</uiCheckbox>
      </div>

      <h2 class="gd__h2">button type</h2>
      <div class="flex full">
        <uiCheckbox v-model="chkVal" button>선택1</uiCheckbox>
        <uiCheckbox v-model="chkVal2" button true-value="Y" false-value="N">선택2</uiCheckbox>
      </div>
      <h2 class="gd__h2">switch type</h2>
      <div>
        <uiCheckbox v-model="chkVal" switch>switch1</uiCheckbox>
        <br />
        <uiCheckbox v-model="chkVal2" switch2 true-value="Y" false-value="N">switch2</uiCheckbox>
      </div>
    </div>
    <h1 class="gd__h1">radio</h1>
    <div>
      <h2 class="gd__h2">base</h2>
      <div class="flex">
        <div>
          <uiRadio v-model="rdoVal" value="1">1</uiRadio>
          <uiRadio v-model="rdoVal" value="2">2</uiRadio>
        </div>
        <div class="ml-auto">value: {{ rdoVal }}</div>
      </div>

      <h2 class="gd__h2">size</h2>
      <div class="flex">
        <div>
          <uiRadio v-model="rdoVal2" large value="large">large</uiRadio>
          <uiRadio v-model="rdoVal2" value="default">default</uiRadio>
          <uiRadio v-model="rdoVal2" small value="small">small</uiRadio>
        </div>
        <div class="ml-auto">value: {{ rdoVal2 }}</div>
      </div>
      <h2 class="gd__h2">button type</h2>
      <div class="flex full">
        <uiRadio v-model="rdoVal3" button value="남자">남자</uiRadio>
        <uiRadio v-model="rdoVal3" button value="여자">여자</uiRadio>
      </div>
      <p>value: {{ rdoVal3 }}</p>
    </div>
    <h1 class="gd__h1">input</h1>
    <div>
      <h2 class="gd__h2">base</h2>
      <uiInput v-model="inpVal"></uiInput>
    </div>
    <br />
    {{ inpVal }}
  </uiInner>
</template>
