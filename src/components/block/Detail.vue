<template>
  <div class="detail-page">
    <div class="noshow" ></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$t('blockDetail.nickname')"
        :data="block.block_height"
      ></title-div>

      <div class="detail-content">
        <div class="item-content">
          <div class="item">
            <item-div
            :tooltipstr="$t('tooltip.block.time')" 
              :title="$t('blockDetail.BlockTime')"
              :singledata="$HelperTools.getTransDate(block.block_time)"
            ></item-div>
          </div>
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.block.hash')"  :title="$t('blockDetail.hash')" :singledata="block.block_hash"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.block.bookkeeper')" :title="$t('blockDetail.keeper')" :multipledata="block.BookKeeper"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.block.size')" :title="$t('blockDetail.BlockSize')" :singledata="block.block_size+' bytes'"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.block.merkle')" :title="$t('blockDetail.merkle')" :singledata="block.txs_root"></item-div>
          </div>
        </div>
        <div class="item-content">
          <div class="item">
            <item-div :tooltipstr="$t('tooltip.block.consensus')" :title="$t('blockDetail.Consensus')" :singledata="block.consensus_data"></item-div>
          </div>
        </div>
      </div>
      <div class="tab-content" v-if="block.txs && block.txs.length > 0"  v-loading="fullscreenLoading">
        <div class="tab-title">{{block.txs.length}} {{$t("blockDetail.txOnBlock")}}</div>
        <div class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('all.hash') }}</th>
                <th>{{ $t('all.status') }}</th>
                <th class="text-right text-last">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx,index) in block.txs" :key="index">
                <td class="click-able text-first" @click="toTransDetailPage(tx.tx_hash)">{{tx.tx_hash}}</td>
                <td :class="tx.confirm_flag === 1 ? 'confirmed' : 'failed'">{{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ont-pagination
            v-if="block.txs.length && block.txs.length > 10"
            :total="block.txs.length"
          ></ont-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  components: {
    itemDiv,
    titleDiv
  },
  data() {
    return {
      block: {},
      nextFlag: false,
      nextCheck: false,
      fullscreenLoading: true
    };
  },
  mounted() {
    this.getBlock();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.getBlock();
      this.fullscreenLoading = true;
    },
    currentblock: function() {
      this.block = this.currentblock;
      console.log("bingo");
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      currentblock: state => state.Blocks.Detail
    }),
    detailParams: function() {
      return [
        {
          name: this.$t("blockDetail.hash"),
          val: this.block.block_hash,
          rows: 2
        },
        {
          name: this.$t("blockDetail.keeper"),
          val: this.block.BookKeeper,
          rows: 2
        },
        {
          name: this.$t("blockDetail.merkle"),
          val: this.block.txs_root,
          rows: 2
        },
        {
          name: this.$t("blockDetail.Consensus"),
          val: this.block.consensus_data,
          rows: 2
        }
      ];
    },
    prevBlockUrl: function() {
      return typeof this.block.PrevBlock === "undefined"
        ? "Null"
        : this.block.PrevBlock.substr(0, 4) +
            "..." +
            this.block.PrevBlock.substr(60);
    },
    nextBlockUrl: function() {
      if (typeof this.block.NextBlock !== "undefined") {
        if (this.block.NextBlock !== "") {
          return (
            this.block.NextBlock.substr(0, 4) +
            "..." +
            this.block.NextBlock.substr(60)
          );
        }
      }

      return "Null";
    }
  },
  methods: {
    getBlock() {
      this.$store.dispatch("GetBlock", this.$route.params).then();
    },
    toBlockDetailPage($blockHeight) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "blockDetailTest",
          params: { param: $blockHeight, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "blockDetail",
          params: { param: $blockHeight }
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/detail-page.less";
</style>
<style>
.el-loading-spinner .path{
    stroke: #000;
}
</style>
