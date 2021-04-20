<template>
	<!-- <view style="width: 750rpx;height: 1200rpx;background-color: #FBFBFB;">
		<table style="margin-left: 36rpx;padding-top: 36rpx;">
			<tr>
				<td><image src="../../../static/icon/newlist.png" class="pic" mode="aspectFill"></image></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
			</tr>
		</table>
	</view> -->
	<view class="backBox">
		<image src="../../../static/icon/newlist.png" class="pic" mode="aspectFill"></image>
		<view v-for="(item,index) in list" :key="index" class="collectBox">
			<image :src="pic" class="collectBoxImage"></image>
			<view class="textBox">
				<view class="title">{{item.tab}}</view>
				<view class="number">{{item.collectNum}}收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			this.getAll()
		},
		data(){
			return{
				pic:'../../../static/iconn/iconn/collect.png',
				list:[  
					
				]
			}
		},
		methods:{
			// 获取收藏夹列表
			loadList(i){
				uni.request({
					url:'/api/MyPage/MyStarList/getAllList',
					data:{
						user_id:i
					},
					success:(res) => {
						  // console.log(res);
						  // 数据操作
						  console.log(res)
						  this.list=res.data
						  console.log(this.$data.list)
					}
				})
				
			},
			async getAll (){
				const res = await this.$myRequest({
					url:'/MyPage/MyStarList/getAllList?',
					data:{
						user_id: 1
					}
				})
				this.list=res.data
				console.log(res.data)
				// console.log(res)
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.backBox{
		margin: 20rpx auto;
		margin-left: 20rpx;
		margin-right: auto;
		overflow: hidden;
	}
	view{
		display: inline-block;
	}
	.pic{
		float: left;
		width: 321rpx;
		height: 321rpx;
		border-radius: 18rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
	}
	.collectBox{
		float: left;
		width: 321rpx;
		height: 321rpx;

		border-radius: 18rpx;
		background-color: #FFFFFF;
		margin-left: 20rpx;
		margin-top: 20rpx;
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
	}
	.collectBoxImage{
		width: 250rpx;
		height: 230rpx;
		margin-left: 35rpx;
		margin-top: 35rpx;
	}
	
	.textBox{
		position: relative;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 56rpx;
	}
	.title{
		position: absolute;
		top: 0;
		left: 35rpx;
		font-size: 28rpx;
	}
	.number{
		position: absolute;
		top: 5rpx;
		right: 35rpx;
		font-size: 20rpx;
	}
</style>
