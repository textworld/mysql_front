<template>
  <div>
    <div id="container" style="width: 100%; height: 300px"></div>
    <el-row :gutter="20">
      <el-col :span="12">
        <highcharts :options="schemaPieOptions"></highcharts>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-bottom: 10px"
          height="400"
        >
        <el-table-column prop="schema" label="库名" width="80"></el-table-column>
        <el-table-column prop="finger" label="finger"></el-table-column>
        <el-table-column prop="count" label="count" width="80"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
stockInit(Highcharts);

import { Chart } from "highcharts-vue";

import $ from "jquery";

import * as moment from "moment";

import { getAggsBySchema, getAggsByDate, getTop10 } from "@/api/slowsql";

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      tableData: [],
      queryParams: {
        start: "",
        end: "",
      },
      stockChart: null,
      timeRange: [new Date() - 3600 * 1000 * 24 * 7, new Date()],
      schemaPieOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "各数据库慢SQL占比",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black",
              },
            },
          },
        },
        series: [
          {
            name: "库名",
            colorByPoint: true,
            data: [
              {
                name: "Chrome",
                y: 61.41,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.updateQueryParams = _.debounce(
      function (startMsFloat, endMsFloat) {
        console.log("update time range");
        let startTime = _.toInteger(startMsFloat) / 1000;
        let endTime = _.toInteger(endMsFloat) / 1000;
        this.queryParams.start = moment.unix(startTime).format();
        this.queryParams.end = moment.unix(endTime).format();
        console.log(this.queryParams);
        this.$emit("updateQueryParams");
      }.bind(this),
      250
    );
    this.$on(
      "updateQueryParams",
      function () {
        console.log("query params has changed");
        this.doSearch();
      }.bind(this)
    );
  },
  mounted() {
    console.log("dddd");
    this.createChart();
    this.doSearch();
  },

  methods: {
    createChart() {
      let that = this;
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: "",
        },
      });
      getAggsByDate(this.queryParams).then((resp) => {
        let chartData = [];
        _.forEach(resp.data, (v) => {
          chartData.push([moment(v["date"]).unix() * 1000, v["date_count"]]);
        });
        console.log("chartData", chartData);
        this.stockChart = new Highcharts.stockChart("container", {
          rangeSelector: {
            selected: 1,
          },

          title: {
            text: "每日慢SQL数量",
          },

          xAxis: {
            events: {
              // 范围选择器改变的范围最终是改变坐标轴的范围，所以我们监听坐标的极值变更事件函数即可
              afterSetExtremes: function (e) {
                // e.min 和 e.max 为坐标轴当前的范围
                console.log(e.min, e.max);
                that.updateQueryParams(e.min, e.max);
              },
            },
          },
          series: [
            {
              name: "数量",
              data: chartData,
              tooltip: {
                valueDecimals: 2,
              },
            },
          ],
        });
      });
    },
    doSearch() {
      getTop10(this.queryParams).then(resp=> {
        this.tableData = resp.data
      })

      getAggsBySchema(this.queryParams).then((resp) => {
        const reducer = (accumulator, item) =>
          accumulator + item["schema_count"];
        let countAll = resp.data.reduce(reducer, 0);
        this.schemaPieOptions.series[0].data = resp.data.map((v) => {
          return {
            name: v["schema"],
            y: v["schema_count"] / countAll,
          };
        });
      });
    },

  },
};
</script>

<style scoped>
</style>