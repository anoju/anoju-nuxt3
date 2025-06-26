<script lang="ts" setup>
import { ModalSystemKey } from '~/composables/useModalSystem';
// 모달 시스템 주입
const modalSystem = inject(ModalSystemKey);
if (!modalSystem) {
  throw new Error('Modal system not provided');
}

const {
  modals,
  isClosing,
  likes,
  isLoading,
  loadingShow,
  loadingTxt,
  closeModal,
  openModal
} = modalSystem;

const el = ref<HTMLElement | null>(null);

const onOpen = (index: number, type?: string, addClass?: string[] | string): void => {
  if (isClosing.value) return;
  const idx = index;
  if (!el.value) return;
  const $popup = el.value.children[idx] as HTMLElement;
  const $wrap = $popup.querySelector('.pop-wrap') as HTMLElement;

  openModal(idx, type, addClass);

  setTimeout(() => {
    $popup.setAttribute('aria-hidden', 'false');
    if (idx > 0) {
      ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'true');
    }
  }, 1);

  setTimeout(() => {
    const popHeadH1 = $wrap.querySelector('.pop-head h1') as HTMLElement;
    const popHeadClose = $wrap.querySelector('.pop-head .pop-close') as HTMLElement;

    if (popHeadH1 !== null) {
      popHeadH1.focus();
    } else if (popHeadClose !== null) {
      popHeadClose.focus();
    }
    $popup.classList.add('opened');
  }, 501);
};

const onClose = (index: number | string, { payload }: { payload?: any } = {}): void => {
  const idx = Number(index);
  if (!el.value) return;
  const $popup = el.value.children[idx] as HTMLElement;
  
  if (idx > 0) {
    ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'false');
  }
  
  closeModal(idx, payload);
};

// 모달이 추가될 때 자동으로 열기 (기존 동작 유지)
watch(modals, (newModals, oldModals) => {
  if (newModals.length > oldModals.length) {
    // 새로운 모달이 추가되면 자동으로 열기
    const newIndex = newModals.length - 1;
    nextTick(() => {
      onOpen(newIndex);
    });
  }
}, { deep: true });
</script>
<template>
  <div v-if="modals.length || likes.length || isLoading" ref="el" class="modal-container">
    <!-- popup -->
    <div v-for="(modal, i) in modals" :key="i" class="popup" :class="[modal.type, modal.addClass, { show: modal.show, open: modal.open }]">
      <div class="pop-bg-close" role="button" aria-label="팝업창 닫기" @click="onClose(i)"></div>
      <component :is="modal.component" v-bind="modal.componentProps" :data-idx="i" @close="onClose(i, $event)" />
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
