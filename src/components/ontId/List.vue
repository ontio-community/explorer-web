<template>
  <div class="list-page">
    <div class="noshow" ></div>
    <div class="container">
      <title-div :title="$t('ontIdList.name')" :total="ontIdList.total"></title-div>
      <div class="list-content">
        <div class="table-responsive" v-loading="fullscreenLoading">
          <table class="table" >
            <thead>
              <tr>
                <th scope="col" class="text-first">{{ $t('all.hash') }}</th>
                <th scope="col">{{ $t('all.ontId') }}</th>
                <th scope="col">{{ $t('all.content') }}</th>
                <th class="small-th" scope="col">{{ $t('all.height') }}</th>
                <th class="small-th" scope="col">{{ $t('all.fee') }}</th>
                <th class="text-right text-last large-th" scope="col">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(OntId,index) in ontIdList.list" :key="index">
                <td
                  class="click-able text-first"
                  @click="toTransactionDetailPage(OntId.tx_hash)"
                >{{OntId.tx_hash.substr(0,8) + '...' + OntId.tx_hash.substr(56)}}</td>
                <td
                  class="click-able"
                  @click="toOntIdDetailPage(OntId.ontid)"
                >{{OntId.ontid.substr(0,10)}}...{{OntId.ontid.substr(35,46)}}</td>
                <td>{{getOntIDEvent(OntId.description)}}</td>
                <td>{{OntId.block_height}}</td>
                <td>{{Number(OntId.fee)}}</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(OntId.tx_time)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ont-pagination :total="ontIdList.total"></ont-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GetTransactionType from "./../../common/OntMsg/GetTransactionType.js";
import titleDiv from "../common/listTitle";

export default {
  components: {
    titleDiv
  },
  data() {
    return {
      listType: "list",
      loadingFlag: false,
      fullscreenLoading: true
    };
  },
  mounted() {
    this.getOntIdList();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.fullscreenLoading = true
      this.getOntIdList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    ontIdList: function() {
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      ontIdList: state => state.OntIDs.List
    })
  },
  methods: {
    getOntIdList() {
      this.loadingFlag = false;
      this.testNetPageSizeCheck();
      this.$store.dispatch("GetOntIdList", this.$route.params).then();
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
    getTransactionType($case) {
      return GetTransactionType.getTransactionType($case);
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
    toOntIdDetailPage($OntId) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "OntIdDetail",
          params: { ontid: $OntId, pageSize: 10, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "OntIdDetailTest",
          params: { ontid: $OntId, pageSize: 10, pageNumber: 1, net: "testnet" }
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
        case "revoke claim":
          return "revoke claim";
      }
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../assets/css/list-page.less";
</style>