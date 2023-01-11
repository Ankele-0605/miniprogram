<template>
	<view>
		<view class="sort">
			<view class="sort-l">
				<view :class="['lm',this.sortclick1? 'sortClick':'']" @click="filtrate(1)">
					{{this.currtName}}
				</view>
				<view :class="['lm',this.sortclick2? 'sortClick':'']" @click="filtrate(2)">
					{{this.currtzt}}
				</view>
			</view>
			<view class="sort-r">
				<view class="gl" @click="edit">
					{{edited? '完成': '管理'}}
				</view>
				<view class="pl" @click="ranged">
					{{range? '横排': '竖排'}}
				</view>
			</view>
		</view>
		<view class="filter" :class="[show1?'anim':'filter',show2?'anim1':'filter']">
			<!-- 类目 单选 -->
			<view class="hang">
				<!-- 系列筛选 -->
				<view v-if="sortclick1" class="item" v-for="(item,index) in sortName" :key="index"
					@click="filterSelect(item,index,$event)">
					<view :id='index' :class="selectShow===index?'selectOne':''">
						{{item}}
					</view>
				</view>
				<!-- 状态筛选 -->
				<view v-else class="item" v-for="(item,index) in listzt" :key="index"
					@click="filterSelect2(item,index,$event)">
					<view :id='index' :class="selectShow===index?'selectOne':''">
						{{item}}
					</view>
				</view>
			</view>
			<!-- 确定 重置按钮 -->
			<view class="btns">
				<view class="btn" @click="reset">重置</view>
				<view @click="selectyes" class="btn" style="background-color: rgba(249, 80, 75, 100);color:white">确定
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="products">
			<view :class="[this.range ? 'cart-card-trans':'cart-card']" v-for="(item,index) in likexl" :key="item.id">
				<view v-if="this.edited" :class="[this.range ? 'select-l-trans':'select-l']">
					<image :class="[range ? 'select-trans':'select']" :src="item.selected ? selectPitchOn:selectDefault"
						mode="widthFix" @click="chooseGoodsSelect(index)"></image>
				</view>
				<view :class="[this.range ? 'imag-trans':'imag']">
					<image :src="item.cover_pic" :class="[this.range ? 'img-trans':'img']" mode=""></image>
				</view>
				<view :class="[this.range ? 'message-trans':'message']">
					<!-- 商品名字 -->
					<view :class="[this.range ? 'biaoti-trans':'biaoti']">
						{{item.name}}
					</view>
					<view class="xia-trans">
						<!-- 单价 -->
						<view :class="[this.range ? 'price-trans':'price']">
							￥{{item.price}}
						</view>
						<!-- 已售 -->
						<view :class="[this.range ? 'sold-trans':'sold']">
							已售0册
						</view>
					</view>

				</view>
			</view>

		</scroll-view>
		<view class="footer" v-if="edited">
			<image v-if="isCheckAll" class="select" :src="selectPitchOn" mode="widthFix" @click="chooseCheckAll">
			</image>
			<image v-if="!isCheckAll" class="select" :src="selectDefault" mode="widthFix" @click="chooseCheckAll">
			</image>
			<view class="quanxuanb">
				全选
			</view>
			<view class="accounts  del-btn" @click="chooseGoodsDelete">
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
		name: "mycollecGoods",
		data() {
			return {
				list: [], //收藏商品列表
				sortName: [], //收藏商品系列名列表
				currtName: '全部分类', //当前系列名
				alllist: true, //是否选择全部分类
				alllist2: true, //是否选择全部状态
				likexl: [], //系列下收藏列表
				// likexl2: [], //系列下收藏列表（显示数据版）
				listzt: ['全部状态', '优惠', '低库存', '失效'], //状态列表
				currtzt: '全部状态', //当前状态名
				sortclick1: false, //1点击了
				sortclick2: false, //2点击了
				show1: false, //显示下拉菜单
				show2: false, //下拉菜单关闭动画
				edited: false, //点击了编辑
				range: true, //是否切换排列方式
				checkAll: false, //全选
				isSelection: false, // 规格选择默认false
				isCheckAll: false, // 购物车全选/反选默认false
				ideld: [], //已选商品的id数组
				selectDefault: "../../static/icon/uncheck.png", // 默认单选图标
				selectPitchOn: "../../static/icon/checked.png", // 单选选中图标
				clickBtn: '',
				selectShow: -1,
				show: false

			};
		},
		created() {
			this.getlist();
			// console.log('created')

		},
		onReady() {
			this.getlist();
			// this.goodsinit();
			// console.log('onReady')
		},
		methods: {
			// 商品初始化显示
			goodsinit() {
				this.likexl = this.list.slice();
				this.likexl.shift();
				// console.log(this.list, 'goodsinit this.list');
				// console.log(this.list.slice(), 'goodsinit this.list.slice()');
				// console.log(this.likexl);
			},
			// 筛选
			filtrate(index) {
				if (index == 1) {
					this.filshow1(index);
				} else if (index == 2) {
					this.filshow2(index);
				}
			},
			// 控制点击系列时动画
			filshow1(index) {
				if (this.sortclick2) {
					// 控制 动画xian
					this.show1 = true;
					this.show2 = !this.show1;
					this.sortclick1 = true;
					this.sortclick2 = false;
				} else if (!this.sortclick2) {
					this.show1 = !this.show1;
					this.show2 = !this.show1;
					this.sortclick1 = true;
				}
			},
			// 控制点击系列时动画
			filshow2(index) {
				if (this.sortclick1) {
					// 控制 动画xian
					this.show1 = true;
					this.show2 = !this.show1;
					this.sortclick2 = true;
					this.sortclick1 = false;
				} else if (!this.sortclick1) {
					this.show1 = !this.show1
					this.show2 = !this.show1
					this.sortclick2 = true;
				}
			},
			// 点击系列名进行筛选
			filterSelect(sortName, index, e) {
				let likexl = [];
				this.likexl = [];
				if (this.selectShow === -1) {
					this.selectShow = index
					this.clickBtn = e.target.id
				} else if (this.clickBtn === e.target.id) {
					this.selectShow = -1
				} else {
					this.selectShow = index
					this.clickBtn = e.target.id
				}

				if (sortName == "全部分类" && this.currtzt == "全部状态") {
					this.likexl = this.list.slice(0);
					this.likexl.shift();
				} else if (this.currtzt != "全部状态") {
					this.likexl = [];
				} else {
					let result = this.list.find(item => {
						if (item.sortName == sortName) {
							this.likexl.push(item);
						}
					})
				}
				if (this.sortclick1) {
					this.currtName = sortName;
				} else {
					this.currtzt = sortName;
				}
				this.alllist = false;
				// console.log(this.likexl, 'this.likexl');
				// console.log(this.list, 'this.list');
			},
			// 点击状态名进行筛选
			filterSelect2(sortName, index, e) {
				let likexl = [];
				if (this.selectShow === -1) {
					this.selectShow = index
					this.clickBtn = e.target.id
				} else if (this.clickBtn === e.target.id) {
					this.selectShow = -1
				} else {
					this.selectShow = index
					this.clickBtn = e.target.id
				}
				if (sortName == "全部状态" && this.likexl.length != 0) {
					this.likexl = this.likexl;
				} else if (sortName != "全部状态") {
					this.likexl = [];
				} else {
					if (this.currtName == "全部分类") {
						this.likexl = this.list.slice(0);
						this.likexl.shift();
					} else {
						let result = this.list.find(item => {
							if (item.sortName == this.currtName) {
								this.likexl.push(item);
							}
						})
					}
				}
				this.currtzt = sortName;
				this.alllist = false;
				// console.log(this.likexl, 'this.likexl');
				// console.log(this.list, 'this.list');
			},
			// 获得收藏商品数据
			async getlist() {
				var result = await axiosGet("/api/like");
				if (+result.code === 200) {
					this.list = result.data;
					// console.log(this.list, "......1");
					// 添加selected字段
					this.list.unshift({
						sortName: '全部分类'
					});
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].selected = false;
						this.sortName.push(this.list[i].sortName);
					}
				}
				this.sortName = [...new Set(this.sortName)];
				this.goodsinit();
				// console.log(this.sortName, 'this.sortName');
			},
			// 点击确定按钮
			selectyes() {
				this.show1 = false;
				this.show2 = !this.show1;
			},
			// 点击重置按钮
			reset() {
				this.show1 = false;
				this.show2 = !this.show1
				this.currtName = "全部分类";
				this.currtzt = "全部状态";
				this.getlist();
			},
			// 商品选中反选
			chooseGoodsSelect(index) {
				let count = 0;
				let selectedNum = 0;
				if (this.likexl[index].selected) {
					this.likexl[index].selected = false; // 改变当前商品状态
					this.isCheckAll = false
				} else {
					this.likexl[index].selected = true;
					let shopGoodsNum = this.likexl.length;
					for (var i in this.likexl) {
						if (this.likexl[i].selected) {
							selectedNum++
						}
					}
					if (selectedNum == this.likexl.length) {
						this.isCheckAll = true;
					} else {
						this.isCheckAll = false;
					}
				}
			},
			// 点击编辑
			edit() {
				this.edited = !this.edited;
			},
			// 点击排列按钮
			ranged() {
				this.range = !this.range;
				console.log(this.range, 'this.range')
			},
			// 点击全选
			chooseCheckAll() {
				let likexl = this.likexl;
				let isCheckAll = this.isCheckAll;
				// console.log(this.isCheckAll, "this.isCheckAll");
				if (isCheckAll) {
					this.isCheckAll = false;
				} else {
					this.isCheckAll = true;
				}
				for (let i = 0; i < this.likexl.length; i++) {
					this.likexl[i].selected = this.isCheckAll
				}
			},
			// 删除购物车商品
			async chooseGoodsDelete() {
				this.getdelid();
				var result = await axiosPost("/api/delCollection", {
					delId: this.ideld
				});
				if (+result.code === 200) {
					console.log(result.data);
				}
				this.getlist();
				this.isCheckAll = false;
			},
			// 获得选中的id数组
			getdelid() {
				this.ideld = [];
				this.likexl.forEach(item => {
					if (item.selected) {
						this.ideld.push(item.id);
					}
					// console.log(this.ideld, "this.ideld");
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./mycollecGoods.less');
</style>
