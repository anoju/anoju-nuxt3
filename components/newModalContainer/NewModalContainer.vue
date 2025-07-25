<template>
  <!-- 기존 modalContainer와 동일한 구조로 body에 렌더링 -->
  <Teleport to="body">
    <div v-if="visibleModals.length > 0" class="modal-container new-modal-system">
      <!-- 기존과 동일한 popup 구조 -->
      <div
        v-for="modal in visibleModals"
        v-show="modal.visible"
        :key="modal.id"
        :ref="(el) => setModalRef(modal.id, el as HTMLElement)"
        class="popup"
        :class="[
          modal.type,
          modal.addClass,
          {
            show: modal.show,
            open: modal.open
          }
        ]"
        :style="{
          zIndex: modal.zIndex
        }"
        :aria-hidden="!modal.show"
        role="dialog"
        :aria-labelledby="`new-modal-title-${modal.id}`"
        :data-modal-id="modal.id"
      >
        <!-- 기존과 동일한 배경 클릭 영역 -->
        <div class="pop-bg-close" role="button" aria-label="팝업창 닫기" @click="handleOverlayClick(modal)" />

        <!-- 슬롯 내용 렌더링 -->
        <component v-if="modal.slotRenderer" :is="modal.slotRenderer()" @close="handleOverlayClick(modal)" />

        <!-- 슬롯이 없을 때 기본 내용 -->
        <div v-else class="default-modal-content">
          <h2>기본 모달</h2>
          <p>슬롯 내용이 없습니다.</p>
          <button @click="handleOverlayClick(modal)">닫기</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { NewModalInstance } from '@/types/newModal';

const { modals, hideModal } = useNewModalSystem();

// 컴포넌트 해제 시 안전성 보장
const { $cleanupNewModals } = useNuxtApp();

// 표시할 모달들 필터링
const visibleModals = computed(() => {
  const modalArray = unref(modals) as NewModalInstance[];
  return modalArray.filter((modal) => modal.visible);
});

// 배경 클릭 처리
const handleOverlayClick = (modal: NewModalInstance): void => {
  if (modal.closeOnOverlay) {
    hideModal(modal.id);
  }
};

// 포커스 관리
const setupModalFocus = (modalEl: HTMLElement): void => {
  nextTick(() => {
    // 포커스 가능한 요소들 찾기
    const focusableElements = modalEl.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    // 포커스 우선순위에 따라 포커스 설정
    const focusTarget =
      modalEl.querySelector<HTMLElement>('.pop-focus') ||
      modalEl.querySelector<HTMLElement>('.pop-head h1') ||
      modalEl.querySelector<HTMLElement>('.pop-head .pop-close') ||
      focusableElements[0] ||
      modalEl.querySelector<HTMLElement>('.pop-wrap');

    if (focusTarget) {
      try {
        focusTarget.focus();
      } catch (error) {
        console.warn('Error setting focus:', error);
      }
    }
  });
};

// 모달 엘리먼트 참조 관리
const modalRefs = ref<{ [key: string]: HTMLElement }>({});

const setModalRef = (id: string, el: HTMLElement | null): void => {
  if (el) {
    modalRefs.value[id] = el;
    // 모달이 열린 상태면 포커스 설정
    const modal = visibleModals.value.find((m: NewModalInstance) => m.id === id);
    if (modal?.open) {
      setupModalFocus(el);
    }
  } else {
    delete modalRefs.value[id];
  }
};

// 모달이 opened 상태가 되면 포커스 설정
watch(
  visibleModals,
  (newModals: NewModalInstance[]) => {
    newModals.forEach((modal: NewModalInstance) => {
      if (modal.open && modalRefs.value[modal.id]) {
        setupModalFocus(modalRefs.value[modal.id]);
      }
    });
  },
  { deep: true }
);

onUnmounted(() => {
  // 플러그인에서 제공하는 cleanup 함수 호출
  if ($cleanupNewModals) {
    $cleanupNewModals();
  }
});
</script>

<style scoped>
.default-modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
