<template>
	<view style="background-color: #FBFBFB;height: 1500rpx;">
		<view class="headbox">
			<image :src='avatarr'></image>
			<view class="text">
				<view class="text1">{{username}}</view>
			    <view class="text2">账号：{{account}}</view>
			</view>
			<view class="edit" @click="editNavi"><text>编辑</text></view>
		</view>
		<table style="width: 100%;background-color: #FFFFFF;margin-top: 10rpx;">
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
		},
		methods:{
			editNavi(){
				uni.navigateTo({
					url:'edit'
				})
			}
		}
	}
	
</script>

<style>
	.headbox{
		position: relative;
		top: 0rpx;
		left:0rpx;
		height: 250rpx;
		background-color: #FFFFFF;
	}
	.headbox image{
		position: absolute;
		top:75rpx;
		left:45rpx;
		width: 110rpx;
		height: 110rpx;
		border-radius: 90rpx;
	}
	 .text{
		position: absolute;
		top: 80rpx;
		left: 188rpx;
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
		top: 95rpx;
		right: 56rpx;
		width: 70rpx;
		height: 32rpx;
		border: 3rpx solid #EC808D;
		border-radius: 9rpx;
		text-align: center;
		line-height: 23rpx;
	}
	.edit text{
		font-size: 23rpx;
		color: #EC808D;

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
		padding-left: 48rpx;
	}
	.blanktd{
		height: 95rpx;
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
