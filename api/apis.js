import request from "../utils/request"

export const apiGetBanner = () => {
	return request.get({url: '/homeBanner'});
}

export const apiGetDayRandom = () => {
	return request.get({url: '/randomWall'});
}

export const apiGetNotice = (data) => {
	return request.get({
		url: '/wallNewsList',
		data
	});
}

export const apiGetClassify = (params, data) => {
	return request.get({
		url: '/classify',
		params,
		data
	});
}

export const apiGetClassList = (params, data) => {
	return request.get({
		url: '/wallList',
		params,
		data
	});
}

export const apiSetupScore = (params) => {
	return request.get({
		url: '/setupScore',
		params
	});
}

export const apiDownload = (params) => {
	return request.get({
		url: '/downloadWall',
		params
	});
}

export const apiDetailWall = (params) => {
	return request.get({
		url: '/detailWall',
		params
	});
}

export const apiUserInfo = (params) => {
	return request.get({
		url: '/userInfo',
		params
	});
}

export const apiUserWallList = (params) => {
	return request.get({
		url: '/userWallList',
		params
	});
}

export const apiNoticeDetail = (params) => {
	return request.get({
		url: '/wallNewsDetail',
		params
	});
}

export const apiSearchData = (params) => {
	return request.get({
		url: '/searchWall',
		params
	});
}