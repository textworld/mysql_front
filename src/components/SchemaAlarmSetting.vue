<template>
  <el-dialog :title="'数据库' + schema + '告警设置'" :visible.sync="dialogFormVisible">
    <el-form :model="form"  label-width="150px">
      <el-form-item label="schema">
        <SchemaSearch v-model="form.schema"></SchemaSearch>
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
import {saveSchemaAlarmCfg} from '@/api/slowsql'
import SchemaSearch from "@/components/SchemaSearch";

export default {
  components: {SchemaSearch},
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
        schema: "",
        query_time: 10,
        query_count: 10,
        type: "schema"
      }
    }
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
      if (this.form.schema == "") {
        this.$message.error('请选择一个库')
        return
      }
      saveSchemaAlarmCfg(this.form).then(() => {
        this.$message.success('保存成功')
      }).catch(err => {
        console.log('rrrr' ,err)
      }).finally(() => {
        this.dialogFormVisible = false
      })
    },
    show(){
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>

</style>
