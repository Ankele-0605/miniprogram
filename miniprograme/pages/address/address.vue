<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="收货地址" @clickLeft="goBack" />
		收货地址
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
