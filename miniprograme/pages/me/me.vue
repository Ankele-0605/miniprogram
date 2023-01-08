<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="用户中心" @clickLeft="toIndex" />
		<view class="top">
			<view class="topLeft">
				<view class="avatar">
					<image class="image" src="../../static/icon/avatar.png"></image>
				</view>
				<view class="wxuser">
					<text class="text">微信用户</text>
					<view class="refresh">
						<image class="image" src="@/static/user/refresh.png"></image>
						<text class="text">刷新</text>
					</view>
				</view>
			</view>
			<view class="topRight">
				<view class="code">
					<image class="payment" src="@/static/user/pay-code.png"></image>
					<text class="text">付款码</text>
				</view>
				<view class="address">
					<image class="image" src="@/static/user/address-white.png"></image>
					<text class="text">收货地址</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="my">
				<view v-for="(item, index) in myList" :index="index" :key="index" class="item">
					<view>
						<view class="num">{{item.num}}</view>
						<view class="explain">
							<image class="image" :src="item.url" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="canUse">
				<uni-grid :column="4" :show-border="false" :square="false" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in canUseList" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #fff;">
							<view class="num">{{item.num}}</view>
							<view class="explain">
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="order">
				<view class="title">
					<text class="myOrder">我的订单</text>
					<view class="more">
						<text class="text">查看更多</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<uni-grid :column="5" :show-border="false" :square="false" :highlight="true" @change="change">
					<uni-grid-item v-for="(item ,index) in orderList" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #fff;">
							<image class="image" :src="item.url" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
							<view v-if="item.badge" class="grid-dot">
								<uni-badge :text="item.badge" :type="item.type" />
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="serve">
				<uni-grid :column="4" :show-border="false" :square="false" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in serveList" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #fff;">
							<image class="image" :src="item.url" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
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
						url: '/static/user/favorite.png',
						text: '我的收藏',
					},
					{
						num: 0,
						url: '/static/user/foot.png',
						text: '我的足迹',
					},
				],
				canUseList: [{
						num: 0,
						url: '/static/user/icon-integral.png',
						text: '积分',
					},
					{
						num: "0.00",
						url: '/static/user/icon-balance.png',
						text: '余额',
					},
					{
						num: 0,
						url: '/static/user/icon-coupon.png',
						text: '优惠券',
					},
					{
						num: 0,
						url: '/static/user/icon-card.png',
						text: '卡券',
					},
				],
				orderList: [{
						url: '/static/order/icon-order-0.png',
						text: '待付款',
						badge: '1',
						type: "error"
					},
					{
						url: '/static/order/icon-order-1.png',
						text: '待发货',
						badge: '',
						type: "error"
					},
					{
						url: '/static/order/icon-order-2.png',
						text: '待收货',
						badge: '',
						type: "error"
					},
					{
						url: '/static/order/icon-order-3.png',
						text: '已完成',
						badge: '',
						type: "error"
					},
					{
						url: '/static/order/icon-order-4.png',
						text: '售后'
					}
				],

				serveList: [{
						url: '/static/serve/delete.png',
						text: '清理缓存',
					},
					{
						url: '/static/serve/service.png',
						text: '客服',
					},
					{
						url: '/static/serve/pay-dot.png',
						text: '充值中心',
					},
					{
						url: '/static/serve/balance.png',
						text: '余额记录',
					},
					{
						url: '/static/serve/coupon-icon.png',
						text: '我的优惠券',
					},
					{
						url: '/static/serve/coupon.png',
						text: '领券中心',
					},
					{
						url: '/static/serve/after-sale.png',
						text: '售后',
					},
					{
						url: '/static/serve/vip.png',
						text: '会员中心',
					},
				]
			}
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		justify-content: space-between;
		height: 280rpx;
		background: url('@/static/user/img-user-bg.png') center;
		background-size: cover;

		.topLeft {
			display: flex;
			align-items: center;

			.avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				margin: 0 10px 0 20px;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.wxuser {
				.text {
					color: #fff;
				}

				.refresh {
					display: inline-block;
					width: 55px;
					line-height: 18px;
					text-align: center;
					line-height: 20px;
					margin-left: 5px;
					border-radius: 15px;
					border: 1px solid #fff;

					.image {
						width: 12px;
						height: 12px;
						vertical-align: middle;
						margin-right: 4px;
					}

					.text {
						font-size: 10px;
						color: #fff;
					}
				}
			}
		}

		.topRight {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.code {
				margin-left: 40px;
				margin-top: 20px;

				.payment {
					display: block;
					width: 25px;
					height: 25px;
					margin-left: 3px;
				}

				.text {
					font-size: 12px;
					color: #fff;
				}

			}

			.address {
				margin-bottom: 15px;
				background-color: #ff4544;
				padding: 5px 8px;
				border-radius: 32px 0 0 32px;
				display: inline-block;

				.image {
					width: 20px;
					height: 20px;
					vertical-align: middle;
					margin-right: 5px;
				}

				.text {
					font-size: 14px;
					color: #fff;
				}
			}
		}
	}

	.content {
		height: 1000rpx;
		background-color: #f7f7f7;

		.my {
			display: flex;
			padding-bottom: 10px;

			.item::before {
				content: "|";
				position: absolute;
				top: 40%;
				left: 0;
				color: #94959E;
			}

			.item:first-child::before {
				display: none;
			}

			.item {
				flex: 1;
				position: relative;

				.num {
					text-align: center;
					margin-top: 5px;

				}

				.explain {
					text-align: center;

					.image {
						width: 20px;
						height: 20px;
						padding-right: 8px;
						vertical-align: middle;
					}

					.text {
						color: #515151;
						font-size: 14px;
						margin-top: 5px;
					}
				}
			}


		}

		.canUse {
			margin: 5px 10px 10px;

			.grid-item-box {
				flex: 1;
				// position: relative;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 5px 0;
				border-right: 1px solid #f4f4f4;

				.num {
					font-weight: 700;
					color: #ffbc43;
				}

				.explain {
					.image {
						width: 12px;
						height: 12px;
						padding-right: 5px;
						vertical-align: middle;
					}

					.text {
						color: #515151;
						font-size: 12px;
						margin-top: 5px;
					}
				}

			}

		}

		.order {
			margin: 5px 10px 10px;

			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #fff;
				padding-top: 5px;

				.myOrder {
					padding-left: 15px;
				}

				.more {
					padding-right: 10px;

					.text {
						color: #bbb;
						margin-right: 5px;
					}
				}
			}

			.grid-item-box {
				flex: 1;
				// position: relative;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 15px 0;

				.image {
					width: 30px;
					height: 30px;
				}

				.text {
					font-size: 12px;
					margin-top: 5px;
					color: #515151;
				}

				.grid-dot {
					position: absolute;
					top: 5px;
					right: 10px;
				}
			}
		}

		.serve {
			margin: 0 10px;
			border: 1px solid #f3f3f5;

			/deep/.uni-section {
				background-color: #f7f7f7;
			}

			.grid-item-box {
				flex: 1;
				// position: relative;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 13px 0;
			}

			.image {
				width: 24px;
				height: 24px;
			}

			.text {
				font-size: 12px;
				margin-top: 10px;
				color: #515151;
			}
		}
	}
</style>
