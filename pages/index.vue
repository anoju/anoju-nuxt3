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
const containerRef = ref<HTMLElement | null>(null);
const btns = ref(['버튼 1', '버튼 2', '버튼 3']);
const addBtns = (): void => {
  btns.value.push(`버튼 ${btns.value.length + 1}`);
};

//툴팁관련
const tooltipTarget = ref<HTMLElement | null>(null);

const setTooltipTarget = (event: MouseEvent | FocusEvent) => {
  if (event.type === 'click' && tooltipTarget.value === event.currentTarget) {
    tooltipTarget.value = null;
    return;
  }
  tooltipTarget.value = event.currentTarget as HTMLElement;
};

const removeTooltipTarget = () => {
  tooltipTarget.value = null;
};
</script>
<template>
  <uiPage page-title="Index page" btn-back>
    <uiInner ref="containerRef">
      <h1 class="tit-h1"><ui-tooltip>툴팁입니다.</ui-tooltip>NUXT3 컴포넌트 가이드 제작</h1>
      <p class="t-right">by. 안효주 <ui-tooltip>툴팁입니다.22</ui-tooltip></p>
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
          <ui-button :to="item.link" anchor not>
            <badge v-if="item.isNew" small red>NEW</badge>
            {{ item.title }}
          </ui-button>
        </li>
      </ul>
      <p><ui-tooltip>툴팁입니다.333</ui-tooltip></p>
      <p><ui-tooltip>툴팁입니다.4444</ui-tooltip></p>

      <!-- data 속성을 사용하는 경우
      @mouseenter="setTooltipTarget"
      @mouseleave="removeTooltipTarget"
      @focus="setTooltipTarget"
      @blur="removeTooltipTarget"
      -->
      <button v-for="(btn, i) in btns" :key="i" type="button" @click="(e) => setTooltipTarget(e)">
        {{ btn }}
      </button>
      <ui-tooltip v-if="btns.length" not-head :target="tooltipTarget">공통 툴팁 내용</ui-tooltip>
      <br />
      <button @click="addBtns">버튼 추가</button>
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
