<template>
  <div class="home-tx">
    <div class="title">{{$t("lastData.tx")}}</div>
    <div class="data">
      <div
        v-for="(tx,index) in listdata"
        v-bind:key="index"
        class="item click-able"
        @click="toTransactionDetailPage(tx.tx_hash)"
      >
        <div class="up">{{tx.tx_hash.substr(0,8)}}...{{tx.tx_hash.substr(56)}}</div>
        <!-- <div>{{showtime[index]}}s ago</div> -->
        <div class="down">
          <div class="left">{{getTxtype(tx.tx_type)}}</div>
          <div class="right">
            <div
              class="time"
            >{{showtime[index] &lt; 60 ? showtime[index]+'s':$HelperTools.getShowDate(showtime[index])}} ago</div>
          </div>
        </div>
      </div>
    </div>
    <div class="more click-able" @click="toTransactionListPage()">More></div>
  </div>
</template>

<script>
export default {
  props: {
    listdata: {
      type: Array
    }
  },
  data() {
    return {
      showtime: [0, 0, 0, 0, 0]
    };
  },
  watch: {
    listdata: function() {
      clearInterval(this.intervalBlockstandard);
      for (var i = 0; i < 5; i++) {
        this.showtime[i] = this.$HelperTools.getDateTime(
          this.listdata[i].tx_time
        );
      }
      this.intervalBlockstandard = setInterval(() => {
        for (var i = 0; i < 5; i++) {
          var time = this.showtime[i] + 1;
          this.$set(this.showtime, i, time);
        }
      }, 1000);
    }
  },
  methods: {
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
    getTxtype: function($type) {
      switch ($type) {
        case 208:
          return "Deploy Smart Contract";
        case 209:
          return "Invoke neovm Contract";
        case 210:
          return "Invoke wasmvm Contract";
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
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalBlockstandard);
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
.home-tx {
  .title {
    font-size: 18px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 21px;
  }
  .data {
    padding-top: 40px;
    .item {
      padding-bottom: 19px;
      margin-bottom: 19px;
      border-bottom: 1px solid #FAFAFA;
      .up {
        font-size: 16px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 21px;
      }
      .down {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.3);
          line-height: 14px;
        }
        .right {
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          line-height: 14px;
          .txcount {
            color: rgba(0, 0, 0, 0.6);
          }
          .time {
            color: rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
  .more {
    font-size: 14px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 16px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
