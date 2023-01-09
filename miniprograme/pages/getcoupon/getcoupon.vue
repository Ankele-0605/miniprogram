<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="领券中心" @clickLeft="goBack" />
		领券中心
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
