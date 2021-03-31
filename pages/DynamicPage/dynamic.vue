<template>
	<view class="body">
		<!-- 搜索 -->
		<view class="searchBox">
			<!-- <icon :type='inconType' size="26"></icon> -->
			<image class="searchIcon"src="../../static/icon/search.png"></image>
			<view class='searchiInput'><input  value="查找精彩动态内容" /></view>
		   	
		</view>
		<!-- 近期发布动态的用户 -->
		<view class="recentBox">
			<table class='recentTable'>
				<tr>
					<td  v-for="(item,index) in recentUser" :key="index">
						<image :src='item.avatarT' mode="aspectFill"></image>
						<view>{{item.usernameT}}</view>
					</td>
				</tr>
				
			</table>
		</view>
		<!-- 动态内容 -->
		<view class="dynamicIt"v-for="(item,index) in dynamicItem" :key="index">
			<view class="dynamnicHead">
				<image class="dynamicAvatar" :src='item.avatarD'></image>
				<view class="dynamicUserDate">
					<view class="dynamicUsername">{{item.usernameD}}</view>
				    <view class="dynamicDate">{{item.date}}</view>
				</view>
				
			</view>
			<!-- 正文 -->
			<view class="dynamicText">{{item.title}}</view>
			<!-- 封面 -->
			<image class="dynamicImage" :src='item.imageD' mode="aspectFill"></image>
			<!-- 标题 -->
			<view class="dynamicTitle">{{item.textD}}</view>
			<table class="littleIconTable">
				<tr>
					<td>
						<image class='littleIcon'src='../../static/icon/like.png'></image>
						<text class="number">{{item.interestNum}}</text>
					</td>
					<td>
					    <image class='littleIcon' src="../../static/icon/chat.png"></image>
					    <text class="number">{{item.commentNum}}</text>
					</td>
					<td>
						<image class='littleIcon' src="../../static/icon/relay.png"></image>
						<text class="number">{{item.relayNum}}</text>
					</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	export default{
		// data(){
		// 	return{
		// 		inconType:['search']
		// 	}
		// },
		// onLoad(){
		// 	this.inconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
		// }
		data(){
			return{
				recentUser:[
					{
					avatarT:'../../static/iconn/p2.jpg',
					usernameT:'蒲儿姓蒲'
					},
					{
						avatarT:'../../static/iconn/p3.jpg',
						usernameT:'Suzy_Z'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					}
				],
				dynamicItem:[
					{
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						commentNum:'2145',
						relayNum:'1141'
					}
				]
			}
		}
	}
</script>

<style>
	@import url("dynamic.css");
</style>
