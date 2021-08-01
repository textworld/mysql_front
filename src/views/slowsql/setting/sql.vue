<template>
  <div>
    <el-table
        ref="schema_table"
        :data="tableData"
        class="tb-edit"
        highlight-current-row
        style="width: 100%"
    >
      <el-table-column align="left">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              placeholder="输入关键字搜索"
              size="mini"
              @change="searchInputChange"
          />
        </template>
        <template slot-scope="scope">
          {{ scope.row.schema }}
        </template>
      </el-table-column>

      <el-table-column label="是否删除">
        <template slot-scope="scope">
          <span v-if="!scope.row.delete">告警中</span>
          <span v-else>未告警</span>
        </template>
      </el-table-column>

      <el-table-column
          prop="sql_print"
          label="sql"
      >
      </el-table-column>

      <el-table-column label="query_time" prop="query_time">
        <template slot-scope="{ row, $index }">
          <span>{{ row.query_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="query_count" prop="query_count">
        <template slot-scope="{ row, $index }">
          <span>{{ row.query_count }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot="header">
          <el-button size="mini" @click="showSQLDialog">添加告警</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="!scope.row.delete" style="margin-right: 5px;" @click="editSetting(scope.row)">编辑</el-button>
          <el-popconfirm style="margin-right: 5px;" v-if="!scope.row.delete" title="确认删除该配置么" @confirm="delOrResumeSQLSetting(scope.row.id, true)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
          <el-button v-else size="mini" @click="delOrResumeSQLSetting(scope.row.id, false)">恢复告警</el-button>

          <!-- <el-button type="primary" size="small" @click.="setCurrentRow(scope.$index)">编辑</el-button> -->
<!--          <el-button class="btn-save" size="small" type="primary" @click.stop="saveSchemaRowCfg(scope.row)">编辑-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <AddSQLAlarm :schema="schema" ref="addSQLAlarm"></AddSQLAlarm>
  </div>
</template>

<script>
import {getSchemaSetting, updateSQLSetting} from "@/api/schema_info";
import AddSQLAlarm from './sql_add'

export default {
  name: "sql.vue",
  components: {AddSQLAlarm},
  props: {
    schema: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      total: 0,
      tableData: [],
      search: ''
    }
  },
  created() {
    this.loadTableData()
  },
  watch: {

    schema(val, oldVal) {
      if (oldVal != val) {
        this.loadTableData()
      }
    }
  },
  methods: {
    editSetting(settingObj){
      this.$refs.addSQLAlarm.editConfig(settingObj)
    },
    delOrResumeSQLSetting(settingId, isDelete) {
      console.log('deleteSQLSetting')
      updateSQLSetting({
        id: settingId,
        delete: isDelete
      }).then(resp => {
        if (resp.code === 2000) {
          this.$message.info('删除成功')
          this.loadTableData()
        }else{
          this.$message.error('删除失败:'+resp.message)
        }
      })
    },

    searchInputChange(){
      this.loadTableData()
    },
    handleRowClick(row, index){
      console.log(row, index)
    },
    loadTableData(){
      if(this.schema) {
        getSchemaSetting({
          type: 'sql',
          schema: this.schema,
          search: this.search
        }).then(resp => {
          if (resp.code === 2000) {
            this.tableData = resp.data.results
            this.total = resp.data.total
          }else{
            this.$message.error('加载失败:' + resp.message)
          }
        })
      }

    },
    showSQLDialog(){
      this.$refs.addSQLAlarm.show()
    }
  }
}
</script>

<style scoped>

</style>
