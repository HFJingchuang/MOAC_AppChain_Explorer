<template>
  <div class="copy-to-clipboard">
    <i class="el-icon-document-copy"></i>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  name: "BlockDetail",
  data() {
    return { clipboard: null };
  },
  destroyed() {
    this.clipboard.destroy();
  },
  methods: {
    copyToClipboard(copyText) {
      if (this.clipboard && JSON.stringify(this.clipboard.text()) !== "{}") {
        this.clipboard.destroy();
      }
      var _this = this;
      this.clipboard = new Clipboard(".el-icon-document-copy", {
        text: () => {
          return copyText;
        }
      });
      this.clipboard.on("success", function(e) {
        _this.$message({
          message: _this.$t("message.copy_success"),
          type: "success"
        });
        e.clearSelection();
      });
      this.clipboard.on("error", function(e) {
        _this.$message({
          message: _this.$t("message.copy_fail"),
          type: "error"
        });
        e.clearSelection();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.copy-to-clipboard {
  i {
    color: #3e3f45;
  }
  i:hover {
    color: #06aaf9;
  }
}
</style>