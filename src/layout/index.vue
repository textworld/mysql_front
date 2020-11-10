<template>
    <div class="app-wrapper">
        <Sidebar></Sidebar>
        <div class="main-container">
            <Navbar></Navbar>
            <div class="app-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
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
</style>
