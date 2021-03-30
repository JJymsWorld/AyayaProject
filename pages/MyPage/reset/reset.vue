<template>
	<view style="background-color: #FBFBFB;height: 1500rpx;">
		<!-- <table style="background-color: #FFFFFF;width: 100%;height:210rpx;">
			<tr>
				<td><image class="avatar" src="../../../static/iconn/2.jpg" mode="aspectFill" ></image></td>
				<td style="vertical-align: top;width: 250rpx;">
					<view style="width: 300rpx;">
						<text class="username">jennie</text>
						<view style="font-size: 9pt;line-height: 12rpx;color: #AAAAAA;">账号:{{account}}</view>
					</view>
					</td>
				<td style="vertical-align: top;">
					<view style="font-size: 9pt;border: 3rpx solid #EC808D;border-radius: 9rpx;width: 70rpx;height: 30rpx;margin-left: 100rpx;margin-top: 45rpx;">
						<text style="line-height: 32rpx;padding-left: 13rpx;color: #EC808D;font-size: 9pt;">编辑</text></view>
				</td>
			</tr>
		</table> -->
		<view class="headbox">
			<image :src='avatarr'></image>
			<view class="text">
				<view class="text1">{{username}}</view>
			    <view class="text2">账号：{{account}}</view>
			</view>
			<view class="edit"><text>编辑</text></view>
		</view>
		<table style="width: 100%;background-color: #FFFFFF;">
			<tr class="blanktd">
				<td style="width: 680rpx;"><text class="word">账户与安全</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			<tr class="blanktd">
				<td><text class="word">支付设置</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			<tr class="blanktd">
				<td><text class="word">地区设置</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			<tr class="blanktd">
				<td><text class="word">隐私</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			<tr class="blanktd">
				<td><text class="word">通用</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
		</table>
		<table style="margin-top: 20rpx;width: 100%;background-color: #FFFFFF;">
			<tr class="blanktd">
				<td style="width: 680rpx;"><text class="word">问题反馈</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			<tr class="blanktd">
				<td><text class="word">关于Ayaya</text></td>
				<td><image class="extend" src="../../../static/icon/扩展1.png"mode="aspectFill"></image></td>
			</tr>
			</table>
		<view class="loginAndExit"style="margin-top: 20rpx;">切换账号</view>
		<view class="loginAndExit">退出登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				avatarr:'../../../static/iconn/2.jpg',
				username:'jennieee',
				account:'17367108604'
			}
		}
	}
	
</script>

<style>
	.headbox{
		position: relative;
		top: 0rpx;
		left:0rpx;
		height: 180rpx;
		background-color: #FFFFFF;
	}
	.headbox image{
		position: absolute;
		top:20rpx;
		left:45rpx;
		width: 110rpx;
		height: 110rpx;
		border-radius: 90rpx;
	}
	 .text{
		position: absolute;
		top: 35rpx;
		left: 200rpx;
	}
	.text1{
		/* line-height: 95rpx; */
		font-size: 13pt;
		font-weight: bold;
	}
	.text2{
		font-size: 9pt;
		line-height: 50rpx;
		color: #AAAAAA;
	}
	 .edit {
		position: absolute;
		top: 50rpx;
		right: 56rpx;
		width: 70rpx;
		height: 32rpx;
		border: 3rpx solid #EC808D;
		border-radius: 9rpx;/*        line-height: 32rpx; */
	}
	.edit text{
		position: absolute;
		top: 11rpx;
		right: 13rpx;
		font-size: 9pt;
		color: #EC808D;
		line-height: 10rpx;
		padding-left: 13rpx;
	}
	.avatar {
		width: 110rpx;
		height: 110rpx;
		border-radius: 90rpx;
		border: #FFFFFF;
		border-width: thin;
		margin-left: 45rpx;
		/* margin-top: 10rpx; */
		margin-bottom: 50rpx;
	}
	.username {
		/* padding-left: 20rpx; */
		line-height: 85rpx;
		font-size: 13pt;
		font-weight: bold;
	}
	.extend{
		width: 12rpx;
		height: 22rpx;
	}
	.word{
		font-size: 11pt;
		color: #333333;
		padding-left: 46rpx;
	}
	.blanktd{
		height: 80rpx;
		background-color: #FFFFFF;
	}
	.loginAndExit{
		list-style: none;
		font-size: 12pt;
		height: 90rpx;
		margin-top: 10rpx;
		line-height: 90rpx;
		text-align: center;
		background-color: #FFFFFF;
	}
</style>
