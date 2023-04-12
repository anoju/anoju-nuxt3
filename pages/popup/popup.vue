<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: null }
});
</script>
<template>
  <uiPop full title="팝업 타이틀">
    <uiInner>
      <h2 v-if="title">{{ title }}</h2>
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
      팝업컨텐츠<br />
    </uiInner>
    <template #foot>
      <div class="flex full">
        <button type="button" class="button primary h60">확인</button>
      </div>
    </template>
  </uiPop>
</template>
