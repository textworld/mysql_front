<template>
  <ZstContainer title="MySQL实例列表">

      <el-row type="flex" class="row-bg" justify="space-between">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @submit.native.prevent>
          <el-form-item label="schema">
            <el-input v-model="searchParams.search" @change="loadData" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData" size="mini">查询</el-button>
          </el-form-item>

        </el-form>

        <div>
          <el-button type="primary" @click="showInstallForm" size="mini">安装MySQL</el-button>
        </div>
      </el-row>

      <el-table :data="tableData" border>
        <el-table-column label="库名">
          <template slot-scope="scope">
            <router-link :to="{ path: '/db_manage/schema/' +scope.row.name }">{{scope.row.name}}</router-link>
          </template>
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间"> </el-table-column>

        <el-table-column label="实例数量">
          <template slot-scope="scope">
            {{scope.row.instances.length}}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px; text-align: left;"
          @size-change="loadData"
          @current-change="loadData"
          :current-page.sync="pagination.page"
          :page-sizes="[5, 20, 100, 200, 500]"
          :page-size.sync="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
      >
      </el-pagination>
      <InstallMySQLDialog ref="install_mysql_dialog" @success="onInstallSuccess"></InstallMySQLDialog>

  </ZstContainer>

</template>

<script>
import ZstContainer from "@/components/ZstContainer";
import { get_schemas } from "@/api/schema_info";
import _ from "lodash";
import InstallMySQLDialog from './install_mysql_modal'
export default {
  name: "index",
  components: {InstallMySQLDialog, ZstContainer},
  data() {
    return {
      pagination: {
        total: 0,
        page: 1,
        size: 20,
      },
      tableData: [],
      searchParams: {
        search: "",
      },
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    showInstallForm(){
      this.$refs.install_mysql_dialog.show()
    },
    onInstallSuccess() {
      this.loadData()
    },
    loadData() {
      let params = {
        page_size: this.pagination.size,
        page_num: this.pagination.page
      }
      _.assign(params, this.searchParams);

      get_schemas(params).then((resp) => {
        if (resp.code === 2000) {
          this.tableData = resp.data.results;
        } else {
          this.$showError(resp);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
