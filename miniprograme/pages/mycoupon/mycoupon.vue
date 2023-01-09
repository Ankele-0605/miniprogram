<template>
	<view>
		<view class="main">
			<uni-nav-bar :fixed="true" status-bar left-icon="left" title="我的优惠券" @clickLeft="goBack" />
			<!-- 选项卡 -->
			<view class="head-nav">
				<view class="item" :class="listIndex==index?'activite':''" @click="checkListIndex(index)"
					v-for="(item,index)  in navList" :key="index">
					{{item}}

				</view>
			</view>
			<!-- 内容 -->
			<view class="content">
				<view class="item" v-if="listIndex== 0"><text class="content-text">暂无相关优惠券</text></view>
				<view class="item" v-if="listIndex== 1"><text class="content-text">暂无相关优惠券</text></view>
				<view class="item" v-if="listIndex== 2"><text class="content-text">暂无相关优惠券</text></view>
			</view>
			<view class="footer" @click="toGetCouponPage">
				<text>去领券</text>
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
			toGetCouponPage(){
				uni.navigateTo({
					url: '/pages/getcoupon/getcoupon',
				});
			}
		}


	}
</script>

<style lang="less">
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

			.content-text {
				color: #afafaf;
				line-height: 300rpx;
			}
		}

		.footer {
			height: 60px;
			line-height: 60px;
			text-align: center;
			background-color: #fff;
		}
	}
</style>
