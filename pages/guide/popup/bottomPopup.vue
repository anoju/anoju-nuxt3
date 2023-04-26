<script lang="ts" setup>
const props = defineProps({
  msg: { type: String, default: null }
});
const emit = defineEmits(['close']);
const popClose = () => {
  emit('close');
};
</script>
<template>
  <uiPop bottom title="바텀시트 타이틀">
    <uiInner>
      <p>{{ msg }}</p>
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
