<template>
  <div class="con1">
    <div id="border-a">
			</div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
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
      window.addEventListener('resize', function() {chart.resize()});
    }
}
</script>

<style lang="less" scoped>
  .con1 {
    height: auto;
    width: 100%;
    #border-a {
			width: 100%;
			height: 300px;
			margin: 0 auto;
		}
  }

</style>