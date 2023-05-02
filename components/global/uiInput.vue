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
  class: { type: [String, Array], default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  line: { type: Boolean, default: false },
  lineLbl: { type: [Boolean, String], default: false },
  date: { type: Boolean, default: false },
  time: { type: Boolean, default: false },
  file: { type: Boolean, default: false },
  notDel: { type: Boolean, default: false },
  comma: { type: Boolean, default: false },
  frontUnit: { type: String, default: null },
  unit: { type: String, default: null },

  value: { type: [String, Number], default: null, require: true },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null },

  // 달력
  datepicker: { type: Boolean, default: false },
  monthpicker: { type: Boolean, default: false },
  yearpicker: { type: Boolean, default: false },
  min: { type: [String, Number], default: null },
  max: { type: [String, Number], default: null }
});

const el = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLElement | null>(null);
const emit = defineEmits(['update:modelValue']);
const isFocus: Ref<boolean> = ref(false);
const inputId = computed<string>((): string => {
  // let rtnVal = `inp_${uuid}`;
  let rtnVal = `inp_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});
const inputClass = computed(() => {
  let rtnAry = [
    {
      focus: isFocus.value && !props.readonly,
      readonly: props.readonly,
      disabled: props.disabled,
      line: props.line,
      'line-lbl-inp': props.lineLbl,
      date: props.date,
      time: props.time,
      file: props.file,
      datepicker: props.datepicker || props.monthpicker || props.yearpicker
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
const valueReset = (e: any): void => {
  emit('update:modelValue', '');
  if (inputEl.value) inputEl.value.focus();
  // if (props.delete !== null) props.delete();
};
const updateValue = (e: Event): void => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
const dateChange = (e: any): void => {
  console.log('dateChange');
};
const calendarOpen = (e: any): void => {
  console.log('calendarOpen');
};
</script>
<template>
  <div ref="el" class="input" :class="inputClass">
    <label v-if="frontUnit != null" class="unit front" :for="inputId">
      {{ frontUnit }}
    </label>
    <span v-if="file" class="button">파일첨부</span>
    <input v-if="file" ref="inputEl" type="file" :disabled="disabled" v-bind="$attrs" />
    <input
      v-else
      :id="inputId"
      ref="inputEl"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      v-bind="$attrs"
      @input="updateValue"
      @focus="focusIn"
      @blur="focusOut"
    />
    <input v-if="date" type="date" :min="min" :max="max" :value="modelValue" @change="dateChange" @focus="focusIn" @blur="focusOut" />
    <div v-if="modelValue != '' && !notDel && !readonly && !disabled && !date && !time && !datepicker && !monthpicker && !yearpicker" class="del">
      <uiButton not class="btn-inp-del" aria-label="입력내용삭제" @click="valueReset">입력내용삭제</uiButton>
    </div>
    <label v-if="unit != null" class="unit" :for="inputId">
      {{ unit }}
    </label>
    <div v-if="datepicker || monthpicker || yearpicker" class="datepicker_btn">
      <uiButton not class="ui-datepicker-btn" aria-label="달력팝업으로 기간조회" @click="calendarOpen">달력팝업으로 기간조회</uiButton>
    </div>
    <slot />
    <label v-if="lineLbl" :for="inputId" class="lbl">{{ props.lineLbl === true ? '입력' : props.lineLbl }}</label>
  </div>
</template>
