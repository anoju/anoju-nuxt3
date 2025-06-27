import type { ModalObj, ModalOptions } from '~/types/modal';

export const useModal = () => {
  const modals = ref<ModalObj[]>([]);
  const isClosing = ref(false);
  const modalContainerEl = ref<HTMLElement | null>(null);

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

      // 모달이 추가되면 자동으로 열기 (기존 동작)
      nextTick(() => {
        openModal(modals.value.length - 1);
      });
    });
  };

  const openModal = (index: number, type?: string, addClass?: string[] | string): void => {
    if (isClosing.value) return;

    const modal = modals.value[index];
    if (!modal) return;

    // returnFocus가 null이면 현재 포커스된 요소를 저장
    if (!modal.returnFocus) {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement !== document.body) {
        modal.returnFocus = activeElement;
      }
    }

    // 타입과 추가 클래스 설정 (기존 로직 복원)
    if (type) modal.type = type;
    if (addClass) modal.addClass = addClass;

    // show 상태 설정 (기존 로직 복원)
    modal.show = true;

    // DOM 조작을 위해 nextTick 사용
    nextTick(() => {
      if (!modalContainerEl.value) return;

      const $popup = modalContainerEl.value.children[index] as HTMLElement;
      const $wrap = $popup?.querySelector('.pop-wrap') as HTMLElement;

      if (!$popup || !$wrap) return;

      // open 상태 설정 (기존 로직 복원 - opened 클래스를 위해)

      setTimeout(() => {
        modal.open = true;
        $popup.setAttribute('aria-hidden', 'false');
        if (index > 0) {
          ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'true');
        }
      }, 1);

      setTimeout(() => {
        const popHeadH1 = $wrap.querySelector('.pop-head h1') as HTMLElement;
        const popHeadClose = $wrap.querySelector('.pop-head .pop-close') as HTMLElement;
        const focusEl = $wrap.querySelector('.pop-focus') as HTMLElement;

        // 포커스 처리 (기존 로직 개선)
        if (focusEl) {
          focusEl.focus();
        } else if (popHeadH1 !== null) {
          popHeadH1.focus();
        } else if (popHeadClose !== null) {
          popHeadClose.focus();
        } else {
          $wrap.focus();
        }
      }, 501);
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

    // Promise resolve 처리 (기존 로직 복원)
    if (modal.resolve) {
      modal.resolve({ payload });
    }

    // open 상태 해제 (기존 로직 복원)
    modal.open = false;

    // DOM 조작
    if (modalContainerEl.value) {
      const $popup = modalContainerEl.value.children[idx] as HTMLElement;

      if ($popup && idx > 0) {
        ($popup.previousSibling as HTMLElement).setAttribute('aria-hidden', 'false');
      }
    }

    // returnFocus 처리를 위해 저장 (기존 로직 복원)
    const focusEl = modal.returnFocus;

    setTimeout(() => {
      // show 상태 해제 (기존 로직 복원)
      modal.show = false;

      // 모달 배열 정리 (기존 로직 복원)
      const showModals = modals.value.filter((obj) => obj.show);
      if (showModals.length === 0) {
        modals.value = [];
      }

      // 포커스 복원 처리 (기존 로직 복원)
      if (focusEl) {
        let finalFocusEl = focusEl;
        if (focusEl.closest('.button') !== null) {
          finalFocusEl = focusEl.closest('.button') as HTMLElement;
        }
        finalFocusEl.focus();
      }

      isClosing.value = false;
    }, 500);
  };

  // modalContainer의 el ref를 설정하는 함수
  const setModalContainerEl = (el: HTMLElement | null) => {
    modalContainerEl.value = el;
  };

  return {
    modals: readonly(modals),
    isClosing: readonly(isClosing),
    addModal,
    openModal,
    closeModal,
    setModalContainerEl
  };
};
