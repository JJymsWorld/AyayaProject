<template>
	<view class="bigBox">
		<view class="workBox" v-for="(item,index) in wishWork" :key="index">
			<navigator url="../../works/works" open-type="navigate">
				<image :src="item.covers" mode="aspectFill"></image>
			    <text>{{item.head}}</text>
			</navigator>
			
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
				wishWork:[
					{
						workId:"000001",
						covers:"../../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					}
				]
			}
		},
		methods:{
			myWishItemNavi(){
				uni.navigateTo({
					url:'../../works/myWish'
				})
			}
		}
	}
</script>

<style>
	@import url("myWishList.css");
</style>
