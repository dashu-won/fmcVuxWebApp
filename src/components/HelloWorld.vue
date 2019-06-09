<template>
  <div class="hello">
    <dynamic-form :formConfig.sync="someConfig" v-model="someData"/>
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
        name:"",
        gender:""
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
            value: "",
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
</style>
