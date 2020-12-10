<template>
    <div>
        <el-dialog title="任务详情" :visible.sync="dialogVisible" width="70%"
                   >
            <el-table type="expand"
                    :data="steps"
                    style="width: 100%"
                    height="500px">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        详情：{{scope.row.result}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="任务名称">
                </el-table-column>
                <el-table-column
                        prop="timestamp"
                        label="完成时间">
                </el-table-column>
                <el-table-column
                        label="status">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="changed"
                        label="changed">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.changed}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {queryAnsibleTaskSteps} from '@/api/ansible_task'

    export default {
        name: "task_step",
        data() {
            return {
                steps: [],
                dialogVisible: false,
                task_id: 0
            }
        },
        created() {

        },
        methods: {
            loadTaskSteps(task_id) {
                if (this.task_id !== task_id) {
                    this.task_id = task_id
                    queryAnsibleTaskSteps(task_id).then(resp => {
                        this.steps = resp.data
                    }).catch(err => {
                        this.$message.error("无法获取任务步骤")
                    })
                }
                this.dialogVisible = true
            },
            hide(){
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>