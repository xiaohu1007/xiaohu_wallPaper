"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref(null);
    let id = "";
    common_vendor.onLoad((query) => {
      id = query.id;
      getDetail();
    });
    const getDetail = async () => {
      const res = await api_apis.apiNoticeDetail({
        id
      });
      res.data.author = "小虎";
      res.data.content = res.data.content.replace("咸虾米壁纸", "小虎壁纸查看器").replace("513894357", "1449394718");
      res.data["view_count"] = (res.data["view_count"] + "").substring(2).replace(/^0+/, "");
      res.data.publish_date = res.data.publish_date + 28 * 9 * 24.7 * 60 * 60 * 1e3;
      res.data.title = res.data.title.replace("咸虾米壁纸", "小虎壁纸查看器");
      if (res.data.title.indexOf("常见") < 0) {
        res.data.content = res.data.content.slice(0, res.data.content.indexOf("<img")) + res.data.content.slice(res.data.content.indexOf("/>") + 2).replace("咸虾米壁纸", "小虎壁纸查看器").replace("UP主咸虾米", "").replace("学习交流，", "学习交流，开发参考“咸虾米壁纸”。");
      }
      console.log(res.data.content);
      detail.value = res.data || {};
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: (_a = common_vendor.unref(detail)) == null ? void 0 : _a.select
      }, ((_b = common_vendor.unref(detail)) == null ? void 0 : _b.select) ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        c: common_vendor.t((_c = common_vendor.unref(detail)) == null ? void 0 : _c.title),
        d: common_vendor.t((_d = common_vendor.unref(detail)) == null ? void 0 : _d.author),
        e: common_vendor.t(_ctx.$dayjs((_e = common_vendor.unref(detail)) == null ? void 0 : _e.publish_date).format("YYYY-MM-DD hh:mm:ss")),
        f: common_vendor.p({
          content: (_f = common_vendor.unref(detail)) == null ? void 0 : _f.content
        }),
        g: common_vendor.t(((_g = common_vendor.unref(detail)) == null ? void 0 : _g.view_count) || 0)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workSpace/project/xiaohu-demo/pages/notice/detail.vue"]]);
wx.createPage(MiniProgramPage);
