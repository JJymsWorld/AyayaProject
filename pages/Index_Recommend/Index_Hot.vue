<template>
	<view>
		<view class="index-halfpadding">
			<view class="index-header">
				<view class="row-box">
					<view v-for="(item,index) in index_tabs" :key='index' :id="index" class="uni-tab-item"
						@click="tabTap">
						<text class="uni-tab-item-title"
							:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{item}}</text>
					</view>
					<view class="index-searchbox" @click="indexSeach">
						<input disabled="true" placeholder="请输入搜索内容" placeholder-class="placeholder-style" />
					</view>
				</view>
			</view>
			<view class="swiper-box">
				<swiper indicator-dots="true" autoplay="true" interval="4000" duration="1000">
					<swiper-item v-for="(img,index) in swiperimgs" :key="index">
						<image :src="img.url" mode="scaleToFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="index-buttonBars">
			<view class="button-box">
				<view class="button-item">
					<button class="button-img"
						style="background-image: url(../../static/buttonIcon/人气Cos榜.jpeg);"></button>
					<view class="button-title">人气Cos榜</view>
				</view>
				<view class="button-item">
					<button class="button-img"
						style="background-image: url(../../static/buttonIcon/约拍广场.jpeg);"></button>
					<view class="button-title">约拍广场</view>
				</view>
				<view class="button-item">
					<button class="button-img"
						style="background-image: url(../../static/buttonIcon/服饰妆容.jpeg);"></button>
					<view class="button-title">服饰妆容</view>
				</view>
				<view class="button-item">
					<button class="button-img"
						style="background-image: url(../../static/buttonIcon/热门活动.jpeg);"></button>
					<view class="button-title">热门活动</view>
				</view>
			</view>
		</view>
		<view class="topic-box">
			<text class="topic-title">话题</text>
			<text class="topic-type">#{{topicType}}#</text>
			<text class="topic-content">{{topicContent}}</text>
			<view :class="['fas','fa-bars']" class="sort-icon"/>
		</view>
		<view class="content-box">
			<waterfallsFlow :list="contentList" >
				<template v-slot:default="item">
					<view class="cnt">
						<view class="title">{{item.title}}</view>
						<view class="user-info-box">
							<image class="user-head-img" src="../../static/contentImg/headimg1.jpg" mode="widthFix"></image>
							<view class="user-name">{{item.userName}}</view>
							<view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.viewNum}}</view>
						</view>
					</view>
				</template>
			</waterfallsFlow>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components: {waterfallsFlow},
		onPullDownRefresh() {
			this.$refs.waterfallsFlow.refresh();
		},
		data() {
			return {
				value: "",
				index_tabs: ["推荐", "热门"],
				tabIndex: 0,
				swiperimgs: [{
						imgId: 0,
						url: "../../static/swiperImg/1.jpg"
					},
					{
						imgId: 1,
						url: "../../static/swiperImg/2.jpg"
					}
				],
				topicType:"约拍广场",
				topicContent:"谁知江南无醉意，笑看春风",
				contentList:[
					{
						id:1,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:2,
						image_url: "../../static/contentImg/2.jpg",
						title: '【Cos正品】楼兰',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:3,
						image_url: "../../static/contentImg/3.jpg",
						title: '【汉服】西域美人',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:4,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:5,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:6,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:7,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:8,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:9,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:10,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:11,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
					},
					{
						id:12,
						image_url:"../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum:2206
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
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.uni-tab-item-title {
		color: #000000;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */

	}

	.uni-tab-item-title-active {
		color: #797979;
		font-size: 40rpx;
		border-bottom: solid #797979;
	}

	.index-searchbox {
		display: inline-block;
		border-style: solid;
		border-color: #797979;
		border-width: 2rpx;
		border-radius: 20rpx;
		text-align: center;
		width: 65%;
		margin-left: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.placeholder-style {
		font-size: 28rpx;
		color: #797979;
		margin: auto;
	}

	.swiper-box {
		height: 300rpx;
		align-items: center;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		width: 95%;
		margin-left: auto;
		margin-right: auto;
		border-style: none;
		border-radius: 20rpx;
	}

	.index-halfpadding {
		border-style: none;
		background-color: #F2A3C3;
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
	}

	.button-box {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}

	.button-item {
		width: 120rpx;
		height: 160rpx;
		margin: auto;

	}

	.button-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		background-size: cover;
		margin: auto;
	}

	.button-title {
		text-align: center;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	.topic-box{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-left: auto;
		margin-right: auto;
		width: 90%;
	}
	.topic-title{
		font-size: 20rpx;
		border-style: none;
		border-radius: 10rpx;
		background-color: #FFA7C7;
		margin: auto;
		padding:10rpx 20rpx 10rpx 20rpx ;
		color: #F1F1F1;
	}
	.topic-type{
		font-size: 20rpx;
		color: #428BFF;
		margin: auto;
	}
	.topic-content{
		font-size: 20rpx;
		color: #797979;
		margin: auto;
	}
	.sort-icon{
		margin: auto;
	}
	.title{
		text-align: left;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 36rpx;
	}
	.user-info-box{
		display: flex;
		flex-direction: row;
		margin: auto;
	}
	.user-head-img{
		width: 50rpx;
		height: 50rpx;
		border-style: none;
		border-radius: 25rpx;
		margin-right: 10rpx;
	}
	.user-name{
		font-size: 25rpx;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 120rpx;
	}
	.view-num{
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 25rpx;
	}
</style>
