"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const hooks_useDayjs = require("../../hooks/useDayjs.js");
const hooks_useMpSystem = require("../../hooks/useMpSystem.js");
const utils_utils = require("../../utils/utils.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const classListStore = common_vendor.index.getStorageSync("classList") || [];
    const formatPic = (arr) => {
      return (arr == null ? void 0 : arr.map((item) => ({
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      }))) || [];
    };
    classList.value = formatPic(classListStore);
    const currId = common_vendor.ref(null);
    const currIndex = common_vendor.ref(-1);
    const currInfo = common_vendor.computed(() => classList.value[currIndex.value]);
    common_vendor.onLoad(async (query) => {
      currId.value = query.id;
      if (!query.id) {
        utils_utils.gotoHome();
      }
      if (query.type == "share") {
        const res = await api_apis.apiDetailWall({ id: currId.value });
        classList.value = formatPic(res.data);
      }
      currIndex.value = classList.value.findIndex((item) => item._id == currId.value);
    });
    const swiperChange = (e) => {
      currIndex.value = e.detail.current;
    };
    const showImgArr = common_vendor.computed(() => {
      return [
        currIndex.value - 1 >= 0 ? currIndex.value - 1 : classList.value.length - 1,
        currIndex.value,
        currIndex.value + 1 <= classList.value.length - 1 ? currIndex.value + 1 : 0
      ];
    });
    const { MM, DD, HH, mm, initSuccess } = hooks_useDayjs.useDayjs();
    const { statusBarHeight, leftIconLeft } = hooks_useMpSystem.useMpSystem();
    const infoPopup = common_vendor.ref(null);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const userScore = common_vendor.ref(0);
    const starPopup = common_vendor.ref(null);
    const clickStar = () => {
      starPopup.value.open();
      userScore.value = classList.value[currIndex.value]["userScore"] || 0;
    };
    const clickStarClose = () => {
      starPopup.value.close();
      userScore.value = 0;
    };
    const submitScore = async (item) => {
      var _a, _b;
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const params = {
        classid: (_a = currInfo.value) == null ? void 0 : _a.classid,
        wallId: (_b = currInfo.value) == null ? void 0 : _b._id,
        userScore: userScore.value
      };
      common_vendor.index.showToast({
        icon: "none",
        title: "提交成功"
      });
      const res = await api_apis.apiSetupScore(params);
      common_vendor.index.hideLoading();
      if ((res == null ? void 0 : res.errCode) == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "提交成功"
        });
        classList.value[currIndex.value]["userScore"] = userScore.value;
        common_vendor.index.setStorageSync("classList", classList.value);
        clickStarClose();
      }
    };
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const download = async () => {
      var _a, _b;
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        const res = await api_apis.apiDownload({
          classid: (_a = currInfo.value) == null ? void 0 : _a.classid,
          wallId: (_b = currInfo.value) == null ? void 0 : _b._id
        });
        if (res.errCode != 0) {
          throw res;
        }
        common_vendor.index.getImageInfo({
          src: currInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (resResult) => {
                console.log(resResult);
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要授权保存相册",
                  success: (resFail) => {
                    if (resFail.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取授权失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          },
          complete: (res2) => {
            common_vendor.index.hideLoading();
          }
        });
      } catch (err) {
        console.log(err);
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: `小虎壁纸查看器`,
        path: `/pages/preview/preview?id=${currId.value}&type=share`
      };
    });
    common_vendor.onShareTimeline((e) => {
      return {
        title: `小虎壁纸查看器`,
        query: `id=${currId.value}&type=share`
      };
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return common_vendor.e({
        a: common_vendor.unref(currIndex) >= 0
      }, common_vendor.unref(currIndex) >= 0 ? common_vendor.e({
        b: common_vendor.f(common_vendor.unref(classList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(showImgArr).includes(index)
          }, common_vendor.unref(showImgArr).includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: common_vendor.unref(currIndex),
        d: common_vendor.o(swiperChange),
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(statusBarHeight) + "px",
        h: common_vendor.unref(leftIconLeft) + 15 + "px",
        i: common_vendor.t(`${common_vendor.unref(currIndex) + 1} / ${((_a = common_vendor.unref(classList)) == null ? void 0 : _a.length) || 0}`),
        j: common_vendor.unref(initSuccess)
      }, common_vendor.unref(initSuccess) ? {
        k: common_vendor.t(`${common_vendor.unref(HH)}:${common_vendor.unref(mm)}`),
        l: common_vendor.t(`${common_vendor.unref(MM)}月${common_vendor.unref(DD)}日`)
      } : {}, {
        m: common_vendor.p({
          type: "info",
          size: "28"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "info",
          size: "28"
        }),
        p: common_vendor.t(((_b = common_vendor.unref(currInfo)) == null ? void 0 : _b.score) || 0),
        q: common_vendor.o(clickStar),
        r: common_vendor.p({
          type: "download",
          size: "28"
        }),
        s: common_vendor.o(download),
        t: common_vendor.unref(maskState),
        v: common_vendor.o((_c = common_vendor.unref(infoPopup)) == null ? void 0 : _c.close),
        w: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#333"
        }),
        x: common_vendor.t((_d = common_vendor.unref(currInfo)) == null ? void 0 : _d._id),
        y: common_vendor.t(((_e = common_vendor.unref(currInfo)) == null ? void 0 : _e.nickname) || "未知"),
        z: common_vendor.p({
          readonly: true,
          touchable: true,
          value: ((_f = common_vendor.unref(currInfo)) == null ? void 0 : _f.score) || 0,
          size: "16"
        }),
        A: common_vendor.t(((_g = common_vendor.unref(currInfo)) == null ? void 0 : _g.score) || 0),
        B: common_vendor.t(((_h = common_vendor.unref(currInfo)) == null ? void 0 : _h.description) || "暂无描述"),
        C: common_vendor.f(((_i = common_vendor.unref(currInfo)) == null ? void 0 : _i.tabs) || [], (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        D: common_vendor.sr(infoPopup, "357410a0-4", {
          "k": "infoPopup"
        }),
        E: common_vendor.p({
          type: "bottom"
        }),
        F: common_vendor.t(!((_j = common_vendor.unref(currInfo)) == null ? void 0 : _j.userScore) ? "壁纸评分" : "已经评分过了"),
        G: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        H: common_vendor.o(clickStarClose),
        I: common_vendor.o(($event) => common_vendor.isRef(userScore) ? userScore.value = $event : null),
        J: common_vendor.p({
          ["allow-half"]: true,
          readonly: !!((_k = common_vendor.unref(currInfo)) == null ? void 0 : _k.userScore),
          modelValue: common_vendor.unref(userScore)
        }),
        K: common_vendor.t(common_vendor.unref(userScore)),
        L: common_vendor.o(submitScore),
        M: !common_vendor.unref(userScore) || !!((_l = common_vendor.unref(currInfo)) == null ? void 0 : _l.userScore),
        N: common_vendor.sr(starPopup, "357410a0-7", {
          "k": "starPopup"
        }),
        O: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workSpace/project/xiaohu-demo/pages/preview/preview.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
