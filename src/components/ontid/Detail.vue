<template>
  <div class="detail-page">
    <div class="noshow"></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$t('ontIdDetail.nickname')"
        :data="$route.params.ontid"
      ></title-div>
      <!-- Owners info -->
      <div class="detail-content">
        <div class="title">{{ $t('ontIdDetail.owner') }}</div>
        <div v-for="(owner,index) in Ddo.Owners" :key="index">
          <div class="item-content">
            <div class="m-item">
              <item-div :tooltipstr="$t('tooltip.ontid.Type')" :title="'Type'" :singledata="owner.Type"></item-div>
            </div>
            <div class="m-item">
              <item-div :tooltipstr="$t('tooltip.ontid.Curve')" :title="'Curve'" :singledata="owner.Curve"></item-div>
            </div>
          </div>
          <div class="item-content">
            <div class="item">
              <item-div :tooltipstr="$t('tooltip.ontid.Value')" :title="'Value'" :singledata="owner.Value"></item-div>
            </div>
          </div>
          <div class="item-content">
            <div class="item">
              <item-div :tooltipstr="$t('tooltip.ontid.PublicKeyId')" :title="'PublicKeyId'" :singledata="owner.PubKeyId"></item-div>
            </div>
          </div>
        </div>
      </div>

<!--       <div
        class="row"
        v-if="haveData && JSON.stringify(Ddo.Attributes) !== '[]' && $route.params.net =='testnet' && workFlag">
        <div class="col">
          <div class="detail-col">
            <p>Claim Metadata</p>
            <div class="row" v-for="(claim, index) in Ddo.Attributes" :key="index">
              <div class="col" v-if="claim.Claim">
                <div class="font-size14 font-Regular normal_color">
                  <p>Claim Hash: {{claim.Claim.ClaimId}}</p>
                </div>
                <div class="font-size14 font-Regular normal_color">
                  <p>Claim Context: {{claim.Claim.ClaimContext}}</p>
                </div>
                <div class="font-size14 font-Regular normal_color">
                  <p>Context Desc: {{claim.Claim.ContextDesc}}</p>
                </div>
                <div
                  class="font-size14 font-Regular normal_color"
                  @click="toOntIdDetailPage(claim.Claim.IssuerOntId)"
                >
                  <p>
                    Issuer:
                    <span class="important_color pointer">{{claim.Claim.IssuerOntId}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="special-ddo-wrapper" v-if="workFlag">
              <div class="work-group-wrapper">
                <span class="work-group-font">Group:</span>
                <span class="work-group-font">{{work.group}}</span>
              </div>
              <div class="work-name-wrapper">
                <span class="work-name-font">{{work.work_name}}</span>
              </div>
              <div class="work-trustAnchor-wrapper">
                <span class="work-group-font">Trust Anchor:</span>
                <span class="work-group-font">{{work.trust_anchor}}</span>
              </div>
              <div class="work-description-wrapper">
                <p class="work-p-normal-font p-work-normal-font">
                  <span class="work-normal-font">Description:</span>
                  {{work.description}}
                </p>
              </div>
              <div class="work-cryptoFunction-wrapper">
                <span class="work-normal-font">crypto_function</span>
              </div>
              <div class="work-cryptoFunction-wrapper1">
                <span class="work-normal-font">{{work.crypto_function}}</span>
              </div>
              <div class="work-uploadTime-wrapper">
                <span class="work-normal-font">uploadTime</span>
              </div>
              <div class="work-uploadTime-wrapper1">
                <span class="work-normal-font">{{work.uploadTime}}</span>
              </div>
              <div class="work-logo-wrapper">
                <img src="../../assets/ontid/logoEN.png" class="work-logo-img" />
              </div>
              <div class="work-hash-wrapper">
                <span class="work-hash-font">Work HASH:</span>
                <span class="work-hash-font">{{work.work_HASH}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-show="!haveData">
        <div class="col">
          <div class="detail-col">{{ $t('ontIdDetail.failed') }}</div>
        </div>
      </div> -->

      <!-- Events on this ONT ID -->
      <div class="tab-content" v-if="TxnList && TxnList.length > 0"  v-loading="fullscreenLoading">
        <div class="tab-title">{{$t("ontIdDetail.events")}}</div>
        <div class="tab-item">
          <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="text-first">{{ $t('all.hash') }}</th>
                <th>{{ $t('all.content') }}</th>
                <th>{{ $t('all.fee') }}</th>
                <th class="text-right text-last">{{ $t('all.time') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx,index) in TxnList" :key="index">
                <td
                  class="click-able text-first"
                  @click="toTransactionDetailPage(tx.tx_hash)"
                >{{tx.tx_hash.substr(0,4) + '...' + tx.tx_hash.substr(60)}}</td>
                <td>{{getOntIDEvent(tx.description)}}</td>
                <td>{{tx.fee}}</td>
                <td class="text-right text-last">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ont-pagination v-if="TxnTotal && TxnTotal > 10" :total="TxnTotal"></ont-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import itemDiv from "../common/DetailItem";
import titleDiv from "../common/DetailTitle";

export default {
  components: {
    itemDiv,
    titleDiv
  },
  data() {
    return {
      fullscreenLoading: true,
      Ddo: {},
      claimflag: true,
      TxnList: {},
      TxnTotal: "",
      haveData: true,
      work: {
        awards: "",
        group: "",
        description: "",
        owner_id: "",
        work_name: "",
        trust_anchor: "",
        crypto_function: "",
        uploadTime: "",
        work_HASH: ""
      },
      workFlag: false
    };
  },
  mounted() {
    if (
      this.$route.params.pageSize == undefined ||
      this.$route.params.pageNumber == undefined
    ) {
      this.toOntIdDetailPageReload(this.$route.params.ontid);
    } else {
      this.getOntIdDetail();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  watch: {
    $route: "getOntIdDetail",
    OntIdDetail: function() {
      console.log(this.OntIdDetail);

      if (this.OntIdDetail.info === false) {
        this.haveData = false;
      } else {
        this.Ddo = this.OntIdDetail.Ddo;
        this.TxnList = this.OntIdDetail.TxnList;
        this.TxnTotal = this.OntIdDetail.TxnTotal;
      }
      if (this.Ddo.Attributes[5].SelfDefined["trust anchor"] == "GGCA") {
        this.workFlag = true;
        this.work.awards = this.Ddo.Attributes[0].SelfDefined["awards"];
        this.work.group = this.Ddo.Attributes[1].SelfDefined["group"];
        this.work.description = this.Ddo.Attributes[2].SelfDefined[
          "description"
        ];
        this.work.owner_id = this.Ddo.Attributes[3].SelfDefined["owner_id"];
        this.work.work_name = this.Ddo.Attributes[4].SelfDefined["work name"];
        this.work.trust_anchor = this.Ddo.Attributes[5].SelfDefined[
          "trust anchor"
        ];
        this.work.crypto_function = this.Ddo.Attributes[6].SelfDefined[
          "crypto_function"
        ];
        this.work.uploadTime = this.Ddo.Attributes[7].SelfDefined["uploadTime"];
        this.work.work_HASH = this.Ddo.Attributes[8].SelfDefined["work HASH"];
        /* console.log(this.work) */
      }
      this.fullscreenLoading = false;
    },
    OntIdDdo: function() {
      console.log(this.OntIdDdo);
      this.Ddo = this.OntIdDdo;
    },
    OntIdTxnList: function() {
      console.log(this.OntIdTxnList);
      this.TxnList = this.OntIdTxnList.records;
      this.TxnTotal = this.OntIdTxnList.total;
      this.fullscreenLoading = false;
    }
  },
  computed: {
    ...mapState({
      OntIdDdo: state => state.OntIDs.Ddo,
      OntIdTxnList: state => state.OntIDs.Tx
    })
  },
  methods: {
    toOntIdDetailPageReload($OntId) {
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
    getOntIdDetail() {
      this.fullscreenLoading = true;
      this.$store.dispatch("GetOntIdDdoDetail", this.$route.params).then();
      this.$store.dispatch("GetOntIdTxDetail", this.$route.params).then();
    },
    toReturn() {
      this.$router.go(-1);
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
        this.$router.push({ name: "OntIdDetail", params: { ontid: $OntId } });
      } else {
        this.$router.push({
          name: "OntIdDetailTest",
          params: { ontid: $OntId, net: "testnet" }
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
          return "create new claim";
      }
    }
  }
};
</script>

<style scoped>
.special-ddo-wrapper {
  background-image: url(../../assets/ontid/dianqingback.png);
  background-repeat: no-repeat;
  background-size: 950px 699px;
  height: 699px;
  min-width: 1122px;
  background-position: center;
  margin-bottom: 32px;
}
.p-work-normal-font {
  position: relative;
  /* 3 times the line-height to show 3 lines */
  height: 72px;
  overflow: hidden;
}
.p-work-normal-font::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 20px 1px 45px;
  background: url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png)
    repeat-y;
  opacity: 1;
}
.work-normal-font {
  font-size: 16px;
  font-family: SourceSansPro-Regular;
  font-weight: 400;
  color: rgba(89, 87, 87, 1);
  line-height: 20px;
}
.work-name-font {
  font-size: 30px;
  font-family: SourceSansPro-Regular;
  font-weight: blod;
  color: rgba(181, 148, 114, 1);
  line-height: 46px;
}
.work-p-normal-font {
  font-size: 16px;
  font-family: SourceSansPro-Regular;
  font-weight: 400;
  color: rgba(89, 87, 87, 1);
  line-height: 24px;
}
.work-group-font {
  font-size: 20px;
  font-family: SourceSansPro-Regular;
  font-weight: 400;
  color: rgba(89, 87, 87, 1);
  line-height: 24px;
}
.work-awards-font {
  font-size: 34px;
  font-family: SourceSansPro-bold;
  font-weight: 600;
  color: rgba(50, 164, 190, 1);
  line-height: 48px;
}
.work-awards-font-small {
  font-size: 25px !important;
  font-family: SourceSansPro-bold;
  font-weight: 600;
  color: rgba(50, 164, 190, 1);
  line-height: 48px;
}
.work-hash-font {
  font-size: 16px;
  font-family: SourceSansPro-Regular;
  font-weight: 400;
  color: rgba(89, 87, 87, 1);
  line-height: 24px;
}
.work-name-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 205px;
  width: 520px;
  text-align: center;
}
.work-group-wrapper {
  position: absolute;
  left: 561px;
  transform: translate(-18%, 0);
  top: 143px;
  min-width: 130px;
}
.work-awards-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 163px;
  min-width: 103px;
}
.work-awards-wrapper-small {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 163px;
  min-width: 103px;
}
.work-trustAnchor-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 332px;
  min-width: 170px;
}
.work-description-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 407px;
  width: 610px;
  height: 72px;
  overflow: hidden;
}
.work-cryptoFunction-wrapper {
  position: absolute;
  left: 369px;
  transform: translate(-50%, 0);
  top: 580px;
  /* border-top: 2px solid #32a4be; */
  min-width: 146px;
  text-align: center;
}
.work-cryptoFunction-wrapper1 {
  position: absolute;
  left: 369px;
  transform: translate(-50%, 0);
  top: 624px;
  /* border-top: 2px solid #32a4be; */
  min-width: 146px;
  text-align: center;
}
.work-uploadTime-wrapper {
  position: absolute;
  left: 832px;
  transform: translate(-50%, 0);
  top: 580px;
  /* border-top: 2px solid #32a4be; */
  min-width: 146px;
  text-align: center;
}
.work-uploadTime-wrapper1 {
  position: absolute;
  left: 832px;
  transform: translate(-50%, 0);
  top: 624px;
  /* border-top: 2px solid #32a4be; */
  min-width: 146px;
  text-align: center;
}
.work-logo-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 564px;
}
.work-logo-img {
  width: 155px;
  height: 74px;
}
.work-hash-wrapper {
  position: absolute;
  left: 600px;
  transform: translate(-50%, 0);
  top: 686px;
  min-width: 590px;
}
</style>

<style lang="less" scoped>
@import "../../assets/css/detail-page.less";
</style>
<style>
.el-loading-spinner .path {
  stroke: #000;
}
</style>