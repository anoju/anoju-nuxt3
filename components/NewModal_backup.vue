<script lang="ts" setup>
import type { NewModalSystemOptions } from '@/types/newModal'

interface Props {
  modelValue: boolean
  type?: 'modal' | 'full' | 'bottom'
  addClass?: string
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  appendTo?: string | HTMLElement
}

interface Emits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
}

const props = withDefaults(defineProps<Props>(), {
  type: 'modal',
  addClass: '',
  closeOnOverlay: true,
  closeOnEscape: true,
  appendTo: 'body'
})

const emit = defineEmits<Emits>()

const { registerModal, unregisterModal, showModal, hideModal, findModal } = useNewModalSystem()

let modalId: string | null = null

// v-model 업데이트
const updateModelValue = (value: boolean): void => {
  emit('update:modelValue', value)
}

// 모달 열기
const openModal = (): void => {
  if (!modalId) {
    modalId = registerModal({
      type: props.type,
      visible: false,
      show: false,
      open: false,
      addClass: props.addClass,
      closeOnOverlay: props.closeOnOverlay,
      closeOnEscape: props.closeOnEscape
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

// 슬롯 내용을 전역으로 저장
const slotContent = ref<any>(null)

// 슬롯 렌더링 함수
const renderSlot = () => {
  return slotContent.value
}

// 현재 컴포넌트의 슬롯을 전역 저장소에 등록
const { setModalSlot } = useNewModalSystem()

watch(currentModal, (modal) => {
  if (modal?.visible && modalId) {
    // 슬롯 내용을 전역에 등록
    nextTick(() => {
      setModalSlot?.(modalId!, () => h('div', {}, [renderSlot()]))
    })
  }
}, { immediate: true })
</script>

<template>
  <div v-show="false">
    <!-- 슬롯 내용을 숨겨서 보관 -->
    <div ref="slotContent">
      <slot />
    </div>
  </div>
</template>
