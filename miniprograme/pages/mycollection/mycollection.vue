<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="我的收藏" @clickLeft="goBack" />
		<view class="collnav">
			<view :class="['collnav-goods',navSelect_l ? 'collnav-select':'']" @click="navclick_l">
				商品
			</view>
			<view :class="['collnav-goods',navSelect_r ? 'collnav-select':'' ]" @click="navclick_r">
				专题
			</view>
		</view>
		<mycollecGoods v-if="navSelect_l" @click="navclick_l"></mycollecGoods>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navSelect_l:true,//导航选项卡左是否选中
				navSelect_r:false,//导航选项卡右是否选中
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			//导航选项卡左点击切换事件
			navclick_l(){
				this.navSelect_l=true;
				this.navSelect_r=false;
			},
			//导航选项卡右点击事件
			navclick_r(){
				this.navSelect_r=true;
				this.navSelect_l=false;
			}
		
		}
	}
</script>

<style lang="less">
	@import url('mycollection.less');
</style>
