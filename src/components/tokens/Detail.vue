<template>
  <div class="detail-page">
    <div class="noshow"></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$t('tokens.detail.name')"
        :data="$route.params.contractHash"
      ></title-div>

      <div class="detail-content">
        <div class="item-content">
          <div class="item">
            <item-div :title="$t('all.name')" :singledata="tokenData.name"  :logo="tokenData.logo"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :title="$t('all.description')" :singledata="tokenData.description"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="m-item">
            <item-div :tooltipstr="$t('tooltip.token.creater')"  :title="$t('tokens.detail.creator')" :singledata="tokenData.creator"></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.token.createdTime')"
              :title="$t('tokens.detail.createdTime')"
              :singledata="$HelperTools.getTransDate(tokenData.create_time)"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.token.totalSupply')"
              :title="$t('tokens.detail.totalSupply')"
              :singledata="$HelperTools.toFinancialVal(tokenData.total_supply)"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div :tooltipstr="$t('tooltip.token.decimals')" :title="$t('tokens.detail.decimals')" :singledata="tokenData.decimals"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.token.vm_category')" :title="$t('tokens.detail.vm_category')" :singledata="tokenData.vm_category"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.token.addressesamount')"
              :title="$t('tokens.list.tab.addressCount')"
              :singledata="$HelperTools.toFinancialVal(tokenData.address_count )"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.token.txamount')"
              :title="$t('tokens.detail.txn')"
              :singledata="$HelperTools.toFinancialVal(tokenData.tx_count)"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
            :tooltipstr="$t('tooltip.token.volume')"
              :title="$t('tokens.detail.volume')"
              :singledata="$HelperTools.toFinancialVal(parseInt(tokenData.ont_sum)) + ' ONT,  '+$HelperTools.toFinancialVal(tokenData.ong_sum) + ' ONG'"
            ></item-div>
          </div>
        </div>
      </div>

      <div class="tab-content"  v-loading="fullscreenLoading">
        <div class="tabs">
          <div class="switch">
            <div
              @click="toPage('txns')"
              :class="txnsFlag ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">{{ $t('all.txns') }}</div>
              <div class="line"></div>
            </div>
            <div
              v-if="$route.params.contractType == 'oep8'"
              @click="toPage('tokens')"
              :class="tokensFlag ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">{{ $t('all.tokens') }}</div>
              <div class="line"></div>
            </div>
            <div
              @click="toPage('code')"
              :class="codeFlag ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">{{ $t('tokens.detail.code') }}</div>
              <div class="line"></div>
            </div>
            <div
              @click="toPage('abi')"
              :class="abiFlag ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn btn-left-0-border"
            >
              <div class="text">{{ $t('tokens.detail.abi') }}</div>
              <div class="line"></div>
            </div>
            <div
            v-if="$route.params.contractType === 'oep4'"
              @click="toPage('holder')"
              :class="holderFlag ? 'btn-current' : 'btn-choose'"
              class="btn btn-left-0-border"
            >
              <div class="text">{{ $t('tokens.detail.holder') }}</div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <!-- 交易列表 -->
        <div v-if="txnsFlag" class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('all.hash') }}</th>
                  <th class="small-th">{{ $t('all.fee') }}</th>
                <th v-if="$route.params.contractType === 'oep5'">{{ $t('tokens.detail.tokenLbl') }}</th>
                <th v-if="$route.params.contractType === 'oep5'">{{ $t('tokens.detail.tokenImg') }}</th>
                <th>{{ $t('all.status') }}</th>
                  <th class="small-th">{{ $t('all.block') }}</th>
                <th class="text-right text-last">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx,index) in contractTxList.list" :key="index">
                <td
                  class="click-able text-first"
                  @click="toTransactionDetailPage(tx.tx_hash)"
                >{{tx.tx_hash.substr(0,16) + '...'}}</td>
                  <td>{{Number(tx.fee).toString()}}</td>
                <td v-if="$route.params.contractType === 'oep5' ">{{ tx.hd_name }}</td>
                <td v-if="$route.params.contractType === 'oep5' ">
                  <img
                    width="100px"
                    :src="typeof(tx.json_url) === 'undefined' ? '' : tx.hd_image"
                    alt
                  />
                </td>
                <td :class="tx.confirm_flag === 1 ? 'confirmed' : 'failed'">{{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}</td>
                  <td>{{tx.block_height}}</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ont-pagination v-if="contractTxList.total" :total="contractTxList.total"></ont-pagination>
        </div>
        <!-- 资产列表（oep8独有） -->
        <div v-if="tokensFlag && $route.params.contractType == 'oep8'" class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('all.name') }}</th>
                <th class="text-right text-last">{{ $t('tokens.detail.totalSupply') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tokenData.symbol" :key="index">
                <td class="text-first">{{item}}</td>
                <td
                  class="text-right text-last"
                >{{$HelperTools.toFinancialVal(tokenData.total_supply[index])}}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <!-- code -->
        <div v-if="codeFlag" class="tab-item">
            <!-- <textarea id="scCodeData" readonly :rows="'6'" v-model="tokenData.code"></textarea> -->
            <item-div v-if="tokenData.code"
              :jsondata="tokenData.code"
            ></item-div>
        </div>
        <!-- abi -->
        <div v-if="abiFlag" class="tab-item">
            <!-- <textarea id="scCodeData" readonly :rows="'6'" v-model="tokenData.abi"></textarea> -->
            <item-div v-if="tokenData.abi"
              :jsondata="JSON.parse(tokenData.abi)"
            ></item-div>
        </div>
        <!-- holder -->
        <div v-if="holderFlag" class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('addressList.rank') }}</th>
                <th>{{ $t('addressList.name') }}</th>
                <th>{{ $t('addressList.balance') }}</th>
                <th class="text-right text-last"> {{$t('addressList.percent') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(address,index) in holder.list" :key="index">
                <td class="text-first">{{Number(holder.basicRank) + index}}</td>
                <td class="click-able" @click="toAddressDetailPage(address.addressShow)">{{address.addressShow.substr(0,6) + '...' + address.addressShow.substr(28)}}</td>
                <td>{{address.showbalance}}</td>
                <td class="text-right text-last">{{(address.percent * 100).toFixed(4)}}%</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ont-pagination v-if="holderCount.total" :total="holderCount.total"></ont-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Clipboard from "clipboard";
import HelperTool from "./../../helpers/helper";
const BigNumber = require("bignumber.js");
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  name: "Token-Detail",
  components: {
    itemDiv,
    titleDiv
  },
  mounted() {
    this.getTokenData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: "getTokenData",
    token: function() {
      console.log("token", this.token);
      this.tokenData = this.token.list;
      this.$store.dispatch("GetTokenHolder", this.$route.params).then();
      this.$store.dispatch("GetTokenHolderCount", this.$route.params).then();
    },
    contractTxList: function() {
      console.log("tokenTXList", this.contractTxList);
      this.loadingFlag = true;
      this.fullscreenLoading = false;
      if (this.$route.params.contractType === "oep5") {
        for (var i = 0; i < this.contractTxList.list.length; i++) {
          if (this.contractTxList.list[i].json_url) {
            for (var key in this.$HelperTools.strToJson(
              this.contractTxList.list[i].json_url
            )) {
              if (key == "name") {
                this.contractTxList.list[
                  i
                ].hd_name = this.$HelperTools.strToJson(
                  this.contractTxList.list[i].json_url
                )[key];
              }
              if (key == "image") {
                this.contractTxList.list[
                  i
                ].hd_image = this.$HelperTools.strToJson(
                  this.contractTxList.list[i].json_url
                )[key];
              }
            }
          }
        }
      }
    },
    holder: function() {
      let num = "1";
      for (var j = 0; j < this.tokenData.decimals; j++) {
        num = num + "0";
      }
      num = Number(num);
      console.log(num);
      for (var i = 0; i < this.holder.list.length; i++) {
        this.holder.list[i].addressShow = new Ont.Crypto.Address(
          this.holder.list[i].address
        ).toBase58();
        let x = new BigNumber(this.holder.list[i].balance);
        let y = new BigNumber(num);
        this.holder.list[i].showbalance = x.dividedBy(y);
      }
    }
  },
  computed: {
    ...mapState({
      contractTxList: state => state.Contracts.TxList,
      token: state => state.Tokens.Detail,
      holder: state => state.Tokens.Holder,
      holderCount: state => state.Tokens.Count
    })
  },
  data() {
    return {
      showCodeCopied: false,
      showABICopied: false,
      tokenData: {},
      tokenInfo: {},
      loadingFlag: false,
      fullscreenLoading: true,
      txnsFlag: true,
      tokensFlag: false,
      codeFlag: false,
      abiFlag: false,
      holderFlag: false
    };
  },
  methods: {
    toPage($val) {
      if ($val == "txns") {
        this.txnsFlag = true;
        this.tokensFlag = false;
        this.codeFlag = false;
        this.abiFlag = false;
        this.holderFlag = false;
      }
      if ($val == "tokens") {
        this.txnsFlag = false;
        this.tokensFlag = true;
        this.codeFlag = false;
        this.abiFlag = false;
        this.holderFlag = false;
      }
      if ($val == "code") {
        this.txnsFlag = false;
        this.tokensFlag = false;
        this.codeFlag = true;
        this.abiFlag = false;
        this.holderFlag = false;
      }
      if ($val == "abi") {
        this.txnsFlag = false;
        this.tokensFlag = false;
        this.codeFlag = false;
        this.abiFlag = true;
        this.holderFlag = false;
      }
      if ($val == "holder") {
        this.txnsFlag = false;
        this.tokensFlag = false;
        this.codeFlag = false;
        this.abiFlag = false;
        this.holderFlag = true;
      }
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
    getTokenData() {
      this.token.list = "";
      this.loadingFlag = false;
      this.fullscreenLoading = true;
      this.$store.dispatch("GetToken", this.$route.params).then();
      this.$store.dispatch("GetContractTx", this.$route.params).then();
    },
    toTransDetailPage($TxnId) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TransactionDetailTest",
          params: { tx_hash: $TxnId, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "TransactionDetail",
          params: { tx_hash: $TxnId }
        });
      }
    },
    copyDetailVal($id) {
      let clipboard = new Clipboard(".copy-success");

      clipboard.on("success", function(e) {
        e.clearSelection();
      });

      if ($id === "scCodeData") {
        this.showCodeCopied = true;
      } else {
        this.showABICopied = true;
      }
    },
    toJson(str) {
      return JSON.parse(str);
    }
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
</style>