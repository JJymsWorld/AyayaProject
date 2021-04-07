<template>
	<view>
		<view class="row-box">
			<view class="post-item-box">
				<view class="post-item" @click="gotoPostDynamic">
					<image src="../../static/postdynamic.png" mode="widthFix"></image>
					动态
				</view>
			</view>
			<view class="post-item-box">
				<view class="post-item" @click="gotoPostWorks">
					<image src="../../static/postworks.png" mode="widthFix"></image>
					作品
				</view>
			</view>
		</view>
		<view class="row-box cancel-box">
			<view class="cancel-image-box" @click="onCancelPost">
				<image src="../../static/cancel.png" mode="widthFix"></image>
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
			gotoPostDynamic: function(){
				uni.navigateTo({
					url: "./postDynamic"
				})
			},
			gotoPostWorks: function(){
				uni.navigateTo({
					url: './postWorks'
				})
			},
			onCancelPost:function(){
				uni.switchTab({
					url: '../Index_Recommend/Index_Hot'
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.row-box{
		margin-top: 750rpx;
	}
	.post-item-box{
		width: 50%;
		float: left;
	}
	.post-item{
		width: 50%;
		text-align: center;
		margin: 0 auto;
	}
	.post-item image{
		width: 100%;
		border-radius: 50%;
	}
	.cancel-box{
		margin-top: 0;
	}
	.cancel-image-box{
		width: 20%;
		margin: 0 auto;
	}
	.cancel-image-box image{
		width: 100%;
	}
	page{
			background-color: rgba(240, 240, 240, 1);
			background: rgba(240, 240, 240, 1);
		}
</style>
