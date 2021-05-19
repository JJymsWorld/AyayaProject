<template>
	<view>
		<view class="Appoint-Reco-wrapper">
			<view class="AppReco-Top-Bar">
				<view class="AppReco-Top-Bar-left">
					<image class="AppReco-Top-Bar-left-img" src="../../static/CoserlistSource/Coser-infobox-left.png" mode="aspectFill"></image>
					<text >热门摄影师</text>
				</view>
				<view class="AppReco-Top-Bar-right" @click="gotoPhotoIdentificate">
					成为入驻摄影师
				</view>
			</view>
			<view class="AppReco-Hot-list">
				<view class="AppReco-Hot-pg-list" v-for="(item,index) in showThree" :key="index" @click="gotoPherHomePage(item.user_id)">
					<image class="AppReco-Hot-pg-list-avatar" mode="aspectFill" :src="item.header_pic"></image>
					<text class="AppReco-Hot-pg-list-name">{{item.user_name}}</text>
				</view>
				<view class="AppReco-Hot-list-more" @click="gotoPhotographerList">
					<view class="AppReco-Hot-list-more-icon">
						<text>. . .</text>
					</view>
					<text class="AppReco-Hot-pg-list-name">查看更多</text>
				</view>
			</view>
			<view class="AppReco-works-bar">
				<image class="AppReco-Top-Bar-left-img" src="../../static/CoserlistSource/Coser-infobox-left.png" mode="aspectFill"></image>
				<text >作品展示</text>
			</view>
			<view class="content-box">
				<waterfallsFlow :list="contentList" @wapper-lick="gotoWorksPage($event)" imageSrcKey="opus_photos" idKey="opus_id">
					<template v-slot:default="item" class="content-box-item">
						<view class="cnt">
							<view class="title">{{item.title}}</view>
							<view class="user-info-box">
								<image class="user-head-img" :src="item.header_pic" mode="aspectFill"></image>
								<view class="user-name">{{item.user_name}}</view>
								<view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.browse_num}}
								</view>
							</view>
						</view>
					</template>
				</waterfallsFlow>
				<uni-load-more :status="loadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default{
		components:{waterfallsFlow},
		async onLoad() {
			const http = new this.$Request();
			//获取所有摄影师列表
			http.get("/Date/PhotographerList/getAllPg",{params:{pageNum:1, pageSize:3, user_id:1}}).then(res=>{
				this.PhotographerList = res.data.list;
			}).catch(err=>{
				console.log(err);
			});
			
			// 获取所有约拍作品(瀑布流内容)
			if(this.initList == true){
				http.get("/Date/PhotographerList/getAllDataWorks", {params:{pageNum:this.pageNum, pageSize:8}}).then(res=>{
					this.contentList = res.data.list;
					this.pageNum++;
					this.initList = false;
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.haxNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
			
				
		},
		onHide() {
			
		},
		onShow() {
			
		},
		async onReachBottom() {
			// 触底加载新内容
			const http = new this.$Request();
			if(this.flag == true){
				this.loadStatus = "loading";
				await http.get("/Date/PhotographerList/getAllDataWorks",{params:{pageNum:this.pageNum, pageSize:8}}).then(res=>{
					this.contentList = this.contentList.concat(res.data.list);
					this.pageNum++;
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		data(){
			return {
				initList:true,
				flag:true,
				pageNum:1,
				pageSize:0,
				beforePage:0,
				loadStatus:"noMore",
				PhotographerList:[
					{
						pg_id:1,
						pg_avatar:"../../static/CoserlistSource/avatar1.jpg",
						pg_name:"吉良同学"
					},
					{
						pg_id:2,
						pg_avatar:"../../static/CoserlistSource/avatar2.jpg",
						pg_name:"摄影师2号"
					},
					{
						pg_id:3,
						pg_avatar:"../../static/CoserlistSource/avatar3.jpg",
						pg_name:"摄影师3号"
					}
				],
				contentList: [
					// {
					// 	id: 1,
					// 	image_url: "../../static/contentImg/1.jpg",
					// 	title: '鬼灭之刃',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 2,
					// 	image_url: "../../static/contentImg/2.jpg",
					// 	title: '【Cos正品】楼兰',
					// 	headImg: '../../static/contentImg/headimg1.jpg',
					// 	userName: 'CN清风',
					// 	viewNum: 2206
					// },
					// {
					// 	id: 3,
					// 	image_url: "../../static/contentImg/3.jpg",
					// 	title: '【汉服】西域美人',
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
				]
			}
		},
		methods:{
			gotoPhotoIdentificate() {
				uni.navigateTo({
					url: '../Mypage/identificationPage/photoIdentificate'
				})
			},
			gotoPhotographerList() {
				uni.navigateTo({
					url: './PhotographerList'
				})
			},
			gotoWorksPage(e){
				uni.navigateTo({
					url:"../works/works?workId=" + e.opus_id
				})
				console.log(e.opus_id)
			},
			gotoPherHomePage(e){
				uni.navigateTo({
					url:"../Mypage/homePage/homePage?userId=" + e
				})
				console.log(e);
			}
		},
		computed:{
			showThree(){
				return this.PhotographerList.filter((item,index)=>{
					return index<3;
				})
			}
		}
	}
</script>
	

<style lang="scss" scoped>
	.content-box{
		width: 93%;
        margin: 0rpx auto;
		.cnt{
			padding: 10rpx;
		}
	}
</style>
<style>
	@import url("AppointRecommend.css");
	
	.user-info-box {
		display: flex;
		flex-direction: row;
		margin: auto;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.user-head-img {
		width: 30rpx;
		height: 30rpx;
		border-style: none;
		border-radius: 25rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
	
	.user-name {
		font-size: 20rpx;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: auto;
	}
	
	.view-num {
		color: rgba(51,51,51,0.4);
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10rpx;
		font-size: 20rpx;
	}
</style>
