"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_utils = require("../../utils/utils.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: !__props.isMore
      }, !__props.isMore ? {
        b: (_a = __props.data) == null ? void 0 : _a.picurl,
        c: common_vendor.t(((_b = __props.data) == null ? void 0 : _b.name) || ""),
        d: common_vendor.t(common_vendor.unref(utils_utils.timeDifference)((_c = __props.data) == null ? void 0 : _c.updateTime) || "超出3个月"),
        e: `/pages/classList/classList?classid=${__props.data._id}&name=${__props.data.name}`
      } : {
        f: (_d = __props.data) == null ? void 0 : _d.picurl,
        g: common_vendor.p({
          type: "more-filled",
          size: "34",
          color: "#fff"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"], ["__file", "D:/workSpace/project/xiaohu-demo/components/theme-item/theme-item.vue"]]);
wx.createComponent(Component);
