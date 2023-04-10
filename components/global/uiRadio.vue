<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
// import { v4 as uuidv4 } from 'uuid';
// const uuid = uuidv4();
const nuxtApp = useNuxtApp();
const componentName = 'input';
if (!nuxtApp.$globalCounters[componentName]) {
  nuxtApp.$globalCounters[componentName] = 1;
} else {
  nuxtApp.$globalCounters[componentName]++;
}
const instanceId = nuxtApp.$globalCounters[componentName];

// props
const props = defineProps({
  id: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  right: { type: Boolean, default: false },

  size: { type: String, default: null },
  small: { type: Boolean, default: false },
  large: { type: Boolean, default: false },

  checkbox: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  box: { type: Boolean, default: false },
  button: { type: Boolean, default: false },

  value: { type: [String, Number], default: null, require: true },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null },

  wrapClass: { type: [String, Array], default: null },
  lblClass: { type: [String, Array], default: null },
  lblStyle: { type: String, default: null },
  dblclick: { type: Function, default: null }
});

// data
const emit = defineEmits(['update:modelValue']);
const isFocus: Ref<boolean> = ref(false);

const radioId = computed<string>((): string => {
  // let rtnVal = `rdo_${uuid}`;
  let rtnVal = `rdo_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
const isChecked = computed<boolean>((): boolean => {
  return props.modelValue === props.value;
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

interface RadioClass {
  radio?: boolean;
  checkbox?: boolean;
  block?: boolean;
  box?: boolean;
  btn?: boolean;
  focus?: boolean;
  disabled?: boolean;
  checked?: boolean;
}
const radioClass = computed<Array<RadioClass | string>>((): Array<RadioClass | string> => {
  const rtnAry = [
    {
      radio: !props.checkbox,
      checkbox: props.checkbox,
      block: props.block,
      box: props.box,
      btn: props.button,
      focus: isFocus.value,
      disabled: props.disabled,
      checked: isChecked.value
    }
  ];
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
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// lifecycle
// onMounted(() => {
//   console.log(ref(null));
// });
</script>
<template>
  <div :class="[radioClass, wrapClass, $size]">
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

<script lang="ts">
export default {
  methods: {
    focus() {
      // this.$refs.radio.focus();
    }
  }
};
</script>
