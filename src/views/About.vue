<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <el-button type="primary" @click="add">Add</el-button>
    </p>
    <p>
      count: {{ counta }}
    </p>

  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'About',
    data(){
      return {
        abc: this.$store.state.count
      }
    },
    computed: {
      counta(){
        return this.$store.state.count
      }
    },
    methods: {
      add() {
        this.$store.commit('increment')
      }
    }
  }
</script>
