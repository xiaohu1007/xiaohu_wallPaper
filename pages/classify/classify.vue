<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="(item,index) in classifyList" :data="item" :key="item._id"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { apiGetClassify } from '@/api/apis';
const classifyList = ref([]);
const getClassifyList = async () => {
	const res = await apiGetClassify({pageNum: 1, pageSize: 15}, {});
	classifyList.value = res?.data || [];
}

onMounted(() => {
	getClassifyList();
})
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>
