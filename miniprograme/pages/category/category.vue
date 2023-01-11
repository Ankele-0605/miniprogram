<template>
	<view>
		<uni-nav-bar :fixed="true" status-bar left-icon="home" title="分类" @clickLeft="toIndex" />
		<view class="search_input" >
		        <navigator url="/pages/search/search" open-type="navigate" class="navigator">
				<icon class="weui-icon-search_in-box" type="search" size="14"></icon>	
		       <text class="iconfont icon-guanbi"></text> 搜索
		        </navigator>
		</view> 
		<view class="scroll_box"> 
		    <scroll-view scroll-x>	 
		     <view class="item_list" active>
		        小学系列
		      </view>
		      <view class="item_list" >
				初中系列
		      </view>
		      <view class="item_list" >
		        高中系列
		      </view>
		      <view class="item_list" >
		        中考系列
		      </view>
		      <view class="item_list" >
		        名著系列
		      </view>
		      <view class="item_list" >
		        字帖系列
		      </view>
		     <view class="item_list" >
		       报刊系列
		     </view>
			 <block v-for="(item, i) in categoryList" :key="i">
			     <view :class="['item_list', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.name}}</view>
			  </block>

		    </scroll-view>
		  </view>
		  
		<!--  <view class="scroll-view-container">
			  左侧滑动
			  <scroll-view class="left-scroll-view" scroll-y="true" style="height: 550px;">
				<block v-for="(item,i) in categoryList" :key="i"></block>
			  	<view class="left-scroll-view-item active">小学系列</view>
			  	<view class="left-scroll-view-item">初中系列</view>
			  	<view class="left-scroll-view-item">高中系列</view>
			  	<view class="left-scroll-view-item">中考系列</view>
			  	<view class="left-scroll-view-item">名著系列</view>
			  	<view class="left-scroll-view-item">字帖系列</view>
			  	<view class="left-scroll-view-item">报刊系列</view>
			  </scroll-view>
			  右侧滑动
			 <scroll-view scroll-y="true" style="height: 300px;" >
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view> 
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
			 </scroll-view>
		  </view> -->
	</view>
</template>

<!-- <script>
	export default {
		data() {
			return {
			categoryList:[],
			active:0
			};
		},
		onLoad(){
			this.getCategoryList()
		},
		//获取分类列表的数据
		methods: {
			async getCategoryList(){
				const { data: res } = await uni.$http.get("/api/goods");
				if (res.meta.status !== 200) return uni.$showMsg()
				this.categoryList = res.message 
				 activeChanged(i) {
				    this.active = i
				  }
			}
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script> -->

<style lang="less">
.scroll_box{
width: 100%;
height: 50rpx;
overflow: hidden;
padding: 20rpx;
background: #fff;
white-space: nowrap;
border: 1px solid #999;

}
.scroll_box scroll-view{
  height: 100%;
  width: auto;
 overflow:hidden;
}

.item_list{
width: 160rpx;
height: 100%;
margin-right: 23rpx;
display: inline-block;
margin-left: 10px;
&.active{
	border: 1px solid #000000;
}
}
//搜索框
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
/* .scroll-view-container{
	display: flex;
}
.left-scroll-view{
	width: 120px;
}
.left-scroll-view-item{
	background-color: #F7F7F7;
	line-height: 80px;
	text-align: center;
	font-size: 15px;
}
.active{
	background-color: #FFFFFF;
	position: relative;
}
.active::before {
		content:'';
		display: block;
		width: 3px;
		height: 30px;
		background-color: #c00000;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	} */

</style>
