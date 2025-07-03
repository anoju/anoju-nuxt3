<script lang="ts" setup>
const props = defineProps<{
  number?: number
  title?: string
  modalId?: string
}>()

const emit = defineEmits<{
  close: [result?: { action: string; value?: any }]
  mounted: [el: HTMLElement]
}>()

const popWrapRef = ref<HTMLElement>()

const popClose = (action: string, value?: any) => {
  emit('close', { action, value })
}

// 컴포넌트가 마운트되면 부모에게 알림
onMounted(() => {
  if (popWrapRef.value) {
    emit('mounted', popWrapRef.value)
  }
})
</script>

<template>
  <uiPop modal title="새로운 모달 팝업" ref="popWrapRef">
    <uiInner>
      <h1 v-if="title" class="tit-h1 pop-focus" tabindex="-1">{{ title }}</h1>
      <h1 v-else-if="number" class="tit-h1 pop-focus" tabindex="-1">번호: {{ number }}</h1>
      <h1 v-else class="tit-h1 pop-focus" tabindex="-1">새로운 모달</h1>
      
      <p>이것은 새로운 모달 시스템으로 만든 모달팝업입니다.</p>
      
      <div class="demo-features">
        <h3>새로운 기능들:</h3>
        <ul>
          <li>✅ TypeScript 타입 안전성</li>
          <li>✅ Promise 기반 API</li>
          <li>✅ 동적 import 지원</li>
          <li>✅ useState 기반 상태 관리</li>
          <li>✅ 향상된 접근성</li>
        </ul>
      </div>
      
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
    </uiInner>
    <template #foot>
      <div class="flex full">
        <uiButton line @click="popClose('cancel')">취소</uiButton>
        <uiButton primary h60 @click="popClose('confirm', { timestamp: Date.now() })">
          확인
        </uiButton>
      </div>
    </template>
  </uiPop>
</template>

<style scoped>
.demo-features {
  background: #f0f9ff;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px solid #0ea5e9;
}

.demo-features h3 {
  margin: 0 0 12px 0;
  color: #0c4a6e;
}

.demo-features ul {
  margin: 0;
  padding-left: 20px;
}

.demo-features li {
  margin: 4px 0;
  color: #075985;
}
</style>
