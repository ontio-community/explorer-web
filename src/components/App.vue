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
  mounted() {
    this.openNoti();
  },
  watch: {
    $route: "isDisplay"
  },
  methods: {
    isDisplay() {
      this.inHomePage =
        this.$route.name === "Home" || this.$route.name === "HomeTest";
    },
    openNoti() {
      let openNotiFlag = window.localStorage.getItem('opennew')
      if(openNotiFlag == "false"){
        return
      }
      const h = this.$createElement;

      this.$notify({
        title: this.$t("all.newTitle"),

        message: h("p", null,[
          this.$t("all.newText"),
          h(
            "a",
            {
              attrs: { href: "https://explorer.ont.io"} // 在新窗口加载路由
            },
            [
              h(
                "el-button",
                {
                  style: {
                    float: "right"
                  },
                  attrs: {
                    size: "small",
                    type: "primary"
                  },
                  on: {
                    click: this.closeNotify // 路由加载之后，调用关闭消息弹窗的方法
                  }
                },
                this.$t("all.trueBtn")
              )
            ]
          )
        ]),
        duration: 0,
        onClose(){
          console.log("no thanks")
          window.localStorage.setItem('opennew', "false")
        }
      });
    },
    closeNotify() {
      let _this = this;
          window.localStorage.setItem('opennew', "false")
      for (let key in _this.notifications) {
        _this.notifications[key].close();
        delete _this.notifications[key];
      }
    },
  },
  components: { TheFooter }
};
</script>

<style>
.el-notification__content p a button{
  margin-top: 20px;
}
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
