<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="分类" @clickLeft="toIndex" />
		分类
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
