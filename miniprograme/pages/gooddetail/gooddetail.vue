<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="商品详情" @clickLeft="goBack" />
	</view>
</template>

<script>
	import {
		axiosGet
	} from '@/common/js/http.js'
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			this.getGoodInfo();
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			async getGoodInfo() {
				let result = await axiosGet("/api/goods/" + 28);
				console.log(result)
			},
		}
	}
</script>

<style>

</style>
