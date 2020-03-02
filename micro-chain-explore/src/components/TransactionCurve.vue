<template>
  <section class="block">
    <div class="trade-curve">
      <div class="trade-curve-header">
        <div class="trade-curve-div">
          <span class="trade-curve-title">{{this.$t("message.txs_title")}}</span>
        </div>
      </div>
      <div class="trade-curve-table">
        <el-radio-group v-model="selectChart" class="curve-top" @change="initCharts">
          <el-radio-button :label="0">{{this.$t("message.tx_curve")}}</el-radio-button>
          <el-radio-button :label="1">{{this.$t("message.tx_statistics")}}</el-radio-button>
        </el-radio-group>
        <div v-loading="loading" class="curve-div" ref="tradeCurve" v-show="gotData"></div>
        <el-row
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
          class="trade-curve-nodata"
          v-show="!gotData"
        >{{this.$t("message.noData")}}</el-row>
      </div>
    </div>
  </section>
</template>
<script>
import { getTransactionsCount, getBlocksTradesCount } from "../js/request";
import { formatDate } from "../js/utils";
export default {
  name: "TransactionCurve",
  data() {
    return {
      gotData: false,
      loading: false,
      interval: 0,
      transactionCount: [],
      blocksTradesCount: [],
      tradesOfblocksTradesCount: [],
      blocksOfblocksTradesCount: [],
      selectChart: 0
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    tips() {
      return [
        this.$t("message.lastdays"),
        this.$t("message.txs"),
        this.$t("message.blocks")
      ];
    }
  },
  props: {
    liveUpdate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    liveUpdate() {
      if (this.liveUpdate) {
        this.interval = setInterval(this.init, 10000);
      } else {
        clearInterval(this.interval);
      }
    },
    "$i18n.locale"() {
      this.initCharts();
    }
  },
  methods: {
    async init() {
      await this.getTransactionsCount();
      await this.getBlocksTradesCount();
      this.initCharts();
    },
    async getTransactionsCount() {
      this.loading = true;
      let res = await getTransactionsCount();
      if (res.data.length > 0) {
        this.transactionCount = [];
        for (var i = 0; i < res.data.length; i++) {
          this.transactionCount.push({
            name: res.data[i].time,
            value: [res.data[i].time, res.data[i].count]
          });
        }
        this.loadingTransaction = true;
      } else {
        this.transactionCount = [];
        this.gotData = false;
      }
      this.loading = false;
    },
    async getBlocksTradesCount() {
      this.loading = true;
      let res = await getBlocksTradesCount();
      if (res.data.length > 0) {
        this.blocksTradesCount = [];
        this.tradesOfblocksTradesCount = [];
        this.blocksOfblocksTradesCount = [];
        for (var i = 0; i < res.data.length; i++) {
          this.blocksTradesCount.push({
            value: res.data[i].blocks,
            xAxis: res.data[i].trades,
            yAxis: res.data[i].blocks
          });
          this.tradesOfblocksTradesCount.push(res.data[i].trades);
          this.blocksOfblocksTradesCount.push(res.data[i].blocks);
        }
        this.gotData = true;
      } else {
        this.blocksTradesCount = [];
        this.tradesOfblocksTradesCount = [];
        this.blocksOfblocksTradesCount = [];
        this.gotData = false;
      }
      this.loading = false;
    },
    initCharts() {
      let tradeChart = this.$echarts.init(this.$refs.tradeCurve);
      tradeChart.clear();
      if (this.selectChart === 0) {
        tradeChart.setOption({
          legend: {
            x: "center",
            y: "bottom",
            data: []
          },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: 100,
            right: 100
          },
          color: ["#66CCFF"],
          xAxis: {
            type: "time",
            axisLabel: {
              interval: 0,
              rotate: 30,
              formatter: function(value, index) {
                return formatDate(value);
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            name: this.tips[0],
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            }
          },
          series: [
            {
              name: this.tips[1],
              type: "line",
              data: this.transactionCount,
              showSymbol: false,
              hoverAnimation: false
            }
          ]
        });
      } else {
        tradeChart.setOption({
          color: ["#FF6600"],
          tooltip: {},
          grid: {
            left: 80,
            right: 80
          },
          xAxis: [
            {
              name: this.tips[1],
              splitLine: {
                show: false
              },
              data: this.tradesOfblocksTradesCount
            }
          ],
          yAxis: [
            {
              name: this.tips[2],
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: this.tips[2],
              type: "bar",
              data: this.blocksOfblocksTradesCount,
              barGap: "80%",
              barCategoryGap: "50%",
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: "top",
                    textStyle: { fontSize: 14, fontWeight: "bold" }
                  }
                }
              }
            }
          ]
        });
      }
      window.addEventListener("resize", () => {
        tradeChart.resize();
      });
    },
    showAllTransaction() {
      this.$router.push({ path: "trade" });
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "background:#EDF5FA;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
      }
    },
    jumpDetail(hash) {
      this.$router.push({ path: "tradeDetail", query: { hash: hash } });
    },
    jumpDetailByBlockNum(blockNum) {
      let url = window.location.origin + `/#/blockDetail/?blockNum=${blockNum}`;
      window.open(url, "_blank");
    },
    getTimestamp(timeString) {
      var date = timeString.replace(/-/g, "/");
      return new Date(date).getTime();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>