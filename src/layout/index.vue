<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246); ">
            <Sidebar></Sidebar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px" class="nav">
                <Navbar></Navbar>
            </el-header>


            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
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
        data() {
            return {
                activeIndex: "1"
            }
        },
        methods: {
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
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-menu-demo {
        float: right;
    }
    .app-wrapper{
        flex: 1;
        background-color: #f0f2f5;
    }

    .app-wrapper{
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .sidebar-container {
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

    .nav{
        overflow: hidden;
        position: relative;
        background: #fff;
        -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
</style>
