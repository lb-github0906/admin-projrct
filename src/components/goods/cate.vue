<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
			<el-row>
				<el-col>
					<el-button type="primary" class="el-icon-user-solid" @click="showAdUserClick">添加用户</el-button>
				</el-col>
			</el-row>
			<!-- 表格 -->
			<el-row>
				<tree-table
					class="treetabel"
					:data="cateList"
					:columns="columns"
					:selection-type="false"
					:expand-type="false"
					show-index
					index-text="#"
					border>
					<!-- 是否有效的自定义模板区域 -->
					<template slot="isok" slot-scope="scope">
						<i class="el-icon-success"
							v-if="scope.row.cat_deleted === 'false'"
							style="color: lightgreen;"></i>
						<i class="el-icon-error" v-else
						style="color: red;"></i>
					</template>
					<!-- 排序的自定义模板 -->
					<template slot="order" slot-scope="scope">
						<el-tag size="mini" type="success" v-if="scope.row.cat_level === 0">
							等级一
						</el-tag>
						<el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 2">
							等级二
						</el-tag>
						<el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 3">
							等级三
						</el-tag>
					</template>
					<!-- 操作 -->
					<template slot="option" slot-scope="scope">
						<el-button size="mini" type="primary" class="el-icon-edit">
							编辑
						</el-button>
						<el-button size="mini" type="danger" class="el-icon-delete">
							删除
						</el-button>
					</template>
				</tree-table>
			</el-row>
			<!-- 分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 3, 5, 10]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-card>

		<!-- 添加用户对话框  -->
		<el-dialog
			title="添加用户"
			:visible.sync="dialogAddUserVisible"
			width="50%">
			<el-form :model="addRuleForm" :rules="rulesCateRules"
				ref="cateRuleFormRef" label-width="100px" class="demo-ruleForm">
				<el-form-item label="分类名称：" prop="cat_name">
					<el-input v-model="addRuleForm.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="父级分类：">
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancleClick">取 消</el-button>
				<el-button type="primary" @click="checkAddUserClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return  {
			cateList: [],
			addRuleForm: {
				cat_name: '',
				cat_pid: 0,
				cat_level: 0,
			},
			rulesCateRules: {
				cat_name: [
					{required: true, message: '请输入分类名称！', trigger: 'blur'}
				]
			},
			columns: [
				{
					label: '分类名称',
					prop: 'cat_Name'
				},
				{
					label: '是否有效',
					type: 'template',
					template: 'isok'
				},
				{
					label: '排序等级',
					type: 'template',
					template: 'order'
				},
				{
					label: '操作',
					type: 'template',
					template: 'option'
				}
			],
			queryInfo: {
				type: 3,
				pagenum: 1,
				pagesize: 5
			},
			total: 0,
			input1: '',
			input: '',
			dialogAddUserVisible: false
		}
	},
	created() {
		this.getCateList()
	},	
	methods: {
		async getCateList() {
			console.log(' this.queryInfo',  this.queryInfo);
			let url = 'https://www.fastmock.site/mock/5ded1ea9decd89deafbf22e995c7008d/editData'
			const {data: res} = await this.axios.get(url + '/cate/list', {params: this.queryInfo})
			console.log(res);
			this.cateList = res.data
			this.total = res.total
		},
		// 分页变化
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize
			this.getCateList()
		},
		// 当前页码的页数变化
		handleCurrentChange(newPageNum) {
			this.queryInfo.pagenum = newPageNum
			this.getCateList()
		},
		showAdUserClick() {
			this.dialogAddUserVisible = true
		},
		cancleClick() {
			this.dialogAddUserVisible = false
		},
		checkAddUserClick() {
			this.dialogAddUserVisible = false
		}
	}
}
</script>

<style lang="less" scoped>
.treetabel{
	margin-top: 10px;
}
</style>