<script lang="ts" setup>
const pageTitle = 'Guide - New Modal Component';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

// 각 모달의 상태 관리
const isOpen = ref(false);
const isModalOpen = ref(false);
const isFullPopupOpen = ref(false);
const isBottomSheetOpen = ref(false);
const isCustomModalOpen = ref(false);

// 모달 열기 함수들
const openModal = () => {
  isModalOpen.value = true;
};

const openFullPopup = () => {
  isFullPopupOpen.value = true;
};

const openBottomSheet = () => {
  isBottomSheetOpen.value = true;
};

const openCustomModal = () => {
  isCustomModalOpen.value = true;
};

// 이벤트 핸들러들
const onModalOpen = () => {
  console.log('모달이 열렸습니다');
};

const onModalClose = () => {
  console.log('모달이 닫혔습니다');
};

const onModalOpened = () => {
  console.log('모달 열기 애니메이션이 완료되었습니다');
};

const onModalClosed = () => {
  console.log('모달 닫기 애니메이션이 완료되었습니다');
};

// 코드 예시들
const basicUsageCode = `<!-- 기본 사용법 -->
<NewModal v-model="isModalOpen" modal title="모달 제목">
  <uiInner>
    <h1>모달 내용</h1>
    <p>uiPop 없이 직접 사용하는 모달입니다.</p>
  </uiInner>
  <template #foot>
    <uiButton @click="isModalOpen = false">닫기</uiButton>
  </template>
</NewModal>

<!-- 버튼으로 열기 -->
<uiButton @click="isModalOpen = true">모달 열기</uiButton>`;

const eventsCode = `<!-- 이벤트 처리 -->
<NewModal 
  v-model="isModalOpen"
  type="modal"
  @open="onModalOpen"
  @close="onModalClose"
  @opened="onModalOpened"
  @closed="onModalClosed"
>
  <!-- 모달 내용 -->
</NewModal>`;

const optionsCode = `<!-- 다양한 옵션들 -->
<NewModal 
  v-model="isModalOpen"
  type="modal"                    <!-- modal, full, bottom, custom -->
  add-class="my-custom-class"     <!-- 추가 CSS 클래스 -->
  :close-on-overlay="false"       <!-- 배경 클릭으로 닫기 비활성화 -->
  :close-on-escape="false"        <!-- ESC 키로 닫기 비활성화 -->
>
  <!-- 모달 내용 -->
</NewModal>`;

const typesCode = `<!-- 다양한 모달 타입들 -->

<!-- 일반 모달 -->
<NewModal v-model="isModal" modal title="일반 모달">
  <!-- 내용 -->
</NewModal>

<!-- 풀스크린 -->
<NewModal v-model="isFull" full title="풀스크린">
  <!-- 내용 -->
</NewModal>

<!-- 바텀시트 -->
<NewModal v-model="isBottom" bottom title="바텀시트">
  <!-- 내용 -->
</NewModal>`;
</script>

<template>
  <uiInner>
    <h1 class="gd__h1">새로운 모달 컴포넌트</h1>

    <div class="feature-highlight">
      <h2>✨ 주요 특징</h2>
      <ul>
        <li><strong>컴포넌트 기반:</strong> Vue UI 라이브러리 스타일</li>
        <li><strong>v-model 지원:</strong> 양방향 바인딩으로 간편한 제어</li>
        <li><strong>Slot 기반:</strong> 자유로운 내용 구성</li>
        <li><strong>Teleport 렌더링:</strong> body 하위에 안전하게 렌더링</li>
        <li><strong>중앙 관리:</strong> 모든 모달을 시스템에서 통합 관리</li>
        <li><strong>접근성 지원:</strong> 포커스 관리, 키보드 네비게이션</li>
        <li><strong>애니메이션:</strong> 부드러운 열기/닫기 애니메이션</li>
      </ul>
    </div>

    <h2 class="gd__h2">기본 사용법</h2>
    <div class="flex full">
      <uiButton line @click="openModal">일반 모달</uiButton>
      <uiButton line @click="openFullPopup">풀스크린</uiButton>
      <uiButton line @click="openBottomSheet">바텀시트</uiButton>
      <uiButton line @click="openCustomModal">커스텀 모달</uiButton>
    </div>
    <uiCodeHighlight lang="vue" :code="basicUsageCode"></uiCodeHighlight>

    <h2 class="gd__h2">이벤트 처리</h2>
    <uiCodeHighlight lang="vue" :code="eventsCode"></uiCodeHighlight>

    <h2 class="gd__h2">옵션 설정</h2>
    <uiCodeHighlight lang="vue" :code="optionsCode"></uiCodeHighlight>

    <h2 class="gd__h2">모달 타입들</h2>
    <uiCodeHighlight lang="vue" :code="typesCode"></uiCodeHighlight>

    <h2 class="gd__h2">기존 시스템과 비교</h2>
    <div class="comparison-table">
      <div class="comparison-header">
        <div>기존 방식</div>
        <div>새로운 방식</div>
      </div>
      <div class="comparison-row">
        <div>
          <pre><code>// 기존: 함수 호출
useNuxtApp().$modal({
  component: MyComponent,
  componentProps: { ... }
})</code></pre>
        </div>
        <div>
          <pre><code><!-- 새로운: 컴포넌트 방식 -->
<NewModal v-model="isOpen" modal title="모달">
  <uiInner>
    <!-- 내용 -->
  </uiInner>
</NewModal></code></pre>
        </div>
      </div>
    </div>

    <!-- 실제 모달들 -->
    
    <!-- 일반 모달 -->
    <NewModal v-model="isModalOpen" modal title="일반 모달">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">일반 모달입니다</h1>
        <p>v-model로 제어되는 모달입니다.</p>
        <p>NewModal 자체가 uiPop처럼 동작합니다.</p>
        
        <div class="demo-features">
          <h3>새로운 기능들:</h3>
          <ul>
            <li>✅ uiPop 없이 직접 사용</li>
            <li>✅ v-model 양방향 바인딩</li>
            <li>✅ slot으로 자유로운 구성</li>
            <li>✅ 이벤트 기반 라이프사이클</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton line @click="isModalOpen = false">취소</uiButton>
          <uiButton primary h60 @click="isModalOpen = false">확인</uiButton>
        </div>
      </template>
    </NewModal>
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

.comparison-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}

.comparison-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #f9fafb;
  font-weight: 600;
}

.comparison-header > div {
  padding: 15px;
  text-align: center;
  border-right: 1px solid #e5e7eb;
}

.comparison-header > div:last-child {
  border-right: none;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.comparison-row > div {
  padding: 15px;
  border-right: 1px solid #e5e7eb;
}

.comparison-row > div:last-child {
  border-right: none;
}

.comparison-row pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  margin: 0;
}

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

.bottom-demo {
  background: #fef3c7;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px solid #f59e0b;
}

.bottom-demo h4 {
  margin: 0 0 12px 0;
  color: #92400e;
}

.bottom-demo ul {
  margin: 0;
  padding-left: 20px;
}

.bottom-demo li {
  margin: 4px 0;
  color: #b45309;
}

.custom-settings {
  background: #fef2f2;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px solid #fecaca;
}

.custom-settings ul {
  margin: 0;
  padding-left: 20px;
}

.custom-settings li {
  margin: 8px 0;
  color: #dc2626;
}

@media (max-width: 768px) {
  .comparison-table {
    font-size: 14px;
  }

  .comparison-header,
  .comparison-row {
    grid-template-columns: 1fr;
  }

  .comparison-header > div,
  .comparison-row > div {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-header > div:last-child,
  .comparison-row > div:last-child {
    border-bottom: none;
  }
}

/* 커스텀 모달 스타일 예시 */
:global(.custom-modal .new-modal-overlay) {
  background: rgba(139, 69, 19, 0.3) !important;
}
</style>
