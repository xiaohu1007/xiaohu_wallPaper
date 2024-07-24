<template>
	<view class="row" @click="props.option.callback">
		<view class="left">
			<slot v-if="props.option.leftSlot" :name='props.option.leftSlot'></slot>
			<template v-else>
				<uni-icons :type="props.option.icon" size="20"></uni-icons>
				<view class="text">
					{{ props.option.name }}
				</view>
			</template>
		</view>
		<view class="right">
			<slot v-if="props.option.rightSlot" :name='props.option.rightSlot'></slot>
			<template v-else>
				<view v-if="!!props.option.num" class="text">{{ props.option.num }}</view>
				<uni-icons type="right" size="15" color="#aaa"></uni-icons>
			</template>
		</view>
	</view>
</template>

<script setup>
	
const props = defineProps({
	option: {
		type: Object,
		default: () => ({
			id: 1,
			name: '',
			icon: '',
			callback: () => {},
			num: 0,
			leftSlot: false,
			rightSlot: false
		})
	}
});

</script>

<style lang="scss" scoped>
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 100rpx;
		border: 1px solid #eee;
		border-radius: 10rpx;
		&:last-child {
			border-bottom: 0;
		}
		.left, .right {
			display: flex;
			align-items: center;
		}
		.left {
			:deep(uni-text) {
				color: $brand-theme-color !important;
			}
			.text {
				padding-left: 20rpx;
				color: #666;
			}
		}
		.right {
			.text {
				padding-left: 28rpx;
				color: #aaa;
			}
		}
	}  
</style>