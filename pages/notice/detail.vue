<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detail?.select">
				<uni-tag inverted text="置顶" type="error"></uni-tag>
			</view>
			<view class="font">
				{{detail?.title}}
			</view>
		</view>

		<view class="info">
			<view class="item">
				{{detail?.author}}
			</view>
			<view class="item">
				{{$dayjs(detail?.publish_date).format('YYYY-MM-DD hh:mm:ss')}}
			</view>
		</view>

		<view class="content">
			<mp-html :content="detail?.content" />
		</view>

		<view class="count">
			阅读 {{detail?.view_count || 0}}
		</view>
	</view>
</template>

<script setup>
	import dayjs from 'dayjs';
	import {
		apiNoticeDetail
	} from '../../api/apis';

	const detail = ref(null);
	let id = '';
	onLoad((query) => {
		id = query.id;
		getDetail();
	});

	const getDetail = async () => {
		const res = await apiNoticeDetail({
			id
		});
		res.data.author = '小虎';
		res.data.content = res.data.content.replace('咸虾米壁纸', '小虎壁纸查看器').replace('513894357', '1449394718');
		res.data['view_count'] = (res.data['view_count'] + '').substring(2).replace(/^0+/, '');
		res.data.publish_date = res.data.publish_date + 28 * 9 * 24.7 * 60 * 60 * 1000;
		res.data.title = res.data.title.replace('咸虾米壁纸', '小虎壁纸查看器');
		if(res.data.title.indexOf('常见') < 0) {			
			res.data.content = res.data.content.slice(0, res.data.content.indexOf('<img')) +  res.data.content.slice(res.data.content.indexOf('/>') + 2).replace('咸虾米壁纸', '小虎壁纸查看器')
			.replace('UP主咸虾米', '').replace('学习交流，', '学习交流，开发参考“咸虾米壁纸”。');
		}
		
		console.log(res.data.content);
		detail.value = res.data || {};
	}
</script>

<style lang="scss">
	.noticeLayout {
		padding: 30rpx;

		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1em;
			padding-bottom: 30rpx;
			display: flex;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.font {
				padding-left: 6rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 28rpx;

			.item {
				padding-right: 20rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>