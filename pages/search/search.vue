<template>
	<view class="box">
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" ></uni-search-bar>
		</view>
		<view class="row-box">
			<view class="hot-topic">
				<text class="search-text">热门话题</text>
			</view>
			<view class="hot-topic">
				<button class="topic-btn" v-for='(item,index) in hotTopic' :key='index'>{{item}}</button>
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
				<button class="hsty-btn" v-for='(item,index) in searchHsty' :key='index'>{{item}}</button>
			</view>
		</view>
	</view>
	
</template>


<script>
	
	export default {
		data() {
			return {
				value: "",
				hotTopic:['#12月份季番活动#','#漫展返图大赛#','#cosplay#','#妆容#'],
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
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.row-box{
		width: 90%;
	}
	.search-text{
		font-size: 16px;
		font-family: 'Courier New';
	}
	.topic-btn,.hsty-btn{
		float: left;
		margin: 8px;
		background-color: #FFF2F6;
		color: rgba(255,110,162,0.7);
		font-weight: 700;
		font-size: 12px;
		line-height: 28px;
		border-radius: 5px;
	}
	.hsty-btn{
		background-color: #F2F2F2;
		color: #323233;
	}
	.delete-icon{
		
	}
	.delete-text{
		padding: 5px;
		font-size: 12px;
	}
	.delete-hsty{
		float: right;
	}
</style>
