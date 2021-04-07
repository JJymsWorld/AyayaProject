<template>
	<view>
		<view class="status_bar">
		            <!-- 这里是状态栏 -->
		</view>
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
						<image :src="img.url" mode="aspectFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="recommend-part" v-if="tabIndex == 0">
			<view class="index-buttonBars">
				<view class="button-box">
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/CosList.jpeg" mode="aspectFill" @click="CosListButtonClick"></image>
						<view class="button-title">人气Cos榜</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/PhotoSquare.jpeg" mode="aspectFill"></image>
						<view class="button-title">约拍广场</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/ClothMakeup.jpeg" mode="aspectFill"></image>
						<view class="button-title">服饰妆容</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/HotActivities.jpeg" mode="aspectFill"></image>
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
				<waterfallsFlow :list="contentList">
					<template v-slot:default="item" class="content-box-item" >
						<view class="cnt" @click="jumpto">
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
				<uni-load-more status="noMore"></uni-load-more>
			</view>
		</view>
		<view class="Hotcontent-list-box" v-if="tabIndex == 1">
			<uni-list :border="false" class="Hotcontent-list-list">
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
			<uni-load-more status="noMore"></uni-load-more>
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
						url: "../../static/swiperImg/1.jpg"
					},
					{
						imgId: 1,
						url: "../../static/swiperImg/2.jpg"
					}
				],
				topicType: "约拍广场",
				topicContent: "谁知江南无醉意，笑看春风。",
				contentList: [{
						id: 1,
						image_url: "../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 2,
						image_url: "../../static/contentImg/2.jpg",
						title: '【Cos正品】楼兰',
						headImg: '../../static/contentImg/headimg1.jpg',
						userName: 'CN清风',
						viewNum: 2206
					},
					{
						id: 3,
						image_url: "../../static/contentImg/3.jpg",
						title: '【汉服】西域美人',
						headImg: '../../static/contentImg/headimg1.jpg',
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
			CosListButtonClick() {
				uni.navigateTo({
					url:'../PopCoser/PopCoser'
				})
			},
			jumpto(){
				uni.navigateTo({
					url:'../HotActivities/CollectionContentPage'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-box{
		width: 95%;
		margin-left: auto;
		margin-right: auto;
		.cnt{
			padding: 10rpx;
		}
	}
	
</style>

<style>
	@import url("../../static/css/login.css");
	
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F2A3C3;
	}
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
		box-shadow: 2px 2px 10px rgba(134,134,134,0.6);
		border-style: none;
		border-radius: 20rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		width: 100%;
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
		display: flex;
		flex-direction: column;
		width: 120rpx;
		height: 160rpx;
		margin: auto;
		align-items: center;
	}

	.button-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border-style: none;
		/* background-size: contain; */
	}

	.button-title {
		text-align: center;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	.topic-box {
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-left: auto;
		margin-right: auto;
		width: 90%;
	}

	.topic-title {
		font-size: 25rpx;
		border-style: none;
		border-radius: 10rpx;
		background-color: #FFA7C7;
		margin: auto;
		padding: 10rpx 20rpx 10rpx 20rpx;
		color: #F1F1F1;
	}

	.topic-type {
		font-size: 25rpx;
		color: #428BFF;
		margin: auto;
	}

	.topic-content {
		font-size: 25rpx;
		color: #797979;
		margin: auto;
	}

	.sort-icon {
		margin: auto;
	}
	
	.title {
		text-align: left;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 36rpx;
	}

	.user-info-box {
		display: flex;
		flex-direction: row;
		margin: auto;
	}

	.user-head-img {
		width: 50rpx;
		height: 50rpx;
		border-style: none;
		border-radius: 25rpx;
		margin-right: 10rpx;
		margin-left: 5rpx;
	}

	.user-name {
		font-size: 25rpx;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: auto;
	}

	.view-num {
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 25rpx;
	}
	
	.Hotcontent-list-box{
		box-shadow:0 0 4rpx 4rpx rgb(215,215,215);
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
</style>
