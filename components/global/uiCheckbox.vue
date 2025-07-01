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

  radio?: boolean;
  block?: boolean;
  box?: boolean;
  button?: boolean;
  switch?: boolean;
  switch2?: boolean;

  value: string | number;
  modelValue?: string | number | boolean | Array<string | number> | Record<string, unknown> | null;
  trueValue?: string | number | boolean;
  falseValue?: string | number | boolean;

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
  radio: false,
  block: false,
  box: false,
  button: false,
  switch: false,
  switch2: false,
  modelValue: null,
  trueValue: true,
  falseValue: false,
  class: null,
  lblClass: null,
  lblStyle: null,
  dblclick: null
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | Array<string | number> | Record<string, unknown>];
}>();

// Global counter for unique IDs
const nuxtApp = useNuxtApp();
const componentName = 'checkbox';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

// Reactive state
const isFocus = ref<boolean>(false);

// Computed properties
const chkboxId = computed<string>(() => {
  let rtnVal = `chk_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const isChecked = computed<boolean>(() => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value);
  }
  return props.modelValue === props.trueValue;
});

const sizeAry: Size[] = ['small', 'large'];
const matchingSize = computed(() => sizeAry.find((size) => props[size]));
const $size = computed<Size | null>(() => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  }
  return matchingSize.value || null;
});

const checkboxClass = computed<Array<string | Array<string> | Record<string, boolean> | null>>(() => {
  const rtnAry: Array<string | Array<string> | Record<string, boolean> | null> = [
    {
      checkbox: !props.radio,
      radio: props.radio,
      block: props.block,
      box: props.box,
      btn: props.button,
      switch: props.switch,
      switch2: props.switch2,
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
  if (!e.target) return;
  const checked = (e.target as HTMLInputElement).checked;
  
  if (props.modelValue instanceof Array) {
    const newValue = [...props.modelValue];
    if (checked) {
      newValue.push(props.value);
    } else {
      newValue.splice(newValue.indexOf(props.value), 1);
    }
    emit('update:modelValue', newValue);
  } else {
    let returnVal: string | number | boolean;
    if (checked) {
      returnVal = props.trueValue;
    } else {
      returnVal = props.falseValue;
    }
    emit('update:modelValue', returnVal);
  }
};
</script>

<template>
  <div :class="checkboxClass">
    <label v-if="right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="chkboxId">
      <slot />
    </label>
    <input
      :id="chkboxId"
      ref="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      v-bind="$attrs"
      @click="clickEvt"
      @focus="focusIn"
      @blur="focusOut"
      @change="onInputChange"
    /><i aria-hidden="true" />
    <label v-if="!right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="chkboxId">
      <slot />
    </label>
    <div v-if="!!$slots.child" class="lbl-child">
      <slot name="child" />
    </div>
    <slot name="last" />
  </div>
</template>
