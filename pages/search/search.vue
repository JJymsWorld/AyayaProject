<template>
	<view class="box">
		<view class="navigate-box">
			
		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" @cancel="onGoBack" :radius="30" ></uni-search-bar>
		</view>
		<view class="row-box">
			<view class="hot-topic">
				<text class="search-text">热门话题</text>
			</view>
			<view class="hot-topic">
				<view class="topic-btn" v-for='(item,index) in hotTopic' :key='index'>{{item.mark}}</view>
			</view>
		</view>
		<view class="row-box">
			<view class="search-hsty">
				<text class="search-text">搜索历史</text>
				<view class="delete-hsty" @click="delHsty">
					<span class="iconfont delete-icon">&#xe6ba;</span>
					<text class="delete-text">清空搜索历史</text>
				</view>
			</view>
			<view class="search-hsty">
				<view class="hsty-btn" v-for='(item,index) in searchHsty' :key='index'>{{item}}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				// hotTopic:['#12月份季番活动#','#漫展返图大赛#','#cosplay#','#妆容#'],
				hotTopic:[],
				searchHsty:['#12月份季番活动#','#漫展返图大赛#','#cosplay#','#妆容#']
			}
		},
		methods: {
			onSearch: function(e){
				this.value = e.value
				console.log(this.value)
				// 跳转至搜索结果页面
				uni.navigateTo({
					url: './searchRes?value='+this.value
				})
			},
			// 清空搜索历史
			delHsty: function(){
				console.log('清空搜索历史')
			},
			// 返回前一页面
			onGoBack: function(){
				console.log('cancel')
				uni.navigateBack({
					
				})
			}
		},
		async onLoad(){
			// 获取热门话题
			const res = await this.$myRequest({
				url:'/Search/Index/Search/getTopic',
			})
			this.hotTopic = res.data
			console.log(this.hotTopic)
			// 获取用户历史搜索记录
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
	.hsty-btn{
		background-color: #F2F2F2;
		border: 1rpx solid #F2F2F2;
		color: #323233;
	}
	.delete-icon{
		
	}
	.delete-text{
		padding: 10rpx;
		font-size: 24rpx;
	}
	.delete-hsty{
		float: right;
	}
	page{
		background: #FFFFFF;
	}
</style>
