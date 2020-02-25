<template>
  <div class="lang">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{$route.params.net == "testnet"?$t("navbar.top.testNet"):$t("navbar.top.mainNet")}}
        <i
          class="el-icon--right lang_down"
        ></i>
      </span>
      <el-dropdown-menu
        :class="'lang_'+isLocal"
        slot="dropdown"
        :visible-arrow="false"
        :divided="true"
      >
        <el-dropdown-item command="MAIN_NET">{{$t("navbar.top.mainNet")}}</el-dropdown-item>
        <el-dropdown-item command="TEST_NET">{{$t("navbar.top.testNet")}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export const TEST_NET = "TEST_NET";
export const MAIN_NET = "MAIN_NET";
import $ from "jquery";
import LangStorage from "../../helpers/lang";

export default {
  methods: {
    handleCommand(command) {
      if (command == sessionStorage.getItem("network")) {
        return;
      }
      if (this.$route.params.net === "testnet") {
        sessionStorage.setItem("network", MAIN_NET);
        this.$router.push({ name: "Home" });
      } else {
        sessionStorage.setItem("network", TEST_NET);
        this.$router.push({ name: "HomeTest", params: { net: "testnet" } });
      }
      let self = this;
      $("html,body").animate({ scrollTop: 0 }, 1);
      setTimeout(() => {
        self.$router.go(0);
      }, 100);
    }
  },
  mounted() {
    if (this.$route.params.net === "testnet") {
      sessionStorage.setItem("network", TEST_NET);
    } else {
      sessionStorage.setItem("network", MAIN_NET);
    }
  },
  computed: {
    isLocal() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style lang="less" scoped>
.lang {
  outline: none;
  .el-dropdown {
    cursor: pointer;
    .el-dropdown-link {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 76px;
      height: 25px;
      outline: none;
      color: rgba(0, 0, 0, 1);
      font-size: 10px;
      transition: all 0.5s;
      background: rgba(250, 250, 250, 1);
      border-radius: 13px;
      border: 1px solid rgba(242, 242, 242, 1);
      padding: 0 10px;
      &:hover {
        color: rgba(0, 0, 0, 0.6);
        .lang_down {
          opacity: 1;
        }
      }
    }
    .lang_down {
      width: 6px;
      height: 4px;
      margin-bottom: 2px;
      background: url(../../assets/images/common/langb.svg) no-repeat center;
      background-size: contain;
      opacity: 0.3;
      margin-top: 6px;
      transition: all 0.5s;
    }
    .lang_ball {
      width: 14px;
      height: 14px;
      background-size: contain;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
.el-dropdown-menu {
  padding: 0;
  margin: 0;
  top: 60px !important;
  z-index: 99999 !important;
  transform: translateX(10px);
  font-weight: 400;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #fff;
  .el-dropdown-menu__item {
    width: 116px;
    height: 45px;
    font-size: 13px;
    line-height: 45px;
    color: #000;
    opacity: 0.6;
    outline: none;
    transition: all 0.1s;
    text-align: center;
    &:hover {
      background-color: rgba(250, 250, 250, 1);
      opacity: 1;
      color: #000;
    }
  }
}
.el-dropdown-menu .el-dropdown-menu__item:nth-of-type(1) {
  // border-bottom: 1px solid rgba(242, 242, 242, 1);
}
.el-popper[x-placement^="bottom"] {
  margin: 0;
}

.el-dropdown-menu.lang_ch {
  font-family: "PingFang SC Bold", "PingFang SC", "Microsoft Yahei",
    Helvetica Neue, Helvetica, Arial, sans-serif;
}

.el-dropdown-menu.lang_en {
  font-family: "Roboto", "Graphik-regular", "DINPro-Medium",
    "PingFangSC-Regular", "Microsoft YaHei", "Arial", sans-serif;
}
</style>
