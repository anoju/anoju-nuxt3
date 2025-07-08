<template>
  <ClientOnly>
    <!-- 실제 모달 내용은 NewModalContainer에서 렌더링되므로 빈 템플릿 -->
    <template #fallback>
      <!-- SSR에서는 아무것도 렌더링하지 않음 -->
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import NewModalContent from '~/components/newModalContainer/NewModalContent.vue';

interface Props {
  modelValue: boolean;
  // uiPop과 동일한 props 추가
  title?: string;
  titleClass?: string;
  noHead?: boolean;
  noClose?: boolean;
  // 타입 지정 방식 (uiPop과 동일)
  full?: boolean;
  modal?: boolean;
  bottom?: boolean;
  type?: 'modal' | 'full' | 'bottom';
  // 새로운 모달 시스템 전용 props
  addClass?: string;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

interface Emits {
  'update:modelValue': [value: boolean];
  open: [];
  close: [];
  opened: [];
  closed: [];
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
});

const emit = defineEmits<Emits>();

const { registerModal, unregisterModal, showModal, hideModal, findModal, setModalSlot } = useNewModalSystem();

// 상태 관리
const modalId = ref<string | null>(null);
const isInitialized = ref(false);
const modalContentRef = ref<InstanceType<typeof NewModalContent>>();

// 애니메이션 완료 시간 상수
const ANIMATION_DURATION = 500;

// uiPop과 동일한 타입 계산 로직
const typeAry = ['full', 'bottom', 'modal'] as const;
const matchingType = computed(() => typeAry.find((type) => props[type]));
const modalType = computed(() => {
  if (props.type && typeAry.includes(props.type)) {
    return props.type;
  } else if (matchingType.value) {
    return matchingType.value;
  }
  return 'modal';
});

// 현재 모달 상태
const currentModal = computed(() => {
  return modalId.value ? findModal(modalId.value) : null;
});

// 슬롯 가져오기
const slots = useSlots();

// v-model 업데이트
const updateModelValue = (value: boolean): void => {
  emit('update:modelValue', value);
};

// 팝업 닫기 함수
const handleModalClose = (): void => {
  updateModelValue(false);
};

// 모달 컨텐츠 생성 함수 (템플릿 기반 컴포넌트 사용)
const createModalContent = () => {
  return defineComponent({
    name: 'ModalContentWrapper',
    setup() {
      return () => {
        return h(NewModalContent, {
          title: props.title,
          titleClass: props.titleClass,
          noHead: props.noHead,
          noClose: props.noClose,
          ref: modalContentRef,
          onClose: handleModalClose
        }, {
          default: () => slots.default?.(),
          title: () => slots.title?.(),
          'title-prev': () => slots['title-prev']?.(),
          'title-next': () => slots['title-next']?.(),
          head: () => slots.head?.(),
          foot: () => slots.foot?.()
        });
      };
    }
  });
};

// 모달 초기화
const initializeModal = (): string => {
  if (modalId.value) {
    return modalId.value;
  }

  const id = registerModal({
    type: modalType.value,
    visible: false,
    show: false,
    open: false,
    addClass: props.addClass,
    closeOnOverlay: props.closeOnOverlay,
    closeOnEscape: props.closeOnEscape
  });

  // 모달 등록 직후에 슬롯 설정
  const ModalContent = createModalContent();
  setModalSlot(id, () => h(ModalContent));

  modalId.value = id;
  isInitialized.value = true;
  
  return id;
};

// 모달 열기
const openModal = (): void => {
  const id = initializeModal();
  
  showModal(id);
  emit('open');

  // 타이틀 포커스 설정은 NewModalContainer에서 자동으로 처리됨

  // opened 이벤트는 애니메이션 완료 후 발생
  setTimeout(() => {
    emit('opened');
  }, ANIMATION_DURATION);
};

// 모달 닫기
const closeModal = (): void => {
  if (!modalId.value) return;

  hideModal(modalId.value);
  updateModelValue(false);
  emit('close');

  // closed 이벤트는 애니메이션 완료 후 발생
  setTimeout(() => {
    emit('closed');
  }, ANIMATION_DURATION);
};

// 클라이언트에서만 v-model 변화 감지
onMounted(() => {
  watch(
    () => props.modelValue,
    (newValue: boolean) => {
      if (newValue) {
        openModal();
      } else {
        closeModal();
      }
    },
    { immediate: true }
  );
});

// 컴포넌트 해제 시 모달 정리
onUnmounted(() => {
  if (modalId.value) {
    unregisterModal(modalId.value);
  }
});

// 외부에서 접근 가능한 메서드들
defineExpose({
  open: openModal,
  close: closeModal,
  modalId: readonly(modalId),
  isVisible: computed(() => currentModal.value?.visible || false),
  isOpen: computed(() => currentModal.value?.open || false),
  isInitialized: readonly(isInitialized)
});
</script>
