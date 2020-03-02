<template>
  <div class="container">
    <div class="erc20s">
      <div class="erc20-div">
        <div class="erc20-title">
          <span>{{this.$t("message.ERC")}}</span>
        </div>
        <div class="erc20-search">
          <el-input
            v-model="searchText"
            size="medium"
            :placeholder="$t('message.search_token')"
            clearable
          ></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="search"></el-button>
        </div>
      </div>
      <div>
        <div class="bock-list-data">
          <div class="table-fixed">
            <el-table
              :data="ERC20List"
              row-class-name="erc20-row-class"
              header-row-class-name="erc20-header-row-class"
              class="erc20-table-width"
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
                prop="erc20_number"
                :label="$t('message.token_name')"
                min-width="20%"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <span
                    class="hash-span"
                    @click="jumpDetailByERC20(scope.row.erc20)"
                  >{{scope.row.name}}({{scope.row.symbol}})</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hash"
                :label="$t('message.token_address')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="35%"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.erc20}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hash"
                :label="$t('message.token_deployer')"
                id="ellipsis"
                align="center"
                header-align="center"
                min-width="30%"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.deployer}}</span>
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
import { getERC20List } from "../js/request";
export default {
  name: "ERC20",
  components: {
    Pagination
  },
  data() {
    return {
      ERC20List: [],
      searchText: "", // 搜索框内容
      loading: false,
      currentPage: 1, // 当前页
      defaultPageSize: 20, // 每页展示条数
      total: 0 // 总条数
    };
  },
  created() {
    this.getERC20();
  },
  methods: {
    async getERC20() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getERC20List(
        this.currentPage,
        this.defaultPageSize,
        this.searchText
      );
      if (res.data.length > 0) {
        this.ERC20List = res.data;
        this.total = res.count;
      } else {
        this.ERC20List = [];
      }
      this.loading = false;
    },
    search() {
      this.total = 0;
      this.currentPage = 1;
      this.defaultPageSize = 20;
      this.getERC20();
    },
    jumpDetailByERC20(address) {
      let url = window.location.origin + `/#/ERC20Detail/?token=${address}`;
      window.open(url, "_blank");
    },
    changeDefaultSize(size) {
      this.defaultPageSize = size;
      this.getERC20();
    },
    changCurrentPage(page) {
      this.currentPage = page;
      this.getERC20();
    },
    indexMethod(index) {
      return this.defaultPageSize * (this.currentPage - 1) + index + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>