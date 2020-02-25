<template>
  <div>
    <div class="bus_header pc_nav">
      <div class="logo" @click="toHome()"></div>
      <div class="main_nav">
        <ul class="nav_box" id="navEle_box">
          <!--           <li id="men_pro" :class="homeLine?'active':''">
            <div class="main_title" @click="$router.push({path: '/'})">{{$t('adminHome')}}</div>
          </li>
          <li id="men_pro" :class="individualLine?'active':''">
            <div class="main_title" @click="$router.push({name: 'individual'})">{{$t('Individual')}}</div>
          </li>
          <li id="men_pro" :class="businessLine?'active':''">
            <div class="main_title" @click="$router.push({name: 'Business'})">{{$t('business')}}</div>
          </li>
          <li id="men_pro" :class="verifierLine?'active':''">
            <div class="main_title" @click="$router.push({name: 'verifier'})">{{$t('Verifier')}}</div>
          </li>-->
          <li
            :class="item.sub ? 'main_men': 'main_men1'"
            v-for="(item, index) in form.navData"
            v-bind:key="index"
          >
            <div class="main_title" @click="gopageNav(item)">{{item.title}}</div>
            <div class="sub_title">
              <div
                :class="ele.url.indexOf('dapp')>-1?'sub_link outLink': 'sub_link'"
                v-for="(ele, idx) in item.list"
                :key="idx"
                @click="gopageNav(ele)"
              >{{ele.text}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="net">
        <Net />
      </div>
      <div class="lang">
        <Lang />
      </div>
      <div class="subtitle_bg" id="menu_hover_bg"></div>
    </div>
    <MobileTopNav class="mobile_nav" :navData="form.navData" />
  </div>
</template>

<script>
import $ from "jquery";
import Lang from "./Lang.vue";
import Net from "./net.vue";
import MobileTopNav from "./MobileTopNav";
export default {
  data() {
    return {
      value: this.$i18n.locale,
      homeLine: false,
      aboutLine: false,
      businessLine: false,
      individualLine: false,
      verifierLine: false,
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
          url: "/verifier",
          sub: true,
          list: [
            {
              text: "OEP-4概述",
              url: "/token/list/oep4/10/1",
              fun: true,
              key: "oep4"
            },
            {
              text: "OEP-5概述",
              url: "/token/list/oep5/10/1",
              fun: true,
              key: "oep5"
            },
            {
              text: "OEP-8概述",
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
          title: "网络",
          url: "/",
          sub: true,
          list: [
            { text: "主网", url: "/blocks/10/1", fun: true, key: "blocks" },
            { text: "测试网", url: "/transactions/10/1", fun: true, key: "txs" },
          ]
        },
      ]
    };
  },
  mounted() {
    // console.log(this.form)
    // this.getData()
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
    MobileTopNav
  }
};
</script>

<style lang="less" scoped>
.bus_header {
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  z-index: 103;
  //   display: none;
  .logo {
    width: 100px;
    height: 70px;
    background: url(../../assets/images/common/logo.svg) no-repeat center;
    background-size: contain;
    margin: 0 100px 0 20px;
    cursor: pointer;
  }
  .lang {
    width: 76px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
  .net {
    width: 76px;
    height: 70px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
  .main_nav {
    height: 70px;
    position: relative;
    .nav_box {
      width: 100%;
      height: 70px;
      // background: #fff;
      display: flex;
      justify-content: flex-start;
      position: relative;

      li {
        padding-right: 50px;
        height: 70px;
        cursor: pointer;
        .main_title {
          line-height: 70px;
          font-size: 13px;
          position: relative;
          color: rgba(0, 0, 0, 0.6);
          transition: color 0.5s;
          overflow: hidden;
          font-weight: 400;
        }
        .main_title::after {
          content: "";
          width: 30px;
          height: 3px;
          background: rgba(0, 0, 0, 1);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
            -webkit-transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          // opacity: 0;
        }
        .sub_title {
          position: absolute;
          left: 0;
          width: 100vh !important;
          height: 58px !important;
          top: 70px;
          color: #fff;
          z-index: 9;
          overflow: hidden;
          display: none;
          .sub_link {
            float: left;
            margin-right: 50px;
            line-height: 58px;
            font-size: 13px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
            transition: color 0.5s;
            position: relative;
            &:hover {
              color: rgba(0, 0, 0, 1);
            }
            &::after {
              opacity: 1;
            }
          }
          .outLink:hover {
            &::after {
              opacity: 1;
            }
          }
          .outLink::after {
            content: "";
            width: 12px;
            height: 12px;
            background: url(../../assets/images/common/wailian.svg) 50%
              no-repeat;
            background-size: contain;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -18px;
            z-index: 2;
            opacity: 0.6;
            transition: all 0.5s;
          }
        }
        &:hover {
          // color: rgba(0, 0, 0, 0.6);
          .main_title {
            color: rgba(0, 0, 0, 1);
          }
          .main_title::after {
            transform: translateX(-50%) translateY(0);
          }
        }
      }
      li.active {
        .main_title {
          color: rgba(0, 0, 0, 1);
        }
        .main_title::after {
          transform: translateX(-50%) translateY(0);
        }
      }
    }
  }
  .subtitle_bg {
    position: absolute;
    width: 100%;
    height: 0px;
    background: rgba(250, 250, 250, 1);
    left: 0;
    top: 70px;
  }
}
.mobile_nav {
  display: none;
}
@media only screen and (max-width: 1023px) {
  .mobile_nav {
    display: block;
  }
  .pc_nav {
    display: none;
  }
}
</style>
