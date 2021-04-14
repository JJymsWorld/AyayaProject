<template>
	<view class="bigBox">
		<view class="workBox" v-for="(item,index) in wishWork" :key="index">
				<image :src="item.covers" mode="aspectFill" @click="workNavi(item.workId)"></image>
			    <text>{{item.head}}</text>
			<view class="edit" @click="myWishItemNavi()">
					<view>编辑</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:'4',
				wishWork:[
					{
						workId:"000001",
						covers:"../../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					}
				]
			}
		},
		onLoad() {
			
			uni.request({
				url:'/api/MyPage/MyWishList/getAll',
				data:{
					user_id:this.userId
				},
				success: (res) => {
				    console.log(res);
				}
			})
		},
		methods:{
			workNavi(i){
				uni.navigateTo({
					url:'../../works/works?workId='+i,
					
				})
			},
			myWishItemNavi(){
				uni.navigateTo({
					url:'../../works/myWish'
				})
			},
			loadMyWish(i){
				uni.request({
					url:'/api/MyPage/MyWishList/getAll',
					data:{
						user_id:i
					},
					success: (res) => {
					    console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	@import url("myWishList.css");
</style>
