<template>
    <div>
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-form :inline="true" :model="searchBar" class="demo-form-inline">
                <el-form-item label="选择时间">
                    <el-date-picker
                            v-model="timeRange"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="schema">
                    <SchemaSearch
                            v-model="searchBar.schema"
                            placeholder="请输入内容"></SchemaSearch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </el-form-item>
            </el-form>

            <div>
                <el-switch
                        v-model="isAggrByFingerPrinter"
                        active-text="聚合"
                        inactive-text="不聚合">
                </el-switch>
                <el-tooltip content="一些说明文字" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>
        </el-row>

        <el-table
                v-loading="tableLoading"
                :data="tableData"
                border
                style="width: 100%;margin-bottom: 10px;">

            <el-table-column prop="schema" label="库名" width="180"></el-table-column>

            <el-table-column prop="host" label="ip" width="180"></el-table-column>

            <el-table-column prop="query_sql" label="sql" width="180"></el-table-column>
            
            <el-table-column prop="query_time" label="执行时间"></el-table-column>

            <el-table-column prop="rows_examined" label="rows_examined"></el-table-column>

            <el-table-column prop="rows_sent" label="rows_sent"></el-table-column>

            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                </template>
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
    import {querySlowsql} from '@/api/slowsql'
    import { Loading } from 'element-ui';
    import SchemaSearch from "@/components/SchemaSearch";
    import * as moment from 'moment'
    export default {
        name: "index",
        components: {SchemaSearch},
        data() {
            return {
                isAggrByFingerPrinter: false,
                currentSchema: {},
                tableLoading: false,
                currentPage4: 4,
                tableData: [],
                total: 0,
                timeRange: [new Date()- 3600 * 1000 * 24 * 7, new Date()],
                searchBar: {
                    schema: "",
                    status: "",
                    page_size: 100,
                    page_num: 1,
                    start: '',
                    end: ''
                },
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
                }
            }
        },
        created() {
            this.updateByQuery(this.$route)
        },
        watch: {
            $route(to, from) {
                this.updateByQuery(to)
            }
        },
        methods: {
            updateByQuery(route){
                if(route.query.page_size) {
                    this.searchBar.page_size = parseInt(route.query.page_size)
                }
                if (route.query.page_num) {
                    this.searchBar.page_num = parseInt(route.query.page_num)
                }
                this.doSearch()
            },
            doSearch(){
                console.log('do search')
                console.log(this.timeRange)
                console.log(moment(this.timeRange[0]).format())
                this.searchBar.start = moment(this.timeRange[0]).format()
                this.searchBar.end = moment(this.timeRange[1]).format()
                querySlowsql(this.searchBar).then(resp => {
                    this.total = resp.data.count
                    this.tableData = resp.data.results
                })
            },
            handleSizeChange(val) {;
                let queryCopy = _.cloneDeep(this.$route.query)
                queryCopy.page_size = val
                this.updateRouteQuery(queryCopy)
            },
            handleCurrentChange(val) {
                let queryCopy = _.cloneDeep(this.$route.query)
                queryCopy.page_num = val
                this.updateRouteQuery(queryCopy)
            },
            updateRouteQuery(query) {
                this.$router.push({
                    path: this.$route.path,
                    query: query
                }).catch(err => {

                })
            }
        }
    }
</script>

<style scoped>

</style>