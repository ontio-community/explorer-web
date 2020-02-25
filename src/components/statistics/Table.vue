<template>
  <div class="detail-page">
    <div v-loading.fullscreen.lock="fullscreenLoading"  class="noshow" ></div>
    <div class="container">
      <title-div
        class="title-content"
        :title="$route.params.day + $t('statistics.day') + titName + $t('statistics.name')"
      ></title-div>

      <div class="tab-content" >
        <div class="tab-item">
          <div class="chart-content">
            <div class="chart-item" v-for="(item,index) in data.data" :key="index">
              <line-chart
                class="line-chart-style"
                :labels="data.labels"
                :label=" $route.params.day + $t('statistics.day') + $t('statistics.' + item.label)"
                :data="item.list"
                :index="index"
                options
              ></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import titleDiv from "../common/DetailTitle";

export default {
  name: "StatisticsTable",
  components: {
    titleDiv
  },
  mounted() {
    this.getTableData();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // this.getContractList()
  },
  watch: {
    $route: ["getTableData"],
    "statistics.day": ["getTableData"],
    data:function(){
        this.fullscreenLoading = false
    }
  },
  computed: {
    ...mapState({
      data: state => state.Statistics.StatisticsData,
      scList: state => state.Statistics.ScList
    }),
    titName: function() {
      for (let scIndex in this.scList) {
        if (
          this.scList[scIndex].ContractHash === this.$route.params.contractHash
        ) {
          return this.scList[scIndex].Name + " ";
        }
      }

      return "";
    }
  },
  data() {
    return {
        fullscreenLoading: true,
      chartid: [
        "chart0",
        "chart1",
        "chart2",
        "chart3",
        "chart4",
        "chart5",
        "chart6",
        "chart7",
        "chart8",
        "chart9"
      ],
      /* updateArgs: [true, true, {duration: 1000}], */
      chartOptions: {
        chart: {
          type: "area"
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: []
        },
        series: [
          {
            name: "",
            data: [],
            color: "#6fcd98"
          }
        ]
      }
    };
  },
  methods: {
    toStatistics($days) {
      let name = "Statistics";
      let params = { day: $days };

      if (typeof this.$route.params.contractHash !== "undefined") {
        params.contractHash = this.$route.params.contractHash;
        name = name + "Contract";
      }

      if (this.$route.params.net === "testnet") {
        params.net = "testnet";
        name = name + "Test";
      }

      this.$router.push({ name: name, params: params });

      location.reload();
    },
    toScStatistics($hash) {
      this.$route.params.contractHash = $hash;
      this.toStatistics(this.$route.params.day);
    },
    toAllStatistics() {
      delete this.$route.params.contractHash;
      this.toStatistics(this.$route.params.day);
    },
    getTableData() {
        
        this.fullscreenLoading = true
      this.$store.dispatch("getStatisticsData", this.$route.params).then();
    },
    getContractList() {
      this.$store.dispatch("getContractList", this.$route.params).then();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/detail-page.less";
</style>
<style>
.el-loading-spinner .path {
  stroke: #000;
}
</style>