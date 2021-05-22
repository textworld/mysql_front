<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <zcard title="MySQL库" total="452个">
          <template slot="action">
            <i class="el-icon-share"></i>
          </template>
        </zcard>
      </el-col>

      <el-col :span="6">
        <zcard title="实例数量" total="1452个">
          <template slot="action">
            <i class="el-icon-share"></i>
          </template>
        </zcard>
      </el-col>

      <el-col :span="6">
        <zcard title="实例数量" total="1452个">
          <template slot="action">
            <i class="el-icon-share"></i>
          </template>
        </zcard>
      </el-col>

      <el-col :span="6">
        <zcard title="数据大小" total="657TB">
          <template slot="action">
            <i class="el-icon-share"></i>
          </template>
        </zcard>
      </el-col>
    </el-row>

    <div style="margin-top: 20px;">
      <el-table
      :data="schemaTable.list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="库名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="250">
      </el-table-column>
      <el-table-column
        label="实例数量">
         <template slot-scope="scope">
           {{ scope.row.instances.length }}个
         </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="200px;">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="schemaTable.params.search"
            size="mini"
            clearable
            @input="getDbSchemaListDebounce"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
    </el-table>

     <el-pagination layout="prev, pager, next" :total="schemaTable.total" :page-size="schemaTable.params.page_size" :current-page.sync="schemaTable.params.page_num" style="padding-left:0px;margin-top: 10px;">
  </el-pagination>
    </div>
  </div>
</template>

<script>
import zcard from "@/components/card/index";
import {getDbSchemaList} from '@/api/schema_info'
const dbColumns = {

}
export default {
  components: {
    zcard,
  },
  data(){
    return {
      schemaTable:{
        list: [],
        loading: false,
        params: {
          page_num: 1,
          page_size: 10,
          search: ''
        },
        total: 0,
      }
    }
  },
  watch: {
    'schemaTable.params.page_num': function(val){
      console.log('watched')
      this.getDbSchemaList()
    }
  },
  created(){
    this.getDbSchemaListDebounce = _.debounce(function(){
      this.getDbSchemaList()
    }.bind(this), 500)
  },
  mounted(){
    this.loadData()
  },
  methods:{
    loadData(){
      this.getDbSchemaList()
    },
    getDbSchemaList(){
      getDbSchemaList(this.schemaTable.params).then(resp => {
        console.log(resp)
        this.schemaTable.list = resp.data.results
        this.schemaTable.total = resp.data.count
      })
    }
  }
};
</script>

<style>
</style>