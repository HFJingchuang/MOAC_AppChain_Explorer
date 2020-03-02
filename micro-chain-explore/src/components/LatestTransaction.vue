<template>
  <section class="block">
    <div class="latest-trade">
      <div class="latest-trade-header">
        <div class="latest-trade-div">
          <span class="latest-trade-title">{{this.$t("message.latestTx")}}</span>
        </div>
        <div class="show-more-trade" @click="showAllTransaction('trade')">
          <div class="show-more-trade-title">
            <i class="iconfont el-icon-arrow-right"></i>
            {{this.$t("message.more")}}
          </div>
        </div>
      </div>
      <div class="latest-trade-table">
        <div class="table-fixed">
          <el-table
            :data="latestTransactionList"
            :row-style="rowStyle"
            header-row-class-name="homeHeaderRowclass"
            class="latest-trade-table-width"
          >
            <ul slot="empty" style="background-color:#fff;margin:0 60px;">
              <div class="latest-trade-nodata">
                <i class="iconfont icon-zanwushuju1"></i>
                {{this.$t("message.noData")}}
              </div>
            </ul>
            <el-table-column width="30px"></el-table-column>
            <el-table-column
              type="index"
              :label="$t('message.seq')"
              min-width="8%"
              align="left"
              header-align="left"
            ></el-table-column>
            <el-table-column
              prop="blcok"
              :label="$t('message.blockNo')"
              id="ellipsis"
              align="center"
              header-align="center"
              min-width="10%"
            >
              <template slot-scope="scope">
                <span
                  class="latest-trade-hash"
                  @click="jumpDetailByBlockNum(scope.row.block_number)"
                >{{scope.row.block_number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="hash"
              :label="$t('message.txHash')"
              id="ellipsis"
              align="center"
              header-align="center"
              min-width="40%"
            >
              <template slot-scope="scope">
                <span
                  class="latest-trade-hash"
                  @click="jumpDetail(scope.row.transaction_hash)"
                >{{scope.row.transaction_hash}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="trade_type"
              :label="$t('message.status')"
              id="ellipsis"
              align="center"
              header-align="center"
              min-width="10%"
            >
              <template slot-scope="scope">
                <span :style="getColor(scope.row.status)">{{status(scope.row.status)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="trade_type"
              :label="$t('message.txTime')"
              id="ellipsis"
              align="center"
              header-align="center"
              min-width="10%"
            >
              <template slot-scope="scope">
                <span class="transaction-hash-span">{{scope.row.time | formatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="trade_type"
              :label="$t('message.txType')"
              id="ellipsis"
              align="right"
              header-align="right"
              min-width="10%"
            >
              <template slot-scope="scope">
                <span style="font-size:12px;">{{flag(scope.row.sharding_flag)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="30px"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getTransactionsList } from "../js/request";
import { formatStatus, formatShadingFlag } from "../js/utils";
export default {
  name: "LatestTransaction",
  data() {
    return {
      loadingTransaction: false,
      latestTransactionList: [],
      interval: 0
    };
  },
  created() {
    this.getLatestTransactionsList();
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
        this.interval = setInterval(this.getLatestTransactionsList, 10000);
      } else {
        clearInterval(this.interval);
      }
    }
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getLatestTransactionsList() {
      if (this.loadingTransaction) {
        return;
      }
      this.loadingTransaction = true;
      let res = await getTransactionsList(true, 0, 0);
      if (res.data.length > 0) {
        this.latestTransactionList = res.data;
      } else {
        this.latestTransactionList = [];
      }
      this.loadingTransaction = false;
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
    getColor(status) {
      if (status) {
        return "color: #06aaf9";
      } else {
        return "color: red";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>