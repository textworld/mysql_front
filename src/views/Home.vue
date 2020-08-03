<template>
  <div class="home">
    <p>
      count: {{ counta }},
      username: {{ username }}
    </p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  computed: {
    counta(){
      return this.$store.state.count
    },
    username() {
      return this.$store.state.username
    }
  },
  components: {
    HelloWorld
  }
}
</script>
