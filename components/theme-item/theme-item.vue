<template>
	<view class="theme-item">
		<navigator v-if="!isMore" class="box" :url="`/pages/classList/classList?classid=${data._id}&name=${data.name}`">
			<image class="pic" :src="data?.picurl" mode="aspectFill"></image>
			<view class="mask">
				{{ data?.name || ''}}
			</view>
			<view class="tab">
				{{ timeDifference(data?.updateTime) || '超出3个月' }}
			</view>
		</navigator>
		
		<navigator v-else class="box more" open-type="reLaunch" url="/pages/classify/classify">
			<image class="pic" :src="data?.picurl"  mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { timeDifference } from '@/utils/utils';
	
const props = defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: () => ({})
	}
})

	
</script>

<style lang="scss" scoped>
	.theme-item {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			.pic {
				width: 100%;
				height: 100%;
				background-color: #333;
			}
			.mask {
				@include flex-center;
				position: absolute;
				width: 100%;
				height: 70rpx;
				bottom: 0%;
				left: 0%;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);
				font-weight: 600;
				font-size: 30rpx;
			}
			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background-color: $brand-tab-color;
				color: #fff;
				font-size: 22rpx;
				backdrop-filter: blur(20rpx);
				padding: 6rpx 10rpx;
				border-radius: 0 0 10rpx 0;
				transform: scale(0.8);
				transform-origin: left top;
			}
			
			&.more {
				flex-direction: column;
				.mask {
					width: 100%;
					height: 100%;
				}
				.text {
					font-size: 28rpx;
				}
			}
		}
	}
</style>