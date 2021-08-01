<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" class="setting-form">
        <el-form-item label="库" prop="schema" >
          <SchemaSearch v-model="formData.schema" style="width: 100%" @select="onSchemaSelect"></SchemaSearch>
        </el-form-item>
        <el-form-item label="查询时间" prop="query_time">
          <el-input v-model="formData.query_time" placeholder="慢SQL查询时间高于此值告警" clearable
                    :style="{width: '100%'}">
            <template slot="append">秒</template>
          </el-input>
        </el-form-item>
        <el-form-item label="qps" prop="query_count">
          <el-input v-model="formData.query_count" placeholder="慢SQL每秒出现频率高于此值告警" clearable
                    :style="{width: '100%'}">
            <template slot="append">秒</template>
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="refreshSchema">刷新</el-button>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="16">
        <SQLSetting :schema="formData.schema" v-if="formData.schema"></SQLSetting>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import SchemaSearch from '@/components/SchemaSearch'
import {getSchemaSetting, saveSchemaSetting, updateSchemaSetting} from "@/api/schema_info";
import SQLSetting from './sql'

export default {
  components: {SchemaSearch, SQLSetting},
  props: [],
  data() {
    return {
      formData: {
        id: undefined,
        query_time: undefined,
        query_count: undefined,
        schema: '',
      },
      rules: {
        query_time: [{
          required: true,
          message: '此值必填',
          trigger: 'blur'
        }, {
          pattern: /^\d{1,10}$/,
          message: '只能为数字',
          trigger: 'blur'
        }],
        query_count: [{
          required: true,
          message: '此值必填',
          trigger: 'blur'
        }, {
          pattern: /^\d{1,10}$/,
          message: '只能输入正整数',
          trigger: 'blur'
        }],
      },

    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    loadSchemaSetting(schema){
      getSchemaSetting({type: 'schema', schema: schema}).then(resp => {
        if(resp.code === 2000 && resp.data.count > 0) {
          this.formData = resp.data.results[0]
        }
      })
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        let updateFunc = undefined
        if (this.formData.id) {
          updateFunc = updateSchemaSetting
        }else{
          updateFunc = saveSchemaSetting
        }

        updateFunc({
          type: 'schema',
          ...this.formData
        }).then(resp => {
          if (resp.code === 2000) {
            this.$message.info('更新成功')
          }else{
            this.$message.error('更新失败:' + resp.message)
          }
        })
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    onSchemaSelect(val){
      console.log('val', val)

      this.loadSchemaSetting(val.value)
    },
    refreshSchema(){
      if (this.formData.schema) {
        this.loadSchemaSetting(this.formData.schema)
      }
    }
  }
}

</script>
<style>
.setting-form .el-form-item__content {
  text-align: left;
}
</style>
