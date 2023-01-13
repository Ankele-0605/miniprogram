<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="left" title="收货地址" @clickLeft="goBack" />
		<!-- 搜索框 -->
		<view class="search_input" >
		        <navigator  open-type="navigate" class="navigator">
				<icon class="weui-icon-search_in-box" type="search" size="14"></icon>	
		       <text class="iconfont "></text> 请输入收货人或联系电话搜索
		        </navigator>
		</view> 
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="address-item">
				<view class="item-top"><!-- {{item.name}} {{item.mobile}} -->收货人:小刘 11111111</view>
				<view class="item-content"><!-- {{item.address}} {{item.street}} --> 收货地址：无锡 新吴区 双鱼座</view>
				<view class="item-bottom">
					<view class="left" bindtap="clickDefault" data-index="{{index}}">
						<uni-icons type="circle" size="15"></uni-icons>
						<!-- <uni-icons type="item.isDefault?'success' : 'circle'" size="15"></uni-icons> -->
						设为默认
					</view>
					<view class="right">
						<view class="txt" bindtap="clickDelete" data-index="{{index}}">编辑</view>
						<view class="txt" bindtap="clickEdit" data-index="{{index}}">删除</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加地址 -->
		<!-- <view class="add-address">
			<view class="txt">手动添加</view>
			</view> -->
		<!-- 按钮 -->
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
			// addressList:[]
			}
		},
		// onLoad: function(option) {
		// 	 for(var i=0;i<3;i++){
		// 		var address ={};
		// 		address.id ="" + (1+i);
		// 		address.name ="张" + (1+i);
		// 		address.mobile ="11111111111" + (1+i);
		// 		address.address ="连云港市海州区";
		// 		address.address ="天安门 11" + (1+i) + "号";
		// 		address.isDefault = false;
		// 		address.checked = false;
		// 		if(i=0){
		// 			address.isDefault = true;
		// 		}
		// 		this.data.addressList.push(address);
		// 	 }
		// 	 this.setData({
		// 		 addressList: this.data.addressList
		// 	 })
		// }
		methods:{
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
/* 按钮 */
.button-sp-area{
	margin-top:410px;
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
/* 手动添加按钮 */
/* .add-address .txt{
	width: 60vw;
	height: 75rpx;
	margin-bottom: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #ff0033;
	background-origin: 5rpx;
	font-size: 26rpx;
	color: #fff;
	background-color: #ff0033;
} */
/* 地址列表 */
.address-list{
	display: flex;
	flex-direction: column;
	margin-bottom: 95rpx;
}
.address-item{
	display: flex;
	flex-direction: column;
	margin: 6rpx 20rpx;
	padding: 20rpx 20rpx 10rpx 20rpx;
	border-radius: 10rpx;
	background-color: #fff;
}
.item-top{
	font-size: 20rpx;
	color: #333;
}
.item-content{
	font-size: 24rpx;
	color: #999;
	padding-bottom: 20rpx;
	margin-bottom: 20rpx;
	border-bottom: 1px solid #dcdcdc;
}
.item-bottom{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 24rpx;
	color: #999;
}
.item-bottom .right{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.item-bottom .right .txt{
	padding: 0 10rpx;
}
</style>
