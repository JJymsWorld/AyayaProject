<template>
	<view>
<!-- 		<view style="height: 70rpx;">
			<navigator url="reset/reset" open-type="navigate">
				<image src="../../static/icon/设置.png"style="width: 39rpx;height: 39rpx;margin-left:0rpx;margin-top: 40rpx;opacity: 0.5;"mode="aspectFill"></image>
			</navigator>
		</view> -->
        <!-- 第一模块：头像、昵称等 -->
		<view class="head" >
			<span class="iconfont" @click='resetNavi()'>&#xe60a;</span>
		</view>
		<view class="head1">
		<table>
			<tr>
				<td><image class="avatar" :src="avatar" mode="aspectFill" ></image></td>
				<td style="vertical-align: top;"><text class="username">{{userName}}</text></td>
			</tr>
		</table>	
		<view @click="homePageNavi()" style="font-size: 9pt;border: 3rpx solid #797979;opacity: 0.7; border-radius: 9rpx;width: 120rpx;height: 46rpx;position: absolute;top: 30rpx;right: 60rpx;">
		<text style="line-height: 46rpx;padding-left: 11rpx;color: #797979;">个人主页</text></view>
		</view>
		
		<view style="font-size: 10pt;font-family: Arial;width: 75%;padding-left: 100rpx;margin-top: 20rpx;">
			<text style="line-height: 36rpx;font-size: 9pt;">{{signature}}</text>
		</view>
		<!-- 第二模块：关注、粉丝、获应援、获赞与收藏 -->
		<view style="margin-top: 30rpx;">
			<table style="padding-left: 40rpx;height: 100rpx;">
			<tr>
				<td style="width: 130rpx;text-align: center;height: 30rpx;" @click="focusNavi(userId)">
					<view class="number">{{interestN}}</view><view class="word">关注</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 150rpx;text-align: center;"@click="fanNavi(userId)">
					<view class="number">{{fanN}}</view><view class="word">粉丝</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 150rpx;text-align: center;">
					<view class="number">{{starN}}</view><view class="word">获应援</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 170rpx;text-align: center;">
					<view class="number">{{praiseN}}</view><view class="word">获赞与收藏</view>
				</td>
			</tr>
		</table>
		</view>
		<!-- 第三模块：粉色边框按钮 -->
		<view style="padding-left: 33rpx;height: 150rpx;margin: 10rpx auto;width: 700rpx;">
			<span class="forthline">
				<image src="../../static/icon/moneyBag.png" mode="aspectFill"style="vertical-align: top;"></image> 
			    <text>我的钱包</text>
		    </span>
			<span class="forthline" @click='myWishNavi()'>
					<image src="../../static/icon/xinyuan.jpg" mode="aspectFill"style="vertical-align: top;"></image> 
				<text>我的心愿</text>
			</span>
			<span class="forthline" @click='myCollectionNavi()'>
				<image src="../../static/icon/shoucangjia.png" mode="aspectFill"style="vertical-align: top;"></image>
				<text>我的收藏</text>
			</span>
		</view>
		<!-- 第四模块：认证、勋章成就、活动、历史记录 -->
		<view>
			<span style="width: 8rpx;height: 25rpx;background-color: #EF89B2;display: inline-block;border-radius: 5rpx;margin-left: 60rpx;"></span>
			<text style="font-size: 13pt;font-weight:500;padding-left: 15rpx;">个人中心</text>
		</view>
		<table style="padding-left: 80rpx;width: 750rpx;padding-top: 28rpx;">
			<tr>
				<td>
					<image class="sixlinepic"src="../../static/icon/re.jpg" @click="identivateNavi()"></image>
				</td>
				<td><image class="sixlinepic"src="../../static/icon/attainment.jpg"></image></td>
				<td><image class="sixlinepic"src="../../static/icon/entertainment.jpg"></image></td>
				<td><image class="sixlinepic"src="../../static/icon/onrecord.jpg"></image></td>
			</tr>
			<tr style="height: 50rpx;">
				<td style="font-size: 9pt;"> 身份认证</td>
				<td style="font-size: 9pt;"> 勋章成就</td>
				<td style="font-size: 9pt;"> 参与活动</td>
				<td style="font-size: 9pt;"> 历史记录</td>
			</tr>
		</table>
		<!-- 第五模块：我的约拍 -->
		<view class="finalbox">
			<view style="border-bottom:1rpx solid #e9e9e9;width: 630rpx;margin-left: 20rpx;height: 60rpx;">
				<span style="width: 8rpx;height: 25rpx;background-color: #EF89B2;display: inline-block;border-radius: 5rpx;position: absolute;top: 35rpx;left: 20rpx;"></span>
				<text style="font-size: 13pt;font-weight:500;position: absolute;top: 15rpx;left: 38rpx;">我的约拍</text>
				<text @click="lookUpOrder(0)" style="font-size: 9pt;font-weight:500;color: #C0C0C0;position: absolute;top: 30rpx;right: 40rpx;">查看全部订单 ></text>
			</view>
			<table style="margin-left: 60rpx;margin-top: 38rpx;width: 380rpx;">
				<tr>
					<td><image class="sevenlinepic" src="../../static/icon/waiting.png"  @click="lookUpOrder(1)"></image></td>
					<td><image class="sevenlinepic" src="../../static/icon/doing.png" @click="lookUpOrder(2)"></image></td>
					<td><image class="sevenlinepic" src="../../static/icon/complete.png" @click="lookUpOrder(3)"></image></td>
				</tr>
				<tr>
					<td style="font-size: 8pt;line-height: 30rpx;">待处理</td>
					<td style="font-size: 8pt;line-height: 30rpx;">进行中</td>
					<td style="font-size: 8pt;line-height: 30rpx;">已完成</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			this.userId=getApp().globalData.global_userId
		},
		data(){
			// userId:'';
			// userName:'';
			// avatar:'../../static/iconn/2.jpg';
			// signature:'你还没有个性签名哦！';
			// interestN:'2';
			// fanN:'0';
			// starN:'0';
			// praiseN:'23'
			return{
				userId:'1234',
				userName:'jenniee',
				avatar:'../../static/iconn/2.jpg',
				signature:'你还没有个性签名哦！',
				interestN:'2',
				fanN:'0',
				starN:'0',
				praiseN:'33'
			}

		},
		methods:{
			focusNavi(i){
				uni.navigateTo({
					url:'foucsAndFan/focus?userId='+i
				})
			},
			fanNavi(i){
				uni.navigateTo({
					url:'foucsAndFan/fan?userId='+i
				})
			},
			resetNavi(){
				uni.navigateTo({
					url:'reset/reset'
				})
			},
			identivateNavi(){
				uni.navigateTo({
					url:'identificationPage/identification'
				})
			},
			homePageNavi(){
				uni.navigateTo({
					url:'homePage/homePage?userId='+this.userId
				})
			},
			myCollectionNavi(){
				uni.navigateTo({
					url:'./myStarList/myStarList'
				})
			},
			myWishNavi(){
				uni.navigateTo({
					url:'myWishList/myWishList'
				})
			},
			lookUpOrder(i){
				uni.navigateTo({
					url:'../pictureOrder/coser/cosorder?currentIndex='+i
				})
			}
		}
	}
</script>

<style>
	@import url("icon.css");
	page {
	background-color:#FBFBFB;
	}
	.head{
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 70px;
	}
	.head1{
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
	}
	.avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 90rpx;
		border: #FFFFFF;
		border-width: thin;
		margin-left: 53rpx;
	}
	.username {
		padding-left: 20rpx;
		line-height: 70rpx;
		font-size: 13pt;
		font-weight: bold;
	}
	.forthline {
		display: inline-block;
		width: 190rpx;
		height: 80rpx;
		border: #F2A3C3;
		border-radius: 18rpx;
		border-style:dashed;
		border-width: 5rpx;
		margin-left: 21rpx;
		margin-top: 25rpx;
	}
	.number {
		font-weight: bold;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15pt;
		line-height: 60rpx;
	}
	.word {
		font-weight: 100;
		font-family: 'Arial';
		color: #999999;
		font-size: 9pt;
	}
	.forthline image {
		width: 47rpx;
		height: 47rpx;
		padding-left: 15rpx;
		padding-top: 15rpx;
	}
	.forthline text {
		font-size: 9pt;
		font-family: 'Arial';
		line-height: 80rpx;
		padding-left: 9rpx;
	}
	.sixlinepic {
		width: 78rpx;
		height: 78rpx;
		border-radius: 90rpx;
		margin-left: 6rpx;
	}
	.sevenlinepic {
		width: 50rpx;
		height: 50rpx;
		padding-left: 8rpx;
	}
	.finalbox {
		position: relative;
		top: 40rpx;
		left: 40rpx;
		width: 670rpx;
		height: 250rpx;
		/* background-color: #999999; */
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.finalbox view {
		padding-top: 20rpx;
	}
</style>
