"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/user.js";
  "./pages/classify/classify.js";
  "./pages/classList/classList.js";
  "./pages/preview/preview.js";
  "./pages/notice/notice.js";
  "./pages/notice/detail.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workSpace/project/xiaohu-demo/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$dayjs = common_vendor.dayjs;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
