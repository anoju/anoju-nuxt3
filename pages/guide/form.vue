<script lang="ts" setup>
const pageTitle = 'Guide - Form Elements';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const fdPanelVal: Ref<boolean> = ref(false);
const chkVal: Ref<boolean> = ref(false);
const chkVal2: Ref<string> = ref('N');
const chkVal3: Ref<string[]> = ref([]);
const rdoVal: Ref<string> = ref('');
const rdoVal2: Ref<string> = ref('');
const rdoVal3: Ref<string> = ref('');
const inpVal: Ref<string> = ref('');
const inpVal2: Ref<string> = ref('');
const inpVal3: Ref<string | null> = ref('');

const checkCode1 = `<uiCheckbox v-model="chkVal" />
<uiCheckbox v-model="chkVal">텍스트 있음</uiCheckbox>
<uiCheckbox v-model="chkVal" value="1">1</uiCheckbox>
<uiCheckbox v-model="chkVal" value="2">2</uiCheckbox>
<uiCheckbox v-model="chkVal" value="3">3</uiCheckbox>`;
const checkCode2 = `<uiCheckbox v-model="chkVal" true-value="Y" false-value="N">선택</uiCheckbox>`;
const checkCode3 = `<uiCheckbox v-model="chkVal" large>large</uiCheckbox>
<uiCheckbox v-model="chkVal">default</uiCheckbox>
<uiCheckbox v-model="chkVal" small>small</uiCheckbox>`;
const checkCode4 = `<uiCheckbox v-model="chkVal" button>선택</uiCheckbox>`;
const checkCode5 = `<uiCheckbox v-model="chkVal" switch>switch1</uiCheckbox>
<uiCheckbox v-model="chkVal" switch2>switch2</uiCheckbox>`;

const radioCode1 = `<uiRadio v-model="rdoVal" value="1">1</uiRadio>
<uiRadio v-model="rdoVal" value="2">2</uiRadio>`;
const radioCode2 = `<uiRadio v-model="rdoVal" large value="large">large</uiRadio>
<uiRadio v-model="rdoVal" value="default">default</uiRadio>
<uiRadio v-model="rdoVal" small value="small">small</uiRadio>`;
const radioCode3 = `<uiRadio v-model="rdoVal3" button value="남자">남자</uiRadio>
<uiRadio v-model="rdoVal3" button value="여자">여자</uiRadio>`;

const inputCode1 = `<uiInput v-model="inpVal"></uiInput>
<uiInput v-model="inpVal" readonly></uiInput>
<uiInput v-model="inpVal" disabled></uiInput>
<uiInput v-model="inpVal2" type="password"></uiInput>`;
const inputCode1_2 = `<uiInput v-model="inpVal"><uiButton line h24>버튼</uiButton></uiInput>
<div class="flex">
  <uiInput v-model="inpVal"></uiInput>
  <uiButton line class="w-80f">버튼</uiButton>
</div>
<uiInput v-model="inpVal">
  <uiButton h32 class="search" aria-label="검색"><icon type="btn" name="search-24"></icon></uiButton>
</uiInput>`;
const inputCode2 = `<uiInput v-model="inpVal" box></uiInput>
<uiInput v-model="inpVal" box readonly></uiInput>
<uiInput v-model="inpVal" box disabled></uiInput>
<uiInput v-model="inpVal" type="password" box></uiInput>`;
const inputCode3 = `<uiInput v-model="inpVal" line placeholder="입력"></uiInput>
<uiInput v-model="inpVal" line placeholder="금액입력" unit="원"></uiInput>`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">checkbox</h1>
    <div>
      <h2 class="gd__h2">base</h2>
      <div class="flex">
        <uiCheckbox v-model="chkVal" />
        <div class="ml-auto">value : {{ chkVal }}</div>
      </div>
      <div class="flex">
        <uiCheckbox v-model="chkVal">텍스트 있음</uiCheckbox>
        <div class="ml-auto">value : {{ chkVal }}</div>
      </div>
      <div class="flex">
        <uiCheckbox v-model="chkVal3" value="1">1</uiCheckbox>
        <uiCheckbox v-model="chkVal3" value="2">2</uiCheckbox>
        <uiCheckbox v-model="chkVal3" value="3">3</uiCheckbox>
        <div class="ml-auto">value : {{ chkVal3 }}</div>
      </div>
      <uiCodeHighlight lang="html" :code="checkCode1"></uiCodeHighlight>

      <h2 class="gd__h2">true-value, false-value</h2>
      <div class="flex">
        <uiCheckbox v-model="chkVal2" true-value="Y" false-value="N">
          <template v-if="chkVal2 == 'Y'">선택하면 Y</template>
          <template v-if="chkVal2 == 'N'">선택안하면 N</template>
        </uiCheckbox>
        <div class="ml-auto">value: {{ chkVal2 }}</div>
      </div>
      <uiCodeHighlight lang="html" :code="checkCode2"></uiCodeHighlight>

      <h2 class="gd__h2">size</h2>
      <div>
        <uiCheckbox v-model="chkVal" large>large</uiCheckbox>
        <uiCheckbox v-model="chkVal2" true-value="Y" false-value="N">default</uiCheckbox>
        <uiCheckbox v-model="chkVal" small>small</uiCheckbox>
      </div>
      <uiCodeHighlight lang="html" :code="checkCode3"></uiCodeHighlight>

      <h2 class="gd__h2">button type</h2>
      <div class="flex full">
        <uiCheckbox v-model="chkVal" button>선택1</uiCheckbox>
        <uiCheckbox v-model="chkVal2" button true-value="Y" false-value="N">선택2</uiCheckbox>
      </div>
      <uiCodeHighlight lang="html" :code="checkCode4"></uiCodeHighlight>

      <h2 class="gd__h2">switch type</h2>
      <div>
        <uiCheckbox v-model="chkVal" switch>switch1</uiCheckbox>
        <br />
        <uiCheckbox v-model="chkVal2" switch2 true-value="Y" false-value="N">switch2</uiCheckbox>
      </div>
      <uiCodeHighlight lang="html" :code="checkCode5"></uiCodeHighlight>

      <h2 class="gd__h2">etc</h2>
      <div>
        <uiCheckbox v-model="chkVal" radio>radio모양 checkbox</uiCheckbox>
        <br />
        <br />
        <uiCheckbox v-model="chkVal" box>박스형태</uiCheckbox>
        <br />
        <uiCheckbox v-model="chkVal" box>
          박스형태2
          <template #child>기타 텍스트를 넣을수 있습니다.</template>
        </uiCheckbox>
        <br />
        <div class="chk-item">
          <uiCheckbox v-model="chkVal">박스형태</uiCheckbox>
        </div>

        <div class="chk-item folding">
          <uiCheckbox v-model="chkVal">
            박스형태
            <template #last>
              <uiButton not class="ui-folding-btn" :class="{ open: fdPanelVal }" @click="fdPanelVal = !fdPanelVal"><icon name="arr-down-24"></icon></uiButton>
            </template>
          </uiCheckbox>
          <uiFoldingPanel v-model="fdPanelVal">
            슬라이드 영역입니다. <br />
            슬라이드 영역입니다. <br />
            슬라이드 영역입니다. <br />
            슬라이드 영역입니다. <br />
            슬라이드 영역입니다. <br />
            슬라이드 영역입니다. <br />
          </uiFoldingPanel>
        </div>

        {{ fdPanelVal }}
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
      <uiCodeHighlight lang="html" :code="radioCode1"></uiCodeHighlight>

      <h2 class="gd__h2">size</h2>
      <div class="flex">
        <div>
          <uiRadio v-model="rdoVal2" large value="large">large</uiRadio>
          <uiRadio v-model="rdoVal2" value="default">default</uiRadio>
          <uiRadio v-model="rdoVal2" small value="small">small</uiRadio>
        </div>
        <div class="ml-auto">value: {{ rdoVal2 }}</div>
      </div>
      <uiCodeHighlight lang="html" :code="radioCode2"></uiCodeHighlight>

      <h2 class="gd__h2">button type</h2>
      <div class="flex full">
        <uiRadio v-model="rdoVal3" button value="남자">남자</uiRadio>
        <uiRadio v-model="rdoVal3" button value="여자">여자</uiRadio>
      </div>
      <p>value: {{ rdoVal3 }}</p>
      <uiCodeHighlight lang="html" :code="radioCode3"></uiCodeHighlight>
    </div>
    <h1 class="gd__h1">input</h1>
    <div>
      <h2 class="gd__h2">base</h2>
      <uiInput v-model="inpVal"></uiInput>
      <uiInput v-model="inpVal" readonly></uiInput>
      <uiInput v-model="inpVal" disabled></uiInput>
      <uiInput v-model="inpVal" type="password"></uiInput>
      inpVal: {{ inpVal }}
      <uiCodeHighlight lang="html" :code="inputCode1"></uiCodeHighlight>

      <h2 class="gd__h2">base+</h2>
      <uiInput v-model="inpVal" unit="원"></uiInput>
      <br />
      <uiInput v-model="inpVal" front-unit="약" unit="원"></uiInput>
      <br />
      <uiInput v-model="inpVal"><uiButton line h24>버튼</uiButton></uiInput>
      <br />
      <div class="flex">
        <uiInput v-model="inpVal"></uiInput>
        <uiButton line class="w-80f">버튼</uiButton>
      </div>
      <br />
      <uiInput v-model="inpVal">
        <uiButton h32 class="search"><icon type="btn" name="search-24"></icon></uiButton>
      </uiInput>
      <uiCodeHighlight lang="html" :code="inputCode1_2"></uiCodeHighlight>

      <h2 class="gd__h2">box</h2>
      <uiInput v-model="inpVal2" box></uiInput>
      <uiInput v-model="inpVal2" box readonly></uiInput>
      <uiInput v-model="inpVal2" box disabled></uiInput>
      <uiInput v-model="inpVal2" type="password" box></uiInput>
      inpVal: {{ inpVal2 }}
      <uiCodeHighlight lang="html" :code="inputCode2"></uiCodeHighlight>

      <h2 class="gd__h2">line</h2>
      <uiInput v-model="inpVal3" line placeholder="입력"></uiInput>
      <uiInput v-model="inpVal3" line placeholder="금액입력" unit="원"></uiInput>
      <uiCodeHighlight lang="html" :code="inputCode3"></uiCodeHighlight>
    </div>
  </uiInner>
</template>
