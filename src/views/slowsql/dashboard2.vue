<template>
  <ZstContainer title="慢SQL告警设置">
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </ZstContainer>
</template>

<script>
import ZstContainer from "@/components/ZstContainer"
import * as echarts from 'echarts';


export default {
  name: "dashboard2",
  components: {ZstContainer},
  created() {
  },
  mounted() {
    var myChart = echarts.init(this.$refs.chart); // dom
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
}
</script>

<style scoped>

</style>
