<template>
  <div class="list-title">
    <div class="left">
      <div class="title">{{title}}</div>
      <div v-if="$route.name !=='addressList'" class="total">
        {{$t('transList.total')}}
        <span>{{$HelperTools.toFinancialVal(total)}}</span> {{$t('transList.data')}}
      </div>
      <div v-else class="switch">
        <div
          :disabled="$route.params.token === 'ont'"
          @click="toAddressListPage('ont')"
          :class="$route.params.token === 'ont' ? 'btn-current' : 'btn-choose'"
          style="margin-right:30px"
          class="btn"
        >
          <div class="text">ONT</div>
          <div class="line"></div>
        </div>
        <div
          :disabled="$route.params.token === 'ong'"
          @click="toAddressListPage('ong')"
          :class="$route.params.token === 'ong' ? 'btn-current' : 'btn-choose'"
          class="btn btn-left-0-border"
        >
          <div class="text">ONG</div>
          <div  class="line"></div>
        </div>
      </div>
    </div>
    <div class="right">
<!--       <div class="search-content">
        <input
          v-model="searchText"
          @keyup.13="submitSearch"
          :placeholder="$t('searchInput.placeholder')"
          id="searchContent"
          autocomplete="false"
        />
        <div class="searchbutton"></div>
      </div> -->
      <!-- <search-div></search-div> -->
    </div>
  </div>
</template>

<script>
import Helper from "./../../helpers/helper.js";
import searchDiv from "./search"
export default {
  components: {
    searchDiv
  },
  props: {
    total: {
      type: Number
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      searchText: ""
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
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.list-title {
  display: flex;
  justify-content: space-between;
  .left {
    width: 50%;
    display: flex;
    flex-flow: column;
    align-content: flex-start;
    text-align: left;
    .title {
      font-size: 32px;
      font-family: Explorerfonts-Bold,sans-serif;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 38px;
    }
    .total {
      padding-top: 30px;
      font-size: 12px;
      font-family: Roboto-Regular, Roboto;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 14px;
      span {
        color: rgba(0, 0, 0, 1);
      }
    }
    .switch {
      padding-top: 30px;
      display: flex;
      .btn-current {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        line-height: 21px;
        .text{
          margin-bottom: 10px;
        color: rgba(0, 0, 0, 1);
        }
        .line{
          width: 20px;
          height: 4px;
          background-color: #000;
          margin: auto;
          transition: all ease 0.5s;
        }
      }
      .btn-choose {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        line-height: 21px;
        cursor: pointer;
        .text{
          margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.6);
        }
        .line{
          width: 20px;
          height: 4px;
          background-color: #fff;
          margin: auto;
          transition: all ease 0.5s;
        }
      }
    }
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column-reverse;
    .search-content {
      position: relative;
      input {
        width: 100%;
        border: 0;
        caret-color: rgba(0, 0, 0, 0);
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
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
        color: rgba(0, 0, 0, 0.3);
        line-height: 19px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 19px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 16px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
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
  }
}
@media only screen and (max-width: 960px) {
  .list-title .left{
    width: 100%;
  }
  .list-title .right{
    display: none;
  }
}
</style>
