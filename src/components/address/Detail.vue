<template>
  <div class="detail-page">
    <div  class="noshow"></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$t('addressDetail.name')"
        :data="$route.params.address"
      ></title-div>
      <div class="detail-content">
        <!--主要余额显示-->
        <div class="item-content">
          <div class="m-item">
            <item-div :tooltipstr="$t('tooltip.address.ont')" :title="$t('addressDetail.ontBalance')" :singledata="nativeAssetsVal.ont||0" :logo="ontlogo"></item-div>
          </div>
          <div class="m-item">
            <item-div :tooltipstr="$t('tooltip.address.ong')" :title="$t('addressDetail.ongBalance')" :singledata="nativeAssetsVal.ong||0" :logo="onglogo"></item-div>
          </div>
        </div>
        <!--可领取和未领取的ONG显示-->
        <div class="item-content">
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.address.claimableong')" 
              :title="$t('addressDetail.claimable')"
              :singledata="nativeAssetsVal.unboundong||0"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.address.unboundong')" 
              :title="$t('addressDetail.unbound')"
              :singledata="nativeAssetsVal.waitboundong||0"
            ></item-div>
          </div>
        </div>
        <!--有其他的OEP-4资产-->
        <div class="item-content" v-if="have4Oep">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.address.oep4')" :title="$t('addressDetail.oep4Assets')" :oep4token="oep4AssetBalance"></item-div>
          </div>
        </div>
        <!--有其他的OEP-5资产-->
        <div class="item-content" v-if="have5Oep">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.address.oep5')" :title="$t('addressDetail.oep5Assets')" :oep5token="oep5AssetBalance"></item-div>
          </div>
        </div>
        <!--2018年万圣节南瓜活动资产-->
        <div class="item-content" v-if="havePumpkin">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.address.oep8')" :title="$t('addressDetail.oep8Assets')" :oep8token="oep8AssetsVal"></item-div>
          </div>
        </div>
      </div>

      <div class="tab-content" v-loading="fullscreenLoading">
        <div class="tabs">
          <div class="switch">
            <div
              @click="toFirstPage('ALL')"
              :class="$route.params.assetName === 'ALL' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">{{$t("addressDetail.txns")}}</div>
              <div class="line"></div>
            </div>
            <div
              @click="toFirstPage('ONT')"
              :class="$route.params.assetName === 'ONT' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">ONT</div>
              <div class="line"></div>
            </div>
            <div
              @click="toFirstPage('ONG')"
              :class="$route.params.assetName === 'ONG' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn btn-left-0-border"
            >
              <div class="text">ONG</div>
              <div class="line"></div>
            </div>
            <div
              @click="toFirstPage('PAX')"
              :class="$route.params.assetName === 'PAX' ? 'btn-current' : 'btn-choose'"
              class="btn btn-left-0-border"
            >
              <div class="text">PAX</div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div v-if ="showTxList.list  && showTxList.list.length > 0" class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('all.hash') }}</th>
                <th>{{$t('all.amount')}}</th>
                <th class="small-th">{{ $t('all.status') }}</th>
                <th class="small-th">{{ $t('all.height') }}</th>
                <th class="small-th">{{ $t('all.fee') }}</th>
                <th class="text-right text-last">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx,index) in showTxList.list" :key="index">
                <td
                  class="click-able text-first"
                  @click="toTransactionDetailPage(tx.tx_hash)"
                >{{tx.tx_hash.substr(0,16) + '...'}}</td>
                <td>
                  <span v-for="(tl,index) in tx.transfers" :key="index">
                    <!--支出-->
                    <span
                      class="expenditure-color"
                      v-if="tl.from_address === $route.params.address"
                    >
                      <span
                        v-if="tl.asset_name.indexOf('pumpkin') > -1"
                      >{{ '-' + $HelperTools.toFinancialVal(tl.amount) + ' ' + $t('assetName.' + tl.asset_name ) }}</span>
                      <span
                        v-else
                      >{{ '-' + $HelperTools.toFinancialVal(tl.amount) + ' ' + tl.asset_name.toUpperCase() }}</span>
                    </span>
                    <!--收入-->
                    <span class="income-color" v-else>
                      <span
                        v-if="tl.asset_name.indexOf('pumpkin') > -1"
                      >{{ $HelperTools.toFinancialVal(tl.amount) + ' ' + $t('assetName.' + tl.asset_name ) }}</span>
                      <span
                        v-else
                      >{{ $HelperTools.toFinancialVal(tl.amount) + ' ' + tl.asset_name.toUpperCase() }}</span>
                    </span>
                    <!--逗号分隔符-->
                    <span
                      v-if="index !== tx.transfers.length - 1"
                      :class="tl.from_address === $route.params.address ? 'expenditure-color' : 'income-color'"
                    >{{ ', ' }}</span>
                  </span>
                </td>
                <td :class="tx.confirm_flag === 1 ? 'confirmed small-th' : 'failed small-th'">{{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}</td>
                <td
                  class="click-able small-th"
                  @click="toBlockDetailPage(tx.block_height)"
                >{{tx.block_height}}</td>
                <td class="small-th">{{tx.fee}} ONG</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ont-pagination v-if="showTxList.total" :total="showTxList.total"></ont-pagination>
        </div>
        <div v-else class="tab-item">No data</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ToExcel from "./../common/DownloadExcel";
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  data() {
    return {
      Ddo: {},
      claimflag: true,
      AssetBalance: [],
      nativeAssetBalance: [],
      oep4AssetBalance: [],
      oep5AssetBalance: [],
      oep8AssetBalance: [],
      otherAssetBalance: [],
      showOtherAssetBalance: [],
      havePumpkin: false, // 标识是否显示2018年万圣节南瓜资产
      haveOtherOep: false, // 标识是否显示OEP-4/5资产
      have4Oep: false, // 标识是否显示OEP-4/5资产
      have5Oep: false, // 标识是否显示OEP-4/5资产
      TxnList: [],
      info: [],
      tmpDown: "",
      showTxList: [],
      loadingFlag: true,
      fullscreenLoading: true,
      ontlogo: require("../../assets/images/detail/ONT.svg"),
      onglogo: require("../../assets/images/detail/ONG.svg"),
    };
  },
  mounted() {
    console.log(this.$route.params);
    if (
      this.$route.params.pageSize == "testnet" ||
      this.$route.params.pageNumber == "testnet" ||
      this.$route.params.assetName == "testnet"
    ) {
      this.$route.params.net = "testnet";
      this.toAddressDetailPage(this.$route.params.address);
    } else {
      if (
        this.$route.params.pageSize == undefined ||
        this.$route.params.pageNumber == undefined ||
        this.$route.params.assetName == undefined
      ) {
        this.toAddressDetailPage(this.$route.params.address);
      } else {
        this.getAddressDetailData();
      }
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: "getAddressDetailData",
    Oep4Balance: function() {
      this.oep4AssetBalance = [];
      this.oep4AssetBalance = this.oep4AssetBalance.concat(
        this.Oep4Balance.list
      );
      if (this.Oep4Balance.list.length > 0) {
        this.have4Oep = true;
      }
    },
    Oep5Balance: function() {
      this.oep5AssetBalance = [];
      this.oep5AssetBalance = this.oep5AssetBalance.concat(
        this.Oep5Balance.list
      );
      if (this.Oep5Balance.list.length > 0) {
        this.have5Oep = true;
      }
    },
    Oep8Balance: function() {
      this.oep8AssetBalance = this.oep8AssetBalance.concat(
        this.Oep8Balance.list
      );
      if (this.Oep8Balance.list.length > 0) {
        this.havePumpkin = true;
      }
    },
    NativeBalance: function() {
      this.nativeAssetBalance = this.nativeAssetBalance.concat(
        this.NativeBalance.list
      );

      /* this.fullscreenLoading = false; */
    },
    TxList: function() {
      console.log("TxList", this.TxList);
      this.showTxList = this.TxList;
      /* this.loadingFlag = true; */
      this.fullscreenLoading = false;
    },
    AssetTxList: function() {
      /* console.log("AssetTxList",this.AssetTxList) */
      this.showTxList = this.AssetTxList;
      /* this.loadingFlag = true; */
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      Oep4Balance: state => state.Addresses.Oep4Balance,
      Oep5Balance: state => state.Addresses.Oep5Balance,
      Oep8Balance: state => state.Addresses.Oep8Balance,
      NativeBalance: state => state.Addresses.NativeBalance,
      TxList: state => state.Addresses.TxList,
      AssetTxList: state => state.Addresses.AssetTxList
    }),
    /**
     * 取出全部原生资产名称和值
     */
    nativeAssetsVal: function() {
      let retAssets = {};

      for (let index in this.nativeAssetBalance) {
        retAssets[
          this.nativeAssetBalance[index].asset_name
        ] = this.$HelperTools.toFinancialVal(
          this.nativeAssetBalance[index].balance
        );
      }
      return retAssets;
    },
    /**
     * 取出全部oep4 oep5资产名称和值
     */
    oep4AssetsVal: function() {
      let retAssets = {};

      for (let index in this.oep4AssetBalance) {
        retAssets[
          this.oep4AssetBalance[index].asset_name
        ] = this.$HelperTools.toFinancialVal(
          this.oep4AssetBalance[index].balance
        );
      }
      return retAssets;
    },
    /**
     * 取出全部oep4 oep5资产名称和值
     */
    oep5AssetsVal: function() {
      let retAssets = {};

      for (let index in this.oep5AssetBalance) {
        retAssets[
          this.oep5AssetBalance[index].asset_name
        ] = this.$HelperTools.toFinancialVal(
          this.oep5AssetBalance[index].balance
        );
      }
      return retAssets;
    },
    /**
     * 取出全部oep8资产名称和值
     */
    oep8AssetsVal: function() {
      let retAssets = {};

      for (let index in this.oep8AssetBalance) {
        retAssets[
          this.oep8AssetBalance[index].asset_name
        ] = this.$HelperTools.toFinancialVal(
          this.oep8AssetBalance[index].balance
        );
      }
      return retAssets;
    }
  },
  methods: {
    toFirstPage(oepValue) {
      let params = { assetName: oepValue, pageSize: 10, pageNumber: 1 };
      this.routerPush(params);
    },
    routerPush(params) {
      // 判断网络
      if (this.$route.params.net === "testnet") {
        params["net"] = "testnet";
      }

      // 判断是否有其他参数
      if (typeof this.paramVal !== "undefined") {
        params[this.$route.name] = this.paramVal;
      }

      // 注意在view组件中需要用watch触发数据刷新！！
      this.$router.push({ name: this.$route.name, params: params });
    },
    getAddressDetailData() {
      this.fullscreenLoading = true;
      /* this.loadingFlag = false; */
      var params = this.$route.params;
      /* console.log(params) */
      params.contractType = "native";
      this.$store.dispatch("GetAddressNativeDetail", params).then();
      params.contractType = "oep4";
      this.$store.dispatch("GetAddressOep4Detail", params).then();
      params.contractType = "oep5";
      this.$store.dispatch("GetAddressOep5Detail", params).then();
      params.contractType = "oep8";
      this.$store.dispatch("GetAddressOep8Detail", params).then();
      this.showTxList = []
      if (params.assetName == "ALL") {
        this.$store.dispatch("GetAddressTX", params).then();
      } else {
        this.$store.dispatch("GetAddressAssetTX", params).then();
      }
    },
    /* 20190524 新增的接口设计是某种南瓜没有就不返回，所以手动补0 */
    zeroPlus(num) {
      return num ? num : 0;
    },
    toReturn() {
      this.$router.go(-1);
    },
    toTransactionDetailPage($TxnId) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "TransactionDetail",
          params: { tx_hash: $TxnId }
        });
      } else {
        this.$router.push({
          name: "TransactionDetailTest",
          params: { tx_hash: $TxnId, net: "testnet" }
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
    goToPage($Page) {
      var address = this.$route.params.address;
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "AddressDetail",
          params: {
            address: address,
            pageSize: $Page.pageSize,
            pageNumber: $Page.pageNumber
          }
        });
      } else {
        this.$router.push({
          name: "AddressDetailTest",
          params: {
            address: address,
            pageSize: $Page.pageSize,
            pageNumber: $Page.pageNumber,
            net: "testnet"
          }
        });
      }
      this.getAddressDetailData();
    }
  },
  components: { ToExcel, itemDiv, titleDiv }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/detail-page.less";
</style>
<style>
.el-loading-spinner .path {
  stroke: #000;
}
</style>
