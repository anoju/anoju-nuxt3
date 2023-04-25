<script lang="ts" setup>
const props = defineProps({
  lang: { type: String, default: 'javascript' },
  code: { type: String, required: true }
});
const codeElement = ref<HTMLElement | null>(null);

const lineCount = computed(() => {
  return (props.code.match(/\n/g) || []).length + 1;
});

const isCopy = ref(false);
const CopyText = computed(() => {
  return isCopy.value ? 'Copied!' : 'Copy code';
});
let copiedTime: ReturnType<typeof setTimeout> | null = null;
const copyToClipboard = async () => {
  // if (isCopy.value) return;
  if (navigator.clipboard && codeElement.value) {
    try {
      await navigator.clipboard.writeText(codeElement.value.textContent || '');
      // 성공적으로 복사되었음을 알리는 로직 구현
      isCopy.value = true;
      copiedTime = setTimeout(() => {
        isCopy.value = false;
      }, 3000);
    } catch (err) {
      // 복사 실패 처리 로직 구현
      alert('복사 실패!');
    }
  } else {
    // navigator.clipboard를 지원하지 않는 브라우저를 위한 폴백 처리
    alert('navigator.clipboard를 지원하지 않아 복사되지 않았습니다.');
  }
};
</script>
<template>
  <dl class="code-highlight">
    <dt class="code-highlight-header">
      <div class="tit">{{ lang }}</div>
      <uiButton :class="{ copy: isCopy }" :disabled="isCopy" @click="copyToClipboard">{{ CopyText }}</uiButton>
    </dt>
    <dd class="code-highlight-body">
      <div class="line-numbers">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <pre v-highlightjs="{ language: lang }">
      <code ref="codeElement" :class="lang"><slot />{{ code }}</code>
    </pre>
    </dd>
  </dl>
</template>
