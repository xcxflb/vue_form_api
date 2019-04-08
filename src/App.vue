<template>
  <el-container id="app">
    <el-header>
      <el-menu
        :default-active="$route.path"
        :show-timeout="0"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-submenu index="/editor">
          <template slot="title">编辑器</template>
          <el-menu-item index="/editor/form">表单</el-menu-item>
          <el-menu-item index="/editor/table">表格</el-menu-item>
        </el-submenu>
        <el-menu-item index="/preview">预览</el-menu-item>
        <el-menu-item index="/model">模型管理</el-menu-item>
        <el-menu-item index="/app">应用增加接口</el-menu-item>
         <el-menu-item index="/appcate">应用管理</el-menu-item>
          <el-menu-item index="/imgmanage">图片管理</el-menu-item>
          <el-menu-item index="/user">用户管理</el-menu-item>
      </el-menu>
      <theme-picker id="theme-picker" ></theme-picker>
    </el-header>
    <router-view ></router-view>
    <div class='footer_box'><div class='center_msg'>api运营管理工具 -- design by api</div></div>
  </el-container>
</template>

<script>
import ThemePicker from '@/components/themePicker';

export default {
  components: { ThemePicker },
};
</script>

<style lang="less">
html,
body,
#app {
  margin: 0;
  font-size: 14px;
  height: 100%;
}
.el-header {
  padding: 0 !important;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.c666 {
  color: #606266;
}
.mt5 {
  margin-top: 5px;
}
#theme-picker {
  position: fixed;
  right: 10px;
  top: 10px;
}
.footer_box {
  color: #606266;
  position: fixed;
  bottom: 2px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.center_msg {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
