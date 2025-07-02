<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
// Types
interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

type Size = 'small' | 'large';

interface Props {
  options: Option[];
  modelValue?: string | number;
  disabled?: boolean;
  class?: string | Array<string> | null;
  dir?: string | null;
  title?: string;
  inline?: boolean;
  size?: string | null;
  small?: boolean;
  large?: boolean;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  class: null,
  dir: null,
  title: '선택',
  inline: false,
  size: null,
  small: false,
  large: false
});

// Emits with proper typing
const emit = defineEmits<{
  input: [value: string | number];
  'update:modelValue': [value: string | number];
}>();

// Reactive state
const selectedValue = ref<string | number>(props.modelValue);

// Computed properties
const selectText = computed<string>(() => {
  const valObj = props.options.find((obj: Option) => String(obj.value) === String(props.modelValue));
  return valObj?.label || props.title;
});

const sizeAry: Size[] = ['small', 'large'];
const matchingSize = computed(() => sizeAry.find((size) => props[size]));
const $size = computed<Size | null>(() => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  }
  return matchingSize.value || null;
});

const selectClass = computed<Array<string | Array<string> | Record<string, boolean> | null>>(() => {
  const rtnAry: Array<string | Array<string> | Record<string, boolean> | null> = [
    {
      inline: props.inline,
      disabled: props.disabled
    },
    props.class,
    $size.value
  ];
  return rtnAry;
});

// Methods
const onSelectChange = (event: Event): void => {
  const targetVal = (event.target as HTMLSelectElement).value;
  selectedValue.value = targetVal;
  emit('input', selectedValue.value);
  emit('update:modelValue', selectedValue.value);
};

// Lifecycle
onMounted(() => {
  emit('input', selectedValue.value);
  emit('update:modelValue', selectedValue.value);
});
</script>

<template>
  <div class="select" :class="selectClass">
    <div v-if="inline" class="btn-select-txt" aria-hidden="true">
      {{ selectText }}
    </div>
    <select
      ref="select"
      v-model="selectedValue"
      :class="[{ off: props.modelValue === '' }]"
      :title="title"
      :disabled="disabled"
      :dir="dir || undefined"
      v-bind="$attrs"
      @change="onSelectChange"
    >
      <option 
        v-for="(option, i) of options" 
        :key="i" 
        :value="option.value" 
        :disabled="option.disabled" 
        :selected="option.value === props.modelValue"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
