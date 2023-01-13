<template>
	<view class="main">
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="领券中心" @clickLeft="goBack" />
		<view class="content">
		</view>
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
			},
		},
	}
</script>

<style lang="less">
	.main {
		height: 100vh;
		display: flex;

		.content {
			flex: 1;
			background-color: #f7f7f7;
		}
	}
</style>
