<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
     components: {
        highcharts: Chart
    },
  data() {
    return {
        stockChart: null,
        chartOptions: {
                series: [{
                    data: [1, 2, 3] // sample data
                }]
            }
    };
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
</style>