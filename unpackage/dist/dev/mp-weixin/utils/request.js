"use strict";
const common_vendor = require("../common/vendor.js");
const utils_utils = require("./utils.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
const header = {
  "access-key": "626569"
};
const requestInterceptor = (options) => {
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    options.header = {
      ...options.header,
      "Authorization": `Bearer ${token}`
    };
  }
  return options;
};
const responseInterceptor = (response) => {
  return response;
};
const request = ({
  url,
  method,
  data,
  params,
  headers = {}
}) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: BASE_URL + utils_utils.buildUrlWithParams(url, params),
      // 服务器url
      method: method || "GET",
      // 请求方法，默认为GET
      data: data || {},
      // 请求参数
      header: { ...headers || { "Content-Type": "application/json" }, ...header },
      // 设置请求的 header
      success: (res) => {
        res = responseInterceptor(res);
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showToast({
            content: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    };
    options = requestInterceptor(options);
    common_vendor.index.request(options);
  });
};
request.get = ({ url, params = {}, headers = {} }) => request({ url, method: "GET", params, headers });
request.post = ({ url, data, params, headers = {} }) => request({ url, method: "POST", data, params, headers });
exports.request = request;
