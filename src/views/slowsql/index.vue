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
      <el-form :inline="true" :model="searchBar" class="demo-form-inline">
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
              v-model="searchBar.schema"
              placeholder="选择库"
          ></SchemaSearch>
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
          <el-table-column prop="schema" label="库名" width="180"></el-table-column>

          <el-table-column :label="searchBar.is_aggr_by_hash ? '数量': 'ip'" width="180">
            <template slot-scope="scope">
              <div v-if="searchBar.is_aggr_by_hash">
                {{ scope.row.hash_count }}
              </div>
              <div v-else>
                {{ scope.row.host }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="finger" label="sql" width="180"> </el-table-column>

          <el-table-column prop="query_time" label="query_time"></el-table-column>

          <el-table-column prop="rows_examined" label="rows_examined"></el-table-column>

          <el-table-column prop="rows_sent" label="rows_sent"></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div v-if="searchBar.is_aggr_by_hash">
                {{ scope.row.queryTimeAvg }}
              </div>
              <div v-else>
                {{ scope.row.query_time }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import SchemaSearch from "@/components/SchemaSearch";
import * as moment from 'moment'
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
      searchBar: {
        schema: "",
        start: "",
        end: "",
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
  methods: {
    doSearch() {
      this.searchBar.start = moment(this.timeRange[0]).format();
      this.searchBar.end = moment(this.timeRange[1]).format();
      // querySlowsql(this.searchBar).then((resp) => {
      //   this.total = resp.data.count;
      //   this.tableData = resp.data.results;
      // });
    }
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
