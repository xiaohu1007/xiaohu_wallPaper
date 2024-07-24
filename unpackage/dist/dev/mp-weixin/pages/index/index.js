"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useDayjs = require("../../hooks/useDayjs.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      DD
    } = hooks_useDayjs.useDayjs();
    const routerDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/notice/detail?id=${id}`
      });
    };
    const bannerList = common_vendor.ref([]);
    const randomList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const classifyList = common_vendor.ref([]);
    const goPreview = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/preview/preview?id=${item._id}`
      });
      common_vendor.index.setStorageSync("classList", randomList.value);
    };
    const getBannerList = async () => {
      const res = await api_apis.apiGetBanner();
      bannerList.value = (res == null ? void 0 : res.data) || [];
    };
    const getRandomList = async () => {
      const res = await api_apis.apiGetDayRandom();
      randomList.value = (res == null ? void 0 : res.data) || [];
    };
    const getNoticeList = async () => {
      const res = await api_apis.apiGetNotice({
        select: true
      });
      noticeList.value = (res == null ? void 0 : res.data) || [];
    };
    const getClassifyList = async () => {
      const res = await api_apis.apiGetClassify({
        pageNum: 1,
        pageSize: 8,
        select: false
      }, {});
      classifyList.value = (res == null ? void 0 : res.data) || [];
    };
    common_vendor.onLoad(() => {
      getBannerList();
      getRandomList();
      getNoticeList();
      getClassifyList();
    });
    const goList = (data) => {
      if (data.target == "miniProgram") {
        console.log({
          path: data.url,
          target: "miniProgram",
          appId: data.appid
        });
        common_vendor.index.navigateBackMiniProgram({
          path: data.url,
          target: "miniProgram",
          appId: data.appid
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/classList/classList?${data.url.replace("id", "classid")}`
      });
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "小虎壁纸查看器, 精选壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline((e) => {
      return {
        title: "小虎壁纸查看器",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(common_vendor.unref(bannerList), (item, k0, i0) => {
          return {
            a: item.picurl,
            b: common_vendor.o(($event) => goList(item), item._id),
            c: item._id
          };
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        d: common_vendor.f(common_vendor.unref(noticeList).slice(0, 1).concat(common_vendor.unref(noticeList).slice(2, 3)), (item, k0, i0) => {
          return {
            a: common_vendor.t(`${item.title.replace("咸虾米壁纸", "小虎壁纸查看器")}`),
            b: item._id,
            c: common_vendor.o(($event) => routerDetail(item._id), item._id)
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "20",
          color: "#333"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "18"
        }),
        g: common_vendor.t(common_vendor.unref(DD)),
        h: common_vendor.f(common_vendor.unref(randomList), (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item), item._id)
          };
        }),
        i: common_vendor.f(common_vendor.unref(classifyList).concat(common_vendor.unref(classifyList)).slice(0, 9), (item, index, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-6-" + i0,
            c: common_vendor.p({
              isMore: index == 8,
              data: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/workSpace/project/xiaohu-demo/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
