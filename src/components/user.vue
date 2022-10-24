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
          <el-table-column label="手机" prop="Phone"></el-table-column>
          <el-table-column label="状态" prop="scope">
            <!-- 添加模板插槽来加switch按钮控件 -->
            <template slot-scope="scope">
              <!-- scope.row拿到这一行的数据，再对里边的数据源进行选择 -->
              <el-switch v-model="scope.row.scope" @change="changeNew(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="danger" icon="el-icon-edit" circle size="mini" @click="editClick(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="收藏" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button @click="deleteClick(scope.row)" type="danger" icon="el-icon-s-tools" circle size="mini"></el-button>
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
        :before-close="handleClose"
        @close="addDialogClose">
        <!-- 内容显示 -->
          <el-form :model="addForm" :rules="addrules" ref="ruleFormref" label-width="70px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pasw">
              <el-input v-model="addForm.pasw"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="Phone">
              <el-input v-model="addForm.Phone"></el-input>
            </el-form-item>
          </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleTable">取 消</el-button>
          <el-button type="primary" @click="suerClick">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editVisible"
      width="50%"
      @close="closeEdit">
      <el-form :model="editFrom" :rules="editRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pasw">
          <el-input v-model="editFrom.pasw"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editFrom.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="Phone">
          <el-input v-model="editFrom.Phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClickBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加权限对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRightVisible"
      width="50%"
      @close="setRolesDialogClosed">
      <p>当前用户：{{userData.name}}</p>
      <p>当前手机：{{userData.Phone}}</p>
      <p>分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.authName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesAdd">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>

export default {
  data() {
    // 验证邮箱规则
    var checkEmial = (rule, value, callback) => {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (reg.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确邮箱'))
    }
    // 校验手机号
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1([0-9])\d{9}$/
      if (regPhone.test(value)) {
        return callback()
      } else {
        callback(new Error('手机号码不正确'))
      }
      
    }
    return {
      setRightVisible: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pageSize: 2
      },
      total: 200,
      editVisible: false,
      addForm: {
        name: '',
        pasw: '',
        address: '',
        email: '',
        Phone: ''
      },
      editFrom: {},
      // 编辑时校验规则
      editRules: {
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
        Phone:[
          {required: true,message: '手机', trigger: 'blur'},{validator:checkPhone, trigger: 'blur'}
        ],
        email:[
          {required: true,message: '邮箱', trigger: 'blur'}, {validator:checkEmial, trigger: 'blur'}
        ],
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
        Phone:[
          {required: true,message: '手机', trigger: 'blur'},{validator:checkPhone, trigger: 'blur'}
        ],
        email:[
          {required: true,message: '邮箱', trigger: 'blur'}, {validator:checkEmial, trigger: 'blur'}
        ],
      },
      addDialogVisible: false,
      tableData: [{
            date: '2016-05-02',
            id:'1',
            name: '王小虎',
            email: '123456798',
            Phone: '12345648537',
            scope: true,
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            id:'2',
            email: '123456798',
            Phone: '12345648539',
            scope: false,
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            id:'3',
            name: '王小虎',
            email: '123456798',
            Phone: '12345648531',
            scope: true,
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            email: '123456798',
            Phone: '12345648532',
            id:'4',
            scope: true,
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      userData: '',
      rolesList: [],
      selectedRoleId: ''
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
    // 监听关闭事件
    addDialogClose() {
      this.$refs.ruleFormref.resetFields()
    },
    getList() {
      console.log('调用请求列表详情接口');
    },
    // 页码值
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage
    },
    // 取消按钮
    handleClose() {
      this.addDialogVisible = false
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
    // 确定按钮
    suerClick() {
      console.log('this.$refs.ruleFormref', this.$refs.ruleFormref);
      this.$refs.ruleFormref.validate(valid => {
        console.log('valid', valid);
        if (valid) {
          this.addDialogVisible = false
        } else {
          this.$message.error('必填字段未填写！')
        }
      })
    },
    //确定新增角色权限
    saveRolesAdd() {
      if (!this.selectedRoleId) {
        return this.$message.warning('请选择权限人员')
      }
      this.setRightVisible = false
    },
    // 编辑事件
    editClick(id) {
      this.editVisible = true
      let url ='https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      this.axios.get(url + '/editInfo/:'+ id ).then(res => {
        if (res.data && res.data.desc == '成功') {
          this.editFrom = res.data.data.userInfo
        } else {
          return this.$message.error('查询失败！')
        }
      })
    },
    // 监听角色分配关闭情况
    setRolesDialogClosed() {
      this.selectedRoleId = ''
    },
    // 编辑事件取消
    closeEdit() {
      this.$refs.editFormRef.resetFields()
    },
    // 角色分配按钮事件
    async deleteClick(role) {
      this.userData = role

      let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
      const {data: res} = await this.axios.get(url + '/roles')
      if (res.code !== '0000') {
        return this.$message.error('请求数据失败！')
      }
      this.rolesList = res.data

      this.setRightVisible = true
      
    },
    // 编辑事件确定按钮
    editClickBtn() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
         let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
         this.axios.put(url + '/edit/' + this.editFrom.id, {
          Phone: this.editFrom.Phone,
          email: this.editFrom.email,
         })
         .then(res => {
          console.log('res', res);
          if (res.data.data.desc == '成功') {
            this.$message.success('提交成功')
          }
         })
      })
      this.editVisible = false

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