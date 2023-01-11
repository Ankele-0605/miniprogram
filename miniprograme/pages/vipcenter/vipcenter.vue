<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="会员中心" @clickLeft="goBack" />
		<view class="content">
			<view class="one">
				<view class="avatar">
					<image class="image" src="@/static/icon/avatar.png" mode="widthFix"></image>
				</view>
				<view class="detail">
					<text class="text">微信用户</text>
					<view class="grade">
						<image class="image" src="@/static/serve/vip/icon-member.png" mode="widthFix"></image>
						<text class="text">普通用户</text>
					</view>
				</view>
			</view>
			<view class="two">
				<view class="left">
					<text class="text">账户余额</text>
					<text class="num">￥ {{balance}}</text>
				</view>
				<view class="right" @click="toVoucherPage">
					<text>去充值</text>
				</view>
			</view>
			<view class="three">
				<image class="image" src="@/static/serve/vip/card-member-0.png" mode="widthFix"></image>
				<view class="cover">
					<image class="image" src="@/static/serve/vip/card-bottom.png" mode="widthFix"></image>
					<view class="fill">
					</view>
				</view>
				<view class="fore">
					<image class="image" src="@/static/serve/vip/banner.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: '0'
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			toVoucherPage() {
				uni.navigateTo({
					url: '/pages/voucherCenter/voucherCenter',
					animationType: 'none'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #292a31;

		.one {
			height: 80px;
			display: flex;
			align-items: center;

			.avatar {
				.image {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					margin: 0 20px;
				}
			}

			.detail {
				.text {
					color: #fff;
				}

				.grade {
					background-color: #454955;
					height: 18px;
					border-radius: 10px;
					line-height: 18px;
					margin-top: 5px;

					.image {
						width: 20px;
						height: 20px;
						vertical-align: middle;
					}

					.text {
						font-size: 12px;
						color: #fff;
						margin: 2px 5px;
					}
				}
			}
		}

		.two {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 650rpx;
			height: 80px;
			margin: 0 auto 13px;
			background-color: #454955;
			border-radius: 8px;

			.left {
				margin-left: 20px;
				color: #fff;

				.text {
					display: block;
					font-size: 10px;
				}

				.num {
					font-size: 20px;
				}
			}

			.right {
				width: 65px;
				height: 26px;
				line-height: 26px;
				border: 1px solid #fff;
				border-radius: 15px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				margin-right: 20px;
			}
		}

		.three {
			position: relative;
			text-align: center;
			height: 180px;

			.image {
				width: 650rpx;
				border-radius: 10px;
			}

			.cover {
				height: 44px;
				position: absolute;
				bottom: 20px;
				left: 0;

				.image {
					width: 750rpx;
					border-radius: 0;

				}

				.fill {
					width: 750rpx;
					height: 25px;
					position: absolute;
					bottom: -20px;
					left: 0;

					background-color: #fff;
				}
			}



		}

		.fore {
			background-color: #fff;
			margin: auto;

			.image {
				margin-top: 30px;
				width: 660rpx;
			}

		}
	}
</style>
