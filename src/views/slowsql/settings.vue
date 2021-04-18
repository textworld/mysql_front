<template>
  <div>
      <header>
          
      </header>
      
      <div>
        <el-table
                v-loading="tableLoading"
                :data="tableData"
                border
                style="width: 100%;margin-bottom: 10px;">

            <el-table-column prop="schema" label="库名">
            </el-table-column>

            <el-table-column prop="query_time" label="查询时间">
            </el-table-column>

            <el-table-column prop="query_count" label="qps">
            </el-table-column>

            <el-table-column>
                <template slot-scope="slot">
                    <el-button type="primary" size="small" @click="showRowEdit(slow.row)"></el-button>
                    
                </template>
            </el-table-column>
            

        </el-table>

        <!-- 行编辑 对话框 表单-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="rowEditForm">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import {getSchemaSettings} from '@/api/slowsql'
export default {
    name: 'slowsql_setting',
    data(){
        return {
            // query参数
            queryParams: {

            },
            
            // table data
            tableData: [],

            // tags
            tableLoading: false,

            rowEditVisible: false,
            
            rowEditForm: {}
        }
    },
    created(){
        this.loadData()
    },
    methods: {
        loadData(){
            getSchemaSettings().then(resp => {
                this.tableData = resp.data
            })
        },
        showRowEdit(row){
            this.showRowEdit = true
        }
    }
}
</script>

<style>

</style>