import type { ModalOptions, LoadingInput } from '~/types/modal';
import type { InjectionKey } from 'vue';

export const useModalSystem = () => {
  const modal = useModal();
  const loading = useLoading();
  const like = useLike();
  const pageLock = usePageLock();

  // 모달 관련 메서드
  const showModal = (options: ModalOptions) => {
    return modal.addModal(options);
  };

  const openModal = (index: number, type?: string, addClass?: string[] | string) => {
    modal.openModal(index, type, addClass);
  };

  const closeModal = (index: number | string, payload?: any) => {
    modal.closeModal(index, payload);
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
    unlockPage: pageLock.unlockPage
  };
};

// 전역 상태 관리를 위한 키
export const ModalSystemKey: InjectionKey<ReturnType<typeof useModalSystem>> = Symbol('ModalSystem');
