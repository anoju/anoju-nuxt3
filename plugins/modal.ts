import type { ModalOptions, LoadingInput } from '~/types/modal';
import { ModalSystemKey } from '~/composables/useModalSystem';

export default defineNuxtPlugin((nuxtApp) => {
  // 모달 시스템 인스턴스 생성
  const modalSystem = useModalSystem();

  // provide로 전역 상태 제공
  nuxtApp.vueApp.provide(ModalSystemKey, modalSystem);

  // 기존 API 호환성을 위한 메서드들
  nuxtApp.provide('modal', (options: ModalOptions) => {
    return modalSystem.showModal(options);
  });

  nuxtApp.provide('like', (likeType: string = 'heart') => {
    modalSystem.showLike(likeType);
  });

  nuxtApp.provide('loading', (options: LoadingInput = true) => {
    modalSystem.showLoading(options);
  });
});
