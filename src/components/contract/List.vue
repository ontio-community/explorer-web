<template>
  <div class="list-page">
    <div class="noshow" ></div>
    <div class="container">
      <title-div :title="$t('contracts.list.name')" :total="contracts.total"></title-div>

      <div class="list-content">
        <div class="table-responsive" v-loading="fullscreenLoading">
          <table class="table" >
            <thead>
              <tr>
                <th class="small-th text-first" scope="col">#</th>
                <th scope="col">{{ $t('contracts.list.tab.name') }}</th>
                <th class="huge-th" scope="col">{{ $t('contracts.list.tab.hash') }}</th>
                <th class="small-th" scope="col">{{ $t('contracts.list.tab.txns') }}</th>
                <th class="text-right text-last" scope="col">{{ $t('contracts.list.tab.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contract,index) in contracts.list" :key="index">
                <td class="text-first">{{index+1}}</td>
                <td class="click-able token-name" @click="goToContractDetail(contract)">
                  <img v-if="contract.logo !== ''" class="sc-list-img" :src="contract.logo" alt />
                  <div v-else class="sc-no-logo">C</div>
                  <div class="font-blod font-size16">{{ contract.name }}</div>
                </td>
                <td
                  class="click-able"
                  @click="goToContractDetail(contract)"
                >{{ contract.contract_hash}}</td>
                <td>{{ contract.tx_count }}</td>
                <td class="text-right text-last">{{ $HelperTools.getTransDate(contract.update_time) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    <ont-pagination :total="contracts.total"></ont-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import titleDiv from "../common/listTitle";

export default {
  name: "Contracts-List",
  components: {
    titleDiv
  },
  data() {
    return {
      loadingFlag: false,
      fullscreenLoading: true,
      listType: "list",
      applyForUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdszQp1BbviS83psIZUZYMKoNkn0e4zcYxrVqM6v5Qbmzby3g/viewform?vc=0&c=0&w=1"
    };
  },
  mounted() {
    this.getContractsData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.fullscreenLoading = true;
      this.getContractsData();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    contracts: function() {
      this.fullscreenLoading = false;
      console.log(this.contracts);
      this.loadingFlag = true;
    }
  },
  computed: {
    ...mapState({
      contracts: state => state.Contracts.List
    })
  },
  methods: {
    getContractsData() {
      this.loadingFlag = false;
      this.testNetPageSizeCheck();
      this.$store.dispatch("GetContracts", this.$route.params).then();
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
    checkIn() {
      window.open(this.applyForUrl);
    },
    goToContractDetail(contract) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "ContractDetail",
          params: {
            contractHash: contract.contract_hash,
            contractType: contract.type == "" ? "other" : contract.type,
            pageSize: 10,
            pageNumber: 1
          }
        });
      } else {
        this.$router.push({
          name: "ContractDetailTest",
          params: {
            contractHash: contract.contract_hash,
            contractType: contract.type == "" ? "other" : contract.type,
            pageSize: 10,
            pageNumber: 1,
            net: "testnet"
          }
        });
      }
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../assets/css/list-page.less";
</style>