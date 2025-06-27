<script lang="ts" setup>
const pageTitle = 'Guide - Font';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const fontWeightType = (i) => {
  if (i === 1) return 'Thin';
  if (i === 2) return 'ExtraLight ';
  if (i === 3) return 'Light';
  if (i === 4) return 'Regular';
  if (i === 5) return 'Medium';
  if (i === 6) return 'SemiBold';
  if (i === 7) return 'Bold';
  if (i === 8) return 'ExtraBold';
  if (i === 9) return 'Black';
};
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">font</h1>

    <h3 class="gd__h3">Noto Sans KR - v37 (숫자+콤마 외 모두 적용)</h3>
    <div class="fz-20">
      <div class="gd__tbl">
        <table>
          <tbody>
            <tr v-for="i in 9" :key="i">
              <th>{{ fontWeightType(i) }}</th>
              <td>
                <div :class="'fw-' + i * 100">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 class="gd__h3">Roboto - v48 (숫자+콤마만 적용)</h3>
    <div class="fz-20">
      <div class="gd__tbl">
        <table>
          <tbody>
            <tr v-for="i in 9" :key="i">
              <th>{{ fontWeightType(i) }}</th>
              <td>
                <div :class="'fw-' + i * 100">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <uiBottomFixed flex full>
      <uiButton to="/guide/font/detail" line>웹폰트 자세히 확인</uiButton>
    </uiBottomFixed>
  </uiInner>
</template>
