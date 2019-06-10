<template>
  <div class="hello">
    <dynamic-form :formConfig.sync="someConfig" v-model="someData"/>
    <el-button type="primary" :round="true">提交列表按钮</el-button>
  </div>
</template>

<script>
import dynamicForm from "./dynamicForm";
export default {
  name: "HelloWorld",
  components: {
    dynamicForm
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      someData: {
        name: "ddd",
        gender: "1",
        address: "安徽",
        descript:""
      },
      someConfig: {
        inline: true,
        labelPosition: "right",
        labelWidth: "",
        size: "small",
        statusIcon: true,
        formItemList: [
          {
            type: "input",
            label: "姓名",
            disable: false,
            readonly: false,
            value: "",
            placeholder: "请输入姓名",
            rules: [],
            key: "name",
            subtype: "text"
          },
          {
            type: "select",
            label: "性别",
            value: "1",
            button: false,
            border: true,
            rules: [],
            key: "gender",
            options: [
              {
                value: "1",
                label: "男",
                disabled: false
              },
              {
                value: "0",
                label: "女",
                disabled: false
              }
            ]
          },
          {
            type: "radio",
            label: "籍贯",
            value: "",
            button: false,
            border: true,
            rules: [],
            key: "address",
            options: [
              {
                value: "安徽",
                label: "安徽",
                disabled: false
              },
              {
                value: "北京",
                label: "北京",
                disabled: false
              }
            ]
          },
          {
            type: "textarea",
            label: "描述",
            disable: false,
            readonly: false,
            value: "",
            placeholder: "请开始你的表演",
            rules: [],
            key: "descript",
            subtype: "textarea"
          }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 400px;
  margin: 0 auto;
}
</style>
