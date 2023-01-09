<template>

	<view>
		<!-- 页标 -->
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="购物车" @clickLeft="toIndex" />

		<!-- 购物车主要内容部分 -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<view class="header">
				<view class="header-l">商品库存有限，请尽快下单</view>
				<!-- class="edit" -->
				<view class="edit" @click="chooseSwitchover">
					{{adminShow? '完成': '编辑'}}
				</view>
			</view>
			<view class="container">

				<!-- 购物车为空  -->
				<view v-if="cartlist.length === 0" class="empty">
					<!-- <image class="icongouwuche" src="../../static/icon_gouwuche.png" mode="widthFix"></image> -->
				</view>
				<!-- 购物车不为空  -->
				<view v-else class="con-detail">
					<view class="selectHead">
						<image v-if="isCheckAll" class="select" :src="selectPitchOn" mode="widthFix"
							@click="chooseCheckAll"></image>
						<image v-if="!isCheckAll" class="select" :src="selectDefault" mode="widthFix"
							@click="chooseCheckAll"></image>
						宏大书城
					</view>

					<view class="cart-card" v-for="(item,index) in cartlist" :key="item.id">
						<view class="select-l">
							<image class="select" :src="item.selected ? selectPitchOn:selectDefault" mode="widthFix"
								@click="chooseGoodsSelect(index)"></image>
						</view>
						<view class="imag">
							<image :src="item.cover_pic" class="img" mode=""></image>
						</view>
						<view class="message">
							<view class="biaoti">
								{{item.name}}
							</view>
							<view class="guige">
								规格：默认规格
							</view>
							<view class="xia">
								<view class="price">
									￥{{item.price}}
								</view>
								<view class="steper">
									<u-action-sheet :list="list" v-model="show"></u-action-sheet>

								</view>
							</view>

						</view>

					</view>

				</view>
			</view>
		</scroll-view>

		<view class="footer">
			<image v-if="isCheckAll" class="select" :src="selectPitchOn" mode="widthFix" @click="chooseCheckAll">
			</image>
			<image v-if="!isCheckAll" class="select" :src="selectDefault" mode="widthFix" @click="chooseCheckAll">
			</image>
			<view class="quanxuan">
				全选
			</view>

			<view class="sum">
				总计：￥0.00
			</view>
			<view class="accounts  {{!isDisabled ? 'abled-btn' : ''}} account-btn"
				hover-class="{{!isDisabled ? '' : 'hover-btn'}}">
				去结算
			</view>
		</view>
	</view>
</template>

<script>
	import {
		axiosGet,
		axiosPost
	} from "../../common/js/http.js"
	export default {
		data() {
			return {
				
				isDisabled: false, //结算禁用
				cartlist: [], //购物车数据
				checkAll: false, //全选
				selectDefault: "../../static/icon/uncheck.png", // 默认图标 
				selectPitchOn: "../../static/icon/checked.png", // 选中图标

				isSelection: false, // 规格选择默认false
				isCheckAll: false, // 购物车全选/反选默认false


			}
		},
		created() {
			this.getcartlist();
			isStop
			this.radioChange();
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			async getcartlist() {
				var result = await axiosGet("/api/cart");
				if (+result.code === 200) {
					this.cartlist = result.data;
					console.log(this.cartlist, "......1");
					// 添加selected字段
					for (let i = 0; i < this.cartlist.length; i++) {
						this.cartlist[i].selected = false;
					}
					console.log(this.cartlist, "......2");
				}
			},
			// <image v-if="CheckAll" class="select" :src="selectPitchOn" mode="widthFix"
			// 	@click="chooseCheckAll"></image>
			// <image v-if="!CheckAll" class="select" :src="selectDefault" mode="widthFix"
			// 	@click="chooseCheckAll"></image>

			// 点击全选
			chooseCheckAll() {
				let cartList = this.cartlist;
				let isCheckAll = this.isCheckAll;
				console.log(this.isCheckAll, "this.isCheckAll");
				if (isCheckAll) {
					this.isCheckAll = false
				} else {
					this.isCheckAll = true
				}
				for (let i = 0; i < this.cartlist.length; i++) {
					this.cartlist[i].selected = this.isCheckAll
				}
				// this.totalPrice()
			},
			// 商品选中反选
			chooseGoodsSelect(index) {
				console.log(index, "index")
				let count = 0;
				let selectedNum = 0;
				// let goods = this.cartlist; // 当前商品数组

				if (this.cartlist[index].selected) {
					this.cartlist[index].selected = false; // 改变当前商品状态
					// selectedNum--


					this.isCheckAll = false

				} else {
					this.cartlist[index].selected = true;

					let shopGoodsNum = this.cartlist.length;

					// let selectedNum = 0;
					for (var i in this.cartlist) {
						if (this.cartlist[i].selected) {
							selectedNum++
							console.log(selectedNum, "selectedNum");
							console.log(this.cartlist.length, "this.cartlist.length");
						}
					}
					if (selectedNum == this.cartlist.length) {
						this.isCheckAll = true
					} else {
						this.isCheckAll = false
					}
				}

				// this.totalPrice()
			},


		}
	}
</script>

<style lang="less">
	.scroll-Y {
		// margin-top: 100rpx;
		height: 1008rpx;
		background-color: #f7f7f7;

		// 头部（含编辑按钮）
		.header {
			width: 100%;
			height: 80rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			font-size: 14px;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #ffffff;


			.header-l {
				color: lightslategray;
				font-size: 28rpx
			}
		}

		.container {
			margin-top: 35rpx;
			background-color: #ffffff;

			.empty {
				width: 70%;
				height: 70%;
			}

			.con-detail {
				.selectHead {
					border: 1px solid gainsboro;
					display: flex;
					flex-wrap: nowrap;
					// justify-content: space-between;
					width: 100%;
					height: 100rpx;
					padding: 15px;
					box-sizing: border-box;

					.select {
						width: 50rpx;
						margin-right: 10rpx;
					}

				}

				.cart-card {

					display: flex;
					padding: 50rpx;

					.select-l {
						position: relative;
						width: 180rpx;
						background-color: aquamarine;

						.select {
							width: 50rpx;

							position: absolute;
							top: 35%;

						}
					}

					.imag {
						width: 300rpx;
						position: relative;
						background-color: olive;

						.img {
							width: 100rpx;
							height: 100rpx;
							position: absolute;

						}
					}

					.message {
						margin-left: 40rpx;

						.biaoti {
							height: 35rpx;
							font-size: 28rpx;
							overflow: hidden;
						}

						.guige {
							font-size: 24rpx;
							color: gray;


						}

						.xia {

							.price {
								font-size: 28rpx;
								color: red;
							}

							.steper {}
						}
					}


				}

			}


			.radioh {
				padding: 30rpx;
				box-sizing: border-box;
				height: 100rpx;
			}
		}
	}

	// 结算栏
	.footer {
		// background-color: antiquewhite;
		border: 1px solid gainsboro;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		padding: 15px;
		box-sizing: border-box;

		.quanxuan {
			margin-left: -120rpx;
		}

		.select {
			width: 50rpx;
			margin-right: 10rpx;
		}

		// 总计
		.sum {
			margin-left: -60px;
			color: red;
		}


		// 结算（禁用状态）
		.accounts {
			width: 30%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: darkgray;
			border-radius: 25px;
			margin-top: -20rpx;
			// border-radius: 15%;
			color: white;
			text-align: center;
			position: relative;

		}

		//去结算
		.abled-btn {
			background-color: orangered !important;
		}

	}
</style>
