<script lang="ts" setup>
useHead({
  title: 'NUXT3 컴포넌트 가이드'
});

const count: Ref<number> = ref(0);

const incrementCount = (): void => {
  count.value++;
};
const listAry = [
  { title: '공지사합니다.1', link: '#', isNew: true },
  { title: '공지사합니다.2', link: '#' },
  { title: '공지사합니다.3', link: '#' },
  { title: '공지사합니다.4', link: '#' },
  { title: '공지사합니다.5', link: '#' },
  { title: '공지사합니다.6', link: '#' },
  { title: '공지사합니다.7', link: '#' }
];
</script>
<template>
  <uiPage page-title="Index page" btn-back>
    <uiInner>
      <h1 class="tit-h1">NUXT3 컴포넌트 가이드 제작</h1>
      <p class="t-right">by. 안효주</p>
      <br />
      <br />
      <div class="flex space-between align-center">
        <p><uiButton line @click="incrementCount">count++</uiButton></p>
        <p>Count: {{ count }}</p>
      </div>
      <br />
      <br />
      <br /><br />
      <ul class="sample-list">
        <li v-for="(item, i) of listAry" :key="i">
          <uiButton :to="item.link" anchor not>
            <badge v-if="item.isNew" small red>NEW</badge>
            {{ item.title }}
          </uiButton>
        </li>
      </ul>
    </uiInner>
    <uiBottomFixed flex full>
      <uiButton to="/guide/text" primary>Go to Guide</uiButton>
    </uiBottomFixed>
  </uiPage>
</template>
<style lang="scss">
.sample-list {
  border-top: 2px solid #aaa;
  border-bottom: 1px solid #ddd;
  li {
    + li {
      border-top: 1px solid #ddd;
    }
    > a {
      display: block;
      padding: 1.5rem 1rem;
      &:hover {
        font-weight: bold;
        color: var(--primary-color);
      }
    }
  }
}
</style>
