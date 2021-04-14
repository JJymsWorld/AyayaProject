<template>
	<view style="width: 750rpx;height: 1200rpx;background-color: #FBFBFB;">
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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
					pic:"",
				    title:"",
				    collectNum:""	
					}
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
						  console.log(res);
						  // 数据操作
					}
				})
			}
		}
	}
</script>

<style>
	.pic{
		width: 326rpx;
		height: 326rpx;
		border-radius: 18rpx;
	}
</style>
