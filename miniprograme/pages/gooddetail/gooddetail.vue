<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="商品详情" @clickLeft="goBack" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
