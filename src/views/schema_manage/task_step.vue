<template>
    <div>
        <el-dialog title="任务详情" :visible.sync="dialogVisible">
            
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "task_step",
        props: {
          task_id: {
              type: Number,
              require: true
          }
        },
        data(){
            return {
                dialogVisible: false
            }
        },

    }
</script>

<style scoped>

</style>