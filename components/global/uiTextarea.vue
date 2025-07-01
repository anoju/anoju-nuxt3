<script lang="ts" setup>
// Types
interface AutoHeightOption {
  minRows?: number;
  maxRows?: number;
}

interface Props {
  id?: string | null;
  class?: string | Array<string> | null;
  disabled?: boolean;
  readonly?: boolean;
  box?: boolean;
  line?: boolean | string;
  placeholder?: string | null;
  rows?: number | string;
  autoHeight?: boolean | AutoHeightOption;

  value?: string | number | null;
  modelValue?: string | number | string[] | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  id: null,
  class: null,
  disabled: false,
  readonly: false,
  box: false,
  line: false,
  placeholder: null,
  rows: 1,
  autoHeight: false,
  value: null,
  modelValue: null
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

// Global counter for unique IDs
const nuxtApp = useNuxtApp();
const componentName = 'textarea';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

// Reactive state
const el = ref<HTMLElement | null>(null);
const textareaEl = ref<HTMLTextAreaElement | null>(null);
const isFocus = ref<boolean>(false);
const textareaHeight = ref<number | null>(null);
const textareaStyle = ref<{ height: string } | null>(null);

// Computed properties
const autoHeightConfig = computed<{ minRows: number; maxRows?: number } | null>(() => {
  if (typeof props.autoHeight === 'boolean') {
    return props.autoHeight ? { minRows: 1, maxRows: undefined } : null;
  }
  if (typeof props.autoHeight === 'object' && props.autoHeight !== null) {
    return {
      minRows: props.autoHeight.minRows ?? 1,
      maxRows: props.autoHeight.maxRows
    };
  }
  return null;
});

const computedRows = computed<number | string>(() => {
  if (autoHeightConfig.value) {
    const propsRows = Number(props.rows) || 1;
    return Math.max(propsRows, autoHeightConfig.value.minRows);
  }
  return props.rows;
});

const textareaId = computed<string>(() => {
  let rtnVal = `inp_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const textareaClass = computed<Array<string | Array<string> | Record<string, boolean> | null>>(() => {
  const rtnAry: Array<string | Array<string> | Record<string, boolean> | null> = [
    {
      focus: isFocus.value && !props.readonly,
      readonly: props.readonly,
      disabled: props.disabled,
      box: props.box,
      line: !!props.line
    },
    props.class
  ];
  return rtnAry;
});

// Event handlers
const focusIn = (): void => {
  isFocus.value = true;
};

const focusOut = (): void => {
  isFocus.value = false;
};

const updateValue = (e: Event): void => {
  autoHeightChk();
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

// Auto height functionality
const autoHeightChk = (): void => {
  const $textarea = textareaEl.value;
  const config = autoHeightConfig.value;
  
  if (config && $textarea && textareaHeight.value) {
    const style = window.getComputedStyle($textarea);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const borderTop = parseFloat(style.borderTopWidth);
    const borderBottom = parseFloat(style.borderBottomWidth);
    
    const textLines = $textarea.value.split('\n');
    const actualLines = textLines.length;
    
    // 실제 텍스트 줄 수가 minRows 이하이면 높이 변경 안 함
    if (actualLines <= config.minRows) {
      textareaStyle.value = null;
      return;
    }
    
    // 실제 텍스트 줄 수가 minRows를 초과하면 높이 동적 조정
    let rows = actualLines;
    
    // maxRows 제한 적용
    if (config.maxRows !== undefined) {
      rows = Math.min(rows, config.maxRows);
    }
    
    const height = rows * textareaHeight.value + paddingTop + paddingBottom + borderTop + borderBottom;
    textareaStyle.value = { height: `${height}px` };
  }
};

const getLineHeight = (element: HTMLElement): number => {
  const style = window.getComputedStyle(element);
  const lineHeight = parseFloat(style.lineHeight);
  const fontSize = parseFloat(style.fontSize);
  
  // line-height가 'normal'이거나 숫자가 아닌 경우 fontSize * 1.2 사용
  if (isNaN(lineHeight) || style.lineHeight === 'normal') {
    return fontSize * 1.2;
  }
  
  return lineHeight;
};

// Computed for textarea value
const textareaValue = computed<string>(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return '';
  }
  
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.join('\n');
  }
  
  return props.modelValue.toString();
});

// Lifecycle
onMounted(() => {
  const $textarea = textareaEl.value;
  if ($textarea) {
    textareaHeight.value = getLineHeight($textarea);
    autoHeightChk();
  }
});
</script>

<template>
  <div ref="el" class="textarea" :class="textareaClass">
    <textarea
      :id="textareaId"
      ref="textareaEl"
      :rows="computedRows"
      :value="textareaValue"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder || undefined"
      :style="textareaStyle"
      v-bind="$attrs"
      @input="updateValue"
      @focus="focusIn"
      @blur="focusOut"
    />
  </div>
</template>
