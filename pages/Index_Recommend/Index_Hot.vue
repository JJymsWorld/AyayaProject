<template>
	<view>
		<view class="index-header">
			<view class="row-box">
				<view v-for="(item,index) in index_tabs" :key='index' :id="index" class="uni-tab-item" @click="tabTap">
					<text class="uni-tab-item-title"
						:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{item}}</text>
				</view>
				<view class="index-searchbox" @click="indexSeach">
					<input placeholder="请输入搜索内容"  placeholder-class="placeholder-style"/>
				</view>
			</view>
		</view>
		<view class="swiper-box">
			<swiper indicator-dots="true" autoplay="true" interval="4000" duration="1000">
				<swiper-item v-for="(img,index) in swiperimgs" :key="index">
					<image :src="img.url" mode="aspectFill" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				index_tabs: ["推荐", "热门"],
				tabIndex: 0,
				swiperimgs:[
					{
						imgId:0,
						url:'../../static/swiperImg/1.jpg'
					},
					{
						imgId:1,
						url:'../../static/swiperImg/2.jpg'
					}
				]
			}
		},
		methods: {
			onSearch(e) {
				this.value = e.value
				console.log(this.value)
				uni.navigateTo({
					url: './searchRes?value=' + this.value
				})
			},
			tabTap(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
			indexSeach() {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	
	.row-box {
		display: flex;
		width: 85%;
		padding: 0;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 5px;
		padding-right: 5px;
	}

	.uni-tab-item-title {
		color: #000000;
		font-size: 12px;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */

	}

	.uni-tab-item-title-active {
		color: #797979;
		font-size: 20px;
		border-bottom: solid #797979;
	}
	.index-searchbox{
		display: inline-block;
		border-style: solid;
		border-color: #797979;
		border-width: 1px;
		border-radius: 10px;
		text-align: center;
		width: 65%;
		margin-left: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.placeholder-style{
		font-size: 12px;
		color: #797979;
	}
	.swiper-box{
		height: 150px;
		align-items: center;
		width: 85%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10px;
	}
	.swiper-item{
		display: block;
		height: 150px;
		width: 85%;
		margin-left: auto;
		margin-right: auto;
		border-style: none;
		border-radius: 10px;
	}
</style>
