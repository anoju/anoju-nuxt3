<script lang="ts" setup>
const pageTitle = 'Guide - New Modal Component';
useHead({
  title: pageTitle
});
const emit = defineEmits(['page-title']);
emit('page-title', pageTitle);

// 각 모달의 상태 관리
const isModalOpen = ref(false);
const isFullPopupOpen = ref(false);
const isBottomSheetOpen = ref(false);
const isCustomModalOpen = ref(false);
const isEventModalOpen = ref(false);
const isHeadlessModalOpen = ref(false);

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

const openEventModal = () => {
  isEventModalOpen.value = true;
};

const openHeadlessModal = () => {
  isHeadlessModalOpen.value = true;
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

// 전역 메서드 사용 예시
const { $closeAllNewModals, $cleanupNewModals, $newModal } = useNuxtApp();

const closeAllModals = () => {
  $closeAllNewModals();
};

const manualCleanup = () => {
  $cleanupNewModals();
  console.log('모든 새로운 모달 시스템이 정리되었습니다');
};

// 코드 예시들
const basicUsageCode = `const isModalOpen = ref(false);

<!-- 모달 컴포넌트 -->
<newPopup v-model="isModalOpen" modal title="모달 제목">
  <uiInner>
    <h1>모달 내용</h1>
    <p>newModal 컴포넌트를 사용한 간편한 모달입니다.</p>
  </uiInner>
  <template #foot>
    <div class="flex full">
      <uiButton @click="isModalOpen = false">닫기</uiButton>
    </div>
  </template>
</newPopup>

<!-- 열기 버튼 -->
<uiButton @click="isModalOpen = true">모달 열기</uiButton>`;

const propsCode = `<newPopup 
  v-model="isModalOpen"           <!-- 필수: v-model로 열림/닫힘 상태 -->
  
  <!-- 모달 타입 (4가지 방식) -->
  modal                           <!-- 1. boolean props 방식 -->
  full                            <!-- 2. boolean props 방식 -->
  bottom                          <!-- 3. boolean props 방식 -->
  type="modal"                    <!-- 4. type prop 방식 -->
  
  <!-- uiPop과 동일한 옵션들 -->
  title="모달 제목"                <!-- 헤더 제목 -->
  title-class="my-title-class"    <!-- 제목 영역 추가 클래스 -->
  :no-head="false"                <!-- 헤더 숨기기 -->
  :no-close="false"               <!-- 닫기 버튼 숨기기 -->
  
  <!-- 새로운 모달 시스템 전용 옵션들 -->
  add-class="my-custom-class"     <!-- 모달 추가 클래스 -->
  :close-on-overlay="true"        <!-- 배경 클릭으로 닫기 -->
  :close-on-escape="true"         <!-- ESC 키로 닫기 -->
>
  <!-- 슬롯 내용 -->
</newPopup>`;

const eventsCode = `const onModalOpen = () => console.log('모달이 열렸습니다');
const onModalClose = () => console.log('모달이 닫혔습니다');
const onModalOpened = () => console.log('모달 열기 완료');
const onModalClosed = () => console.log('모달 닫기 완료');

<newPopup 
  v-model="isModalOpen"
  modal
  title="이벤트 예시"
  @open="onModalOpen"       <!-- 모달이 열리기 시작할 때 -->
  @close="onModalClose"     <!-- 모달이 닫히기 시작할 때 -->
  @opened="onModalOpened"   <!-- 모달 열기 애니메이션 완료 -->
  @closed="onModalClosed"   <!-- 모달 닫기 애니메이션 완료 -->
>
  <uiInner>
    <p>콘솔에서 이벤트 로그를 확인하세요!</p>
  </uiInner>
</newPopup>`;

const slotsCode = `<newPopup v-model="isModalOpen" modal title="슬롯 예시">
  <!-- title-prev 슬롯: 제목 앞쪽 -->
  <template #title-prev>
    <i class="icon-back"></i>
  </template>
  
  <!-- title 슬롯: 제목 영역 -->
  <template #title>
    <span>커스텀 제목</span>
  </template>
  
  <!-- title-next 슬롯: 제목 뒤쪽 -->
  <template #title-next>
    <uiButton icon="icon-share">공유</uiButton>
  </template>
  
  <!-- head 슬롯: 헤더 아래 영역 -->
  <template #head>
    <div class="custom-header">추가 헤더 내용</div>
  </template>
  
  <!-- default 슬롯: 본문 내용 -->
  <uiInner>
    <h1>본문 내용</h1>
    <p>여기는 기본 슬롯 영역입니다.</p>
  </uiInner>
  
  <!-- foot 슬롯: 하단 버튼 영역 -->
  <template #foot>
    <div class="flex full">
      <uiButton line @click="isModalOpen = false">취소</uiButton>
      <uiButton primary @click="isModalOpen = false">확인</uiButton>
    </div>
  </template>
</newPopup>`;

const typesCode = `<!-- 1. 일반 모달 (중앙 팝업) -->
<newPopup v-model="isModal" modal title="일반 모달">
  <uiInner>일반 모달 내용</uiInner>
</newPopup>

<!-- 2. 풀스크린 모달 -->
<newPopup v-model="isFull" full title="풀스크린">
  <uiInner>풀스크린 내용</uiInner>
</newPopup>

<!-- 3. 바텀시트 -->
<newPopup v-model="isBottom" bottom title="바텀시트">
  <uiInner>바텀시트 내용</uiInner>
</newPopup>

<!-- 4. type prop 방식 -->
<newPopup v-model="isType" type="modal" title="Type 방식">
  <uiInner>type prop으로 지정</uiInner>
</newPopup>`;

const globalMethodsCode = `// Nuxt 앱에서 제공하는 전역 메서드들
const { $closeAllNewModals, $cleanupNewModals, $newModal } = useNuxtApp();

// 모든 새로운 모달 닫기
const closeAllModals = () => {
  $closeAllNewModals();
};

// 모달 시스템 정리 (메모리 정리)
const cleanupModals = () => {
  $cleanupNewModals();
};

<uiButton @click="closeAllModals">모든 모달 닫기</uiButton>
<uiButton @click="cleanupModals">시스템 정리</uiButton>`;

const advancedCode = `<!-- 1. 헤드리스 모달 (헤더 없음) -->
<newPopup v-model="isHeadless" modal :no-head="true">
  <div class="custom-modal-content">
    <h1>완전 커스텀 모달</h1>
    <p>헤더가 없는 자유로운 구성</p>
    <uiButton @click="isHeadless = false">닫기</uiButton>
  </div>
</newPopup>

<!-- 2. 배경 클릭 비활성화 -->
<newPopup 
  v-model="isNoOverlay" 
  modal 
  title="배경 클릭 안됨"
  :close-on-overlay="false"
  :close-on-escape="false"
>
  <uiInner>
    <p>배경 클릭이나 ESC로 닫을 수 없습니다.</p>
  </uiInner>
  <template #foot>
    <div class="flex full">
      <uiButton @click="isNoOverlay = false">직접 닫기</uiButton>
    </div>
  </template>
</newPopup>

<!-- 3. 커스텀 클래스 -->
<newPopup 
  v-model="isCustom" 
  modal 
  title="커스텀 스타일"
  add-class="my-special-modal"
>
  <uiInner>
    <p>add-class로 커스텀 스타일 적용</p>
  </uiInner>
</newPopup>`;
</script>

<template>
  <uiInner>
    <h1 class="gd__h1">새로운 모달 컴포넌트 (newModal)</h1>

    <div class="feature-highlight">
      <h2>✨ 주요 특징</h2>
      <ul>
        <li><strong>Vue UI 라이브러리 스타일:</strong> 컴포넌트 기반으로 직관적 사용</li>
        <li><strong>v-model 양방향 바인딩:</strong> 상태 관리가 간편함</li>
        <li><strong>uiPop 호환성:</strong> 기존 uiPop의 모든 기능과 슬롯 지원</li>
        <li><strong>Teleport 렌더링:</strong> body 하위에 안전하게 렌더링</li>
        <li><strong>중앙 집중 관리:</strong> 새로운 모달 시스템에서 통합 관리</li>
        <li><strong>메모리 안전:</strong> 자동 정리로 메모리 누수 방지</li>
        <li><strong>접근성 지원:</strong> 포커스 관리, 키보드 네비게이션, ARIA</li>
        <li><strong>부드러운 애니메이션:</strong> CSS 트랜지션 기반</li>
      </ul>
    </div>

    <h2 class="gd__h2">🚀 빠른 시작</h2>
    <div class="demo-buttons">
      <uiButton primary @click="openModal">일반 모달</uiButton>
      <uiButton line @click="openFullPopup">풀스크린</uiButton>
      <uiButton line @click="openBottomSheet">바텀시트</uiButton>
      <uiButton line @click="openEventModal">이벤트 모달</uiButton>
      <uiButton line @click="openHeadlessModal">헤드리스 모달</uiButton>
      <uiButton warn @click="openCustomModal">커스텀 모달</uiButton>
    </div>

    <h2 class="gd__h2">📋 기본 사용법</h2>
    <uiCodeHighlight lang="vue" :code="basicUsageCode"></uiCodeHighlight>

    <h2 class="gd__h2">🎯 Props 상세</h2>
    <uiCodeHighlight lang="vue" :code="propsCode"></uiCodeHighlight>

    <h2 class="gd__h2">🎭 슬롯 구조</h2>
    <p>newModal은 uiPop과 동일한 슬롯 구조를 제공합니다.</p>
    <uiCodeHighlight lang="vue" :code="slotsCode"></uiCodeHighlight>

    <h2 class="gd__h2">🎪 이벤트 처리</h2>
    <uiCodeHighlight lang="vue" :code="eventsCode"></uiCodeHighlight>

    <h2 class="gd__h2">🎨 모달 타입들</h2>
    <uiCodeHighlight lang="vue" :code="typesCode"></uiCodeHighlight>

    <h2 class="gd__h2">🌐 전역 메서드</h2>
    <div class="global-methods">
      <uiButton line @click="closeAllModals">모든 새 모달 닫기</uiButton>
      <uiButton line @click="manualCleanup">시스템 정리</uiButton>
    </div>
    <uiCodeHighlight lang="vue" :code="globalMethodsCode"></uiCodeHighlight>

    <h2 class="gd__h2">🚀 고급 사용법</h2>
    <uiCodeHighlight lang="vue" :code="advancedCode"></uiCodeHighlight>

    <h2 class="gd__h2">🔄 기존 시스템과 비교</h2>
    <div class="comparison-table">
      <div class="comparison-header">
        <div>🔸 기존 방식 (함수 호출)</div>
        <div>🔹 새로운 방식 (컴포넌트)</div>
      </div>
      <div class="comparison-row">
        <div class="comparison-old">
          <h4>특징:</h4>
          <ul>
            <li>함수 호출 방식</li>
            <li>Promise 기반</li>
            <li>컴포넌트 분리 필요</li>
            <li>상태 관리 복잡</li>
          </ul>
          <pre><code>// 사용 예시
useNuxtApp().$modal({
  component: MyComponent,
  componentProps: { data: '...' }
}).then(result => {
  console.log(result);
});</code></pre>
        </div>
        <div class="comparison-new">
          <h4>특징:</h4>
          <ul>
            <li>컴포넌트 방식</li>
            <li>v-model 바인딩</li>
            <li>템플릿에서 직접 사용</li>
            <li>상태 관리 간편</li>
          </ul>
          <pre><code>&lt;!-- 사용 예시 --&gt;
&lt;newModal v-model="isOpen" modal&gt;
  &lt;uiInner&gt;
    모달 내용
  &lt;/uiInner&gt;
&lt;/newModal&gt;</code></pre>
        </div>
      </div>
    </div>

    <h2 class="gd__h2">💡 사용 팁</h2>
    <div class="tips-section">
      <div class="tip-item">
        <h4>✅ 권장사항</h4>
        <ul>
          <li>간단한 모달은 newModal 사용</li>
          <li>v-model로 상태 관리</li>
          <li>슬롯으로 자유로운 구성</li>
          <li>이벤트로 라이프사이클 관리</li>
        </ul>
      </div>
      <div class="tip-item">
        <h4>⚠️ 주의사항</h4>
        <ul>
          <li>기존 모달과 혼용 시 z-index 고려</li>
          <li>너무 많은 모달 동시 열기 지양</li>
          <li>접근성을 위한 포커스 관리 필수</li>
          <li>모바일에서 풀스크린 모달 권장</li>
        </ul>
      </div>
    </div>

    <!-- 실제 모달들 -->

    <!-- 일반 모달 -->
    <newPopup v-model="isModalOpen" modal title="일반 모달 데모">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">일반 모달입니다</h1>
        <p>v-model로 제어되는 모달입니다.</p>
        <p>newModal 컴포넌트는 uiPop의 모든 기능을 지원합니다.</p>

        <div class="demo-features">
          <h3>✨ 새로운 기능들:</h3>
          <ul>
            <li>✅ uiPop 없이 직접 사용</li>
            <li>✅ v-model 양방향 바인딩</li>
            <li>✅ 슬롯으로 자유로운 구성</li>
            <li>✅ 이벤트 기반 라이프사이클</li>
            <li>✅ 자동 메모리 관리</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton line h60 @click="isModalOpen = false">취소</uiButton>
          <uiButton primary h60 @click="isModalOpen = false">확인</uiButton>
        </div>
      </template>
    </newPopup>

    <!-- 풀스크린 모달 -->
    <newPopup v-model="isFullPopupOpen" full title="풀스크린 모달">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">풀스크린 모달</h1>
        <p>화면 전체를 차지하는 모달입니다.</p>
        <p>모바일에서 최적화된 경험을 제공합니다.</p>

        <div class="demo-features">
          <h3>🖥️ 풀스크린 특징:</h3>
          <ul>
            <li>📱 모바일 친화적</li>
            <li>🎯 집중도 향상</li>
            <li>🚀 빠른 로딩</li>
            <li>♿ 접근성 최적화</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton full primary @click="isFullPopupOpen = false">닫기</uiButton>
        </div>
      </template>
    </newPopup>

    <!-- 바텀시트 -->
    <newPopup v-model="isBottomSheetOpen" bottom title="바텀시트">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">바텀시트</h1>
        <p>화면 하단에서 올라오는 모달입니다.</p>

        <div class="bottom-demo">
          <h4>📲 바텀시트 용도:</h4>
          <ul>
            <li>선택 목록</li>
            <li>빠른 액션</li>
            <li>추가 정보</li>
            <li>설정 메뉴</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton full primary @click="isBottomSheetOpen = false">완료</uiButton>
        </div>
      </template>
    </newPopup>

    <!-- 이벤트 모달 -->
    <newPopup v-model="isEventModalOpen" modal title="이벤트 데모" @open="onModalOpen" @close="onModalClose" @opened="onModalOpened" @closed="onModalClosed">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">이벤트 모달</h1>
        <p>브라우저 콘솔을 확인하여 이벤트 로그를 확인하세요!</p>

        <div class="demo-features">
          <h3>🎪 이벤트 종류:</h3>
          <ul>
            <li><code>@open</code> - 열기 시작</li>
            <li><code>@opened</code> - 열기 완료</li>
            <li><code>@close</code> - 닫기 시작</li>
            <li><code>@closed</code> - 닫기 완료</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton full primary @click="isEventModalOpen = false">닫기</uiButton>
        </div>
      </template>
    </newPopup>

    <!-- 헤드리스 모달 -->
    <newPopup v-model="isHeadlessModalOpen" modal :no-head="true">
      <div class="headless-modal">
        <div class="headless-content">
          <h1>🎨 헤드리스 모달</h1>
          <p>헤더가 없는 완전 커스텀 모달입니다.</p>
          <p>자유로운 디자인이 가능합니다.</p>
          <uiButton primary @click="isHeadlessModalOpen = false">닫기</uiButton>
        </div>
      </div>
    </newPopup>

    <!-- 커스텀 모달 -->
    <newPopup v-model="isCustomModalOpen" modal title="커스텀 모달" add-class="custom-demo-modal" :close-on-overlay="false">
      <uiInner>
        <h1 class="tit-h1 pop-focus" tabindex="-1">커스텀 설정 모달</h1>
        <p>다양한 커스텀 옵션이 적용된 모달입니다.</p>

        <div class="custom-settings">
          <h4>⚙️ 적용된 설정:</h4>
          <ul>
            <li><code>add-class="custom-demo-modal"</code></li>
            <li><code>:close-on-overlay="false"</code></li>
            <li>배경 클릭으로 닫을 수 없음</li>
            <li>ESC 키는 여전히 작동</li>
          </ul>
        </div>
      </uiInner>
      <template #foot>
        <div class="flex full">
          <uiButton full primary @click="isCustomModalOpen = false">직접 닫기</uiButton>
        </div>
      </template>
    </newPopup>
  </uiInner>
</template>

<style scoped>
.feature-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  margin: 24px 0;
}

.feature-highlight h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.feature-highlight ul {
  margin: 0;
  padding-left: 20px;
}

.feature-highlight li {
  margin: 8px 0;
  line-height: 1.6;
}

.demo-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.global-methods {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}

.comparison-table {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  margin: 24px 0;
  background: white;
}

.comparison-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-weight: 600;
}

.comparison-header > div {
  padding: 20px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.comparison-header > div:last-child {
  border-right: none;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.comparison-old,
.comparison-new {
  padding: 20px;
  border-right: 1px solid #e5e7eb;
}

.comparison-new {
  border-right: none;
  background: #f8f9fa;
}

.comparison-old h4,
.comparison-new h4 {
  margin: 0 0 12px 0;
  color: #1f2937;
}

.comparison-old ul,
.comparison-new ul {
  margin: 0 0 16px 0;
  padding-left: 20px;
}

.comparison-old li,
.comparison-new li {
  margin: 6px 0;
  color: #4b5563;
}

.comparison-old pre,
.comparison-new pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  margin: 0;
  line-height: 1.5;
}

.tips-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.tip-item {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.tip-item:first-child {
  background: #f0f9ff;
  border-color: #0ea5e9;
}

.tip-item:last-child {
  background: #fef3c7;
  border-color: #f59e0b;
}

.tip-item h4 {
  margin: 0 0 12px 0;
  color: #1f2937;
}

.tip-item ul {
  margin: 0;
  padding-left: 20px;
}

.tip-item li {
  margin: 6px 0;
  line-height: 1.5;
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

.custom-settings h4 {
  margin: 0 0 12px 0;
  color: #dc2626;
}

.custom-settings ul {
  margin: 0;
  padding-left: 20px;
}

.custom-settings li {
  margin: 8px 0;
  color: #dc2626;
}

.headless-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 90%;
}

.headless-content h1 {
  margin: 0 0 16px 0;
  font-size: 2rem;
}

.headless-content p {
  margin: 0 0 12px 0;
  opacity: 0.9;
  line-height: 1.6;
}

.headless-content p:last-of-type {
  margin-bottom: 24px;
}

/* 커스텀 모달 스타일 예시 */
:global(.custom-demo-modal .popup) {
  border: 3px solid #f59e0b !important;
}

:global(.custom-demo-modal .pop-wrap) {
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%) !important;
}

:global(.custom-demo-modal .pop-head) {
  background: #f59e0b !important;
  color: white !important;
}

@media (max-width: 768px) {
  .demo-buttons {
    flex-direction: column;
  }

  .demo-buttons button {
    width: 100%;
  }

  .global-methods {
    flex-direction: column;
  }

  .global-methods button {
    width: 100%;
  }

  .comparison-table {
    font-size: 14px;
  }

  .comparison-header,
  .comparison-row {
    grid-template-columns: 1fr;
  }

  .comparison-header > div,
  .comparison-old,
  .comparison-new {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-header > div:last-child,
  .comparison-new {
    border-bottom: none;
  }

  .tips-section {
    grid-template-columns: 1fr;
  }

  .headless-modal {
    padding: 24px;
    max-width: 320px;
  }

  .headless-content h1 {
    font-size: 1.5rem;
  }
}
</style>
