<script lang="ts" setup>
// 새로운 모달 시스템 사용
const { open, showLoading, hideLoading, showLike } = useNewModal()

// 또는 플러그인을 통해 사용
const { $newModal, $newLoading, $newLike } = useNuxtApp()

const pageTitle = 'Guide - New Popup System'
useHead({
  title: pageTitle
})
const emit = defineEmits(['page-title'])
emit('page-title', pageTitle)

// 동적 import를 사용한 모달 열기
const openFullPopup = async () => {
  try {
    const result = await open(
      () => import('./newPopup/newFullPopup.vue'),
      { title: '새로운 풀팝업입니다.' },
      { type: 'full', key: 'full-popup' }
    )
    console.log('팝업 결과:', result)
  } catch (error) {
    console.error('팝업 에러:', error)
  }
}

// 일반적인 모달 열기
const openModalPopup = async () => {
  const { default: ModalComponent } = await import('./newPopup/newModalPopup.vue')
  
  const result = await open(
    ModalComponent,
    { number: 123456789 },
    { 
      type: 'modal',
      closeOnOverlay: true,
      closeOnEscape: true
    }
  )
  console.log('모달 결과:', result)
}

// 바텀시트 열기
const openBottomPopup = async () => {
  const { default: BottomComponent } = await import('./newPopup/newBottomPopup.vue')
  
  await open(
    BottomComponent,
    { msg: '새로운 바텀팝업' },
    { 
      type: 'bottom',
      class: 'custom-bottom'
    }
  )
}

// 타입 안전한 모달 오프너 생성
const openTypedModal = createModalOpener<{ title: string }, { action: string }>(
  () => import('./newPopup/newModalPopup.vue'),
  { type: 'modal', closeOnOverlay: false }
)

// 타입 안전한 모달 사용
const openTypedPopup = async () => {
  try {
    const result = await openTypedModal(
      { title: '타입 안전한 모달' },
      { class: 'typed-modal' }
    )
    console.log('액션:', result.action) // 타입 안전!
  } catch (error) {
    console.log('모달이 취소되었습니다.')
  }
}

// 로딩 관련
let loadingCount = 0
const toggleLoading = () => {
  loadingCount++
  if (loadingCount % 3 === 1) {
    showLoading(true) // 기본 로딩
  } else if (loadingCount % 3 === 2) {
    showLoading('로딩중입니다...') // 텍스트와 함께
  } else {
    hideLoading() // 로딩 닫기
  }
}

// 좋아요 애니메이션
const triggerLike = () => {
  showLike({ type: 'heart', duration: 2500 })
}

// 플러그인을 통한 사용 예시
const openWithPlugin = async () => {
  await $newModal(
    () => import('./newPopup/newModalPopup.vue'),
    { number: 999 },
    { type: 'modal' }
  )
}

const loadingWithPlugin = () => {
  $newLoading('플러그인 로딩...')
  setTimeout(() => {
    $newLoading(false)
  }, 2000)
}

const likeWithPlugin = () => {
  $newLike('heart')
}

// 코드 예시들
const basicUsageCode = `// 기본 사용법
const { open, showLoading, showLike } = useNewModal()

// 모달 열기
const result = await open(
  MyComponent,
  { title: 'Hello' },
  { type: 'modal', closeOnOverlay: true }
)

// 동적 import
const result = await open(
  () => import('./MyModal.vue'),
  { data: 'test' },
  { type: 'full' }
)`

const typeSafeCode = `// 타입 안전한 모달
const openMyModal = createModalOpener<
  { title: string }, // Props 타입
  { action: string } // 반환값 타입
>(
  () => import('./MyModal.vue'),
  { type: 'modal' } // 기본 옵션
)

const result = await openMyModal(
  { title: 'Test' }, // 타입 체크됨
  { closeOnEscape: false }
)
console.log(result.action) // 타입 안전!`

const loadingCode = `// 로딩
showLoading(true) // 기본
showLoading('로딩중...') // 텍스트
showLoading({ text: '데이터 로딩중', type: 'spinner' })
hideLoading() // 닫기`

const pluginCode = `// 플러그인 사용
const { $newModal, $newLoading, $newLike } = useNuxtApp()

await $newModal(MyComponent, props, options)
$newLoading('로딩중...')
$newLike('heart')`
</script>

<template>
  <uiInner>
    <h1 class="gd__h1">새로운 팝업 시스템</h1>
    
    <div class="feature-highlight">
      <h2>✨ 주요 개선사항</h2>
      <ul>
        <li><strong>타입 안전성:</strong> TypeScript 완전 지원</li>
        <li><strong>동적 Import:</strong> 코드 스플리팅 지원</li>
        <li><strong>useState 기반:</strong> SSR 호환 전역 상태</li>
        <li><strong>Promise 기반 API:</strong> async/await 지원</li>
        <li><strong>향상된 접근성:</strong> 키보드 네비게이션, ARIA</li>
        <li><strong>더 나은 성능:</strong> Teleport, Transition 최적화</li>
      </ul>
    </div>

    <h2 class="gd__h2">기본 사용법</h2>
    <div class="flex full">
      <uiButton line @click="openFullPopup">풀팝업 (동적 Import)</uiButton>
      <uiButton line @click="openModalPopup">모달팝업</uiButton>
      <uiButton line @click="openBottomPopup">바텀시트</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="basicUsageCode"></uiCodeHighlight>

    <h2 class="gd__h2">타입 안전한 모달</h2>
    <div class="flex full">
      <uiButton line @click="openTypedPopup">타입 안전 모달</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="typeSafeCode"></uiCodeHighlight>

    <h2 class="gd__h2">로딩</h2>
    <div class="flex full">
      <uiButton line @click="toggleLoading">로딩 토글</uiButton>
      <uiButton line @click="loadingWithPlugin">플러그인 로딩</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="loadingCode"></uiCodeHighlight>

    <h2 class="gd__h2">기타</h2>
    <div class="flex full">
      <uiButton line @click="triggerLike">좋아요</uiButton>
      <uiButton line @click="likeWithPlugin">플러그인 좋아요</uiButton>
      <uiButton line @click="openWithPlugin">플러그인 모달</uiButton>
    </div>
    <uiCodeHighlight lang="typescript" :code="pluginCode"></uiCodeHighlight>

    <h2 class="gd__h2">API 비교</h2>
    <div class="api-comparison">
      <div class="old-api">
        <h3>기존 API</h3>
        <pre><code>// 기존 방식
useNuxtApp().$modal({
  component: MyComponent,
  componentProps: { title: 'Hello' }
}).then(result => {
  console.log(result)
})</code></pre>
      </div>
      
      <div class="new-api">
        <h3>새로운 API</h3>
        <pre><code>// 새로운 방식
const { open } = useNewModal()
const result = await open(
  MyComponent,
  { title: 'Hello' },
  { type: 'modal' }
)
console.log(result)</code></pre>
      </div>
    </div>
  </uiInner>
</template>

<style scoped>
.feature-highlight {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.feature-highlight h2 {
  margin-top: 0;
  color: #2563eb;
}

.feature-highlight ul {
  margin: 0;
  padding-left: 20px;
}

.feature-highlight li {
  margin: 8px 0;
}

.api-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.old-api,
.new-api {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.old-api h3 {
  color: #dc2626;
  margin-top: 0;
}

.new-api h3 {
  color: #059669;
  margin-top: 0;
}

.old-api pre,
.new-api pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  margin: 10px 0 0 0;
}

@media (max-width: 768px) {
  .api-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
