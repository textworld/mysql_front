<template>
  <div style="padding: 20px 40px;">
    <div class="content-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>慢SQL查询列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-container">
      <div class="container-header">
        <h1>慢SQL查询列表</h1>
      </div>
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="">
          <el-date-picker
              size="mini"
              v-model="timeRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="">
          <SchemaSearch
              size="mini"
              v-model="queryParams.schema"
              placeholder="选择库"
          ></SchemaSearch>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="sql_id" v-model="queryParams.sql_id" size="mini" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="sql关键词" v-model="queryParams.keyword" size="mini" clearable style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doSearch" size="mini">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="container-body container-table">
        <el-table
            v-loading="tableLoading"
            :data="tableData"
            border
            style="width: 100%; margin-bottom: 10px"
        >
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{formatTime(scope.row.query_timestamp)}}
            </template>
          </el-table-column>

          <el-table-column prop="sql_id" label="sql_id"></el-table-column>
          <el-table-column prop="schema" label="库名" width="180"></el-table-column>

<!--          <el-table-column :label="queryParams.is_aggr_by_hash ? '数量': 'ip'" width="180">-->
<!--            <template slot-scope="scope">-->
<!--              <div v-if="queryParams.is_aggr_by_hash">-->
<!--                {{ scope.row.hash_count }}-->
<!--              </div>-->
<!--              <div v-else>-->
<!--                {{ scope.row.host }}-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->

          <el-table-column prop="finger" label="sql" width="180"> </el-table-column>

          <el-table-column prop="query_time_sec" label="查询时间"></el-table-column>

          <el-table-column prop="rows_examined" label="rows_examined"></el-table-column>

          <el-table-column prop="rows_sent" label="rows_sent"></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div v-if="queryParams.is_aggr_by_hash">
                {{ scope.row.queryTimeAvg }}
              </div>
              <div v-else>
                {{ scope.row.query_time }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
            style="text-align: left"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryParams.page_num"
            :page-sizes="[5, 20, 100, 200, 500]"
            :page-size="queryParams.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import SchemaSearch from "@/components/SchemaSearch";
import * as moment from 'moment'
import {querySlowSQL} from '@/api/schema_info'
import * as _ from 'lodash'
export default {
  components: {
    SchemaSearch,
  },
  data() {
    return {
      tableLoading: false,
      currentPage4: 4,
      tableData: [],
      total: 0,
      timeRange: [new Date() - 3600 * 1000 * 24 * 7, new Date()],
      queryParams: {
        schema: '',
        start: '',
        end: '',
        sql_id: '',
        keyword: '',
        page_size: 100,
        page_num: 1,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.updateByQuery(this.$route);
  },
  methods: {
    updateByQuery(route) {
      if (route.query.page_size) {
        this.queryParams.page_size = parseInt(route.query.page_size);
      }
      if (route.query.page_num) {
        this.queryParams.page_num = parseInt(route.query.page_num);
      }
      if (route.query.schema) {
        this.queryParams.schema = route.query.schema
      }
      this.doSearch();
    },
    formatTime(timestamp){
      return moment.unix(timestamp).format()
    },
    doSearch() {
      console.log(this.timeRange)
      if (this.timeRange) {
        this.queryParams.start = moment(this.timeRange[0]).format();
        this.queryParams.end = moment(this.timeRange[1]).format();
      }else{
        this.queryParams.start = ''
        this.queryParams.end = ''
      }

      querySlowSQL(this.queryParams).then(resp => {
        this.tableData = resp.data.results
        this.total = resp.data.count
        this.updateRouteQuery(this.queryParams)
      })
    },
    handleSizeChange(val) {
      let queryCopy = _.cloneDeep(this.$route.query);
      queryCopy.page_size = val;
      this.updateRouteQuery(queryCopy);
    },
    updateRouteQuery(query) {
      this.$router
          .push({
            path: this.$route.path,
            query: query,
          })
          .catch(() => {});
    },
    handleCurrentChange(val) {
      let queryCopy = _.cloneDeep(this.$route.query);
      queryCopy.page_num = val;
      this.updateRouteQuery(queryCopy);
    },
  }
};
</script>

<style>
.demo-form-inline {
  text-align: left;
}

.content-header{
  margin-bottom: 20px;
}
.content-container{
  box-shadow: 0 1px 1px 0 rgba(0, 28, 36, 0.3),1px 1px 1px 0 rgba(0, 28, 36, 0.15),-1px 1px 1px 0 rgba(0, 28, 36, 0.15);
  border-top: 1px solid #eaeded;
  border-radius: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgba(250,250,250,1);
}
.container-header h1{
  text-align: left;
  padding-left: 20px;
  font-size: 18px;
}
.demo-form-inline{
  padding-left: 20px;
}
.container-body{
  padding: 20px 20px;
}
</style>
