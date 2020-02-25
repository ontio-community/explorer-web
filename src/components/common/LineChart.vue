<template>
  <div :id="'myChart'+index" :style="{width: '480px', height: '400px'}"></div>
</template>
<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: ["labels", "label", "data", "options", "index"],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
      // 绘制图表
      myChart.setOption({
        title: { text: this.label },
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          },
          axisPointer: {
            lineStyle: {
              width: 3,
              color: "#000"
            }
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#F7B500"
          },
          formatter: function(params) {
            var res = "<div><div>"+params[0].name+"</div><div>"+params[0].seriesName.substr(3,20)+": "+params[0].data+"</div></div>";
            return res;
          }
        },
        xAxis: {
          data: this.labels,
          axisPointer: {
            show: true
          }
        },
        yAxis: {
            axisLabel: {
              formatter: function (value,index) {
                // when the floored value is the same as the value we have a whole number
/*                 if (labels[0] > 1000 && Math.floor(label) === label) {
                  return label / 1000 + 'k';
                } else {
                  return label
                } */
                if (value > 1000) {
                  return value / 1000 + 'k';
                } else {
                  return value
                }
              }
            }
        },
        series: [
          {
            name: this.label,
            type: "line",
            symbol: "none",
            /* 填充颜色 */
            areaStyle: {
              color: "#f7b5006e"
            },
            itemStyle: {
              normal: {
                /* 线条颜色 */
                lineStyle: {
                  color: "#F7B500"
                }
              }
            },
            data: this.data
          }
        ]
      });
    }
  }
};
</script>
