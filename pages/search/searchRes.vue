<template>
	<view class="box">
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" @cancel="onGoBack" :value="value"></uni-search-bar>
		</view>
		<view class="row-box">
			<view v-for="(tab,index) in tabBars" :key="index" :id='index' class='uni-tab-item' @click="ontabtap">
			    <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab}}</text>
			</view>
			<view class="line-h"></view>
		</view>
		<view class="row-box user-box" v-if='tabIndex == 0'>
			<!-- 综合页面 -->
			<view class="row-box">
				<view class="user-item-box" v-for="(item,index) in users" :key="index">
					<view class="user-item-image">
						用户头像
					</view>
					<view class="user-item-name">
						{{item.name}}
					</view>
					
				</view>
				
			</view>
		</view>
		<view class="row-box" v-if='tabIndex == 1'>
			<!-- 作品页面 -->
			<text>作品</text>
		</view>
		<view class="row-box" v-if='tabIndex == 2'>
			<!-- 用户页面 -->
			<text>用户</text>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				tabBars:["综合","作品","用户"],
				tabIndex: 0,
				users: [
					{
						image:"",
						name:"1"
					},
					{
						image:"",
						name:"1"
					},
					{
						image:"",
						name:"1"
					},
					{
						image:"",
						name:"1"
					},
					{
						image:"",
						name:"1"
					}
				]
			}
		},
		onLoad(option){
			this.value = option.value
		},
		methods: {
			onSearch: function(e){
				this.value = e.value
				console.log(this.value)
				// 跳转至搜索结果页面
				uni.navigateTo({
					url: './searchRes'
				})
			},
			// 清空搜索历史
			delHsty: function(){
				console.log('清空搜索历史')
			},
			ontabtap: function(e){
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
			// 返回前一页面
			onGoBack: function(){
				console.log('cancel')
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.row-box{
		width: 90%;
		padding: 0;
	}
	.user-box{
		width: 100%;
	}
	.search-text{
		font-size: 16px;
		font-family: 'Courier New';
	}
	.uni-tab-item {
	    /* #ifndef APP-PLUS */
	    display: inline-block;
	    /* #endif */
	    flex-wrap: nowrap;
	    padding-left: 34rpx;
	    padding-right: 34rpx;
	}
	.uni-tab-item-title {
	    color: #555;
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	.uni-tab-item-title-active {
		color: #FF6EA2;
	    font-size: 40rpx;
	}
	.user-item-box{
		float: left;
		width: 120rpx;
		margin: 6rpx;
	}
	.user-item-image {
		background-color: #007AFF;
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
	}
	.user-item-name{
		width: 120rpx;
		text-align: center;
	}
</style>
