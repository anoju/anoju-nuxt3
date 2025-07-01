<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
// Types
interface Props {
  id?: string | null;
  disabled?: boolean;
  right?: boolean;

  size?: string | null;
  small?: boolean;
  large?: boolean;

  checkbox?: boolean;
  block?: boolean;
  box?: boolean;
  button?: boolean;

  value: string | number;
  modelValue?: string | number | boolean | null;

  class?: string | Array<string> | null;
  lblClass?: string | Array<string> | null;
  lblStyle?: string | null;
  dblclick?: (() => void) | null;
}

type Size = 'small' | 'large';

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  id: null,
  disabled: false,
  right: false,
  size: null,
  small: false,
  large: false,
  checkbox: false,
  block: false,
  box: false,
  button: false,
  modelValue: null,
  class: null,
  lblClass: null,
  lblStyle: null,
  dblclick: null
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

// Global counter for unique IDs
const nuxtApp = useNuxtApp();
const componentName = 'input';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

// Reactive state
const isFocus = ref<boolean>(false);

// Computed properties
const radioId = computed<string>(() => {
  let rtnVal = `rdo_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const isChecked = computed<boolean>(() => {
  return props.modelValue === props.value;
});

const sizeAry: Size[] = ['small', 'large'];
const matchingSize = computed(() => sizeAry.find((size) => props[size]));
const $size = computed<Size | null>(() => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  }
  return matchingSize.value || null;
});

const radioClass = computed<Array<string | Array<string> | Record<string, boolean> | null>>(() => {
  const rtnAry: Array<string | Array<string> | Record<string, boolean> | null> = [
    {
      radio: !props.checkbox,
      checkbox: props.checkbox,
      block: props.block,
      box: props.box,
      btn: props.button,
      focus: isFocus.value,
      disabled: props.disabled,
      checked: isChecked.value
    },
    props.class,
    $size.value
  ];
  return rtnAry;
});

// Double click logic
let isDblclick = false;
let dblclickTime: ReturnType<typeof setTimeout> | null = null;

// Event handlers
const focusIn = (): void => {
  isFocus.value = true;
};

const focusOut = (): void => {
  isFocus.value = false;
};

const clickEvt = (e: Event): void => {
  if (!props.disabled) {
    if (props.dblclick) {
      if (isDblclick) {
        if (dblclickTime) {
          clearTimeout(dblclickTime);
          dblclickTime = null;
        }
        isDblclick = false;
        props.dblclick();
      } else {
        isDblclick = true;
        if (!dblclickTime) {
          dblclickTime = setTimeout(() => {
            isDblclick = false;
          }, 300);
        }
      }
    }
  }
};

const onInputChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  // 라디오 버튼은 문자열로 전달되므로 원래 타입으로 변환
  let value: string | number = target.value;

  // props.value의 타입에 맞춰 변환
  if (typeof props.value === 'number') {
    const numValue = Number(target.value);
    if (!isNaN(numValue)) {
      value = numValue;
    }
  }

  emit('update:modelValue', value);
};
</script>

<template>
  <div :class="radioClass">
    <label v-if="right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <input
      :id="radioId"
      ref="radio"
      type="radio"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      v-bind="$attrs"
      @click="clickEvt"
      @focus="focusIn"
      @blur="focusOut"
      @change="onInputChange"
    /><i aria-hidden="true" />
    <label v-if="!right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <div v-if="!!$slots.summary" class="lbl-child">
      <slot name="summary" />
    </div>
    <slot name="last" />
  </div>
</template>
