<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="余额记录" @clickLeft="goBack" />
		余额记录
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
