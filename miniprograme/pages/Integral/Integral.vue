<template>
	<view class="main">
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="积分商城" @clickLeft="goBack" />
		<view class="top">
			<view class="my">
				<view class="text">
					<text>我的积分</text>
					<image class="image" src="@/static/serve/balance/balance-icon.png" mode="widthFix"></image>
				</view>
				<text class="num">{{integral}}</text>
			</view>
			<view class="detail">
				<view class="exchange">
					<image class="image" src="@/static/icon/exchange.png" mode=""></image>
					<text class="text">我的兑换</text>
				</view>
				<view class="payment">
					<image class="image" src="@/static/icon/firm2.png" mode=""></image>
					<text class="text">积分收支</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">
				<text class="text">优惠券专区</text>
			</view>
			<view class="all">
				<text class="text">全部</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integral: 0
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		display: flex;
		height: 100vh;
		flex-direction: column;

		.top {
			background-color: #4c3f36;

			.my {
				text-align: center;

				.text {
					font-size: 12px;
					color: #ccc;
					padding: 10px;

					.image {
						width: 16px;
						height: 16px;
						margin-left: 10px;
					}
				}

				.num {
					font-size: 20px;
					color: #d1a577;

				}
			}

			.detail {
				height: 60px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.exchange {
					.image {
						width: 20px;
						height: 20px;
						vertical-align: top;
					}

					.text {
						color: #fff;
						margin-left: 5px;
					}
				}

				.payment {
					.image {
						width: 26px;
						height: 26px;
						vertical-align: middle;
					}

					.text {
						color: #fff;
					}
				}
			}
		}

		.content {
			flex: 1;
			background-color: #f7f7f7;
			border-top: 10px solid #f7f7f7;

			.title {
				padding: 10px;
				background-color: #fff;

				.text {
					height: 16px;
					line-height: 16px;
					margin: 10px;
					padding-left: 12px;
					font-size: 14px;
					color: #333;
					border-left: 2px solid red;
				}
			}

			.all {
				padding: 10px;
				background-color: #fff;
				border-top: 3px solid #f7f7f7;

				.text {
					height: 16px;
					background-color: #ff4544;
					line-height: 16px;
					margin: 10px;
					padding: 5px 10px;
					font-size: 12px;
					color: #fff;
					border-radius: 16px;
				}
			}
		}
	}
</style>
