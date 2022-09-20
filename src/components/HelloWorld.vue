<template>
  <div class="contain">
    <el-container>
      <ShowAside></ShowAside>
      <el-container>
        <ShowHeader></ShowHeader>
        <ShowMain></ShowMain>
        <el-footer style="height: 50px;">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ShowAside from './showAside.vue'
import ShowHeader from './showHeader.vue'
import ShowMain from '../components/showMain'
  
export default {
  components: {
    ShowAside,
    ShowMain,
    ShowHeader
  },
  
}
</script>

<style lang="less" scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  
  .el-main {
    height: 585px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 10px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>