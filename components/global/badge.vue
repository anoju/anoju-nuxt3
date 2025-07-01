<script lang="ts" setup>
// Types
interface Props {
  ty2?: boolean;
  ty3?: boolean;
  line?: boolean;
  line2?: boolean;
  square?: boolean;
  round?: boolean;

  // 색상
  color?: string | null;
  primary?: boolean;
  gray?: boolean;
  gray2?: boolean;
  red?: boolean;
  green?: boolean;
  blue?: boolean;
  blue2?: boolean;
  orange?: boolean;
  black?: boolean;

  // 크기
  size?: string | null;
  small?: boolean;
  large?: boolean;
  h28?: boolean;
}

type Color = 'primary' | 'gray' | 'gray2' | 'red' | 'green' | 'blue' | 'blue2' | 'orange' | 'black';
type Size = 'small' | 'large' | 'h28';

// Props with defaults using withDefaults
const props = withDefaults(defineProps<Props>(), {
  ty2: false,
  ty3: false,
  line: false,
  line2: false,
  square: false,
  round: false,
  color: null,
  primary: false,
  gray: false,
  gray2: false,
  red: false,
  green: false,
  blue: false,
  blue2: false,
  orange: false,
  black: false,
  size: null,
  small: false,
  large: false,
  h28: false
});

// Computed properties
const colorAry: Color[] = ['primary', 'gray', 'gray2', 'red', 'green', 'blue', 'blue2', 'orange', 'black'];
const matchingColor = computed(() => colorAry.find((color) => props[color]));
const $color = computed<Color | null>(() => {
  if (props.color && colorAry.includes(props.color as Color)) {
    return props.color as Color;
  }
  return matchingColor.value || null;
});

const sizeAry: Size[] = ['small', 'large', 'h28'];
const matchingSize = computed(() => sizeAry.find((size) => props[size]));
const $size = computed<Size | null>(() => {
  if (props.size && sizeAry.includes(props.size as Size)) {
    return props.size as Size;
  }
  return matchingSize.value || null;
});

const badgeClass = computed<Array<string | Record<string, boolean>>>(() => {
  const rtnAry: Array<string | Record<string, boolean>> = [
    'badge', 
    { 
      ty2: props.ty2, 
      ty3: props.ty3 
    }
  ];
  
  if (!props.ty2 && !props.ty3) {
    const baseOptions: Record<string, boolean> = {
      line: props.line,
      line2: props.line2,
      square: props.square,
      round: props.round
    };
    rtnAry.push(baseOptions);
  }
  
  if ($color.value) rtnAry.push($color.value);
  if ($size.value) rtnAry.push($size.value);
  
  return rtnAry;
});
</script>

<template>
  <i :class="badgeClass">
    <slot />
  </i>
</template>
