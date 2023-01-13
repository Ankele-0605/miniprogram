<template>
	<view>
		<view class="content">
			<view class="commodity" v-for="item in goodlist" :key="item.id">
				<view class="coverPic">
					<image class="image" :src="item.cover_pic" mode="heightFix"></image>
				</view>
				<text class="title">{{item.name}}</text>
				<text class="price">￥{{item.price}}</text>
				<view class="other">
					<text class="olderPrice">￥{{item.price}}</text>
					<text class="sold">已售{{item.sold_num}}册</text>
					<image class="carticon" src="@/static/icon/shopping-cart.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		name: "GoodsArray",
		props: {
		    goodlist: Array,
		  },
		data() {
			return {
			};
		}	
	}
</script>

<style lang="less">
	.content {
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		background-color: #f7f7f7;

		.commodity {
			background-color: #fff;
			margin: 5px;
			box-sizing: border-box;
			border-radius: 10px;
			width: 47%;
			height: 580rpx;

			.coverPic {
				width: 360rpx;
				height: 360rpx;
				text-align: center;

				.image {
					max-width: 100%;
					max-height: 100%;
					object-fit: cover;
				}
			}


			.title {
				display: block;
				margin: 5px 10px;
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				/*控制在3行*/
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.price {
				display: block;
				color: #ff4a48;
				margin-left: 10px;
			}

			.other {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #bbb;

				.olderPrice {
					text-decoration: line-through;
				}


				.carticon {
					width: 50rpx;
					height: 50rpx;
					margin-right: 10px;

				}
			}
		}
	}
</style>
