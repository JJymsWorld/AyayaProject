<template>
	<view class="backBox">
		<view class="linkStyle">原作品链接:</view>
		<view class="workBox" @click="workNavi()">
		    <image :src="work.covers" mode="aspectFill"></image>
		    <text>{{work.head}}</text>
		</view>
		<!-- @内容部分 -->
		<view class="contenPart">
			<table class="contenTable">
				<tr>
					<td class="contenTableLeft"><text>摄影:</text></td>
					<td>
						<view class="contenViewT">
							<text>@</text>
							<!-- <image src="../../static/icon/aite.png"></image> -->
							<text>默认为原作品摄影，也可选关注的摄影师</text></view>
					    
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"></image>
						<view class="contentMore">查看更多约拍摄影师</view></td>
					</tr>
				<tr>
					<td class="contenTableLeft"><text>服饰:</text></td>
					<td>
						<view class="contenViewT">
							<text>@</text>
							<text>默认为原作品服饰，也可自定义服饰链接</text></view>
						
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"></image>
						<view class="contentMore">搜索服饰教程</view></td>
					</tr>
				<tr>
					<td class="contenTableLeft"><text>妆容:</text></td>
					<td>
						<view class="contenViewT">
							<text>@</text>
							<text>默认为原作品妆容，也可选收藏的教程</text></view>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"></image>
						<view class="contentMore">搜索妆容教程</view>
					</td>
					</tr>
			</table>

			<view class="other">其他标签:</view>
			<image src="../../static/icon/other.png" class="otherIcon" mode="aspectFill"></image>
	</view>
	<view class="finalButton" @click="releaseWork()"><text>发布作品</text></view>
  </view>
	
</template>

<script>
	export default{
		data(){
			return{
				work:
					{
						workId:"",
						covers:"../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					},
				
				
			}
		},
		methods:{
			workNavi(){
				uni.navigateTo({
					url:'works'
				})
			},
			releaseWork(){
				uni.navigateTo({
					url:'../ContentReleasePage/postDynamic'
				})
			}
		}
	}
</script>

<style>
	@import url("myWishCss.css");
</style>
