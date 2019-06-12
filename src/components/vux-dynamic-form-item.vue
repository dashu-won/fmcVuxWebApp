<template>
  <div
    class="dynamic-form"
    :inline="formConfig.inline"
    :model="value"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size="formConfig.size"
    :status-icon="formConfig.statusIcon"
  >
    <group
      v-for="item in formConfig.formItemList"
      :key="item.key"
      :value="value[item.key]"
      @input="handleInput($event, item.key)"
    >
      <x-input
        v-if="item.type==='input'"
        v-bind="$attrs"
        v-on="$listeners"
        :type="item.subtype"
        :title="item.label"
        :placeholder="item.placeholder"
        :disabled="item.disable"
        :readonly="item.readonly"
      ></x-input>
      <selector
        v-if="item.type==='select'"
        v-bind="$attrs"
        v-on="$listeners"
        :title="item.label"
        :options="item.options"
        :placeholder="item.placeholder"
        :disabled="item.disable"
        :readonly="item.readonly"
      ></selector>
      <x-textarea
        v-if="item.type==='textarea'"
        v-bind="$attrs"
        v-on="$listeners"
        :title="item.label"
        :placeholder="item.placeholder"
        :show-counter="false"
        :rows="item.rows"
        :cols="item.cols"
      ></x-textarea>
      <x-radio v-if="item.type==='radio'" v-bind="$attrs" v-on="$listeners" :options="item.options"></x-radio>
      <uploader
        v-if="item.type==='upload'"
        :files="[]"
        v-bind="$attrs"
        v-on="$listeners"
        :url="item.action"
        @onChange="onChange"
        @onCancel="onCancel"
        @onSuccess="onSuccess"
        @onError="onError"
      ></uploader>
      <div
        v-else-if="item.type==='text'"
        :style="{width:item.width,
        padding:item.padding,
        margin:item.margin,
        height:item.height,
        lineHeight:item.height,
        textAlign:item.align,
    backgroundColor: item.backgroundColor,
    fontSize: item.fontSize,
    fontWeight:item.fontWeight,
    color:item.fontColor}"
      >{{item.value}}</div>
      <span v-else style="display:none"></span>
    </group>
  </div>
</template>
<script>
import Uploader from "vux-uploader-component";
export default {
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  components: {
    Uploader
  },
  data() {
    return {
      formConfigChild: {}
    };
  },
  watch: {},
  methods: {
    onChange() {},
    onCancel() {},
    onSuccess() {},
    onError() {},
    handleInput(val, key) {
      // 这里没有上报event，直接就是value了
      this.$emit("input", { ...this.value, [key]: val });
    },
    setDefaultValue() {
      const formData = { ...this.value }; // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value;
        }
      });
      this.$emit("input", formData);
    }
  },
  mounted() {
    this.setDefaultValue();
  }
};
</script>