<template>
  <div class="detail-page">
    <div class="noshow" ></div>
    <div class="container">
      <title-div class="title-content" :title="$t('txDetail.name')" :data="txData.tx_hash"></title-div>

      <!-- Transaction Detail Basic Info: -->
      <div class="detail-content">
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.tx.time')"
              :title="$t('blockDetail.BlockTime')"
              :singledata="$HelperTools.getTransDate(txData.tx_time)"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.tx.type')"
              :title="$t('txDetail.type')"
              :singledata="txData.tx_type === 208 ? $t('txDetail.deploySC') : txData.tx_type === 209 ? $t('txDetail.sc') : $t('txDetail.wasmsc')"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.tx.height')"
              :title="$t('txDetail.height')"
              :singledata="txData.block_height"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.tx.fee')"
              :title="$t('txDetail.fee')"
              :singledata="Number(txData.fee)+' ONG'"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.tx.status')"
              :title="$t('txDetail.status')"
              :singledata="txData.confirm_flag === 1 ? $t('all.confirmed'):$t('all.failed')"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.tx.txhex')"
              :title="$t('txDetail.transactionHex')"
              :jsondata="TXDetail"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.tx.txjson')"
              :title="$t('txDetail.transactionJson')"
              :jsondata="JSONTXDetail"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.tx.scevent')"
              :title="$t('txDetail.detial')"
              :jsondata="SCDetail"
            ></item-div>
          </div>
        </div>
        <!--展示Issuer OntId和Description的数据块 创建claim-->
        <div v-if="recordflag" class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.ontId')"
              :singledata="txData.description.substr(12, 42)"
            ></item-div>
          </div>
        </div>
        <div v-if="recordflag" class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.description')"
              :singledata="txData.description.substr(55)"
            ></item-div>
          </div>
        </div>
        <!--展示ONT ID和Description的数据块-->
        <div v-if="idflag" class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.ontId')"
              :singledata="txData.detail.ontid"
            ></item-div>
          </div>
        </div>
        <div v-if="idflag" class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.description')"
              :singledata="txData.description"
            ></item-div>
          </div>
        </div>
        <!--展示部署合约的数据块-->
        <div v-if="scflag" class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.description')"
              :jsondata="JSON.parse(txData.description)"
            ></item-div>
          </div>
        </div>
      </div>
      <!--展示转账金额等详情的数据块-->
      <div class="tab-content" v-if="txflag"  v-loading="fullscreenLoading">
        <div class="tab-title">{{$t("txDetail.transfersOnTx")}}</div>
        <div class="tab-item">
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-first">{{ $t('all.from') }}</th>
                  <th class="small-th">{{ $t('all.amount') }}</th>
                  <th>{{ $t('all.to') }}</th>
                  <th class="text-right text-last">{{ $t('all.description') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tx,index) in txData.detail.transfers" :key="index">
                  <td class="click-able text-first" @click="toAddressDetailPage(tx.from_address)">{{tx.from_address.substr(0,8)+'...'+tx.from_address.substr(27,8)}}</td>
                  <td class="small-th">{{tx.amount}} {{getAssetName(tx.asset_name)}}</td>
                  <td class="click-able" @click="toAddressDetailPage(tx.to_address)">{{tx.to_address.substr(0,8)+'...'+tx.to_address.substr(27,8)}}</td>
                  <td class="text-right text-last text-first-up">{{tx.description}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GetTransactionType from "./../../common/OntMsg/GetTransactionType.js";
import VueJsonPretty from "vue-json-pretty";
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  name: "transaction-detail-page",
  data() {
    return {
      txflag: false,
      idflag: false,
      recordflag: false,
      authflag: false,
      scflag: false,
      detailFlag: false,
      detailFlagFlag: false,
      txdetailFlag: false,
      txdetailFlagFlag: false,
      jsontxdetailFlagFlag: false,
      jsontxdetailFlag: false,
      TXDetailjson: {},
      fullscreenLoading: true
    };
  },
  mounted() {
    this.initData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log(window.location.href.indexOf("testnet") > -1);
    console.log(this.$route)
  },
  watch: {
    $route: "initData",
    txData: function() {
      /* console.log(this.txData) */
      if (this.txData.confirm_flag === 1) {
        this.getEventType(this.txData.event_type);
      } else {
        this.txflag = false;
        this.idflag = false;
      }
      this.fullscreenLoading = false;
      /*         console.log("id",this.idflag)
        console.log("tx",this.txflag)
        console.log("record",this.recordflag)
        console.log("record",this.txData.description.substr(0,4)) */
    },
    TXDetail: function() {
      this.TXDetailFlag = true;
      this.TXDetailjson.Hex = this.TXDetail;
      console.log("", this.TXDetailjson);
      console.log("", this.TXDetail);
      this.fullscreenLoading = false;
      /*  Vue.set(this.TXDetail,this.TXDetail) */
    },
    JSONTXDetail: function() {
      console.log("", this.JSONTXDetail);
      /*  Vue.set(this.TXDetail,this.TXDetail) */
    }
  },
  computed: {
    ...mapState({
      txData: state => state.Transactions.Detail,
      SCDetail: state => state.Transactions.SCDetail,
      TXDetail: state => state.Transactions.TXDetail,
      JSONTXDetail: state => state.Transactions.JSONTXDetail
    }),
    issuerData: function() {
      return [
        {
          name: this.$t("txDetail.issuer"),
          val: this.txData.description.substr(12, 42),
          rows: 2
        },
        {
          name: this.$t("all.description"),
          val: this.txData.description.substr(55),
          rows: 2
        }
      ];
    }
  },
  methods: {
    /**
     * 隐藏或显示交易详情
     */
    switchDetail() {
      this.detailFlag = !this.detailFlag;
      this.detailFlagFlag = true;
    },
    /**
     * 隐藏或显示交易详情
     */
    switchtxHexDetail() {
      this.txdetailFlag = !this.txdetailFlag;
      this.txdetailFlagFlag = true;
    },
    /**
     * 隐藏或显示交易详情
     */
    switchtxJsonDetail() {
      this.jsontxdetailFlag = !this.jsontxdetailFlag;
      this.jsontxdetailFlagFlag = true;
    },
    /**
     * 获取资产的真实名称
     *
     * @param name
     * @return {*|string}
     */
    getAssetName(name) {
      let realname = "";

      switch (name) {
        case "pumpkin01":
          realname = this.$t("assetName.pumpkin01");
          break;
        case "pumpkin02":
          realname = this.$t("assetName.pumpkin02");
          break;
        case "pumpkin03":
          realname = this.$t("assetName.pumpkin03");
          break;
        case "pumpkin04":
          realname = this.$t("assetName.pumpkin04");
          break;
        case "pumpkin05":
          realname = this.$t("assetName.pumpkin05");
          break;
        case "pumpkin06":
          realname = this.$t("assetName.pumpkin06");
          break;
        case "pumpkin07":
          realname = this.$t("assetName.pumpkin07");
          break;
        case "pumpkin08":
          realname = this.$t("assetName.pumpkin08");
          break;
        case "ong":
          realname = "ONG";
          break;
        case "ont":
          realname = "ONT";
          break;
        default:
          realname = name;
      }

      return realname;
    },
    toMoney(txTmp) {
      /* console.log(txTmp) */
      if (txTmp.asset_name === "ont") {
        let num = txTmp.amount;
        //   return num.split('').reverse().join('').substr(10, 10).split('').reverse().join('')
        return Number(txTmp.amount);
      } else {
        return Number(txTmp.amount);
      }
    },
    initData() {
      this.fullscreenLoading = true;
      this.getTxData();
      this.getTxDetail();
    },
    getTxData() {
      this.$store.dispatch("GetTransaction", this.$route.params).then();
    },
    getTxDetail() {
      this.$store.dispatch("GetTransactionDetail", this.$route.params).then();
      this.$store.dispatch("GetTransactionInfo", this.$route.params).then();
      this.$store.dispatch("GetTransactionJsonInfo", this.$route.params).then();
    },
    getTransactionType($case) {
      return GetTransactionType.getTransactionType($case);
    },
    toBlockDetailPage($blockHeight) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "blockDetail",
          params: { param: $blockHeight }
        });
      } else {
        this.$router.push({
          name: "blockDetailTest",
          params: { param: $blockHeight, net: "testnet" }
        });
      }
    },
    toAddressDetailPage($address) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "AddressDetail",
          params: {
            address: $address,
            assetName: "ALL",
            pageSize: 20,
            pageNumber: 1
          }
        });
      } else {
        this.$router.push({
          name: "AddressDetailTest",
          params: {
            address: $address,
            assetName: "ALL",
            pageSize: 20,
            pageNumber: 1,
            net: "testnet"
          }
        });
      }
    },
    toOntIdDetailPage($ontid) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "OntIdDetail",
          params: { ontid: $ontid, pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "OntIdDetailTest",
          params: { ontid: $ontid, pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    getEventType($type) {
      if ($type == 0 || $type == 2 || $type == 6) {
        this.txflag = false;
        this.idflag = false;
        this.recordflag = false;
        this.authflag = false;
        this.scflag = false;
      }
      // 创建智能合约交易
      // 例子 a871dfa80c4792f9ed07add2c800f3fd43fc3b425f150d15d87773603537dfec
      if ($type == 1) {
        this.txflag = false;
        this.idflag = false;
        this.recordflag = false;
        this.authflag = false;
        this.scflag = true;
      }
      // 创建claim
      // 例子 64d1a243867a619fffb54b2238bdf4438c71a7c3c0da57315af2125626373d51
      if ($type == 5) {
        this.txflag = false;
        this.idflag = false;
        this.recordflag = true;
        this.authflag = false;
        this.scflag = false;
      }
      // 创建ontid 
      // 例子 90f012014352d31c9ed71ab3155e46f9d68492d3a0e5140154fde469fb368a2c
      if ($type == 4) {
        this.txflag = false;
        this.idflag = true;
        this.recordflag = false;
        this.authflag = false;
        this.scflag = false;
      }
      // 转账交易
      // 例子 2cc2cf8d53b872d55b56d3eb3f636911034daaff3a534493891358d2f220354e
      if ($type == 3) {
        this.txflag = true;
        this.idflag = false;
        this.recordflag = false;
        this.authflag = false;
        this.scflag = false;
      }
    }
  },
  components: {
    VueJsonPretty,
    itemDiv,
    titleDiv
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/detail-page.less";
</style>
<style>
.el-loading-spinner .path {
  stroke: #000;
}
