<template>
  <div class="ont-pagination-top">
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :pageSizes="pageSizes"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  /**
   * 绘制页数导航
   *
   * total： 总页数
   * paramVal： 可选；特殊参数的值
   */
  name: "TurnThePage",
  props: ["total", "paramVal"],
  data() {
    return {
      pageSize: 0,
      currentPage: 0,
      pageSizesTest: [10, 20],
      pageSizesMain: [10, 20],
      pageSizes: [10, 20, 30, 50, 100],
      options: [
        {
          value: "ALL",
          label: "ALL"
        },
        {
          value: "ONT",
          label: "ONT"
        },
        {
          value: "ONG",
          label: "ONG"
        },
        {
          value: "PAX",
          label: "PAX"
        }
      ],
      oepValue: this.$route.params.assetName
        ? this.$route.params.assetName
        : "ALL"
    };
  },
  watch: {
    $route: "setParams",
    total: "setParams",
    oepValue: "setAsset"
  },
  mounted() {
    this.setParams();
    console.log(this.$route.name);
  },
  methods: {
    setAsset() {
      /* sessionStorage.setItem("asset_name", this.oepValue); */
      this.toFirstPage();
    },
    setParams() {
      this.currentPage = Number(this.$route.params.pageNumber);
      this.pageSize = Number(this.$route.params.pageSize);
      if (this.$route.params.net === "testnet") {
        this.pageSizes = this.pageSizesTest;
      } else {
        this.pageSizes = this.pageSizesMain;
      }
    },
    toFirstPage() {
      let params = { assetName: this.oepValue, pageSize: 20, pageNumber: 1 };
      this.routerPush(params);
    },
    handleCurrentChange(val) {
      let params = { pageSize: this.$route.params.pageSize, pageNumber: val };
      this.routerPush(params);
    },
    handleSizeChange(val) {
      let params = { pageSize: val, pageNumber: "1" };
      this.routerPush(params);
    },
    routerPush(params) {
      // 判断网络
      if (this.$route.params.net === "testnet") {
        params["net"] = "testnet";
      }

      // 判断是否有其他参数
      if (typeof this.paramVal !== "undefined") {
        params[this.$route.name] = this.paramVal;
      }

      // 注意在view组件中需要用watch触发数据刷新！！
      this.$router.push({ name: this.$route.name, params: params });
    }
  }
};
</script>

<style scoped>
.ont-pagination-top {
  margin-top: 60px;
  text-align: right;
}

.total-data-lh {
  line-height: 32px;
}
</style>
<style>
.el-pager li{
  
      font-family: Roboto-Regular, Roboto;
      /* padding: 0; */
      transition: all ease 0.3s;
}
.el-pager li:hover{
    color: #1067BB; 
    transition: all ease 0.3s;
}
.el-pager li.active {
    color: #1067BB; 
    transition: all ease 0.3s;
}
.el-pagination button{
  padding-right: 0;
}
.el-pagination .btn-next .el-icon{
  text-align: right;
}
.el-pagination{
  padding-right: 0;
}
.el-pagination button:disabled{
  cursor: default;
}
</style>
