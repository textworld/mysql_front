<template>
  <el-dialog :title="'数据库' + schema + '告警设置'" :visible.sync="dialogFormVisible">
    <el-form :model="form"  label-width="150px">
      <el-form-item label="sql">
        <el-input v-model="form.sql" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="sql_print">
        <el-input v-model="form.sql_print" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="query_time">
        <el-input v-model="form.query_time" autocomplete="off" type="number"></el-input>
      </el-form-item>
      <el-form-item label="query_count">
        <el-input v-model="form.query_count" autocomplete="off" type="number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveSchemaCfg">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {updateSQLSetting, saveSQLSetting} from "@/api/schema_info";

export default {
  name: "SchemaAlarmSetting",
  props: {
    schema: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      formLabelWidth: "200",
      dialogFormVisible: false,
      form: {
        id: 0,
        schema: "",
        query_time: 10,
        query_count: 10,
        sql: '',
        sql_print: ''
      },
      settingId: 0
    }
  },
  created() {
    this.form.schema = this.schema
  },
  watch: {
    schema(newVal, oldVal) {
      if(oldVal !== newVal) {
        this.form.schema = newVal
      }
    }
  },
  methods: {
    saveSchemaCfg(){
      let func = undefined
      if (this.form.id ) {
        func = updateSQLSetting
      }else{
        func = saveSQLSetting
      }
      func(this.form).then(resp => {
        if (resp.code === 2000) {
          this.$message.success('保存成功')
        }else{
          this.$message.error('保存失败:'+resp.message)
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.dialogFormVisible = false
      })
    },
    show(){
      this.form.id = 0
      this.form.sql = ''
      this.form.sql_print = ''
      this.dialogFormVisible = true
    },
    editConfig(settingObj){
      this.show()
      console.log('settingobj', settingObj)
      this.form = settingObj
    }
  }
}
</script>

<style scoped>

</style>
