export interface NewModalInstance {
  id: string;
  type: 'modal' | 'full' | 'bottom';
  visible: boolean;
  show: boolean;
  open: boolean;
  addClass?: string;
  closeOnOverlay: boolean;
  closeOnEscape: boolean;
  returnFocus?: HTMLElement | null;
  zIndex?: number;
  // slot 내용을 렌더링하는 함수
  slotRenderer?: () => any;
}

export interface NewModalState {
  modals: NewModalInstance[];
  isPageLocked: boolean;
  highestZIndex: number;
}

export interface NewModalSystemOptions {
  type?: 'modal' | 'full' | 'bottom';
  addClass?: string;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  appendTo?: string | HTMLElement;
}
