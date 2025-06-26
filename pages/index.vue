<script lang="ts" setup>
// import { set } from 'animejs'; // 사용하지 않는 import 제거

useHead({
  title: 'NUXT3 컴포넌트 가이드'
});

const count: Ref<number> = ref(0);

const incrementCount = (): void => {
  console.log('incrementCount 함수 호출됨!');
  count.value++;
};
const listAry = ref([
  { title: '공지사합니다.1', link: '#', isNew: true },
  { title: '공지사합니다.2', link: '#' },
  { title: '공지사합니다.3', link: '#' }
]);
const addList = (): void => {
  console.log('addList 함수 호출됨!');
  listAry.value.push({ title: `공지사합니다.${listAry.value.length + 1}`, link: '#' });
  isListScrollChk();
};
const deleteList = (): void => {
  console.log('deleteList 함수 호출됨!');
  listAry.value.pop();
  isListScrollChk();
};
const listRef = ref<HTMLElement | null>(null);
const isListScroll = ref(false);
const isListScrollChk = () => {
  setTimeout(() => {
    if (listRef.value) {
      isListScroll.value = listRef.value.scrollHeight > listRef.value.clientHeight;
    } else {
      isListScroll.value = false;
    }
  }, 1);
};
const btns = ref(['버튼 1', '버튼 2', '버튼 3']);
const addBtns = (): void => {
  btns.value.push(`버튼 ${btns.value.length + 1}`);
};

//툴팁관련
const tooltipRef = ref<{ close: () => void; open: (targetElement: HTMLElement) => void } | null>(null);
const tooltipTarget = ref<HTMLElement | null>(null);
const setTooltipTarget = (event: MouseEvent | FocusEvent) => {
  const targetElement = event.currentTarget as HTMLElement;
  if (event.type === 'click' && tooltipTarget.value === targetElement) {
    tooltipRef.value?.close();
    tooltipTarget.value = null;
    return;
  }
  tooltipRef.value?.open(targetElement);
  tooltipTarget.value = event.currentTarget as HTMLElement;
};

const removeTooltipTarget = () => {
  tooltipRef.value?.close();
  tooltipTarget.value = null;
};
</script>
<template>
  <uiPage page-title="Index page">
    <uiInner>
      <h1 class="tit-h1"><ui-tooltip>툴팁입니다.</ui-tooltip>NUXT3 컴포넌트 가이드 제작</h1>
      <div class="t-right">by. 안효주 <ui-tooltip>툴팁입니다.22</ui-tooltip></div>
      <br />
      <br />
      <div class="flex space-between align-center">
        <p><uiButton line @click="incrementCount">count++</uiButton></p>
        <p>Count: {{ count }}</p>
      </div>
      <br />
      <br />
      <br /><br />
      isListScroll : {{ isListScroll }}
      <div class="scroll-wrap">
        <ul ref="listRef" class="sample-list" :class="{ scroll: isListScroll }">
          <li v-for="(item, i) of listAry" :key="i">
            <ui-button :to="item.link" anchor not>
              <badge v-if="item.isNew" small red>NEW</badge>
              {{ item.title }}
            </ui-button>
          </li>
        </ul>
      </div>
      <div class="btn-wrap">
        <div class="flex">
          <uiButton line @click="addList">공지사항 추가</uiButton>
          <uiButton line @click="deleteList">공지사항 삭제</uiButton>
        </div>
      </div>
    </uiInner>
    <uiBottomFixed flex full>
      <uiButton to="/guide/text" primary>Go to Guide</uiButton>
    </uiBottomFixed>
  </uiPage>
</template>
<style lang="scss">
.scroll-wrap {
  height: 277px;
  background: #eee;
  .sample-list {
    height: 100%;
    padding: 10px 0;
    overflow: auto;
    &.scroll {
      li {
        background-color: #b5c6ff;
      }
    }
  }
}
.sample-list {
  border-top: 2px solid #aaa;
  border-bottom: 1px solid #ddd;
  li {
    background-color: #fff;
    + li {
      border-top: 1px solid #ddd;
    }
    > a {
      display: block;
      padding: 1.5rem 1rem;
      line-height: 2rem;
      &:hover {
        font-weight: bold;
        color: var(--primary-color);
      }
      .badge {
        vertical-align: top;
      }
    }
  }
}
</style>
