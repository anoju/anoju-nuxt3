<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script lang="ts" setup>
// Types
interface Props {
  id?: string | null;
  class?: string | Array<string> | null;
  disabled?: boolean;
  readonly?: boolean;
  box?: boolean;
  line?: boolean | string;
  date?: boolean;
  time?: boolean;
  file?: boolean;
  notDel?: boolean;
  comma?: boolean;
  frontUnit?: string | null;
  unit?: string | null;
  placeholder?: string | null;

  value?: string | number | null;
  modelValue?: string | number | boolean | Array<unknown> | Record<string, unknown> | null;

  // 달력
  datepicker?: boolean;
  monthpicker?: boolean;
  yearpicker?: boolean;
  min?: string | number | null;
  max?: string | number | null;
}

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  id: null,
  class: null,
  disabled: false,
  readonly: false,
  box: false,
  line: false,
  date: false,
  time: false,
  file: false,
  notDel: false,
  comma: false,
  frontUnit: null,
  unit: null,
  placeholder: null,
  value: null,
  modelValue: null,
  datepicker: false,
  monthpicker: false,
  yearpicker: false,
  min: null,
  max: null
});

// Emits with proper typing
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | Array<unknown> | Record<string, unknown>];
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
const el = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);
const isFocus = ref<boolean>(false);

// Computed properties
const inputId = computed<string>(() => {
  let rtnVal = `inp_${instanceId}`;
  if (props.id) rtnVal = props.id;
  return rtnVal;
});

const inputClass = computed<Array<string | Record<string, boolean> | null>>(() => {
  const rtnAry: Array<string | Record<string, boolean> | null> = [
    {
      focus: isFocus.value && !props.readonly,
      readonly: props.readonly,
      disabled: props.disabled,
      box: props.box,
      line: props.line,
      date: props.date,
      time: props.time,
      file: props.file,
      datepicker: props.datepicker || props.monthpicker || props.yearpicker
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

const valueReset = (e: Event): void => {
  emit('update:modelValue', '');
  if (inputEl.value) {
    inputEl.value.focus();
  }
};

const updateValue = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  let value: string | number = target.value;
  
  // 숫자 타입 처리
  if (typeof props.value === 'number' && target.value !== '') {
    const numValue = Number(target.value);
    if (!isNaN(numValue)) {
      value = numValue;
    }
  }
  
  emit('update:modelValue', value);
};

const dateChange = (e: Event): void => {
  console.log('dateChange');
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const calendarOpen = (e: Event): void => {
  console.log('calendarOpen');
  // TODO: 달력 팝업 로직 구현
};

// File handling
const fileChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('update:modelValue', target.files[0]);
  }
};

// Computed for showing delete button
const showDeleteButton = computed<boolean>(() => {
  return !!(
    props.modelValue !== '' && 
    props.modelValue !== null &&
    props.modelValue !== undefined &&
    !props.notDel && 
    !props.readonly && 
    !props.disabled && 
    !props.date && 
    !props.time && 
    !props.datepicker && 
    !props.monthpicker && 
    !props.yearpicker
  );
});
</script>

<template>
  <div ref="el" class="input" :class="inputClass">
    <label v-if="frontUnit != null" class="unit front" :for="inputId">
      {{ frontUnit }}
    </label>
    
    <span v-if="file" class="button">파일첨부</span>
    
    <input 
      v-if="file" 
      ref="inputEl" 
      type="file" 
      :disabled="disabled" 
      v-bind="$attrs" 
      @change="fileChange"
      @focus="focusIn"
      @blur="focusOut"
    />
    
    <input
      v-else
      :id="inputId"
      ref="inputEl"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="updateValue"
      @focus="focusIn"
      @blur="focusOut"
    />
    
    <input 
      v-if="date" 
      type="date" 
      :min="min" 
      :max="max" 
      :value="modelValue" 
      @change="dateChange" 
      @focus="focusIn" 
      @blur="focusOut" 
    />
    
    <div v-if="showDeleteButton" class="del">
      <uiButton not class="btn-inp-del" aria-label="입력내용삭제" @click="valueReset">
        입력내용삭제
      </uiButton>
    </div>
    
    <label v-if="unit != null" class="unit" :for="inputId">
      {{ unit }}
    </label>
    
    <div v-if="datepicker || monthpicker || yearpicker" class="datepicker_btn">
      <uiButton not class="ui-datepicker-btn" aria-label="달력팝업으로 기간조회" @click="calendarOpen">
        달력팝업으로 기간조회
      </uiButton>
    </div>
    
    <slot />
    
    <label v-if="line && placeholder" :for="inputId" class="lbl">
      {{ placeholder }}
    </label>
  </div>
</template>
