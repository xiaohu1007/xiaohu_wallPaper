"use strict";
const common_vendor = require("../common/vendor.js");
const useMpSystem = () => {
  const systemInfo = common_vendor.reactive({
    systemInfo: null,
    statusBarHeight: 15,
    // 状态栏高度
    titleBarHeight: 40,
    // 标题高度
    navBarHeight: 40,
    // 导航栏高度
    leftIconLeft: 0
    // 抖音左边距离
  });
  common_vendor.onMounted(() => {
    systemInfo.systemInfo = common_vendor.index.getSystemInfoSync();
    systemInfo.statusBarHeight = systemInfo.systemInfo.statusBarHeight || 15;
    if (common_vendor.index.getMenuButtonBoundingClientRect) {
      let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
      systemInfo.titleBarHeight = height + (top - systemInfo.statusBarHeight) * 2;
    }
    systemInfo.navBarHeight = systemInfo.statusBarHeight + systemInfo.titleBarHeight;
    try {
      if (tt == null ? void 0 : tt.getMenuButtonBoundingClientRect) {
        const { leftIcon: { left, width } } = tt.getMenuButtonBoundingClientRect();
        systemInfo.leftIconLeft = left + parseInt(width) + 5;
      }
    } catch (err) {
    }
  });
  return common_vendor.toRefs(systemInfo);
};
exports.useMpSystem = useMpSystem;
