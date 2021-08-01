<template>
  <ZstContainer title="慢SQL告警设置">
    <el-tabs tab-position="left">
      <el-tab-pane label="全局配置">
        <GlobalSetting></GlobalSetting>
      </el-tab-pane>
      <el-tab-pane label="库级别">
        <SchemaSetting></SchemaSetting>
      </el-tab-pane>

    </el-tabs>


  </ZstContainer>
</template>

<script>
import ZstContainer from "@/components/ZstContainer";
import GlobalSetting from './setting/global'
import SchemaSetting from './setting/schema'

export default {
  components: {
    ZstContainer, GlobalSetting, SchemaSetting
  },
  data() {
    return {
      global_setting: {
        query_time: 5,
        query_count: 10,
      },
      tableData: [],
      search: "",
      currentPage4: 4,
    };
  },
  created() {
    this.pageLoad()
  },
  methods: {

    // setCurrentRow(idx){
    //     this.$refs.schema_table.setCurrentRow(this.$refs.schema_table.data[idx])
    // },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    rowChange(row) {
      console.log('row change: ', row)
    },
    handleCurrentChange() {

    },
    handleSizeChange() {

    },
    handleRowClick(row, index) {

    },
    pageLoad() {

    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 10px;
}

.global_setting {
  .el-input {
    margin-left: 10px;
  }
}


.tb-edit td .el-input {
  display: none
}

.tb-edit .btn-save {
  display: none;
}

.tb-edit .current-row .el-input {
  display: block
}

.tb-edit .current-row .btn-save {
  display: inline-block;
}

.tb-edit .current-row .el-input + span {
  display: none
}
</style>
