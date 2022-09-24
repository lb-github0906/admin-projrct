<template>
	<div class="main-contian">
		<div>
			<div id="border-m">
				<data-charts></data-charts>
				<div class="btnclick">
					<el-button type="primary" @click="showMsg()">跳转页面</el-button>
				</div>
			</div>
			<div class="border-b">
				<net-charts></net-charts>
			</div>
			<div class="border-c">
				<eachartsbingtu></eachartsbingtu>
			</div>
			<div class="border-d"></div>
			<div class="border-e"></div>
		</div>
	</div>
</template>

<script>
import dataCharts from '../charts/dataCharts.vue'
import NetCharts from '../page/netCharts.vue'
import Eachartsbingtu from '../charts/eachartsbingtu.vue'
export default {
  components: { dataCharts, NetCharts, Eachartsbingtu },
    name:'sector',
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
			showMsg() {
				// 缓存
				// window.sessionStorage.setItem('token', 'ssssdasdasdadasdasdasda')
				this.$router.push('/showMessage')
			}
		},
    watch: {},
    created() {
    }
  }
</script>

<style lang="less" scoped>
	.main-contian {
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		justify-content: space-between;
		background: #15bcff3d;
		word-break: normal;
		#border-m {
			width: 60%;
			height: 300px;
			display: flex;
			margin: 0 auto;
			.btnclick {
				flex: 1;
				position: relative;
				float: right;
				padding-top: 10px;
			}
		}
		.border-b {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 400px;
			width: 760px;
			background: #cb6d0f33;
		}
		.border-c {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 480px;
			width: 860px;
			background: #cb6d0f33;
		}
		.border-d {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 300px;
			width: 660px;
			background: #cb6d0f33;
		}
		.border-e {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 380px;
			width: 660px;
			background: #cb6d0f33;
		}
	}
</style>