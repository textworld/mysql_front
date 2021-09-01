<template>
  <div style="padding: 20px 20px;">

    <div class="content-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <div class="container-header">
        <h1>{{ title }}</h1>
      </div>

      <div class="container-body container-table">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZstContainer",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
@left-padding: 10px;


.content-header{
  margin-bottom: 20px;
}
.content-container{
  box-shadow: 0 1px 1px 0 rgba(0, 28, 36, 0.3),1px 1px 1px 0 rgba(0, 28, 36, 0.15),-1px 1px 1px 0 rgba(0, 28, 36, 0.15);
  border-top: 1px solid #eaeded;
  border-radius: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgba(250,250,250,1);
}
.container-header h1{
  text-align: left;
  padding-left: @left-padding;
  font-size: 18px;
}
.demo-form-inline{
  padding-left: @left-padding;
}
.container-body{
  padding: 20px @left-padding;
}

</style>
