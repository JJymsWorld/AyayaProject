<template>
	<view class="bigBox">
		<view class="workBox" v-for="(item,index) in wishWork" :key="index">
			<navigator url="../../works/works" open-type="navigate">
				<image :src="item.covers" mode="aspectFill"></image>
			    <text>{{item.head}}</text>
			</navigator>
			
			<view class="edit">
				<navigator url="../../works/myWish" open-type="navigate">
					<view>编辑</view>
				</navigator>
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
		}
	}
</script>

<style>
	@import url("myWishList.css");
</style>
