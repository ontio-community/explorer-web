<template>
  <div class="home-blockline">
    <div class="container">
      <canvas id="myChart" class="mycanvas" height="80"></canvas>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Helper from "./../../helpers/helper.js";
require("chart.js");
export default {
  name: "blockline",
  components: {},
  data() {
    return {
      num: 1,
      runTime: 0,
      blockHeight: 0,
      blockTime: 0,
      dealNum: 0,
      node: 0,
      lastheight: 0,
      k: 0,
      addLength: 0,
      addDatas: [],
      addLabels: [],
      chartData: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      chartLabels: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      chartbackgroundColor: this.generateBgColor()
    };
  },
  mounted() {
    this.createAChart();
    this.generateTime("76");
    this.intervalBlock1 = setInterval(() => {
      this.generateTime(40);
    }, 3000);
  },
  watch: {
    "getTime.info": function() {
      if (this.getTime.info.length > 40) {
        for (var i = 0; i < this.getTime.info.length; i++) {
          this.chartData[75 - i] = this.getTime.info[i].generate_time;
          this.chartLabels[75 - i] = this.getTime.info[i].block_height;
          this.lastheight = this.getTime.info[0].block_height;
          /* console.log("first last",this.lastheight) */
        }
        this.myChart.update();
      } else {
        if (this.getTime.info[0].block_height > this.lastheight) {
          this.addDatas = [];
          this.addLabels = [];
          this.addLength = 0;
          for (var j = 0; j < this.getTime.info.length; j++) {
            if (this.getTime.info[j].block_height > this.lastheight) {
              this.addDatas.push(this.getTime.info[j].generate_time);
              this.addLabels.push(this.getTime.info[j].block_height);
            }
          }
          this.addLength = this.addLabels.length;
          /* console.log(this.addLabels) */
          this.k = 0;
          this.handler = setInterval(() => {
            this.setTime();
          }, 200);
          /*             for(var k = 0; k < this.addLength; k++){
              this.chartData.splice(0, 1)
              this.chartLabels.splice(0, 1)
              this.chartData.push(this.addDatas[this.addLength-k-1])
              this.chartLabels.push(this.addLabels[this.addLength-k-1])
              this.removeData(this.myChart)
              this.addData(this.myChart, this.addDatas[this.addLength-k-1])
            } */
          this.lastheight = this.getTime.info[0].block_height;
        }
      }
      /* console.log(this.getTime.info[0].block_height) */
    }
  },

  computed: {
    ...mapState({
      blockStatus: state => state.RunStatus.BlockStatus,
      getTime: state => state.RunStatus.GenerateTime,
      nodeCount: state => state.RunStatus.NodeCount
      /* data: state => state.Statistics.StatisticsData, */
    })
  },
  methods: {
    setTime() {
      if (this.k < this.addLength) {
        if (this.k >= this.addLength) {
          clearInterval(this.handler); //关闭定时
        }
        this.chartData.splice(0, 1);
        this.chartLabels.splice(0, 1);
        this.chartData.push(this.addDatas[this.addLength - this.k - 1]);
        this.chartLabels.push(this.addLabels[this.addLength - this.k - 1]);
        this.removeData(this.myChart);
        this.addData(this.myChart, this.addDatas[this.addLength - this.k - 1]);

        this.k++;
      }
    },
    getTableData() {
      var params = {};
      params.day = 14;
      this.$store.dispatch("getStatisticsData", params).then();
    },
    generateBgColor() {
      let retData = [];
      for (let i = 0; i < 76; i++) {
        retData[i] = "rgba(0, 0, 0, 0.05)";
      }
      retData.splice(75, 0, "rgba(0, 0, 0, 1)");

      return retData;
    },
    toBlockListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "blockListDetail",
          params: { pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "blockListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toTransactionListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "TransactionList",
          params: { pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "TransactionListTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toAddressListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "addressList",
          params: { token: "ont", pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "addressListTest",
          params: { token: "ont", pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toOntIdListPage() {
      if (this.$route.params.net == undefined) {
        this.$router.push({
          name: "OntIdListDetail",
          params: { pageSize: 20, pageNumber: 1 }
        });
      } else {
        this.$router.push({
          name: "OntIdListDetailTest",
          params: { pageSize: 20, pageNumber: 1, net: "testnet" }
        });
      }
    },
    toOnlineNodes() {
      /* this.$router.push({ name: 'NodeStakeList'}) */
      window.open("https://node.ont.io/");
    },
    getNodeCountStatus() {
      this.$store.dispatch("getNodeCount").then();
    },
    getRunStatus() {
      this.$store.dispatch("getRunStatus", this.$route.params).then();
    },
    generateTime(amount) {
      this.$route.params.amount = amount;
      this.$store.dispatch("generateTime", this.$route.params).then();
    },
    getDay($time) {
      return Helper.getDayFunc($time);
    },
    createAChart: function() {
      var ctx = document.getElementById("myChart");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "BlockInterval",
              data: this.chartData,
              backgroundColor: this.chartbackgroundColor,
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(0, 0, 0, 1)"
            }
          ]
        },
        options: {
          showScale: false,
          responsive: true,
          maintainAspectRatio: false,
          scaleOverride: true, // 是否用硬编码重写y轴网格线
          scaleSteps: 0, //y轴刻度的个数
          scaleStepWidth: 10, //y轴每个刻度的宽度
          scaleStartValue: 0, //y轴的起始值
          scaleLineColor: "rgba(255,255,255,1)", // x轴y轴的颜
          scaleLineWidth: 0,
          scaleShowHorizontalLines: false,
          scaleShowVerticalLines: false,
          tooltips: {
            displayColors: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  display: false
                },
                gridLines: {
                  offsetGridLines: true,
                  display: false
                },
                display: false
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  display: false
                },
                gridLines: {
                  offsetGridLines: true,
                  display: false
                },
                display: false
              }
            ]
          },
          scaleShowGridLines: false,
          title: {
            dispaly: false
          },
          legend: {
            display: false,
            labels: {
              fontColor: "rgb(0,0,0)"
            }
          }
        }
      });
    },
    addData: function(chart, data) {
      chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
      });
      chart.update();
    },
    removeData: function(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      chart.update();
    },
    numberAnimate: function(setting, className) {
      var defaults = {
        speed: 1000, //动画速度
        num: "", //初始化值
        iniAnimate: true, //是否要初始化动画效果
        symbol: "", //默认的分割符号，千，万，千万
        dot: 0 //保留几位小数点
      };

      //如果setting为空，就取default的值
      var setting = $.extend(defaults, setting);

      //如果对象有多个，提示出错
      if ($(className).length > 1) {
        alert("just only one obj!");
        return;
      }

      //如果未设置初始化值。提示出错
      if (setting.num == "") {
        alert("must set a num!");
        return;
      }
      var nHtml =
        '<div class="mt-number-animate-dom" data-num="{{num}}">\
                       <span class="mt-number-animate-span">0</span>\
                       <span class="mt-number-animate-span">1</span>\
                       <span class="mt-number-animate-span">2</span>\
                       <span class="mt-number-animate-span">3</span>\
                       <span class="mt-number-animate-span">4</span>\
                       <span class="mt-number-animate-span">5</span>\
                       <span class="mt-number-animate-span">6</span>\
                       <span class="mt-number-animate-span">7</span>\
                       <span class="mt-number-animate-span">8</span>\
                       <span class="mt-number-animate-span">9</span>\
                       <span class="mt-number-animate-span">.</span>\
                     </div>';
      //数字处理
      var numToArr = function(num) {
        num = parseFloat(num).toFixed(setting.dot);
        if (typeof num == "number") {
          var arrStr = num.toString().split("");
        } else {
          var arrStr = num.split("");
        }

        return arrStr;
      };

      //设置DOM symbol:分割符号
      var setNumDom = function(arrStr) {
        var shtml = '<div class="mt-number-animate">';
        for (var i = 0, len = arrStr.length; i < len; i++) {
          if (
            i != 0 &&
            (len - i) % 3 == 0 &&
            setting.symbol != "" &&
            arrStr[i] != "."
          ) {
            shtml +=
              '<div class="mt-number-animate-dot">' +
              setting.symbol +
              "</div>" +
              nHtml.replace("{{num}}", arrStr[i]);
          } else {
            shtml += nHtml.replace("{{num}}", arrStr[i]);
          }
        }
        shtml += "</div>";
        return shtml;
      };

      //执行动画
      var runAnimate = function($parent) {
        $parent.find(".mt-number-animate-dom").each(function() {
          var num = $(this).attr("data-num");
          num = num == "." ? 10 : num;
          var spanHei = $(this).height() / 11; //11为元素个数
          var thisTop = -1 - num * spanHei + "px"; //如果 -num*spanHei == 0,动画不会加载，表现为不会从9跳回0，所以让其最大为-1 ~~~LingXiaoSu
          if (thisTop != $(this).css("top")) {
            if (setting.iniAnimate) {
              //HTML5不支持
              if (!window.applicationCache) {
                $(this).animate(
                  {
                    top: thisTop
                  },
                  setting.speed
                );
              } else {
                $(this).css({
                  transform: "translateY(" + thisTop + ")",
                  "-ms-transform": "translateY(" + thisTop + ")" /* IE 9 */,
                  "-moz-transform": "translateY(" + thisTop + ")" /* Firefox */,
                  "-webkit-transform":
                    "translateY(" + thisTop + ")" /* Safari 和 Chrome */,
                  "-o-transform": "translateY(" + thisTop + ")",
                  "-ms-transition": setting.speed / 1000 + "s",
                  "-moz-transition": setting.speed / 1000 + "s",
                  "-webkit-transition": setting.speed / 1000 + "s",
                  "-o-transition": setting.speed / 1000 + "s",
                  transition: setting.speed / 1000 + "s"
                });
              }
            } else {
              setting.iniAnimate = true;
              $(this).css({
                top: thisTop
              });
            }
          }
        });
      };

      //初始化
      var init = function($parent) {
        //初始化
        $parent.html(setNumDom(numToArr(setting.num)));
        runAnimate($parent);
      };

      //重置参数
      this.resetData = function(num) {
        var newArr = numToArr(num);
        var $dom = $(className).find(".mt-number-animate-dom");
        if ($dom.length < newArr.length) {
          $(className).html(setNumDom(numToArr(num)));
        } else {
          $dom.each(function(index, el) {
            $(this).attr("data-num", newArr[index]);
          });
        }
        runAnimate($(className));
      };

      //init
      init($(className));
      return this;
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalBlock);
    clearInterval(this.intervalBlock1);
  }
};
</script>

<style lang="less" scoped>
.home-blockline {
  .container {
    padding-top: 140px;
    .mycanvas {
      width: 100%;
    }
  }
}
@media only screen and (max-width: 960px) {
  .home-blockline {
    .container {
      padding-top: 70px;
      .mycanvas {
        width: 100%;
      }
    }
  }
}
</style>
