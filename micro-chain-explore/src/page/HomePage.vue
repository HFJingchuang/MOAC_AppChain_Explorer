<template>
  <div id="home-page">
    <div class="home-header">
      <div class="live-update-switch">
        <span>{{this.$t("message.live")}}</span>
        <el-switch v-model="liveUpdate" active-color="#3498db" inactive-color="#dcdfe6"></el-switch>
      </div>
    </div>
    <MicroChainInfo :liveUpdate="liveUpdate"></MicroChainInfo>
    <TransactionCurve :liveUpdate="liveUpdate"></TransactionCurve>
    <LatestBlock :liveUpdate="liveUpdate"></LatestBlock>
    <LatestTransaction :liveUpdate="liveUpdate"></LatestTransaction>
  </div>
</template>
<script>
import MicroChainInfo from "../components/MicroChainInfo";
import LatestBlock from "../components/LatestBlock.vue";
import LatestTransaction from "../components/LatestTransaction.vue";
import TransactionCurve from "../components/TransactionCurve.vue";
export default {
  name: "HomePage",
  components: {
    MicroChainInfo,
    LatestBlock,
    LatestTransaction,
    TransactionCurve
  },
  data() {
    return {
      liveUpdate: false
    };
  }
};
</script>
<style  lang="scss" scoped>
</style>