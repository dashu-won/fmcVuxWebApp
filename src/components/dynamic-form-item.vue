<template>
  <el-form-item :rules="item.Rules" :label="item.label" :prop="item.key">
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      v-on="$listeners"
      :type="item.subtype"
      :placeholder="item.placeholder"
      :disabled="item.disable"
      :readonly="item.readonly"
      :autosize="item.autosize"
    ></el-input>
    <el-input
      v-else-if="item.type==='textarea'"
      v-bind="$attrs"
      v-on="$listeners"
      :type="item.subtype"
      :placeholder="item.placeholder"
      :disabled="item.disable"
      :readonly="item.readonly"
      :autosize="item.autosize"
    ></el-input>
    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      v-on="$listeners"
      :multiple="item.multiple"
      :disabled="item.disabled"
      :multiple-limit="item.multipleLimit"
    >
      <el-option
        v-for="o in item.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled"
      ></el-option>
    </el-select>
    <el-radio-group
      v-else-if="item.type==='radio'"
      v-bind="$attrs"
      v-on="$listeners"
      :disabled="item.disabled"
    >
      <el-radio
        v-for="o in item.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled"
      ></el-radio>
    </el-radio-group>
    <el-upload
      v-else-if="item.type==='upload'"
      v-bind="$attrs"
      v-on="$listeners"
      v-bind:action="item.action"
      :list-type="item.listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <span v-else>未知控件类型</span>
  </el-form-item>
</template>
<script>
export default {
  name: "dynamicFormItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {},
  methods: {
    handlePictureCardPreview() {},
    handleRemove() {}
  }
};
</script>