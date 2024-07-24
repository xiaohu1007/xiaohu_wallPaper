<template>
	<view class="previewLayout" v-if="currIndex >= 0">
		<swiper circular :current="currIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="showImgArr.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" v-show="maskState">
			<view class="goBack" @click="goBack" :style="{top: statusBarHeight + 'px', left: leftIconLeft + 15 + 'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">
				{{`${currIndex + 1} / ${classList?.length || 0}`}}
			</view>
			<template v-if="initSuccess">
				<view class="time">
					{{ `${HH}:${mm}` }}
				</view>
				<view class="date">
					{{ `${MM}月${DD}日` }}
				</view>
			</template>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<view class="box" @click="clickStar">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">
						{{currInfo?.score || 0}}分
					</view>
				</view>
				<view class="box" @click="download">
					<uni-icons type="download" size="28"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view class="title">
						壁纸信息
					</view>
					<view class="close">
						<uni-icons type="closeempty" size="18" color="#333" @click="infoPopup?.close"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true" >
					<view class="content">
						<view class="row">
							<view class="label">
								壁纸ID：
							</view>
							<text selectable class="value">
								{{currInfo?._id}}
							</text>
						</view>
						
						<!-- <view class="row">
							<view class="label">
								分类：
							</view>
							<text selectable class="value class">
								明星美女
							</text>
						</view> -->
						
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text selectable class="value">
								{{currInfo?.nickname || '未知'}}
							</text>
						</view>
						
						<view class="row">
							<view class="label">
								评分：
							</view>
							<view class="value star-box">
								<uni-rate readonly touchable :value="currInfo?.score || 0" size="16"></uni-rate>
								<text class="score">{{currInfo?.score || 0}}分</text>
							</view>
						</view>
						
						<view class="row">
							<view class="label">
								摘要：
							</view>
							<text selectable class="value">
								{{currInfo?.description || '暂无描述'}}
							</text>
						</view>
						
						<view class="row">
							<view class="label">
								标签：
							</view>
							<view class="value tabs">
								<view class="tab" v-for="item in (currInfo?.tabs || [])" :key="item">
									{{item}}
								</view>
							</view>
						</view>
						
						<view class="copyright">
							声明：本图片来源于用户投稿，非商业使用，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱1449394718@qq.com, 管理员将删除侵权壁纸，维护您的权益。
						</view>
						
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="starPopup" type="center" :is-mask-click="false">
			<view class="starPopup">
				<view class="popHeader">
					<view class="title">
						{{ !currInfo?.userScore ? '壁纸评分' : '已经评分过了'}}
					</view>
					<view class="close" @click="clickStarClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate allow-half :readonly="!!currInfo?.userScore" v-model="userScore"></uni-rate>
					<text class="text">{{ userScore }}</text>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || !!currInfo?.userScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script setup>
import { watch } from 'vue';
import { apiDownload, apiSetupScore, apiDetailWall } from '../../api/apis';
import useDayjs from '@/hooks/useDayjs.js';
import useMpSystem from '@/hooks/useMpSystem.js';
import { gotoHome } from '../../utils/utils';

const classList = ref([]);
const classListStore = uni.getStorageSync('classList') || [];
const formatPic = (arr) => {
	return arr?.map(item => ({
		...item,
		picurl: item.smallPicurl.replace('_small.webp', '.jpg')
	})) || [];
}
classList.value = formatPic(classListStore);

const currId = ref(null);
const currIndex = ref(-1);
const currInfo = computed(() => classList.value[currIndex.value]);

onLoad(async (query) => {
	currId.value = query.id;
	
	if (!query.id) {
		gotoHome();
	}
	
	if (query.type == 'share') {
		const res = await apiDetailWall({id: currId.value});
		classList.value = formatPic(res.data);
	}
	currIndex.value = classList.value.findIndex(item => item._id == currId.value);
});

const swiperChange = (e) => {
	currIndex.value = e.detail.current;
}

const showImgArr = computed(() => {
	return [
		currIndex.value - 1 >= 0 ? currIndex.value - 1 : classList.value.length - 1,
		currIndex.value,
		currIndex.value + 1 <= classList.value.length - 1 ? currIndex.value + 1 : 0
	]
});

const { MM, DD, HH, mm, initSuccess } = useDayjs();
const { statusBarHeight, leftIconLeft } = useMpSystem();

const infoPopup = ref(null);
const clickInfo = () => {
	infoPopup.value.open();
}

const userScore = ref(0);
const starPopup = ref(null);
const clickStar = () => {
	starPopup.value.open();
	userScore.value = classList.value[currIndex.value]['userScore'] || 0;
}
const clickStarClose = () => {
	starPopup.value.close();
	userScore.value = 0;
}

// 确认评分
const submitScore = async (item) => {
	uni.showLoading({
		title: '加载中...'
	})
	const params = {
		classid: currInfo.value?.classid,
		wallId: currInfo.value?._id,
		userScore: userScore.value,
	};
	uni.showToast({
		icon: 'none',
		title: '提交成功',
	});
	const res = await apiSetupScore(params);
	uni.hideLoading();
	if (res?.errCode == 0) {
		
		uni.showToast({
			icon: 'none',
			title: '提交成功',
		});
		classList.value[currIndex.value]['userScore'] = userScore.value;
		uni.setStorageSync('classList', classList.value)
		clickStarClose();
	};
};

const maskState = ref(true);
const maskChange = () => {
	maskState.value = !maskState.value;
}

// 返回
const goBack = () => {
	uni.navigateBack({
		fail: (err) => {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	});
}

// 点击下载
const download = async () => {
	// #ifdef H5
		uni.showModal({
			content: '请长按保存壁纸',
			showCancel: false,
		})
	// #endif
	// #ifndef H5
	
		try {
			uni.showLoading({
				title: '下载中...',
				mask: true
			})
			
			const res = await  apiDownload({
				classid: currInfo.value?.classid,
				wallId: currInfo.value?._id,
			})
			if (res.errCode != 0) {
				throw res;
			}
			
			uni.getImageInfo({
				src: currInfo.value.picurl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (resResult) => {
							console.log(resResult);
						},
						fail: err => {
							if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
								uni.showToast({
									title: '保存失败，请重新点击下载',
									icon: 'none',
								})
								return;
							}
							uni.showModal({
								title: '提示',
								content: '需要授权保存相册',
								success: resFail => {
									if (resFail.confirm) {
										uni.openSetting({
											success: (setting) => {
												if (setting.authSetting['scope.writePhotosAlbum']) {
													uni.showToast({
														title: '授权成功',
														icon: 'none'
													})
												} else {
													uni.showToast({
														title: '获取授权失败',
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						}
					});
				},
				complete: (res) => {
					uni.hideLoading();
				}
				
			})
		} catch (err) {
			console.log(err);
			uni.hideLoading();
		}
	// #endif
}
	
// 分享好友
onShareAppMessage((e) => {
	return {
		title: `小虎壁纸查看器`,
		path: `/pages/preview/preview?id=${currId.value}&type=share`
	}
});

// 分享朋友圈
onShareTimeline((e) => {
	return {
		title: `小虎壁纸查看器`,
		query: `id=${currId.value}&type=share`
	}
});

</script>

<style lang="scss">
	.previewLayout {
		width: 100%;
		height: 100vh;
		position: relative;
		swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.mask {
			&>view:not(.goBack) {
				@include positon-horizontal-center;
			}
			.goBack {
				position: absolute;
				align-items: center;
				width: 38px;
				height: 38px;
				background-color: rgba(0, 0, 0, 0.5);
				margin-left: 0;
				border-radius: 100%;
				top: 0;
				backdrop-filter: blur(10px);
				border: 1rpx solid rgba(255, 255, 255, .3);
				@include flex-center;
			}
			.count {
				top: 10vh;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}
			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				color: #fff;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}
			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
				color: #fff;
			}
			.footer {
				background-color: rgba(255, 255, 255, .8);
				bottom: 10vh;
				border-radius: 120rpx;
				height: 120rpx;
				width: 65vw;
				color: #000;
				@include flex-center;
				justify-content: space-around;
				box-sizing: 0 2rpx 0 rgba(0, 0, 0, .1);
				backdrop-filter: blur(20rpx);
				.box {
					@include flex-center;
					flex-direction: column;
					padding: 2rpx 12rpx;
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
		
		.popHeader {
			position: relative;
			@include flex-center;
			.title {
				color: $text-font-color-2;
				font-size: 26rpx;
			}
			.close {
				@include positon-vertical-center;
				right: 0;
				padding: 6rpx;
			}
		}
		
		.infoPopup {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;
			scroll-view {
				max-height: 60vh;
				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;
						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}
						.value {
							flex: 1;
							width: 0;
						}
						.star-box {
							display: flex;
							align-items: center;
							.score {
								display: 26rpx;
								color: $text-font-color-2;
								padding-left: 10rpx;
							}
						}
						.class {
							color: $brand-theme-color;
						}
						.tabs {
							display: flex;
							flex-wrap: nowrap;
							.tab {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}
					}
					
					.copyright {
						font-style: 28rpx;
						padding: 20rpx;
						background-color: #f6f6f6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}
		
		.starPopup {
			background-color: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;
			.content {
				padding: 30rpx 0;
				@include flex-center;
				.text {
					color: #ffca3e;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}
			.footer {
				@include flex-center;
			}
		}
		
	}
</style>
