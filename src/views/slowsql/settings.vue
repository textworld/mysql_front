<template>
  <div>
    <div class="global_setting">
      <el-input
        placeholder="单位：秒"
        v-model="globalSetting.queryTime"
        style="width: 250px"
      >
        <template slot="prepend">查询时间高于</template>
        <template slot="append">报警</template>
      </el-input>

      <el-input
        placeholder="次"
        v-model="globalSetting.queryCount"
        style="width: 300px"
      >
        <template slot="prepend">10秒内查询次数大于</template>
        <template slot="append">报警</template>
      </el-input>
    </div>
    <el-divider></el-divider>
    <div class="sceham_setting">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        highlight-current-row
        style="width: 100%"
        class="tb-edit"
        @row-click="handleRowClick"
      >
        <el-table-column align="left">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            {{ scope.row.schema }}
          </template>
        </el-table-column>

        <el-table-column label="不告警">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.disable_alarm">不告警</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="sql_print" prop="sql_print"> </el-table-column>
        <el-table-column label="query_time" prop="query_time">
            <template slot-scope="{ row, $index }">
              <el-input size="small" v-model="row.query_time" placeholder="" @change="handleEdit($index, row)"></el-input>
              <span>{{row.query_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="query_count" prop="query_count">
          <template slot-scope="{ row, $index }">
            <el-input size="small" v-model="row.query_count" placeholder="" @change="handleEdit($index, row)"></el-input>
              <span>{{row.query_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="set_time" prop="set_time"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      globalSetting: {
        queryTime: 5,
        queryCount: 10,
      },
      tableData: [
        {
          schema: "zcc",
          disable_alarm: false,
          sql_print: "select * from a where a = ?",
          query_time: 10,
          query_count: 20,
          set_time: "2020-01-03 12:00:01",
        },
        {
          schema: "zcc",
          disable_alarm: false,
          sql_print: "select * from a where a = ?",
          query_time: 10,
          query_count: 20,
          set_time: "2020-01-03 12:00:01",
        },
      ],
      search: "",
      currentPage4: 4,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    rowChange(row) {
      console.log('row change: ', row)
    },
    handleCurrentChange(){

    },
    handleSizeChange(){

    },
    handleRowClick(row, index){
      console.log('row:', row)
    }
  },
};
</script>

<style lang="less" scoped>
.global_setting {
  .el-input {
    margin-left: 10px;
  }
}


.tb-edit td .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
}
</style>