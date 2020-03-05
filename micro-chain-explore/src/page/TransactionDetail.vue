<template>
  <div class="container">
    <div class="trade-detail">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('message.txDetail')" name="detail">
          <div class="trade_detail_title">
            <span class="trade_detail_title_span">
              {{this.$t("message.current_hash")}}
              <span
                style="color:#06aaf9;padding-left:10px;"
              >{{tradeDetail.transaction_hash}}</span>
              <Clipboard
                ref="clipboard"
                @click.native="copyTextToClipboard(tradeDetail.transaction_hash)"
              ></Clipboard>
            </span>
            <ul class="trade_detail_ul">
              <li>
                <span style="font-weight:600;">{{this.$t("message.blockNo")}}</span>
                <span
                  class="trade_from_address"
                  style="font-size:12px;"
                  @click="jumpBlockDetail(tradeDetail.block_number)"
                >{{tradeDetail.block_number}}</span>
              </li>
              <li>
                <span style="font-weight:600;margin-right:10px">{{this.$t("message.from")}}</span>
                <div>
                  <span
                    @click="jumpWalletDetail(tradeDetail.from)"
                    class="trade_from_address"
                  >{{tradeDetail.from}}</span>
                  <Clipboard ref="clipboard" @click.native="copyTextToClipboard(tradeDetail.from)"></Clipboard>
                </div>
              </li>
              <li>
                <span style="font-weight:600;margin-right:10px">{{this.$t("message.to")}}</span>
                <div>
                  <span
                    @click="jumpWalletDetail(tradeDetail.to)"
                    class="trade_from_address"
                  >{{tradeDetail.to}}</span>
                  <Clipboard ref="clipboard" @click.native="copyTextToClipboard(tradeDetail.to)"></Clipboard>
                </div>
              </li>
              <li>
                <span style="font-weight:600;">{{this.$t("message.date")}}</span>
                <span style="font-size:12px;">{{ tradeDetail.time | formatTime}}</span>
              </li>
              <li>
                <span style="font-weight:600;">{{this.$t("message.status")}}</span>
                <span :style="getColor(tradeDetail.status)">{{status(tradeDetail.status)}}</span>
              </li>
              <li>
                <span style="font-weight:600;">{{this.$t("message.txType")}}</span>
                <span style="font-size:12px;">{{flag(tradeDetail.sharding_flag)}}</span>
              </li>
              <li>
                <span style="font-weight:600;">{{this.$t("message.value")}}</span>
                <div>
                  <span style="font-size:12px;text-align: right;">{{tradeDetail.value}}</span>
                </div>
              </li>
              <li v-if="hasTransfer">
                <span
                  style="font-weight:600;margin-right:10px"
                >{{this.$t("message.token_transfer")}}</span>
                <div class="trade-erc20-info">
                  <div v-for="(item,index) in transfer" :key="index">
                    <span
                      @click="jumpWalletDetail(item.from)"
                      class="trade_from_address"
                    >{{item.from}}</span>
                    <Clipboard ref="clipboard" @click.native="copyTextToClipboard(item.from)"></Clipboard>
                    <span style="font-family: PingFangSC-Regular;">--></span>
                    <span @click="jumpWalletDetail(item.to)" class="trade_from_address">{{item.to}}</span>
                    <Clipboard ref="clipboard" @click.native="copyTextToClipboard(item.to)"></Clipboard>
                    <span style="font-size:12px;">{{item.value}}</span>
                    <span
                      style="font-size:12px;color: #06aaf9"
                      class="trade_from_address"
                      @click="jumpERC20Detail(item.token)"
                    >{{item.symbol}}</span>
                  </div>
                </div>
              </li>
              <li class="text-li">
                <span
                  style="font-weight:600;width: 5%;margin-right:10px"
                >{{this.$t("message.txInput")}}</span>
                <div class="text-div">
                  <el-input type="textarea" rows="4" readonly v-model="decodeInputData"></el-input>
                  <el-button
                    v-if="(tradeDetail.sharding_flag==1 || tradeDetail.sharding_flag==2) && !decodeMemo"
                    @click="decodeInput()"
                  >{{decodeMsg}}</el-button>
                </div>
              </li>
              <li class="text-li" v-if="decodeMemo">
                <span style="font-weight:600;width: 5%">{{this.$t("message.memo")}}</span>
                <div class="text-div">
                  <el-input type="textarea" rows="2" readonly v-model="decodeMemo"></el-input>
                  <el-button
                    v-if="tradeDetail.sharding_flag==1 || tradeDetail.sharding_flag==2"
                    @click="decodeInput()"
                  >{{decodeMsg}}</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('message.logs')" name="logs">
          <div class="trade-detail-logs" v-for="(item,index) in logsEvent" :key="index">
            <div class="log-index-div">{{index}}</div>
            <div class="log-data-div">
              <div class="logs-address">
                <div class="logs-name">{{contract}}</div>
                <span class="logs-topic-span">{{item.address}}</span>
              </div>
              <span class="logs-name">Topics:</span>
              <div v-for="(topic,topicIndex) in item.topics" :key="topicIndex">
                <div class="logs-topic-index">{{topicIndex}}</div>
                <span class="logs-topic-span">{{topic}}</span>
              </div>
              <div class="logs-name">Data:</div>
              <span class="logs-topic-span">0x{{item.data}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Clipboard from "../components/CopyToClipboard";
import { getTradeDetailByHash } from "../js/request";
import {
  decodeInput,
  decodeLogs,
  formatStatus,
  formatShadingFlag
} from "../js/utils";
export default {
  name: "TransactionDetail",
  components: {
    Clipboard
  },
  data() {
    return {
      tradeDetail: {},
      hash: "",
      latestdeal: [],
      loadingTrade: false,
      decodeInputData: "",
      decodeStatus: false,
      decodeMemo: "",
      copyText: "",
      transfer: [],
      logsEvent: [],
      activeName: "detail"
    };
  },
  computed: {
    hasTransfer() {
      if (this.transfer && this.transfer.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    contract() {
      return this.$t("message.contract_address");
    },
    decodeMsg() {
      if (!this.decodeStatus) {
        return this.$t("message.DecodeInput");
      } else {
        return this.$t("message.EncodeInput");
      }
    }
  },
  created() {
    this.hash = this.$route.query.hash;
    this.getTradeDetail(this.hash);
  },
  methods: {
    status(status) {
      return this.$t(formatStatus(status));
    },
    flag(flag) {
      return this.$t(formatShadingFlag(flag));
    },
    async getTradeDetail(hash) {
      let res = await getTradeDetailByHash(hash);
      this.tradeDetail = res;
      this.decodeInputData = this.tradeDetail.input;
      if (res.logs_length > 0) {
        this.transfer = await decodeLogs(res.logs);
      }
      this.logsEvent = res.logs;
    },
    copyTextToClipboard(text) {
      if (Array.isArray(this.$refs.clipboard)) {
        this.$refs.clipboard[0].copyToClipboard(text);
      } else {
        this.$refs.clipboard.copyToClipboard(text);
      }
    },
    jumpBlockDetail(block) {
      let url = window.location.origin + `/#/blockDetail/?blockNum=${block}`;
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
    jumpERC20Detail(token) {
      let url = window.location.origin + `/#/ERC20Detail/?token=${token}`;
      window.open(url, "_blank");
    },
    async decodeInput() {
      if (!this.decodeStatus) {
        this.decodeStatus = true;
        let decode = await decodeInput(
          this.tradeDetail.input,
          this.tradeDetail.to,
          this.tradeDetail.sharding_flag,
          this
        );
        if (!decode || !decode.decode) {
          this.decodeInputData = this.tradeDetail.input;
        } else {
          this.decodeInputData = decode.decode;
          this.decodeMemo = decode.memo;
        }
      } else {
        this.decodeStatus = false;
        this.decodeMemo = "";
        this.decodeInputData = this.tradeDetail.input;
      }
    },
    getColor(status) {
      if (status) {
        return "font-size:12px; color: #06aaf9";
      } else {
        return "font-size:12px; color: red";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>