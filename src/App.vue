<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
.weui-cells {
  margin-top: 0 !important;
}
.weui-cells:before{
  border-top: none!important;
}
</style>
