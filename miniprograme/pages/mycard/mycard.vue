<template>
	<view>
		<view class="main">
			<uni-nav-bar :fixed="true" status-bar left-icon="left" title="我的卡券" @clickLeft="goBack" />
			<!-- 选项卡 -->
			<view class="head-nav">
				<view class="item" :class="listIndex==index?'activite':''" @click="checkListIndex(index)"
					v-for="(item,index)  in navList" :key="index">
					{{item}}

				</view>
			</view>
			<!-- 内容 -->
			<view class="content">
				<view class="item" v-if="listIndex== 0">
					<image class="image" src="../../static/icon/no-goods.png" mode="widthFix"></image>
					<text class="content-text">暂无未使用卡券~</text>
				</view>
				<view class="item" v-if="listIndex== 1">
					<image class="image" src="../../static/icon/no-goods.png" mode="widthFix"></image>
					<text class="content-text">暂无未使用卡券~</text>
				</view>
				<view class="item" v-if="listIndex== 2">
					<image class="image" src="../../static/icon/no-goods.png" mode="widthFix"></image>
					<text class="content-text">暂无未使用卡券~</text>
				</view>
			</view>

		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: ['未使用', '已使用', '已过期'],
				navIndex: 1,
				listIndex: 0,
				show: false
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			checkListIndex(index) {
				this.listIndex = index;

				uni.showToast({
					title: '加载中...',
					icon: 'none',
					duration: 200
				});
			},
			toGetCouponPage() {
				uni.navigateTo({
					url: '/pages/getcoupon/getcoupon',
				});
			}
		}


	}
</script>

<style lang="less" scoped>
	.main {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.head-nav {
			display: flex;
			justify-content: space-around;
			height: 50px;
			line-height: 50px;

			.item {
				width: 150rpx;
				text-align: center;
			}

			.activite {
				color: red;

				border-bottom: 6rpx solid #f00;

			}
		}


		.content {
			flex: 1;
			background-color: #f7f7f7;

			.item {
				text-align: center;
			}

			.image {
				width: 200rpx;
				height: 200rpx;
				display: block;
				margin: 40px auto 10px;
			}

			.content-text {
				font-size: 12px;
				color: #666;
			}
		}

	}
</style>
