<template>
  <div class="list-page">
    <div class="noshow"></div>
    <div class="container">
      <title-div class="list-title" :title="$t('addressList.nickname')" :total="addressList.total"></title-div>
      <div class="list-content">
        <div class="table-responsive"  v-loading="fullscreenLoading">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-first">{{ $t('addressList.rank') }}</th>
                <th scope="col">{{ $t('addressList.name') }}</th>
                <th
                  class="small-th text-right"
                  scope="col"
                >{{ $route.params.token.toLocaleUpperCase() + $t('addressList.balance') }}</th>
                <th class="text-right text-last" scope="col">{{ $t('addressList.percent') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(address,index) in rankList" :key="index">
                <td class="text-first">{{Number(addressList.basicRank) + index}}</td>
                <td
                  class="click-able"
                  @click="goToAddressDetail(address.address)"
                >{{address.address}}</td>
                <td class="text-right">{{$HelperTools.toFinancialVal(address.balance)}}</td>
                <td class="text-right text-last">{{(address.percent * 100).toFixed(4)}}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ont-pagination :total="addressList.total"></ont-pagination>
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
    this.getAddressListInfo();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: function() {
      this.fullscreenLoading = true;
      this.getAddressListInfo();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    addressList: function() {
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      addressList: state => state.Addresses.List
    }),
    rankList() {
      if (this.addressList.list) {
        let lists = this.addressList.list;

        if (this.$route.params.token === "ong") {
          for (let i in lists) {
            let tmpB = lists[i].balance.toString();
            lists[i].balance =
              tmpB.substring(0, tmpB.length - 9) +
              "." +
              tmpB.substring(tmpB.length - 9);
          }
        }
        for (let j in lists) {
          if (lists[j].address === "0700000000000000000000000000000000000000") {
            lists[j].address = "AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK";
          }
          if (lists[j].address === "0100000000000000000000000000000000000000") {
            lists[j].address = "AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV";
          }
        }

        return lists;
      } else {
        return [0,0,0,0,0,0,0,0,0,0];
      }
    }
  },
  data() {
    return {
      loadingFlag: false,
      listType: "list",
      fullscreenLoading: true
    };
  },
  methods: {
    getAddressListInfo() {
      this.loadingFlag = false;
      this.$store.dispatch("GetAddressList", this.$route.params).then();
    },
    toAddressListPage($token) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "addressList",
          params: { token: $token, pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "addressListTest",
          params: { token: $token, pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    goToAddressDetail(address) {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "AddressDetail",
          params: {
            address: address,
            assetName: "ALL",
            pageSize: 10,
            pageNumber: 1
          }
        });
      } else {
        this.$router.push({
          name: "AddressDetailTest",
          params: {
            address: address,
            assetName: "ALL",
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

<style>
.noshow {
  width: 0 !important;
  height: 0 !important;
  opacity: 0;
  padding: 0;
  border: 0;
}
</style>
<style scoped>
.btn-current,
.btn-choose {
  border-radius: 0;
  min-width: 96px;
  height: 32px;
  line-height: 10px;
}
.btn-current {
  border: 1px solid #e4e4e4;
  color: #e4e4e4;
}

.btn-choose {
  border: 1px solid #32a4be;
  color: #32a4be;
}
</style>

<style lang="less" scoped>
@import "../../assets/css/list-page.less";
</style>