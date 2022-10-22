<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片视图 -->
  <el-card>
    <el-table :data="rightsList" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level == 1">一级</el-tag>
          <el-tag v-else-if="scope.row.level == 2" type="success">二级</el-tag>
          <el-tag v-else type="info">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        rightsList: []
      }
    },
    created() {
      this.getRightsList()
    },
    methods: {
      async getRightsList() {
        let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
        const {data: res} = await this.axios.get(url + '/rights/list')
        if (res.code !== '0000') {
          return this.$message.error('请求失败')
        }
        this.rightsList = res.data
      }
    }
}
</script>

<style lang="less" scoped>

</style>