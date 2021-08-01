<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" style="text-align: left">
      <el-form-item label="查询时间" prop="query_time">
        <el-input v-model="formData.query_time" placeholder="慢SQL查询时间高于此值告警" clearable
                  :style="{width: '400px'}">
          <template slot="append">秒</template>
        </el-input>
      </el-form-item>
      <el-form-item label="qps" prop="query_count">
        <el-input v-model="formData.query_count" placeholder="慢SQL每秒出现频率高于此值告警" clearable
                  :style="{width: '400px'}">
          <template slot="append">秒</template>
        </el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getGlobalSetting, saveGlobalSetting} from '@/api/schema_info'
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        query_time: undefined,
        query_count: undefined,
      },
      rules: {
        query_time: [{
          required: true,
          message: '',
          trigger: 'blur'
        }, {
          pattern: /^\d{1,10}$/,
          message: '只能为数字',
          trigger: 'blur'
        }],
        query_count: [{
          required: true,
          message: '',
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
    this.load()
  },
  mounted() {},
  methods: {
    load(){
      getGlobalSetting().then(resp => {
        if(resp.code === 2000) {
          this.formData = resp.data
        }
      })
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return

        saveGlobalSetting(this.formData).then(resp => {
          if (resp.code === 2000) {
            this.$message.success('保存成功')
          }else{
            this.$message.error('保存失败:' + resp.message)
          }
        })
      })
    },
  }
}

</script>
<style>
</style>
