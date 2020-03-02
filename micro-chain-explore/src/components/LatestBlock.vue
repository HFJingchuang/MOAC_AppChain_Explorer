<template>
  <section class="block">
    <div class="block-header">
      <div class="block-title">
        <span class="block-span">{{this.$t("message.blockNum")}}</span>
      </div>
      <div class="block-show-more-btn" @click="showAllBlock()">
        <div class="block-show-more-content">
          <i class="iconfont el-icon-arrow-right"></i>
          {{this.$t("message.more")}}
        </div>
      </div>
    </div>
    <div class="latest-block-list" v-show="LatestBlockList.length !==0">
      <div class="latest-block-list-div">
        <li v-for="(item,index) of  LatestBlockList" :key="index">
          <div class="latest-block-list-content">
            <div class="latest-block-list-num">
              <span style="margin-right:10px;">{{hight[0]}}</span>
              {{item.number}}
            </div>
            <div>
              <span style="color:#93A3B7;margin-right:10px;">{{hight[1]}}</span>
              <span>{{item.transactions.length}}</span>
            </div>
            <div class="latest-block-hash" @click="jumpDetail(item.hash)">{{item.hash}}</div>
            <div class="latest-block-time">{{item.timestamp | formatTime}}</div>
          </div>
        </li>
      </div>
    </div>
    <div
      v-show="LatestBlockList.length === 0"
      class="v-show"
      style="background-color:#fff;margin:0 60px;border: 1px solid #C1E9F1;"
    >
      <div class="latest-block-nodata">{{this.$t("message.noData")}}</div>
    </div>
  </section>
</template>
<script>
import { getBlocksList } from "../js/request";
export default {
  name: "LatestBlock",
  data() {
    return {
      loadingBlock: false,
      LatestBlockList: [],
      interval: 0
    };
  },
  created() {
    this.getLatestBlocksList();
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
        this.interval = setInterval(this.getLatestBlocksList, 10000);
      } else {
        clearInterval(this.interval);
      }
    }
  },
  computed: {
    hight() {
      return [this.$t("message.num"), this.$t("message.txs")];
    }
  },
  methods: {
    async getLatestBlocksList() {
      if (this.loadingBlock) {
        return;
      }
      this.loadingBlock = true;
      let res = await getBlocksList(true, 0, 0);
      if (res.data.length > 0) {
        this.LatestBlockList = res.data;
      } else {
        this.LatestBlockList = [];
      }
      this.loadingBlock = false;
    },
    showAllBlock() {
      this.$router.push({ path: "block" });
    },
    jumpDetail(hash) {
      this.$router.push({ path: "blockDetail", query: { hash: hash } });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>