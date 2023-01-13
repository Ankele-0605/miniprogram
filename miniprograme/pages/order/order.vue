<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="我的订单" @clickLeft="goBack" />
		<!-- 搜素 -->
		<view class="search_input">
			<navigator url="/pages/search/search" open-type="navigate" class="navigator">
				<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
				<text class="iconfont icon-guanbi"></text> 搜索
			</navigator>
		</view>
		<!-- 我的订单 -->
		<view class="Grid">
			<view class="Grid-Item" v-for="item in myList" :key="item" @click="toCategory(item.num)">
				<view class="GStitle">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myList: [{
						num: 0,
						title: '全部',
					},

					{
						num: 0,
						title: '待付款',
					},

					{
						num: 0,
						title: '待发货',
					},

					{
						num: 0,
						title: '待收货',
					},
					{
						num: 0,
						title: '已完成',
					}
				],


			}
		},
		methods: {
				toCategory(e) {
					console.log(e);
					// 跳转分类页面
					uni.switchTab({
						// url: '/pages/category/category'
					});
		
				}
		
			},

	}
</script>

<style>
	/* 搜索 */
	.search_input {
		height: 60rpx;
		background-color: #CDCDCD;
		padding: 15rpx;
	}

	.search_input .navigator {
		background-color: #fff;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15rpx;
		color: #999;
		font-size: 32rpx;
	}

	/* 导航 */
	.Grid {
		/* width: 100%; */
		height: 400rpx;
		/* background-color: aqua; */
		display: flex;
		justify-content: space-around;
		flex-flow: wrap row;
		
	}
	.GStitle{
		margin-top: 30rpx;
		font-size: 30rpx;
	}
</style>
