<script lang="ts" setup>
// Types
interface Props {
  type?: string;
  title?: string | undefined;
  target?: string | undefined;
  disabled?: boolean;
  loading?: boolean;
  noEffect?: boolean;
  dblclick?: (() => void) | null;

  // 링크이동
  to?: string | null;
  anchor?: boolean;

  not?: boolean;
  link?: boolean;
  round?: boolean;
  round2?: boolean;
  icon?: boolean;

  // 색상
  color?: string | null;
  primary?: boolean;
  gray?: boolean;
  gray2?: boolean;
  gray3?: boolean;
  line?: boolean;
  line2?: boolean;

  // 크기
  size?: string | null;
  h60?: boolean;
  h52?: boolean;
  h38?: boolean;
  h32?: boolean;
  h24?: boolean;
}

type Color = 'primary' | 'gray' | 'gray2' | 'gray3';
type Size = 'h60' | 'h52' | 'h38' | 'h32' | 'h24';

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  title: undefined,
  target: undefined,
  disabled: false,
  loading: false,
  noEffect: false,
  dblclick: null,
  to: null,
  anchor: false,
  not: false,
  link: false,
  round: false,
  round2: false,
  icon: false,
  color: null,
  primary: false,
  gray: false,
  gray2: false,
  gray3: false,
  line: false,
  line2: false,
  size: null,
  h60: false,
  h52: false,
  h38: false,
  h32: false,
  h24: false
});

// Emits with proper typing
const emit = defineEmits(['click', 'dblclick', 'focus', 'blur']);

// Reactive state
const isFocus = ref<boolean>(false);
const isClick = ref<boolean>(false);
const button = ref<HTMLElement | null>(null);
const btnInW = ref<number>(0);
const btnInH = ref<number>(0);
const btnInX = ref<number>(0);
const btnInY = ref<number>(0);

// Computed properties
const href = computed<string>(() => {
  if (props.to && typeof props.to === 'string') {
    return props.to;
  }
  return '#';
});

const colorAry: Color[] = ['primary', 'gray', 'gray2', 'gray3'];
const matchingColor = computed(() => colorAry.find((color) => props[color]));
const $color = computed<Color | null>(() => {
  if (props.color && colorAry.includes(props.color as Color)) {
    return props.color as Color;
  }
  return matchingColor.value || null;
});

const sizeAry: Size[] = ['h60', 'h52', 'h38', 'h32', 'h24'];
const matchingSize = computed(() => sizeAry.find((size) => props[size]));
const $size = computed<Size | null>(() => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  }
  return matchingSize.value || null;
});

const btnClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    'button',
    {
      focus: isFocus.value,
      not: props.not,
      round: props.round,
      round2: props.round2,
      line: props.line,
      line2: props.line2,
      icon: props.icon,
      disabled: props.disabled,
      loading: props.loading,
      'btn-clicking-active': isClick.value
    }
  ];

  if ($color.value) rtnAry.push($color.value);
  if ($size.value) rtnAry.push($size.value);

  return rtnAry;
});

const notClass = computed<Array<string | Record<string, boolean>>>(() => {
  return [
    'button',
    {
      focus: isFocus.value,
      not: props.not,
      disabled: props.disabled
    }
  ];
});

const linkClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    'btn-txt',
    {
      focus: isFocus.value,
      disabled: props.disabled
    }
  ];

  if ($color.value) rtnAry.push($color.value);

  return rtnAry;
});

const buttonClass = computed(() => {
  if (props.not) return notClass.value;
  if (props.link) return linkClass.value;
  return btnClass.value;
});

// Double click logic
let isDblclick = false;
let dblclickTime: ReturnType<typeof setTimeout> | null = null;

// Event handlers
const focusIn = (e: FocusEvent): void => {
  isFocus.value = true;
  emit('focus', e);
};

const focusOut = (e: FocusEvent): void => {
  isFocus.value = false;
  emit('blur', e);
};

const clickEvt = (e: Event): void => {
  if ((props.anchor && href.value === '#') || (props.to && props.to.startsWith('#'))) {
    e.preventDefault();
  }

  if (!props.disabled && !props.loading) {
    // 부모 컴포넌트로 클릭 이벤트 전달
    emit('click', e);

    if (props.target === '_blank' && (props.to || href.value)) {
      e.preventDefault();
      const url = props.to || href.value;
      linkTo(url);
    }

    if (props.dblclick) {
      if (isDblclick) {
        if (dblclickTime) {
          clearTimeout(dblclickTime);
          dblclickTime = null;
        }
        isDblclick = false;
        emit('dblclick', e);
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

    if (!props.noEffect && !isClick.value) {
      clickEffect(e as MouseEvent);
    }
  }
};

const linkTo = (url: string): void => {
  window.open(url);
};

const clickEffect = (e: MouseEvent): void => {
  if (isClick.value || !button.value) return;

  isClick.value = true;
  const $btnMax = Math.max(button.value.offsetWidth, button.value.offsetHeight);
  btnInW.value = $btnMax;
  btnInH.value = $btnMax;
  btnInX.value = e.clientX - button.value.getBoundingClientRect().left - $btnMax / 2;
  btnInY.value = e.clientY - button.value.getBoundingClientRect().top - $btnMax / 2;
};

const clickEndEvt = (): void => {
  isClick.value = false;
};
</script>

<template>
  <!-- link일때 -->
  <NuxtLink v-if="!!to && target !== '_blank' && !to.startsWith('#')" ref="button" :to="to" :class="buttonClass" :title="title" @focus="focusIn" @blur="focusOut">
    <slot />
  </NuxtLink>

  <!-- anchor일때 -->
  <a
    v-else-if="anchor || !!to"
    ref="button"
    role="button"
    :href="href"
    :class="buttonClass"
    :title="title"
    :target="target"
    :aria-disabled="disabled || loading"
    v-bind="$attrs"
    @focus="focusIn"
    @blur="focusOut"
    @click="clickEvt"
  >
    <slot />
    <div v-if="loading" class="loading-svg" role="img">
      <svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
    <i
      v-if="isClick"
      ref="clickIn"
      :style="{ width: `${btnInW}px`, height: `${btnInH}px`, left: `${btnInX}px`, top: `${btnInY}px` }"
      class="btn-click-in"
      @animationend="clickEndEvt"
    />
  </a>

  <!-- button일때 -->
  <button v-else ref="button" type="button" :class="buttonClass" :disabled="disabled || loading" :title="title" v-bind="$attrs" @focus="focusIn" @blur="focusOut" @click="clickEvt">
    <slot />
    <div v-if="loading" class="loading-svg" role="img">
      <svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
    <i
      v-if="isClick"
      ref="clickIn"
      :style="{ width: `${btnInW}px`, height: `${btnInH}px`, left: `${btnInX}px`, top: `${btnInY}px` }"
      class="btn-click-in"
      @animationend="clickEndEvt"
    />
  </button>
</template>
