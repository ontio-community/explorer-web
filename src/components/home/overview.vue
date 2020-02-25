<template>
  <div class="home-overview">
    <div class="container">
      <div class="title">
        <div class="text">{{ $t('runStatus.overview') }}</div>
      </div>
      <div class="content">
        <div class="item click-able" @click="toBlockListPage()">
          <div class="data">
            <countTo
              ref="_dApp"
              :startVal="height.startVal"
              :autoplay="autoplay"
              :endVal="height.endVal"
              :duration="numDuration"
            ></countTo>
          </div>
          <div class="itemTitle">{{ $t('runStatus.CurrentHeight') }}</div>
        </div>
        <div class="item click-able" @click="toTransactionListPage()">
          <div class="data">
            <countTo
              ref="_dApp"
              :startVal="txNum.startVal"
              :autoplay="autoplay"
              :endVal="txNum.endVal"
              :duration="numDuration"
            ></countTo>
          </div>
          <div class="itemTitle">{{ $t('runStatus.TxnCount') }}</div>
        </div>
        <div v-if="!$route.params.net" class="item click-able" @click="toOnlineNodes()">
          <div class="data">
            <countTo
              ref="_dApp"
              :startVal="nodeNum.startVal"
              :autoplay="autoplay"
              :endVal="nodeNum.endVal"
              :duration="numDuration"
            ></countTo>
          </div>
          <div class="itemTitle">{{ $t('runStatus.NodeCount') }}</div>
        </div>
        <div class="item click-able" @click="toAddressListPage()">
          <div class="data">
            <countTo
              ref="_dApp"
              :startVal="addressNum.startVal"
              :autoplay="autoplay"
              :endVal="addressNum.endVal"
              :duration="numDuration"
            ></countTo>
          </div>
          <div class="itemTitle">{{ $t('runStatus.addressCount') }}</div>
        </div>
        <div class="item click-able" @click="toOntIdListPage()">
          <div class="data">
            <countTo
              ref="_dApp"
              :startVal="ontidNum.startVal"
              :autoplay="autoplay"
              :endVal="ontidNum.endVal"
              :duration="numDuration"
            ></countTo>
          </div>
          <div class="itemTitle">{{ $t('runStatus.ontid') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Helper from "./../../helpers/helper.js";
import countTo from "vue-count-to";

export default {
  name: "run-status",
  components: {
    countTo
  },
  data() {
    return {
      num: 1,
      startValue: 0,
      endVal: 10000,
      numDuration: 2000,
      height: {
        startVal: 0,
        endVal: 0
      },
      txNum: {
        startVal: 0,
        endVal: 0
      },
      nodeNum: {
        startVal: 0,
        endVal: 0
      },
      addressNum: {
        startVal: 0,
        endVal: 0
      },
      ontidNum: {
        startVal: 0,
        endVal: 0
      },
      autoplay: true,
      runTime: 0,
      blockHeight: 0,
      blockTime: 0,
      dealNum: 0,
      node: 0,
      lastheight: 0,
      k: 0
    };
  },
  mounted() {
    this.getRunStatus();
    this.getNodeCountStatus();
    this.intervalBlock = setInterval(() => {
      this.getRunStatus();
    }, 6000);
  },
  watch: {
    $route: "getRunStatus",
    "blockStatus.info": function(val, oldval) {
      if (oldval) {
        this.height.startVal = oldval.block_height;
        this.height.endVal = val.block_height;
        this.txNum.startVal = oldval.tx_count;
        this.txNum.endVal = val.tx_count;
        this.addressNum.startVal = oldval.address_count;
        this.addressNum.endVal = val.address_count;
        this.ontidNum.startVal = oldval.ontid_count;
        this.ontidNum.endVal = val.ontid_count;
      } else {
        this.height.startVal = 0;
        this.height.endVal = val.block_height;
        this.txNum.startVal = 0;
        this.txNum.endVal = val.tx_count;
        this.addressNum.startVal = 0;
        this.addressNum.endVal = val.address_count;
        this.ontidNum.startVal = 0;
        this.ontidNum.endVal = val.ontid_count;
      }
    },
    "nodeCount.info": function(val, oldval) {
      if (oldval) {
        this.nodeNum.startVal =
          oldval.candidate_node_count + oldval.consensus_node_count;
        this.nodeNum.endVal =
          val.candidate_node_count + val.consensus_node_count;
      } else {
        this.nodeNum.startVal = 0;
        this.nodeNum.endVal =
          val.candidate_node_count + val.consensus_node_count;
      }
    }
  },
  computed: {
    ...mapState({
      blockStatus: state => state.RunStatus.BlockStatus,
      nodeCount: state => state.RunStatus.NodeCount
    })
  },
  methods: {
    setTime() {
      if (this.k < this.addLength) {
        if (this.k >= this.addLength) {
          clearInterval(this.handler); //关闭定时
        }
        this.chartData.splice(0, 1);
        this.chartLabels.splice(0, 1);
        this.chartData.push(this.addDatas[this.addLength - this.k - 1]);
        this.chartLabels.push(this.addLabels[this.addLength - this.k - 1]);
        this.removeData(this.myChart);
        this.addData(this.myChart, this.addDatas[this.addLength - this.k - 1]);

        this.k++;
      }
    },
    toBlockListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "blockList",
          params: { pageSize: 10, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "blockListDetailTest",
          params: { pageSize: 10, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toTransactionListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "TransactionList",
          params: { pageSize: 10, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "TransactionListTest",
          params: { pageSize: 10, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toAddressListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "addressList",
          params: { token: "ont", pageSize: 10, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "addressListTest",
          params: { token: "ont", pageSize: 10, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toOntIdListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "OntIdList",
          params: { pageSize: 10, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "OntIdListDetailTest",
          params: { pageSize: 10, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toOnlineNodes() {
      /* this.$router.push({ name: 'NodeStakeList'}) */
      window.open("https://node.ont.io/");
    },
    getNodeCountStatus() {
      this.$store.dispatch("getNodeCount").then();
    },
    getRunStatus() {
      this.$store.dispatch("getRunStatus", this.$route.params).then();
    },
    getDay($time) {
      return Helper.getDayFunc($time);
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalBlock);
    clearInterval(this.intervalBlock1);
  }
};
</script>

<style lang="less" scoped>
.click-able {
  cursor: pointer;
  transition: all ease 0.3s
}
.click-able:hover {
  opacity: 0.5;
  transition: all ease 0.3s
}
.home-overview {
  text-align: left;
  .container {
    padding-top: 140px;
    .title {
      .text {
        font-size: 32px;
        font-family: Explorerfonts-Bold,sans-serif;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 38px;
      }
    }
    .content {
      padding-top: 60px;
      display: flex;
      justify-content: space-between;
      .item {
        /* width: 20%; */
        .data {
          font-size: 26px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 33px;
        }
        .itemTitle {
          padding-top: 10px;
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.3);
          line-height: 14px;
        }
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .home-overview {
  text-align: left;
  .container {
    padding-top: 70px;
    .content {
      padding-top: 60px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        padding-bottom: 24px;
      }
    }
  }
}
}
</style>
