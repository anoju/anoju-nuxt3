<script lang="ts" setup>
const props = defineProps<{
  msg?: string
  modalId?: string
}>()

const emit = defineEmits<{
  close: [result?: any]
  mounted: [el: HTMLElement]
}>()

const popWrapRef = ref<HTMLElement>()

const popClose = (result?: any) => {
  emit('close', result)
}

// 컴포넌트가 마운트되면 부모에게 알림
onMounted(() => {
  if (popWrapRef.value) {
    emit('mounted', popWrapRef.value)
  }
})
</script>

<template>
  <uiPop bottom title="새로운 바텀시트" ref="popWrapRef">
    <uiInner>
      <h1 class="tit-h1 pop-focus" tabindex="-1">바텀시트</h1>
      <p v-if="msg">{{ msg }}</p>
      <p>이것은 새로운 모달 시스템으로 만든 바텀시트입니다.</p>
      
      <div class="bottom-features">
        <h4>바텀시트 특징:</h4>
        <ul>
          <li>모바일 친화적 UX</li>
          <li>스와이프 제스처 지원 (향후)</li>
          <li>동적 높이 조절</li>
          <li>부드러운 애니메이션</li>
        </ul>
      </div>
      
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
    </uiInner>
    <template #foot>
      <div class="flex full">
        <uiButton primary h60 @click="popClose({ action: 'bottom-confirmed' })">
          확인
        </uiButton>
      </div>
    </template>
  </uiPop>
</template>

<style scoped>
.bottom-features {
  background: #fef3c7;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px solid #f59e0b;
}

.bottom-features h4 {
  margin: 0 0 12px 0;
  color: #92400e;
}

.bottom-features ul {
  margin: 0;
  padding-left: 20px;
}

.bottom-features li {
  margin: 4px 0;
  color: #b45309;
}
</style>
