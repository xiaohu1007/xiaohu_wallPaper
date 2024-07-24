// 拼接url方法
export const buildUrlWithParams = (url, params) => {
  if (!params) return url;
  const queryString = Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
  return `${url}?${queryString}`;
};

// 时间戳方法
export const timeDifference = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 0) return '时间戳在未来';

  const units = [
    { label: '分钟', value: 60 * 1000 },
    { label: '小时', value: 60 * 60 * 1000 },
    { label: '天', value: 24 * 60 * 60 * 1000 },
    { label: '个月', value: 30 * 24 * 60 * 60 * 1000 },
    { label: null, value: 3 * 30 * 24 * 60 * 60 * 1000 }
  ];

  if (diff < units[0].value) {
    return '1分钟内';
  }

  for (let i = 0; i < units.length - 1; i++) {
    if (diff < units[i + 1].value) {
      const time = Math.floor(diff / units[i].value);
      return units[i].label ? `${time} ${units[i].label}前` : null;
    }
  }

  return null;
};

// 返回首页
export const gotoHome = () => {
	uni.showModal({
		title: '提示',
		content: '页面有误将返回首页',
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	})
};