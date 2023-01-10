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
									<!-- <van-stepper min="0" button-size="16px" input-width="20px" :value="numberValue"
										@change="onStepperChange" :data-name="item.name" :data-id="item.id" /> -->
									<view class="num-minus" @click="chooseMinus(index)">
										-
									</view>
									<view class="input-price">
										{{item.buynum}}
									</view>
									<view class="num-add" @click="chooseAddNum(index)">
										+
									</view>

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
				sumMoney: 0, //价格总计
				goods_num : 0,//总件数
				adminShow: false, // 编辑选择默认false
				ideld: [],
	
	
			}
		},
		created() {
			this.getcartlist();
	
		},
		onShow() {
			this.getcartlist();
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 增加数量
			chooseAddNum(index) {
				let buynum = this.cartlist[index].buynum; // 获取当前数量
				buynum = buynum + 1; // 每点击一次加1
				this.cartlist[index].buynum = buynum; // 数量
				this.totalPrice()
			},
			// 减少数量
			chooseMinus(index) {
				let buynum = this.cartlist[index].buynum; // 获取当前数量
				if (buynum <= 1) {
					return
				}
				buynum = buynum - 1; // 每点击一次加1
				this.cartlist[index].buynum = buynum;
				this.totalPrice()
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
						this.cartlist[i].buynum = 1;
					}
				}
				this.totalPrice();
			},
			// 删除购物车商品
			async chooseGoodsDelete() {
				this.getdelid();
				var result = await axiosPost("/api/delcart", {
					ideld: this.ideld
				});
				if (+result.code === 200) {
					console.log(result.data);
				}
				this.getcartlist();
				this.isCheckAll = false;
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
					this.isDisabled = true;
				} else {
					this.isCheckAll = true;
					this.isDisabled = false;
				}
				for (let i = 0; i < this.cartlist.length; i++) {
					this.cartlist[i].selected = this.isCheckAll
				}
				this.totalPrice()
			},
			// 商品选中反选
			chooseGoodsSelect(index) {
	
				let count = 0;
				let selectedNum = 0;
				if (this.cartlist[index].selected) {
					this.cartlist[index].selected = false; // 改变当前商品状态
					this.isCheckAll = false
				} else {
					this.cartlist[index].selected = true;
					let shopGoodsNum = this.cartlist.length;
					for (var i in this.cartlist) {
						if (this.cartlist[i].selected) {
							selectedNum++
						}
					}
					if (selectedNum == this.cartlist.length) {
						this.isCheckAll = true;
					} else {
						this.isCheckAll = false;
					}
				}
				this.totalPrice();
			},
	
			
			// 计算总价
			totalPrice() {
				let sumMoney = 0;//总金额
				let goods_num = 0;//总件数
				for (var i = 0; i < this.cartlist.length; i++) {
					if (this.cartlist[i].selected) {
						sumMoney += this.cartlist[i].price * this.cartlist[i].buynum;
						goods_num+=this.cartlist[i].buynum;
					}
				}
				this.sumMoney = parseFloat(sumMoney).toFixed(2);
				this.goods_num = goods_num;
				// console.log(this.sumMoney,'this.sumMoney')
				// console.log(this.goods_num,'this.goods_num')
				if(this.goods_num == 0) {
					this.isDisabled = true;
				} else {
					this.isDisabled = false;
				}
			
			},
	
			// 编辑按钮
			chooseSwitchover() {
				this.adminShow = !this.adminShow
			},
			// 获得选中的id数组
			getdelid() {
				this.ideld = [];
				this.cartlist.forEach(item => {
					if (item.selected) {
						this.ideld.push(item.id);
					}
					console.log(this.ideld, "this.ideld");
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./cart.less');
</style>
