<template>

	<view>
		<!-- 页头 -->
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="商品详情" @clickLeft="goBack" />

		<!-- 详情页主要内容 -->
		<view class="gooddetail">

			<!-- 商品封面 -->
			<view class="cover" v-for="item in gooddetail" :key="item.id">
				<image :src="item.cover_pic" mode="aspectFill"></image>
			</view>

			<!-- 商品大致信息 -->
			<view class="good_info" v-for="item in gooddetail" :key="item.id">
				<!-- 名字 -->
				<view class="goods_title">{{item.name}}</view>
				<!-- 价格 -->
				<view class="price">
					<text>￥{{item.price}}</text>
				</view>
				<!-- 销量 -->
				<view class="sold_num">销量{{item.sold_num}}册</view>

				<!-- 分享链接 -->
				<view class="share" @click="toshare">
					<image class="image" src="@/static/icon/icon-share-white.png"></image>
					<text class="text">分享</text>
				</view>
			</view>

			<!-- 选择商品规格 -->
			<view class="choose">
				<text>选择</text>
			</view>

			<!-- 评价 -->
			<view class="pingjia">
				<text>暂无评价</text>
			</view>

			<!-- 商品详情信息 -->
			<view class="good_detail">
				<view class="tit">
					<img src="@/static/icon/goods-detail.png" alt="">
				</view>
				<!-- 商品内容图片 -->
				<view class="cover" v-for="item in detail_pic" :key="item">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>

			<!-- 固定-跳转购物车 -->
			<view class="circle_cart" @click="circleClick">
				<image src="@/static/icon/cats.png" mode="aspectFill"></image>
			</view>

			<!-- 页尾-商品导航 -->
			<view class="good-carts-nav">
				<!-- 图标 -->
				<view class="tab__icons">
					<!-- 首页 -->
					<view class="home" @click="homeClick">
						<image src="@/static/icon/icon-index.png" mode=""></image>
						<text>首页</text>
					</view>
					<!-- 收藏 -->
					<view class="heart">
						<image v-if="Heart"  :src="heartPitchOn" mode="" @click="heartCheck" >
						</image>
						<image v-if="!Heart"  :src="heartDefault" mode="" @click="heartCheck">
						</image>
						
						<text>收藏</text>
					</view>
				</view>

				<!-- 加入购物车，购买 -->
				<view class="tab__dot-box">
					<!-- 加入购物车 -->
					<view class="tianjia">
						<text>加入购物车</text>
					</view>
					<!-- 购买 -->
					<view class="goumai">
						<text>立即购买</text>
					</view>
				</view>
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
				gooddetail: [], //商品信息
				detail_pic: [], //商品信息中的数组detail_pic
				
				heartDefault: "../../static/icon/icon-favorite.png", // 默认图标
				heartPitchOn: "../../static/icon/icon-favorite-active.png", // 选中图标
				Heart: false, // 默认false
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
			// 根据商品id获取商品
			async getGood() {
				let result = await axiosGet("/api/getGoodsById/" + 69);
				console.log(result)
				if (+result.code === 200) {
					this.gooddetail = result.data; //获取商品信息
					this.detail_pic = result.data[0].detail_pic; //获取商品信息中的数组detail_pic
				}
			},
			//点击跳转购物车页面
			circleClick() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			//点击跳转到首页
			homeClick(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//点击实现收藏，取消收藏(图标变色)
			heartCheck() {
				let Heart = this.Heart;
				console.log(this.Heart, "this.Heart");
				if (Heart) {
					this.Heart = false;
				} else {
					this.Heart = true;
				}
			},

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
				color: #9b9b9b;
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
			color: #9b9b9b;
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

		.good-carts-nav {
			width: 100%;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			position: fixed;
			left: 0;
			right: 0;
			left: var(--window-left);
			right: var(--window-right);
			bottom: 0;

			.tab__icons {
				display: flex;
				flex-direction: row;

				.home,
				.heart {
					display: flex;
					flex-direction: column;
					margin: 20rpx;

					image {
						width: 44rpx;
						height: 38rpx;
					}
					text {
						font-size: 10px;
						color: #9b9b9b;
					}
				}
			}

			.tab__dot-box {
				display: flex;
				flex-direction: row;
				color: #fff;
				font-size: 35rpx;
				line-height: 70rpx;
				text-align: center;
				margin: 24rpx  44rpx;
				
				.tianjia {
					background-color: #feb710;
					width: 240rpx;
					border-radius: 20px 0 0 20px;
				}
				.goumai {
					background-color: #fc162d;
					width: 240rpx;
					border-radius:0 20px 20px 0;
				}
			}
		}

	}
</style>
