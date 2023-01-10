<template>
	<view class="main">
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="" @clickLeft="goBack" />
		<view class="myCount">
			<view class="title">
				<text>我的账户</text>
			</view>
			<view class="balance">
				<view class="left">
					<image class="image" src="@/static/serve/icon_meiyuan.png" mode="widthFix"></image>
					<text class="text">余额</text>
				</view>
				<view class="right">
					<text class="text">￥{{balance}}</text>
				</view>
			</view>
		</view>
		<view class="credit">
			<text class="text">充值金额</text>
			<input :class="['input',selectInput?'select':'']" type="number" :id="selectInput" @focus="focus"
				@input="input" @blur="blur" placeholder="手动输入充值金额" placeholder-style="color:#bbb;font-size:14px;" />
			<view class="button" @click="clickPay">
				<text class="text">立即充值</text>
			</view>
		</view>
		<view class="instruct">
			<text class="text">充值说明</text>
		</view>
		<view :class="payNow?'bgcover':'normal'">
			<view class="payPage">
				<view class="title">
					<text class="text">支付方式</text>
					<uni-icons class='icon' type="closeempty" @click="payClose"></uni-icons>
				</view>
				<view class="payNum">
					<text>支付金额 {{payNum}} 元</text>
				</view>
				<view class="payWay">
					<view class="left">
						<image class="image" src="@/static/icon/cash/wx.png" mode="widthFix"></image>
						<text class="text">微信支付</text>
					</view>

					<label class="radio">
						<radio checked="true" color="red" />
					</label>

				</view>
				<view class="commit">
					<text class="text">提交订单</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				payNow: false,
				balance: '0.00',
				selectInput: false,
				payNum: '0.00'
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			focus(e) {
				this.selectInput = true;
			},
			blur(e) {
				this.selectInput = false;
			},
			input(e) {
				this.payNum = parseFloat(e.detail.value).toFixed(2);
			},
			clickPay() {
				if (+this.payNum === 0 || !this.payNum || isNaN(this.payNum)) {
					uni.showToast({
						title: '金额不能为空',
						icon: 'none'
					});
				} else {
					this.payNow = true;
				}
			},
			payClose() {
				this.payNow = false;
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		position: relative;

		.myCount {
			.title {
				height: 16px;
				line-height: 16px;
				margin: 10px;
				padding-left: 12px;
				font-size: 12px;
				color: #666;
				border-left: 2px solid red;
			}

			.balance {
				height: 80px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: url("@/static/serve/icon-balance-recharge-bg.png") repeat fixed center;
				background-size: contain;
				margin: 10px;
				border-radius: 5px;

				.left {
					margin-left: 15px;
					display: flex;
					align-items: center;

					.image {
						width: 40px;
						margin: 0 10px;
					}

					.text {
						font-size: 20px;
						color: #555;
						line-height: 38px;
					}
				}

				.right {
					.text {
						font-size: 20px;
						font-weight: 300;
						letter-spacing: 0.06rem;
						margin-right: 30px;
					}
				}
			}

		}

		.credit {
			.text {
				font-size: 12px;
				color: #888;
				margin-left: 10px;
			}

			.input {
				height: 40px;
				line-height: 40px;
				margin: 10px;
				border: 1px solid #ccc;
				border-radius: 5px;
				padding: 0 10px;
			}

			.select {
				border: 1px solid #f00;
			}

			.button {
				width: 650rpx;
				height: 50px;
				background-color: #ff4544;
				margin: 20px auto;
				text-align: center;
				line-height: 50px;
				border-radius: 25px;

				.text {
					font-size: 16px;
					color: #fff;
				}
			}

		}

		.instruct {
			.text {
				height: 16px;
				line-height: 16px;
				margin: 10px;
				padding-left: 12px;
				font-size: 12px;
				color: #666;
				border-left: 2px solid red;
			}
		}

		.normal {
			display: none;
		}

		.bgcover {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 100vh;
			background-color: rgba(88, 88, 88, 0.7);
			z-index: 999;

			.payPage {
				width: 600rpx;
				height: 480rpx;
				margin: auto;
				background-color: #fff;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				position: absolute;
				/*偏移量*/
				left: 50%;
				top: 50%;
				margin-left: -300rpx;
				margin-top: -240rpx;

				.title {
					flex: 2;
					position: relative;
					text-align: center;
					border-bottom: 1px solid #ddd;
					padding-top: 8px;
					line-height: 50px;

					.text {
						line-height: 50px;
					}

					.icon {
						position: absolute;
						right: 10px;
					}
				}

				.payNum {
					flex: 3;
					text-align: center;
					line-height: 67px;
					font-weight: bold;
				}

				.payWay {
					flex: 2;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0 15px;

					.left {
						line-height: 50px;

						.image {
							width: 50px;
							height: 50px;
							vertical-align: middle;
						}
					}
				}

				.commit {
					flex: 3;
					width: 450rpx;
					height: 40px;
					background-color: #ff4544;
					margin: 20px auto;
					text-align: center;
					line-height: 40px;
					border-radius: 25px;

					.text {
						font-size: 16px;
						color: #fff;
					}
				}
			}
		}
	}
</style>
