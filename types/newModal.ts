import type { Component } from 'vue'

export interface NewModalInstance {
  id: string
  component: Component
  props?: Record<string, any>
  options?: NewModalOptions
  resolve?: (value: any) => void
  reject?: (reason?: any) => void
  state: 'opening' | 'opened' | 'closing' | 'closed'
  returnFocus?: HTMLElement | null
}

export interface NewModalOptions {
  /** 모달 타입 */
  type?: 'modal' | 'full' | 'bottom' | 'custom'
  /** 추가 CSS 클래스 */
  class?: string | string[]
  /** 배경 클릭으로 닫기 여부 */
  closeOnOverlay?: boolean
  /** ESC 키로 닫기 여부 */
  closeOnEscape?: boolean
  /** 중복 방지 키 */
  key?: string
  /** 포커스 반환 요소 */
  returnFocus?: HTMLElement | null
  /** 애니메이션 지속시간 (ms) */
  duration?: number
}

export interface NewLoadingOptions {
  text?: string
  type?: 'spinner' | 'lottie'
  duration?: number
}

export type NewLoadingInput = NewLoadingOptions | string | boolean

export interface NewLikeOptions {
  type?: 'heart' | 'star' | 'thumbs' | string
  duration?: number
}

export interface NewModalState {
  modals: NewModalInstance[]
  loading: {
    visible: boolean
    text?: string
    type: 'spinner' | 'lottie'
  }
  likes: Array<{
    id: string
    type: string
    visible: boolean
  }>
  isPageLocked: boolean
}
