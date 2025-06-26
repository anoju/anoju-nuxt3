export interface ModalObj {
  component: Component;
  componentProps?: Record<string, any>;
  componentID?: string;
  modalProps?: Record<string, any>;
  resolve?: (value: unknown) => void;
  show: boolean;
  open: boolean;
  type: any;
  addClass: any;
  returnFocus?: HTMLElement | null;
}

export interface ModalOptions {
  component: Component | (() => Promise<Component>);
  componentProps?: Record<string, any>;
  modalProps?: Record<string, any>;
  returnFocus?: HTMLElement | null;
}

export interface LikeObj {
  idx: number;
  type: string;
  show: boolean;
  visible: boolean;
}

export interface LoadingOptions {
  txt?: string;
  type?: string;
}

export type LoadingInput = LoadingOptions | string | boolean;
