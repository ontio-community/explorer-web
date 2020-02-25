<template>
  <div class="home-ontid">
    <div class="title">{{$t("lastData.ontid")}}</div>
    <div class="data">
      <div
        v-for="(OntId,index) in listdata"
        v-bind:key="index"
        class="item click-able"
        @click="toTransactionDetailPage(OntId.tx_hash)"
      >
        <div class="up">{{OntId.tx_hash.substr(0,8)}}...{{OntId.tx_hash.substr(56)}}</div>
        <!-- <div>{{showtime[index]}}s ago</div> -->
        <div class="down">
          <div class="left">{{getOntIDEvent(OntId.description)}}</div>
          <div class="right">
            <div
              class="time"
            >{{showtime[index] &lt; 60 ? showtime[index]+'s':$HelperTools.getShowDate(showtime[index])}} ago</div>
          </div>
        </div>
      </div>
    </div>
    <div class="more click-able" @click="toOntIdListPage()">More></div>
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
  beforeDestroy() {
    clearInterval(this.intervalBlockstandard);
  },
  methods: {
    getShowDate($time) {
      let time = this.$HelperTools.getDateTime($time);
      return this.$HelperTools.getShowDate(time);
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
    getOntIDEvent: function($event) {
      switch ($event.substr(0, 12)) {
        case "register Ont":
          return "Register ONT ID";
        case "add publicKe":
          return "Add publickey";
        case "remove publi":
          return "Remove publickey";
        case "add attribut":
          return "Add identity attribute";
        case "update attri":
          return "Update identity attribute";
        case "delete attri":
          return "Delete identity attribute";
        case "change recov":
          return "Change recovery";
        case "add recovery":
          return "Add recovery";
        case "remove attri":
          return "Remove attribute";
        case "create new c":
          return "Create new claim";
      }
    }
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
.home-ontid {
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
