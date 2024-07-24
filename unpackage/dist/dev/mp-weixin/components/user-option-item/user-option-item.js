"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user-option-item",
  props: {
    option: {
      type: Object,
      default: () => ({
        id: 1,
        name: "",
        icon: "",
        callback: () => {
        },
        num: 0,
        leftSlot: false,
        rightSlot: false
      })
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.option.leftSlot
      }, props.option.leftSlot ? {
        b: common_vendor.d(props.option.leftSlot)
      } : {
        c: common_vendor.p({
          type: props.option.icon,
          size: "20"
        }),
        d: common_vendor.t(props.option.name)
      }, {
        e: props.option.rightSlot
      }, props.option.rightSlot ? {
        f: common_vendor.d(props.option.rightSlot)
      } : common_vendor.e({
        g: !!props.option.num
      }, !!props.option.num ? {
        h: common_vendor.t(props.option.num)
      } : {}, {
        i: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      }), {
        j: common_vendor.o((...args) => props.option.callback && props.option.callback(...args))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4d711c1"], ["__file", "D:/workSpace/project/xiaohu-demo/components/user-option-item/user-option-item.vue"]]);
wx.createComponent(Component);
