<script lang="ts" setup>
import fullPopup from '~/pages/guide/popup/fullPopup.vue';
import modalPopup from '~/pages/guide/popup/modalPopup.vue';
import bottomPopup from '~/pages/guide/popup/bottomPopup.vue';

const pageTitle = 'Guide - Popup Type';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

const openFullPopup = async () => {
  useNuxtApp()
    .$modal({
      component: fullPopup,
      componentProps: {
        title: '풀팝업입니다.'
      }
    })
    .then((result: any) => {
      console.log(result);
    });
};
const openModalPopup = async () => {
  useNuxtApp().$modal({
    component: modalPopup,
    componentProps: {
      number: 123456789
    }
  });
};
const openBottomPopup = async () => {
  useNuxtApp().$modal({
    component: bottomPopup,
    componentProps: {
      msg: '바텀팝업'
    }
  });
};

const openLike = () => {
  useNuxtApp().$like();
};

let isLoadingTxt = false;
const LoadingBtnZIndex = ref<number | null>(null);
const openLoading = () => {
  const opt: boolean | string = !isLoadingTxt ? true : '로딩중입니다.';
  isLoadingTxt = !isLoadingTxt;
  useNuxtApp().$loading(opt);
  LoadingBtnZIndex.value = 999;
};
const closeLoading = () => {
  useNuxtApp().$loading(false);
  LoadingBtnZIndex.value = null;
};

const popupCode1 = `import fullPopup from '~/pages/guide/popup/fullPopup.vue';
useNuxtApp()
  .$modal({
    component: fullPopup,
    componentProps: {
      title: '풀팝업입니다.'
    }
  })
  .then((result: any) => {
    console.log(result);
  });`;

const loadingCode1 = `// 로딩열기
useNuxtApp().$loading(true);

// 로딩열기 + 텍스트
useNuxtApp().$loading('로딩중입니다.');

// 로딩닫기
useNuxtApp().$loading(false);`;

const likeCode1 = `useNuxtApp().$like();`;
</script>
<template>
  <uiInner>
    <h1 class="gd__h1">팝업</h1>
    <h2 class="gd__h2">레이어</h2>
    <div class="flex full">
      <uiButton line @click="openFullPopup">풀팝업</uiButton>
      <uiButton line @click="openModalPopup">모달팝업</uiButton>
      <uiButton line @click="openBottomPopup">바텀시트</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="popupCode1"></uiCodeHighlight>

    <h2 class="gd__h2">로딩</h2>
    <div class="flex full">
      <uiButton line @click="openLoading">Loading open</uiButton>
      <uiButton line :style="{ zIndex: LoadingBtnZIndex ? LoadingBtnZIndex : '' }" @click="closeLoading">Loading close</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="loadingCode1"></uiCodeHighlight>

    <h2 class="gd__h2">기타</h2>
    <div class="flex full">
      <uiButton line @click="openLike">like</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="likeCode1"></uiCodeHighlight>
  </uiInner>
</template>
