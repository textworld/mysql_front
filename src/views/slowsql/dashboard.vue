<template>
  <ZstContainer title="慢SQL仪表盘">
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </ZstContainer>
</template>

<script>
import ZstContainer from "@/components/ZstContainer"
import * as echarts from 'echarts';
import {getAggsByDate} from '@/api/schema_info'
import * as moment from 'moment'
import * as _ from 'lodash'
export default {
  name: "dashboard",
  components: {ZstContainer},
  data(){
    return {
      timeRange: [new Date() - 3600 * 1000 * 24 * 70, new Date()],
      queryParams: {
        start: "",
        end: "",
      },
    }
  },
  mounted() {


    console.log('date to string', new Date().toString())
    this.loadChartData()
  },
  methods: {
    convertToEchartsData(arr){
      let data = []
      for (let i = 0; i < arr.length; i++){
        let serverData = arr[i]
        let name = ""
        _.forEach(serverData.tags, (v, k) => {
          name += k + "=" + v + ","
        })
        name = name.substr(0, name.length - 1)
        let line = {
          name: name,
          type: 'line',
          data: serverData.vals
        }
        data.push(line)
      }
      return data
    },
    loadChartData(){
      let start = moment(this.timeRange[0]).unix()*1000
      console.log(start)
      this.queryParams.start = moment(this.timeRange[0]).unix()*1000
      this.queryParams.end = moment(this.timeRange[1]).unix()*1000
      getAggsByDate(this.queryParams).then((resp) => {
        console.log('date by resp', resp)

        var myChart = echarts.init(this.$refs.chart);
        myChart.setOption({
          title: {
            text: '慢SQL趋势图'
          },
          legend: {
            show: true,

          },
          dataZoom: [{
            type: 'slider'
          }, {
            type: 'inside'
          }],
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'time',
            boundaryGap: false,

          },
          yAxis: {
            type: 'value'
          },
          series: this.convertToEchartsData(resp.data)
        });
      })
    }
  }
}
</script>

<style scoped>

</style>
