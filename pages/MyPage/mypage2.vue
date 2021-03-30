<template>
	<view>
        <!-- 第一模块：头像、昵称等 -->
		<table>
			<tr>
				<td><image class="avatar" src="../../static/iconn/2.jpg" mode="aspectFill" ></image></td>
				<td style="vertical-align: top;"><text class="username">jennie</text></td>
			</tr>
		</table>
		<view style="font-size: 10pt;font-family: Arial;height: 66rpx;">
			<text style="padding-left: 100rpx;line-height: 66rpx;">你还没有个性签名哦！</text>
		</view>
		<!-- 第二模块：关注、粉丝、获应援、获赞与收藏 -->
		<view>
			<table style="padding-left: 40rpx;height: 100rpx;">
			<tr>
				<td style="width: 130rpx;text-align: center;height: 30rpx;">
					<view class="number">2</view><view class="word">关注</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 150rpx;text-align: center;">
					<view class="number">0</view><view class="word">粉丝</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 150rpx;text-align: center;">
					<view class="number">0</view><view class="word">获应援</view>
				</td>
				<td style="color: #C0C0C0;font-size: 10pt;">|</td>
				<td style="width: 170rpx;text-align: center;">
					<view class="number">20</view><view class="word">获赞与收藏</view>
				</td>
			</tr>
		</table>
		</view>
		<!-- 第三模块：粉色边框按钮 -->
		<view style="padding-left: 33rpx;height: 150rpx;">
			<span class="forthline">
				<image src="../../static/icon/钱包.png" mode="aspectFill"></image> 
			    <text>我的钱包</text>
		    </span>
			<span class="forthline">
				<image src="../../static/icon/xinyuan.jpg" mode="aspectFill"></image> 
				<text>我的心愿</text>
			</span>
			<span class="forthline">
				<image src="../../static/icon/收藏夹.png" mode="aspectFill"></image>
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
				<td><image class="sixlinepic"src="../../static/icon/认证re.jpg"></image></td>
				<td><image class="sixlinepic"src="../../static/icon/勋章成就11.jpg"></image></td>
				<td><image class="sixlinepic"src="../../static/icon/活动11.jpg"></image></td>
				<td><image class="sixlinepic"src="../../static/icon/历史记录11.jpg"></image></td>
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
				<span style="width: 8rpx;height: 25rpx;background-color: #EF89B2;display: inline-block;border-radius: 5rpx;"></span>
				<text style="font-size: 13pt;font-weight:500;padding-left: 15rpx;">我的约拍</text>
				<text style="font-size: 9pt;font-weight:500;padding-left: 320rpx;color: #C0C0C0;">查看全部订单 ></text>
			</view>
			<table style="margin-left: 60rpx;margin-top: 38rpx;width: 380rpx;">
				<tr>
					<td><image class="sevenlinepic" src="../../static/icon/待处理.png"></image></td>
					<td><image class="sevenlinepic" src="../../static/icon/进行中.png"></image></td>
					<td><image class="sevenlinepic" src="../../static/icon/完成.png"></image></td>
				</tr>
				<tr>
					<td style="font-size: 9pt;">待处理</td>
					<td style="font-size: 9pt;">进行中</td>
					<td style="font-size: 9pt;">已完成</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page {
	background-color:#FBFBFB;
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
		width: 200rpx;
		height: 80rpx;
		border: #F2A3C3;
		border-radius: 18rpx;
		border-style: dashed;
		border-width: 4rpx;
		margin-left: 21rpx;
		margin-top: 25rpx;
	}
	.number {
		font-weight: bold;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15pt;
	}
	.word {
		font-weight: 100;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		color: #999999;
		font-size: 10pt;
	}
	.forthline image {
		width: 47rpx;
		height: 47rpx;
		padding-left: 20rpx;
		padding-top: 15rpx;
	}
	.forthline text {
		vertical-align: top;
		font-size: 10pt;
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
		width: 670rpx;
		height: 250rpx;
		/* background-color: #999999; */
		margin-left: 40rpx;
		margin-top: 40rpx;
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.finalbox view {
		padding-top: 20rpx;
	}
</style>
