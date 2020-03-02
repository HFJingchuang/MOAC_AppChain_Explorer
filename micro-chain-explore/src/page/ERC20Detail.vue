<template>
  <div class="container">
    <div class="erc20-detail">
      <div class="erc20-detail-title">
        <ul class="erc20-detail-header">
          <li>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenName")}}</span>
              <span style="font-size:14px;float:right;">{{ERC20Data.name}}</span>
            </div>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenSymbol")}}</span>
              <span style="font-size:14px;float:right;">{{ERC20Data.symbol}}</span>
            </div>
          </li>
          <li>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenSupply")}}</span>
              <span style="font-size:14px;float:right;">{{ERC20Data.totalSupply}}</span>
            </div>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenDecimals")}}</span>
              <span style="font-size:14px;float:right;">{{ERC20Data.decimals}}</span>
            </div>
          </li>
          <li>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenAddress")}}</span>
              <div style="font-size:14px;float:right;">
                <span>{{ERC20Data.erc20}}</span>
                <Clipboard ref="copy" @click.native="copyTextToClipboard(ERC20Data.erc20)"></Clipboard>
              </div>
            </div>
            <div class="erc20-token-detail">
              <span style="font-weight:600;">{{this.$t("message.tokenDeployer")}}</span>
              <div style="font-size:14px;float:right;">
                <span>{{ERC20Data.deployer}}</span>
                <Clipboard ref="copy" @click.native="copyTextToClipboard(ERC20Data.deployer)"></Clipboard>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('message.transactions')" name="trade">
          <div class="erc20-detail-list table-fixed">
            <el-table
              :data="tradeList"
              :row-style="rowStyle"
              header-row-class-name="homeHeaderRowclass"
              class="erc20-table-width"
            >
              <ul slot="empty" style="background-color:#fff;margin:0 60px;">
                <div
                  v-if="loadingTrade"
                  style="height:100px;width:100%"
                  v-loading="true"
                  element-loading-spinner="el-icon-loading"
                  :element-loading-text="$t('message.loading')"
                ></div>
                <div class="noDataHome" v-else>{{this.$t("message.noData")}}</div>
              </ul>
              <el-table-column width="30px"></el-table-column>
              <el-table-column
                type="index"
                :label="$t('message.seq')"
                min-width="5%"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                prop="hash"
                :label="$t('message.txHash')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="30%"
              >
                <template slot-scope="scope">
                  <span
                    class="erc20-detail-hash"
                    @click="jumpTradeDetail(scope.row.transaction_hash)"
                  >{{scope.row.transaction_hash}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="from"
                :label="$t('message.from')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="25%"
              >
                <template slot-scope="scope">
                  <span
                    class="erc20-detail-hash"
                    @click="jumpWalletDetail(scope.row.from)"
                  >{{scope.row.from}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="to"
                :label="$t('message.to')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="25%"
              >
                <template slot-scope="scope">
                  <span
                    class="erc20-detail-hash"
                    @click="jumpWalletDetail(scope.row.to)"
                  >{{scope.row.to}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="time"
                :label="$t('message.date')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="15%"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.time | formatTime}}</span>
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
                :label="$t('message.txType')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="10%"
              >
                <template slot-scope="scope">
                  <span style="font-size:12px;">{{ status(scope.row.sharding_flag)}}</span>
                </template>
              </el-table-column>
              <el-table-column width="30px"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('message.tokenHold')" name="holder">
          <div class="erc20-holder-list table-fixed">
            <el-table
              :data="holderList"
              :row-style="rowStyle"
              header-row-class-name="homeHeaderRowclass"
              class="erc20detail-table-width"
            >
              <ul slot="empty" style="background-color:#fff;margin:0 60px;">
                <div
                  v-if="loadingHolder"
                  style="height:100px;width:100%"
                  v-loading="true"
                  element-loading-spinner="el-icon-loading"
                  element-loading-text="加载中"
                ></div>
                <div class="noDataHome" v-else>{{this.$t("message.noData")}}</div>
              </ul>
              <el-table-column width="30px"></el-table-column>
              <el-table-column
                type="index"
                :label="$t('message.seq')"
                width="60px"
                align="center"
                header-align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                :label="$t('message.txHash')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="35%"
              >
                <template slot-scope="scope">
                  <span
                    class="erc20-detail-hash"
                    @click="jumpWalletDetail(scope.row.address)"
                  >{{scope.row.address}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="balance"
                :label="$t('message.hold_value')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="20%"
              >
                <template slot-scope="scope">
                  <span style="font-size:12px;">{{scope.row.balance}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="balance"
                :label="$t('message.percentage')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="20%"
              >
                <template slot-scope="scope">
                  <span style="font-size:12px;">{{getPercentage(scope.row.balance)}}</span>
                </template>
              </el-table-column>
              <el-table-column width="30px"></el-table-column>
            </el-table>
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
import {
  getERC20DetailByAddress,
  getERC20TradeList,
  getERC20HolderList
} from "../js/request";
import {
  calculatePercentage,
  getTotalSupply,
  formatStatus,
  formatShadingFlag
} from "../js/utils";
export default {
  name: "ERC20Detail",
  components: {
    Pagination,
    Clipboard
  },
  data() {
    return {
      tokenAddress: "",
      ERC20Data: {},
      activeName: "trade",
      tradeList: [], // 交易列表
      loadingTrade: false,
      holderList: [], // 持有人list
      loadingHolder: false,
      currentPage: 1,
      defaultPageSize: 20,
      total: 0 // 总条数
    };
  },
  created() {
    this.tokenAddress = this.$route.query.token;
    this.getERC20Detail();
    this.getTradeList();
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getERC20Detail() {
      let res = await getERC20DetailByAddress(this.tokenAddress);
      if (res.data) {
        this.ERC20Data = res.data;
      } else {
        this.ERC20Data = {};
      }
      let totalSupply = await getTotalSupply(
        this.ERC20Data.erc20,
        this.ERC20Data.decimals
      );
      if (totalSupply) {
        this.ERC20Data.totalSupply = totalSupply;
      }
    },
    async getTradeList() {
      let res = await getERC20TradeList(
        this.currentPage,
        this.defaultPageSize,
        this.tokenAddress
      );
      if (res.data.length > 0) {
        this.total = res.count;
        this.tradeList = res.data;
      } else {
        this.total = 0;
        this.tradeList = [];
      }
    },
    async getHolderList() {
      let res = await getERC20HolderList(
        this.currentPage,
        this.defaultPageSize,
        this.tokenAddress
      );
      if (res.data.length > 0) {
        this.total = res.count;
        this.holderList = res.data;
      } else {
        this.total = 0;
        this.holderList = [];
      }
    },
    handleClick(tab, event) {
      this.currentPage = 1;
      this.defaultPageSize = 20;
      this.total = 0;
      if (tab.name === "trade") {
        this.holderList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getHolderList();
      }
    },
    changeDefaultSize(size) {
      this.defaultPageSize = size;
      if (this.activeName === "trade") {
        this.holderList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getHolderList();
      }
    },
    changCurrentPage(page) {
      this.currentPage = page;
      if (this.activeName === "trade") {
        this.holderList = [];
        this.getTradeList();
      } else {
        this.tradeList = [];
        this.getHolderList();
      }
    },
    jumpBlockDetail(hash) {
      let url = window.location.origin + `/#/blockDetail/?hash=${hash}`;
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
    copyTextToClipboard(text) {
      this.$refs.copy.copyToClipboard(text);
    },
    getPercentage(quantity) {
      return calculatePercentage(quantity, this.ERC20Data.totalSupply);
    },
    getColor(status) {
      if (status) {
        return "color: #06aaf9";
      } else {
        return "color: red";
      }
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "background:#EDF5FA;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
      }
    },
    indexMethod(index) {
      return this.defaultPageSize * (this.currentPage - 1) + index + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>