<template>
    <div>
        <h1>MySQL安装任务</h1>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="task_id"
                    width="180"
                    label="任务ID">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="任务状态">
                <template slot-scope="scope">
                    <el-tag type="success">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column
                    prop="start_time"
                    label="任务开始时间">
            </el-table-column>
            <el-table-column
                    prop="end_time"
                    label="任务结束时间">
            </el-table-column>
            <el-table-column
                    label="任务详情">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showLogDialog(scope.row)" type="primary">任务详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="logDialogVisiable" width="80%" :before-close="handleClose">
            <log-viewer :log="logs" :loading="isLoading" />
            <span slot="footer" class="dialog-footer">
            <el-button @click="logDialogVisiable = false">取 消</el-button>
            <el-button type="primary" @click="logDialogVisiable = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <Steps ref="task_steps"></Steps> -->
        <el-pagination small layout="prev, pager, next"  :total="total" @current-change="pageChange">
</el-pagination>
    </div>
</template>

<script>
    import {queryAnsibleTask, getAnsibleTaskById} from '@/api/ansible_task'
    import Steps from './task_step'
    import LogViewer from '@femessage/log-viewer'
    export default {
        components: {Steps, LogViewer},
        data() {
            return {
                isLoading: false,
                logs: "",
                logDialogVisiable: false,
                tableData: [],
                total: 0,
                query_params: {
                    page_num: 1
                },
                timer: null,
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData(){
                queryAnsibleTask(this.query_params).then(resp => {
                    console.log("resp", resp)
                    this.tableData = resp.data.results
                    this.total = resp.data.count
                }).catch(err => {
                    this.$message.info('加载失败')
                })
            },
            showStepModal(taskId){
                this.$refs.task_steps.loadTaskSteps(taskId)
            },
            pageChange(page){
                console.log('page', page)
                this.query_params.page_num = page
                this.loadData()
            },
            showLogDialog(task){
                this.logs = task.result
                this.logDialogVisiable = true
                if (task.status === "running") {
                    this.isLoading = true
                    // 每隔一段时间, 刷新下任务的日志
                    // 如果不是running状态,则取消定时器
                    this.timer = setInterval(function(){
                        getAnsibleTaskById(task.id).then(resp => {
                            if (resp.data.status !== "running") {
                                this.isLoading = false
                                this.$message('任务已完成')
                                // 任务完成后,再重新加载,更改表格中的状态
                                this.loadData()
                                clearInterval(this.timer)
                            }else{
                                this.logs = resp.data.result
                            }
                        })
                    }.bind(this), 1000)
                }

            },
            handleClose(){
                this.logDialogVisiable = false
                clearInterval(this.timer)
            }
        }
    }
</script>

<style scoped>

</style>