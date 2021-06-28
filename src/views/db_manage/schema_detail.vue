<template>
  <div class="padding-page">
    <h1>库: {{ schema }}</h1>

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-form
        :inline="true"
        :model="searchParams"
        class="demo-form-inline"
        @submit.native.prevent
      >
        <el-form-item label="schema">
          <el-input v-model="searchParams.search" @change="loadData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">查询</el-button>
        </el-form-item>
      </el-form>

      <div>
        <el-button type="primary">安装MySQL</el-button>
      </div>
    </el-row>

    <el-table :data="tableData" border>
      <el-table-column prop="host_ip" label="ip"> </el-table-column>

      <el-table-column prop="port" label="端口"> </el-table-column>

      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button @click="showProcessList(scope.row)" type="text" size="small">查看process</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 10px; text-align: left"
      @size-change="loadData"
      @current-change="loadData"
      :current-page.sync="pagination.page"
      :page-sizes="[5, 20, 100, 200, 500]"
      :page-size.sync="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
    <ProcessListDialog
      ref="process_list_dialog"
    ></ProcessListDialog>
  </div>
</template>

<script>
import ProcessListDialog from "./process_list";
import { get_instances } from "@/api/schema_info";
import _ from "lodash";

export default {
  name: "index",
  components: { ProcessListDialog },
  data() {
    return {
      currentInstance: 0,
      schema: "",
      pagination: {
        total: 0,
        page: 1,
        size: 10,
      },
      tableData: [],
      searchParams: {
        search: "",
      },
    };
  },
  created() {
    this.schema = this.$route.params.name;
    this.loadData();
  },
  methods: {
    querySearch() {},
    loadData() {
      let params = {
        schema: this.schema,
        page_size: this.pagination.size,
        page_num: this.pagination.page,
      };

      _.assign(params, this.searchParams);

      get_instances(params).then((resp) => {
        if (resp.code === 2000) {
          this.tableData = resp.data.results;
          this.pagination.total = resp.data.count;
        } else {
          this.$showError(resp);
        }
      });
    },
    showProcessList(row) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$refs.process_list_dialog.showProcessList(row).then((_) => {
        loading.close();
      });
    },
  },
};
</script>

<style scoped>
</style>