<template>
	<view class="bigBox">
		<view class="workBox" v-for="(item,index) in wishWork" :key="index">
				<image :src="item.first_pic" mode="aspectFill" @click="workNavi(item.workId)"></image>
			    <text>{{item.title}}</text>
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
				// wishWork:[
				// 	{
				// 		workId:"000001",
				// 		covers:"../../../static/iconn/4.jpg",
				// 		head:"江南美人图|奇迹党党环游中华之江南"
				// 	}
				// ]
				wishWork:[]
			}
		},
		onLoad() {
			this.loadMyWishList()
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
			async loadMyWishList (){
				const res = await this.$myRequest({
					url:'/MyPage/MyWishList/getAll',
					data:{
						user_id: 7
					}
				})
				console.log(res)
				this.wishWork=res.data
				
				// console.log(res)
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
