<template>
  <div class="detail-item">
    <div v-if="logo" class="left">
      <div v-if="logo !== 'nologo'" class="logo">
        <img :src="logo" />
      </div>
      <div v-if="logo == 'nologo'" class="logo">
        <div class = "sc-no-logo">C</div>
      </div>
    </div>
    <div class="right">
      <div class="title-content">
        <el-tooltip
          v-if="tooltipstr"
          class="item"
          effect="light"
          :content="tooltipstr"
          placement="top-start"
        >
          <div class="title-text">{{title}}</div>
        </el-tooltip>
        <div v-if="!tooltipstr" class="title-text">{{title}}</div>
        <!-- <div class="title-text">{{title}}</div> -->
        <!--         <div class="title-desc">
          <i class="el-icon-info"></i>
        </div>-->
      </div>
      <div class="item-content">
        <div v-if="singledata" class="s-item-content">
          <div class="s-item-content-text">{{singledata}}</div>
        </div>
        <div v-if="multipledata" class="m-item-content">
          <div
            v-for="(item,index) in multipledata"
            :key="index"
            class="m-item-content-text"
          >{{item}}</div>
        </div>
        <div v-if="jsondata" :class="jsonFlag?'json-item-content open':'json-item-content close'">
          <vue-json-pretty
            :path="'res'"
            :showDoubleQuotes="true"
            :data="jsondata"
            :showLine="false"
          ></vue-json-pretty>
        </div>
        <div v-if="!jsonFlag && jsondata" :class="jsonFlag?'json-close':'json-cover-content'"></div>
        <div v-if="jsondata" class="fold-btn-content">
          <div
            :class="jsonFlag?'fold-btn':'fold-btn show'"
            @click="switchJson()"
          >{{$t('all.jsonopen')}}</div>
          <div
            :class="jsonFlag?'fold-btn show':'fold-btn'"
            @click="switchJson()"
          >{{$t('all.jsonclose')}}</div>
        </div>
        <div v-if="oep4token" class="m-item-content">
          <div
            v-for="(asset,index) in oep4token"
            :key="index"
            class="m-item-content-text"
          >{{ asset.asset_name.toUpperCase() + ": " }} {{parseFloat(asset.balance)}}</div>
        </div>
        <div v-if="oep5token" class="m-item-content">
          <div
            v-for="(asset,index) in oep5token"
            :key="index"
            class="m-item-content-text"
          >{{ asset.asset_name.toUpperCase() + ": " }} {{parseFloat(asset.balance)}}</div>
        </div>
        <div v-if="oep8token" class="m-item-content">
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin08' ) + ": " }} {{zeroPlus(oep8token.pumpkin08)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin01' ) + ": " }} {{zeroPlus(oep8token.pumpkin01)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin02' ) + ": " }} {{zeroPlus(oep8token.pumpkin02)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin03' ) + ": " }} {{zeroPlus(oep8token.pumpkin03)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin04' ) + ": " }} {{zeroPlus(oep8token.pumpkin04)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin05' ) + ": " }} {{zeroPlus(oep8token.pumpkin05)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin06' ) + ": " }} {{zeroPlus(oep8token.pumpkin06)}}</div>
          <div
            class="m-item-content-text"
          >{{$t('assetName.pumpkin07' ) + ": " }} {{zeroPlus(oep8token.pumpkin07)}}</div>
        </div>
        <div v-if="contactdata" class="m-item-content">
          <div
            v-for="(scVal, scKey, scIndex) in contactdata"
            :key="scIndex"
            class="m-item-content-text"
          >{{ scKey + ": " }} {{scVal}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Helper from "./../../helpers/helper.js";
import VueJsonPretty from "vue-json-pretty";
export default {
  components: {
    VueJsonPretty
  },
  props: {
    title: {
      type: String
    },
    desc: {
      type: String
    },
    logo: {
      type: String
    },
    singledata: "",
    multipledata: {
      type: Array
    },
    jsondata: "",
    oep4token: {
      type: Array
    },
    oep5token: {
      type: Array
    },
    oep8token: {
      type: Object
    },
    contactdata: {
      type: Object
    },
    tooltipstr: {
      type: String
    }
  },
  data() {
    return {
      jsonFlag: false
    };
  },
  methods: {
    /* 20190524 新增的接口设计是某种南瓜没有就不返回，所以手动补0 */
    zeroPlus(num) {
      return num ? num : 0;
    },
    switchJson() {
      this.jsonFlag = !this.jsonFlag;
    }
  }
};
</script>

<style lang="less" scoped>
.detail-item {
  display: flex;
  .left {
    .logo {
      img {
        width: 45px;
        height: 45px;
      }
      .sc-no-logo {
        width: 45px;
        height: 45px;
        border-radius: 23px;
        background: #1067bb;
        color: #fff;
        text-align: center;
        line-height: 45px;
      }
    }
    margin-right: 20px;
  }
  .right {
    width: 100%;
    .title-content {
      display: flex;
      .title-text {
        font-size: 12px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 14px;
      }
      .title-desc {
        opacity: 0.3;
        margin-left: 10px;
        font-size: 12px;
      }
    }
    .item-content {
      position: relative;
      .s-item-content {
        .s-item-content-text {
          padding-top: 10px;
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 16px;
        }
      }
      .m-item-content {
        .m-item-content-text {
          padding-top: 20px;
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 16px;
        }
      }
      .json-item-content {
        width: 100%;
        padding: 20px;
        margin-top: 20px;
        max-height: 232px;
        background-color: #fafafa;
      }
      .json-cover-content {
        width: 100%;
        height: 20px;
        background-image: linear-gradient(#fafafa00, #fafafa);
        position: absolute;
        transform: translateY(-20px);
      }
      .json-close {
        display: none;
      }
      .fold-btn-content {
        padding-top: 20px;
        display: flex;
        justify-content: center;
        .fold-btn {
          opacity: 0;
          position: absolute;
          margin: auto;
          transition: all ease 0.3s;
          cursor: pointer;
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 14px;
          text-decoration: underline;
        }
        .show {
          opacity: 1;
          position: absolute;
          margin: auto;
          z-index: 5;
          transition: all ease 0.3s;
        }
        .show:hover {
          opacity: 0.5;
          transition: all ease 0.3s;
        }
      }
      .close {
        max-height: 65px;
        overflow: hidden;
        transition: all ease 0.6s;
      }
      .open {
        max-height: 232px;
        overflow: auto;
        transition: all ease 0.6s;
      }
    }
  }
}
@media only screen and (max-width: 960px) {
  .detail-item {
    .right {
      .item-content {
        .s-item-content {
          .s-item-content-text {
            word-break: break-all;
          }
        }
        .m-item-content {
          .m-item-content-text {
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
<style>
.vjs-tree {
  word-break: break-all;
  font-size: 13px;
  line-height: 16px;
  font-family: Roboto-Regular, Roboto, sans-serif;
}
.vjs-tree .vjs-value__string {
  color: #609a22 !important;
}
.vjs-tree .vjs-value__boolean,
.vjs-tree .vjs-value__number {
  color: #1067bb !important;
}
.el-tooltip__popper.is-light {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border: 0;
  font-size: 12px;
  font-family: Roboto-Regular, Roboto;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.3);
  line-height: 14px;
  max-width: 252px;
}
.el-tooltip__popper .popper__arrow {
  display: none;
}
</style>
