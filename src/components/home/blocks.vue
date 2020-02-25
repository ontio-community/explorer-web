<template>
  <div class="home-block">
    <div class="title">{{$t("lastData.block")}}</div>
    <div class="data">
      <div
        v-for="(block,index) in listdata"
        v-bind:key="index"
        class="item click-able"
        @click="toBlockDetailPage(block.block_height)"
      >
        <div class="up">{{$HelperTools.toFinancialVal(block.block_height)}}</div>
        <!-- <div>{{showtime[index]}}s ago</div> -->
        <div class="down">
          <div class="left">{{block.block_size}} byte</div>
          <div class="right">
            <div class="txcount">{{block.tx_count}} Txns</div>
            <div
              class="time"
            >{{showtime[index] &lt; 60 ? showtime[index]+'s':$HelperTools.getShowDate(showtime[index])}} ago</div>
          </div>
        </div>
      </div>
    </div>
    <div class="more click-able" @click="toBlockListPage()">More></div>
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
          this.listdata[i].block_time
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
    toBlockListPage() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "blockListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "blockList",
          params: { pageSize: 20, pageNumber: 1 }
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
.home-block {
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
          display: flex;
          .txcount {
            color: rgba(0, 0, 0, 0.6);
            padding-right: 10px;
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
