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
                <el-select v-model="searchBar.status" placeholder="实例状态">
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
                :page-sizes="[20, 100, 200, 500]"
                :page-size="searchBar.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal">
        </el-pagination>
        <ProcessListDialog ref="process_list_dialog" :schema="currentSchema"></ProcessListDialog>
    </div>
</template>

<script>
    let data = [
        {
            "id": 1,
            "gmt_update": "2020-11-21T03:54:57.825352Z",
            "gmt_create": "2020-11-21T03:54:57.825352Z",
            "host_ip": "192.168.31.32",
            "port": 33307,
            "schema": "test",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 2,
            "gmt_update": "2020-11-21T04:07:10.544998Z",
            "gmt_create": "2020-11-21T04:07:10.544998Z",
            "host_ip": "21.55.220.121",
            "port": 425,
            "schema": "Murray",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 3,
            "gmt_update": "2020-11-21T04:07:11.626177Z",
            "gmt_create": "2020-11-21T04:07:11.626177Z",
            "host_ip": "187.92.196.154",
            "port": 295,
            "schema": "Noe",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 4,
            "gmt_update": "2020-11-21T04:07:12.497966Z",
            "gmt_create": "2020-11-21T04:07:12.497966Z",
            "host_ip": "200.55.164.119",
            "port": 169,
            "schema": "Jameson",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 5,
            "gmt_update": "2020-11-21T04:07:13.186633Z",
            "gmt_create": "2020-11-21T04:07:13.186633Z",
            "host_ip": "224.74.163.22",
            "port": 852,
            "schema": "Dallin",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 6,
            "gmt_update": "2020-11-21T04:07:13.902785Z",
            "gmt_create": "2020-11-21T04:07:13.902785Z",
            "host_ip": "197.187.209.175",
            "port": 613,
            "schema": "Ena",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 7,
            "gmt_update": "2020-11-21T04:07:14.553989Z",
            "gmt_create": "2020-11-21T04:07:14.553989Z",
            "host_ip": "48.118.247.168",
            "port": 183,
            "schema": "Sonia",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 8,
            "gmt_update": "2020-11-21T04:07:15.185357Z",
            "gmt_create": "2020-11-21T04:07:15.185357Z",
            "host_ip": "33.100.231.228",
            "port": 886,
            "schema": "Luigi",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 9,
            "gmt_update": "2020-11-21T04:07:15.794841Z",
            "gmt_create": "2020-11-21T04:07:15.794841Z",
            "host_ip": "250.62.30.177",
            "port": 484,
            "schema": "Veronica",
            "role": "master",
            "status": "online",
            "phy_host": null
        },
        {
            "id": 10,
            "gmt_update": "2020-11-21T04:07:16.337666Z",
            "gmt_create": "2020-11-21T04:07:16.337666Z",
            "host_ip": "139.183.64.198",
            "port": 782,
            "schema": "Leon",
            "role": "master",
            "status": "online",
            "phy_host": null
        }
    ]
    import ProcessListDialog from './process_list'
    export default {
        name: "index",
        components: {ProcessListDialog},
        data() {
            return {
                currentSchema: {},
                currentPage4: 4,
                tableData: data,
                searchBar: {
                    schema: "",
                    status: "",
                    page_size: 100,
                    page_num: 1
                },
                schema_list: [
                    "test",
                    "Murray",
                    "Noe",
                    "Jameson",
                    "Dallin",
                    "Ena",
                    "Sonia",
                    "Luigi",
                    "Veronica",
                    "Leon",
                    "Gage",
                    "Guillermo",
                    "Talia",
                    "Gaetano",
                    "Tania",
                    "Arnoldo",
                    "Zelda",
                    "Orie",
                    "Ana"
                ]
            }
        },
        watch: {
            $route(to, from) {

            }
        },
        created() {
          this.updateByQuery(this.$route)
        },
        computed: {
            dataTotal() {
                return this.tableData.length;
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
            },
            querySearch(queryString, cb) {
                console.log(queryString)
                let results = this.schema_list.filter(s => {
                    return queryString ? s.toLocaleLowerCase().indexOf(queryString.toLowerCase()) > -1 : true
                }).map(s => {
                    return {value: s}
                })
                console.log(results)
                cb(results)
            },
            doSearch(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let queryCopy = _.cloneDeep(this.$route.query)
                queryCopy.page_size = val
                this.updateRouteQuery(queryCopy)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
                console.log(row)
                this.currentSchema = row
                this.$refs.process_list_dialog.showProcessList()
            }
        }
    }
</script>

<style scoped>

</style>