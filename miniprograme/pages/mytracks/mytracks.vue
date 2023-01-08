<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="我的足迹" @clickLeft="goBack" />
		我的足迹
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
