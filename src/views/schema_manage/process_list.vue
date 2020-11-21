<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="handleClose">
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
                            <el-button type="text" size="small">kill</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    let processListData = [
        {
            "id": 23,
            "user": "root",
            "host": "172.17.0.1:59474",
            "db": null,
            "command": "Sleep",
            "time": 1182,
            "state": "",
            "info": null
        },
        {
            "id": 26,
            "user": "root",
            "host": "172.17.0.1:59480",
            "db": "zst_online_server",
            "command": "Sleep",
            "time": 1093,
            "state": "",
            "info": null
        },
        {
            "id": 28,
            "user": "root",
            "host": "172.17.0.1:59484",
            "db": "zst_online_server",
            "command": "Sleep",
            "time": 997,
            "state": "",
            "info": null
        },
        {
            "id": 29,
            "user": "root",
            "host": "172.17.0.1:59486",
            "db": "zst_online_server",
            "command": "Sleep",
            "time": 991,
            "state": "",
            "info": null
        },
        {
            "id": 38,
            "user": "root",
            "host": "172.17.0.1:59508",
            "db": "zst_online_server",
            "command": "Query",
            "time": 0,
            "state": "starting",
            "info": "show processlist"
        }
    ]
    export default {
        name: "process_list",
        props: {
            schema: {
                required: true,
                type: Object
            },
        },
        data() {
            return {
                dialogVisible: false,
                processList: processListData
            };
        },
        watch: {
            schema_id(newVal, oldVal) {
                if (newVal > 0 && newVal !== oldVal) {
                    console.log('show process list')

                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            showProcessList(){
                this.dialogVisible = true
            }
        }
    }
</script>

<style scoped>

</style>