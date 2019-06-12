<template>
  <div>
    <div class="vux-demo">
      <dynamic-form :formConfig.sync="screenConfig" v-model="formData"/>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
import dynamicForm from "./vux-dynamic-form-item";
export default {
  components: {
    Group,
    Cell,
    dynamicForm
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      formData: {},
      screenConfig: {
        inline: true,
        labelPosition: "right",
        labelWidth: "",
        size: "small",
        statusIcon: true,
        formItemList: [
          {
            type: "text",
            value: "姓名",
            width: "100%",
            height: "2em",
            align: "left",
            backgroundColor: "#fbf9fe",
            fontSize: "15px",
            fontWeight: "500",
            fontColor: "#aaa",
            padding: "0 10px",
            margin: "0"
          },
          {
            type: "input",
            label: "姓名:",
            disable: false,
            readonly: false,
            value: "王大树",
            placeholder: "请输入姓名",
            rules: [],
            key: "name",
            subtype: "text",
            title: "姓名"
          },
          {
            type: "input",
            label: "昵称:",
            disable: false,
            readonly: false,
            value: "",
            placeholder: "请输入姓名",
            rules: [],
            key: "name",
            subtype: "text",
            title: ""
          },
          {
            type: "text",
            value: "性别",
            width: "100%",
            height: "2em",
            align: "left",
            backgroundColor: "#fbf9fe",
            fontSize: "15px",
            fontWeight: "500",
            fontColor: "#aaa",
            padding: "0 10px",
            margin: "0"
          },
          {
            type: "select",
            label: "性别",
            value: "1",
            button: false,
            border: true,
            rules: [],
            key: "gender",
            title: "性别",
            options: [
              {
                value: "男",
                key: "1",
                label: "男",
                disabled: false
              },
              {
                value: "女",
                key: "2",
                label: "女",
                disabled: false
              }
            ]
          },
           {
            type: "text",
            value: "需求描述",
            width: "100%",
            height: "2em",
            align: "left",
            backgroundColor: "#fbf9fe",
            fontSize: "15px",
            fontWeight: "500",
            fontColor: "#aaa",
            padding: "0 10px",
            margin: "0"
          },
          {
            type: "radio",
            label: "籍贯",
            value: "安徽",
            button: false,
            border: true,
            rules: [],
            key: "address",
            options: [
              {
                value: "安徽",
                key: "1",
                label: "安徽",
                disabled: false
              },
              {
                value: "北京",
                key: "2",
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
            value: "请开始你的表演",
            placeholder: "请开始你的表演",
            rules: [],
            rows: 8,
            cols: 30,
            key: "descript",
            subtype: "textarea"
          },
          {
            type: "text",
            value: "描述",
            width: "100%",
            height: "2em",
            align: "left",
            backgroundColor: "#fbf9fe",
            fontSize: "15px",
            fontWeight: "500",
            fontColor: "#aaa",
            padding: "0 10px",
            margin: "0"
          },
          {
            type: "upload",
            label: "上传图片",
            action: "http:www.fmc.com",
            listType: "picture-card",
            readonly: true,
            showHead: false,
            handleClick: true,
            params: {},
            max: 5,
            rules: []
          }
        ]
      }
    };
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
