<template>
    <div class="nav-content">
        <div style="float: right;margin-right: 10px;">

            <el-dropdown >
                <span class="el-dropdown-link">
                    zhangwenbing <i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>Profile</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item @click.native="logout">logout</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            logout(){
                this.$store.dispatch('logout').then(_ => {
                    console.log('logout success')
                    this.$router.push({
                        path: '/login'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .nav-content{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        line-height: 60px;
    }
    .el-dropdown-link:hover{
        cursor: pointer;
    }
</style>
