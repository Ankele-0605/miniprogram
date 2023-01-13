<template>
	<view>
		<!-- 页头 -->
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="搜索页" @clickLeft="goBack" />

		<!-- 搜索页主要内容 -->
		<view class="search">

			<!-- 搜索框 -->
			<view class="search-box">
				<uni-search-bar @confirm="search" :focus="true" @input="input" @clear="clear">
				</uni-search-bar>
			</view>


			<!-- 商品热搜榜 -->
			<view class="hotsearch">
				<view class="title">
					<image src="@/static/icon/resou.png" mode=""></image>
				</view>

				<view class="list">
					<uni-list>
						<uni-list-item v-for="(item,index) in hotgoodslist" :key="item.id"
							:to="'/pages/gooddetail/gooddetail?id='+item.id">
							<template v-slot:header>
								<image v-if="index===0" class="slot-rank-image" src="@/static/icon/one.png"
									mode="widthFix"></image>
								<image v-else-if="index===1" class="slot-rank-image" src="@/static/icon/two.png"
									mode="widthFix"></image>
								<image v-else-if="index===2" class="slot-rank-image" src="@/static/icon/three.png"
									mode="widthFix"></image>
								<view v-else class="slot-text rank-text">{{index+1}}</view>
							</template>
							<template v-slot:body>
								<view class="slot-image">
									<image :src="item.cover_pic" mode="widthFix"></image>
								</view>
							</template>
							<template v-slot:footer>
								<view class="slot-text">{{item.name}}</view>
							</template>
						</uni-list-item>
					</uni-list>
				</view>

			</view>

		</view>
	</view>

</template>

<script>
	import {
		axiosGet
	} from '@/common/js/http.js'

	export default {
		data() {
			return {
				hotgoodslist: [], //热搜列表
				searchResults: [], // 搜索的结果列表

			}
		},
		methods: {
			goBack() {

			},
			// 获取热搜榜商品信息
			async gethotgoods() {
				let result = await axiosGet("/api/getGoodsByHot/:hot");
				//console.log(result);
				if (+result.code === 200) {
					this.hotgoodslist = result.data;
				}
			},
			//enter键开始搜索
			async search(e) {
				let result = await axiosGet("/api/search?keywords=" + e.value);
				console.log(result);
				this.searchResults = result.date
			},
			//监控搜索框输入的内容
			input(e) { // input 输入事件的处理函数
				console.log(e) //可以拿到最新的值
			},
			//清除搜索框
			clear(res) {
				uni.showToast({
					title: '清除',
					icon: 'none'
				})
			},

		},
		created() {
			this.gethotgoods();
		}
	}
</script>

<style lang="less">
	.search-box {
		background-color: #f1f1f1;

		.uni-searchbar__box {
			background-color: white !important;
			border-radius: 20px !important;
		}
	}

	.hotsearch {
		margin: 20rpx;

		.title {
			margin: 20rpx;
			width: 87px !important;
			height: 24px !important;

			image {
				width: 87px !important;
				height: 24px !important;
			}
		}

		.list {
			border: 1px solid #ebebeb;
			overflow: hidden;
			box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1), -1px -1px 10px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2vw;
			margin: 5rpx;

			.uni-list-item__container {
				display: flex;
				align-items: center;

				.slot-rank-image {
					width: 8vw;
					margin: 0 9rpx;
				}

				.slot-image {
					image {
						width: 30px;
						margin: 0 15rpx;
						border-radius: 2vw;
					}
				}

				.slot-text {
					font-size: 11px;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.rank-text {
					width: 10vw;
					text-align: center;
				}
			}
		}
	}
</style>
