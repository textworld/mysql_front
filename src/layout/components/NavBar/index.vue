<template>
    <div class="nav">
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
    .nav{
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
</style>
