<template>
  <el-form
    class="dynamic-form"
    :inline="formConfig.inline"
    :model="value"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size="formConfig.size"
    :status-icon="formConfig.statusIcon"
  >
    <dynamicFormItem
      v-for="item in formConfig.formItemList"
      :key="item.key"
      :item="item"
      :value="value[item.key]"
      @input="handleInput($event, item.key)"
    ></dynamicFormItem>
  </el-form>
</template>
<script>
import dynamicFormItem from "./dynamic-form-item";
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
  data() {
    return {
      formConfigChild: {}
    };
  },
  components: {
    dynamicFormItem
  },
  watch: {},
  methods: {
    handleInput(val, key) {
      // 这里element-ui没有上报event，直接就是value了
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