import type { ModalOptions, LoadingInput } from '~/types/modal';
import type { InjectionKey } from 'vue';
import { useModal } from './useModal';
import { useLoading } from './useLoading';
import { useLike } from './useLike';
import { usePageLock } from './usePageLock';

export const useModalSystem = () => {
  const modal = useModal();
  const loading = useLoading();
  const like = useLike();
  const pageLock = usePageLock();

  // 모달과 페이지 잠금을 연동하는 로직
  const showModal = (options: ModalOptions) => {
    const promise = modal.addModal(options);
    
    // 첫 번째 모달이면 페이지 잠금
    if (modal.modals.value.length === 1 && document.querySelector('.lock') === null) {
      pageLock.lockPage();
    }
    
    return promise;
  };

  const openModal = (index: number, type?: string, addClass?: string[] | string) => {
    modal.openModal(index, type, addClass);
    
    // 첫 번째 모달이면 페이지 잠금
    if (index === 0 && document.querySelector('.lock') === null) {
      pageLock.lockPage();
    }
  };

  const closeModal = (index: number | string, payload?: any) => {
    const idx = Number(index);
    modal.closeModal(idx, payload);
    
    // 첫 번째 모달(마지막 모달)이면 페이지 잠금 해제
    if (idx === 0) {
      pageLock.unlockPage();
    }
  };

  // 로딩 관련 메서드
  const showLoading = (options: LoadingInput = true) => {
    loading.showLoading(options);
  };

  // 좋아요 관련 메서드
  const showLike = (likeType: string = 'heart') => {
    like.showLike(likeType);
  };

  return {
    // 상태
    modals: modal.modals,
    isClosing: modal.isClosing,
    isLoading: loading.isLoading,
    loadingShow: loading.loadingShow,
    loadingTxt: loading.loadingTxt,
    likes: like.likes,
    isLock: pageLock.isLock,
    lockTop: pageLock.lockTop,
    lockStyle: pageLock.lockStyle,
    
    // 메서드
    showModal,
    openModal,
    closeModal,
    showLoading,
    showLike,
    lockPage: pageLock.lockPage,
    unlockPage: pageLock.unlockPage,
    setModalContainerEl: modal.setModalContainerEl
  };
};

// 전역 상태 관리를 위한 키
export const ModalSystemKey: InjectionKey<ReturnType<typeof useModalSystem>> = Symbol('ModalSystem');
