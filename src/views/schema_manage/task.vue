<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="任务ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="实例ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="任务状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="任务开始时间">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="任务结束时间">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="任务详情">
                <template slot-scope="scope">
                    <el-button size="mini" @click="" type="primary">任务详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style scoped>

</style>