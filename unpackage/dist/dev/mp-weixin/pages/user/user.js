"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const hooks_useMpSystem = require("../../hooks/useMpSystem.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_user_option_item2 = common_vendor.resolveComponent("user-option-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_user_option_item2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_user_option_item = () => "../../components/user-option-item/user-option-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_user_option_item + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const { navBarHeight } = hooks_useMpSystem.useMpSystem();
    const formatNumItem = (item, value) => {
      return {
        ...item,
        num: value
      };
    };
    let concatBtn = {
      id: 3,
      name: "联系客服",
      icon: "chatboxes-filled",
      callback: () => {
      },
      numKey: "",
      leftSlot: "concat"
    };
    const userInfo = common_vendor.ref(null);
    const getUserInfo = async () => {
      const res = await api_apis.apiUserInfo();
      userInfo.value = res.data;
    };
    const list = common_vendor.ref([
      {
        id: 1,
        name: "我的下载",
        icon: "download-filled",
        callback: () => {
          common_vendor.index.navigateTo({
            url: "/pages/classList/classList?name=我的下载&type=download"
          });
        },
        numKey: "downloadSize"
      },
      {
        id: 2,
        name: "我的评分",
        icon: "download-filled",
        callback: () => {
          common_vendor.index.navigateTo({
            url: "/pages/classList/classList?name=我的评分&type=score"
          });
        },
        numKey: "scoreSize"
      },
      concatBtn,
      {
        id: 4,
        name: "订阅更新",
        icon: "notification-filled",
        callback: () => {
        },
        numKey: ""
      },
      {
        id: 5,
        name: "常见问题",
        icon: "flag-filled",
        callback: () => {
          common_vendor.index.navigateTo({
            url: `/pages/notice/detail?id=6536358ce0ec19c8d67fbe82`
          });
        },
        numKey: ""
      }
    ]);
    common_vendor.onLoad((query) => {
      console.log("onload");
    });
    common_vendor.onReady(() => {
      console.log("onReady");
    });
    common_vendor.onShow(() => {
      console.log("onShow");
    });
    common_vendor.onUnmounted(() => {
      console.log("onUnmounted");
    });
    common_vendor.onUnload(() => {
      console.log("onUnload");
    });
    common_vendor.onMounted(() => {
      getUserInfo();
      console.log("onMounted");
    });
    common_vendor.onHide(() => {
      console.log("onHide");
    });
    common_vendor.onPageScroll((e) => {
      console.log(e, "scroll");
    });
    common_vendor.onReachBottom((e) => {
      console.log(e, "reachBottom");
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        b: common_vendor.s(`height: ${common_vendor.unref(navBarHeight)}px;`),
        c: common_vendor.t((_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.IP),
        d: common_vendor.t(((_c = (_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.address) == null ? void 0 : _c.city) || ((_e = (_d = common_vendor.unref(userInfo)) == null ? void 0 : _d.address) == null ? void 0 : _e.province) || ((_g = (_f = common_vendor.unref(userInfo)) == null ? void 0 : _f.address) == null ? void 0 : _g.country)),
        e: common_vendor.f(common_vendor.unref(list).slice(0, 3), (item, k0, i0) => {
          var _a2;
          return {
            a: "0f7520f0-1-" + i0 + "," + ("0f7520f0-0-" + i0),
            b: common_vendor.p({
              type: item.icon,
              size: "20"
            }),
            c: common_vendor.t(item.name),
            d: item.id,
            e: "0f7520f0-0-" + i0,
            f: common_vendor.p({
              option: formatNumItem(item, ((_a2 = common_vendor.unref(userInfo)) == null ? void 0 : _a2[item.numKey]) || 0)
            })
          };
        }),
        f: common_vendor.f(common_vendor.unref(list).slice(3), (item, k0, i0) => {
          return {
            a: item.id,
            b: "0f7520f0-2-" + i0,
            c: common_vendor.p({
              option: item
            })
          };
        })
      } : {
        g: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/workSpace/project/xiaohu-demo/pages/user/user.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
