<template>
  <div id="app">
    <header-div></header-div>
    <router-view/>
    <footer-div></footer-div>
  </div>
</template>

<script>
import headerDiv from './components/common/header1'
import footerDiv from './components/common/footer'
export default {
  name: 'App',
  components: {
    headerDiv,
    footerDiv
  }
}
</script>

<style>
@import url("./assets/css/style.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
