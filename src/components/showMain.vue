<template>
  <div>
		<el-main>
			<div class="containnew" v-if="flag === true">
				<!-- 销售 -->
				<div class="card">
					<div class="card-showpping">
						<div class="all-show">总销售额</div>
						<i class="el-icon-info"></i>
					</div>
					<div class="number">￥1,354,896,635.00</div><br/>
					<div class="baifenbi">
						<div>周同比 12%<i class="el-icon-sort-up"></i></div>
						<div style="padding-left:20px"></div>
						<div>日同比 12%<i class="el-icon-sort-down"></i></div>
					</div><br/>
					<div class="day-show">
						日销售额 ￥42.546
					</div>
				</div>
				<!-- 访问量 -->
				<div class="card">
					<div class="card-showpping">
						<div class="all-show">访问量</div>
						<i class="el-icon-info"></i>
					</div>
					<div class="number">￥1,354,896,635.00</div><br/>
					<div class="baifenbi">
						<div>周同比 12%<i class="el-icon-sort-up"></i></div>
						<div style="padding-left:20px"></div>
						<div>日同比 12%<i class="el-icon-sort-down"></i></div>
					</div><br/>
					<div class="day-show">
						日销售额 ￥42.546
					</div>
				</div>
				<!-- 支付笔数 -->
				<div class="card">
					<div class="card-showpping">
						<div class="all-show">支付笔数</div>
						<i class="el-icon-info"></i>
					</div>
					<div class="number">￥1,354,896,635.00</div><br/>
					<div class="baifenbi">
						<div>周同比 12%<i class="el-icon-sort-up"></i></div>
						<div style="padding-left:20px"></div>
						<div>日同比 12%<i class="el-icon-sort-down"></i></div>
					</div><br/>
					<div class="day-show">
						日销售额 ￥42.546
					</div>
				</div>
				<!-- 活动效果 -->
				<div class="card">
					<div class="card-showpping">
						<div class="all-show">活动效果</div>
						<i class="el-icon-info"></i>
					</div>
					<div class="number">￥1,354,896,635.00</div><br/>
					<div class="baifenbi">
						<div>周同比 12%<i class="el-icon-sort-up"></i></div>
						<div style="padding-left:20px"></div>
						<div>日同比 12%<i class="el-icon-sort-down"></i></div>
					</div><br/>
					<div class="day-show">
						日销售额 ￥42.546
					</div>
				</div>
			</div>
			<div v-else>
				<el-skeleton :rows="6" animated />
			</div>
		</el-main>
	</div>
</template>

<script>
export default {
	data() {
    return {
      flag: true,
    }
  }
}
</script>

<style>
.containnew {
	display: flex;
	flex: 1;
}
.card{
	width: 300px;
	height: 170px;
	padding-left: 15px;
	padding-right: 15px;
	margin-left: 21px;
	background: #fff;
}
.card .card-showpping {
	height: 20px;
	display: flex;
	margin-bottom: 10px;
	justify-content: space-between;
	padding: 10px 5px;
}
.card .card-showpping .all-show {
	border-left:4px solid blue;
	margin-right: 3px;
	padding: 3px;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.card .number {
	float: left;
	font-size: 20px;
}
.card .baifenbi {
	padding-top: 30px;
	padding-bottom: 20px;
	display: flex;
	flex: 1;
	padding-right: 20px;
	border-bottom: 1px solid #999;
}
.card .day-show {
	float: left;
	padding-top: 8px;
	padding-bottom: 15px;
}
/deep/ .el-card__body, .el-main {
	padding-left: 0;
}
</style>