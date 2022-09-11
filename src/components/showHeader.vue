<template>
  <el-header>
    <div class="contain">
			<div class="contain-item">
					<el-button round  class="search-lan">语言切换</el-button>
			</div>
			<div class="contain-item"><i class="el-icon-bell"></i></div>
			<div class="contain-item">
				<el-avatar style="margin-top:10px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				<div>123456</div>
			</div>
			<div class="contain-item">
				<div class="detial">
					<i style="padding-top:25px; padding-right:10px" class="el-icon-search"></i>
					<el-input v-model="input" placeholder="请输入内容"></el-input></div>
				</div>
    </div>
  </el-header>
</template>

<script>
export default {
	data() {
		return {
			 input: ''
		}
	}
}
</script>

<style>
 .contain {
	flex: 1;
 }
 .contain .contain-item{
	float: right;
	padding-right: 10px;
 }
 .contain .contain-item .search-lan{
	height: 30px;
	font-size: 10px;
	width: 88px;
	text-align: center;
 }
 .contain .contain-item .detial{
	display: flex;
 }
 /deep/ .el-input{
	background: #B3C0D1;
	width: 0px;
 }
</style>