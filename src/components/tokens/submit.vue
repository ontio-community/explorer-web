<template>
  <div class="token-submit">
    <div class="container">
      <div class="title-info">
        <div class="title">Submit Your Token Information</div>
      </div>
      <div class="common-info">
        <div class="item">
          <div class="item-title">Token hash*</div>
          <input v-model="tokenHash" />
        </div>
        <div class="item">
          <div class="item-title">Token Name*</div>
          <input v-model="tokenName" />
        </div>
        <div class="item">
          <div class="item-title">Token Abi*</div>
          <textarea v-model="tokenAbi" />
        </div>
        <div class="item">
          <div class="item-title">Token Code*</div>
          <textarea v-model="tokenCode" />
        </div>
        <div class="item">
          <div class="item-title">Description*</div>
          <textarea v-model="tokenDescription" />
        </div>
      </div>
      <div class="token-info">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="OEP-4" name="first">OEP-4</el-tab-pane>
          <el-tab-pane label="OEP-5" name="second">OEP-5</el-tab-pane>
          <el-tab-pane label="OEP-8" name="third">OEP-8</el-tab-pane>
        </el-tabs>
        <div id="oep4" class="content">
          <div class="item">
            <div class="item-title">Token Symbol*</div>
            <input v-model="tokenSymbol" />
          </div>
          <div class="item">
            <div class="item-title">Token Decimals*</div>
            <input v-model="tokenDecimals" />
          </div>
          <div class="item">
            <div class="item-title">Total Supply*</div>
            <input v-model="tokenTotalSupply" />
          </div>
          <div class="item">
            <div class="item-title">Logo*</div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" id="logoImg" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="desc">256px*256px in jpg or png, no rounded corners</div>
          </div>
        </div>
      </div>
      <div class="contact-info">
        <el-divider>Contact Information</el-divider>
        <div class="item">
          <div class="item-title">Website</div>
          <input v-model="tokenWebsite" />
        </div>
        <div class="item">
          <div class="item-title">E-mail*</div>
          <input v-model="tokenEmail" />
        </div>
      </div>
      <div class="submit">
        <div class="btn">
          <div class="text" @click="submit()">Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Clipboard from "clipboard";
import HelperTool from "./../../helpers/helper";

export default {
  name: "Token-Detail",
  mounted() {},
  watch: {},
  computed: {
    ...mapState({
      contractTxList: state => state.Contracts.TxList,
      token: state => state.Tokens.Detail
    })
  },
  data() {
    return {
      showCodeCopied: false,
      showABICopied: false,
      tokenData: {},
      tokenInfo: {},
      loadingFlag: false,
      activeName: "first",
      tokenHash: "",
      tokenSymbol: "",
      tokenAbi: "",
      tokenCode: "",
      tokenDescription: "",
      tokenName: "",
      tokenDecimals: "",
      tokenTotalSupply: "",
      tokenEmail: "",
      tokenWebsite: "",
      imageUrl: "",
      dataURL: "",
      vm_category: "neovm",
      tokens: [],
      tokenType: "oep4s"
    };
  },
  methods: {
    submit() {
      var self = this;
      let params = self.$route.params;
      if (self.check(self.tokenType)) {
        params.tokenType = self.tokenType;
        params.tokenHash = self.tokenHash;
        params.tokenName = self.tokenName;
        params.tokenDescription = self.tokenDescription;
        params.tokenAbi = self.tokenAbi;
        params.tokenCode = self.tokenCode;
        params.dataURL = self.dataURL;
        params.contact_info = {
          email: self.tokenEmail,
          website: self.tokenWebsite
        };
        params.tokenTotalSupply = self.tokenTotalSupply;
        params.tokenDecimals = self.tokenDecimals;
        params.tokenSymbol = self.tokenSymbol;
        params.vm_category = self.vm_category;
        params.tokens = self.tokens;
        this.$store.dispatch("submitToken", params)
          .then(() => {
            self.$message({
              message: "success",
              type: "success"
            });
          })
          .catch(() => {
            self.$message({
              message: "failed",
              type: "error"
            });
          });
      }
    },
    check($type) {
      var self = this;
      let flag = true;
      if (self.tokenHash === "") {
        self.$message({
          message: self.$t("error.msg1"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenName === "") {
        self.$message({
          message: self.$t("error.msg2"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenAbi === "") {
        self.$message({
          message: self.$t("error.msg3"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenCode === "") {
        self.$message({
          message: self.$t("error.msg4"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenDescription === "") {
        self.$message({
          message: self.$t("error.msg5"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.dataURL === "") {
        self.$message({
          message: self.$t("error.msg9"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenEmail === "") {
        self.$message({
          message: self.$t("error.msg11"),
          type: "error"
        });
        flag = false;
        return flag;
      } else {
        let email = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!email.test(self.tokenEmail)) {
          self.$message({
            message: self.$t("error.msg10"),
            type: "error"
          });
          flag = false;
          return flag;
        }
      }
      if (self.tokenSymbol === "") {
        self.$message({
          message: self.$t("error.msg6"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenDecimals === "") {
        self.$message({
          message: self.$t("error.msg7"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      if (self.tokenTotalSupply === "") {
        self.$message({
          message: self.$t("error.msg8"),
          type: "error"
        });
        flag = false;
        return flag;
      }
      return flag;
    },
    handleAvatarSuccess(res, file) {
      /* this.imageUrl = URL.createObjectURL(file.raw); */
      this.imageUrl = this.dataURL;
      console.log(file.raw);
    },
    beforeAvatarUpload(file) {
      var self = this;
      const isJPG = file.type === "image/jpeg" || "image/png";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var img = new Image();
        reader.onloadend = function() {
          img.src = reader.result;
          img.onload = function(event) {
            if (img.width !== 256 || img.height !== 256) {
              self.$message({
                message: "256px*256px in jpg or png, no rounded corners",
                type: "error"
              });
              return false;
            } else {
              self.dataURL = reader.result;
            }
          };
        };
      }
      return isJPG;
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeName);
      if (this.activeName === "fisrt") {
        this.tokenType = "oep4s";
      }
      if (this.activeName === "second") {
        this.tokenType = "oep5s";
      }
      if (this.activeName === "third") {
        this.tokenType = "oep8s";
      }
    },
    getTokenData() {
      this.token.list = "";
      this.loadingFlag = false;
      this.$store.dispatch("GetToken", this.$route.params).then();
      this.$store.dispatch("GetContractTx", this.$route.params).then();
    },
    toTransDetailPage($TxnId) {
      if (this.$route.params.net === "testnet") {
        this.$router.push({
          name: "TransactionDetailTest",
          params: { tx_hash: $TxnId, net: "testnet" }
        });
      } else {
        this.$router.push({
          name: "TransactionDetail",
          params: { tx_hash: $TxnId }
        });
      }
    },
    copyDetailVal($id) {
      let clipboard = new Clipboard(".copy-success");

      clipboard.on("success", function(e) {
        e.clearSelection();
      });

      if ($id === "scCodeData") {
        this.showCodeCopied = true;
      } else {
        this.showABICopied = true;
      }
    },
    toJson(str) {
      return JSON.parse(str);
    }
  }
};
</script>

<style scoped lang="scss">
.avatar-uploader {
  width: 100%;
  height: 168px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(170, 179, 180, 1);
}
.avatar-uploader {
  /deep/ .el-upload {
    width: 138px;
    height: 138px;
    background: rgba(72, 163, 255, 0.1);
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 14px;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
.token-submit {
  background: rgba(245, 242, 242, 1);
  padding-top: 32px;
  padding-bottom: 32px;
  .container {
    width: 992px;
    background: rgba(255, 255, 255, 1);
    .title-info {
      padding-top: 59px;
      display: flex;
      justify-content: center;
      .title {
        font-size: 24px;
        font-family: NunitoSans-SemiBold, NunitoSans, sans-serif;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 32px;
      }
    }
    .common-info {
      padding-top: 74px;
      display: flex;
      justify-content: start;
      flex-flow: column;
      width: 688px;
      margin-left: auto;
      margin-right: auto;
      .item {
        padding-bottom: 40px;
        .item-title {
          font-size: 14px;
          font-family: NunitoSans-SemiBold, NunitoSans, sans-serif;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: 19px;
          margin-bottom: 8px;
        }
        input {
          width: 540px;
          height: 42px;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding-left: 14px;
        }
        textarea {
          width: 540px;
          height: 168px;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          resize: none;
          padding-left: 14px;
        }
      }
    }
    .token-info {
      padding-top: 32px;
      display: flex;
      justify-content: center;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 6px;
      width: 688px;
      flex-flow: column;
      margin-left: auto;
      margin-right: auto;
      /deep/ .el-tabs__item {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC, sans-serif;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.3);
        line-height: 41px;
        height: 41px;
      }
      /deep/ .is-active {
        color: rgba(0, 0, 0, 1) !important;
      }
      /deep/ .el-tabs__content {
        display: none;
      }
      /deep/ .el-tabs {
        display: flex;
        justify-content: center;
      }
      /deep/ .el-tabs__header {
        width: 265px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        width: 224px;
      }
      .content {
        padding: 32px 48px 15px;
        .item {
          padding-bottom: 40px;
          .item-title {
            font-size: 14px;
            font-family: NunitoSans-SemiBold, NunitoSans, sans-serif;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            line-height: 19px;
            padding-bottom: 8px;
          }
          input {
            width: 320px;
            height: 42px;
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            border: 1px solid #aab3b4;
            padding-left: 14px;
          }
          .img-wrapper {
            width: 100%;
            height: 168px;
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            border: 1px solid rgba(170, 179, 180, 1);
          }
          .desc {
            font-size: 14px;
            font-family: NunitoSans-Regular, NunitoSans, sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            line-height: 19px;
            margin-top: 11px;
          }
        }
      }
    }
    .contact-info {
      width: 688px;
      margin-left: auto;
      margin-right: auto;
      padding-top: 54px;
      padding-bottom: 16px;
      display: flex;
      justify-content: start;
      flex-flow: column;
      /deep/ .el-divider--horizontal {
        margin-bottom: 64px;
      }
      .item {
        padding-bottom: 40px;
        .item-title {
          font-size: 14px;
          font-family: NunitoSans-SemiBold, NunitoSans, sans-serif;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: 19px;
          margin-bottom: 8px;
        }
        input {
          width: 320px;
          height: 42px;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding-left: 14px;
        }
      }
    }
    .submit {
      display: flex;
      justify-content: center;
      padding-bottom: 64px;
      .btn {
        width: 100px;
        height: 32px;
        background: rgba(50, 164, 190, 1);
        border-radius: 4px;
        cursor: pointer;
        .text {
          height: 22px;
          font-size: 16px;
          font-family: NunitoSans-Regular, NunitoSans, sans-serif;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
        }
      }
    }
  }
}
</style>
