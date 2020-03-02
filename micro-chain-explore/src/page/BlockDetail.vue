<template>
  <div class="container">
    <div class="block-detail">
      <div class="block-detail-title">
        <span class="block-detail-title-span">
          {{this.$t("message.current_block")}}
          <span
            style="color:#06aaf9;padding-left:10px;"
          >{{this.blockData.number}}</span>
        </span>
        <span class="block-detail-title-span">
          {{this.$t("message.block_hash")}}
          <span
            style="padding-left:10px;text-align:right;"
          >{{blockData.hash}}</span>
          <Clipboard ref="copy" @click.native="copyTextToClipboard(blockData.hash)"></Clipboard>
        </span>
        <ul class="block-detail-ul">
          <li>
            <span style="font-weight:600;">{{this.$t("message.date")}}</span>
            <span style="font-size:12px;">{{blockData.timestamp | formatTime}}</span>
          </li>
          <li>
            <span style="font-weight:600;">{{this.$t("message.txs")}}</span>
            <span style="font-size:12px;">{{getLength(blockData.transactions)}}</span>
          </li>
          <li>
            <span style="font-weight:600;margin-right:10px">{{this.$t("message.pre_block_hash")}}</span>
            <div>
              <span
                @click="jumpBlockDetail(blockData.parent_hash)"
                class="block-detail-parent-hash"
              >{{blockData.parent_hash}}</span>
              <Clipboard ref="copy" @click.native="copyTextToClipboard(blockData.parent_hash)"></Clipboard>
            </div>
          </li>
        </ul>
      </div>

      <div class="block-detail-list">
        <div>
          <div class="block-detail-list-top">{{this.$t("message.transactions")}}</div>
          <div class="table-fixed">
            <el-table
              :data="tradeList"
              :row-style="rowStyle"
              header-row-class-name="homeHeaderRowclass"
              class="block-detail-list-table-width"
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
                :index="indexMethod"
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
                min-width="35%"
              >
                <template slot-scope="scope">
                  <span
                    class="block-detail-hash"
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
                min-width="28%"
              >
                <template slot-scope="scope">
                  <span
                    class="block-detail-hash"
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
                min-width="28%"
              >
                <template slot-scope="scope">
                  <span
                    class="block-detail-hash"
                    @click="jumpWalletDetail(scope.row.to)"
                  >{{scope.row.to}}</span>
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
                :label="$t('message.tx_type')"
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
import { getBlockDetailByHash, getBlockDetailByBlockNum } from "../js/request";
import { formatStatus, formatShadingFlag } from "../js/utils";
export default {
  name: "BlockDetail",
  components: {
    Pagination,
    Clipboard
  },
  data() {
    return {
      hash: "",
      blockNum: "",
      blockData: {},
      tradeList: [],
      currentPage: 1,
      defaultPageSize: 20,
      total: 0, // 总条数
      loadingTrade: false
    };
  },
  created() {
    this.hash = this.$route.query.hash;
    if (this.hash) {
      this.getBlockDetail();
    } else {
      this.blockNum = this.$route.query.blockNum;
      this.getBlockDetailByNum();
    }
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getBlockDetail() {
      let res = await getBlockDetailByHash(
        this.hash,
        this.currentPage,
        this.defaultPageSize
      );
      this.blockData = res.detail;
      this.tradeList = res.tradeList;
      this.total = res.count;
    },
    async getBlockDetailByNum() {
      let res = await getBlockDetailByBlockNum(
        this.blockNum,
        this.currentPage,
        this.defaultPageSize
      );
      this.blockData = res.detail;
      this.tradeList = res.tradeList;
      this.total = res.count;
    },
    copyTextToClipboard(text) {
      this.$refs.copy.copyToClipboard(text);
    },
    clearGopage() {
      this.gopage = "";
    },
    async changeDefaultSize(size) {
      this.defaultPageSize = size;
      if (this.hash && this.hash !== "") {
        this.getBlockDetail();
      } else {
        this.getBlockDetailByNum();
      }
    },
    async changCurrentPage(page) {
      this.currentPage = page;
      if (this.hash && this.hash !== "") {
        this.getBlockDetail();
      } else {
        this.getBlockDetailByNum();
      }
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "background:#EDF5FA;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
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
    getColor(status) {
      if (status) {
        return "color: #06aaf9";
      } else {
        return "color: red";
      }
    },
    getLength(trans) {
      if (trans) {
        return trans.length;
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