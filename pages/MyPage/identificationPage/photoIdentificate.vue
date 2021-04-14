<template>
	<view>
		<table class="tablestyle">
			<tr style="height: 100rpx;">
				<td style="width: 148rpx;"><view class="wordstyle">真实姓名</view></td>
				<td><input value="请输入真实姓名" class="inputstyle"></td>
			</tr>
			<tr style="height: 100rpx;">
				<td><view class="wordstyle">平台昵称</view></td>
				<td><input value="请输入平台昵称"class="inputstyle"></td>
			</tr>
			<tr style="height: 100rpx;">
				<td><view class="wordstyle">手机号</view></td>
				<td><input value="请输入手机号"class="inputstyle"></td>
			</tr>
			<tr style="height: 100rpx;">
				<td><view class="wordstyle">活跃城市</view></td>
				<td><input value="请输入活跃城市"class="inputstyle"></td>
			</tr>
		</table>
		<view style="font-size: 14pt;padding-left: 66rpx;padding-top: 55rpx;">上传照片</view>
		<table class="tablestyle2">
			<tr>
				<td style="width: 170rpx;"><image src="../../../static/icon/addpic.png" class="addpic" mode="aspectFill"></image></td>
				<td style="width: 170rpx;"><image src="../../../static/icon/addpic.png" class="addpic" mode="aspectFill"></image></td>
				<td style="width: 170rpx;"><image src="../../../static/icon/addpic.png" class="addpic" mode="aspectFill"></image></td>
			</tr>
			<tr>
				<td><view class="picword">作品1</view></td>
				<td><view class="picword">作品2</view></td>
				<td><view class="picword">社交平台主页</view></td>
			</tr>
		</table>
		<view class="buttonBox"><text>提交申请</text></view>
	</view>
</template>

<script>
</script>

<style>
	.tablestyle{
		margin-left: 66rpx;
		margin-top: 120rpx;
	}
	.inputstyle{
		background-color: #F7F7F7;
		border-radius: 10rpx;
		display: inline-block;
		width: 390rpx;
		height: 65rpx;
		font-size: 11pt;
		color: #B4B4B4;
		padding-left: 50rpx;
		margin-top: 5rpx;
	}
	.wordstyle{
		font-size: 12pt;
		color: #333333;
	}
	.addpic{
		width: 160rpx;
		height: 160rpx;
	}
	.tablestyle2{
		margin-left: 66rpx;
		margin-top: 20rpx;
	}
	.picword{
		font-size: 10pt;
		color: #333333;
		text-align: center;
	}
	.buttonBox{
		width: 370rpx;
		height: 80rpx;
		background-color: #F2A3C3;
		border-radius: 15rpx;
		text-align: center;
		margin: 100rpx auto;
		
	}
	.buttonBox text{
		font-weight: bold;
		font-family: '黑体';
		color: #FFFFFF;
		line-height: 80rpx;
	}
</style>
