<template>
  <div class="home">
    <p>
      TODO： 实现多选删除功能
      <el-button @click="">
        删除
      </el-button>
    </p>
    <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
              prop="addr"
              label="地址">
      </el-table-column>
      <el-table-column
              label="操作">
        <template slot-scope="scope">
          <el-button
                  @click="remove(scope)"
                  type="primary"
                  size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doRemove">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {
      tableData: [
        {
          id: 1,
          date: '2020-01-02',
          addr: '51'
        },
        {
          id: 2,
          date: '2020-01-03',
          addr: '52'
        },
        {
          id: 3,
          date: '2020-01-04',
          addr: '53'
        }
      ],
      dialogVisible: false,
      index: 0
    }
  },
  computed: {
    counta(){
      return this.$store.state.count
    },
    username() {
      return this.$store.state.username
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    remove(scope){
      console.log(scope)
      this.index = scope.$index
      this.dialogVisible = true
    },
    doRemove() {
      this.tableData.splice(this.index, 1)
      this.dialogVisible = false
    },
    handleSelectionChange(val){
      console.log(val)
    }
  }
}
</script>
