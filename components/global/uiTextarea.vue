<script lang="ts" setup>
interface AutoHeightOption {
  minRows?: number;
  maxRows?: number;
}

const nuxtApp = useNuxtApp();
const componentName = 'textarea';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

const props = defineProps({
  id: { type: String, default: null },
  class: { type: [String, Array], default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  box: { type: Boolean, default: false },
  line: { type: [Boolean, String], default: false },
  placeholder: { type: String, default: null },
  rows: { type: [Number, String], default: 1 },
  autoHeight: { type: [Boolean, Object] as PropType<boolean | AutoHeightOption>, default: false },

  value: { type: [String, Number], default: null, require: true },
  modelValue: { type: [String, Number, String, Array] as PropType<string | number | string[] | undefined>, default: null }
});

const el = ref<HTMLElement | null>(null);
const textareaEl = ref<HTMLElement | null>(null);
const emit = defineEmits(['update:modelValue']);
const isFocus: Ref<boolean> = ref(false);

// autoHeight 설정 파싱
const autoHeightConfig = computed(() => {
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

// 계산된 rows 값 (minRows 적용)
const computedRows = computed(() => {
  if (autoHeightConfig.value) {
    const propsRows = Number(props.rows) || 1;
    return Math.max(propsRows, autoHeightConfig.value.minRows);
  }
  return props.rows;
});
const textareaId = computed<string>((): string => {
  let rtnVal = `inp_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
const textareaClass = computed(() => {
  let rtnAry = [
    {
      focus: isFocus.value && !props.readonly,
      readonly: props.readonly,
      disabled: props.disabled,
      box: props.box,
      line: props.line
    },
    props.class
  ];
  return rtnAry;
});
const focusIn = () => {
  isFocus.value = true;
};
const focusOut = () => {
  isFocus.value = false;
};
const updateValue = (e: Event): void => {
  autoHeightChk();
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
const textareaHeight: any = ref(null);
const textareaStyle: any = ref(null);
const autoHeightChk = () => {
  const $textarea = textareaEl.value;
  const config = autoHeightConfig.value;
  
  if (config && $textarea) {
    const style = window.getComputedStyle($textarea);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const borderTop = parseFloat(style.borderTopWidth);
    const borderBottom = parseFloat(style.borderBottomWidth);
    
    const textLines = ($textarea as HTMLInputElement).value.split('\n');
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
const getLineHeight = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const lineHeight = parseFloat(style.lineHeight);
  const fontSize = parseFloat(style.fontSize);
  
  // line-height가 'normal'이거나 숫자가 아닌 경우 fontSize * 1.2 사용
  if (isNaN(lineHeight) || style.lineHeight === 'normal') {
    return fontSize * 1.2;
  }
  
  return lineHeight;
};

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
      :value="modelValue ? modelValue.toString() : undefined"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :style="textareaStyle"
      v-bind="$attrs"
      @input="updateValue"
      @focus="focusIn"
      @blur="focusOut"
    ></textarea>
  </div>
</template>
