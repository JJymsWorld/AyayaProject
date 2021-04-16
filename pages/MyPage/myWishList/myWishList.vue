<template>
	<view class="bigBox">
		<view class="workBox" v-for="(item,index) in wishWork" :key="index">
<<<<<<< HEAD
			<navigator url="../../works/works" open-type="navigate">
				<image :src="item.covers" mode="aspectFill"></image>
			    <text>{{item.head}}</text>
			</navigator>
			
=======
				<image :src="item.covers" mode="aspectFill" @click="workNavi(item.workId)"></image>
			    <text>{{item.head}}</text>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
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
<<<<<<< HEAD
=======
				userId:'4',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
				wishWork:[
					{
						workId:"000001",
						covers:"../../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					}
				]
			}
		},
<<<<<<< HEAD
		methods:{
=======
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			myWishItemNavi(){
				uni.navigateTo({
					url:'../../works/myWish'
				})
<<<<<<< HEAD
=======
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			}
		}
	}
</script>

<style>
	@import url("myWishList.css");
</style>
