<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="商品详情" @clickLeft="goBack" />

		<view class="gooddetail">
			<view class="cover" v-for="item in gooddetail" :key="item.id">
				<image :src="item.cover_pic" mode="aspectFill"></image>
			</view>

			<view class="good_info" v-for="item in gooddetail" :key="item.id">
				<view class="goods_title">{{item.name}}</view>
				<view class="price">
					<text>￥{{item.price}}</text>
				</view>
				<view class="sold_num">销量{{item.sold_num}}册</view>
				<view class="share" @click="toshare">
					<image class="image" src="@/static/icon/icon-share-white.png"></image>
					<text class="text">分享</text>
				</view>
			</view>

			<view class="choose">
				<text>选择</text>
			</view>

			<view class="pingjia">
				<text>暂无评价</text>
			</view>

			<view class="good_detail">
				<view class="tit">
					<img src="@/static/icon/goods-detail.png" alt="">
				</view>
				<view class="cover" v-for="item in detail_pic" :key="item">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>

			<view class="circle_cart" @click="circleClick">
				<image src="@/static/icon/cats.png" mode="aspectFill"></image>
			</view>

			<view class="good-carts">
				<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		axiosGet
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				gooddetail: [],
				detail_pic: [],
				options: [{
					icon: 'home',
					text: '首页',

				}, {
					icon: 'heart',
					text: '收藏',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			}
		},
		onLoad(options) {
			this.getGood();
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 2
				});
			},
			async getGood() {
				let result = await axiosGet("/api/getGoodsById/" + 69);
				console.log(result)
				if (+result.code === 200) {
					this.gooddetail = result.data;
					this.detail_pic = result.data[0].detail_pic;
				}
			},

			circleClick(e) {
				console.log(e)
			},
			onClick(e) {
				console.log(e)
				if (e.index == 0) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			buttonClick(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="less">
	.gooddetail {
		font-size: 33rpx;

		.cover image {
			height: 688rpx;
			width: 100%;
		}

		.good_info {
			padding: 10px;

			.goods_title {
				font-size: 40rpx;
			}

			.price {
				color: red;
				font-weight: 600;
				font-size: 60rpx;
				line-height: 60rpx;
				margin: 30rpx 10rpx;
			}

			.sold_num {
				color: #ccc;
			}

			.share {
				margin: 0 0 0 550rpx;
				background-color: #ff4544;
				padding: 5px;
				border-radius: 30px 0 0 30px;
				display: inline-block;

				.image {
					width: 16px;
					height: 16px;
					vertical-align: middle;
					margin-right: 5px;
				}

				.text {
					font-size: 14px;
					color: #fff;
				}
			}
		}

		.choose {
			color: #ccc;
			margin: 10rpx 20rpx 60rpx;
		}

		.pingjia {
			margin: 20rpx;
		}

		.good_detail {
			margin: 30rpx;

			.tit image {
				height: 80rpx;
				width: 100%;
			}
		}

		.circle_cart {
			width: 100rpx;
			height: 100rpx;
			background-color: #aeaeae;
			position: fixed;
			right: 0;
			right: var(--window-right);
			top: 200rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.good-carts {
			display: flex;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			left: var(--window-left);
			right: var(--window-right);
			bottom: 0;
		}
	}
</style>
