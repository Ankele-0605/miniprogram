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
					<view class="cart-emtpy">
						<image class="image" src="@/static/image/cart.png" mode="widthFix"></image>
					</view>
					<view class="cart-emtpy-font">
						购物车还是空的哦
					</view>

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
							<!-- 商品名字 -->
							<view class="biaoti">
								{{item.name}}
							</view>
							<view class="guige">
								规格：默认规格
							</view>
							<view class="xia">
								<!-- 单价 -->
								<view class="price">
									￥{{item.price}}
								</view>
								<!-- 步进器 -->
								<view class="steper">
									<!-- <uni-number-box :value="numberValue" @change="change" /> -->
									<van-stepper min="0" button-size="16px" input-width="20px" :value="numberValue"
										@change="onStepperChange" :data-name="item.name" :data-id="item.id" />
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
			<view v-if="adminShow" class="quanxuanb">
				全选
			</view>
			<view v-if="!adminShow" class=" {{!adminShow ? 'quanxuan':''}}">
				全选
			</view>
			<view class="sum" v-if="!adminShow">
				总计：￥{{sumMoney}}
			</view>
			<view :class="['accounts',isDisabled ? '' : 'abled-btn']" hover-class="{{!isDisabled ? '' : 'hover-btn'}}"
				v-if="!adminShow">

				去结算
			</view>
			<view class="accounts  del-btn" hover-class="{{!isDisabled ? '' : 'hover-btn'}}" v-if="adminShow"
				@click="chooseGoodsDelete">
				删除
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
				isDisabled: true, //结算禁用
				cartlist: [], //购物车数据
				checkAll: false, //全选
				selectDefault: "../../static/icon/uncheck.png", // 默认图标 
				selectPitchOn: "../../static/icon/checked.png", // 选中图标

				isSelection: false, // 规格选择默认false
				isCheckAll: false, // 购物车全选/反选默认false
				numberValue: 0,
				sumMoney: 0.00, //价格总计
				adminShow: false, // 编辑选择默认false
				ideld: [],


			}
		},
		created() {
			this.getcartlist();

		},
		onShow() {
			// console.log("1111112");
			this.getcartlist();
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 获得购物车商品数据
			async getcartlist() {
				var result = await axiosGet("/api/cart");
				if (+result.code === 200) {
					this.cartlist = result.data;
					console.log(this.cartlist, "......1");
					// 添加selected字段
					for (let i = 0; i < this.cartlist.length; i++) {
						this.cartlist[i].selected = false;
						this.cartlist[i].buynum = 0;
					}
					console.log(this.cartlist, "......2");
				}
			},
			// 删除购物车商品
			async chooseGoodsDelete() {
				console.log("lllllllll")
				this.getdelid();
				var result = await axiosPost("/api/delcart", {
					ideld: this.ideld
				});
				if (+result.code === 200) {
					console.log(result.data);
				}
				this.getcartlist();
				// setTimeout(() => {
				// 	this.$router.go(0)
				// }, 500)

			},
			// 点击全选
			chooseCheckAll() {
				let cartList = this.cartlist;
				let isCheckAll = this.isCheckAll;
				console.log(this.isCheckAll, "this.isCheckAll");
				if (isCheckAll) {
					this.isCheckAll = false;
					this.sumMoney = 0.00;
					this.isDisabled = true;
				} else {
					this.isCheckAll = true;
					this.isDisabled = false;
				}
				for (let i = 0; i < this.cartlist.length; i++) {
					this.cartlist[i].selected = this.isCheckAll
				}
			},
			// 商品选中反选
			chooseGoodsSelect(index) {

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
						}
					}
					if (selectedNum == this.cartlist.length) {
						this.isCheckAll = true;
					} else if (selectedNum == 0) {
						this.isCheckAll = false;
						this.sumMoney = 0;
					} else {
						this.isCheckAll = false;
					}
				}
			},

			//当步进条发生改变的时候执行的
			onStepperChange(e) {
				let sumMoney = 0;
				this.cartlist.forEach(item => {
					if (item.name === e.currentTarget.dataset.name) {
						item.buynum = e.detail;
						console.log(this.cartlist)
						if (item.selected) {
							for (var i = 0; i < this.cartlist.length; i++) {
								sumMoney += this.cartlist[i].price * this.cartlist[i].buynum;
							}

						} else {
							item.selected = true;
							for (var i = 0; i < this.cartlist.length; i++) {
								sumMoney += this.cartlist[i].price * this.cartlist[i].buynum;
							}
						}


					};
				})
				this.sumMoney = parseFloat(sumMoney).toFixed(2);
				console.log(this.sumMoney, 'sumMoney');
				if (this.sumMoney == 0) {
					this.isDisabled = true;
				} else {
					this.isDisabled = false;
				}
				console.log(this.isDisabled, 'isDisabled');

			},
			// 编辑按钮
			chooseSwitchover() {
				this.adminShow = !this.adminShow
			},
			// 获得选中的id数组
			getdelid() {
				this.cartlist.forEach(item => {
					if (item.selected) {
						this.ideld.push(item.id);
						// item.cart = false;
						// console.log(this.cartlist,'this.cartlist')
					}
					console.log(this.ideld, "this.ideld");
				})
			}
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
			font-size: 30rpx;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #ffffff;


			.header-l {
				color: lightslategray;
				font-size: 30rpx;
			}
		}

		.container {
			margin-top: 35rpx;
			background-color: #f7f7f7;

			.empty {
				margin-top: 50px;
				.cart-emtpy {
					width: 180rpx;
					height: 180rpx;
					background-color: #dedede;
					margin: 0 auto;
					display: flex;
					/* 水平居中 */
					justify-content: space-around;
					/* 垂直居中 */
					align-items: center;
					box-sizing: border-box;
					border-radius: 50%;

					.image {
						width: 50%;
						height: 50%;
						// margin: auto;
					}

				}

				.cart-emtpy-font {
					color: #b0b0b0;
					line-height: 60px;
					text-align: center;
				}
			}



			.con-detail {
				.selectHead {
					// border: 1px solid gainsboro;
					display: flex;
					flex-wrap: nowrap;
					// justify-content: space-between;
					width: 100%;
					height: 100rpx;
					padding: 15px;
					box-sizing: border-box;
					background-color: #ffffff;

					.select {
						width: 50rpx;
						margin-right: 10rpx;
					}

				}

				.cart-card {

					display: flex;
					padding: 38rpx;
					border-top: 1px solid #e4e4e4;
					background-color: #ffffff;

					.select-l {
						position: relative;
						width: 130rpx;
						// background-color: aquamarine;

						.select {
							width: 50rpx;

							position: absolute;
							top: 35%;

						}
					}

					.imag {
						width: 200rpx;
						// position: relative;
						// background-color: olive;

						.img {
							width: 138rpx;
							height: 138rpx;
							position: relative;
							top: 13%;


						}
					}

					.message {
						margin-left: 40rpx;

						.biaoti {
							height: 35rpx;
							font-size: 28rpx;
							overflow: hidden;
							margin: 20rpx 0;
						}

						.guige {
							font-size: 26rpx;
							color: #b2b2b2;
							margin-bottom: 40rpx;


						}

						.xia {
							// margin-top: 20rpx;
							display: flex;
							justify-content: space-between;

							.price {
								font-size: 28rpx;
								color: red;
							}

							.steper {

								font-size: 12px;
							}
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

		.quanxuanb {
			margin-left: -300rpx;
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

		.del-btn {
			background-color: white !important;
			border: 1px solid black;
			color: black;
		}

	}
</style>
