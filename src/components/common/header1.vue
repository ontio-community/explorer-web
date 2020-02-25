<template>
  <header id="header" data-fullwidth="true" data-transparent="true">
    <div class="header-inner">
      <div class="h-container">
        <div id="logo">
          <a>
            <div class="logo" @click="toHome()"></div>
          </a>
        </div>

        <div id="search">
          <a
            id="btn-search-close"
            class="btn-search-close"
            aria-label="Close search form"
            @click="switchSearch()"
          >
            <img style="width:16px;height:16px;" src="../../assets/images/common/close.svg" />
          </a>
          <div class="search-form" >
            <!-- <input class="form-control" name="q" type="search" :placeholder="$t('searchInput.placeholder')" /> -->
            <search :focus="inputFocus"></search>
            <span class="text-muted">Start typing &amp; press "Enter" or "ESC" to close</span>
          </div>
        </div>
        <div class="header-extras">
          <ul>
            <li class="mobilehide">
              <div class="p-dropdown">
                <a class="globe-btn" href="#">
                  <img
                    style="width:13px;height:13px;transform: translateY(2.5px);"
                    src="../../assets/images/common/net.svg"
                  />
                  <span>{{this.$route.params.net?"Test":"Main"}}</span>
                </a>
                <ul class="p-dropdown-content">
                  <li>
                    <a href="#" @click="changeNet('MAIN_NET')">{{ $t("navbar.top.mainNet") }}</a>
                  </li>
                  <li>
                    <a href="#" @click="changeNet('TEST_NET')">{{ $t('navbar.top.testNet') }}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a id="btn-search" href="#" @click="switchSearch()">
                <!-- <i class="el-icon-search"></i> -->
                <img
                  style="width:13px;height:13px;transform: translateY(2.5px);"
                  src="../../assets/images/common/search.svg"
                />
              </a>
            </li>
            <li class="mobilehide">
              <div class="p-dropdown">
                <a class="globe-btn" href="#">
                  <img
                    style="width:13px;height:13px;transform: translateY(2.5px);"
                    src="../../assets/images/common/globe.svg"
                  />
                  <span>{{this.$i18n.locale | langStyle}}</span>
                </a>
                <ul class="p-dropdown-content">
                  <li>
                    <a href="#" @click="handleCommand('ch')">中文</a>
                  </li>
                  <li>
                    <a href="#" @click="handleCommand('en')">English</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div id="mainMenu-trigger">
          <a class="lines-button x" @click="triggerMenu()">
            <span class="lines"></span>
          </a>
        </div>

        <div id="mainMenu">
          <div class="h-container">
            <nav>
              <ul>
                <li
                  :class="item.sub?item.pchide?'dropdown pchide':'dropdown':item.pchide?'pchide':''"
                  v-for="(item,index) in form.navData"
                  :key="index"
                  @click="gopageNav(item)"
                  :id="'subItem'+index"
                  
                >
                  <a
                    href="#"
                    @click="triggerSubMenu(index,item.sub,form.navData.length)"
                  >{{item.title}}</a>
                  <ul class="dropdown-menu" style v-if="item.sub">
                    <li v-for="(subitem,subindex) in item.list" :key="subindex">
                      <a href="#" @click="gopageNav(subitem)">{{subitem.text}}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import $ from "jquery";
import Lang from "./Lang.vue";
import Net from "./net.vue";
import Search from "./search.vue";
import MobileTopNav from "./MobileTopNav";
import LangStorage from "../../helpers/lang";
// import { lock, unlock } from 'tua-body-scroll-lock'
export const TEST_NET = 'TEST_NET'
export const MAIN_NET = 'MAIN_NET'
export default {
  filters: {
    langStyle: function(value) {
      if (value === "ch") {
        return "中";
      } else {
        return "En";
      }
    }
  },
  data() {
    return {
      value: this.$i18n.locale,
      homeLine: false,
      aboutLine: false,
      businessLine: false,
      individualLine: false,
      verifierLine: false,
      SearchFlag: false,
      menuFlag: false,
      activeSubMenuNo: 9999,
      inputFocus: true,
      form: {
        urlName: "",
        navData: []
      },
      enData: [
        {
          title: "Home",
          url: "/",
          sub: false,
          fun: true,
          key: "home"
        },
        {
          title: "Blockchain",
          url: "/",
          sub: true,
          list: [
            { text: "Blocks", url: "/blocks/10/1", fun: true, key: "blocks" },
            {
              text: "Transactions",
              url: "/transactions/10/1",
              fun: true,
              key: "txs"
            },
            {
              text: "Accounts",
              url: "/addresses/ont/20/1",
              fun: true,
              key: "accounts"
            }
          ]
        },
        {
          title: "Node",
          blok: true,
          url: "https://node.ont.io/",
          sub: false
        },
        {
          title: "Tokens",
          url: "/verifier",
          sub: true,
          list: [
            {
              text: "OEP4",
              url: "/token/list/oep4/10/1",
              fun: true,
              key: "oep4"
            },
            {
              text: "OEP5",
              url: "/token/list/oep5/10/1",
              fun: true,
              key: "oep5"
            },
            {
              text: "OEP8",
              url: "/token/list/oep8/10/1",
              fun: true,
              key: "oep8"
            },
            {
              text: "Submit",
              url: "/token/submit",
              fun: true,
              key: "tokenSubmit"
            }
          ]
        },
        {
          title: "Contracts",
          url: "/contract/list/10/1",
          sub: false,
          fun: true,
          key: "contract"
        },
        {
          title: "ONT ID",
          url: "/ontidlist/10/1",
          sub: false,
          fun: true,
          key: "ontid"
        },
        {
          title: "Tools",
          url: "/",
          sub: true,
          list: [
            {
              text: "Statistics",
              url: "/statistics/14",
              fun: true,
              key: "statistics"
            },
            {
              text: "APIs",
              url: "https://dev-docs.ont.io/#/docs-en/explorer/overview",
              blok: true
            }
          ]
        },
        {
          title: this.getLang(this.$i18n.locale),
          url: "/",
          sub: true,
          pchide:true,
          list: [
            {
              text: "中文",
              url: "",
              fun: true,
              key: "ch"
            },
            {
              text: "English",
              url: "",
              fun: true,
              key: "en"
            }
          ]
        },
        {
          title: this.$route.params.net?"TestNet":"MainNet",
          url: "/",
          sub: true,
          pchide:true,
          list: [
            {
              text: "MainNet",
              url: "",
              fun: true,
              key: "main"
            },
            {
              text: "TestNet",
              url: "",
              fun: true,
              key: "test"
            }
          ]
        }
      ],
      chData: [
        {
          title: "首页",
          url: "/",
          sub: false,
          fun: true,
          key: "home"
        },
        {
          title: "区块链",
          url: "/",
          sub: true,
          list: [
            { text: "区块", url: "/blocks/10/1", fun: true, key: "blocks" },
            { text: "交易", url: "/transactions/10/1", fun: true, key: "txs" },
            {
              text: "账户",
              url: "/addresses/ont/20/1",
              fun: true,
              key: "accounts"
            }
          ]
        },
        {
          title: "节点",
          blok: true,
          url: "https://node.ont.io/",
          sub: false
        },
        {
          title: "通证",
          url: "/token",
          sub: true,
          list: [
            {
              text: "OEP-4",
              url: "/token/list/oep4/10/1",
              fun: true,
              key: "oep4"
            },
            {
              text: "OEP-5",
              url: "/token/list/oep5/10/1",
              fun: true,
              key: "oep5"
            },
            {
              text: "OEP-8",
              url: "/token/list/oep8/10/1",
              fun: true,
              key: "oep8"
            },
            {
              text: "提交",
              url: "/token/submit",
              fun: true,
              key: "tokenSubmit"
            }
          ]
        },
        {
          title: "合约",
          url: "/contract/list/10/1",
          sub: false,
          fun: true,
          key: "contract"
        },
        {
          title: "ONT ID",
          url: "/ontidlist/10/1",
          sub: false,
          fun: true,
          key: "ontid"
        },
        {
          title: "工具",
          url: "/",
          sub: true,
          list: [
            {
              text: "统计",
              url: "/statistics/14",
              fun: true,
              key: "statistics"
            },
            {
              text: "API 文档",
              url: "https://dev-docs.ont.io/#/docs-en/explorer/overview",
              blok: true
            }
          ]
        },
        {
          title: this.getLang(this.$i18n.locale),
          url: "/",
          sub: true,
          pchide:true,
          list: [
            {
              text: "中文",
              url: "",
              fun: true,
              key: "ch"
            },
            {
              text: "English",
              url: "",
              fun: true,
              key: "en"
            }
          ]
        },
        {
          title: this.$route.params.net?"测试网":"主网",
          url: "/",
          sub: true,
          pchide:true,
          list: [
            {
              text: "主网",
              url: "",
              fun: true,
              key: "main"
            },
            {
              text: "测试网",
              url: "",
              fun: true,
              key: "test"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    // console.log(this.form)
    // this.getData()
    let self = this;
    this.$nextTick(function() {
      document.addEventListener("keyup", function(e) {
        //此处填写你的业务逻辑即可
        if (e.keyCode == 27) {
          self.switchSearch();
        }
      });
    });
    switch (this.$i18n.locale) {
      case "en":
        this.form.navData = this.enData;
        break;
      case "ch":
        this.form.navData = this.chData;
        break;
      default:
        this.form.navData = this.enData;
    }
    this.routeChange();

    $("#mainMenu").css("min-height", "0px");
    $("#navEle_box").on("mouseenter", "li.main_men", function() {
      //   console.log('coe')
      $("#menu_hover_bg")
        .stop()
        .animate({ height: "58px" }, 300);
      $(this)
        .siblings()
        .find(".sub_title")
        .stop()
        .hide("fast");
      $(this)
        .find(".sub_title")
        .stop()
        .fadeIn(600);
    });
    $("#navEle_box").on("mouseleave", "li.main_men", function() {
      $("#menu_hover_bg")
        .stop()
        .animate({ height: "0" }, 300);
      $(this)
        .find(".sub_title")
        .stop()
        .hide("fast");
    });
    $("#menu_hover_bg").on("mouseleave", function() {
      $("#menu_hover_bg")
        .stop()
        .animate({ height: "0" }, 300);
    });
  },
  methods: {
    getLang(value){
      if (value === "ch") {
        return "中文";
      } else {
        return "English";
      }
    },
    handleCommand(command) {
      this.$i18n.locale = command;
      LangStorage.setLang(this.$i18n.locale);
      let self = this;
      $("html,body").animate({ scrollTop: 0 }, 1);
      setTimeout(() => {
        self.$router.go(0);
      }, 200);
    },
    triggerMenu() {
      // const body = document.querySelector('#mainMenu .h-container')
      if (this.menuFlag) {
        $("#mainMenu").removeClass("menu-animate");
        $("#mainMenu").removeClass("mainMenu-height-open");
        $("#mainMenu").addClass("mainMenu-height-close");
        $(".lines-button").removeClass("toggle-active");
        $("#mainMenu").css("min-height", "0px");
        $("body").removeClass("mainMenu-open");
        // try {
        //   console.log(111)
        //   unlock(body)
          
        // } catch (error) {
          
        // }

      } else {
        $("body").addClass("mainMenu-open");
        $(".lines-button").addClass("toggle-active");
        $("#mainMenu").removeClass("mainMenu-height-close");
        $("#mainMenu").addClass("mainMenu-height-open");
        $("#mainMenu").css("min-height", "1200px");
        $("#mainMenu").addClass("menu-animate");
        // try {
        //   console.log(222)
        //     lock(body)
          
        // } catch (error) {
          
        // }

      }
      this.menuFlag = !this.menuFlag;
    },
    triggerSubMenu($index, $flag, $length) {
      if (document.body.clientWidth < 1024) {
        for (var i = 0; i < $length; i++) {
          let id = "#subItem" + i;
          $(id).removeClass("hover-active");
        }
        if ($index != this.activeSubMenuNo) {
          let tid = "#subItem" + $index;
          $(tid).addClass("hover-active");
          this.activeSubMenuNo = $index;
        } else {
          this.activeSubMenuNo = 9999;
        }
      } else {
        return;
      }
    },
    initMenu() {
      for (var i = 0; i < this.form.navData.length; i++) {
        let id = "#subItem" + i;
        $(id).removeClass("hover-active");
      }
      this.activeSubMenuNo = 9999;

      $("#mainMenu").removeClass("menu-animate");
      $("#mainMenu").removeClass("mainMenu-height-open");
      $("#mainMenu").addClass("mainMenu-height-close");
      $(".lines-button").removeClass("toggle-active");
        $("#mainMenu").css("min-height", "0px");
      $("body").removeClass("mainMenu-open");
      this.menuFlag = false;
    },
    switchSearch() {
      if (this.SearchFlag) {
        $("body").removeClass("search-open");
      } else {
        $("body").addClass("search-open");
        this.inputFocus = !this.inputFocus;
      }
      this.SearchFlag = !this.SearchFlag;
    },
    toOnt() {
      // window.location.href = 'https://ont.io/'
      //window.open("https://ont.io/", "_blank");
      this.$router.push({ path: "/" });
    },

    toHome() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "HomeTest",
          params: { net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "Home"
        });
      }
    },

    changeNet($val) {
      let net = sessionStorage.getItem("network");
      if ($val == net) {
        return;
      } else {
        if (this.$route.params.net === "testnet") {
          sessionStorage.setItem("network", MAIN_NET);
          this.$router.push({ name: "Home" });
        } else {
          sessionStorage.setItem("network", TEST_NET);
          this.$router.push({ name: "HomeTest", params: { net: "testnet" } });
        }
        location.reload();
      }
    },
    toContractList() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "ContractListTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "ContractList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      }
    },
    toBlockListPage() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "blockListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "blockList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      }
    },
    toTransactionListPage() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TransactionListTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "TransactionList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      }
    },
    toOntIdListPage() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "OntIdListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "OntIdList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      }
    },
    toAddressList() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "addressListTest",
          params: { token: "ont", pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "addressList",
          params: { token: "ont", pageSize: 20, pageNumber: 1 }
        });
      }
    },
    toTokenList($type) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TokenListTest",
          params: {
            contractType: $type,
            pageSize: 10,
            pageNumber: 1,
            net: "testnet"
          }
        });
      } else {
        this.$router.push({
          name: "TokenList",
          params: { contractType: $type, pageSize: 10, pageNumber: 1 }
        });
      }
    },
    toTokenSubmit($type) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TokenSubmitTest",
          params: { net: "testnet" }
        });
      } else {
        this.$router.push({ name: "TokenSubmit" });
      }
    },
    toStatistics() {
      let name = "Statistics";
      let params = { day: "14" };

      if (this.$route.params.net === "testnet") {
        params.net = "testnet";
        name = name + "Test";
      }

      this.$router.push({ name: name, params: params });
    },
    gopageNav(data) {
      console.log(data);
      // return
      if (data.sub) {
        return;
      }
      if (data.blok) {
        window.open(data.url);
      } else {
        if (data.fun) {
          switch (data.key) {
            case "test":
              this.changeNet("TEST_NET");
              break;
            case "main":
              this.changeNet("MAIN_NET");
              break;
            case "ch":
              this.handleCommand('ch');
              break;
            case "en":
              this.handleCommand('en');
              break;
            case "home":
              this.toHome();
              break;
            case "blocks":
              this.toBlockListPage();
              break;
            case "txs":
              this.toTransactionListPage();
              break;
            case "accounts":
              this.toAddressList();
              break;
            case "oep4":
              this.toTokenList("oep4");
              break;
            case "oep5":
              this.toTokenList("oep5");
              break;
            case "oep8":
              this.toTokenList("oep8");
              break;
            case "tokenSubmit":
              this.toTokenSubmit();
              break;
            case "contract":
              this.toContractList();
              break;
            case "ontid":
              this.toOntIdListPage();
              break;
            case "statistics":
              this.toStatistics();
              break;
            default:
              this.toHome();
          }
        }
      }
      this.initMenu();
    },
    routeChange() {
      switch (this.$route.name) {
        case "Home":
          this.homeLine = true;
          break;
        case "Business":
          this.businessLine = true;
          break;
        case "individual":
          this.individualLine = true;
          break;
        case "Verifier":
          this.verifierLine = true;
          break;
        default:
          break;
      }
    },
    filterData(data) {
      data.map((value, index) => {
        value.list.map((ele, idx) => {
          if (ele.url === "/aboutus") {
            ele.url = "https://ont.io" + ele.url;
            ele.blok = true;
          }
          if (ele.url === "/contactUs") {
            ele.url = "https://ont.io" + ele.url;
            ele.blok = true;
          }
        });
      });
      return data;
    }
  },
  watch: {
    $route: "routeChange"
  },
  components: {
    Lang,
    Net,
    Search,
    MobileTopNav
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/header.css";
.logo {
  width: 100px;
  height: 70px;
  background: url(../../assets/images/common/logo.svg) no-repeat center;
  background-size: contain;
  margin: 0 100px 0 0px;
  cursor: pointer;
}
@media only screen and(max-height:960px) {
.logo {
  width: 20px;
  background: url(../../assets/images/common/smalllogo.svg) no-repeat center;
  background-size: contain;
  margin: 0 100px 0 0px;
  cursor: pointer;
}
}
</style>
