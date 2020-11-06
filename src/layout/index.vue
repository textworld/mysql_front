<template>
    <div class="app-wrapper">
        <div class="sidebar-container">
            <el-scrollbar>
                <ul style="height: 100vh;">
                    <li style="height: 500px;">1</li>
                    <li style="height: 500px;">2</li>
                    <li style="height: 500px;">3</li>
                </ul>
            </el-scrollbar>
        </div>
        <div class="main-container">
            <p>test</p>
        </div>
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
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .sidebar-container {

        width: 40px;
        position: fixed;
        left: 0;
    }
    .main-container{
        margin-left: 40px;
    }
</style>
