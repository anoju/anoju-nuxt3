<script lang="ts" setup>
import type { NewModalInstance } from '@/types/newModal'

const { modals, loading, likes, close } = useNewModal()

// 오버레이 클릭 처리
const handleOverlayClick = (modal: NewModalInstance, index: number): void => {
  if (modal.options?.closeOnOverlay) {
    close(modal.id)
  }
}

// 포커스 관리
const setupFocus = (el: HTMLElement, modal: NewModalInstance): void => {
  nextTick(() => {
    // 포커스 가능한 요소 찾기
    const focusableElements = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const focusTarget = 
      el.querySelector('.pop-focus') as HTMLElement ||
      el.querySelector('.pop-head h1') as HTMLElement ||
      el.querySelector('.pop-head .pop-close') as HTMLElement ||
      focusableElements[0] as HTMLElement ||
      el.querySelector('.pop-wrap') as HTMLElement

    if (focusTarget) {
      focusTarget.focus()
    }
  })
}

// 모달이 mounted될 때 포커스 설정
const onModalMounted = (el: Element | null, modal: NewModalInstance): void => {
  if (el && modal.state === 'opened') {
    setupFocus(el as HTMLElement, modal)
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modals.length || likes.length || loading.visible" class="new-modal-container">
      <!-- 모달들 -->
      <TransitionGroup
        name="modal"
        tag="div"
        class="modals-wrapper"
      >
        <div
          v-for="(modal, index) in modals"
          :key="modal.id"
          class="popup"
          :class="[
            modal.options?.type,
            modal.options?.class,
            {
              show: modal.state === 'opened' || modal.state === 'closing',
              open: modal.state === 'opened'
            }
          ]"
          :aria-hidden="modal.state !== 'opened'"
          role="dialog"
          :aria-labelledby="`modal-title-${modal.id}`"
        >
          <!-- 배경 오버레이 -->
          <div
            class="pop-bg-close"
            role="button"
            :aria-label="modal.options?.closeOnOverlay ? '팝업창 닫기' : undefined"
            @click="handleOverlayClick(modal, index)"
          />
          
          <!-- 모달 컨텐츠 -->
          <component
            :is="modal.component"
            v-bind="modal.props"
            :modal-id="modal.id"
            :data-idx="index"
            @close="close(modal.id, $event?.payload || $event)"
            @mounted="onModalMounted($event, modal)"
          />
        </div>
      </TransitionGroup>

      <!-- 좋아요 애니메이션 -->
      <TransitionGroup
        name="like"
        tag="div"
        class="likes-wrapper"
      >
        <div
          v-for="like in likes"
          :key="like.id"
          class="layer-like"
          :class="{ show: like.visible }"
          aria-hidden="true"
        >
          <uiLottie 
            v-if="like.type === 'heart'" 
            path="/lottie/temp-love.json" 
            autoplay 
          />
          <!-- 다른 타입들도 추가 가능 -->
        </div>
      </TransitionGroup>

      <!-- 로딩 -->
      <Transition name="loading">
        <div
          v-if="loading.visible"
          class="loading-wrap"
          :class="{ show: loading.visible }"
          role="status"
          :aria-label="loading.text || '화면을 불러오는중입니다.'"
        >
          <div class="tl">
            <div>
              <div 
                class="loading-lottie" 
                role="img" 
                :aria-label="!loading.text ? '화면을 불러오는중입니다.' : ''"
              >
                <uiLottie 
                  v-if="loading.type === 'lottie'"
                  path="/lottie/loading.json" 
                  autoplay 
                  loop 
                  aria-hidden="true"
                />
                <div v-else class="spinner" aria-hidden="true" />
              </div>
              <div v-if="loading.text" class="txt">{{ loading.text }}</div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
/* 기본 컨테이너 스타일 */
.new-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.modals-wrapper,
.likes-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-bg-close {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

/* 트랜지션 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .pop-bg-close,
.modal-leave-to .pop-bg-close {
  background: rgba(0, 0, 0, 0);
}

.like-enter-active,
.like-leave-active {
  transition: all 0.3s ease;
}

.like-enter-from,
.like-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.loading-enter-active,
.loading-leave-active {
  transition: all 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

/* 로딩 기본 스타일 */
.loading-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.loading-wrap .tl {
  text-align: center;
  color: white;
}

.loading-lottie {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.txt {
  margin-top: 16px;
  font-size: 14px;
}

/* 좋아요 애니메이션 */
.layer-like {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 10000;
}
</style>
