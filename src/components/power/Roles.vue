<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['btbottom', index === 0 ? 'bttop' : '', 'vcenter']" v-for="(item, index) in scope.row.children" :key="item.id">
              <!-- 一级 -->
              <el-col :span="5">
              <el-tag>{{item.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row :class="[index2 === 0 ? '' : 'bttop', 'vcenter']" v-for="(item2, index2) in item.children" :key="item2.id">
                  <el-col :span="6">
                    <!-- 二级权限显示 -->
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限显示 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id" closable @close="editRemove(scope.row, item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="authName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-search" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="50%" @close="closeRight">
      <!-- 树形控件 -->
      <el-tree :data="rightList" :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRightRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rolesList: [],
      dialogVisible: false,
      rightList: [],
      reolesId: '',
      defKeys: [], // 默认的选中的节点数组
      treeProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      const {data: res} = await this.axios.get(url + '/roles')
      if (res.code !== '0000') {
        return this.$message.error('请求失败')
      }
      this.rolesList = res.data
      console.log('res', this.rolesList);
    },
    // 点击删除三级蛋妞
    async editRemove(role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该级别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除！')
      }
      let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      const {data: res} = await this.axios.delete(url + `/roles/:${role.id}/right/:${rightId}`)
      console.log('res', res);
      if (res.code !== '0000') {
        return this.$message.error('删除失败！！')
      }
      // this.getRolesList()
      role.children = res.data // 只更新对应修改地方，不全局刷新页面
    },
    // 展示权限
    async showSetRightDialog(role) {
      this.reolesId = role
      let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      const {data: res} = await this.axios.get(url + '/right/tree')
      console.log('ress', res);
      this.rightList = res.data

      this.getLeafkeys(role, this.defKeys)
      this.dialogVisible = true
    },
    // 递归获取角色下三级权限
    getLeafkeys(role, list) {
      if (!role.children) {
        // 如果当前node节点不包含children属性，则是第三级节点
        return list.push(role.id)
      }
      role.children.forEach(item => 
        this.getLeafkeys(item, list)
      )
    },
    // 监听权限关闭事件
    closeRight() {
      this.defKeys = []
    },
    // 添加角色权限
    async addRightRoles() {
      const keys = [
        this.$refs.treeRef.getCheckedKeys(),
        this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log('keys', keys);
      const str1 = keys.join(',')
      let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      const {data: res} = await this.axios.post(url + `/roles/:${this.reolesId}/rights`, {rids: str1})
      console.log('res', res);
      if (res.mate.status !== 200) {
        return this.$message.error('添加角色失败！')
      }
      this.$message.success('添加角色成功！')
      this.getRolesList()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bttop {
  border-top: 1px solid #eee;
}
.btbottom {
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>