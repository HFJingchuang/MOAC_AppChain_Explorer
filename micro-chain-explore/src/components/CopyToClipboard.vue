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
    return {};
  },
  methods: {
    copyToClipboard(copyText) {
      var clipboard = new Clipboard(".el-icon-document-copy", {
        text: () => {
          return copyText;
        }
      });
      clipboard.on("success", function(e) {
        e.clearSelection();
      });
      this.$message({
        message: this.$t("message.copy"),
        type: "success"
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