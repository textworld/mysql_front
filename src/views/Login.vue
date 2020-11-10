<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="formLogin" :rules="loginRules" label-width="0px" class="login-form">
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
import _ from "lodash";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      let uPattern = /^[a-zA-Z0-9_-]{4,64}$/;
      if (!uPattern.test(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      formLogin: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
    };
  },
  created() {},
  methods: {
    handleLoging() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch("login", this.formLogin)
            .then(() => {
              let redirect = this.$route.query.redirect;
              redirect = _.isString(redirect) ? redirect : undefined;
              redirect = redirect ? decodeURI(redirect) : "/";
              this.$router.push({
                path: redirect,
              });
            })
            .catch((err) => {
              this.loading = false
            });
        } else {
          console.log('error submit!!')
          return false
        }
      })
      
    },
  },
};
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
