<template>
  <section>
    <div class="micro-chain">
      <ul class="micro-chain-div">
        <li>
          <!-- <div class="micro-chain-li-div">
          <el-tooltip
            class="item"
            effect="light"
            content="部署应用链时需要消耗母链的原生moac，提供这些moac的帐号即成为应用链部署者。"
            placement="top"
          >
            <img src="../../static/image/help.svg" width="16px" height="16px" />
          </el-tooltip>
          <span>部署者地址：</span>
          <span>{{microChainInfo.owner}}</span>
          </div>-->
          <div class="micro-chain-li-div">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.gas_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="16px" height="16px" />
            </el-tooltip>
            <span>{{this.$t("message.gas")}}</span>
            <span>{{totalOperation}} mc</span>
          </div>
          <div class="micro-chain-li-div1">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.status_tip')"
              placement="top"
            >
              <img :src="getStatus" width="20px" height="20px" />
            </el-tooltip>
          </div>
        </li>
        <li>
          <div class="micro-chain-li-div">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.bondLimit_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="16px" height="16px" />
            </el-tooltip>
            <span>{{this.$t("message.bondLimit")}}</span>
            <span>{{microChainInfo.BondLimit}} mc</span>
          </div>
          <div class="micro-chain-li-div">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.blockReward_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="16px" height="16px" />
            </el-tooltip>
            <span>{{this.$t("message.blockReward")}}</span>
            <span>{{microChainInfo.BlockReward}} mc</span>
          </div>
        </li>
        <li>
          <div class="micro-chain-li-div">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.txReward_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="16px" height="16px" />
            </el-tooltip>
            <span>{{this.$t("message.txReward")}}</span>
            <span>{{microChainInfo.TxReward}} mc</span>
          </div>
          <div class="micro-chain-li-div">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.viaReward_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="16px" height="16px" />
            </el-tooltip>
            <span>{{this.$t("message.viaReward")}}</span>
            <span>{{microChainInfo.ViaReward}} mc</span>
          </div>
        </li>
        <li>
          <div class="micro-chain-li-scs">
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('message.scs_tip')"
              placement="top"
            >
              <img src="../../static/image/help.svg" width="14px" height="14px" />
            </el-tooltip>
            <span>{{this.$t("message.scs_title")}}</span>
            <el-select v-model="scsValue" :placeholder="$t('message.scs')" size="small">
              <el-option v-for="item in SCSList" :key="item" :value="item"></el-option>
            </el-select>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { getMicroChainInfo } from "../js/request";
import { getTotalOperation, getFlushStatus } from "../js/utils";
export default {
  name: "MicroChainInfo",
  data() {
    return {
      microChainInfo: {},
      SCSList: [],
      scsValue: "",
      interval: 0,
      status: false,
      totalOperation: 0
    };
  },
  created() {
    this.getChainIfo();
  },
  props: {
    liveUpdate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getStatus() {
      if (this.status) {
        return "../../static/image/status-true.svg";
      } else {
        return "../../static/image/status-false.svg";
      }
    }
  },
  watch: {
    liveUpdate() {
      if (this.liveUpdate) {
        this.interval = setInterval(this.getChainIfo, 10000);
      } else {
        clearInterval(this.interval);
      }
    }
  },
  methods: {
    async getChainIfo() {
      let res = await getMicroChainInfo();
      this.microChainInfo = res;
      this.SCSList = this.microChainInfo.scsList;
      this.scsValue = this.SCSList[0];
      this.totalOperation = await getTotalOperation();
      this.status = await getFlushStatus();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>