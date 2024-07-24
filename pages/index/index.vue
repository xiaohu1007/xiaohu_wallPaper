<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper :indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fff"
				circular :autoplay="true">
				<swiper-item @click="goList(item)" v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical interval="1500" duration="500" circular :autoplay="false">
					<swiper-item v-for="item in noticeList.slice(0,1).concat(noticeList.slice(2,3))" :key="item._id"
						@click="routerDetail(item._id)">
						<view class="swiper-item">{{`${item.title.replace('咸虾米壁纸', '小虎壁纸查看器')}`}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20" color="#333"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<text>{{ DD }}日</text>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator open-type="reLaunch" url="/pages/classify/classify" class="more">More+</navigator>
				</template>
			</common-title>

			<view class="content">
				<theme-item v-for="(item, index) in classifyList.concat(classifyList).slice(0, 9)" :key="item._id"
					:isMore="index == 8" :data="item"></theme-item>
			</view>
		</view>

	</view>
</template>

<script setup>
	import useDayjs from '@/hooks/useDayjs.js';
	import {
		apiGetBanner,
		apiGetDayRandom,
		apiGetNotice,
		apiGetClassify,
	} from '@/api/apis.js';

	const {
		DD
	} = useDayjs();

	const routerDetail = (id) => {
		uni.navigateTo({
			url: `/pages/notice/detail?id=${id}`
		})
	}

	const bannerList = ref([]);
	const randomList = ref([]);
	const noticeList = ref([]);
	const classifyList = ref([]);


	const goPreview = (item) => {
		uni.navigateTo({
			url: `/pages/preview/preview?id=${item._id}`
		});
		uni.setStorageSync('classList', randomList.value)
	}

	const getBannerList = async () => {
		const res = await apiGetBanner();
		bannerList.value = res?.data || [];
	}
	const getRandomList = async () => {
		const res = await apiGetDayRandom();
		randomList.value = res?.data || [];
	}
	const getNoticeList = async () => {
		const res = await apiGetNotice({
			select: true
		});
		noticeList.value = res?.data || [];
	}
	const getClassifyList = async () => {
		const res = await apiGetClassify({
			pageNum: 1,
			pageSize: 8,
			select: false
		}, {});
		classifyList.value = res?.data || [];
	}

	onLoad(() => {
		getBannerList();
		getRandomList();
		getNoticeList();
		getClassifyList();
	});
	
	const goList = (data) => {
		if (data.target == 'miniProgram') {
			console.log({
				path: data.url,
				target: 'miniProgram',
				appId: data.appid,
			});
			uni.navigateBackMiniProgram({
				path: data.url,
				target: 'miniProgram',
				appId: data.appid,
			})
			return;	
		}
		uni.navigateTo({
			url:`/pages/classList/classList?${data.url.replace('id', 'classid')}`
		})
	};


	// 分享好友
	onShareAppMessage((e) => {
		return {
			title: '小虎壁纸查看器, 精选壁纸',
			path: '/pages/index/index'
		}
	});

	// 分享朋友圈
	onShareTimeline((e) => {
		return {
			title: '小虎壁纸查看器',
			path: '/pages/index/index'
		}
	});
</script>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 100%;
				height: 340rpx;

				&-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					image {
						width: 100%;
						height: 100%;
						background-color: #333;
						border-radius: 10rpx;
					}
				}
			}
		}

		.notice {
			display: flex;
			width: 100%;
			padding: 0 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #f9f9f9;
			border-radius: 80rpx;

			.left {
				@include flex-center;
				width: 140rpx;

				:deep(.uni-icons) {
					color: $brand-theme-color !important;
				}

				.text {
					height: auto;
					line-height: inherit;
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						@include text-ellipsis;
						height: 100%;
						font-size: 30rpx;
						color: #666;
					}
				}
			}

			.right {
				@include flex-center;
				width: 70rpx;
			}
		}

		.select {
			width: 100%;
			padding: 50rpx 0;

			.date,
			:deep(.uni-icons) {
				color: $brand-theme-color !important;
			}

			.content {
				padding-left: 30rpx;
				width: 100%;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						&:last-child {
							margin-right: 30rpx;
						}

						image {
							width: 100%;
							height: 100%;
							background-color: #333;
							border-radius: 10rpx;
						}
					}
				}
			}
		}

		.theme {
			padding-top: 50rpx;

			.more {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin: 30rpx 0;
				padding: 0 30rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 15rpx;
			}
		}

	}
</style>