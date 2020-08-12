<template>
    <div class="app-wrapper">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <Sidebar></Sidebar>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{ username }}</span>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script>
    import Sidebar from './components/Sidebar/index'
    export default {
        name: "index",
        components: { Sidebar },
        computed: {
            username(){
                return this.$store.state.username
            }
        }
    }
</script>

<style scoped>
    .app-wrapper{
        height: 100%;
    }
</style>
