<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <el-button type="primary" @click="add">Add</el-button>
    </p>
    <p>
      count: {{ counta }}
    </p>
    
    <el-row :gutter="20" style="background-color: #eee;padding: 20px">
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
  </div>
</template>

<script>
  // @ is an alias to /src
  import zcard from '@/components/card/index'
  export default {
    name: 'About',
    components: {
      zcard
    },
    data(){
      return {
        abc: this.$store.state.count
      }
    },
    computed: {
      counta(){
        return this.$store.state.count
      }
    },
    methods: {
      add() {
        this.$store.commit('increment')
      }
    }
  }
</script>
