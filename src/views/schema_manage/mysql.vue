<template>
    <div>
        <el-form :inline="true" :model="searchBar" class="demo-form-inline">
            <el-form-item label="schema">
                <el-autocomplete
                        class="inline-input"
                        v-model="searchBar.schema"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select=""
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchBar.status" placeholder="实例状态" clearable>
                    <el-option label="上线" value="online"></el-option>
                    <el-option label="装机中" value="pending"></el-option>
                    <el-option label="下线" value="offline"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="tableLoading"
                :data="tableData"
                border
                style="width: 100%;margin-bottom: 10px;">

            <el-table-column
                    prop="schema"
                    label="库名"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="host_ip"
                    label="ip"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="port"
                    label="端口"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="role"
                    label="角色"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>

            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="showProcessList(scope.row)" type="text" size="small">查看process</el-button>
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
        <ProcessListDialog ref="process_list_dialog"></ProcessListDialog>
    </div>
</template>

<script>
    import ProcessListDialog from './process_list'
    import {getSchemaNameList, getSchemas} from '@/api/schema_info'
    import { Loading } from 'element-ui';
    export default {
        name: "index",
        components: {ProcessListDialog},
        data() {
            return {
                tableLoading: false,
                currentPage4: 4,
                tableData: [],
                total: 0,
                searchBar: {
                    schema: "",
                    status: "",
                    page_size: 100,
                    page_num: 1
                },
                schemaList: []
            }
        },
        created() {
            this.updateByQuery(this.$route)
            getSchemaNameList().then(resp => {
                if(resp.code === 2000) {
                    this.schemaList = resp.data
                }
            })
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
            querySearch(queryString, cb) {
                let results = this.schemaList.filter(s => {
                    return queryString ? s.toLocaleLowerCase().indexOf(queryString.toLowerCase()) > -1 : true
                }).map(s => {
                    return {value: s}
                })
                cb(results)
            },
            doSearch(){
                console.log('do search')
                getSchemas(this.searchBar).then(resp => {
                    this.total = resp.data.count
                    this.tableData = resp.data.results
                }).finally(_ => {
                    this.tableLoading = false
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
            },
            showProcessList(row){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$refs.process_list_dialog.showProcessList(row).then(_ => {
                    loading.close();
                })
            }
        }
    }
</script>

<style scoped>

</style>