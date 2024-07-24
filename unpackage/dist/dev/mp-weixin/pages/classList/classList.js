"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_utils = require("../../utils/utils.js");
if (!Array) {
  const _easycom_uv_skeletons2 = common_vendor.resolveComponent("uv-skeletons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_uv_skeletons2 + _easycom_uni_load_more2 + _easycom_z_paging2)();
}
const _easycom_uv_skeletons = () => "../../uni_modules/uv-skeletons/components/uv-skeletons/uv-skeletons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_uv_skeletons + _easycom_uni_load_more + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const loading = common_vendor.ref(true);
    const skeleton = common_vendor.ref([
      {
        type: "flex",
        style: "display: grid;grid-template-columns: repeat(3, 1fr);gap: 5rpx;",
        num: 4,
        gap: 5,
        children: [
          {
            type: "custom",
            style: "height: 440rpx;"
          },
          {
            type: "custom",
            style: "height: 440rpx;"
          },
          {
            type: "custom",
            style: "height: 440rpx;"
          }
        ]
      }
    ]);
    const classList = common_vendor.ref([]);
    const paging = common_vendor.ref();
    const pagingOptions = common_vendor.ref({
      "default-page-no": 1,
      "default-page-size": 12,
      "auto": false
    });
    let classid = "";
    let titleName = "";
    let type = "";
    const queryList = (pageNum, pageSize) => {
      let api = api_apis.apiGetClassList;
      const params = {
        pageNum,
        pageSize
      };
      if (type) {
        api = api_apis.apiUserWallList;
        params.type = type;
      } else {
        params.classid = classid;
      }
      api(params).then((res) => {
        if (!!loading.value) {
          loading.value = false;
        }
        paging.value.complete((res == null ? void 0 : res.data) || []);
      }).catch((err) => {
        if (!!loading.value) {
          loading.value = false;
        }
        paging.value.complete(false);
      });
    };
    common_vendor.onLoad((query) => {
      classid = query.classid;
      type = query.type;
      if (!classid & !type) {
        utils_utils.gotoHome();
      }
      titleName = query.name;
      common_vendor.index.setNavigationBarTitle({
        title: query.name
      });
    });
    common_vendor.watch(() => paging.value, (value) => {
      value.reload();
    });
    common_vendor.watch(() => classList.value, () => {
      common_vendor.index.setStorageSync("classList", classList.value);
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: `小虎壁纸查看器-${titleName}`,
        path: `/pages/classList/classList?id=${classid}&name=${titleName}`
      };
    });
    common_vendor.onShareTimeline((e) => {
      return {
        title: `小虎壁纸查看器-${titleName}`,
        query: `id=${classid}&name=${titleName}`
      };
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("classList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {
        b: common_vendor.p({
          loading: common_vendor.unref(loading),
          skeleton: common_vendor.unref(skeleton)
        })
      } : {}, {
        c: common_vendor.f(common_vendor.unref(classList), (item, index, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: `zp-id-${index}`,
            d: index
          };
        }),
        d: common_vendor.p({
          iconSize: 20,
          status: "loading"
        }),
        e: common_vendor.p({
          status: "noMore"
        }),
        f: common_vendor.sr(paging, "104357ab-1", {
          "k": "paging"
        }),
        g: common_vendor.o(queryList),
        h: common_vendor.o(($event) => common_vendor.isRef(classList) ? classList.value = $event : null),
        i: common_vendor.p({
          ["auto-show-back-to-top"]: true,
          ...common_vendor.unref(pagingOptions),
          modelValue: common_vendor.unref(classList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"], ["__file", "D:/workSpace/project/xiaohu-demo/pages/classList/classList.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
