"use strict";
const utils_request = require("../utils/request.js");
const apiGetBanner = () => {
  return utils_request.request.get({ url: "/homeBanner" });
};
const apiGetDayRandom = () => {
  return utils_request.request.get({ url: "/randomWall" });
};
const apiGetNotice = (data) => {
  return utils_request.request.get({
    url: "/wallNewsList",
    data
  });
};
const apiGetClassify = (params, data) => {
  return utils_request.request.get({
    url: "/classify",
    params,
    data
  });
};
const apiGetClassList = (params, data) => {
  return utils_request.request.get({
    url: "/wallList",
    params,
    data
  });
};
const apiSetupScore = (params) => {
  return utils_request.request.get({
    url: "/setupScore",
    params
  });
};
const apiDownload = (params) => {
  return utils_request.request.get({
    url: "/downloadWall",
    params
  });
};
const apiDetailWall = (params) => {
  return utils_request.request.get({
    url: "/detailWall",
    params
  });
};
const apiUserInfo = (params) => {
  return utils_request.request.get({
    url: "/userInfo",
    params
  });
};
const apiUserWallList = (params) => {
  return utils_request.request.get({
    url: "/userWallList",
    params
  });
};
const apiNoticeDetail = (params) => {
  return utils_request.request.get({
    url: "/wallNewsDetail",
    params
  });
};
const apiSearchData = (params) => {
  return utils_request.request.get({
    url: "/searchWall",
    params
  });
};
exports.apiDetailWall = apiDetailWall;
exports.apiDownload = apiDownload;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetNotice = apiGetNotice;
exports.apiNoticeDetail = apiNoticeDetail;
exports.apiSearchData = apiSearchData;
exports.apiSetupScore = apiSetupScore;
exports.apiUserInfo = apiUserInfo;
exports.apiUserWallList = apiUserWallList;
