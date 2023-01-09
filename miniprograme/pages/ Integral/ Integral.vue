<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="积分商城" @clickLeft="goBack" />
		积分商城
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
