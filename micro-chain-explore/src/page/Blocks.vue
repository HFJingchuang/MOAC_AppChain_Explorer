<template>
  <div class="container">
    <div class="blocks">
      <div class="block-div">
        <div class="block-title">
          <span>{{this.$t("message.blockNum")}}</span>
        </div>
        <div>
          <span class="mobile-display">{{this.$t("message.datetime")}}</span>
          <el-date-picker
            v-model="blockStart"
            type="datetime"
            size="medium"
            :placeholder="$t('message.start_time')"
          ></el-date-picker>
          <el-date-picker
            v-model="blockEnd"
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
        <div class="bock-list-data">
          <div class="table-fixed">
            <el-table
              :data="blocksList"
              row-class-name="block-row-class"
              header-row-class-name="block-header-row-class"
              class="block-list-table-width"
            >
              <div slot="empty" style="font-size:18px;">
                <div
                  v-if="loading"
                  style="height:79px;width:100%"
                  v-loading="true"
                  element-loading-spinner="el-icon-loading"
                  :element-loading-text="$t('message.loading')"
                ></div>
                <div v-else style="margin:0px;font-size:14px;font-weight:400;color:#BBC7CE;">
                  <div style=" position: relative;">
                    <span
                      style="position: relative;left:-9px;"
                    >{{this.$t("message.noTransactions")}}</span>
                  </div>
                </div>
              </div>
              <el-table-column width="30px"></el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod"
                :label="$t('message.seq')"
                min-width="15%"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                prop="block_number"
                :label="$t('message.blockNo')"
                min-width="10%"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <span
                    class="hash-span"
                    @click="jumpDetailByBlockNum(scope.row.number)"
                  >{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hash"
                :label="$t('message.blockHash')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="35%"
              >
                <template slot-scope="scope">
                  <span
                    class="block-hash-span"
                    @click="jumpDetail(scope.row.hash)"
                  >{{scope.row.hash}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hash"
                :label="$t('message.miner')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="35%"
              >
                <template slot-scope="scope">
                  <span class="block-hash-span">{{scope.row.miner}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="timestamp"
                :label="$t('message.date')"
                min-width="15%"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <span class="hash-span">{{scope.row.timestamp | formatTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactions_num"
                min-width="5%"
                :label="$t('message.txs')"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <span class="block-num-span">{{scope.row.transactions.length}}</span>
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
import { getBlocksList } from "../js/request";
export default {
  name: "Blocks",
  components: {
    Pagination
  },
  data() {
    return {
      blocksList: [],
      blockStart: "",
      blockEnd: "",
      blockStartTimestamp: 0,
      blockEndTimestamp: 0,
      loading: false,
      currentPage: 1, // 当前页
      defaultPageSize: 20, // 每页展示条数
      total: 0 // 总条数
    };
  },
  created() {
    this.getBlockList();
  },
  methods: {
    async getBlockList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getBlocksList(
        false,
        this.currentPage,
        this.defaultPageSize,
        this.blockStartTimestamp,
        this.blockEndTimestamp
      );
      if (res.data.length > 0) {
        this.blocksList = res.data;
        this.total = res.count;
      } else {
        this.blocksList = [];
      }
      this.loading = false;
    },
    search() {
      if (this.blockStart) {
        this.blockStartTimestamp = new Date(this.blockStart)
          .getTime()
          .toString()
          .slice(0, -3);
      } else {
        this.blockStartTimestamp = 0;
      }
      if (this.blockEnd) {
        var endToday = new Date(this.blockEnd)
          .getTime()
          .toString()
          .slice(0, -3);
      } else {
        this.blockEndTimestamp = 0;
      }
      this.blockEndTimestamp = parseInt(endToday);
      this.currentPage = 1;
      this.getBlockList();
      this.blockList = [];
      this.total = 0;
    },
    changeDefaultSize(size) {
      this.defaultPageSize = size;
      this.getBlockList();
    },
    changCurrentPage(page) {
      this.currentPage = page;
      this.getBlockList();
    },
    jumpDetail(hash) {
      let url = window.location.origin + `/#/blockDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },
    jumpDetailByBlockNum(blockNum) {
      let url = window.location.origin + `/#/blockDetail/?blockNum=${blockNum}`;
      window.open(url, "_blank");
    },
    indexMethod(index) {
      return this.defaultPageSize * (this.currentPage - 1) + index + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>