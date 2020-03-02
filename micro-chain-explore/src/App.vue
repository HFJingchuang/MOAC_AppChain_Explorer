<template>
  <div id="app" :class="isMobile?'mobileCss':'pcCss'">
    <IHeader></IHeader>
    <router-view />
    <IFooter></IFooter>
  </div>
</template>

<script>
import IHeader from "./components/IHeader";
import IFooter from "./components/IFooter";
export default {
  name: "App",
  components: {
    IHeader,
    IFooter
  },
  data() {
    return {
      isMobile: false
    };
  },
  created() {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS)/i
      )
    ) {
      // 移动端CSS
      require("./css/mobile.scss");
      this.isMobile = true;
    } else {
      // PC端CSS
      require("./css/pc.scss");
      this.isMobile = false;
    }
  }
};
</script>
