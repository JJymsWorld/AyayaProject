<template>
	<view>
		<table class="tablestyle">
			<tr style="height: 120rpx;">
				<td style="width: 200rpx;"><view class="wordstyle">真实姓名</view></td>
				<td><input value="请输入真实姓名" class="inputstyle"></td>
			</tr>
			<tr>
				<td><view class="wordstyle">身份证件号</view></td>
				<td><input value="请输入身份证件号"class="inputstyle"></td>
			</tr>
		</table>
		<view><image src="../../../static/icon/提交.png" style="width: 340rpx;height: 80rpx;padding-left: 205rpx;padding-top: 77rpx;" mode="aspectFill"></image></view>
	</view>
</template>

<script>
</script>

<style>
	.tablestyle{
		margin-left: 94rpx;
		margin-top: 120rpx;
	}
	.inputstyle{
		background-color: #F7F7F7;
		border-radius: 10rpx;
		display: inline-block;
		width: 300rpx;
		height: 70rpx;
		font-size: 11pt;
		color: #B4B4B4;
		padding-left: 50rpx;
	}
	.wordstyle{
		font-size: 12pt;
		color: #333333;
	}
</style>
