<template>
	<view>
		<!-- 页头 -->
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="搜索页" @clickLeft="goBack" />

		<!-- 搜索页主要内容 -->
		<view class="search">

			<!-- 搜索框 -->
			<uni-section>
				<uni-easyinput class="uni-mt-5" v-model="value" placeholder="请输入内容" @input="input"></uni-easyinput>
			</uni-section>

			<!-- 商品热搜榜 -->
			<view class="hotsearch">
				<view class="title">
					<image src="@/static/icon/resou.png" mode=""></image>
				</view>
				
				<view class="list">
					<uni-list>
					 	<uni-list-item v-for="item in hotgoodslist" :key="item.id" :title="item.name"  :thumb="item.cover_pic"></uni-list-item>
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
				value: '',
				placeholderStyle: "color:#2979FF;font-size:14px",
				hotgoodslist: [], //热搜列表
			}
		},
		methods: {
			input(e) {
				console.log('输入内容：', e);
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取热搜榜商品信息
			async gethotgoods() {
				let result = await axiosGet("/api/getGoodsByHot/:hot");
				console.log(result);
				if (+result.code === 200) {
					this.hotgoodslist = result.data; 
				}
			}
		},
		created() {
			this.gethotgoods();
		}
	}
</script>

<style lang="less">
	.uni-section {
		background-color: #e9e9e9 !important;
	}

	.uni-section-header {
		padding: 0 !important;
	}

	.uni-section-content {
		width: 80%;
		border-radius: 80%;
		padding: 10px 10px !important;
	}

	.uni-easyinput {
		background-color: #fff;
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
		
		.list{
			border: 1px solid #ebebeb;
		}
	}
</style>
