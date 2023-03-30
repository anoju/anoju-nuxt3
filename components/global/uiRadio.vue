<template>
  <div :class="radioClass">
    <label v-if="right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <input
      :id="radioId"
      ref="radio"
      type="radio"
      :checked="shouldBeChecked"
      :value="value"
      :class="inputClass"
      :title="title"
      :disabled="disabled"
      :name="name"
      v-bind="$attrs"
      @click="clickEvt"
      @focus="isFocus = true"
      @blur="isFocus = false"
    /><i aria-hidden="true" />
    <label v-if="!right && !!$slots.default" class="lbl" :class="lblClass" :style="lblStyle" :for="radioId">
      <slot />
    </label>
    <div v-if="!!$slots.summary" class="lbl-child">
      <slot name="summary" />
    </div>
    <slot name="last" />
  </div>
</template>

<script>
let uuid = 0;
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    inputId: { type: String, default: null },
    inputClass: { type: String, default: null },
    title: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    size: { type: String, default: null },
    small: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    checkbox: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    box: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    value: { type: [String, Number], default: null, require: true },
    modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
    trueValue: { type: Boolean, default: true },
    falseValue: { type: Boolean, default: false },
    lblClass: { type: String, default: null },
    lblStyle: { type: String, default: null },
    name: { type: String, default: null },
    dblclick: { type: Function, default: null }
  },
  data() {
    return {
      isFocus: false,
      checkedState: false,
      isDblclick: false,
      dblclickTime: null
    };
  },
  computed: {
    radioId() {
      let rtnVal = `rdo_${this.uuid}`;
      if (this.inputId) rtnVal = this.inputId;
      return rtnVal;
    },
    shouldBeChecked() {
      return this.modelValue === this.value;
    },
    sizeClass() {
      let rtnVal = null;
      if (this.small || this.large) {
        if (this.small) rtnVal = 'small';
        if (this.large) rtnVal = 'large';
      } else if (this.size) {
        rtnVal = this.size;
      }
      return rtnVal;
    },
    radioClass() {
      return [
        {
          radio: !this.checkbox,
          checkbox: this.checkbox,
          block: this.block,
          box: this.box,
          btn: this.button,
          focus: this.isFocus,
          disabled: this.disabled,
          checked: this.checkedState
        },
        this.sizeClass
      ];
    }
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  mounted() {
    if (this.shouldBeChecked) this.checkedState = true;
  },
  updated() {
    if (this.shouldBeChecked) {
      this.checkedState = true;
    } else {
      this.checkedState = false;
    }
  },
  methods: {
    /*
    updateInput() {
      this.$emit('change', this.value);
    },
    */
    focus() {
      this.$refs.radio.focus();
    },
    clickEvt() {
      if (!this.disabled) {
        if (this.dblclick !== null) {
          if (this.isDblclick) {
            clearTimeout(this.dblclickTime);
            this.isDblclick = false;
            this.dblclick();
          } else {
            this.isDblclick = true;
            this.dblclickTime = setTimeout(() => {
              this.isDblclick = false;
            }, 300);
          }
        }
      }
      if (this.button && this.$el.closest('.btn_toggle_row') !== null) {
        const wrap = this.$el.closest('.btn_toggle_row');
        const sclWidth = wrap.scrollWidth;
        if (wrap.offsetWidth < sclWidth) {
          this.sclCenter(this.$el);
        }
      }
    },
    sclCenter(el) {
      const wrap = this.$el.closest('.btn_toggle_row');
      const elX = el.offsetLeft;
      const elW = el.offsetWidth;
      const sclLeft = elX - wrap.offsetWidth / 2 + elW / 2;
      this.$scrollTo(wrap, { left: sclLeft }, 300);
    }
  }
};
</script>
