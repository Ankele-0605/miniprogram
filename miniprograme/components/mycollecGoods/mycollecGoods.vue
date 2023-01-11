<template>
	<view>
		<view class="sort">
			<view class="sort-l">
				<view :class="['lm',sortclick1? 'sortClick':'']" @click="filtrate(1)">
					{{this.currtName}}
				</view>
				<!-- <view v-else :class="['lm',sortclick1? 'sortClick':'']" @click="filtrate(1)">
					全部分类
				</view> -->
				<!-- <view v-if="!this.alllist2" :class="['lm',sortclick2? 'sortClick':'']" @click="filtrate(2)">
					全部状态
				</view> -->
				<view :class="['lm',sortclick2? 'sortClick':'']" @click="filtrate(2)">
					{{this.currtzt}}
				</view>
			</view>
			<view class="sort-r">
				<view class="gl">
					管理
				</view>
				<view class="pl">
					排列
				</view>
			</view>
		</view>
		<view class="filter" :class="[show1?'anim':'filter',show2?'anim1':'filter']">
			<!-- 类目 单选 -->
			<view class="hang">
				<view v-if="sortclick1" class="item" v-for="(item,index) in list" :key="index"
					@click="filterSelect(item.sortName,index,$event)">
					<view :id='index' :class="selectShow===index?'selectOne':''">
						{{item.sortName}}
					</view>
				</view>
				<view v-else class="item" v-for="(item,index) in listzt" :key="index"
					@click="filterSelect(item,index,$event)">
					<view :id='index' :class="selectShow===index?'selectOne':''">
						{{item}}
					</view>
				</view>
			</view>
			<!-- 确定 取消按钮 -->
			<view class="btns">
				<view class="btn" @click="show1=false,show2=!show1">取消</view>
				<view @click="show1=false,show2=!show1" class="btn"
					style="background-color: rgba(249, 80, 75, 100);color:white">确定
				</view>
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
				likexl2: [], //系列下收藏列表（显示数据版）
				listzt: ['全部状态', '优惠', '低库存', '失效'], //状态列表
				currtzt: '全部状态', //当前状态名
				sortclick1: false, //1点击了
				sortclick2: false, //2点击了
				show1: false, //显示下拉菜单
				show2: false, //下拉菜单关闭动画
				clickBtn: '',
				selectShow: -1,
				date: "",
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				show: false

			};
		},
		created() {
			this.getlist();
		},
		methods: {
			// 筛选
			filtrate(index) {
				if (index == 1) {
					this.filshow1(index);
				} else if (index == 2) {
					this.filshow2(index);
				}
			},
			filshow1(index) {
				if (this.sortclick2) {
					// 控制 动画xian
					this.show1 = true
					this.show2 = !this.show1
					this.sortclick1 = true;
					this.sortclick2 = false;
				} else if (!this.sortclick2) {
					this.show1 = !this.show1
					this.show2 = !this.show1
					this.sortclick1 = true;
				}
			},
			filshow2(index) {
				if (this.sortclick1) {
					// 控制 动画xian
					this.show1 = true
					this.show2 = !this.show1
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
				if (this.selectShow === -1) {
					this.selectShow = index
					this.clickBtn = e.target.id
				} else if (this.clickBtn === e.target.id) {
					this.selectShow = -1
				} else {
					this.selectShow = index
					this.clickBtn = e.target.id
				}
				if (sortName == "全部分类"||sortName == "全部状态") {
					likexl = this.list.slice(0);
					likexl.shift();
				}
				//  else if (sortName == "全部状态") {
				// 	likexl = this.list;
				// 	// likexl.shift();
				// } 
				else if(this.sortclick1){
					let result = this.list.find(item => {
						if (item.sortName == sortName) {
							likexl.push(item);
						}
					})

				}

				this.likexl = likexl;

				if (this.sortclick1) {
					this.currtName = sortName;
				} else {
					this.currtzt = sortName;
				}



				this.alllist = false;
				console.log(this.likexl,'this.likexl');
				console.log(this.list,'this.list');

			},
			// 获得收藏商品数据
			async getlist() {
				var result = await axiosGet("/api/like");
				if (+result.code === 200) {
					this.list = result.data;
					console.log(this.list, "......1");
					// 添加selected字段
					this.list.unshift({
						sortName: '全部分类'
					});
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].selected = false;

					}
				}
			},

		}
	}
</script>

<style lang="less">
	@import url('./mycollecGoods.less');
</style>
