<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="用户中心" @clickLeft="toIndex" />
		<view class="top">
			<view class="topLeft">
				<view class="avatar">
					<image class="image" :src="avatarUrl"></image>
				</view>
				<view class="wxuser">
					<text v-if="!islogin" class="text" @click="toggle('center')">点击登录</text>
					<input v-if="islogin" type="nickname" class="text" placeholder="请输入昵称" @blur="blur" :value="nickname"/>
					<view class="refresh" @click="dataRefresh('center')">
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
				<view class="address" @click="toAddress">
					<image class="image" src="@/static/user/address-white.png"></image>
					<text class="text">收货地址</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="my">
				<view v-for="(item, index) in myList" :index="index" :key="index" class="item">
					<view :id=item.pageUrl @click="openMyPage($event)">
						<view class="num">{{item.num}}</view>
						<view class="explain">
							<image class="image" :src="item.url" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="canUse">
				<uni-grid :column="4" :show-border="false" :square="false" :highlight="true">
					<uni-grid-item v-for="(item, index) in canUseList" :index="index" :key="index">
						<view :id="item.pageUrl" @click="openCanUsePage($event)" class="grid-item-box"
							style="background-color: #fff;">
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
					<view class="myOrder">
						<text>我的订单</text>
					</view>
					<view class="middle">
					</view>
					<view class="more" @click="toOrderPage">
						<text class="text">查看更多</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<uni-grid :column="5" :show-border="false" :square="false" :highlight="true">
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
		<uni-popup ref="popup">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="loginSelect">
					<image class="image" src="http://localhost:8888/public/auth-default.png" mode="widthFix"></image>
					<text class="close" @click="close"></text>
					<button class="login" @click="dologin" open-type="chooseAvatar"
						@chooseavatar="onChooseAvatar"></button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		wxgetUserInfo,
		wxlogin
	} from '@/common/js/util.js'

	import {
		axiosGet,
		axiosPost
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				islogin: false,
				nickname:'',
				avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
				myList: [{
						num: 0,
						url: '/static/user/favorite.png',
						text: '我的收藏',
						pageUrl: '/pages/mycollection/mycollection'
					},
					{
						num: 0,
						url: '/static/user/foot.png',
						text: '我的足迹',
						pageUrl: '/pages/mytracks/mytracks'
					},
				],
				canUseList: [{
						num: 0,
						url: '/static/user/icon-integral.png',
						text: '积分',
						pageUrl: '/pages/Integral/Integral'
					},
					{
						num: "0.00",
						url: '/static/user/icon-balance.png',
						text: '余额',
						pageUrl: '/pages/balance/balance'
					},
					{
						num: 0,
						url: '/static/user/icon-coupon.png',
						text: '优惠券',
						pageUrl: '/pages/mycoupon/mycoupon'
					},
					{
						num: 0,
						url: '/static/user/icon-card.png',
						text: '卡券',
						pageUrl: '/pages/mycard/mycard'
					},
				],
				orderList: [{
						url: '/static/order/icon-order-0.png',
						text: '待付款',
						badge: '1',
						type: "error",
						pageUrl: ''
					},
					{
						url: '/static/order/icon-order-1.png',
						text: '待发货',
						badge: '',
						type: "error",
						pageUrl: ''
					},
					{
						url: '/static/order/icon-order-2.png',
						text: '待收货',
						badge: '',
						type: "error",
						pageUrl: ''
					},
					{
						url: '/static/order/icon-order-3.png',
						text: '已完成',
						badge: '',
						type: "error",
						pageUrl: ''
					},
					{
						url: '/static/order/icon-order-4.png',
						text: '售后',
						pageUrl: ''
					}
				],
				serveList: [{
						url: '/static/serve/delete.png',
						text: '清理缓存',
						pageUrl: ''
					},
					{
						url: '/static/serve/service.png',
						text: '客服',
						pageUrl: ''
					},
					{
						url: '/static/serve/pay-dot.png',
						text: '充值中心',
						pageUrl: '/pages/voucherCenter/voucherCenter'
					},
					{
						url: '/static/serve/balance.png',
						text: '余额记录',
						pageUrl: '/pages/balance/balance'
					},
					{
						url: '/static/serve/coupon-icon.png',
						text: '我的优惠券',
						pageUrl: '/pages/mycoupon/mycoupon'
					},
					{
						url: '/static/serve/coupon.png',
						text: '领券中心',
						pageUrl: '/pages/getcoupon/getcoupon'
					},
					{
						url: '/static/serve/after-sale.png',
						text: '售后',
						pageUrl: '/pages/order/order'
					},
					{
						url: '/static/serve/vip.png',
						text: '会员中心',
						pageUrl: '/pages/vipcenter/vipcenter'
					},
				],

			}
		},
		onShow() {
			this.islogin = uni.getStorageSync('token') ? true : false;
			if (this.islogin) {
				this.avatarUrl = uni.getStorageSync('avatarUrl');
				this.nickname = uni.getStorageSync('nickname');
			}

		},
		methods: {
			// 跳转到首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 弹出登陆选项
			toggle(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			close() {
				this.$refs.popup.close()
			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail;
				console.log(e.detail);
				uni.setStorageSync('avatarUrl', avatarUrl)
				this.avatarUrl = avatarUrl;
			},
			async dologin() {
				try {
					//使用wx.login 获取登录凭证
					let rescode = await wxlogin();
					if (!rescode) return;
					console.log(rescode)
					//向服务器的登录接口发送请求，并且把登录凭证放在请求体里面发送给服务器
					let response = await axiosPost("/api/user/login", {
						code: rescode.code,
					});
					this.$refs.popup.close();
					uni.showToast({
						title: response.message,
					});
					if (+response.code === 200) {
						var token = response.data.token;
						uni.setStorageSync('token', "Bearer " + token)
						this.islogin = true;
					}
				} catch (e) {
					console.log(e)
				}
			},
			
			blur(e){
				console.log(e.target.value);
				uni.setStorageSync('nickname', e.target.value)
			},
			// 数据更新弹框
			dataRefresh(type) {
				uni.redirectTo({
					url: '../me/me?gid=' + this.gid //写你的路径
				});
				uni.showToast({
					title: '资料已更新',
					icon: 'none',
					duration: 2000
				})
			},
			// 跳转到收货地址
			toAddress() {
				uni.navigateTo({
					url: "/pages/address/address"
				})
			},
			// 我的收藏/我的足迹的跳转
			openMyPage(e) {
				uni.navigateTo({
					url: e.currentTarget.id
				})
			},
			// 积分余额等的跳转
			openCanUsePage(e) {
				uni.navigateTo({
					url: e.currentTarget.id
				})
			},
			// 跳转到订单页面
			toOrderPage() {
				uni.navigateTo({
					url: "/pages/order/order"
				});
			},
			change(e) {
				let index = e.detail.index;
				// 清理缓存
				if (index == 0) {
					uni.showModal({
						title: '提示',
						content: '确定要清理缓存',
						success: function(res) {
							if (res.confirm) {
								uni.clearStorage(); //清理本地数据缓存。
								// uni.clearStorageSync();//同步清理本地数据缓存
								uni.showToast({
									title: '清理完成',
									icon: 'none',
									duration: 2000 //持续时间为 2秒
								})
							} else if (res.cancel) {

							}
						}
					});
				}
				// 客服
				else if (index == 1) {}
				// 其他页面跳转
				else {
					let arr = this.serveList.slice(index, index + 1);
					// console.log(arr[0].pageUrl);
					uni.navigateTo({
						url: arr[0].pageUrl
					})
				}
			},


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
				margin: 0 10px 0 20px;

				.image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
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
		height: 830rpx;
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
				justify-content: space-around;
				background-color: #fff;
				padding-top: 5px;

				.myOrder {
					flex: 1;
					padding-left: 15px;
				}

				.middle {
					flex: 2;
				}

				.more {
					flex: 1;

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

	.popup-content {
		.loginSelect {
			width: 640rpx;
			height: 688rpx;
			position: relative;

			.image {
				margin: auto;
			}

			.close {
				width: 224rpx;
				height: 80rpx;
				position: absolute;
				left: 80rpx;
				bottom: 27px;
				border-radius: 20px;
			}

			.login {
				width: 224rpx;
				height: 82rpx;
				position: absolute;
				right: 80rpx;
				bottom: 28px;
				border-radius: 20px;
				opacity: 0;
			}
		}
	}
</style>
