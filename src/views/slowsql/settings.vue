<template>
    <div style="padding-top: 1px;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>全局设置</span>
            </div>
            <div class="global_setting">

                <el-input
                        placeholder="单位：秒"
                        v-model="global_setting.query_time"
                        style="width: 250px"
                >
                    <template slot="prepend">查询时间高于</template>
                    <template slot="append">报警</template>
                </el-input>

                <el-input
                        placeholder="次"
                        v-model="global_setting.query_count"
                        style="width: 300px"
                >
                    <template slot="prepend">10秒内查询次数大于</template>
                    <template slot="append">报警</template>
                </el-input>

                <el-button type="primary" style="margin-left: 10px;" @click="saveGlobalSetting">保存</el-button>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库级别设置</span>
                <div style="float: right" >
                    <el-button @click="showDialog" size="small">增加设置</el-button>
                </div>

            </div>
            <div class="schema_setting">
                <el-table
                        ref="schema_table"
                        :data="tableData"
                        style="width: 100%"
                        class="tb-edit"
                        @row-click="handleRowClick"
                        highlight-current-row
                >
                    <el-table-column align="left">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"
                            />
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.schema }}
                        </template>
                    </el-table-column>

                    <el-table-column label="不告警">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.stop_alarm">不告警</el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column label="query_time" prop="query_time">
                        <template slot-scope="{ row, $index }">
                            <el-input size="small" v-model="row.query_time" placeholder=""></el-input>
                            <span>{{row.query_time}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="query_count" prop="query_count">
                        <template slot-scope="{ row, $index }">
                            <el-input size="small" v-model="row.query_count" placeholder=""></el-input>
                            <span>{{row.query_count}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-popconfirm title="确认删除该配置么" @confirm.stop="deleteSchemaRowCfg(scope.row)" style="margin-right: 5px;">
                                <el-button type="danger" size="small" slot="reference">删除</el-button>
                            </el-popconfirm>
                            
                            <!-- <el-button type="primary" size="small" @click.="setCurrentRow(scope.$index)">编辑</el-button> -->
                            <el-button type="primary" size="small" class="btn-save" @click.stop="saveSchemaRowCfg(scope.row)">保存</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>


        <SchemaAlarmDialog ref="schema_alarm_dialog"></SchemaAlarmDialog>



    </div>
</template>

<script>
    import {getGlobalSetting, saveGlobalSetting, getSchemaAlarmCfgList, updateSchemaAlarmCfg} from '@/api/slowsql'
    import SchemaAlarmDialog from '@/components/SchemaAlarmSetting'
    import _ from 'lodash'
    export default {
        components: {
            SchemaAlarmDialog
        },
        mounted(){
            document.addEventListener("click", this.bodyCloseMenus);
        },
        beforeDestroy() {
            document.removeEventListener("click", this.bodyCloseMenus);
        },
        data() {
            return {
                global_setting: {
                    query_time: 5,
                    query_count: 10,
                },
                tableData: [],
                search: "",
                currentPage4: 4,
            };
        },
        created() {
            this.pageLoad()
        },
        methods: {
            bodyCloseMenus(e) {
                let self = this;
                if (!this.$refs.schema_table.$el.contains(e.target)) {
                    this.$refs.schema_table.setCurrentRow(-1)
                }
            },
            // setCurrentRow(idx){
            //     this.$refs.schema_table.setCurrentRow(this.$refs.schema_table.data[idx])
            // },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            rowChange(row) {
                console.log('row change: ', row)
            },
            handleCurrentChange() {

            },
            handleSizeChange() {

            },
            handleRowClick(row, index) {

            },
            pageLoad() {
                getGlobalSetting().then(resp => {
                    this.global_setting = resp.data
                })

                getSchemaAlarmCfgList().then(resp => {
                    this.tableData = resp.data.results
                })
            },
            saveGlobalSetting() {
                
                saveGlobalSetting(this.global_setting).then(resp => {
                    this.$message.success('保存成功')
                }).catch(err => console.error(err))
            },
            showDialog() {
                this.$refs['schema_alarm_dialog'].show()
            },
            saveSchemaRowCfg(row){
                this.$refs.schema_table.setCurrentRow(-1)
                row = _.cloneDeep(row)
                let row_id = row.id
                delete row.id
                updateSchemaAlarmCfg(row_id, row).then(resp => {
                    this.$message.success('修改成功')
                    this.pageLoad()
                })
            },
            deleteSchemaRowCfg(row){
                row.delete = true
                this.saveSchemaRowCfg(row)
            }
        },
    };
</script>

<style lang="less" scoped>
    .box-card{
        margin-top: 10px;
    }
    .global_setting {
        .el-input {
            margin-left: 10px;
        }
    }


    .tb-edit td .el-input {
        display: none
    }

    .tb-edit .btn-save {
        display: none;
    }

    .tb-edit .current-row .el-input {
        display: block
    }

    .tb-edit .current-row .btn-save{
        display: inline-block;
    }

    .tb-edit .current-row .el-input + span {
        display: none
    }
</style>
