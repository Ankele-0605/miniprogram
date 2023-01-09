<template>
	<view>
		<view>
			<uni-nav-bar :fixed="true" status-bar left-icon="left" title="搜索页" @clickLeft="goBack" />
		</view>

		<uni-section>
			<uni-easyinput class="uni-mt-5" v-model="value" placeholder="请输入内容" @input="input"></uni-easyinput>
		</uni-section>



		<uni-list>
			<uni-list-item v-for="item in hotgoodslist" :key="item.id" :title="item.name" :thumb="item.cover_pic">
			<view >
				{{item.name}}
			</view>
			</uni-list-item>
		</uni-list>
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
				hotgoodslist: [],
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
			async gethotgoods() {
				let result = await axiosGet("/api/goods");
				console.log(result);
				if (+result.code === 200) {
					this.hotgoodslist = result.data
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
</style>
