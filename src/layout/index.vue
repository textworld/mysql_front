<template>
<<<<<<< HEAD
    <div class="app-wrapper">
        <Sidebar></Sidebar>
        <div class="main-container">
            <Navbar></Navbar>
            <div class="app-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
=======
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
                <el-dropdown style="line-height: 60px;" @command="handleUserDropdown">
                    <span class="el-dropdown-link">
                        用户<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="user_center">用户中心</el-dropdown-item>
                        <el-dropdown-item command="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-container>

        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
>>>>>>> zwb
</template>

<script>
    import Sidebar from './components/Sidebar/index'
    import Navbar from './components/NavBar/index'
    export default {
        name: "index",
        components: { Sidebar, Navbar },
        computed: {
            username() {
                return this.$store.state.username
            }
        },
<<<<<<< HEAD

=======
>>>>>>> zwb
        data() {
            return {
                activeIndex: "1"
            }
        },
        methods: {
<<<<<<< HEAD

=======
>>>>>>> zwb
            handleSelect(name) {

            },
            logout(){
                this.$store.dispatch('logout').then(() => {
                    this.$router.push({
                        path: '/login'
                    })
                }).catch(err => {
                    this.$message('无法登出');
                })
            },
            handleUserDropdown(command) {
                console.log(command)
                switch (command) {
                    case "logout":
                        this.logout()
                        break;
                    default:
                        console.log('default')
                }
<<<<<<< HEAD
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
=======
>>>>>>> zwb
            }
        }
    }
</script>

<style>
    .el-menu-demo {
<<<<<<< HEAD
        float: right;
    }
    .app-wrapper{
=======
>>>>>>> zwb
        flex: 1;
        background-color: #f0f2f5;
    }

    .app-wrapper{
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .sidebar-container {

<<<<<<< HEAD
        width: 200px;
        position: fixed;
        left: 0;
    }
    .main-container{
        margin-left: 200px;
    }
    .side-bar{
        height: 100%;
    }
    .scrollbar-wrapper {
=======
    .app-wrapper {
>>>>>>> zwb
        height: 100%;
        overflow-x: hidden !important;
    }
    .sidebar-container .el-scrollbar {
        height: 100%;
    }
    .app-main{
        margin: 24px;
    }
    .el-submenu{
        width: 200px;
        overflow: hidden;
    }
</style>
