<template>
	<view class="classListLayout">
		<uv-skeletons v-if="loading" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		<z-paging auto-show-back-to-top v-bind="pagingOptions" ref="paging"  v-model="classList"  @query="queryList">			
			<view class="content">
				<navigator
					:url="`/pages/preview/preview?id=${item._id}`"
					class="item"
					v-for="(item, index) in classList"
					:id="`zp-id-${index}`"
					:key="index"
				>
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<template #loadingMoreLoading>
				<uni-load-more :iconSize="20" status="loading"></uni-load-more>
				<view class="safe-area-inset-bottom"></view>
			</template>
			<template #loadingMoreNoMore>
				<uni-load-more status="noMore"></uni-load-more>
				<view class="safe-area-inset-bottom"></view>
			</template>
		</z-paging>
	</view>
</template>

<script setup>
import { nextTick, onMounted, watch } from 'vue';
import { apiGetClassList, apiUserWallList } from '../../api/apis';
import { gotoHome } from '../../utils/utils';

const loading = ref(true);
const skeleton = ref([
	{
		type: 'flex',
		style: 'display: grid;grid-template-columns: repeat(3, 1fr);gap: 5rpx;',
		num: 4,
		gap: 5,
		children: [{
			type: 'custom',
			style: 'height: 440rpx;',
		},
		{
			type: 'custom',
			style: 'height: 440rpx;',
		},
		{
			type: 'custom',
			style: 'height: 440rpx;',
		}]
	},
]);

const classList = ref([]);
const paging = ref();

const pagingOptions = ref({
	'default-page-no': 1,
	'default-page-size': 12,
	'auto': false,
});

let classid = '';
let titleName = '';
let type = '';

const queryList = (pageNum, pageSize) => {
	let api = apiGetClassList;
	const params = {
		pageNum,
		pageSize
	}
	if (type) {
		api = apiUserWallList;
		params.type = type;
	} else {
		params.classid = classid;
	}
	
	api(params).then(res => {
		if (!!loading.value) {
			loading.value = false;
		}
		paging.value.complete(res?.data || []);
	}).catch(err => {
		if (!!loading.value) {
			loading.value = false;
		}
		paging.value.complete(false);
	});
};

onLoad((query) => {
	classid = query.classid;
	type = query.type
	
	if (!classid & !type) {
		gotoHome();
	}
	titleName = query.name;
	uni.setNavigationBarTitle({
		title: query.name
	})
});

watch(() => paging.value, (value) => {
	value.reload();
});

watch(() => classList.value, () => {
	uni.setStorageSync("classList", classList.value);
})

// 分享好友
onShareAppMessage((e) => {
	return {
		title: `小虎壁纸查看器-${titleName}`,
		path: `/pages/classList/classList?id=${classid}&name=${titleName}`
	}
});

// 分享朋友圈
onShareTimeline((e) => {
	return {
		title: `小虎壁纸查看器-${titleName}`,
		query: `id=${classid}&name=${titleName}`
	}
});

onUnload(() => {
	uni.removeStorageSync('classList');
})
	
</script>

<style lang="scss" scoped>
	.classListLayout {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			.item {
				height: 440rpx;
				image {
					width: 100%;
					height: 100%;
					background-color: linear-gradient(90deg, #F1F2F4 25%, #e6e6e6 37%, #F1F2F4 50%);
				}
			}
		}
	}
</style>
