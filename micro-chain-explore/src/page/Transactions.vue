<template>
  <div class="container">
    <div class="transaction">
      <div class="transaction-div">
        <div class="transaction-title">
          <span>{{this.$t("message.latestTx")}}</span>
        </div>
        <div>
          <span class="mobile-display">{{this.$t("message.datetime")}}</span>
          <el-date-picker
            v-model="tradeStart"
            type="datetime"
            size="medium"
            :placeholder="$t('message.start_time')"
          ></el-date-picker>
          <el-date-picker
            v-model="tradeEnd"
            type="datetime"
            size="medium"
            :placeholder="$t('message.end_time')"
          ></el-date-picker>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="medium"
            @click="search"
          >{{this.$t("message.filter")}}</el-button>
        </div>
      </div>
      <div>
        <div class="transaction-list-data">
          <div class="table-fixed">
            <el-table
              :data="transactionList"
              :row-style="rowStyle"
              row-class-name="transaction-row-class"
              header-row-class-name="transaction-header-row-class"
              class="transaction-list-table-width"
            >
              <div slot="empty" style="font-size:18px;">
                <div
                  v-if="loading"
                  style="height:79px;width:100%"
                  v-loading="true"
                  element-loading-spinner="el-icon-loading"
                  :element-loading-text="$t('message.loading')"
                ></div>
                <div v-else class="transaction-nodata">
                  <div style=" position: relative;">
                    <i class="iconfont icon-wujiaoyijilu" style="font-size:155px;"></i>
                    <br />
                    <span
                      style="position: relative;left:-9px;"
                    >{{this.$t("message.noTransactions")}}</span>
                  </div>
                </div>
              </div>
              <el-table-column width="30px">
                <template slot-scope="scope">
                  <div style="overflow:visible;">
                    <i
                      class="iconfont"
                      :class="scope.row.matchFlag"
                      style="font-size:15px;color: #18c9dd;"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod"
                :label="$t('message.seq')"
                min-width="10%"
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
                    class="transaction-hash-span"
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
                min-width="37%"
              >
                <template slot-scope="scope">
                  <span
                    class="transaction-hash-span"
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
                  <span class="transaction-hash-span">{{scope.row.time |formatTime}}</span>
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
    </div>
    <Pagination
      :defaultPageSize="defaultPageSize"
      :total="total"
      :currentPage="currentPage"
      @changeSize="changeDefaultSize"
      @changCurrentPage="changCurrentPage"
    ></Pagination>
  </div>
</template>
<script>
import Pagination from "../components/Pagination";
import { getTransactionsList } from "../js/request";
import { formatStatus, formatShadingFlag } from "../js/utils";
export default {
  name: "Transactions",
  components: {
    Pagination
  },
  data() {
    return {
      transactionList: [],
      tradeStart: "",
      tradeStartTimestamp: 0,
      tradeEnd: "",
      tradeEndTimestamp: 0,
      loading: false,
      currentPage: 1,
      defaultPageSize: 20,
      total: 0 // 总条数
    };
  },
  created() {
    this.getLatestTransactionsList();
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getLatestTransactionsList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getTransactionsList(
        false,
        this.currentPage,
        this.defaultPageSize,
        this.tradeStartTimestamp,
        this.tradeEndTimestamp
      );
      if (res.data.length > 0) {
        this.transactionList = res.data;
        this.total = res.count;
      } else {
        this.transactionList = [];
      }
      this.loading = false;
    },
    search() {
      if (this.tradeStart) {
        this.tradeStartTimestamp = new Date(this.tradeStart)
          .getTime()
          .toString()
          .slice(0, -3);
      } else {
        this.tradeStartTimestamp = 0;
      }
      if (this.tradeEnd) {
        var endToday = new Date(this.tradeEnd)
          .getTime()
          .toString()
          .slice(0, -3);
      } else {
        this.tradeEndTimestamp = 0;
      }
      this.tradeEndTimestamp = parseInt(endToday);
      this.currentPage = 1;
      this.getLatestTransactionsList();
      this.tradeList = [];
      this.total = 0;
    },
    changeDefaultSize(size) {
      this.defaultPageSize = size;
      this.getLatestTransactionsList();
    },
    changCurrentPage(page) {
      this.currentPage = page;
      this.getLatestTransactionsList();
    },
    jumpDetail(hash) {
      let url = window.location.origin + `/#/tradeDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },
    jumpDetailByBlockNum(blockNum) {
      let url = window.location.origin + `/#/blockDetail/?blockNum=${blockNum}`;
      window.open(url, "_blank");
    },
    rowStyle({ row, rowIndex }) {
      return "height:40px";
    },
    indexMethod(index) {
      return this.defaultPageSize * (this.currentPage - 1) + index + 1;
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