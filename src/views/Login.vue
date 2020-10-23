<template>
  <div class="wrapper">
    <div class="container-login">
      <div class="login-body">
        <form action="" class="login-form">
          <h1>登录</h1>
          <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" placeholder="Email" v-model="formLogin.username">
            <span class="focus-input100-1"></span>
            <span class="focus-input100-2"></span>
          </div>

          <div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
            <input class="input100" type="password" name="pass" placeholder="Password" v-model="formLogin.password">
            <span class="focus-input100-1"></span>
            <span class="focus-input100-2"></span>
          </div>

          <div class="container-login100-form-btn m-t-20">
            <button class="login100-form-btn" @click.prevent="handleLogging">
              Sign in
            </button>
          </div>

          <div class="text-center p-t-45 p-b-4">
            <span class="txt1">
                Forgot
            </span>

                    <a href="#" class="txt2 hov1">
                      Username / Password?
                    </a>
                  </div>

                  <div class="text-center">
            <span class="txt1">
                Create an account?
            </span>

            <a href="#" class="txt2 hov1">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from "lodash"
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        username: "",
        password: ""
      }
    }
  },
  created() {

  },
  methods: {
    handleLogging(){
      this.$store.dispatch('login', this.formLogin).then(() => {
        let redirect = this.$route.query.redirect
        redirect = _.isString(redirect) ? redirect : undefined
        redirect = redirect ? decodeURI(redirect) : "/"
        this.$router.push({
          path: redirect
        })
      })
    }
  }
}
</script>

<style scoped>
  button {
    outline: none !important;
    border: none;
    background: transparent;
  }
  .wrapper {
    width: 100%;
  }
  .container-login {
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #e9faff;
  }
  .login-body{
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 65px 55px 50px 55px;
  }
  .login-form{
    width: 100%;
  }
  .login-form > h1{
      text-align: center;
  }
  .wrap-input100 {
    width: 100%;
    position: relative;
    background-color: #fff;
    border: 1px solid #e6e6e6;
  }
  .validate-input {
    position: relative;
  }
  .container-login100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
  }

  input.input100 {
    height: 68px;
    padding: 0 25px 0 25px;
  }
  .input100 {
    display: block;
    width: 100%;
    background: transparent;
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: #666666;
    line-height: 1.2;
  }
  .login100-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    background-color: #4272d7;
    font-family: OpenSans-Regular;
    font-size: 14px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
  input {
    outline: none;
    border: none;
  }
  .m-t-20 {
    margin-top: 20px;
  }

  .txt1 {
    font-family: OpenSans-Regular;
    font-size: 15px;
    line-height: 1.4;
    color: #999999;
  }
</style>
