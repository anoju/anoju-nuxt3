import type { ModalObj, ModalOptions } from '~/types/modal';

export const useModal = () => {
  const modals = ref<ModalObj[]>([]);
  const isClosing = ref(false);
  const { lockPage, unlockPage } = usePageLock();

  const isDuplicated = (componentID: string | undefined): boolean => {
    return componentID !== undefined && modals.value.length > 0 && modals.value.some((modal) => modal.componentID === componentID);
  };

  const addModal = async (options: ModalOptions): Promise<unknown> => {
    return new Promise((resolve) => {
      const { component, componentProps = {}, modalProps = {}, returnFocus = null } = options;
      const componentID = (component as any).__hmrId;

      // 이미 열린 팝업 처리
      if (isDuplicated(componentID)) {
        const modalObj = modals.value.find((modal) => modal.componentID === componentID);
        if (modalObj) {
          const index = modals.value.indexOf(modalObj);
          openModal(index);
        }
        return;
      }

      const modalObj: ModalObj = {
        component: markRaw(component),
        componentProps,
        componentID,
        modalProps,
        resolve,
        show: false,
        open: false,
        type: '',
        addClass: '',
        returnFocus
      };

      modals.value.push(modalObj);
    });
  };

  const openModal = (index: number, type?: string, addClass?: string[] | string): void => {
    if (isClosing.value) return;

    const modal = modals.value[index];
    if (!modal) return;

    if (type) modal.type = type;
    if (addClass) modal.addClass = addClass;

    // 첫 번째 모달이면 페이지 잠금
    if (index === 0 && document.querySelector('.lock') === null) {
      lockPage();
    }

    modal.show = true;

    nextTick(() => {
      modal.open = true;
      // 접근성 처리는 컴포넌트에서 직접 처리하도록 수정 필요
    });
  };

  const closeModal = (index: number | string, payload?: any): void => {
    isClosing.value = true;
    const idx = Number(index);
    const modal = modals.value[idx];

    if (!modal) {
      isClosing.value = false;
      return;
    }

    if (modal.resolve) {
      modal.resolve({ payload });
    }

    modal.open = false;

    // 첫 번째 모달이면 페이지 잠금 해제
    if (idx === 0) {
      unlockPage();
    }

    const focusEl = modal.returnFocus;

    setTimeout(() => {
      modal.show = false;
      const showModals = modals.value.filter((obj) => obj.show);
      if (showModals.length === 0) {
        modals.value = [];
      }

      if (focusEl) {
        const finalFocusEl = focusEl.closest('.button') || focusEl;
        (finalFocusEl as HTMLElement).focus();
      }

      isClosing.value = false;
    }, 500);
  };

  return {
    modals: readonly(modals),
    isClosing: readonly(isClosing),
    addModal,
    openModal,
    closeModal
  };
};
