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
            username(){
                return this.$store.state.username
            }
        },
        methods: {
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
</style>
