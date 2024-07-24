import { buildUrlWithParams } from '@/utils/utils.js'

// #ifdef H5
const BASE_URL = process.env.UNI_APP_URL;
// #endif

// #ifndef H5
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi';
// #endif

const header = {
	'access-key': '626569'
}

// 请求拦截器
const requestInterceptor = (options) => {
  // 在请求发送之前做一些处理
  // 比如添加token到header
  const token = uni.getStorageSync('token');
  if (token) {
    options.header = {
      ...options.header,
      'Authorization': `Bearer ${token}`
    };
  }
  return options;
};

// 响应拦截器
const responseInterceptor = (response) => {
  // 在响应数据返回之后做一些处理
  // 比如处理未登录的情况
  // if (response.statusCode === 401) {
  //   uni.navigateTo({
  //     url: '/pages/login/login' // 跳转到登录页面
  //   });
  // }
  return response;
};


const request = ({
	url,
	method,
	data,
	params,
	headers = {},
}) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: BASE_URL + buildUrlWithParams(url, params), // 服务器url
      method: method || 'GET', // 请求方法，默认为GET
      data: data || {}, // 请求参数
      header: {...(headers || { 'Content-Type': 'application/json' }), ...header}, // 设置请求的 header
      success: (res) => {
		res = responseInterceptor(res);
        // 请求成功
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
			// 可以根据项目要求修改错误处理
			uni.showModal({
				title: '错误提示',
				content: res.data.errMsg,
				showCancel: false
			})
			reject(res.data);
        } else {
			uni.showToast({
				content: res.data.errMsg,
				icon: 'none'
			})
			reject(res.data);
		}
      },
      fail: (err) => {
        // 请求失败处理
        reject(err);
      }
    };
	
	options = requestInterceptor(options);
	
	uni.request(options);
	
  });
}

request.get = ({url, params = {}, headers = {}}) => request({url, method: 'GET', params, headers})
request.post = ({url, data, params, headers = {}}) => request({url, method: 'POST', data, params, headers})

export default request;