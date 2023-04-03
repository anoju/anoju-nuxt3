<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';

// props
const props = defineProps({
  id: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  right: { type: Boolean, default: false },

  size: { type: String, default: null },
  small: { type: Boolean, default: false },
  large: { type: Boolean, default: false },

  radio: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  box: { type: Boolean, default: false },
  button: { type: Boolean, default: false },
  switch: { type: Boolean, default: false },

  value: { type: [String, Number], default: null, require: true },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
  trueValue: { type: [String, Number, Boolean], default: true },
  falseValue: { type: [String, Number, Boolean], default: false },

  wrapClass: { type: [String, Array], default: null },
  lblClass: { type: [String, Array], default: null },
  lblStyle: { type: String, default: null },
  dblclick: { type: Function, default: null }
});

// data
const emit = defineEmits(['update:modelValue']);
const uuid = uuidv4();
const isFocus: Ref<boolean> = ref(false);

const chkboxId = computed<string>((): string => {
  let rtnVal = `chk_${uuid}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const isChecked = computed<boolean>((): boolean => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value);
  }
  console.log(props.modelValue === props.trueValue);
  return props.modelValue === props.trueValue;
});

type Size = 'small' | 'large';
const sizeAry: Size[] = ['small', 'large'];
const matchingSize = sizeAry.find((size) => props[size]);
const $size = computed<Size | null>((): Size | null => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  } else if (matchingSize) {
    return matchingSize;
  }
  return null;
});

interface CheckboxClass {
  checkbox?: boolean;
  radio?: boolean;
  block?: boolean;
  box?: boolean;
  btn?: boolean;
  switch?: boolean;
  focus?: boolean;
  disabled?: boolean;
  checked?: boolean;
}
const checkboxClass = computed<Array<CheckboxClass | string>>((): Array<CheckboxClass | string> => {
  const rtnAry = [
    {
      checkbox: !props.radio,
      radio: props.radio,
      block: props.block,
      box: props.box,
      btn: props.button,
      switch: props.switch,
      focus: isFocus.value,
      disabled: props.disabled,
      checked: isChecked.value
    }
  ];
  // if ($size.value) rtnAry.push($size.value);
  return rtnAry;
});

let isDblclick = false;
let dblclickTime: ReturnType<typeof setTimeout> | null = null;
const focusIn = () => {
  isFocus.value = true;
};
const focusOut = () => {
  isFocus.value = false;
};
const clickEvt = (e: any): void => {
  if (!props.disabled) {
    if (props.dblclick) {
      if (isDblclick) {
        if (!!dblclickTime) {
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
const onInputChange = (e: Event) => {
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
    let returnVal: boolean | string | number = '';
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
  <div :class="[checkboxClass, wrapClass, $size]">
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
    <div v-if="!!$slots.summary" class="lbl-child">
      <slot name="summary" />
    </div>
    <slot name="last" />
  </div>
</template>