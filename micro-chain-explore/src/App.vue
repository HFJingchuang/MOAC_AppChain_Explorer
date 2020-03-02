<template>
  <div id="app">
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
  created() {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS)/i
      )
    ) {
      // 移动端CSS
      require("./css/mobile.scss");
    } else {
      // PC端CSS
      require("./css/pc.scss");
    }
  }
};
</script>
