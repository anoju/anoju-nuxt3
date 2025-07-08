<template>
  <article class="pop-wrap">
    <!-- pop-head -->
    <div 
      v-if="!noHead"
      :class="[
        'pop-head',
        {
          no_title: (!title || title === '') && !$slots.title
        },
        titleClass
      ]"
    >
      <div>
        <!-- title-prev slot -->
        <slot name="title-prev" />
        
        <!-- h1 title -->
        <h1 
          v-if="title || $slots.title"
          ref="titleRef"
          tabindex="-1"
        >
          {{ title }}
          <slot name="title" />
        </h1>
        
        <!-- title-next slot -->
        <slot name="title-next" />
        
        <!-- close button -->
        <button
          v-if="!noClose"
          class="pop-close"
          aria-label="팝업창 닫기"
          @click="handleClose"
        >
          팝업창 닫기
        </button>
      </div>
    </div>
    
    <!-- head slot -->
    <slot name="head" />
    
    <!-- pop-body -->
    <div class="pop-body">
      <slot />
    </div>
    
    <!-- pop-foot -->
    <div v-if="$slots.foot" class="pop-foot">
      <div>
        <slot name="foot" />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  titleClass?: string;
  noHead?: boolean;
  noClose?: boolean;
}

interface Emits {
  close: [];
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  titleClass: '',
  noHead: false,
  noClose: false
});

const emit = defineEmits<Emits>();

const titleRef = ref<HTMLElement>();

const handleClose = (): void => {
  emit('close');
};

// 타이틀 포커스 메서드
const focusTitle = (): void => {
  nextTick(() => {
    titleRef.value?.focus();
  });
};

defineExpose({
  focusTitle,
  titleRef
});
</script>
