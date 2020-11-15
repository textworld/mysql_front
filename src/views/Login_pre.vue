<template>
    <div class="login-container">
        <el-form label-width="0px" class="login-form">
            <h1>Login</h1>
            <el-form-item prop="username">
                <el-input v-model="formLogin.username"
                placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="formLogin.password"
                show-password
                placeholder="Password"
                name="password"></el-input>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLoging">Login</el-button>
        </el-form>
  </div>
</template>

<script>
    export default {
         name: "Login",
         data() {
            return {
                loading: false,
                formLogin: {
                    username: "",
                    password: "",
                }
            }
        },
        methods: {
            handleLoging() {
                // 这里还是使用之前调用API函数的代码
                this.$message.error('用户名或者密码不正确');
            }
        }
    }
</script>

<style scoped>
  .login-form{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .login-form h1{
    text-align: center;
  }
</style>