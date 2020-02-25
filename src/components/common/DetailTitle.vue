<template>
  <div class="detail-title">
    <div class="left">
      <div class="title">{{title}}</div>
      <div v-if="$route.name === 'blockDetail' || $route.name === 'blockDetailTest'" class="block">
        {{$t("blockDetail.name")}}
        <span>{{$HelperTools.toFinancialVal(data)}}</span>
        <span class="img-content">
          <img
            class="click-able"
            src="../../assets/images/detail/ArrowLeft.png"
            @click="$RouterTools.toBlockDetail(data-1)"
          />
          <img
            class="click-able"
            src="../../assets/images/detail/ArrowRight.png"
            @click="$RouterTools.toBlockDetail(data+1)"
          />
        </span>
      </div>
      <div
        v-if="$route.name === 'TransactionDetail' || $route.name === 'TransactionDetailTest'"
        class="tx"
      >
        {{$t("txDetail.txHash")}}
        <span>{{data}}</span>
      </div>
      <div
        v-if="$route.name === 'AddressDetail' || $route.name === 'AddressDetailwithoutpage' || $route.name === 'AddressDetailTest'"
        class="tx"
      >
        {{$t("addressDetail.address")}}
        <span>{{data}}</span>
      </div>
      <div
        v-if="$route.name === 'OntIdDetail' || $route.name === 'OntIdDetailWithoutPage' || $route.name === 'OntIdDetailTest'"
        class="tx"
      >
        {{$t("ontIdDetail.name")}}
        <span>{{data}}</span>
      </div>
      <div v-if="$route.name === 'TokenDetail' || $route.name === 'TokenDetailTest'" class="tx">
        {{$t("tokens.detail.hash")}}
        <span>{{data}}</span>
      </div>
      <div
        v-if="$route.name === 'ContractDetail' || $route.name === 'ContractDetailwithoutpage' || $route.name === 'ContractDetailwithoutType' || $route.name === 'ContractDetailOnlyHash' || $route.name === 'ContractDetailTest'"
        class="tx"
      >
        {{$t("contracts.detail.hash")}}
        <span>{{data}}</span>
      </div>
      <div v-if="$route.name === 'Statistics' || $route.name === 'StatisticsTest'" class="switch">
        <div
          @click="toStatisticsPage('14')"
          :class="$route.params.day === '14' ? 'btn-current' : 'btn-choose'"
          style="margin-right:30px"
        >
          <div class="text">14 {{$t("statistics.day")}}</div>
          <div class="line"></div>
        </div>
        <div
          @click="toStatisticsPage('30')"
          :class="$route.params.day === '30' ? 'btn-current' : 'btn-choose'"
        >
          <div class="text">30 {{$t("statistics.day")}}</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- <search-div></search-div> -->
    </div>
  </div>
</template>

<script>
import Helper from "./../../helpers/helper.js";
import searchDiv from "./search";
export default {
  components: {
    searchDiv
  },
  props: {
    data: "",
    desc: {
      type: String
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    getAddressListInfo() {
      this.loadingFlag = false;
      this.$store.dispatch("GetAddressList", this.$route.params).then();
    },
    toAddressListPage($token) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "addressList",
          params: { token: $token, pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "addressListTest",
          params: { token: $token, pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toStatisticsPage($days) {
      let name = "Statistics";
      let params = { day: $days };

      if (typeof this.$route.params.contractHash !== "undefined") {
        params.contractHash = this.$route.params.contractHash;
        name = name + "Contract";
      }

      if (this.$route.params.net === "testnet") {
        params.net = "testnet";
        name = name + "Test";
      }

      this.$router.push({ name: name, params: params });

      location.reload();
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.click-able {
  cursor: pointer;
}
.detail-title {
  display: flex;
  justify-content: space-between;
  .left {
    width: 50%;
    display: flex;
    flex-flow: column;
    align-content: flex-start;
    text-align: left;
    .title {
      font-size: 32px;
      font-family: Explorerfonts-Bold,sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 38px;
    }
    .total {
      padding-top: 30px;
      font-size: 12px;
      font-family: Roboto-Regular, Roboto;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      line-height: 14px;
      span {
        color: rgba(0, 0, 0, 1);
      }
    }
    .block {
      padding-top: 30px;
      font-size: 12px;
      font-family: Roboto-Regular, Roboto;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 14px;
      span {
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
      }
      .img-content {
        margin-left: 19px;
        img {
          margin-right: 9px;
          width: 5px;
          height: 8px;
          transition: opacity ease 0.5s;
        }
        img:hover {
          opacity: 0.5;
          transition: all ease 0.5s;
        }
      }
    }
    .tx {
      padding-top: 30px;
      font-size: 12px;
      font-family: Roboto-Regular, Roboto;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 14px;
      span {
        color: rgba(0, 0, 0, 1);
      }
    }
    .switch {
      padding-top: 30px;
      display: flex;
      .btn-current {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        line-height: 21px;
        .text {
          margin-bottom: 10px;
          color: rgba(0, 0, 0, 1);
        }
        .line {
          width: 20px;
          height: 4px;
          background-color: #000;
          margin: auto;
          transition: all ease 0.5s;
        }
      }
      .btn-choose {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        line-height: 21px;
        cursor: pointer;
        .text {
          margin-bottom: 10px;
          color: rgba(0, 0, 0, 0.6);
        }
        .line {
          width: 20px;
          height: 4px;
          background-color: #fff;
          margin: auto;
          transition: all ease 0.5s;
        }
      }
    }
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column-reverse;
    .search-content {
      position: relative;
      input {
        width: 100%;
        border: 0;
        caret-color: rgba(0, 0, 0, 0);
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        /* line-height: 21px; */
        border-bottom: solid #fafafa 2px;
        padding-bottom: 19px;
        transition: all ease 0.5s;
      }
      input:focus {
        outline: none;
        border-bottom: solid #000 2px;
        transition: all ease 0.5s;
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 19px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 19px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 19px;
      }
      /* 定义blink类*/
      .blink {
        color: #000;
        animation: blink 1s linear infinite;
        background-color: #000;
        width: 4px;
        height: 28px;
        position: absolute;
        top: 0;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink 1s linear infinite;
        -moz-animation: blink 1s linear infinite;
        -ms-animation: blink 1s linear infinite;
        -o-animation: blink 1s linear infinite;
      }
      .searchbutton {
        position: absolute;
        right: 0%;
        top: 0%;
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-image: url("../../assets/images/home/search.png");
        background-size: 100%;
      }
      .searchbutton:hover {
        opacity: 0.6;
        transition: opacity ease 0.3s;
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .detail-title .left .tx span{
    word-break: break-all;
  }
  .detail-title .left{
    width: 100%;
  }
  .detail-title .right{
    display: none;
  }
}
</style>
