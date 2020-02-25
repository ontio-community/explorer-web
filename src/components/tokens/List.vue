<template>
  <div class="list-page">
    <div  class="noshow" ></div>
    <div class="container">
      <title-div :title="$t('tokens.list.name')" :total="tokens.total"></title-div>

      <div class="list-content">
        <div class="table-responsive"  v-loading="fullscreenLoading">
          <table class="table">
            <thead>
              <tr>
                <th class="small-th text-first" scope="col">#</th>
                <th class="large-th" scope="col">{{ $t('all.token') }}</th>
                <th
                  v-if="$route.params.type === 'oep4'"
                  class="small-th"
                  scope="col"
                >{{ $t('tokens.list.tab.totalSupply') }}</th>
                <th class="small-th" scope="col">{{ $t('tokens.list.tab.addressCount') }}</th>
                <th scope="col">{{ $t('tokens.list.tab.hash') }}</th>
                <th class="small-th" scope="col">{{ $t('tokens.list.tab.vm_category') }}</th>
                <th scope="col">{{ $t('tokens.list.tab.creator') }}</th>
                <th class="small-th text-right text-last" scope="col">{{ $t('tokens.list.tab.txns') }}</th>
                <!--<th class="font-size18" scope="col">{{ $t('tokens.list.tab.time') }}</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(token,index) in tokens.list" :key="index">
                <td class="text-first">{{index+1}}</td>
                <td
                  class="click-able token-name"
                  style="max-width:360px"
                  @click="goToTokenDetail(token)"
                >
                  <img v-if="token.logo !== ''" class="sc-list-img" :src="token.logo" alt />
                  <div
                    v-else
                    class="sc-no-logo"
                  >{{ $route.params.type === 'oep4' ? token.symbol : token.name.substr(0, 2) }}</div>
                  <div>
                    {{ token.name }}
                    <span
                      v-if="$route.params.type === 'oep4' && token.symbol !== ''"
                    >&nbsp;&nbsp;{{ ' ( ' + token.symbol + ' )' }}</span>
                  </div>
                  <div class="token-td" v-if="$route.params.type === 'oep8'">
                    <b class="col" v-for="(tS,index) in token.symbol" :key="index">
                      <span class="symbol-name-list">{{ tS }}</span>
                    </b>
                  </div>
                  <!-- <div class="f-color font-size14 token-td word-break">{{ token.description.substr(0,128) + '...' }}</div> -->
                </td>

                <td
                  v-if="$route.params.type === 'oep4'"
                  class="font-size14 font-Regular important_color"
                >{{ $HelperTools.toFinancialVal(token.total_supply) }}</td>
                <td class="font-size14 font-Regular important_color">{{ token.address_count }}</td>
                <td
                  class="click-able"
                  @click="goToTokenDetail(token)"
                >{{ token.contract_hash.substr(0,8) + '...' + token.contract_hash.substr(32)}}</td>
                <td class="font-size14 font-Regular important_color">{{ token.vm_category }}</td>
                <td
                  class="click-able"
                  @click="goToAddressDetail(token.creator)"
                >{{ token.creator.substr(0,8) + '...' + token.creator.substr(26)}}</td>
                <td class="text-right text-last">{{ token.tx_count }}</td>
                <!--<td class="font-size14 font-Regular normal_color">{{ $HelperTools.getTransDate(token.CreateTime) }}</td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ont-pagination :total="tokens.total"></ont-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import titleDiv from "../common/listTitle";

export default {
  name: "Token-List",
  components: {
    titleDiv
  },
  data() {
    return {
      fullscreenLoading: true,
      listType: "list",
      loadingFlag: false,
      applyForUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdszQp1BbviS83psIZUZYMKoNkn0e4zcYxrVqM6v5Qbmzby3g/viewform?vc=0&c=0&w=1"
    };
  },
  mounted() {
    this.getTokensData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.fullscreenLoading = true
      this.getTokensData();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    tokens: function() {
      this.fullscreenLoading = false;
      console.log(this.tokens);
    }
  },
  computed: {
    ...mapState({
      tokens: state => state.Tokens.List
    })
  },
  methods: {
    getTokensData() {
      this.loadingFlag = false;
      this.tokens.list = ""; // 清空内容
      this.testNetPageSizeCheck();
      this.$store.dispatch("GetTokens", this.$route.params).then();
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
    goToTokenDetail(token) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "TokenDetail",
          params: {
            contractType: this.$route.params.contractType,
            tokenName: token.name,
            contractHash: token.contract_hash,
            pageSize: 10,
            pageNumber: 1,
            token: token
          }
        });
      } else {
        this.$router.push({
          name: "TokenDetailTest",
          params: {
            contractType: this.$route.params.contractType,
            tokenName: token.name,
            contractHash: token.contract_hash,
            pageSize: 10,
            pageNumber: 1,
            net: "testnet",
            token: token
          }
        });
      }
    },
    goToAddressDetail(address) {
      if (this.$route.params.net === undefined) {
        this.$router.push({
          name: "AddressDetail",
          params: {
            address: address,
            assetName: "ALL",
            pageSize: 20,
            pageNumber: 1
          }
        });
      } else {
        this.$router.push({
          name: "AddressDetailTest",
          params: {
            address: address,
            assetName: "ALL",
            pageSize: 20,
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