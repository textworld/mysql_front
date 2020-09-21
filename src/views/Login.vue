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
  import aesjs from 'aes-js'
  import CryptoJS from 'crypto-js'
  import JSEncrypt from 'jsencrypt'
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
  created() {
    this.make()
  },
  methods: {
    make(){
      console.log(() => ({
        state: 1
      }))
    },
    encrypt(password) {
      var key = CryptoJS.enc.Hex.parse('31323334353637383930313233343536');
      var iv = CryptoJS.enc.Hex.parse('0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f');
      var encrypted = CryptoJS.AES.encrypt("text can be a random lenght", key, {
        mode: CryptoJS.mode.CTR,
        iv: iv,
        padding: CryptoJS.pad.NoPadding
      });
      console.log(encrypted.ciphertext.toString())
      //1831e01b304d16fb27ec48ba8c2b5cb5bf0e84c6a88fa4b118b348
    },
    rsaEncrypt() {
      // Encrypt with the public key...
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey("-----BEGIN PUBLIC KEY-----\n" +
              "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n" +
              "FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n" +
              "xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n" +
              "gwQco1KRMDSmXSMkDwIDAQAB\n" +
              "-----END PUBLIC KEY-----");
      var encrypted = encrypt.encrypt('text can be a random lenght');
      console.log(encrypted)
      //kkEwvrhMsgN1dq+NVHjpiGEQR7dmXJQw2l++6zSF7BvIqjU2VzzyZBGD1MZD1muuxEG4+ERDdVn+aN+nXu4fqrrtHSdtMu/TR4oHlg6nkkSoPqZLuxvQShLp3zwBMqA5Bd2vnWt9MbSjgKSlckXJSQxan/RiRQbhSv2FS/iZwyY=
    },
    login () {
      const userinfo = this.form
      this.encrypt(this.form.password)
      this.rsaEncrypt()
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
