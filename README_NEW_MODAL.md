# 새로운 모달 시스템 (New Modal System)

기존 모달 시스템을 개선한 최신 Nuxt3/Vue3 기능을 활용한 효율적인 모달 시스템입니다.

## 🚀 주요 개선사항

### 기존 대비 장점
- **타입 안전성**: 완전한 TypeScript 지원
- **동적 Import**: 코드 스플리팅으로 성능 향상
- **useState 기반**: SSR 호환 전역 상태 관리
- **Promise API**: async/await 지원으로 더 직관적인 사용
- **향상된 접근성**: ARIA, 키보드 네비게이션 개선
- **더 나은 성능**: Teleport, Transition 최적화
- **간단한 구조**: Provide/Inject 없이 간결한 API

## 📁 파일 구조

```
types/
  └── newModal.ts                 # 타입 정의

composables/
  └── useNewModal.ts             # 메인 composable

plugins/
  └── newModal.ts                # 플러그인

components/
  └── newModalContainer/
      └── newModalContainer.vue  # 모달 컨테이너

pages/guide/
  ├── newPopup.vue              # 사용 예시 페이지
  └── newPopup/                 # 예시 모달 컴포넌트들
      ├── newFullPopup.vue
      ├── newModalPopup.vue
      └── newBottomPopup.vue
```

## 🎯 기본 사용법

### 1. Composable 사용

```typescript
<script setup>
const { open, showLoading, hideLoading, showLike } = useNewModal()

// 기본 모달 열기
const openModal = async () => {
  const result = await open(
    MyModalComponent,
    { title: 'Hello World' },
    { type: 'modal', closeOnOverlay: true }
  )
  console.log(result)
}

// 동적 import 모달
const openDynamicModal = async () => {
  const result = await open(
    () => import('./MyModal.vue'),
    { data: 'test' },
    { type: 'full' }
  )
}
</script>
```

### 2. 플러그인 사용

```typescript
<script setup>
const { $newModal, $newLoading, $newLike } = useNuxtApp()

const openModal = async () => {
  await $newModal(
    MyComponent,
    { props: 'value' },
    { type: 'modal' }
  )
}

const showLoading = () => {
  $newLoading('로딩중...')
}

const showLike = () => {
  $newLike('heart')
}
</script>
```

## 🔧 API 참조

### useNewModal()

#### open(component, props?, options?)
모달을 열고 Promise를 반환합니다.

**Parameters:**
- `component`: Vue 컴포넌트 또는 동적 import 함수
- `props`: 컴포넌트에 전달할 props (선택사항)
- `options`: 모달 옵션 (선택사항)

**Options:**
```typescript
interface NewModalOptions {
  type?: 'modal' | 'full' | 'bottom' | 'custom'
  class?: string | string[]
  closeOnOverlay?: boolean    // 기본값: true
  closeOnEscape?: boolean     // 기본값: true
  key?: string               // 중복 방지 키
  returnFocus?: HTMLElement  // 포커스 반환 요소
  duration?: number          // 애니메이션 지속시간 (ms)
}
```

#### close(modalId?, result?)
특정 모달 또는 가장 최근 모달을 닫습니다.

#### closeAll()
모든 모달을 닫습니다.

#### showLoading(input?)
로딩을 표시합니다.

```typescript
// 사용 예시
showLoading(true)                                    // 기본 로딩
showLoading('데이터 로딩중...')                         // 텍스트와 함께
showLoading({ text: '처리중...', type: 'spinner' })    // 옵션 객체
hideLoading()                                        // 로딩 닫기
```

#### showLike(options?)
좋아요 애니메이션을 표시합니다.

```typescript
// 사용 예시
showLike()                              // 기본 하트
showLike('heart')                       // 하트 타입
showLike({ type: 'heart', duration: 3000 })  // 옵션과 함께
```

## 🎨 타입 안전한 모달

타입 안전성을 위해 `createModalOpener` 함수를 사용할 수 있습니다:

```typescript
// 타입 안전한 모달 오프너 생성
const openUserModal = createModalOpener<
  { userId: string },           // Props 타입
  { action: 'save' | 'cancel' } // 반환값 타입
>(
  () => import('./UserModal.vue'),
  { type: 'modal' }             // 기본 옵션
)

// 사용 시 타입 체크됨
const result = await openUserModal(
  { userId: '123' },
  { closeOnEscape: false }
)

if (result.action === 'save') {
  // 타입 안전!
}
```

## 🎭 모달 컴포넌트 작성

### 기본 구조

```vue
<script setup lang="ts">
// Props 타입 정의
const props = defineProps<{
  title?: string
  modalId?: string  // 자동으로 전달됨
}>()

// Emit 타입 정의
const emit = defineEmits<{
  close: [result?: any]
  mounted: [el: HTMLElement]
}>()

const popWrapRef = ref<HTMLElement>()

const handleClose = (result?: any) => {
  emit('close', result)
}

// 포커스 관리를 위해 mounted 이벤트 발생
onMounted(() => {
  if (popWrapRef.value) {
    emit('mounted', popWrapRef.value)
  }
})
</script>

<template>
  <uiPop modal title="모달 제목" ref="popWrapRef">
    <uiInner>
      <!-- 포커스를 받을 요소에 pop-focus 클래스와 tabindex="-1" 추가 -->
      <h1 class="tit-h1 pop-focus" tabindex="-1">{{ title }}</h1>
      <!-- 모달 내용 -->
    </uiInner>
    <template #foot>
      <div class="flex full">
        <uiButton line @click="handleClose({ action: 'cancel' })">취소</uiButton>
        <uiButton primary @click="handleClose({ action: 'confirm' })">확인</uiButton>
      </div>
    </template>
  </uiPop>
</template>
```

## 🔄 기존 시스템과의 비교

### 기존 API
```typescript
// 기존 방식
useNuxtApp().$modal({
  component: MyComponent,
  componentProps: { title: 'Hello' }
}).then(result => {
  console.log(result)
})
```

### 새로운 API
```typescript
// 새로운 방식
const { open } = useNewModal()
const result = await open(
  MyComponent,
  { title: 'Hello' },
  { type: 'modal' }
)
console.log(result)
```

## 🚀 마이그레이션 가이드

### 1. 기존 코드 유지
기존 모달 시스템은 그대로 유지되므로 점진적으로 마이그레이션할 수 있습니다.

### 2. 새로운 컨테이너 추가
`app.vue`에 새로운 모달 컨테이너를 추가:

```vue
<template>
  <div id="wrap">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- 기존 모달 시스템 -->
    <ModalContainer />
    <!-- 새로운 모달 시스템 -->
    <NewModalContainer />
  </div>
</template>
```

### 3. 점진적 마이그레이션
1. 새로운 모달부터 새 시스템 사용
2. 기존 모달은 필요시에만 마이그레이션
3. 두 시스템 동시 사용 가능

## 🎯 Best Practices

### 1. 동적 Import 사용
```typescript
// ✅ 권장: 코드 스플리팅
const result = await open(
  () => import('./HeavyModal.vue'),
  props,
  options
)

// ❌ 지양: 번들 크기 증가
import HeavyModal from './HeavyModal.vue'
const result = await open(HeavyModal, props, options)
```

### 2. 타입 안전성 활용
```typescript
// ✅ 권장: 타입 안전한 모달
const openTypedModal = createModalOpener<Props, Result>(
  () => import('./Modal.vue')
)

// ❌ 지양: 타입 없는 사용
const result = await open(SomeModal, someProps)
```

### 3. 접근성 고려
```vue
<!-- ✅ 권장: 접근성 지원 -->
<h1 class="pop-focus" tabindex="-1">{{ title }}</h1>

<!-- ❌ 지양: 포커스 관리 없음 -->
<h1>{{ title }}</h1>
```

### 4. 에러 처리
```typescript
// ✅ 권장: 에러 처리
try {
  const result = await open(Modal, props)
  // 성공 처리
} catch (error) {
  // 취소 또는 에러 처리
}
```

## 🐛 트러블슈팅

### Q: 모달이 열리지 않아요
A: `NewModalContainer` 컴포넌트가 `app.vue`에 추가되었는지 확인하세요.

### Q: 타입 에러가 발생해요
A: 모달 컴포넌트에서 `emit` 타입을 올바르게 정의했는지 확인하세요.

### Q: 포커스가 제대로 동작하지 않아요
A: 모달 컴포넌트에서 `mounted` 이벤트를 발생시키고, 포커스할 요소에 `pop-focus` 클래스를 추가하세요.

### Q: 로딩이 표시되지 않아요
A: `showLoading(true)` 호출 후 `hideLoading()` 또는 `showLoading(false)`로 닫아야 합니다.

## 📝 라이센스

기존 프로젝트와 동일한 라이센스를 따릅니다.
