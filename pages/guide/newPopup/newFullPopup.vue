<script lang="ts" setup>
const props = defineProps<{
  title?: string
  modalId?: string
}>()

const emit = defineEmits<{
  close: [result?: any]
  mounted: [el: HTMLElement]
}>()

const { open } = useNewModal()
const popWrapRef = ref<HTMLElement>()

const popClose = (result?: any) => {
  emit('close', result)
}

const openModalPopup = async () => {
  await open(
    () => import('./newModalPopup.vue'),
    { number: 987654321 },
    { type: 'modal' }
  )
}

// 컴포넌트가 마운트되면 부모에게 알림
onMounted(() => {
  if (popWrapRef.value) {
    emit('mounted', popWrapRef.value)
  }
})
</script>

<template>
  <uiPop full title="새로운 풀팝업" ref="popWrapRef">
    <uiInner>
      <h1 v-if="title" class="tit-h1 pop-focus" tabindex="-1">{{ title }}</h1>
      <p>이것은 새로운 모달 시스템으로 만든 풀팝업입니다.</p>
      <ul>
        <li>타입 안전성 지원</li>
        <li>동적 import 지원</li>
        <li>더 나은 성능</li>
        <li>향상된 접근성</li>
      </ul>
      
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
    </uiInner>
    <template #foot>
      <div class="flex full">
        <uiButton line @click="openModalPopup">모달팝업 열기</uiButton>
        <uiButton primary h60 @click="popClose({ action: 'confirmed', data: '성공!' })">
          확인
        </uiButton>
      </div>
    </template>
  </uiPop>
</template>
