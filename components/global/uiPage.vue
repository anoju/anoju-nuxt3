<template>
  <article class="page" :class="pageClass">
    <header v-if="!noHeader" class="page-head" :class="headClass">
      <div v-if="!!$slots.header">
        <slot name="header" />
      </div>
      <div v-else>
        <div v-if="!!btnBack || !!$slots.headLeft" class="head-left">
          <button v-if="!!btnBack" type="button" class="head-back button" aria-label="이전화면" @click="backClick"></button>
          <slot name="headLeft" />
        </div>
        <h1 v-if="pageTitle">{{ pageTitle }}</h1>
        <div v-if="!!btnClose || !!$slots.headRight" class="head-right">
          <slot name="headRight" />
          <button v-if="!!btnClose" type="button" class="head-close button" role="button" aria-label="화면닫기" @click="closeClick"></button>
        </div>
      </div>
    </header>

    <main class="page-body" :class="[bodyClass, noHeader ? 'no-header' : '']">
      <slot />
    </main>
  </article>
</template>

<script setup lang="ts">
// const uiPageProps = defineProps({
//   pageTitle: { type: [String, Number], default: null },
//   pageClass: { type: [String, Object], default: null },
//   headClass: { type: [String, Object], default: null },
//   bodyClass: { type: [String, Object], default: null },
//   noHeader: { type: Boolean, default: false },
//   btnBack: { type: Boolean, default: false },
//   btnClose: { type: Boolean, default: false }
// });
</script>
<script lang="ts">
export default {
  props: {
    pageTitle: { type: [String, Number], default: null },
    pageClass: { type: [String, Object], default: null },
    headClass: { type: [String, Object], default: null },
    bodyClass: { type: [String, Object], default: null },
    noHeader: { type: Boolean, default: false },
    btnBack: { type: [Boolean, String, Function], default: false },
    btnClose: { type: [Boolean, String, Function], default: false }
  },
  methods: {
    backClick() {
      const router = useRouter();
      if (typeof this.btnBack === 'function') {
        this.btnBack();
      } else if (typeof this.btnBack === 'string') {
        router.push({ path: this.btnBack });
      } else {
        router.back();
      }
    }
  },
  closeClick() {
    const router = useRouter();
    if (typeof this.btnClose === 'function') {
      this.btnClose();
    } else if (typeof this.btnClose === 'string') {
      router.push({ path: this.btnClose });
    } else {
      router.back();
    }
  }
};
</script>
