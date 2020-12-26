<template>
  <div>
    <div
      id="container"
      class="container"
      style="width: 100%; height: 400px"
    ></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
import { Chart } from "highcharts-vue";

import $ from "jquery";

stockInit(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      stockChart: null,

      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
    };
  },
  mounted() {
    console.log("dddd");
    this.createChart();
  },
  methods: {
    createChart() {
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: "",
        },
      });
      $.getJSON(
        "https://demo-live-data.highcharts.com/aapl-c.json",
        function (data) {
          // Create the chart
          this.stockChart = new Highcharts.stockChart("container", {
            rangeSelector: {
              selected: 1,
            },

            title: {
              text: "AAPL Stock Price",
            },

            xAxis: {
              events: {
                // 范围选择器改变的范围最终是改变坐标轴的范围，所以我们监听坐标的极值变更事件函数即可
                afterSetExtremes: function (e) {
                  // e.min 和 e.max 为坐标轴当前的范围
                  console.log(e.min, e.max);
                },
              },
            },
            series: [
              {
                name: "AAPL",
                data: data,
                tooltip: {
                  valueDecimals: 2,
                },
              },
            ],
          });
        }
      );

      $.getJSON(
        "https://data.jianshukeji.com/jsonp?filename=json/aapl-ohlcv.json&callback=?",
        (data) => {
          console.log(data);
          var ohlc = [],
            volume = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [
              [
                "week", // unit name
                [1], // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]],
            ],
            i = 0;
          for (i; i < dataLength; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4], // close
            ]);
            volume.push([
              data[i][0], // the date
              data[i][5], // the volume
            ]);
          }
          // create the chart
          //   this.stockChart = new Highcharts.stockChart("container", {
          //     rangeSelector: {
          //       selected: 1,
          //       inputDateFormat: "%Y-%m-%d",
          //     },
          //     title: {
          //       text: "苹果历史股价",
          //     },
          //     xAxis: {
          //       dateTimeLabelFormats: {
          //         millisecond: "%H:%M:%S.%L",
          //         second: "%H:%M:%S",
          //         minute: "%H:%M",
          //         hour: "%H:%M",
          //         day: "%m-%d",
          //         week: "%m-%d",
          //         month: "%y-%m",
          //         year: "%Y",
          //       },
          //     },
          //     yAxis: [
          //       {
          //         labels: {
          //           align: "right",
          //           x: -3,
          //         },
          //         title: {
          //           text: "股价",
          //         },
          //         height: "60%",
          //         lineWidth: 2,
          //       },
          //       {
          //         labels: {
          //           align: "right",
          //           x: -3,
          //         },
          //         title: {
          //           text: "成交量",
          //         },
          //         top: "65%",
          //         height: "35%",
          //         offset: 0,
          //         lineWidth: 2,
          //       },
          //     ],
          //     series: [
          //       {
          //         type: "candlestick",
          //         name: "AAPL",
          //         color: "green",
          //         lineColor: "green",
          //         upColor: "red",
          //         upLineColor: "red",
          //         tooltip: {},
          //         data: ohlc,
          //         dataGrouping: {
          //           units: groupingUnits,
          //         },
          //       },
          //       {
          //         type: "column",
          //         name: "Volume",
          //         data: volume,
          //         yAxis: 1,
          //         dataGrouping: {
          //           units: groupingUnits,
          //         },
          //       },
          //     ],
          //   });
        }
      );
    },
  },
};
</script>

<style scoped>
</style>