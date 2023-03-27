<template>
  <div class="title-bar">
    <slot />
    <div v-if="$slots['right']" class="right"><slot name="right" /></div>
  </div>
</template>
