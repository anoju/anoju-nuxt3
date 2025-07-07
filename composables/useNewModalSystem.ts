import type { NewModalInstance, NewModalState } from '@/types/newModal'

const MODAL_STATE_KEY = 'new-modal-system-state'

// useState를 사용한 전역 상태 관리 (SSR 호환)
const useModalSystemState = () => useState<NewModalState>(MODAL_STATE_KEY, () => ({
  modals: [],
  isPageLocked: false,
  highestZIndex: 9999
}))

// 페이지 잠금/해제 유틸리티
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

// ID 생성 유틸리티
const generateModalId = (): string => `new-modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const useNewModalSystem = () => {
  const state = useModalSystemState()

  // 모달 등록
  const registerModal = (modalData: Omit<NewModalInstance, 'id' | 'zIndex'>): string => {
    const id = generateModalId()
    const zIndex = state.value.highestZIndex + 1
    
    const modal: NewModalInstance = {
      id,
      zIndex,
      ...modalData
    }

    state.value.modals.push(modal)
    state.value.highestZIndex = zIndex

    return id
  }

  // 모달 해제
  const unregisterModal = (id: string): void => {
    const index = state.value.modals.findIndex(modal => modal.id === id)
    if (index > -1) {
      state.value.modals.splice(index, 1)
    }
  }

  // 모달 표시
  const showModal = (id: string): void => {
    const modal = state.value.modals.find(m => m.id === id)
    if (!modal) {
      return
    }

    // returnFocus 설정 (현재 포커스된 요소 저장)
    if (!modal.returnFocus && process.client) {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement && activeElement !== document.body) {
        modal.returnFocus = activeElement
      }
    }

    modal.visible = true

    // 첫 번째 모달이면 페이지 잠금
    const visibleModals = state.value.modals.filter(m => m.visible)
    if (visibleModals.length === 1) {
      state.value.isPageLocked = true
      lockPage()
    }

    // 애니메이션을 위한 단계별 상태 변경
    nextTick(() => {
      modal.show = true
      
      setTimeout(() => {
        modal.open = true
      }, 1)
    })
  }

  // 모달 숨기기
  const hideModal = (id: string): void => {
    const modal = state.value.modals.find(m => m.id === id)
    if (!modal) return

    modal.open = false

    setTimeout(() => {
      modal.show = false
      
      setTimeout(() => {
        modal.visible = false

        // 모든 모달이 닫혔으면 페이지 잠금 해제
        const visibleModals = state.value.modals.filter(m => m.visible)
        if (visibleModals.length === 0) {
          state.value.isPageLocked = false
          unlockPage()
        }

        // 포커스 복원
        if (modal.returnFocus && process.client) {
          modal.returnFocus.focus()
        }
      }, 100)
    }, 400) // 애니메이션 시간에 맞춤
  }

  // 특정 모달 찾기
  const findModal = (id: string): NewModalInstance | undefined => {
    return state.value.modals.find(m => m.id === id)
  }

  // 모달의 slot 내용 설정
  const setModalSlot = (id: string, slotRenderer: () => any): void => {
    const modal = findModal(id)
    if (modal) {
      modal.slotRenderer = slotRenderer
    }
  }

  // 모든 모달 닫기
  const closeAllModals = (): void => {
    state.value.modals.forEach(modal => {
      if (modal.visible) {
        hideModal(modal.id)
      }
    })
  }

  // ESC 키 처리
  const handleEscapeKey = (): void => {
    const visibleModals = state.value.modals.filter(m => m.visible)
    const topModal = visibleModals[visibleModals.length - 1]
    
    if (topModal && topModal.closeOnEscape) {
      hideModal(topModal.id)
    }
  }

  // 클라이언트에서만 키보드 이벤트 처리
  let keydownHandler: ((event: KeyboardEvent) => void) | null = null
  
  if (process.client) {
    keydownHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleEscapeKey()
      }
    }

    document.addEventListener('keydown', keydownHandler)
  }

  // 이벤트 리스너 정리 함수 (더 안전한 버전)
  const cleanup = (): void => {
    if (process.client && keydownHandler) {
      try {
        document.removeEventListener('keydown', keydownHandler)
      } catch (error) {
        // 이미 제거되었거나 오류 발생 시 무시
        console.warn('Error removing keydown listener:', error)
      } finally {
        keydownHandler = null
      }
    }
    
    // 모든 모달 닫기
    closeAllModals()
  }

  return {
    // 상태
    modals: computed(() => state.value.modals),
    isPageLocked: computed(() => state.value.isPageLocked),

    // 메서드
    registerModal,
    unregisterModal,
    showModal,
    hideModal,
    findModal,
    setModalSlot,
    closeAllModals,
    handleEscapeKey,
    cleanup
  }
}
