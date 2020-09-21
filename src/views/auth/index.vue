<template>
    <div>
        <div>
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </div>
        <el-table
                :data="authList"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="title"
                    label="标题"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="identifier"
                    label="权限标识"
                    sortable
                    width="180">
            </el-table-column>
        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="authForm" class="demo-form-inline" label-width="80px">
                <el-form-item label="标题" size="small">
                    <el-input v-model="authForm.title"
                              placeholder="中文标题"
                              :style="authFormInputStyle"
                              required></el-input>
                </el-form-item>
                <el-form-item label=权限标识 size="small">
                    <el-input v-model="authForm.identifier"
                              placeholder="英文标识"
                              :style="authFormInputStyle"
                              required></el-input>
                </el-form-item>
                <el-form-item label="上级目录" size="small">
                    <treeselect v-model="authForm.parent" :options="options" style="width: 570px"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        components: { Treeselect },
        name: "index",
        data() {
            return {
                options: [ {
                        id: 'a',
                        label: 'a',
                        children: [ {
                            id: 'aa',
                            label: 'aa',
                        }, {
                            id: 'ab',
                            label: 'ab',
                        } ],
                    }, {
                        id: 'b',
                        label: 'b',
                    }, {
                        id: 'c',
                        label: 'c',
                    } ],
                dialogFormVisible: false,
                authForm: {
                    title: '',
                    identifier: '',
                    parent: ''
                },
                authFormInputStyle: {
                    width: '240px'
                },
                authList: [
                    {
                        id: 1,
                        title: '慢SQl',
                        identifier: 'slowsql',
                        children: [
                            {
                                id: 2,
                                title: '查询页面',
                                identifier: 'page_query'
                            },
                            {
                                id: 3,
                                title: '周报',
                                identifier: 'email'
                            }
                        ]
                    },
                    {
                        id: 4,
                        title: 'MySQL源数据',
                        identifier: 'db_meta',
                        children: [
                            {
                                id: 5,
                                title: '新增',
                                identifier: 'add'
                            },
                            {
                                id: 6,
                                title: '删除',
                                identifier: 'remove'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            onSubmit () {

            }
        }
    }
</script>

<style scoped>

</style>