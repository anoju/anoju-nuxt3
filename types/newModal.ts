import type { Component, VNode } from 'vue';

export type ModalType = 'modal' | 'full' | 'bottom';

export interface NewModalInstance {
  id: string;
  type: ModalType;
  visible: boolean;
  show: boolean;
  open: boolean;
  addClass?: string;
  closeOnOverlay: boolean;
  closeOnEscape: boolean;
  returnFocus?: HTMLElement | null;
  zIndex: number;
  // slot 내용을 렌더링하는 함수
  slotRenderer?: () => VNode | Component;
}

export interface NewModalState {
  modals: NewModalInstance[];
  isPageLocked: boolean;
  highestZIndex: number;
}

export interface ModalRegistrationOptions {
  type: ModalType;
  visible: boolean;
  show: boolean;
  open: boolean;
  addClass?: string;
  closeOnOverlay: boolean;
  closeOnEscape: boolean;
}

export interface ModalSystemComposable {
  // 상태
  modals: ComputedRef<NewModalInstance[]>;
  isPageLocked: ComputedRef<boolean>;
  
  // 메서드
  registerModal: (modalData: ModalRegistrationOptions) => string;
  unregisterModal: (id: string) => void;
  showModal: (id: string) => void;
  hideModal: (id: string) => void;
  findModal: (id: string) => NewModalInstance | undefined;
  setModalSlot: (id: string, slotRenderer: () => VNode | Component) => void;
  closeAllModals: () => void;
  handleEscapeKey: () => void;
  cleanup: () => void;
}
