<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="70%">
            <div>
                <p>
                    {{schema.host_ip}}-{{schema.port}}
                </p>
                <el-table
                        :data="processList"
                        border
                        height="250"
                        style="width: 100%;margin-bottom: 10px;">

                    <el-table-column
                            prop="id"
                            label="id"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            prop="user"
                            label="user">
                    </el-table-column>
                    <el-table-column
                            prop="host"
                            label="host"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="db"
                            label="db">
                    </el-table-column>
                    <el-table-column
                            prop="command"
                            label="command">
                    </el-table-column>

                    <el-table-column
                            prop="time"
                            label="time"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            prop="state"
                            label="state">
                    </el-table-column>

                    <el-table-column
                            prop="info"
                            label="info">
                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" :loading="scope.row.loading" @click="killProcess(scope.row)">kill</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {getProcessList, killProcessById} from '@/api/schema_info'

    export default {
        name: "process_list",
        data() {
            return {
                dialogVisible: false,
                processList: [],
                schema: {}
            };
        },
        watch: {
            dialogVisible(){
                console.log('dialogVisible', this.dialogVisible)
            }
        },
        methods: {
            killProcess(row) {
                row.loading = true
                console.log(row)
                killProcessById(this.schema.id, row.id).then(_ => {
                    this.$message.info('操作成功')
                }).finally(_ => {
                    row.loading = false
                    this.showProcessList(this.schema)
                })
            },
            showProcessList(schema){
                this.schema = schema
                return new Promise((resolve) => {
                    getProcessList(schema.id).then(resp => {
                        this.processList = resp.data
                        _.forEach(this.processList, (v, k) => {
                            this.$set(this.processList[k], 'loading', false)
                        })
                        this.dialogVisible = true
                    }).catch(err => {
                        if (err) {
                            this.$message.error("无法获取process list")
                        }
                    }).finally(() => {
                        resolve()
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>