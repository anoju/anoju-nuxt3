import type { Component, AsyncComponentLoader } from 'vue'
import type { 
  NewModalInstance, 
  NewModalOptions, 
  NewLoadingInput, 
  NewLikeOptions, 
  NewModalState 
} from '@/types/newModal'

const MODAL_STATE_KEY = 'new-modal-state'

// 전역 상태 - useState를 사용하여 SSR 호환
const useModalState = () => useState<NewModalState>(MODAL_STATE_KEY, () => ({
  modals: [],
  loading: {
    visible: false,
    type: 'lottie'
  },
  likes: [],
  isPageLocked: false
}))

// 유틸리티 함수들
const generateId = (): string => `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

const lockPage = (): void => {
  if (process.client) {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.classList.add('lock')
  }
}

const unlockPage = (): void => {
  if (process.client) {
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.classList.remove('lock')
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }
}

export const useNewModal = () => {
  const state = useModalState()

  // 모달 열기
  const open = async <T = any>(
    component: Component | AsyncComponentLoader,
    props: Record<string, any> = {},
    options: NewModalOptions = {}
  ): Promise<T> => {
    const {
      type = 'modal',
      class: className = '',
      closeOnOverlay = true,
      closeOnEscape = true,
      key,
      returnFocus,
      duration = 300
    } = options

    // 중복 방지
    if (key && state.value.modals.some((modal: NewModalInstance) => modal.options?.key === key)) {
      return Promise.reject(new Error('Modal with this key is already open'))
    }

    // 컴포넌트 로드 (동적 import 지원)
    const resolvedComponent = typeof component === 'function' 
      ? await (component as AsyncComponentLoader)()
      : component

    return new Promise<T>((resolve, reject) => {
      const modal: NewModalInstance = {
        id: generateId(),
        component: markRaw(resolvedComponent),
        props,
        options: {
          type,
          class: className,
          closeOnOverlay,
          closeOnEscape,
          key,
          returnFocus: returnFocus || (process.client ? document.activeElement as HTMLElement : null),
          duration
        },
        resolve,
        reject,
        state: 'opening'
      }

      state.value.modals.push(modal)

      // 첫 번째 모달이면 페이지 잠금
      if (state.value.modals.length === 1) {
        state.value.isPageLocked = true
        lockPage()
      }

      // 애니메이션을 위한 상태 변경
      nextTick(() => {
        modal.state = 'opened'
      })
    })
  }

  // 모달 닫기
  const close = (modalId?: string, result?: any): void => {
    if (!modalId && state.value.modals.length === 0) return

    const modal = modalId 
      ? state.value.modals.find((m: NewModalInstance) => m.id === modalId)
      : state.value.modals[state.value.modals.length - 1] // 가장 최근 모달

    if (!modal) return

    modal.state = 'closing'
    
    // resolve 호출
    if (modal.resolve) {
      modal.resolve(result)
    }

    // 애니메이션 후 제거
    setTimeout(() => {
      const index = state.value.modals.findIndex((m: NewModalInstance) => m.id === modal.id)
      if (index > -1) {
        state.value.modals.splice(index, 1)
      }

      // 모든 모달이 닫혔으면 페이지 잠금 해제
      if (state.value.modals.length === 0) {
        state.value.isPageLocked = false
        unlockPage()
      }

      // 포커스 복원
      if (modal.options?.returnFocus && process.client) {
        modal.options.returnFocus.focus()
      }
    }, modal.options?.duration || 300)
  }

  // 모든 모달 닫기
  const closeAll = (): void => {
    state.value.modals.forEach((modal: NewModalInstance) => {
      if (modal.resolve) {
        modal.resolve(null)
      }
    })
    state.value.modals = []
    state.value.isPageLocked = false
    unlockPage()
  }

  // 로딩
  const showLoading = (input: NewLoadingInput = true): void => {
    if (typeof input === 'boolean') {
      state.value.loading.visible = input
      if (!input) {
        state.value.loading.text = undefined
      }
    } else if (typeof input === 'string') {
      state.value.loading.visible = true
      state.value.loading.text = input
    } else {
      state.value.loading.visible = true
      state.value.loading.text = input.text
      state.value.loading.type = input.type || 'lottie'
    }
  }

  const hideLoading = (): void => {
    state.value.loading.visible = false
    state.value.loading.text = undefined
  }

  // 좋아요 애니메이션
  const showLike = (options: NewLikeOptions | string = {}): void => {
    const config: NewLikeOptions = typeof options === 'string' 
      ? { type: options } 
      : options

    const like = {
      id: generateId(),
      type: config.type || 'heart',
      visible: true
    }

    state.value.likes.push(like)

    // 자동 제거
    setTimeout(() => {
      like.visible = false
      setTimeout(() => {
        const index = state.value.likes.findIndex((l: { id: string }) => l.id === like.id)
        if (index > -1) {
          state.value.likes.splice(index, 1)
        }
      }, 300)
    }, config.duration || 2000)
  }

  // 키보드 이벤트 처리
  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && state.value.modals.length > 0) {
      const lastModal = state.value.modals[state.value.modals.length - 1]
      if (lastModal?.options?.closeOnEscape) {
        close(lastModal.id)
      }
    }
  }

  // 클라이언트 사이드에서만 키보드 이벤트 등록
  if (process.client) {
    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })
  }

  return {
    // 상태 (readonly)
    modals: readonly(computed(() => state.value.modals)),
    loading: readonly(computed(() => state.value.loading)),
    likes: readonly(computed(() => state.value.likes)),
    isPageLocked: readonly(computed(() => state.value.isPageLocked)),

    // 메서드
    open,
    close,
    closeAll,
    showLoading,
    hideLoading,
    showLike
  }
}

// 타입 안전한 모달 오프너 팩토리
export const createModalOpener = <P extends Record<string, any> = {}, R = any>(
  component: Component | AsyncComponentLoader,
  defaultOptions: NewModalOptions = {}
) => {
  const { open } = useNewModal()
  
  return (props: P = {} as P, options: NewModalOptions = {}): Promise<R> => {
    return open<R>(component, props, { ...defaultOptions, ...options })
  }
}
