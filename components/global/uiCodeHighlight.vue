<script lang="ts" setup>
// Slots
const slots = useSlots();
// Types
interface Props {
  lang?: string;
  code: string;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  lang: 'javascript'
});

// Template refs
const codeElement = ref<HTMLElement | null>(null);

// Reactive state
const isCopy = ref<boolean>(false);
let copiedTime: ReturnType<typeof setTimeout> | null = null;

// 들여쓰기 제거 함수
const trimIndent = (str: string): string => {
  const lines = str.split('\n');
  
  // 빈 줄이 아닌 첫 번째와 마지막 줄의 공백 제거
  while (lines.length && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  if (lines.length === 0) return '';
  
  // 최소 들여쓰기 찾기
  const minIndent = lines
    .filter(line => line.trim() !== '') // 빈 줄 제외
    .map(line => line.match(/^\s*/)?.[0].length || 0)
    .reduce((min, current) => Math.min(min, current), Infinity);
  
  // 공통 들여쓰기 제거
  return lines
    .map(line => line.slice(minIndent))
    .join('\n');
};

// Computed properties
const processedCode = computed<string>(() => {
  const slotContent = slots.default?.()[0]?.children as string || '';
  const codeContent = slotContent + props.code;
  return trimIndent(codeContent);
});

const lineCount = computed<number>(() => {
  return (processedCode.value.match(/\n/g) || []).length + 1;
});

const copyText = computed<string>(() => {
  return isCopy.value ? 'Copied!' : 'Copy code';
});

// Methods
const copyToClipboard = async (): Promise<void> => {
  if (!navigator.clipboard || !codeElement.value) {
    console.warn('Clipboard API not supported or code element not found');
    return;
  }

  try {
    const textContent = codeElement.value.textContent || '';
    await navigator.clipboard.writeText(textContent);
    
    // 복사 성공 상태 표시
    isCopy.value = true;
    
    // 기존 타이머가 있다면 정리
    if (copiedTime) {
      clearTimeout(copiedTime);
    }
    
    // 3초 후 상태 초기화
    copiedTime = setTimeout(() => {
      isCopy.value = false;
      copiedTime = null;
    }, 3000);
    
  } catch (error) {
    console.error('Failed to copy code:', error);
    // 사용자에게 에러 알림 (선택적)
    // 실제 프로젝트에서는 toast 알림 등으로 대체 가능
  }
};

// Cleanup
onUnmounted(() => {
  if (copiedTime) {
    clearTimeout(copiedTime);
    copiedTime = null;
  }
});
</script>

<template>
  <dl class="code-highlight">
    <dt class="code-highlight-header">
      <div class="tit">{{ lang }}</div>
      <uiButton 
        :class="{ copy: isCopy }" 
        :disabled="isCopy" 
        @click="copyToClipboard"
      >
        {{ copyText }}
      </uiButton>
    </dt>
    <dd class="code-highlight-body">
      <div class="line-numbers">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <ClientOnly>
        <pre v-highlightjs="{ language: lang }">
          <code ref="codeElement" :class="lang">{{ processedCode }}</code>
        </pre>
        <template #fallback>
          <pre>
            <code ref="codeElement" :class="lang">{{ processedCode }}</code>
          </pre>
        </template>
      </ClientOnly>
    </dd>
  </dl>
</template>
