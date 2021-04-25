<template>
	<view>
		<view class="row-box">
			<view class="hot-topic">
				<text class="CoserListbox-down-footer-text">🔥</text>
				<text class="search-text">热门话题</text>
			</view>
			<view class="hot-topic">
				<view class="topic-btn" v-for='(item,index) in hotTopic' :key='index'>{{item.mark}}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				userId:'',
				hotTopic:['#12月份季番活动#','#漫展返图大赛#','#cosplay#','#妆容#'],
			}
		},
	methods:{
		
	},
	async onLoad(){
		// 获取热门话题
		const res = await this.$myRequest({
			url:'/Index/Search/getTopic',
		})
		this.hotTopic = res.data
		console.log(this.hotTopic)
	}
	}
</script>

<style>
@import url("../../static/css/login.css");
	.navigate-box{
		width: 100%;
		height: 70rpx;
	}
	.row-box{
		width: 90%;
	}
	.search-text{
		font-size: 32rpx;
		font-family: 'Courier New';
	}
	.topic-btn,.hsty-btn{
		float: left;
		margin-top: 40rpx;
		margin-right: 25rpx;
		padding: 0 30rpx;
		background-color: #FFF2F6;
		color: rgba(255,110,162,0.7);
		border: 1rpx solid #FFF2F6;
		font-weight: 700;
		font-size: 24rpx;
		line-height: 45rpx;
		border-radius: 35rpx;
	}
	page{
		background: #FFFFFF;
	}
</style>
