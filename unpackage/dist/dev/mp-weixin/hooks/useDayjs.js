"use strict";
const common_vendor = require("../common/vendor.js");
const useDayjs = () => {
  const date = common_vendor.reactive({
    initSuccess: false,
    YYYY: "2024",
    MM: "01",
    DD: "01",
    HH: "00",
    mm: "00",
    ss: "00"
  });
  common_vendor.onMounted(() => {
    const getDay = setInterval(() => {
      const nowDate = common_vendor.dayjs();
      Object.keys(date).forEach((key) => {
        if (key == "initSuccess") {
          return date[key] = true;
        }
        date[key] = nowDate.format(key);
      });
    }, 1e3);
    common_vendor.onUnmounted(() => {
      clearInterval(getDay);
    });
  });
  return common_vendor.toRefs(date);
};
exports.useDayjs = useDayjs;
