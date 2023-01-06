<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="用户中心" @clickLeft="toIndex" />
		我的
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style>

</style>
