<script lang="ts" setup>
useHead({
  title: '페이지 제목'
});

const count: Ref<number> = ref(0);
const rdoVal: Ref<string> = ref('');
const chkVal: Ref<boolean> = ref(false);
const chkVal2: Ref<string> = ref('N');
const inpVal: Ref<string> = ref('');
const tabVal = ref(0);
const tabVal2 = ref(0);

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
      <h1 class="tit-h1">NUXT3 컴포넌트 가이즈 제작</h1>
      <p class="t-right">by. 안효주</p>
      <br />
      <br />
      <div class="flex space-between align-center">
        <p><uiButton line @click="incrementCount">count++</uiButton></p>
        <p>Count: {{ count }}</p>
      </div>
      <br />
      <div class="flex full">
        <uiRadio v-model="rdoVal" button value="남자">남자</uiRadio>
        <uiRadio v-model="rdoVal" button value="여자">여자</uiRadio>
      </div>
      <br />
      {{ rdoVal }}
      <br />
      <br />
      <div>
        <uiCheckbox v-model="chkVal">선택1</uiCheckbox>
        <uiCheckbox v-model="chkVal2" small true-value="Y" false-value="N">선택2</uiCheckbox>
        <br />
        <br />
        {{ chkVal }}, {{ chkVal2 }}
      </div>
      <br />
      <uiInput v-model="inpVal"></uiInput>
      <br />
      {{ inpVal }}
      <br />
      <uiTabs v-model="tabVal">
        <uiTab>메뉴명1</uiTab>
        <uiTab>메뉴명2</uiTab>
        <uiTab>메뉴명3</uiTab>
      </uiTabs>
      <div v-show="tabVal === 0">
        컨텐츠1 <br />
        컨텐츠1 <br />
        컨텐츠1 <br />
        컨텐츠1 <br />
        컨텐츠1 <br />
      </div>
      <div v-show="tabVal === 1">
        컨텐츠2 <br />
        컨텐츠2 <br />
        컨텐츠2 <br />
      </div>
      <div v-show="tabVal === 2">
        컨텐츠3 <br />
        컨텐츠3 <br />
        컨텐츠3 <br />
        컨텐츠3 <br />
        컨텐츠3 <br />
        컨텐츠3 <br />
        컨텐츠3 <br />
      </div>
      <br /><br />
      <uiTabs v-model="tabVal2">
        <uiTab>메뉴명1</uiTab>
        <uiTab>메뉴명2</uiTab>
        <uiTab>메뉴명3</uiTab>
      </uiTabs>
      {{ tabVal2 }}
      <uiTabPanels v-model="tabVal2">
        <uiTabPanel>
          컨텐츠1 <br />
          컨텐츠1 <br />
          컨텐츠1 <br />
          컨텐츠1 <br />
          컨텐츠1 <br />
        </uiTabPanel>
        <uiTabPanel>
          컨텐츠2 <br />
          컨텐츠2 <br />
          컨텐츠2 <br />
        </uiTabPanel>
        <uiTabPanel>
          컨텐츠3 <br />
          컨텐츠3 <br />
          컨텐츠3 <br />
          컨텐츠3 <br />
          컨텐츠3 <br />
          컨텐츠3 <br />
          컨텐츠3 <br />
        </uiTabPanel>
      </uiTabPanels>
      <br /><br />
      <ul class="sample-list">
        <li v-for="(item, i) of listAry" :key="i">
          <a :href="item.link">
            <i v-if="item.isNew">NEW</i>
            {{ item.title }}
          </a>
        </li>
        <!-- <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>
        <li><a href="">공지사항입니다.</a></li>-->
      </ul>
      <div style="background-color: #f1f1f1; height: 200vh" class="mt-30"></div>
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
      padding: 1rem;
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
