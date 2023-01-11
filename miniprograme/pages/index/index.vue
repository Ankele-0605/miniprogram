<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar title="首页" />
		<view class="search_input">
			<navigator url="/pages/search/search" open-type="navigate" class="navigator">
				<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
				<text class="iconfont icon-guanbi"></text> 搜索
			</navigator>
		</view>
		<!-- 命运 -->
		<view class="title">
			—— <span class="zi">&nbsp;！知识改变命运 &nbsp; ！&nbsp;</span>——
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" class="lunbo">
			<swiper-item v-for="item in swiperList" :key="item">
				<image :src="item" mode="widthFix" class="slide-image" style="width: 100%;height:100%"></image>
			</swiper-item>
		</swiper>
		<!-- 宫格 -->
		<view class="Grid">
			<view class="Grid-Item" v-for="item in myList" :key="item" @click="toCategory(item.num)">
				<view class="GSimg">
					<image class="Image" :src="item.url"></image>
				</view>
				<view class="GStitle">{{ item.title }}</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="xin">
			为你推荐
			<span class="yi">|&nbsp;&nbsp;&nbsp;最合你心意</span>
		</view>
		<!-- 商品列表 -->

		<!-- 地图 -->
		<view class="map">
			<map :scale="scale" style="width: 100%; height: 500rpx;" enable-3D="false" show-compass="false"
				:latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>

	</view>
</template>

<script>
	import {
		axiosGet
	} from '@/common/js/http.js'
	export default {
		data() {
			// 轮播图
			return {
				swiperList: [
					"http://localhost:8888/public/images/lunbo1.png",
					"http://localhost:8888/public/images/lunbo3.png",
					"http://localhost:8888/public/images/lunbo2.png",
				],
				// 宫格
				myList: [{
						num: 0,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '小学系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 1,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '初中系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 2,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '高系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 3,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '中考系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 4,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '高考系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 5,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '名著系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 6,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '字帖系列',
						pageUrl: '/pages/category/category'
					},
					{
						num: 7,
						url: "http://localhost:8888/public/images/1.jpg",
						title: '报刊系列',
						pageUrl: '/pages/category/category'
					}
				],
				// 地图
				id: 1,
				title: '1', // String-标注点名
				rotate: 180, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
				alpha: 0.5, // 默认1，无透明，范围 0 ~ 1
				latitude: 25.532816,
				longitude: 113.684727,
				covers: [{
					latitude: 25.532816,
					longitude: 113.6847276,
					iconPath: '/static/summary-map.png',

				}, {
					latitude: 25.532816,
					longitude: 113.6847276,
					iconPath: '/static/summary-map.png',
				}],

			}

		},



		// methods: {
		// 	async getGoods() {
		// 		let result = await axiosGet("/api/goods");
		// 		console.log(result, 'xxxxxx');
		// 		if (+result.code === 200) {
		// 			this.goodlist = result.data
		// 		}
		// 	},

		methods: {
			toCategory(e) {
				console.log(e);
				// 跳转分类页面
				uni.switchTab({
					url: '/pages/category/category'
				});

			}

		},

	}



	// 	created() {
	// 		this.getGoods();
	// 	}
	// },
</script>

<style>
	/* 搜索框 */
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

	/* 命运 */
	.title {
		height: 35px;
		background-color: #ADEAEA;
		text-align: center;
		line-height: 30px;
	}

	.title .zi {
		color: #7F00FF;
		font-family: "楷体";
	}

	/* 轮播图 */
	.lunbo {
		width: 100%;
		height: 390rpx;
	}

	/* 宫格 */
	.Grid {
		width: 100%;
		height: 400rpx;
		/* background-color: aqua; */
		display: flex;
		justify-content: space-around;
		flex-flow: wrap row;
	}

	.Grid-Item {
		/* min-width: 17%;  */
		padding: 10rpx;
		margin-top: 10rpx;
		/* 上间隔 */
		margin-left: 2rpx;
		/* 左间隔 */
	}

	.GStitle {
		font-size: 28rpx;
		text-align: center;
		font-family: "宋体";
	}

	.Image {
		height: 130rpx;
		width: 130rpx;
	}

	/* 心意 */
	.xin {
		height: 160rpx;
		/* background-color: aquamarine; */
		line-height: 180rpx;
		font-size: 40rpx;
		margin-left: 22rpx;
		font-weight: bold;
	}

	.yi {
		font-size: 25rpx;
		color: #A8A8A8;
	}

	/* 地图 */
	.map {
		width: 690rpx;
		height: 540rpx;
		margin-left: 30rpx;
		margin-top: 15rpx;
	}
</style>
