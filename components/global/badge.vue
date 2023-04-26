<script lang="ts" setup>
const props = defineProps({
  ty2: { type: Boolean, default: false },
  ty3: { type: Boolean, default: false },
  line: { type: Boolean, default: false },
  line2: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  round: { type: Boolean, default: false },

  // 색상
  color: { type: String, default: null },
  primary: { type: Boolean, default: false },
  gray: { type: Boolean, default: false },
  gray2: { type: Boolean, default: false },
  red: { type: Boolean, default: false },
  green: { type: Boolean, default: false },
  blue: { type: Boolean, default: false },
  blue2: { type: Boolean, default: false },
  orange: { type: Boolean, default: false },
  black: { type: Boolean, default: false },

  //size
  size: { type: String, default: null },
  small: { type: Boolean, default: false },
  large: { type: Boolean, default: false },
  h28: { type: Boolean, default: false }
});

type Color = 'primary' | 'gray' | 'gray2' | 'red' | 'green' | 'blue' | 'blue2' | 'orange' | 'black';
const colorAry: Color[] = ['primary', 'gray', 'gray2', 'red', 'green', 'blue', 'blue2', 'orange', 'black'];
const matchingColor = colorAry.find((color) => props[color]);
const $color = computed<Color | null>((): Color | null => {
  if (props.color && colorAry.includes(props.color as Color)) {
    return props.color as Color;
  } else if (matchingColor) {
    return matchingColor;
  }
  return null;
});

type Size = 'small' | 'large' | 'h28';
const sizeAry: Size[] = ['small', 'large', 'h28'];
const matchingSize = sizeAry.find((size) => props[size]);
const $size = computed<Size | null>((): Size | null => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  } else if (matchingSize) {
    return matchingSize;
  }
  return null;
});

const badgeClass = computed<Array<string | Object>>((): Array<string | Object> => {
  const rtnAry = ['badge', { ty2: props.ty2, ty3: props.ty3 }];
  if (!props.ty2 && !props.ty3) {
    const $baseOpt: any = {
      line: props.line,
      line2: props.line2,
      square: props.square,
      round: props.round
    };
    rtnAry.push($baseOpt);
  }
  if ($color.value) rtnAry.push($color.value);
  if ($size.value) rtnAry.push($size.value);
  return rtnAry;
});
</script>
<template>
  <i :class="badgeClass"><slot /></i>
</template>
