<script lang="ts" setup>
const props = defineProps({
  number: { type: Number, default: null }
});
const emit = defineEmits(['close']);
const popClose = () => {
  emit('close');
};
</script>
<template>
  <uiPop modal title="모달 팝업 타이틀">
    <uiInner>
      <h1 v-if="number" class="tit-h1">{{ number }}</h1>
      <!-- <h1 v-if="dataIdx" class="tit-h1">{{ dataIdx }}</h1> -->
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
    </uiInner>
    <template #foot>
      <div class="flex full">
        <uiButton primary h60 @click="popClose">확인</uiButton>
      </div>
    </template>
  </uiPop>
</template>
