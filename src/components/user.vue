<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable @clear="getList()">
              <el-button slot="append" icon="el-icon-search" @click="getList()">搜索</el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button icon="el-icon-search" type="primary" @click="addUser">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" :border="true" :stripe="true">
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <!-- 数据列 -->
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="地址" prop="address"></el-table-column>
          <el-table-column label="日期" prop="date"></el-table-column>
          <el-table-column label="状态" prop="scope">
            <!-- 添加模板插槽来加switch按钮控件 -->
            <template slot-scope="scope">
              <!-- scope.row拿到这一行的数据，再对里边的数据源进行选择 -->
              <el-switch v-model="scope.row.scope" @change="changeNew(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="">
            <template slot-scope="scope" width="180px">
              <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-edit" circle size="mini"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="收藏" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
  </el-card>
  <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        :before-close="handleClose">
        <!-- 内容显示 -->
          <el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="70px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="70px">
            <el-form-item label="密码" prop="pasw">
              <el-input v-model="addForm.pasw"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="70px">
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="70px">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
          </el-form>
        <!-- 地步区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleTable">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pageSize: 2
      },
      total: 200,
      addForm: {
        name: '',
        pasw: '',
        address: '',
        email: '',
      },
      // 新增时校验规则
      addrules: {
        name:[
          {required: true,message: '用户名', trigger: 'blur'},
        ],
        pasw:[
          {required: true,message: '密码', trigger: 'blur'},
          {min:6, max:20,message: '密码位数不对', trigger: 'bulr'}
        ],
        address:[
          {required: true,message: '地址', trigger: 'blur'},
        ],
        email:[
          {required: true,message: '邮箱', trigger: 'blur'},
        ],
      },
      addDialogVisible: false,
      tableData: [{
            date: '2016-05-02',
            id:'1',
            name: '王小虎',
            email: '123456798',
            scope: true,
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            id:'2',
            email: '123456798',
            scope: false,
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            id:'3',
            name: '王小虎',
            email: '123456798',
            scope: true,
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            email: '123456798',
            id:'4',
            scope: true,
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  methods: {
    // 监听页面变化情况
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      // 获取完页面数量之后，重新请求接口即可加载新页面数据
      this.tableData
    },
    getList() {
      console.log('调用请求列表详情接口');
    },
    // 页码值
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage
    },
    handleClose() {
      console.log('handleClose');
    },
    // 添加
    addUser() {
      this.addDialogVisible = true
    },
    // 取消新增
    cancleTable() {
      this.addDialogVisible = false
      this.addForm = {}
    },
    async changeNew(info) {
      console.log(info)
      const result = await this.axios.put(`user/${info.id}/state/${info.scope}`)
      console.log('result', result);
      if (result.meta.status !== 200) {
        info.scope = !info.scope
        return this.$message.error('处理失败！')
      }
      return this.$message.error('处理成功！')
    }
  }
}
</script>

<style>

</style>