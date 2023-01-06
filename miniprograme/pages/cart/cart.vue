<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="购物车" @clickLeft="toIndex" />
		购物车
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
