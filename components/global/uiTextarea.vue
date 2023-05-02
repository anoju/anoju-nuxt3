<script lang="ts" setup>
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
  autoHeight: { type: Boolean, default: false },

  value: { type: [String, Number], default: null, require: true },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null }
});

const el = ref<HTMLElement | null>(null);
const textareaEl = ref<HTMLElement | null>(null);
const emit = defineEmits(['update:modelValue']);
const isFocus: Ref<boolean> = ref(false);
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
  if (props.autoHeight && $textarea) {
    const style = window.getComputedStyle($textarea);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const borderTop = parseFloat(style.borderTopWidth);
    const borderBottom = parseFloat(style.borderBottomWidth);
    const rows = ($textarea as HTMLInputElement).value.split('\n').length;
    const height = rows * textareaHeight.value + paddingTop + paddingBottom + borderTop + borderBottom;
    if (rows === 1) {
      textareaStyle.value = null;
    } else {
      textareaStyle.value = { height: `${height}px` };
    }
  }
};
const getInnerHeight = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const paddingTop = parseFloat(style.paddingTop);
  const paddingBottom = parseFloat(style.paddingBottom);
  const borderTop = parseFloat(style.borderTopWidth);
  const borderBottom = parseFloat(style.borderBottomWidth);

  const height = element.offsetHeight - paddingTop - paddingBottom - borderTop - borderBottom;
  return height;
};

onMounted(() => {
  const $textarea = textareaEl.value;
  if ($textarea) {
    textareaHeight.value = getInnerHeight($textarea);
    autoHeightChk();
  }
});
</script>
<template>
  <div ref="el" class="textarea" :class="textareaClass">
    <textarea
      :id="textareaId"
      ref="textareaEl"
      :rows="rows"
      :value="modelValue"
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
