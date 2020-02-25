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
          <input v-model="tokenName" maxlength="255" />
        </div>
        <div class="item">
          <div class="item-title">Virtual Machine Category*</div>
          <!--           <el-radio v-model="radio" label="neovm">neovm</el-radio>
          <el-radio v-model="radio" label="wasmvm">wasmvm</el-radio>-->
          <div class="radio-content">
            <span
              :class="radioFlag?'radio-item active':'radio-item'"
              @click="chooseVM('neovm')"
            >Neovm</span>
            <span
              :class="radioFlag?'radio-item':'radio-item active'"
              @click="chooseVM('wasmvm')"
            >Wasmvm</span>
          </div>
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
          <textarea v-model="tokenDescription" maxlength="800" />
        </div>
      </div>
      <div class="token-info">
        <!--         <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="OEP-4" name="first">OEP-4</el-tab-pane>
          <el-tab-pane label="OEP-5" name="second">OEP-5</el-tab-pane>
          <el-tab-pane label="OEP-8" name="third">OEP-8</el-tab-pane>
        </el-tabs>-->
        <div class="tabs">
          <div class="switch">
            <div
              @click="toPage('oep4')"
              :class="tokenType=='oep4s' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">OEP-4</div>
              <div class="line"></div>
            </div>
            <div
              @click="toPage('oep5')"
              :class="tokenType=='oep5s' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn"
            >
              <div class="text">OEP-5</div>
              <div class="line"></div>
            </div>
            <div
              @click="toPage('oep8')"
              :class="tokenType=='oep8s' ? 'btn-current' : 'btn-choose'"
              style="margin-right:30px"
              class="btn btn-left-0-border"
            >
              <div class="text">OEP-8</div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div v-if="tokenType=='oep4s'" id="oep4" class="content">
          <div class="item">
            <div class="item-title">Token Symbol*</div>
            <input v-model="tokenSymbol" maxlength="255" />
          </div>
          <div class="item">
            <div class="item-title">Token Decimals*</div>
            <input v-model="tokenDecimals" type="number" maxlength="11" />
          </div>
          <div class="item">
            <div class="item-title">Total Supply*</div>
            <input v-model="tokenTotalSupply" type="number" maxlength="15" />
          </div>
          <div class="item">
            <div class="item-title">Logo* (256px*256px in jpg or png, no rounded corners)</div>
            <el-upload
              :class="imageUrl?'avatar-uploader none':'avatar-uploader'"
              action="/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" id="logoImg" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div v-if="tokenType=='oep5s'" id="oep5" class="content">
          <div class="item">
            <div class="item-title">Token Symbol*</div>
            <input v-model="tokenSymbol" maxlength="255" />
          </div>
          <div class="item">
            <div class="item-title">Total Supply*</div>
            <input v-model="tokenTotalSupply" type="number" maxlength="15" />
          </div>
          <div class="item">
            <div class="item-title">Logo*</div>
            <el-upload
              :class="imageUrl?'avatar-uploader none':'avatar-uploader'"
              action="/"
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
        <div v-if="tokenType=='oep8s'" id="oep8" class="content">
          <div class="item">
            <el-table :data="tokens" style="width: 100%" empty-text="No token added">
              <el-table-column label="Token ID" width="120">
                <template slot-scope="scope">
                  <div class="table-text">{{scope.row.token_id}}</div>
                </template>
              </el-table-column>
              <el-table-column label="Token Name" width="120">
                <template slot-scope="scope">
                  <div class="table-text">{{scope.row.token_name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="Total Supply" width="120">
                <template slot-scope="scope">
                  <div class="table-text">{{scope.row.total_supply}}</div>
                </template>
              </el-table-column>
              <el-table-column label="Token Symbol" width="130">
                <template slot-scope="scope">
                  <div class="table-text">{{scope.row.symbol}}</div>
                </template>
              </el-table-column>
              <el-table-column label="Operation">
                <template slot-scope="scope">
                  <!--                   <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>-->
                  <i
                    style="width:14px;height:14px;color:red;cursor:pointer"
                    @click="handleDelete(scope.$index, scope.row)"
                    class="el-icon-remove-outline"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="item">
            <div class="item-title">Oep8 Token ID*</div>
            <input v-model="oep8info.token_id" maxlength="255" />
          </div>
          <div class="item">
            <div class="item-title">Oep8 Token Name*</div>
            <input v-model="oep8info.token_name" maxlength="255" />
          </div>
          <div class="item">
            <div class="item-title">Oep8 Total Supply*</div>
            <input v-model="oep8info.total_supply" type="number" maxlength="15" />
          </div>
          <div class="item">
            <div class="item-title">Oep8 Token Symbol*</div>
            <input v-model="oep8info.symbol" maxlength="255" />
          </div>
          <div class="item">
            <div class="add-btn">
              <div class="text" @click="addOep8Token()">Add</div>
            </div>
          </div>
          <div class="item">
            <div class="item-title">Logo*</div>
            <el-upload
              :class="imageUrl?'avatar-uploader none':'avatar-uploader'"
              action="/"
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
        <!-- <el-divider>Contact Information</el-divider> -->
        <div class="title">Contact Information</div>
        <div class="item">
          <div class="item-title">Website (Optional)</div>
          <input v-model="tokenWebsite" />
        </div>
        <div class="item">
          <div class="item-title">E-mail*</div>
          <input v-model="tokenEmail" />
        </div>
      </div>
      <div class="submit">
        <div class="btn">
          <img src="../../assets/images/home/search.png" @click="submit()"/>
        </div>
      </div>
    </div>
    <el-dialog
      title="Success"
      :visible.sync="dialogVisible"
      width="480px"
      :before-close="handleClose"
    >
      <span>Token information is sucessfully submitted.</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Clipboard from "clipboard";
import HelperTool from "./../../helpers/helper";

export default {
  name: "Token-Detail",
  mounted() {},
  watch: {
    submitresult: function() {
      let self = this;
      console.log("submitresult", this.submitresult);
      if (this.submitresult.list.code == 61003) {
        this.$message({
          message: this.$t("error.msg19"),
          type: "error"
        });
      } else {
        if (
          this.submitresult.list.code == 61011 ||
          this.submitresult.list.code == 61010
        ) {
          this.$message({
            message: this.$t("error.msg20"),
            type: "error"
          });
        } else {
          this.dialogVisible = true;
          self.activeName = "first";
          self.tokenType = "oep4s";
          self.radio = "";
          self.tokenHash = "";
          self.tokenName = "";
          self.tokenDescription = "";
          self.tokenAbi = "";
          self.tokenCode = "";
          self.dataURL = "";
          self.tokenEmail = "";
          self.tokenWebsite = "";
          self.tokenTotalSupply = "";
          self.tokenDecimals = "";
          self.tokenSymbol = "";
          self.vm_category = "";
          self.imageUrl = "";
          self.tokens = [];
        }
      }
    }
  },
  computed: {
    ...mapState({
      submitresult: state => state.Tokens.Res
    })
  },
  data() {
    return {
      radioFlag: true,
      dialogVisible: false,
      showCodeCopied: false,
      showABICopied: false,
      tokenData: {},
      tokenInfo: {},
      loadingFlag: false,
      activeName: "first",
      radio: "neovm",
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
      oep8info: {
        token_id: "",
        token_name: "",
        total_supply: "",
        symbol: ""
      },
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
        params.vm_category = self.radio;
        params.tokens = self.tokens;
        this.$store
          .dispatch("submitToken", params)
          .then(res => {})
          .catch(() => {
            self.$message({
              message: "failed",
              type: "error"
            });
          });
      }
    },
    chooseVM($val) {
      if ($val == "neovm") {
        this.radioFlag = true;
        this.radio = "neovm";
      } else {
        this.radioFlag = false;
        this.radio = "wasmvm";
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
      if (self.radio === "") {
        self.$message({
          message: self.$t("error.msg13"),
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
      if ($type === "oep8s") {
        if (self.tokens.length == 0) {
          self.$message({
            message: self.$t("error.msg12"),
            type: "error"
          });
          flag = false;
          return flag;
        }
      }
      if ($type === "oep4s") {
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
        if (
          self.tokenTotalSupply > 999999999999999 ||
          self.tokenTotalSupply < 1
        ) {
          self.$message({
            message: self.$t("error.msg21"),
            type: "error"
          });
          flag = false;
          return flag;
        }
      }
      if ($type === "oep5s") {
        if (self.tokenSymbol === "") {
          self.$message({
            message: self.$t("error.msg6"),
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
        if (
          self.tokenTotalSupply > 999999999999999 ||
          self.tokenTotalSupply < 1
        ) {
          self.$message({
            message: self.$t("error.msg21"),
            type: "error"
          });
          flag = false;
          return flag;
        }
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
      return flag;
    },
    handleClose(done) {
      done();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tokens.splice(index, 1);
      console.log(this.tokens);
    },
    addOep8Token(index, row) {
      let self = this;
      if (this.oep8info.token_id === "") {
        self.$message({
          message: self.$t("error.msg14"),
          type: "error"
        });
        return false;
      }
      if (this.oep8info.token_name === "") {
        self.$message({
          message: self.$t("error.msg15"),
          type: "error"
        });
        return false;
      }
      if (this.oep8info.total_supply === "") {
        self.$message({
          message: self.$t("error.msg16"),
          type: "error"
        });
        return false;
      }
      if (
        self.oep8info.total_supply > 999999999999999 ||
        self.oep8info.total_supply < 1
      ) {
        self.$message({
          message: self.$t("error.msg21"),
          type: "error"
        });
        return false;
      }
      if (this.oep8info.symbol === "") {
        self.$message({
          message: self.$t("error.msg17"),
          type: "error"
        });
        return false;
      }
      let checkFlag = true;
      for (var i = 0; i < this.tokens.length; i++) {
        if (this.tokens[i].token_id === this.oep8info.token_id) {
          checkFlag = false;
        }
      }
      if (!checkFlag) {
        self.$message({
          message: self.$t("error.msg18"),
          type: "error"
        });
        return false;
      }
      let array = {
        token_id: this.oep8info.token_id,
        token_name: this.oep8info.token_name,
        total_supply: this.oep8info.total_supply,
        symbol: this.oep8info.symbol
      };
      this.tokens.push(array);
      console.log(this.tokens);
      this.oep8info.token_id = "";
      this.oep8info.token_name = "";
      this.oep8info.total_supply = "";
      this.oep8info.symbol = "";
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
              self.imageUrl = reader.result;
            }
          };
        };
      }
      return false;
    },

    toPage($val) {
      this.tokens = [];
      this.oep8info.token_id = "";
      this.oep8info.token_name = "";
      this.oep8info.total_supply = "";
      this.oep8info.symbol = "";
      this.imageUrl = "";
      this.tokenSymbol = "";
      this.tokenDecimals = "";
      this.tokenTotalSupply = "";
      if ($val == "oep4") {
        this.tokenType = "oep4s";
      }
      if ($val == "oep5") {
        this.tokenType = "oep5s";
      }
      if ($val == "oep8") {
        this.tokenType = "oep8s";
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeName);
      this.tokens = [];
      this.oep8info.token_id = "";
      this.oep8info.token_name = "";
      this.oep8info.total_supply = "";
      this.oep8info.symbol = "";
      this.imageUrl = "";
      this.tokenSymbol = "";
      this.tokenDecimals = "";
      this.tokenTotalSupply = "";
      if (this.activeName === "first") {
        this.tokenType = "oep4s";
      }
      if (this.activeName === "second") {
        this.tokenType = "oep5s";
      }
      if (this.activeName === "third") {
        this.tokenType = "oep8s";
      }
      console.log(this.tokenType);
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

<style scoped lang="less">
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: rgba(0, 0, 0, 0.1);
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: rgba(0, 0, 0, 0.1);
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: rgba(0, 0, 0, 0.1);
}
:-moz-placeholder {
  /* Firefox 18- */
  color: rgba(0, 0, 0, 0.1);
}
input:focus {
  outline: none;
}
textarea:focus {
  outline: none;
}
.avatar-uploader {
  width: 100%;
}
.avatar-uploader.none {
  /deep/ .el-upload {
    width: 82px;
    height: 82px;
    background: rgba(72, 163, 255, 0);
    border: 1px solid rgba(0, 0, 0, 0);
  }
}
.avatar-uploader {
  /deep/ .el-upload {
    width: 82px;
    height: 82px;
    border: 1px rgba(0, 0, 0, 0.3);
    border-style: dashed;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #32a4be;
}
.avatar-uploader-icon {
  font-size: 16px;
  color: #000;
  font-weight: 1000;
  width: 82px;
  height: 82px;
  line-height: 82px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  color: rgba(0, 0, 0, 0.8);
}
.avatar {
  width: 82px;
  height: 82px;
  display: block;
}
/deep/ .el-table th {
  background: rgba(0, 0, 0, 0.4);
  height: 40px;
  padding: 0;
}
/deep/ .el-table th > .cell {
  font-size: 14px;
  font-family: SourceSansPro-Semibold, "Helvetica Neue", "Arial", sans-serif;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 19px;
}
/deep/ .el-radio.is-checked {
  color: #32a4be;
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #32a4be;
    background: #32a4be;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #32a4be;
  }
}
/deep/ .el-tabs__active-bar {
  background: #32a4be;
  width: 88px !important;
  display: none;
}
/deep/ .el-dialog__headerbtn {
  display: none;
}
/deep/ .el-dialog__title {
  font-size: 16px;
  font-family: SourceSansPro-Semibold, "Helvetica Neue", "Arial", sans-serif;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}
/deep/ .el-dialog__body {
  text-align: center;
}
/deep/ .el-dialog__footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
/deep/ .el-button--primary {
  width: 100px;
  height: 32px;
  background: rgba(50, 164, 190, 1);
  border-radius: 4px;
  padding: 0;
}
/deep/ .el-tabs__item {
  padding: 0 !important;
  border-bottom: none;
  margin-right: 30px;
}
/deep/ .el-tabs__item.is-active {
  border-bottom: 2px solid #32a4be;
}
/deep/ .el-divider__text {
  font-size: 18px;
  font-family: Roboto-Medium, Roboto;
  font-weight: 600;
  color: #000000;
  line-height: 21px;
}
.token-submit {
  padding-top: 32px;
  padding-bottom: 32px;
  .container {
    width: 688px;
    background: rgba(255, 255, 255, 1);
    .title-info {
      padding-top: 130px;
      display: flex;
      justify-content: start;
      .title {
        font-size: 32px;
        font-family: Explorerfonts-Bold, SamsungSharpSans;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
      }
    }
    .common-info {
      padding-top: 80px;
      display: flex;
      justify-content: start;
      flex-flow: column;
      width: 688px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      .item {
        padding-bottom: 40px;
        .radio-content {
          display: flex;
          .radio-item {
            border: 1px solid rgba(242, 242, 242, 1);
            transition: all ease 0.3s;
            cursor: pointer;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 16px;
            padding: 10px 16px;
            margin-right: 10px;
          }
          .active {
            border: 1px solid rgba(0, 0, 0, 1);
            transition: all ease 0.3s;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 16px;
          }
        }
        .item-title {
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 14px;
          margin-bottom: 20px;
        }
        input {
          width: 100%;
          height: 42px;
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 16px;
          background: rgba(255, 255, 255, 1);
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 2px solid #f2f2f2;
          transition: all ease 0.3s;
        }
        input:focus {
          border-bottom-color: #000;
          transition: all ease 0.3s;
        }
        textarea:focus {
          border-bottom-color: #000;
          transition: all ease 0.3s;
        }
        textarea {
          width: 100%;
          height: 168px;
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 16px;
          background: rgba(255, 255, 255, 1);
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border: 0 0 2px 0;
          border-bottom: 2px solid #f2f2f2;
          resize: none;
          transition: all ease 0.3s;
        }
      }
    }
    .token-info {
      padding-top: 32px;
      display: flex;
      justify-content: center;
      border-radius: 6px;
      width: 688px;
      flex-flow: column;
      margin-left: auto;
      margin-right: auto;
      .tabs {
        .switch {
          display: flex;

          .line {
            width: 20px;
            height: 4px;
            background-color: #000;
            margin: auto;
            transition: all ease 0.5s;
          }
          .btn-current {
            font-size: 18px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            line-height: 21px;
            .text {
              margin-bottom: 10px;
              color: rgba(0, 0, 0, 1);
            }
          }
          .btn-choose {
            font-size: 18px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            line-height: 21px;
            cursor: pointer;
            .text {
              margin-bottom: 10px;
              color: rgba(0, 0, 0, 0.6);
            }
            .line {
              width: 20px;
              height: 4px;
              background-color: #fff;
              margin: auto;
              transition: all ease 0.5s;
            }
          }
        }
      }
      /deep/ .el-tabs__item {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 600;
        color: #000000;
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
        width: 100%;
      }
      /deep/ .el-tabs__nav-wrap::after {
        width: 240px;
      }
      .content {
        padding-top: 60px;
        text-align: left;
        .item {
          padding-bottom: 44px;
          .item-title {
            font-size: 12px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 14px;
            padding-bottom: 20px;
          }
          input {
            width: 100%;
            padding-bottom: 25px;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 16px;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 2px solid #f2f2f2;
            transition: all ease 0.3s;
          }
          input:focus {
            transition: all ease 0.3s;
            border-bottom: 2px solid #000;
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
            font-family: SourceSansPro-Regular, "Helvetica Neue", "Arial",
              sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            line-height: 19px;
            margin-top: 11px;
          }
          .table-input {
            padding-left: 0px;
            font-size: 14px;
            font-family: SourceSansPro-Regular, "Helvetica Neue", "Arial",
              sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 20px;
            border: none;
          }
          .table-text {
            font-size: 14px;
            font-family: SourceSansPro-Regular, "Helvetica Neue", "Arial",
              sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 20px;
            opacity: 0.65;
            padding: 10px 0;
          }
          .add-btn {
            cursor: pointer;
            width: 100px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid rgba(50, 164, 190, 1);
            .text {
              height: 30px;
              font-size: 16px;
              font-family: SourceSansPro-Regular, "Helvetica Neue", "Arial",
                sans-serif;
              font-weight: 400;
              color: rgba(50, 164, 190, 1);
              line-height: 30px;
              text-align: center;
            }
          }
          .add-btn:hover {
            background: rgba(72, 163, 255, 0.1);
            border-radius: 4px;
            border: 1px solid rgba(50, 164, 190, 1);
          }
        }
      }
    }
    .contact-info {
      width: 688px;
      margin-left: auto;
      margin-right: auto;
      padding-top: 16px;
      padding-bottom: 20px;
      display: flex;
      justify-content: start;
      flex-flow: column;
      text-align: left;
      /deep/ .el-divider--horizontal {
        margin-bottom: 64px;
      }
      .title {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 21px;
        padding-bottom: 60px;
      }
      .item {
        padding-bottom: 40px;
        .item-title {
          font-size: 12px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 14px;
          margin-bottom: 20px;
        }
        input {
          width: 100%;
          font-size: 14px;
          font-family: Roboto-Regular, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 16px;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 2px solid #f2f2f2;
          transition: all ease .3s;
          padding-bottom: 25px;
        }
        input:focus{
          border-bottom: 2px solid #000;
          transition: all ease .3s;
          padding-bottom: 25px;

        }
      }
    }
    .submit {
      display: flex;
      padding-bottom: 64px;
      .btn {
        cursor: pointer;
        img{
          width: 60px;
          height: 60px;
          transition: all ease 0.3s;
        }
        img:hover{
          opacity: 0.5;
          transition: all ease 0.3s;
        }
      }
    }
  }
}
</style>
