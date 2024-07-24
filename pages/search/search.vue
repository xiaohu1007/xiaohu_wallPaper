<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索"
				v-model="queryParams.keyword">
			</uni-search-bar>
		</view>


		<view v-if="!classList.length || noSearch">
			<view v-if="historySearch.length" class="history">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>

			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>


		<view v-if="noSearch" class="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>


		<view v-else>
			<view class="list">
				<navigator @click="goPerview" :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classList" :key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="loadingLayout" v-if="noData || classList.length">
				<uni-load-more :status="noData?'noMore':'loading'" />
			</view>
		</view>


	</view>
</template>

<script setup>
import { apiSearchData } from '../../api/apis';
	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	//搜索历史词
	const historySearch = ref(uni.getStorageSync('historySearch') || []);

	//热门搜索词
	const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

	//没有更多
	const noData = ref(false);
	//没有搜索结果
	const noSearch = ref(false);

	//搜索结果列表
	const classList = ref([]);

	//点击搜索
	const onSearch = (e) => {
		initParams(e?.value);
		historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
		searchData(true);
	}
	
	watch(() => historySearch.value, (value) => {
		uni.setStorageSync('historySearch', value);
	})

	//点击清除按钮
	const onClear = () => {
		initParams();
	}
	
	const initParams = (value) => {
		classList.value = [];
		noData.value = false;
		noSearch.value = false;
		queryParams.value = {
			pageNum: 1,
			pageSize: 12,
			keyword: value || ''
		};
	}

	//点击标签进行搜索
	const clickTab = (value) => {
		onSearch({value});
	}

	//点击清空搜索记录
	const removeHistory = () => {
		uni.showModal({
			title: "是否清空历史搜索？",
			success: res => {
				if (res.confirm) {
					historySearch.value = [];
				}
			}
		})
	}
	
	const searchData = async () => {
		const res = await apiSearchData(queryParams.value);
		if (queryParams.value.pageSize > res.data.length) {
			noData.value = true;
		}
		classList.value = [...classList.value, ...res.data];
		if (classList.value.length == 0) {
			noSearch.value = true;
		}
	};
	
	const goPerview = () => {
		uni.setStorageSync('classList', classList.value);
	}

	//触底加载更多
	onReachBottom(() => {
		if (noData.value) return;
		queryParams.value.pageNum++;
		searchData();
	})

	//关闭有页面
	onUnload(() => {
		uni.removeStorageSync('classList');
	})
</script>

<style lang="scss" scoped>
	.searchLayout {
		.search {
			padding: 0 10rpx;
		}

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}

		.tabs {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tab {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 20rpx 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>