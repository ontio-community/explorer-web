<template>
  <div class="detail-page">
    <div class="noshow"></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$t('contracts.detail.name')"
        :data="$route.params.contractHash"
      ></title-div>

      <div v-if="contract.list" class="detail-content">
        <div class="item-content">
          <div class="item">
            <item-div
              :title="$t('all.name')"
              :singledata="contract.list.name"
              :logo="contract.list.logo?contract.list.logo:'nologo'"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :title="$t('all.description')" :singledata="contract.list.description"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
              :tooltipstr="$t('tooltip.contract.creater')"
              :title="$t('contracts.detail.creator')"
              :singledata="contract.list.creator"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
              :tooltipstr="$t('tooltip.contract.createdTime')"
              :title="$t('contracts.detail.createdTime')"
              :singledata="$HelperTools.getTransDate(contract.list.create_time)"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div
              :title="$t('contracts.detail.contact')"
              :contactdata="contract.list.contact_info"
            ></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="m-item">
            <item-div
              :tooltipstr="$t('tooltip.contract.addressesamount')"
              :title="$t('tokens.list.tab.addressCount')"
              :singledata="$HelperTools.toFinancialVal(contract.list.address_count)"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
              :tooltipstr="$t('tooltip.contract.txamount')"
              :title="$t('tokens.detail.txn')"
              :singledata="$HelperTools.toFinancialVal(contract.list.tx_count)"
            ></item-div>
          </div>
          <div class="m-item">
            <item-div
              :tooltipstr="$t('tooltip.contract.volume')"
              :title="$t('tokens.detail.volume')"
              :singledata="$HelperTools.toFinancialVal(parseInt(contract.list.ont_sum)) + ' ONT,  '+$HelperTools.toFinancialVal(contract.list.ong_sum) + ' ONG'"
            ></item-div>
          </div>
        </div>
      </div>

      <!--更明显的展示方式，后期开放-->
      <!--<detail-block-2 :name1="$t('contracts.detail.ontFlow')" :val1="contract.list.OntCount" :rows1="'1.1'"-->
      <!--:name2="$t('contracts.detail.ongFlow')" :val2="contract.list.OngCount" :rows2="'1.1'">-->
      <!--</detail-block-2>-->

      <!-- Tab Control -->

      <div class="tab-content" v-loading="fullscreenLoading">
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
              @click="toPage('statistics')"
              :class="statisticsFlag ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn btn-left-0-border"
            >
              <div class="text">{{ $t('tokens.detail.statistic') }}</div>
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
                  <th>{{ $t('all.fee') }}</th>
                  <th>{{ $t('all.status') }}</th>
                  <th>{{ $t('all.block') }}</th>
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
                  <td
                    :class="tx.confirm_flag === 1 ? 'confirmed' : 'failed'"
                  >{{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}</td>
                  <td>{{tx.block_height}}</td>
                  <td class="text-right text-last">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ont-pagination v-if="contractTxList.total" :total="contractTxList.total"></ont-pagination>
        </div>
        <!-- code -->
        <div v-if="codeFlag" class="tab-item">
          <item-div v-if="contract.list.code" :jsondata="contract.list.code"></item-div>
        </div>
        <!-- abi -->
        <div v-if="abiFlag" class="tab-item">
          <item-div v-if="contract.list.abi" :jsondata="JSON.parse(contract.list.abi)"></item-div>
        </div>
        <div v-if="statisticsFlag" class="tab-item">
          <div class="chart-content">
            <div class="chart-item" v-for="(item,index) in statisticsData.data" :key="index">
              <line-chart
                v-if="hackReset"
                class="line-chart-style"
                :labels="statisticsData.labels"
                :label="14 + $t('statistics.day') + $t('statistics.' + item.label)"
                :data="item.list"
                :index="index"
              ></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Clipboard from "clipboard";
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  name: "Contracts-Detail",
  components: {
    itemDiv,
    titleDiv
  },
  mounted() {
    if (
      this.$route.params.pageSize == undefined ||
      this.$route.params.pageNumber == undefined ||
      this.$route.params.contractType == undefined
    ) {
      this.toContractDetailPage(this.$route.params.contractHash);
    } else {
      this.getContractData();
      this.getStatisticsData();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: ["getContractData", "getStatisticsData"],
    contract: function() {
      //  console.log(this.contract)
      if (
        this.$route.params.contractHash ==
        "cae215265a5e348bfd603b8db22893aa74b42417"
      ) {
        this.contract.list.address_count =
          this.contract.list.address_count + 32620;
        this.contract.list.total = this.contract.list.total + 63617;
        var cacuOng = parseFloat(this.contract.list.ong_sum) * 1000000000;
        var cacuOnt = parseFloat(this.contract.list.ont_sum);
        cacuOng = cacuOng + 116055.79681789 * 1000000000;
        this.contract.list.ont_sum = cacuOnt.toString();
        this.contract.list.ong_sum = (cacuOng / 1000000000).toString();
      }
    },
    contractTxList: function() {
      this.loadingFlag = true;
      this.fullscreenLoading = false;
      //  console.log(this.contractTxList)
    }
  },
  computed: {
    ...mapState({
      contract: state => state.Contracts.Detail,
      contractTxList: state => state.Contracts.TxList,
      statisticsData: state => state.Statistics.StatisticsData
    })
  },
  data() {
    return {
      showCodeCopied: false,
      showABICopied: false,
      hackReset: false,
      loadingFlag: false,
      fullscreenLoading: true,
      txnsFlag: true,
      codeFlag: false,
      abiFlag: false,
      statisticsFlag: false
    };
  },
  methods: {
    toPage($val) {
      if ($val == "txns") {
        this.txnsFlag = true;
        this.codeFlag = false;
        this.abiFlag = false;
        this.statisticsFlag = false;
      }
      if ($val == "code") {
        this.txnsFlag = false;
        this.codeFlag = true;
        this.abiFlag = false;
        this.statisticsFlag = false;
      }
      if ($val == "abi") {
        this.txnsFlag = false;
        this.codeFlag = false;
        this.abiFlag = true;
        this.statisticsFlag = false;
      }
      if ($val == "statistics") {
        this.txnsFlag = false;
        this.codeFlag = false;
        this.abiFlag = false;
        this.statisticsFlag = true;
      }
    },
    turnTo(scVal) {
      if (scVal.substr(0, 4) != "http") {
        window.open("http://" + scVal);
      } else {
        window.open(scVal);
      }
    },
    getContractData() {
      this.contract.list = "";
      this.fullscreenLoading = true;
      if (this.$route.params.contractType == undefined) {
        this.$route.params.contractType = "all";
      }
      this.$store.dispatch("GetContract", this.$route.params).then();
      this.$store.dispatch("GetContractTx", this.$route.params).then();
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
    toContractDetailPage($hash) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "ContractDetailTest",
          params: {
            contractType: "all",
            contractHash: $hash,
            pageSize: 10,
            pageNumber: 1,
            net: "testnet"
          }
        });
      } else {
        this.$router.push({
          name: "ContractDetail",
          params: {
            contractType: "all",
            contractHash: $hash,
            pageSize: 10,
            pageNumber: 1
          }
        });
      }
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
    getStatisticsData() {
      this.statisticsData.data = "";

      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });

      this.$store.dispatch("getStatisticsData", this.$route.params).then();
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