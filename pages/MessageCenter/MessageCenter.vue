<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="row-box icon-box">
			<view class="icon-item">
				<view class="icon-image">
					<image src="../../static/messagecenter/collect.png" mode="widthFix"></image>
				</view>
				赞和收藏
			</view>
			<view class="icon-item">
				<view class="icon-image">
					<image src="../../static/messagecenter/attention.png" mode="widthFix"></image>
				</view>
				新增关注
			</view>
			<view class="icon-item">
				<view class="icon-image">
					<image src="../../static/messagecenter/comment.png" mode="widthFix"></image>
				</view>
				评论和@
			</view>
		</view>
		<view class="line"></view>
		<view class="row-box message-box">
			<view class="message-item">
				<image src="../../static/systemmsg.png" mode="widthFix"></image>
				<view class="message-item-rbox">
					系统消息
				</view>
			</view>
			<view class="message-item">
				<image src="../../static/officialmsg.png" mode="widthFix"></image>
				<view class="message-item-rbox">
					官方公告
				</view>
			</view>
			<view class="message-item">
				<image src="../../static/image1.png" mode="widthFix"></image>
				<view class="message-item-rbox">
					<view class="">
						<text class="text1">机智的党妹</text>
						<text class="text2">2020-12-08</text>
					</view>
					<text class="text3">看来又有一个小可爱关注我了~</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.icon-box{
		width: 90%;
	}
	.icon-item{
		width: 33%;
		font-size: 13px;
		font-family: 'PingFang SC';
		color: #101010;
		text-align: center;
		float: left;
	}
	.icon-box image{
		width: 40%;	
	}
	.message-box{
		width: 100%;
		padding-left: 7%;
	}
	.message-item{
		margin-bottom: 17px;
	}
	.message-item image{
		width: 12%;
	}
	.message-item-rbox{
		float: right;
		width: 82%;
		height: 45px;
		font-size: 14px;
		font-family: 'PingFang SC';
		padding: 5px 0;
		border-bottom: solid 1px rgba(121, 121, 121, 0.1);
	}
	.message-item-rbox text{
		font-size: 14px;
		line-height: 20px;
		font-family: 'PingFang SC';
	}
	.message-item-rbox .text2{
		float: right;
		font-size: 12px;
		line-height: 20px;
		width: 40%;
		color: #797979;
	}
	.message-item-rbox .text3{
		color: #797979;
		font-size: 12px;
		line-height: 20px;
	}
	.line{
		width: 100%;
		height: 7px;
		background-color: rgba(242, 242, 242, 0.5);
	}
</style>
