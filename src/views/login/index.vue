<template>
  <div class="login-box">
    <div class="login-container">
      <el-form ref="form" class="login-form" style="padding: 10px 20px;">
        <h1>系统登录</h1>
        <el-form-item>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="makeLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import {logout} from '@/api/user.js'
import _ from 'lodash'

export default {
  data(){
    return{
      label_width: "100px",
      form:{
        username: "zst_01",
        password: "123456"
      }
    };
  },

  methods: {
    makeLogin(){
      this.$store.dispatch('login', this.form).then(user => {
        this.$message.info('登录成功')
        setTimeout(function(){
          console.log('setimeout', this.$router)
          this.$router.push('/')
        }.bind(this), 800)
      }).catch(err => {
        if (_.isString(err)) {
          this.$message.error(err)
        }else{
          console.error(err)
          this.$message.error('服务器开小差了,请等会再试试吧!')
        }
      })
    },
    logout(){
      logout().then(resp => {
        console.log('logout', resp)
      })
    }
  },
};
</script>

<style>
.login-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(38, 50, 56, .6);
  background: url(~@/assets/login-bg.jpeg) no-repeat;
  background-size: 100% 100%;
}
.login-container{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 300px;
  width: 400px;
  background-color: #112234;
  opacity: .8;
}
.login-form {
  padding: 10px 20px;
}
.login-form h1 {
  color: #fff;
}
</style>
