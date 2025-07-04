// global-function.ts와 modal.ts에서 제공하는 함수들의 타입 정의
import type { ModalOptions, LoadingInput } from './modal';

declare module '#app' {
  interface NuxtApp {
    $scrollTo: (el?: string | HTMLElement, option?: { left?: number; top?: number }, speed?: number, fn?: () => void) => void;
    $getStyle: (element: any, attr: string) => string | null;
    $getOffset: (element: HTMLElement) => { left: number; top: number };
    $getSiblings: (element: Element) => Array<Element>;
    $getParents: (elem: Element, selector?: string) => Element[];
    $getIndex: (elem: Element) => number | null;
    $slideDown: (elem: HTMLElement, speed?: number, fn?: () => void) => void;
    $slideUp: (elem: HTMLElement, speed?: number, fn?: () => void) => void;
    $getTopFixedHeight: (element: HTMLElement, className?: string) => number;
    $anime: any;
    $globalCounters: any;
    $modal: (options: ModalOptions) => Promise<any>;
    $like: (likeType?: string) => void;
    $loading: (options?: LoadingInput) => void;
  }
}

export {};
