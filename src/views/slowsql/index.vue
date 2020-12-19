<template>
    <div>
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-form :inline="true" :model="searchBar" class="demo-form-inline">
                <el-form-item label="时间范围">
                    <el-date-picker
                            v-model="searchBar.range"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="库名">
                    <SchemaSearch v-model="searchBar.schema"></SchemaSearch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-switch
                        v-model="isAggByFinger"
                        active-text="聚合"
                        inactive-text="不聚合">
                </el-switch>
                <el-tooltip class="item" effect="dark" content="选择聚合后，慢SQL将会按照指纹进行折叠" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>
        </el-row>

        <el-table
                v-loading="tableLoading"
                :data="tableData"
                border
                style="width: 100%;margin-bottom: 10px;">
            <el-table-column
                prop="@timestamp"
                label="时间"
                width="180">
            </el-table-column>

            <el-table-column
                    prop="schema"
                    label="库名"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="host_ip"
                    label="实例"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sql"
                    label="SQL">
            </el-table-column>

            <el-table-column
                    prop="role"
                    label="执行时间"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="执行IP">
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchBar.page_num"
                :page-sizes="[5, 20, 100, 200, 500]"
                :page-size="searchBar.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import SchemaSearch from '@/components/schema_search'
    import * as moment from 'moment';
    export default {
        name: "index",
        components: { SchemaSearch },
        data(){
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                searchBar: {
                    range: [],
                    schema: "",
                    instance: "",
                    page_size: 100,
                    page_num: 1
                },
                total: 0,
                tableLoading: false,
                tableData: [],
                isAggByFinger: false
            }
        },
        methods: {
            doSearch(){
                console.log(this.searchBar)
                console.log(encodeURI(moment(this.searchBar.range[0]).format()))
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }


    }
</script>

<style scoped>

</style>