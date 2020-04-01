<template>
  <div class="container">
    <div class="wallet-detail">
      <div class="wallet-detail-header">
        <span class="wallet-detail-header_span">
          {{this.$t("message.wallet_address")}}
          <span
            style="color:#06aaf9;padding-left:10px;"
          >{{address}}</span>
          <Clipboard class="wallet-clipboard" ref="copy" @click.native="copyTextToClipboard"></Clipboard>
        </span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('message.assets')" name="asset">
          <div class="table-fixed">
            <el-table
              :data="assetList"
              :row-style="rowStyle"
              header-row-class-name="homeHeaderRowclass"
              class="wallet-table-width"
            >
              <ul slot="empty" style="background-color:#fff;margin:0 60px;">
                <div
                  v-if="loadingAsset"
                  style="height:100px;width:100%"
                  v-loading="true"
                  element-loading-spinner="el-icon-loading"
                ></div>
                <div class="noDataHome" v-else>{{this.$t("message.noData")}}</div>
              </ul>
              <el-table-column width="30px"></el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod"
                :label="$t('message.seq')"
                min-width="10%"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                prop="ERC20.name"
                :label="$t('message.token_name')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="15%"
              ></el-table-column>
              <el-table-column
                prop="ERC20.symbol"
                :label="$t('message.token_symbol')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="15%"
              ></el-table-column>
              <el-table-column
                prop="token"
                :label="$t('message.token_address')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="25%"
              >
                <template slot-scope="scope">
                  <span
                    class="wallet-detail-click-span"
                    @click="jumpTokenDetail(scope.row.token)"
                  >{{scope.row.token}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="balance"
                :label="$t('message.hold_value')"
                min-width="10%"
                align="center"
                header-align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('message.transactions')" name="trade">
          <div>
            <div class="trade-list-search">
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
              <span class="mobile-display">{{this.$t("message.txTo")}}</span>
              <el-input v-model="tradePartner" size="medium" :placeholder="$t('message.input_to')"></el-input>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="medium"
                @click="search"
              >{{this.$t("message.filter")}}</el-button>
            </div>
            <div class="table-fixed">
              <el-table
                :data="tradeList"
                :row-style="rowStyle"
                header-row-class-name="homeHeaderRowclass"
                class="wallet-table-width"
              >
                <ul slot="empty" style="background-color:#fff;margin:0 60px;">
                  <div
                    v-if="loadingTrade"
                    style="height:100px;width:100%"
                    v-loading="true"
                    element-loading-spinner="el-icon-loading"
                  ></div>
                  <div class="noDataHome" v-else>{{this.$t("message.noData")}}</div>
                </ul>
                <el-table-column width="30px"></el-table-column>
                <el-table-column
                  type="index"
                  :index="indexMethod"
                  :label="$t('message.seq')"
                  min-width="10%"
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
                      class="wallet-detail-click-span"
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
                  min-width="25%"
                >
                  <template slot-scope="scope">
                    <span
                      class="wallet-detail-click-span"
                      @click="jumpTradeDetail(scope.row.transaction_hash)"
                    >{{scope.row.transaction_hash}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="from"
                  :label="$t('message.from')"
                  id="ellipsis"
                  align="center"
                  min-width="20%"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span
                      class="wallet-detail-click-span"
                      @click="jumpWalletDetail(scope.row.from)"
                    >{{scope.row.from}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="to"
                  :label="$t('message.to')"
                  id="ellipsis"
                  align="center"
                  min-width="20%"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span
                      class="wallet-detail-click-span"
                      @click="jumpWalletDetail(scope.row.to)"
                    >{{scope.row.to}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="time"
                  :label="$t('message.txTime')"
                  min-width="10%"
                  align="center"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span class="wallet-detail-click-span">{{scope.row.time | formatTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trade_type"
                  :label="$t('message.status')"
                  id="ellipsis"
                  align="center"
                  header-align="center"
                  min-width="4%"
                >
                  <template slot-scope="scope">
                    <span :style="getColor(scope.row.status)">{{status(scope.row.status)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trade_type"
                  :label="$t('message.txType')"
                  id="ellipsis"
                  align="right"
                  header-align="right"
                  min-width="8%"
                >
                  <template slot-scope="scope">
                    <span style="font-size:12px;">{{flag(scope.row.sharding_flag)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <Pagination
        :defaultPageSize="defaultPageSize"
        :total="total"
        :currentPage="currentPage"
        @changeSize="changeDefaultSize"
        @changCurrentPage="changCurrentPage"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import Clipboard from "../components/CopyToClipboard";
import Pagination from "../components/Pagination";
import { getTradeListByAddress, getAssetListByAddress } from "../js/request";
import { formatStatus, formatShadingFlag, chain3 } from "../js/utils";
export default {
  name: "WalletDetail",
  components: {
    Pagination,
    Clipboard
  },
  data() {
    return {
      address: "",
      activeName: "asset",
      tradeList: [],
      loadingTrade: false,
      tradeStart: "", // 交易时间
      tradeStartTimestamp: 0, // 交易时间戳
      tradeEnd: "", // 交易时间
      tradeEndTimestamp: 0, // 交易时间戳
      tradePartner: "", // 交易对家
      assetList: [],
      loadingAsset: false,
      currentPage: 1, // 当前页
      defaultPageSize: 20, // 每页展示条数
      total: 0 // 总条数
    };
  },
  created() {
    this.address = this.$route.query.address;
    this.getAssetsList();
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getTradeList() {
      let res = await getTradeListByAddress(
        this.address,
        this.tradePartner,
        this.tradeStartTimestamp,
        this.tradeEndTimestamp,
        this.currentPage,
        this.defaultPageSize
      );
      if (res.trade.length > 0) {
        this.tradeList = res.trade;
        this.total = res.count;
      } else {
        this.tradeList = [];
        this.total = 0;
      }
    },
    async getAssetsList() {
      let res = await getAssetListByAddress(
        this.address,
        this.currentPage,
        this.defaultPageSize
      );
      if (res.data.length > 0) {
        this.assetList = res.data;
        this.total = res.count;
      } else {
        this.assetList = [];
        this.total = 0;
      }
    },
    handleClick(tab, event) {
      this.currentPage = 1;
      this.defaultPageSize = 20;
      this.total = 0;
      if (tab.name === "trade") {
        this.assetsList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getAssetsList();
      }
    },
    copyTextToClipboard() {
      this.$refs.copy.copyToClipboard(this.address);
    },
    search() {
      if (this.tradePartner === this.address) {
        this.$message.error("请输入交易对家地址");
        return;
      }
      if (this.tradePartner) {
        let isAddress = chain3.isAddress(this.tradePartner);
        if (!isAddress) {
          this.$message.error("请输入正确的地址/哈希");
          return;
        }
      }
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
      this.getTradeList();
      this.tradeList = [];
      this.total = 0;
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "background:#EDF5FA;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
      }
    },
    jumpTokenDetail(address) {
      let url = window.location.origin + `/#/ERC20Detail/?token=${address}`;
      window.open(url, "_blank");
    },
    jumpTradeDetail(hash) {
      let url = window.location.origin + `/#/tradeDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },
    jumpWalletDetail(address) {
      let url = window.location.origin + `/#/walletDetail/?address=${address}`;
      window.open(url, "_blank");
    },
    jumpDetailByBlockNum(blockNum) {
      let url = window.location.origin + `/#/blockDetail/?blockNum=${blockNum}`;
      window.open(url, "_blank");
    },
    async changeDefaultSize(size) {
      this.defaultPageSize = size;
      if (this.activeName === "trade") {
        this.assetsList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getAssetsList();
      }
    },
    async changCurrentPage(page) {
      this.currentPage = page;
      if (this.activeName === "trade") {
        this.assetsList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getAssetsList();
      }
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