<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="收货地址" @clickLeft="goBack" />
		<view class="search_input" >
		        <navigator  open-type="navigate" class="navigator">
				<icon class="weui-icon-search_in-box" type="search" size="14"></icon>	
		       <text class="iconfont "></text> 请输入收货人或联系电话搜索
		        </navigator>
		</view> 
		<view class="button-sp-area">
			<button class="button1"><img src="/static/icon/add.png" style="width: 20px;height:20px;margin-top:15px">手动添加</button>
			<button class="button2">自动获取</button>
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
			}
		}
	}
</script>

<style>
.search_input {
  height: 60rpx;
  background-color: #CDCDCD;
  padding: 15rpx;
} 
.search_input .navigator{
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30rpx;
  color: #999;
  font-size: 32rpx;
}
.button-sp-area{
	margin-top:500px;
}
.button1{
	background-color: #ff0033;
	width: 170px;
	height: 50px;
	float: left;
	border-radius: 15px;
}
.button2{
	background-color: #00ff66;
	width: 170px;
	height: 50px;
	float: right;
	border-radius: 15px;
}
</style>
