<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const userinfo = this.form
      this.$store.dispatch('login', userinfo).then(resp => {
        console.log(resp)
        this.$router.push({
          path: '/home'
        })
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
