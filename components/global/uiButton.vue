<template>
  <NuxtLink v-if="!!to && target !== '_blank'" ref="button" :to="to" :class="buttonClass" :title="title" @focus="isFocus = true" @blur="isFocus = false">
    <slot />
  </NuxtLink>
  <a
    v-else-if="aTag"
    ref="button"
    role="button"
    :href="href"
    :class="buttonClass"
    :title="title"
    :target="target"
    v-bind="$attrs"
    @focus="isFocus = true"
    @blur="isFocus = false"
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
  <button
    v-else
    ref="button"
    type="button"
    :class="buttonClass"
    :disabled="disabled"
    :title="title"
    v-bind="$attrs"
    @focus="isFocus = true"
    @blur="isFocus = false"
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
  </button>
</template>

<script lang="ts">
let dblclickTime: ReturnType<typeof setTimeout> | null = null;

export default {
  props: {
    type: { type: String, default: 'button' },
    title: { type: String, default: null },
    target: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    noEffect: { type: Boolean, default: false },
    dblclick: { type: Function, default: null },

    // 링크이동
    to: { type: String, default: null },

    // a태그 설정(링크이동X)
    aTag: { type: Boolean, default: false },
    href: { type: String, default: '#' },

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
  },
  data() {
    return {
      isApp: false,
      colorType: ['primary', 'gray', 'gray2', 'gray3'],
      sizeType: ['h60', 'h52', 'h38', 'h32', 'h24'],
      isFocus: false,
      isClick: false,
      btnInW: 0,
      btnInH: 0,
      btnInX: 0,
      btnInY: 0,
      btnTxt: null,
      isDblclick: false
    };
  },
  computed: {
    $color() {
      if (this.color) {
        if (this.colorType.indexOf(this.color) > -1) {
          return this.color;
        }
        return null;
      }
      if (this.primary) return 'primary';
      if (this.gray) return 'gray';
      if (this.gray2) return 'gray2';
      if (this.gray3) return 'gray3';
      return null;
    },
    $size() {
      if (this.size) {
        if (this.sizeType.indexOf(this.size) > -1) {
          return this.size;
        }
        return null;
      }
      if (this.h60) return 'h60';
      if (this.h52) return 'h52';
      if (this.h38) return 'h38';
      if (this.h32) return 'h32';
      if (this.h24) return 'h24';
      return null;
    },
    buttonClass() {
      let $class: any = this.btnClass;
      if (this.not) $class = this.notClass;
      if (this.link) $class = this.linkClass;
      return $class;
    },
    btnClass() {
      return [
        'button',
        {
          focus: this.isFocus,
          not: this.not,
          round: this.round,
          round2: this.round2,
          line: this.line,
          line2: this.line2,
          icon: this.icon,
          disabled: this.disabled,
          'btn-clicking-active': this.isClick
        },
        this.$color,
        this.$size
      ];
    },
    notClass() {
      return [
        'button',
        {
          focus: this.isFocus,
          not: this.not,
          disabled: this.disabled
        }
      ];
    },
    linkClass() {
      return [
        'btn-link',
        {
          focus: this.isFocus,
          line: this.line,
          disabled: this.disabled
        },
        this.$color
      ];
    }
  },
  methods: {
    clickEvt(e: any): void {
      if (this.aTag && this.href === '#') e.preventDefault();
      const isChecked = this.$el.classList.contains('checked');
      if (!this.disabled) {
        if (this.target === '_blank' && this.isApp && (!!this.to || !!this.href)) {
          e.preventDefault();
          const url = this.to !== null ? this.to : this.href;
          this.linkTo(url);
        }
        if (this.dblclick !== null) {
          if (this.isDblclick) {
            if (!!dblclickTime) {
              clearTimeout(dblclickTime);
              dblclickTime = null;
            }
            this.isDblclick = false;
            this.dblclick();
          } else {
            this.isDblclick = true;
            if (!dblclickTime) {
              dblclickTime = setTimeout(() => {
                this.isDblclick = false;
              }, 300);
            }
          }
        }
        if (!this.noEffect && !this.isClick) this.clickEffect(e);
      }
    },
    clickEffect(e: any): void {
      const _this = this;
      _this.isClick = true;
      const { $el } = this;
      _this.btnTxt = $el.textContent;
      setTimeout(() => {
        if (_this.btnTxt !== $el.textContent) return;
        const $btnMax = Math.max($el.offsetWidth, $el.offsetHeight);
        _this.btnInW = $btnMax;
        _this.btnInH = $btnMax;
        _this.btnInX = e.clientX - $el.getBoundingClientRect().left - $btnMax / 2;
        _this.btnInY = e.clientY - $el.getBoundingClientRect().top - $btnMax / 2;
      }, 10);
    },
    clickEndEvt(): void {
      this.isClick = false;
    },
    linkTo(url: string): void {
      // window.location.href = appUtil.linkBrowser(url);
    }
  }
};
</script>
