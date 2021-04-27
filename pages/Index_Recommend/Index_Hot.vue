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
						<input style="font-size: 10pt;color: rgba(127,127,127,0.6);line-height: 49rpx;" disabled="true"
							value="2021年征集计划" />
					</view>
				</view>
			</view>
			<view class="swiper-box">
				<swiper indicator-dots="true" autoplay="true" interval="4000" duration="1000" style="height: 355rpx;">
					<swiper-item v-for="(img,index) in swiperimgs" :key="index" @click="workNavigateSwiper(img.opus_id)">
						<image :src="img.photo" mode="aspectFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="recommend-part" v-if="tabIndex == 0">
			<view class="index-buttonBars">
				<view class="button-box">
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/CosList.jpeg" mode="aspectFill"
							@click="CosListButtonClick"></image>
						<view class="button-title">人气Cos榜</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/PhotoSquare.jpeg" mode="aspectFill"
							@click="PhotoSquareButtonClick"></image>
						<view class="button-title">约拍广场</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/ClothMakeup.jpeg" mode="aspectFill"
							@click="ClothMakeupButtonClick"></image>
						<view class="button-title">服饰妆容</view>
					</view>
					<view class="button-item">
						<image class="button-img" src="../../static/buttonIcon/HotActivities.jpeg" mode="aspectFill"
							@click="HotActivitiesButtonClick"></image>
						<view class="button-title">热门活动</view>
					</view>
				</view>
			</view>
			<view class="topic-box">
				<text class="topic-title">话题</text>
				<view class="topictype-andcontent">
					<text class="topic-type" @click="indexTopicClick(topicType)">#{{topicType}}#</text>
					<!-- <text class="topic-content">{{topicContent}}</text> -->
				</view>
				<!-- <view :class="['fas','fa-bars']" class="sort-icon"  /> -->
				<view class="filter-icon">
					<uni-combox inputDisabled="true" iconType="bars" :iconSize="20" :value="filterList[0]" :candidates="filterList"></uni-combox>
				</view>
			</view>
			<view class="content-box">
				<waterfallsFlow :list="contentList" @wapper-lick="workNavigateWaterFall($event)" imageSrcKey="imageUrl" idKey="opusId">
					<template v-slot:default="item" class="content-box-item">
						<view class="cnt">
							<view class="title">{{item.title}}</view>
							<view class="user-info-box">
								<image class="user-head-img" :src="item.headerPic" mode="aspectFill"></image>
								<view class="user-name">{{item.userName}}</view>
								<view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.likesNumber}}
								</view>
							</view>
						</view>
					</template>
				</waterfallsFlow>
				<uni-load-more :status="RecloadStatus"></uni-load-more>
			</view>
		</view>
		<view class="Hotcontent-list-box" v-if="tabIndex == 1">
			<uni-list :border="false" class="Hotcontent-list-list">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item,index) in HotList" :key="index"
					:title="item.text" :to="'../works/works?workId=' + item.opus_id">
					<template v-slot:body >
						<view class="List-text" >{{item.title}}</view>
					</template>
					<template v-slot:footer>
						<view class="Img-In-List">
							<image class="ListImg-Style" :src="item.opus_photos" mode="aspectFill"  ></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-load-more :status="HotloadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components: {
			waterfallsFlow
		},
		async onLoad() {
			//获取首页轮播图
			
			const http = new this.$Request();
			http.get('/Index/Recommend/slide',{params:{pageNum:1,pageSize:5,type:1}}).then(res=>{
				console.log(res.data)
				this.swiperimgs = res.data.list;
			}).catch(err=>{
				console.log(err)
			})
			//获取首页瀑布流数据
			if(this.RecinitList == true){
				http.get("/Index/Recommend/getWorks",{params:{pageNum:1,pageSize:5,user_id:3}}).then(res=>{
					console.log(res.data);
					this.contentList = res.data.list;
					this.RecpageNum++;
					this.RecinitList = false;
					if(res.data.hasNextPage == true){
						this.RecloadStatus = "more";
					}
					else{
						this.RecloadStatus = "noMore";
						this.Recflag = false;
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			
			//获取主页Topic
			await http.get("/Index/Recommend/getTopic",{params:{pageNum:1,pageSize:10}}).then(res=>{
				console.log(res.data);
				this.topicTypelist = res.data.list;
				this.topicType = this.topicTypelist[0].mark;
			}).catch(err=>{
				console.log(err)
			});
			
			this.timeid = setInterval(()=>{
				this.topicIndex = (this.topicIndex + 1) % (this.topicTypelist.length);
				// console.log(this.topicIndex)
				this.topicType = this.topicTypelist[this.topicIndex].mark;
			}, 3000);
			
			if(this.HotinitList == true){
				http.get("/Index/Hot/getWorks",{params:{pageNum:this.HotpageNum, pageSize:6}}).then(res=>{
					console.log(res.data);
					this.HotList = res.data.list;
					this.HotpageNum++;
					this.HotinitList = false;
					if(res.data.hasNextPage == true){
						this.HotloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.HotloadStatus = "noMore";
						this.Hotflag = false;
					}
				}).catch(err=>{
					console.log(err);
				});
			}
			
		},
		onShow() {
			
		},
		onHide() {
			
			this.HotbeforePage = this.HotpageNum;
			this.RecbeforePage = this.RecpageNum;
		},
		onUnload() {
			clearInterval(this.timeId);
		},
		async onReachBottom() {
			const http = new this.$Request();
			if(this.tabIndex == 0){
				
			}
			if(this.tabIndex == 1 && this.Hotflag==true){
				this.HotloadStatus = "loading";
				await http.get("/Index/Hot/getWorks",{params:{pageNum:this.HotpageNum, pageSize:6}}).then(res=>{
					this.HotList = this.HotList.concat(res.data.list);
					this.HotpageNum++;
					console.log(this.HotpageNum);
					if(res.data.hasNextPage == true){
						this.HotloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.HotloadStatus = "noMore";
						this.Hotflag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		data() {
			return {
				HotloadStatus:"noMore",
				RecloadStatus:"noMore",
				RecpageNum:1,
				RecpageSize:0,
				HotpageNum:1,
				HotpageSize:0,
				RecbeforePage:0,
				HotbeforePage:0,
				RecinitList:true,
				HotinitList:true,
				Recflag:true,
				Hotflag:true,
				value: "",
				index_tabs: ["推荐", "热门"],
				tabIndex: 0,
				filterList:['全部','Cos','JK','汉服','Lolita','妆容'],
				swiperimgs: [
					// {
					// 	imgId: 0,
					// 	url: "../../static/swiperImg/2.jpg"
					// },
					// {
					// 	imgId: 1,
					// 	url: "../../static/swiperImg/2.jpg"
					// }
				],
				topicType: "",
				topicTypelist:[],
				topicIndex:0,
				timeId:0,
				// topicContent: "谁知江南无醉意，笑看春风。",
				contentList: [
					// {
					// 	id: 1,
					// 	// image_url: "../../static/contentImg/1.jpg",
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 2,
					// 	image_url: "../../static/contentImg/3.jpg",
					// 	title: '【汉服】西域美人',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// }, {
					// 	id: 3,
					// 	image_url: "../../static/contentImg/2.jpg",
					// 	title: '【Cos正品】楼兰',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 4,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 5,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 6,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 7,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 8,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 9,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 10,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 11,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 12,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// }
				],
				HotList: [
					{
						id: 1,
						image_url: '../../static/HotListImg/1.jpg',
						text: '蜜瓜JK妆!毕业要和姐妹去迪斯尼拍照呀!'
					},
					{
						id: 2,
						image_url: '../../static/HotListImg/2.jpg',
						text: '江南美人图|奇迹团团环游中华之乌镇'
					},
					{
						id: 3,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 4,
						image_url: '../../static/HotListImg/4.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 5,
						image_url: '../../static/HotListImg/5.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 6,
						image_url: '../../static/HotListImg/6.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 7,
						image_url: '../../static/HotListImg/7.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 8,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 9,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 10,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 11,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 12,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					}
				]
			}
		},
		methods: {
			indexTopicClick(e){
				uni.navigateTo({
					url:"../search/searchLabel?label=" + e
				})
			},
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
					url: '../PopCoser/PopCoser'
				})
			},
			PhotoSquareButtonClick() {
				uni.navigateTo({
					url: '../PhotoSquare/AppoinentRecommend'
				})
			},
			ClothMakeupButtonClick() {
				uni.navigateTo({
					url: '../CostumeAndMakeup/CostumePage'
				})
			},
			HotActivitiesButtonClick() {
				uni.navigateTo({
					url: '../HotActivities/EventsPage?'
				})
			},
			workNavigateWaterFall(event) {
				uni.navigateTo({
					url: '../works/works?id=' + event.opusId
				});
				console.log(event.opusId);
				
			},
			workNavigateSwiper(event){
				uni.navigateTo({
					url: '../works/works?id=' + event
				});
				console.log(event);
			},
			jumpto() {
				uni.navigateTo({
					url: '../HotActivities/CollectionContentPage'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-box {
		width: 88%;
		margin: 40rpx auto;

		.cnt {
			padding: 10rpx;
		}
	}
	/deep/ .uni-combox{
		height:20px;
		margin-top:auto;
		margin-bottom:auto;
		// width:40%;
	}
	/deep/ .uni-combox__input{
		flex:1;
		font-size:24rpx;
		height:15px;
		line-height:15px;
		text-align: center;
		width: 60rpx;
	}
	/deep/ .uni-combox__input-box{
		height:20px;		
	}
	// /deep/ .product-window{
	// 	background-color: rgba($color: #fff, $alpha: 0.9);
	// }
	// .filterbutton-wrapper{
	// 	background-color: rgba($color: #FFF, $alpha: 0.0);
	// }
	// .filterButton-style{
	// 	color: #797979;
	// 	font-size: 34rpx;
	// 	// background-color: rgba($color: #FFF, $alpha: 0.9);
	// 	border: none;
	// }
	// .filterButton-hover{
	// 	color: rgb(0,0,0);
	// 	background-color: rgba(0, 0, 0, 0.2);
	// 	opacity: 0.7;
	// }
</style>

<style>
	@import url("../../static/css/login.css");
	.status_bar {
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
		width: 100rpx;
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 10rpx;
		padding-right: 10rpx;
		text-align: center;

	}

	.uni-tab-item-title {
		color: #000000;
		font-size: 30rpx;
		height: 80rpx;
		/* margin-left: 25rpx; */
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */

	}

	.uni-tab-item-title-active {

		color: #797979;
		font-size: 40rpx;
		border-bottom: 8rpx solid #797979;
	}

	.index-searchbox {
		display: inline-block;
		border-radius: 20rpx;
		text-align: center;
		width: 65%;
		background-color: rgba(242, 242, 242, 0.3);
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
		height: 305rpx;
		align-items: center;
		width: 86%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 35rpx;
		box-shadow: 2px 2px 10px 0px rgba(134, 134, 134, 0.6);
		border-style: none;
		border-radius: 20rpx;
	}

	.swiper-item {
		display: block;
		height: 305rpx;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		border-style: none;
		border-radius: 20rpx;
	}

	.index-halfpadding {
		height: 470rpx;
		border-style: none;
		background-color: #F2A3C3;
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
		margin-top: 0rpx;
		/* box-shadow:0px 0px 5px 5px rgba(0, 0, 0, 0.2); */
		box-shadow: 2px 2px 10px rgba(140, 140, 140, 1);
	}

	.button-box {
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
		width: 90%;
		height: 135rpx;
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
		width: 75rpx;
		height: 75rpx;
		border-radius: 100rpx;
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
		align-items: center;
		justify-content: space-between;
		width: 80%;
	}

	.topic-title {
		font-size: 20rpx;
		border-style: none;
		border-radius: 10rpx;
		background-color: #FFA7C7;
		/* margin-left: 50rpx; */
		padding: 10rpx 20rpx 10rpx 20rpx;
		color: #F1F1F1;
	}
	.topictype-andcontent{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.topic-type {
		font-size: 26rpx;
		color: #428BFF;
		opacity: 0.5;
		margin-right: 10rpx;
		/* margin-left: 20rpx;
		margin-top: 10rpx; */
	}

	.topic-content {
		font-size: 8pt;
		color: #797979;
		opacity: 0.6;
	/* 	margin-left: 20rpx;
		margin-top: 10rpx; */
	}

	.sort-icon {
		margin: auto;
	}

	.title {
		text-align: left;
		margin-top: 10rpx;
		margin-left: 44rpx;
		margin-bottom: 20rpx;
		font-size: 25rpx;
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
		margin-left: 5rpx;
	}

	.user-name {
		font-size: 8pt;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: auto;
	}

	.view-num {
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 8pt;
	}

	.Hotcontent-list-box {
		box-shadow: 2rpx 2rpx 10rpx 10rpx rgb(215, 215, 215, 0.1);
		border-radius: 30rpx 30rpx 0 0;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 60rpx;
		box-sizing: border-box;
		padding: 10rpx;
		background-color: #FFFFFF;
	}

	.List-text {
		font-size: 26rpx;
		text-align: left;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 30rpx;
	}

	.Img-In-List {
		margin-left: auto;
		width: 200rpx;
		height: 120rpx;
	}

	.ListImg-Style {
		width: 200rpx;
		height: 120rpx;
		border-style: none;
		border-radius: 15rpx;
	}

	.uni-list::before {
		display: none;
	}

	.uni-list::after {
		display: none;
	}

	.index-header {
		padding-top: 70rpx;
	}
	.filter-icon{
		display:flex;
		align-item: center;
		justify-content:center;
	}
	
</style>
