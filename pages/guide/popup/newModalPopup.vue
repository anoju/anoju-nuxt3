<script lang="ts" setup>
const isModalOpen = ref(false);
</script>
<template>
  <newPopup v-model="isModalOpen" modal title="컴포넌트 분리된 모달 제목">
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
</template>
