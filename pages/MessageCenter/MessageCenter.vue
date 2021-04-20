<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="row-box icon-box">
			<view class="icon-item" @click="onCollectMsg">
				<view class="icon-image">
					<image src="../../static/messagecenter/collect.png" mode="widthFix"></image>
				</view>
				赞和收藏
			</view>
			<view class="icon-item" @click="onNewAttentionMsg">
				<view class="icon-image">
					<image src="../../static/messagecenter/attention.png" mode="widthFix"></image>
				</view>
				新增关注
			</view>
			<view class="icon-item" @click="onCommitMsg">
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
			<!-- 消息列表 -->
			<uni-list :border="false">
				<uni-list-item clickable @click="gotoDialogPage(index)" class="message-item" :border="false" :ellipsis='2' direction="row" v-for="(item, index) in MessageList" :key="index">
					<!-- 左边头像 -->
					<template v-slot:body>
						<view class="message-item-lbox list-item-lbox">
							<image src="../../static/image1.png" mode="widthFix"></image>
						</view>
					</template>
					<!-- 右边信息 -->
					<template v-slot:footer>
						<view class="message-item-rbox list-item-rbox">
							<view class="list-item-rbox-top">
								<text class="text1">{{item.name}}</text>
								<text class="text2">{{item.time}}</text>
							</view>
							<view class="list-item-rbox-buttom">
								<text class="text3">{{item.body}}</text>
								<uni-badge type="error" :text="item.msgNum" size="small" style="float: right;"></uni-badge>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				MessageList: [{
					image: '../../static/image1.png',
					name: '机智的党妹',
					time: '2020-12-08',
					body: '看来又有一个小可爱关注我了~',
					msgNum: 1
				}],
			}
		},
		methods: {
			// 跳转至赞和收藏页面
			onCollectMsg: function(){
				uni.navigateTo({
					url:'./collectmsg'
				})
			},
			// 跳转至新增关注页面
			onNewAttentionMsg: function(){
				uni.navigateTo({
					url:'./newattentionmsg'
				})
			},
			// 跳转至评论和@页面
			onCommitMsg: function(){
				uni.navigateTo({
					url:'./commitandat'
				})
			},
			// 跳转至对话框页面
			gotoDialogPage: function(index){
				console.log(index)
				uni.navigateTo({
					url: './cos-dialogpage'
				})
				// 查看消息后右侧角标消失
				this.MessageList[index].msgNum = 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	 /deep/ .uni-list-item{
	  background-color: #FBFBFB;
	  padding: 0;
	 }
	 /deep/ .uni-list-item__container{
	  background-color: #FFFFFF;
	  padding: 0;
	 }
</style>
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
		border-radius: 50%;
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
		width: 30%;
		color: #797979;
	}
	.message-item-rbox .text3{
		color: #797979;
		font-size: 12px;
		line-height: 20px;
	}
	.list-item-lbox image{
		width: 90rpx;
		border-radius: 50%;
	}
	.list-item-rbox{
		margin-left: 50rpx;
		width: 500rpx;
	}
	.list-item-rbox-buttom{
		padding-top: 4rpx;
	}
	.line{
		width: 100%;
		height: 7px;
		background-color: rgba(242, 242, 242, 0.5);
	}
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
</style>
