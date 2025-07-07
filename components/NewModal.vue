<script lang="ts" setup>
import type { NewModalSystemOptions } from '@/types/newModal'

interface Props {
  modelValue: boolean
  // uiPop과 동일한 props 추가
  title?: string
  titleClass?: string
  noHead?: boolean
  noClose?: boolean
  // 타입 지정 방식 (uiPop과 동일)
  full?: boolean
  modal?: boolean
  bottom?: boolean
  type?: 'modal' | 'full' | 'bottom'
  // 새로운 모달 시스템 전용 props
  addClass?: string
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

interface Emits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  titleClass: '',
  noHead: false,
  noClose: false,
  full: false,
  modal: false,
  bottom: false,
  type: undefined,
  addClass: '',
  closeOnOverlay: true,
  closeOnEscape: true
})

const emit = defineEmits<Emits>()

const { registerModal, unregisterModal, showModal, hideModal, findModal, setModalSlot } = useNewModalSystem()

let modalId: string | null = null

// uiPop과 동일한 타입 계산 로직
const typeAry = ['full', 'bottom', 'modal'] as const
const matchingType = computed(() => typeAry.find((type) => props[type]))
const modalType = computed(() => {
  if (props.type && typeAry.includes(props.type)) {
    return props.type
  } else if (matchingType.value) {
    return matchingType.value
  }
  return 'modal'
})

// v-model 업데이트
const updateModelValue = (value: boolean): void => {
  emit('update:modelValue', value)
}

// 슬롯 가져오기
const slots = useSlots()

// NewModal의 내용을 uiPop 구조로 렌더링하는 컴포넌트
const createModalContent = () => {
  return defineComponent({
    name: 'NewModalContent',
    setup() {
      // 팝업 닫기 함수
      const popClose = (): void => {
        updateModelValue(false)
      }

      return () => {
        return h('article', { class: 'pop-wrap' }, [
          // pop-head
          !props.noHead && h('div', { 
            class: ['pop-head', { 
              no_title: (!props.title || props.title === '') && !slots.title 
            }, props.titleClass]
          }, [
            h('div', [
              // title-prev slot
              slots['title-prev']?.(),
              
              // h1 title
              (props.title || slots.title) && h('h1', { 
                ref: 'title', 
                tabindex: '-1' 
              }, [
                props.title,
                slots.title?.()
              ]),
              
              // title-next slot
              slots['title-next']?.(),
              
              // close button
              !props.noClose && h('button', {
                class: 'pop-close',
                'aria-label': '팝업창 닫기',
                onClick: popClose
              }, '팝업창 닫기')
            ])
          ]),
          
          // head slot
          slots.head?.(),
          
          // pop-body
          h('div', { class: 'pop-body' }, [
            slots.default?.()
          ]),
          
          // pop-foot
          slots.foot && h('div', { class: 'pop-foot' }, [
            h('div', [
              slots.foot?.()
            ])
          ])
        ])
      }
    }
  })
}

// 모달 열기
const openModal = (): void => {
  if (!modalId) {
    modalId = registerModal({
      type: modalType.value,
      visible: false,
      show: false,
      open: false,
      addClass: props.addClass,
      closeOnOverlay: props.closeOnOverlay,
      closeOnEscape: props.closeOnEscape
    })
    
    // 모달 등록 직후에 슬롯 설정
    const ModalContent = createModalContent()
    setModalSlot(modalId, () => {
      return h(ModalContent)
    })
  }

  showModal(modalId)
  emit('open')

  // opened 이벤트는 애니메이션 완료 후 발생
  setTimeout(() => {
    emit('opened')
  }, 500)
}

// 모달 닫기
const closeModal = (): void => {
  if (modalId) {
    hideModal(modalId)
    updateModelValue(false)
    emit('close')

    // closed 이벤트는 애니메이션 완료 후 발생
    setTimeout(() => {
      emit('closed')
    }, 500)
  }
}

// v-model 변화 감지
watch(
  () => props.modelValue,
  (newValue: boolean) => {
    if (newValue) {
      openModal()
    } else {
      closeModal()
    }
  },
  { immediate: true }
)

// 컴포넌트 해제 시 모달 정리
onUnmounted(() => {
  if (modalId) {
    unregisterModal(modalId)
  }
})

// 현재 모달 상태
const currentModal = computed(() => {
  return modalId ? findModal(modalId) : null
})

// 외부에서 접근 가능한 메서드들
defineExpose({
  open: openModal,
  close: closeModal,
  modalId: computed(() => modalId),
  isVisible: computed(() => currentModal.value?.visible || false),
  isOpen: computed(() => currentModal.value?.open || false)
})
</script>

<template>
  <!-- Vue UI 라이브러리처럼 컴포넌트 기반 사용 -->
  <template />
</template>
