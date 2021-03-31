<template>
	<view>
		<view class="index-halfpadding">
			<view class="index-header">
				<view class="row-box">
					<view v-for="(item,index) in index_tabs" :key='index' :id="index" class="uni-tab-item"
						@click="tabTap">
						<view class="uni-tab-item-title"
							:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{item}}</view>
					</view>
					<view class="index-searchbox" @click="indexSeach">
						<input style="font-size: 10pt;color: rgba(127,127,127,0.6);line-height: 49rpx;" disabled="true" value="2021年征集计划">
					</view>
				</view>
			</view>
			<view class="swiper-box">
				<swiper indicator-dots="true" autoplay="true" interval="4000" duration="1000"style="height: 355rpx;">
					<swiper-item v-for="(img,index) in swiperimgs" :key="index">
						<image :src="img.url" mode="aspectFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="recommend-part" v-if="tabIndex == 0">
			<view class="index-buttonBars">
				<view class="button-box">
					<view class="button-item" @click="onGotoPopCoser">
						<button class="button-img"
							style="background-image: url(../../static/buttonIcon/人气Cos榜.jpeg);"></button>
						<!-- <image class="button-img" src="../../static/buttonIcon/人气Cos榜.jpeg" mode="widthFix"></image> -->
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
				<view :class="['fas','fa-bars']" class="sort-icon" />
			</view>
			<view class="content-box">
				<waterfallsFlow :list="contentList" class="waterfallstyle">
					<template v-slot:default="item"  class="waterfalls">
						<view class="cnt">
							<view class="title">{{item.title}}</view>
							<view class="user-info-box">
								<image class="user-head-img" :src="item.headImg" mode="aspectFill"></image>
								<view class="user-name">{{item.userName}}</view>
								<view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.viewNum}}
								</view>
							</view>
						</view>
					</template>
				</waterfallsFlow>
			</view>
		</view>
		<view class="Hotcontent-list-box" v-if="tabIndex == 1">
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="item in HotList" :key="item.id" :title="item.text">
					<template v-slot:body>
						<view class="List-text">{{item.text}}</view>
					</template>
					<template v-slot:footer>
						<view class="Img-In-List">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components: {
			waterfallsFlow
		},
		data() {
			return {
				value: "",
				index_tabs: ["推荐", "热门"],
				tabIndex: 0,
				swiperimgs: [{
						imgId: 0,
						url: "../../static/swiperImg/2.jpg"
					},
					{
						imgId: 1,
						url: "../../static/swiperImg/2.jpg"
					}
				],
				topicType: "约拍广场",
				topicContent: "谁知江南无醉意，笑看春风",
				contentList: [{
						id: 1,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 3,
						image_url: "../../static/contentImg/3.jpg",
						title: '【汉服】西域美人',
						headImg: '../../static/contentImg/1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 2,
						image_url: "../../static/contentImg/2.jpg",
						title: '【Cos正品】楼兰',
						headImg: '../../static/contentImg/1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 4,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 5,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 6,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 7,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 8,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 9,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 10,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 11,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 12,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					}
				],
				HotList:[
					{
						id:1,
						image_url:'../../static/HotListImg/1.jpg',
						text:'蜜瓜JK妆!毕业要和姐妹去迪斯尼拍照呀!'
					},
					{
						id:2,
						image_url:'../../static/HotListImg/2.jpg',
						text:'江南美人图|奇迹团团环游中华之乌镇'
					},
					{
						id:3,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id:4,
						image_url:'../../static/HotListImg/4.jpg',
						text:'一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id:5,
						image_url:'../../static/HotListImg/5.jpg',
						text:'一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id:6,
						image_url:'../../static/HotListImg/6.jpg',
						text:'一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id:7,
						image_url:'../../static/HotListImg/7.jpg',
						text:'一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id:8,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id:9,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id:10,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id:11,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id:12,
						image_url:'../../static/HotListImg/3.jpg',
						text:'"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
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
			},
			onGotoPopCoser(){
				uni.navigateTo({
					url: '../PopCoser/PopCoser'
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");

	.row-box {
		display: flex;
		width: 90%;
		padding: 0;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		/* padding-left: 10rpx; */
		padding-right: 10rpx;
	}

	.uni-tab-item-title {
		color: #000000;
		font-size: 30rpx;
		height: 80rpx;
		margin-left: 30rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */

	}

	.uni-tab-item-title-active {
		height: 75rpx;
		color: #797979;
		font-size: 40rpx;
		border-bottom:8rpx solid #797979;
	}

	.index-searchbox {
		display: inline-block;
		border-radius: 40rpx;
		text-align: center;
		width: 100%;
		height: 47rpx;
		background-color: rgba(242,242,242,0.3);
		margin-left: 35rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.placeholder-style {
		font-size: 28rpx;
		color: #797979;
		margin: auto;
	}

	.swiper-box {
		height: 305rpx;
		align-items: center;
		width: 86%;
		margin: 35rpx auto;
		border-radius: 20rpx;
		box-shadow: 2px 2px 10px rgba(134,134,134,0.6);
		/* box-shadow: 0px 0px 4px 4px rgba(134,134,134,0.3); */
	}

	.swiper-item {
		height: 305rpx;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		border-style: none;
		border-radius: 20rpx;
	}

	.index-halfpadding {
		width: 100%;
		height: 410rpx;
		background-color: #F2A3C3;
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
		box-shadow:0px 0px 5px 5px rgba(0, 0, 0, 0.2);
	}

	.button-box {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		width: 90%;
		height: 165rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.button-item {
		width: 120rpx;
		height: 160rpx;
		margin: 33rpx auto;

	}

	.button-img {
		width: 75rpx;
		height: 75rpx;
		border-radius: 100rpx;
		border-style: none;
		background-size: cover;
		margin: auto;
	}

	.button-title {
		text-align: center;
		font-size: 25rpx;
		margin-top: 20rpx;
	}

	.topic-box {
		flex-direction: row;
		margin: 20rpx auto;
		width: 90%;
	}

	.topic-title {
		font-size: 20rpx;
		border-style: none;
		border-radius: 10rpx;
		background-color: #FFA7C7;
		margin-left: 50rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
		color: #F1F1F1;
	}

	.topic-type {
		font-size: 20rpx;
		color: #428BFF;
		opacity: 0.5;
		margin-left: 20rpx;
	}

	.topic-content {
		font-size: 8pt;
		color: #797979;
		opacity: 0.6;
		margin-left: 20rpx;
	}

	.sort-icon {
		margin: auto;
	}

	.title {
		text-align: left;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		font-size: 9pt;
		padding-left: 44rpx;
	}

	.user-info-box {
		display: flex;
		flex-direction: row;
		margin: auto;
	}

	.user-head-img {
		width: 35rpx;
		height: 35rpx;
		border-style: none;
		border-radius: 25rpx;
		margin-right: 10rpx;
	}

	.user-name {
		font-size: 8pt;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 120rpx;
	}

	.view-num {
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 8pt;
	}
	
	.Hotcontent-list-box{
		box-shadow: 2px 2px 10px rgba(134,134,134,0.2);
		border-radius: 30rpx 30rpx 0 0;
		width:90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50rpx;
		box-sizing: border-box;
		padding: 10rpx;
	}
	.List-text{
		font-size: 26rpx;
		text-align: left;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 30rpx;
	}
	.Img-In-List{
		width: 200rpx;
		height: 120rpx;
	}
	.ListImg-Style{
		width: 200rpx;
		height: 120rpx;
		border-style: none;
		border-radius: 15rpx;
	}
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
	.content-box{
		width: 87%;
		margin:30rpx auto
	}
	.waterfallstyle{
	}
	.waterfalls{
		width: 200rpx;
		box-shadow:0px 0px 5px 5px rgba(0, 0, 0, 0.2);
	}

</style>
