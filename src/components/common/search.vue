<template>
<!--   <div class="search-content"> -->
    <input
      v-model="searchContent"
      @keyup.enter="submitSearch"
      :placeholder="$t('searchInput.placeholder')"
      id="searchContent"
      autocomplete="off"
      autofocus="on"
      ref="inputs"
      class="form-control"
    />
</template>

<script>
import $ from "jquery";
import Helper from "./../../helpers/helper.js";
import $httpService from "../../common/utils";
export default {
  data() {
    return {
      searchContent: ""
    };
  },
  props: {
    focus: {
      type: Boolean
    }
  },
  watch: {
    focus:function(){
      this.$refs.inputs.focus();
    }
  },
  mounted(){
    this.searchContent = ""
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
    initSearch() {
      $("body").removeClass("search-open");
      this.searchContent = ""
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
      /* window.reload() */
    this.initSearch()
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.form-control::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family:Roboto-Medium,Roboto,sans-serif;
    color: rgba(0, 0, 0, 0.1);
  }
.form-control::-moz-placeholder {
    /* WebKit browsers */
    font-family:Roboto-Medium,Roboto,sans-serif;
    color: rgba(0, 0, 0, 0.1);
  }
.form-control::-ms-input-placeholder {
    /* WebKit browsers */
    font-family:Roboto-Medium,Roboto,sans-serif;
    color: rgba(0, 0, 0, 0.1);
  }
  .form-control{
    font-family:Roboto-Medium,Roboto,sans-serif;
  }
.search-content {
  position: relative;
  input {
    width: 100%;
    border: 0;
    caret-color: rgba(0, 0, 0, 1);
    font-size: 18px;
    font-family:Roboto-Medium,Roboto,sans-serif;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    /* line-height: 21px; */
    border-bottom: solid #fafafa 2px;
    padding-bottom: 19px;
    transition: all ease 0.5s;
  }
  input:focus {
    outline: none;
    border-bottom: solid #000 2px;
    transition: all ease 0.5s;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 16px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.1);
    line-height: 19px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 16px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.1);
    line-height: 19px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: 16px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.1);
    line-height: 19px;
  }
  /* 定义blink类*/
  .blink {
    color: #000;
    animation: blink 1s linear infinite;
    background-color: #000;
    width: 4px;
    height: 28px;
    position: absolute;
    top: 0;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
  }
  .searchbutton {
    position: absolute;
    right: 0%;
    top: 0%;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-image: url("../../assets/images/home/search.png");
    background-size: 100%;
  }
  .searchbutton:hover {
    opacity: 0.6;
    transition: opacity ease 0.3s;
  }
}
</style>
