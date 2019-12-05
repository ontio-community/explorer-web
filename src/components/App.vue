<template>
  <div id="app" class="container-fluid container-bg-color">
    <nav-bar-1 v-if="!inHomePage" class="nav-pc-display"></nav-bar-1>
    <nav-bar v-if="!inHomePage" class="nav-mobile-display"></nav-bar>

    <router-view />

    <the-footer></the-footer>
  </div>
</template>

<script>
import "chart.js";
//import TheFooter from './common/TheFooter'
import TheFooter from "./common/Footer";

export default {
  name: "App",
  data() {
    return {
      inHomePage: true
    };
  },
  created() {
    this.isDisplay();
  },
  watch: {
    $route: "isDisplay"
  },
  methods: {
    isDisplay() {
      this.inHomePage =
        this.$route.name === "Home" || this.$route.name === "HomeTest";
    }
  },
  components: { TheFooter }
};
</script>

<style>
.container-bg-color {
  background-color: #f4f4f4;
  padding: 0 !important;
}
/* --- 改变滚动条样式 --- */
::-webkit-scrollbar {
  width: 2px;
}

/* --- 滚动条里面的滚动块 --- */
::-webkit-scrollbar-thumb {
  border-radius: 1px;
  -webkit-box-shadow: inset 0 0 1px #eee;
  background: #eee;
}

/* --- 滚动条里面轨道 --- */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background: #fff;
}
</style>
