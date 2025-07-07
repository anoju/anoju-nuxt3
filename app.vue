<script lang="ts" setup>
// 모든 브라우저 로직을 plugins로 분리
</script>
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
