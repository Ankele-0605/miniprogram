<template>
	<view class="main">
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="余额记录" @clickLeft="goBack" />
		<view class="top">
			<image class="image" src="@/static/serve/balance/balance-bg.png" mode=""></image>
			<image class="rule" src="@/static/serve/balance/balance-icon.png" mode=""></image>
			<view class="count">
				<text class="title">账户余额(元)</text>
				<text class="num">{{ countNum }}</text>
				<view class="add" @click="toVoucherPage">
					<text class="text">充值</text>
				</view>
			</view>
		</view>
		<view class="addImage">
			<image class="image" src="@/static/serve/balance/balance-ad.png" mode="widthFix"></image>
		</view>

		<view class="date">
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countNum: "0",
			info: {
				lunar: true,
				range: true,
				insert: false,
				selected: []
			}
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

<style lang="less">
.main {
	height: 100vh;

	.top {
		width: 750rpx;
		height: 300rpx;
		position: relative;
		font-size: 12px;

		.image {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -999;
		}

		.rule {
			width: 20px;
			height: 20px;
			position: absolute;
			right: 8px;
			top: 15px;
		}

		.count {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				color: #fff;
				margin-top: 24px;
			}

			.num {
				color: #fff;
				font-size: 30px;
				margin: 10px;
			}

			.add {
				width: 45px;
				line-height: 25px;
				text-align: center;
				line-height: 25px;
				border-radius: 15px;
				border: 1px solid #fff;

				.text {
					color: #fff;

				}
			}
		}

	}

	.addImage {
		margin: 8px 0;
		background-color: #f7f7f7;

		.image {
			width: 100%;
		}
	}

	.date {
		.uni-calendar__box {
			display: none;
		}

		.uni-calendar__backtoday {
			display: none;
		}
	}

}
</style>
