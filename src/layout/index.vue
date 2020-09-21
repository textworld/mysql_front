<template>
    <el-container>
        <el-header style="border-bottom: 1px solid #dcdfe6;" height="61px">
            <el-container>
                <h1 style="line-height: 60px;margin:0px;padding: 0 40px;">
                    <a href="" alt="logo">管理平台</a>
                </h1>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                </el-menu>
            </el-container>

        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
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
        },
        data(){
            return {
                activeIndex: "1"
            }
        },
        methods: {
            handleSelect(name){

            }
        }
    }
</script>

<style scoped>
    .el-menu-demo {
        float: right;
    }
    .app-wrapper{
        height: 100%;
    }
</style>
