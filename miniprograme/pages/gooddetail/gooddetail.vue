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
				<!--  -->
				<view class="red">
					<!-- 价格 -->
					<view class="price">
						<text>￥{{item.price}}</text>
					</view>
					<!-- 分享链接 -->
					<view class="share" @click="toshare">
						<image class="image" src="@/static/icon/icon-share-white.png"></image>
						<text class="text">分享</text>
					</view>
				</view>
				<!-- 销量 -->
				<view class="sold_num">销量{{item.sold_num}}册</view>

			</view>

			<!-- 选择商品规格 -->
			<view class="choose_input" v-for="item in gooddetail" :key="item.id" @click="toggle('bottom',item.id)">
				<view class="choose_text">
					<text>选择</text>
				</view>
				<view class="guige">
					<text>请选择规格</text>
					<image src="@/static/icon/arrow-right.png" mode=""></image>
				</view>

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
					<view class="like">
						<image v-if="like" :src="likePitchOn" mode="" @click="likeCheck">
						</image>
						<image v-if="!like" :src="likeDefault" mode="" @click="likeCheck">
						</image>

						<text>收藏</text>
					</view>
				</view>

				<!-- 加入购物车，购买 -->
				<view class="tab__dot-box" v-for="item in gooddetail" :key="item.id" @click="toggle('bottom',item.id)">
					<!-- 加入购物车 -->
					<view class="tianjia">
						<text>加入购物车1</text>
					</view>
					<!-- 购买 -->
					<view class="goumai">
						<text>立即购买</text>
					</view>
				</view>
			</view>

			<!-- 弹窗 -->
			<view class="popup">
				<uni-popup ref="popup" background-color="#fff" :mask-click="false">
					<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
						<!-- 弹窗内容 -->
						<view class="des">
							<!-- 上 -->
							<view class="top">
								<view class="message" v-for="item in gooddetail" :key="item">
									<image :src="item.cover_pic" mode=""></image>
									<view class="number_message">
										<text class="price">￥{{item.price}}</text>
										<text class="kucun">库存：500</text>
									</view>
								</view>
								<view class="close" @click="closepop">
									<uni-icons type="closeempty" size="30" color="#aaaaaa"></uni-icons>
								</view>
							</view>
							<!-- 中 -->
							<view class="middle">
								<text>规格</text>
								<button size="mini" type="warn">默认规格</button>
							</view>
							<!-- 下 -->
							<view class="bottom">
								<view class="numder">
									<view class="suliang">
										<text>数量</text>
									</view>
									<uni-number-box @change="changeValue" />
								</view>
								<view class="btn">
									<view class="tianjia">
										<text>加入购物车</text>
									</view>
									<view class="goumai">
										<text>立即购买</text>
									</view>
								</view>
							</view>
						</view>

					</view>
				</uni-popup>
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

				likeDefault: "../../static/icon/icon-favorite.png", // 默认图标
				likePitchOn: "../../static/icon/icon-favorite-active.png", // 选中图标
				like: false, // 默认false

				type: 'center',
			}
		},
		onLoad(options) {
			// this.id = options.id;
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
			// 加入收藏
			async addCollection() {
				let result = await axiosGet("/api/addCollection/" + 69);
				console.log(result)
			},
			//点击跳转购物车页面
			circleClick() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			//点击跳转到首页
			homeClick() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//点击实现收藏，取消收藏(图标变色)
			likeCheck() {
				let like = this.like;
				console.log(this.like, "this.like");
				if (like) {
					this.like = false;
				} else {
					this.like = true;
					this.addCollection();
				}
			},
			//点击(选择商品规格，)实现弹窗
			toggle(type, id) {
				this.id = id;
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			//点击关闭弹窗
			closepop() {
				this.$refs.popup.close()
			},
			//点击选择书籍数量
			change(value) {
				this.numberValue = value
			},

		}
	}
</script>

<style lang="less">
	.gooddetail {
		font-size: 33rpx;
		background-color: #f6f6f6;

		.cover image {
			height: 688rpx;
			width: 100%;
		}

		.good_info {
			background: #fff;
			margin: 8px;
			border-radius: 10rpx;

			.goods_title {
				font-size: 40rpx;
			}

			.red {
				display: flex;
				flex-direction: row;

				.price {
					color: red;
					font-weight: 600;
					font-size: 60rpx;
					line-height: 60rpx;
					margin: 30rpx 10rpx;
				}

				.share {
					height: 16px;
					margin: 24rpx 0rpx 10rpx 330rpx;
					background-color: #ff4544;
					padding: 5px;
					border-radius: 30px 0 0 30px;
					display: inline-block;

					.image {
						width: 16px;
						height: 16px;
						vertical-align: middle;
						margin-right: 5px;
						margin-bottom: 4px;
					}

					.text {
						font-size: 14px;
						color: #fff;
					}
				}
			}


			.sold_num {
				color: #9b9b9b;
			}

		}

		.choose_input {
			height: 26px;
			background-color: #fff;
			margin: 30rpx 20rpx;
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;

			.choose_text {
				color: #9b9b9b;
				margin: 0 10px 0 4px;
			}

			.guige {
				display: flex;
				flex-direction: row;

				image {
					width: 10px;
					height: 10px;
					margin: 8px 2px 4px 180px;
				}
			}
		}

		.pingjia {
			height: 26px;
			background-color: #fff;
			margin: 30rpx 20rpx;
			border-radius: 10rpx;
		}

		.good_detail {
			margin: 22rpx;

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
				.like {
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
				margin: 24rpx 44rpx;

				.tianjia {
					background-color: #feb710;
					width: 240rpx;
					border-radius: 20px 0 0 20px;
				}

				.goumai {
					background-color: #fc162d;
					width: 240rpx;
					border-radius: 0 20px 20px 0;
				}
			}
		}

		.popup-content {
			height: 280px;

			.des {
				display: flex;
				flex-direction: column;
				color: #757575;
				font-size: 13px;

				.top {
					display: flex;
					flex-direction: row;

					.message {
						display: flex;
						flex-direction: row;

						image {
							width: 100px;
							height: 100px;
						}

						.number_message {
							display: flex;
							flex-direction: column;
							margin: 33px 0;

							.price {
								font-size: 14px;
								color: #ff4639;
							}

							.kucun {
								color: #9b9b9b;
							}
						}
					}

					.close {
						margin: 8px 10px 0 110px;
					}
				}

				.middle {
					border: 1px solid #ccc;
					display: flex;
					flex-direction: column;
					padding: 8px;
					margin-bottom: 5px;

					button {
						margin: 10px 210px 5px 0px;
					}
				}

				.bottom {
					display: flex;
					flex-direction: column;

					.numder {
						display: flex;
						flex-direction: row;
						padding: 10px;

						.suliang {
							margin: 3px 170px 0px 0px;
						}

					}

					.btn {
						display: flex;
						flex-direction: row;
						font-size: 15px;
						line-height: 24px;
						text-align: center;
						color: #fff;

						.tianjia,
						.goumai {
							background-color: #feb710;
							width: 140px;
							height: 30px;
							border-radius: 20px;
							margin: 10px;
						}

						.tianjia {
							background-color: #feb710;
						}

						.goumai {
							background-color: #fc162d;
						}
					}
				}
			}
		}

	}
</style>
