<script lang="ts">
export default {
  // name: 'UiSelect',
  inheritAttrs: false
};
</script>
<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}
const props = defineProps({
  options: { type: Array as () => Option[], required: true },
  modelValue: { type: [String, Number], default: '' },
  title: { type: String, default: '선택' },
  disabled: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  dir: { type: String, default: null },
  wrapClass: { type: String, default: null }
});

// const selectText = ref('');
const selectedValue = ref(props.modelValue);
const emit = defineEmits(['input']);

const selectText = computed<any>((): string => {
  const valObj = props.options.filter((obj: Option) => String(obj.value) === String(props.modelValue));
  return valObj[0].label;
});

const onSelectChange = (event: Event) => {
  const targetVal = (event.target as HTMLSelectElement).value;
  selectedValue.value = targetVal;
  emit('input', selectedValue.value);
};

// const focus = () => {
//   this.$refs.select.focus();
// };
onMounted(() => {
  emit('input', selectedValue.value);
});
</script>
<template>
  <div class="select" :class="wrapClass">
    <div v-if="inline" class="btn-select-txt" aria-hidden="true">{{ selectText }}</div>
    <select
      ref="select"
      v-model="selectedValue"
      :class="[{ off: props.modelValue === '' }]"
      :title="title"
      :disabled="disabled"
      :dir="dir"
      v-bind="$attrs"
      @change="onSelectChange"
    >
      <option v-for="(option, i) of options" :key="i" :value="option.value" :disabled="option.disabled" :selected="option.value === props.modelValue">{{ option.label }}</option>
    </select>
  </div>
</template>
