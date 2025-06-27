<script lang="ts" setup>
import { ModalSystemKey } from '~/composables/useModalSystem';

// 모달 시스템 주입
const modalSystem = inject(ModalSystemKey);
if (!modalSystem) {
  throw new Error('Modal system not provided');
}

const {
  modals,
  likes,
  isLoading,
  loadingShow,
  loadingTxt,
  closeModal,
  setModalContainerEl
} = modalSystem;

const el = ref<HTMLElement | null>(null);

// el ref가 설정되면 composables에 전달
onMounted(() => {
  if (el.value) {
    setModalContainerEl(el.value);
  }
});

// el이 변경될 때마다 업데이트
watchEffect(() => {
  setModalContainerEl(el.value);
});
</script>
<template>
  <div v-if="modals.length || likes.length || isLoading" ref="el" class="modal-container">
    <!-- popup -->
    <div v-for="(modal, i) in modals" :key="i" class="popup" :class="[modal.type, modal.addClass, { show: modal.show, open: modal.open }]">
      <div class="pop-bg-close" role="button" aria-label="팝업창 닫기" @click="closeModal(i)"></div>
      <component :is="modal.component" v-bind="modal.componentProps" :data-idx="i" @close="closeModal(i, $event?.payload)" />
    </div>

    <!-- like -->
    <div v-for="(lk, j) in likes" :key="j" class="layer-like" :class="{ show: lk.show }" aria-hidden="true">
      <uiLottie v-if="lk.type === 'heart'" path="/lottie/temp-love.json" autoplay></uiLottie>
    </div>

    <!-- loading -->
    <div v-if="isLoading" class="loading-wrap" :class="{ show: loadingShow }">
      <div class="tl">
        <div>
          <div class="loading-lottie" role="img" :aria-label="!loadingTxt ? '화면을 불러오는중입니다.' : ''">
            <uiLottie path="/lottie/loading.json" autoplay loop aria-hidden="true"></uiLottie>
          </div>
          <div v-if="loadingTxt" class="txt">{{ loadingTxt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
