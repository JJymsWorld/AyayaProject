<template>
	<view>
		<view class="row-box message-box">
			<view class="message-item">
				<view class="message-item-lbox">
					<image src="../../static/image1.png" mode="widthFix"></image>
				</view>
				<view class="message-item-rbox">
					<view class="message-item-rbox-left">
						<view class="">
							<text>机智的党妹</text>
						</view>
						<view class="">
							<text class="text2">回复：你真好看</text>
						</view>
						<view class="">
							<text class="text2">2020-12-08  21：33</text>
						</view>
					</view>
					<view class="message-item-rbox-right">
						<image src="../../static/worksimg.png" mode="heightFix"></image>
					</view>
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
	.message-box{
		width: 90%;
	}
	.message-item{
		margin-bottom: 17px;
	}
	.message-item-lbox{
		float: left;
		width: 15%;
	}
	.message-item-lbox image{
		width: 100%;
		border-radius: 50%;
	}
	.message-item-rbox{
		float: right;
		overflow: hidden;
		width: 80%;
		height: 50px;
		font-size: 14px;
		font-family: 'PingFang SC';
		padding: 5px 0;
		border-bottom: solid 1px rgba(121, 121, 121, 0.1);
	}
	.message-item-rbox-left{
		float: left;
		width: 70%;
		height: 100%;
	}
	.message-item-rbox-left view{
		height: 33%;
	}
	.message-item-rbox-left image{
		height: 100%;
	}
	.message-item-rbox-left text{
		font-size: 14px;
		font-family: 'PingFang SC';
	}
	.message-item-rbox-left .text2{
		font-size: 12px;
		color: #797979;
	}
	.message-item-rbox-right{
		height: 100%;
		float: right;
	}
	.message-item-rbox-right image{
		height: 100%;
		border-radius: 10px;
	}
	.message-item-rbox .text3{
		color: #797979;
		font-size: 12px;
		line-height: 20px;
	}
</style>
