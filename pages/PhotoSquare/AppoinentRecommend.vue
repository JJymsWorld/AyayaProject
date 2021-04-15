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
				<view class="AppReco-Hot-pg-list" v-for="(item,index) in showThree" :key="index">
					<image class="AppReco-Hot-pg-list-avatar" mode="aspectFill" :src="item.pg_avatar"></image>
					<text class="AppReco-Hot-pg-list-name">{{item.pg_name}}</text>
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
				<waterfallsFlow :list="contentList">
					<template v-slot:default="item" class="content-box-item">
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
				<uni-load-more status="noMore"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default{
		components:{waterfallsFlow},
		data(){
			return {
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
		width: 95%;
		margin-left: auto;
		margin-right: auto;
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
</style>
