<script lang="ts" setup>
import modalPopup from '~/pages/guide/popup/modalPopup.vue';
const props = defineProps({
  title: { type: String, default: null }
});
const emit = defineEmits(['close']);
const popClose = () => {
  emit('close');
};

const openModalPopup = async () => {
  useNuxtApp().$modal({
    component: modalPopup,
    componentProps: {
      number: 987654321
    }
  });
};
</script>
<template>
  <uiPop full title="팝업 타이틀">
    <uiInner>
      <h1 v-if="title" class="tit-h1">{{ title }}</h1>
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
        <uiButton line @click="openModalPopup">모달팝업</uiButton>
        <uiButton primary h60 @click="popClose">확인</uiButton>
      </div>
    </template>
  </uiPop>
</template>
