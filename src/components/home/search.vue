<template>
  <div class="home-search">
    <div class="container">
      <div class="search-content">
        <input
          v-model="searchContent"
          @keyup.13="submitSearch"
          :placeholder="$t('searchInput.placeholder')"
          id="searchContent"
          autocomplete="off"
          ref="homesearch"
        />
        <!-- <div id="blink" class="blink"></div> -->
        <div class="searchbutton" @click="submitSearch()"></div>
      </div>
      <div class="quicksearch-content">
        <div class="title">{{$t('searchInput.qucik')}}</div>
        <div class="item" @click="toOEP4list()">{{$t('searchInput.oep4')}}</div>
        <div class="item" @click="toContractlist()">{{$t('searchInput.contract')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import $httpService from "../../common/utils";
export default {
  data() {
    return {
      searchContent: ""
    };
  },
  mounted() {
    this.$refs.homesearch.focus();
  },
  methods: {
    toOEP4list() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TokenListTest",
          params: {
            contractType: "oep4",
            pageSize: 10,
            pageNumber: 1,
            net: "testnet"
          }
        });
      } else {
        this.$router.push({
          name: "TokenList",
          params: { contractType: "oep4", pageSize: 10, pageNumber: 1 }
        });
      }
    },
    toContractlist() {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "ContractListTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "ContractList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      }
    },
    notFound() {
      // this.$toast.center(this.$t('error.format'));
      this.$message({ message: this.$t("error.format") });
    },
    searchHash($searchContent) {
      $httpService
        .get("/transactions/" + $searchContent)
        .then(res => {
          if (res.code != 0) {
            this.notFound();
          } else {
            if (this.$route.params.net == undefined) {
              this.$router.push({
                name: "TransactionDetail",
                params: { tx_hash: $searchContent }
              });
            } else {
              this.$router.push({
                name: "TransactionDetailTest",
                params: { tx_hash: $searchContent, net: "testnet" }
              });
            }
          }
        })
        .catch(error => {
          this.notFound();
        });
    },
    searchAddress($searchContent) {
      if ($searchContent.substr(0, 1) != "A") {
        this.notFound();
      } else {
        if (this.$route.params.net == undefined) {
          this.$router.push({
            name: "AddressDetail",
            params: {
              address: $searchContent,
              assetName: "ALL",
              pageSize: 20,
              pageNumber: 1
            }
          });
        } else {
          this.$router.push({
            name: "AddressDetailTest",
            params: {
              address: $searchContent,
              assetName: "ALL",
              pageSize: 20,
              pageNumber: 1,
              net: "testnet"
            }
          });
        }
      }
    },
    searchContract($searchContent) {
      $httpService
        .get("/contracts/" + $searchContent)
        .then(res => {
          if (res.code != 0) {
            this.notFound();
          } else {
            console.log(res);
            console.log("this.$route", this.$route);
            if (res.result == null) {
              this.notFound();
            } else {
              if (res.result.type == "") {
                if (this.$route.params.net == undefined) {
                  this.$router.push({
                    name: "ContractDetail",
                    params: {
                      contractHash: $searchContent,
                      contractType: "other",
                      pageSize: 10,
                      pageNumber: 1
                    }
                  });
                } else {
                  this.$router.push({
                    name: "ContractDetailTest",
                    params: {
                      contractHash: $searchContent,
                      contractType: "other",
                      pageSize: 10,
                      pageNumber: 1,
                      net: "testnet"
                    }
                  });
                }
              } else {
                if (this.$route.params.net == undefined) {
                  this.$router.push({
                    name: "TokenDetail",
                    params: {
                      contractType: res.result.type,
                      tokenName: res.result.name,
                      contractHash: $searchContent,
                      pageSize: 10,
                      pageNumber: 1
                    }
                  });
                } else {
                  this.$router.push({
                    name: "TokenDetailTest",
                    params: {
                      contractType: res.result.type,
                      tokenName: res.result.name,
                      contractHash: $searchContent,
                      pageSize: 10,
                      pageNumber: 1,
                      net: "testnet"
                    }
                  });
                }
              }
            }
          }
        })
        .catch(error => {
          this.notFound();
        });
    },
    searchONTID($searchContent) {
      $httpService
        .get("/ontids/" + $searchContent + "/ddo")
        .then(res => {
          if (res.code != 0) {
            this.notFound();
          } else {
            if (this.$route.params.net == undefined) {
              this.$router.push({
                name: "OntIdDetail",
                params: {
                  ontid: $searchContent,
                  pageSize: 20,
                  pageNumber: 1
                }
              });
            } else {
              this.$router.push({
                name: "OntIdDetailTest",
                params: {
                  ontid: $searchContent,
                  pageSize: 20,
                  pageNumber: 1,
                  net: "testnet"
                }
              });
            }
          }
        })
        .catch(error => {
          this.notFound();
        });
    },
    searchHeight($searchContent) {
      $httpService
        .get("/blocks/" + $searchContent)
        .then(response => {
          if (response.code != 0) {
            this.notFound();
          } else {
            if (this.$route.params.net == undefined) {
              this.$router.push({
                name: "blockDetail",
                params: { param: $searchContent }
              });
            } else {
              this.$router.push({
                name: "blockDetailTest",
                params: { param: $searchContent, net: "testnet" }
              });
            }
          }
        })
        .catch(error => {
          this.notFound();
        });
    },
    submitSearch() {
      if (this.searchContent !== "") {
        this.searchContent = this.searchContent.trim();
        switch (this.searchContent.length) {
          /* txhash */
          case 64:
            this.searchHash(this.searchContent);
            break;
          /* address */
          case 34:
            this.searchAddress(this.searchContent);
            break;
          /* contract hash */
          case 40:
            this.searchContract(this.searchContent);
            break;
          /* ontid */
          case 42:
            this.searchONTID(this.searchContent);
            break;
          /* block height */
          case 1:
            this.searchHeight(this.searchContent);
            break;
          case 2:
            this.searchHeight(this.searchContent);
            break;
          case 3:
            this.searchHeight(this.searchContent);
            break;
          case 4:
            this.searchHeight(this.searchContent);
            break;
          case 5:
            this.searchHeight(this.searchContent);
            break;
          case 6:
            this.searchHeight(this.searchContent);
            break;
          case 7:
            this.searchHeight(this.searchContent);
            break;
          case 8:
            this.searchHeight(this.searchContent);
            break;
          case 9:
            this.searchHeight(this.searchContent);
            break;
          case 10:
            this.searchHeight(this.searchContent);
            break;
          case 11:
            this.searchHeight(this.searchContent);
            break;
          default:
            this.notFound();
        }
      }
      this.searchContent = "";
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes showcase {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* 定义keyframe动画，命名为blink */
@keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-ms-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.home-search {
  animation: showcase 1s;
  .container {
    padding-top: 80px;
    .search-content {
      position: relative;
      input {
        width: 100%;
        border: 0;
        caret-color: rgba(0, 0, 0, 1);
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        /* line-height: 21px; */
        border-bottom: solid #fafafa 2px;
        padding-bottom: 29px;
        transition: all ease 0.5s;
        width: calc(100% - 50px);
        padding-right: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      input:focus {
        outline: none;
        border-bottom: solid #000 2px;
        transition: all ease 0.5s;
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 21px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 21px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 21px;
      }
      .searchbutton {
        position: absolute;
        right: 0%;
        top: 0%;
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-image: url("../../assets/images/home/search.png");
        background-size: 100%;
        transform: translateY(-10px);
      }
      .searchbutton:hover {
        opacity: 0.6;
        transition: opacity ease 0.3s;
      }
    }
    .quicksearch-content {
      padding-top: 29px;
      display: flex;
      .title {
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 16px;
      }
      .item {
        cursor: pointer;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 16px;
        padding-left: 20px;
        transition: all ease 0.3s;
      }
      .item:hover {
        color: rgba(0, 0, 0, 0.5);
        transition: all ease 0.3s;
      }
    }
  }
}
@media only screen and (max-width: 960px) {
  .home-search {
    animation: showcase 1s;
    .container {
      padding-top: 40px;
      .search-content {
        position: relative;
        input {
          width: calc(100% - 40px);
          padding-right: 40px;
          border: 0;
          caret-color: rgba(0, 0, 0, 1);
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          /* line-height: 21px; */
          border-bottom: solid #fafafa 2px;
          padding-bottom: 29px;
          transition: all ease 0.5s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        input:focus {
          outline: none;
          border-bottom: solid #000 2px;
          transition: all ease 0.5s;
        }
        ::placeholder {
          text-overflow: ellipsis;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.3);
          line-height: 21px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.3);
          line-height: 21px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        :-ms-input-placeholder {
          /* Internet Explorer 10+ */
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.3);
          line-height: 21px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .searchbutton {
          position: absolute;
          right: 0%;
          top: 0%;
          cursor: pointer;
          width: 24px;
          height: 24px;
          background-image: url("../../assets/images/home/search.png");
          background-size: 100%;
          transform: translateY(-2px);
        }
        .searchbutton:hover {
          opacity: 0.6;
          transition: opacity ease 0.3s;
        }
      }
    }
  }
}
</style>
