<script lang="ts" setup>
const pageTitle = 'Guide - Font';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">font</h1>

    <h3 class="gd__h3">Noto Sans KR - v27 (숫자+콤마 외 모두 적용)</h3>
    <div class="fz-20">
      <div class="gd__tbl">
        <table>
          <tbody>
            <tr>
              <th>Thin</th>
              <td>
                <div class="fw-100">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Light</th>
              <td>
                <div class="fw-300">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Regular</th>
              <td>
                <div class="fw-400">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Medium</th>
              <td>
                <div class="fw-500">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Bold</th>
              <td>
                <div class="fw-700">
                  <div>가나다라마바사아자차카타파하</div>
                  <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  <div>abcdefghijklmnopqrstuvwxyz</div>
                  <div>!@#$%^&*?'";:[]{}&lt;&gt;()-=_+/~`.\|</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Black</th>
              <td>
                <div class="fw-900">
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

    <h3 class="gd__h3">Roboto - v30 (숫자+콤마만 적용)</h3>
    <div class="fz-20">
      <div class="gd__tbl">
        <table>
          <tbody>
            <tr>
              <th>Thin</th>
              <td>
                <div class="fw-100">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Light</th>
              <td>
                <div class="fw-300">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Regular</th>
              <td>
                <div class="fw-400">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Medium</th>
              <td>
                <div class="fw-500">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Bold</th>
              <td>
                <div class="fw-700">
                  <div>1234567890,</div>
                  <div class="ff-noto">1234567890, <sub class="fc-888 fz-16">(Noto Sans KR:비교용)</sub></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>Black</th>
              <td>
                <div class="fw-900">
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
