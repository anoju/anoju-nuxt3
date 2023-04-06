<script lang="ts" setup>
// props
const props = defineProps({
  type: { type: String, default: 'button' },
  title: { type: String, default: null },
  target: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  noEffect: { type: Boolean, default: false },
  dblclick: { type: Function, default: null },

  // 링크이동
  to: { type: String, default: null },
  anchor: { type: Boolean, default: false },

  not: { type: Boolean, default: false },
  link: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  round2: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },

  // 색상
  color: { type: String, default: null },
  primary: { type: Boolean, default: false },
  gray: { type: Boolean, default: false },
  gray2: { type: Boolean, default: false },
  gray3: { type: Boolean, default: false },
  line: { type: Boolean, default: false },
  line2: { type: Boolean, default: false },

  // 크기
  size: { type: String, default: null },
  h60: { type: Boolean, default: false },
  h52: { type: Boolean, default: false },
  h38: { type: Boolean, default: false },
  h32: { type: Boolean, default: false },
  h24: { type: Boolean, default: false }
});
// data
const isFocus: Ref<boolean> = ref(false);
const isClick: Ref<boolean> = ref(false);

//computed
const href = computed<string>((): string => {
  let val = '#';
  if (!!props.to && typeof props.to === 'string') val = props.to;
  return val;
});

type Color = 'primary' | 'gray' | 'gray2' | 'gray3';
const colorAry: Color[] = ['primary', 'gray', 'gray2', 'gray3'];
const matchingColor = colorAry.find((color) => props[color]);
const $color = computed<Color | null>((): Color | null => {
  if (props.size && colorAry.includes(props.size as Color)) {
    return props.size as Color;
  } else if (matchingColor) {
    return matchingColor;
  }
  return null;
});

type Size = 'h60' | 'h52' | 'h38' | 'h32' | 'h24';
const sizeAry: Size[] = ['h60', 'h52', 'h38', 'h32', 'h24'];
const matchingSize = sizeAry.find((size) => props[size]);
const $size = computed<Size | null>((): Size | null => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  } else if (matchingSize) {
    return matchingSize;
  }
  return null;
});

const btnClass = computed<Array<string | Object>>((): Array<string | Object> => {
  const rtnAry = [
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
      'btn-clicking-active': isClick.value
    }
  ];
  if ($color.value) rtnAry.push($color.value);
  if ($size.value) rtnAry.push($size.value);
  return rtnAry;
});

const notClass = computed<Array<string | Object>>((): Array<string | Object> => {
  return [
    'button',
    {
      focus: isFocus.value,
      not: props.not,
      disabled: props.disabled
    }
  ];
});

const linkClass = computed<Array<string | Object>>((): Array<string | Object> => {
  const rtnAry = [
    'btn-txt',
    {
      focus: isFocus.value,
      disabled: props.disabled
    }
  ];
  if ($color.value) rtnAry.push($color.value);
  return rtnAry;
});

const buttonClass = computed<any>((): any => {
  let $class = btnClass.value;
  if (props.not) $class = notClass.value;
  if (props.link) $class = linkClass.value;
  return $class;
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
  if ((props.anchor && href.value === '#') || (!!props.to && props.to.startsWith('#'))) e.preventDefault();
  if (!props.disabled) {
    if (props.target === '_blank' && (!!props.to || !!href)) {
      e.preventDefault();
      const url = props.to !== null ? props.to : href.value;
      linkTo(url);
    }
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
    if (!props.noEffect && !isClick.value) clickEffect(e);
  }
};
const linkTo = (url: string): void => {
  window.open(url);
};

const button = ref<HTMLElement | null>(null);
const btnInW: Ref<number> = ref(0);
const btnInH: Ref<number> = ref(0);
const btnInX: Ref<number> = ref(0);
const btnInY: Ref<number> = ref(0);

const clickEffect = (e: any): void => {
  if (isClick.value) return;
  isClick.value = true;
  if (!button.value) return;
  const $btnMax = Math.max(button.value.offsetWidth, button.value.offsetHeight);
  btnInW.value = $btnMax;
  btnInH.value = $btnMax;
  btnInX.value = e.clientX - button.value.getBoundingClientRect().left - $btnMax / 2;
  btnInY.value = e.clientY - button.value.getBoundingClientRect().top - $btnMax / 2;
};
const clickEndEvt = (): void => {
  isClick.value = false;
};

// lifecycle
// onMounted(() => {
//   if (button.value) {
//     console.log(buttonClass.value);
//   }
// });
</script>
<template>
  <!-- link일때 -->
  <NuxtLink v-if="!!to && target !== '_blank' && !to.startsWith('#')" ref="button" :to="to" :class="buttonClass" :title="title" @focus="focusIn" @blur="focusOut"
    ><slot
  /></NuxtLink>

  <!-- anchor일때 -->
  <a
    v-else-if="anchor || !!to"
    ref="button"
    role="button"
    :href="href"
    :class="buttonClass"
    :title="title"
    :target="target"
    v-bind="$attrs"
    @focus="focusIn"
    @blur="focusOut"
    @click="clickEvt"
  >
    <slot />
    <i
      v-if="isClick"
      ref="clickIn"
      :style="{ width: `${btnInW}px`, height: `${btnInH}px`, left: `${btnInX}px`, top: `${btnInY}px` }"
      class="btn-click-in"
      @animationend="clickEndEvt"
    />
  </a>

  <!-- button일때 -->
  <button v-else ref="button" type="button" :class="buttonClass" :disabled="disabled" :title="title" v-bind="$attrs" @focus="focusIn" @blur="focusOut" @click="clickEvt">
    <slot />
    <i
      v-if="isClick"
      ref="clickIn"
      :style="{ width: `${btnInW}px`, height: `${btnInH}px`, left: `${btnInX}px`, top: `${btnInY}px` }"
      class="btn-click-in"
      @animationend="clickEndEvt"
    />
  </button>
</template>
