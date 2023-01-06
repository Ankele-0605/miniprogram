<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar title="首页" />
		首页
	</view>
</template>

<script>
import { axiosGet } from '@/common/js/http.js'
export default {
	data() {
		return {
			goodlist: [],
		}
	},
	methods: {
		async getGoods() {
			let result = await axiosGet("/api/goods");
			console.log(result, 'xxxxxx');
			if (+result.code === 200) {
				this.goodlist = result.data
			}
		},
	},
	created() {
		this.getGoods();

	}
}
</script>

<style>

</style>
