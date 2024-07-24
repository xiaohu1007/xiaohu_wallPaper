<template>
	<view class="userLayout pageBg" v-if="userInfo">
		<view :style="`height: ${navBarHeight}px;`"></view>
		<view class="userInfo">
			<view class="avatar">
				<image src="" mode="aspectFill"></image>
			</view>
			<view class="ip">
				{{userInfo?.IP}}
			</view>
			<view class="address">
				来自于：{{userInfo?.address?.city || userInfo?.address?.province ||userInfo?.address?.country}}
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<user-option-item
					v-for="item in list.slice(0, 3)"
					:key="item.id"
					:option="formatNumItem(item, (userInfo?.[item.numKey] || 0))"
				>
					<template #concat>
						<view class="btn-bar">
							<uni-icons :type="item.icon" size="20"></uni-icons>
							<button open-type="contact" class="text text-btn">
								{{ item.name }}
							</button>
						</view>
					</template>
				</user-option-item>
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<user-option-item
					v-for="item in list.slice(3)"
					:key="item.id"
					:option="item"
				></user-option-item>
			</view>
			
		</view>
	</view>
	<uni-load-more v-else status="loading"></uni-load-more>
</template>

<script setup>
import { apiUserInfo } from '../../api/apis';
import useMpSystem from '../../hooks/useMpSystem';
const { navBarHeight } = useMpSystem();

const formatNumItem = (item, value) => {
	return {
		...item,
		num: value,
	}
};
	
let concatBtn = {
	id: 3,
	name: '联系客服',
	icon: 'chatboxes-filled',
	callback: () => {},
	numKey: '',
	leftSlot: 'concat',
};

const userInfo = ref(null);
const getUserInfo = async () => {
	const res = await apiUserInfo();
	userInfo.value = res.data;
}

// #ifdef H5
concatBtn.name = '拨打电话';
concatBtn.callback = () => {
	uni.makePhoneCall({
		phoneNumber: '114'
	})
};

// #endif
const list = ref([
	{
		id: 1,
		name: '我的下载',
		icon: 'download-filled',
		callback: () => {
			uni.navigateTo({
				url: '/pages/classList/classList?name=我的下载&type=download'
			});
		},
		numKey: 'downloadSize',
	},
	{
		id: 2,
		name: '我的评分',
		icon: 'download-filled',
		callback: () => {
			uni.navigateTo({
				url: '/pages/classList/classList?name=我的评分&type=score'
			});
		},
		numKey: 'scoreSize',
	},
	concatBtn,
	{
		id: 4,
		name: '订阅更新',
		icon: 'notification-filled',
		callback: () => {},
	numKey: '',
	},
	{
		id: 5,
		name: '常见问题',
		icon: 'flag-filled',
		callback: () => {
			uni.navigateTo({
				url: `/pages/notice/detail?id=6536358ce0ec19c8d67fbe82`
			});
		},
		numKey: '',	
	},
]);
	
onLoad((query) => {
	console.log('onload');
});

onReady(() => {
	console.log('onReady');
});

onShow(() => {
	console.log('onShow');
});

onUnmounted(() => {
	console.log('onUnmounted');
})

onUnload(() => {
	console.log('onUnload');
});

onMounted(() => {
	getUserInfo();
	console.log('onMounted');
})

onHide(() => {
	console.log('onHide');
});

onPageScroll((e) => {
	console.log(e, 'scroll');
})

onReachBottom((e) => {
	console.log(e, 'reachBottom');
});

</script>

<style lang="scss" scoped>
	.userInfo {
		@include flex-center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
				background-color: #333;
			}
		}
		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}
	
	.section {
		width: calc(100% - 60rpx);
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		background-color: #fff;
		.btn-bar {
			display: flex;
			align-items: center;
		}
		:deep(uni-button),
		.text-btn {
			display: inline-block;
			width: auto;
			height: auto;
			border: 0;
			background-color: transparent;
			font-size: 32rpx;
			color: #666;
			padding: 0;
			padding-left: 20rpx;
			&::after {
				display: none;
			}
		}
	}	
	
</style>
