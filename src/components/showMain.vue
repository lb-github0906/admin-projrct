<template>
	<div class="main-contian">
		<div>
			<div id="border-a">
			</div>
			<div class="border-b"></div>
			<div class="border-c"></div>
			<div class="border-d"></div>
			<div class="border-e"></div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name:'sector',
    data() {
      return {
        option:{
          title: {
            text: '某站点用户访问来源',
            top:'5%',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'15%',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              itemStyle:{
                normal:{
                  label:{
                    show: true,
                    formatter: '{b} : {c}'
                  },
                  labelLine :{show:true}
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      let this_ = this;
      let chart = echarts.init(document.getElementById('border-a'));
      chart.setOption(this.option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {chart.resize()});
    },
    methods: {},
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
		#border-a {
			width: 100%;
			height: 300px;
			margin: 0 auto;
		}
		.border-b {
			border: 1px solid #15bcff3d;
			margin: 10px;
			height: 260px;
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