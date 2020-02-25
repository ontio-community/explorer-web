<template>
  <div class="home-lastdata">
    <div class="container">
      <div class="title">{{$t("lastData.lastdata")}}</div>
      <div class="content">
        <div class="item">
          <block-div :listdata="blocklistdata"></block-div>
        </div>
        <div class="item">
          <tx-div :listdata="txlistdata"></tx-div>
        </div>
        <div class="item">
          <ontid-div :listdata="ontidlistdata"></ontid-div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blockDiv from "./blocks";
import txDiv from "./tx";
import ontidDiv from "./ontid";
import { mapState } from "vuex";
export default {
  name: "block-list",
  components: {
    blockDiv,
    txDiv,
    ontidDiv
  },
  data() {
    return {
      info: [],
      block_time: [0, 0, 0, 0, 0],
      timestamp: new Date().valueOf(),
      blocklistdata: [],
      txlistdata: [],
      ontidlistdata: []
    };
  },
  mounted() {
    this.getData();
    this.intervalBlock = setInterval(() => {
      this.getData();
    }, 6000);
  },
  watch: {
    $route: "getBlockList",
    "latestBlockList.info": function() {
      this.blocklistdata = this.latestBlockList.info;
    },
    "latestTransactionList.info": function() {
      this.txlistdata = this.latestTransactionList.info;
    },
    "latestOntIdList.info": function() {
      this.ontidlistdata = this.latestOntIdList.info;
    }
  },
  computed: {
    ...mapState({
      latestBlockList: state => state.BlockList.LatestBlockList,
      latestTransactionList: state =>
        state.TransactionList.LatestTransactionList,
      latestOntIdList: state => state.OntIdList.LatestOntIdList
    })
  },
  methods: {
    getData() {
      this.getBlockList();
      this.getOntIdList();
      this.getTransactionList();
    },
    getBlockList() {
      this.$store.dispatch("getBlockList", this.$route.params).then();
    },
    getOntIdList() {
      this.$store.dispatch("getOntIdList", this.$route.params).then();
    },
    getTransactionList() {
      this.$store.dispatch("getTransactionList", this.$route.params).then();
    },
    toBlockListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "blockListDetail",
          params: { pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "blockListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
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
    getShowDate($time) {
      var time = this.$HelperTools.getDateTime($time);
      return this.$HelperTools.getShowDate(time);
    },
    countDownTime: function() {
      for (var i = 0; i < this.info.length; i++) {
        this.info[i].showtime = this.info[i].showtime + 1;
      }
    },
    getNewTime: function() {
      let timestamp = new Date().valueOf();
      for (let i = 0; i < this.latestBlockList.info.length; i++) {
        this.latestBlockList.info[i].showtime = timestamp;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalBlock);
  }
};
</script>


<style lang="less" scoped>
.home-lastdata {
  .container {
    padding-top: 140px;
    text-align: left;
    .title {
      font-size: 32px;
      font-family: Explorerfonts-Bold, sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 38px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      padding-top: 60px;
      .item {
        width: 33%;
        padding-right: 50px;
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .home-lastdata {
    .container {
      padding-top: 140px;
      text-align: left;
      .title {
        font-size: 32px;
        font-family: Explorerfonts-Bold, sans-serif;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 38px;
      }
      .content {
        display: flex;
        justify-content: space-between;
        padding-top: 60px;
        flex-wrap: wrap;
        .item {
          width: 100%;
          padding-bottom: 50px;
          padding-right: 0px;
        }
      }
    }
  }
}
</style>
