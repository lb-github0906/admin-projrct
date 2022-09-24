<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<img src="../assets/logo.png"/>
				<span>系统名称</span>
			</div>
			<el-button type="primary" @click="back" round>退出</el-button>
		</el-header>
		<el-container>
			<el-aside :width="showToggle === true ? '60px' : '200px'">
				<div class="toggle-btn" @click="btnShow">|||</div>
				<el-menu
				default-active="2"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#123456"
				unique-opened
				:collapse = "showToggle"
				:collapse-transition="false"
				:router="true">
				<!-- 一级菜单 -->
				<el-submenu :index="item.id" v-for="item in systemList" :key="item.id">
					<template slot="title"> <i class="el-icon-location"></i> <span>一级菜单</span> </template>
						<!-- <el-submenu index="1-4"> -->
								<el-menu-item :index="subitem.path" v-for="subitem in item.children" :key="subitem.path">
									<template slot="title"> <i class="el-icon-menu"></i> <span>一级菜单二层</span></template>
								</el-menu-item>
							<!-- </el-submenu> -->
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			showToggle: false,
			systemList: [
				{
					id: '1',
					children: [{
						path: '1'
					}]
				},
				{
					id: '2',
					children: [{
						path: '2'
					}]
				},
				{
					id: '3',
					children: [{
						path: '3'
					}]
				},
			]
		}
	},
	created() {
		this.getessage()
	},
	methods: {
		 async getessage() {
			const result = await axios.get('menus')
			console.log('result', result);
		},
		btnShow() {
			this.showToggle = !this.showToggle
		},
		back() {
			// 清除缓存
			// window.sessionStorage.clear()
			this.$router.go(-1)
		},
		handleOpen () {
			console.log(1111)
		},
		handleClose () {
			console.log(2222)
		},
	}
}
</script>

<style lang="less" scoped>
.home-container {
	height: 100%;
}
.el-header {
	background: #123456;
	display:flex;
	justify-content: space-between;
	padding-left: 0;
	align-content: center;
	color: #fff;
	font-size: 20px;
	> div {
		display: flex;
		align-content: center;
		> span{
			margin-left: 15px;
		}
	}
}
.el-aside {
	background: #999991;
	.el-menu {
		border-right: none;
	}
}
.el-main {
	background: #B3C0D1;
}
.toggle-btn {
	text-align: center;
	font-size: 10px;
	padding: 5px;
	line-height:24px;
	color: #fff;
	letter-spacing: 0.2em;
	cursor: pointer;
}
</style>