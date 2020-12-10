<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="task_id"
                    width="180"
                    label="任务ID">
            </el-table-column>
            <el-table-column
                    prop="schema_id"
                    width="80"
                    label="实例ID">
            </el-table-column>
            <el-table-column
                    label="实例ID">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.schema_ip}}:{{scope.row.schema_port}}-{{scope.row.schema_name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="任务状态">
                <template slot-scope="scope">
                    <el-tag type="success">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="task_start"
                    label="任务开始时间">
            </el-table-column>
            <el-table-column
                    prop="task_end"
                    label="任务结束时间">
            </el-table-column>
            <el-table-column
                    label="任务详情">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showStepModal(scope.row.id)" type="primary">任务详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Steps ref="task_steps"></Steps>
    </div>
</template>

<script>
    import {queryAnsibleTask} from '@/api/ansible_task'
    import Steps from './task_step'
    export default {
        components: {Steps},
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData(){
                queryAnsibleTask({}).then(resp => {
                    this.tableData = resp.data
                    this.$message.info('加载成功')
                }).catch(err => {
                    this.$message.info('加载失败')
                })
            },
            showStepModal(taskId){
                this.$refs.task_steps.loadTaskSteps(taskId)
            }
        }
    }
</script>

<style scoped>

</style>