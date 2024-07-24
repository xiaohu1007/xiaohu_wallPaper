<template>
	<view class="navLayout">
		<view class="navBar pageBg">
			<view class="statusBar" :style="{height: statusBarHeight + 'px', width: '100%'}"></view>
			<view class="titleBar" :style="{ height: titleBarHeight + 'px', marginLeft: leftIconLeft + 'px'}">
				<view class="title">
					{{ title }}
				</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		
		<view class="fill" :style="{height: navBarHeight + 'px', width: '100%'}"></view>
	</view>
</template>

<script setup>
	import useMpSystem from "@/hooks/useMpSystem.js";
	const { statusBarHeight, titleBarHeight, navBarHeight, leftIconLeft } = useMpSystem();
	
	const props = defineProps({
		title: {
			type: String,
			default: ''
		}
	});
	
</script>

<style lang="scss" scoped>
.navLayout {
	.navBar {
		&.pageBg{
			min-height: auto;
		}
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		.statusBar {
			
		}
		.titleBar {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			.title {
				font-size: 40rpx;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background-color: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon {
					margin-left: 5rpx;
				}
				.text {
					color: #888;
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>