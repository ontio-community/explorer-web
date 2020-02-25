<template>
  <div class="list-page">
    <div class="noshow" ></div>
    <div class="container">
      <title-div class="list-title" :title="$t('blockList.name')" :total="blocks.total"></title-div>
      <div class="list-content">
        <div class="table-responsive"  v-loading="fullscreenLoading">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-first">{{ $t('all.height') }}</th>
                <th scope="col">{{ $t('blockList.TxnNum') }}</th>
                <th scope="col">{{ $t('blockList.bookkeeperCount') }}</th>
                <th scope="col">{{ $t('blockList.BlockSize') }}( {{ $t('all.byte') }} )</th>
                <th class="text-right text-last" scope="col">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(block,index) in blocks.info" :key="index">
                <td
                  class="click-able text-first"
                  @click="toBlockDetailPage(block.block_height)"
                >{{block.block_height}}</td>
                <td>{{block.tx_count}}</td>
                <td>{{block.BookKeeper.length}}</td>
                <td>{{block.block_size}}</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(block.block_time)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ont-pagination :total="blocks.total"></ont-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import titleDiv from "../common/listTitle";

export default {
  components: {
    titleDiv
  },
  mounted() {
    this.getBlocks();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.fullscreenLoading = true
      this.getBlocks();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    blocks: function() {
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      blocks: state => state.Blocks.List
    })
  },
  data() {
    return {
      loadingFlag: false,
      fullscreenLoading: true,
      listType: "list"
    };
  },
  methods: {
    getBlocks() {
      this.loadingFlag = false;
      this.testNetPageSizeCheck();
      this.$store.dispatch("GetBlocks", this.$route.params).then();
    },
    testNetPageSizeCheck() {
      if (this.$route.params.net == "testnet") {
        if (this.$route.params.pageSize > 30) {
          this.$message({ message: this.$t("error.pagesize") });
          this.$route.params.pageSize = 30;
          this.$router.push({
            name: this.$route.name,
            params: this.$route.params
          });
          return;
        }
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
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/list-page.less";
</style>
