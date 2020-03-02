<template>
  <div id="header">
    <div @click="backHome()" class="header-title">{{this.$t("message.title")}}</div>
    <div style="display:flex;align-items:center;">
      <div class="header-search-box">
        <SearchBox></SearchBox>
      </div>
      <div  class="mobile-display">
        <el-button size="medium" @click="ERC20Page">{{this.$t("message.ERC")}}</el-button>
        <el-button circle size="medium" @click="changLan">{{this.$t("message.lan")}}</el-button>
      </div>
      <el-dropdown ref="messageDrop" class="pc-display">
        <span class="el-dropdown-link" >
          <i class="el-icon-arrow-down el-icon--big"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="backHome">{{this.$t("message.home")}}</el-dropdown-item>
          <el-dropdown-item @click.native="ERC20Page">{{this.$t("message.ERC")}}</el-dropdown-item>
          <el-dropdown-item @click.native="changLan">{{this.$t("message.lan2")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import SearchBox from "./SearchBox.vue";
export default {
  name: "IHeader",
  components: {
    SearchBox
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    backHome() {
      this.$router.push({ path: "/" });
      this.$refs.messageDrop.hide();
    },
    ERC20Page() {
      this.$router.push({ path: "/ERC20" });
      this.$refs.messageDrop.hide();
    },
    changLan() {
      let local = this.$i18n.locale;
      if (!local || local === "") {
        this.$i18n.locale = "zh";
        localStorage.setItem("languageType", this.$i18n.locale);
      } else if (local === "zh") {
        this.$i18n.locale = "en";
        localStorage.setItem("languageType", this.$i18n.locale);
      } else {
        this.$i18n.locale = "zh";
        localStorage.setItem("languageType", this.$i18n.locale);
      }
      this.$refs.messageDrop.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>