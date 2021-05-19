<template>
	<view>
		<view class="EventDetailPage-wrapper">
			<view class="EventDetail-top">
				<view class="EventDetail-top-cover">
					<image :src="EventDetailPageInfo.photo" mode="widthFix" class="EventDetail-top-image"></image>
				</view>
				<view class="EventDetail-top-timer">
					<view :class="['fas','fa-hourglass-half']" class="EventDetail-top-timer-icon"></view>
					<view class="EventDetail-top-timer-com">
						<xwCountDown :is-day="false" :tip-text="'截至活动结束还有'" :day-text="' '" :hour-text="':'"
							:minute-text="':'" :second-text="' '" :datatime="getDatetime"></xwCountDown>
					</view>
				</view>
				<view class="EventDetail-top-title">
					{{EventDetailPageInfo.tab}}
				</view>
				<view class="EventDetail-top-content">
					<!-- <view class="EventDetail-top-content-line" v-for="(item,index) in EventDetailPageInfo.content"
						:key="index">{{item}}</view> -->
					<view class="EventDetail-top-content-line">{{EventDetailPageInfo.content}}</view>
				</view>
				<view class="EventDetail-top-viewButton" @click="gotoPostWorksPage">
					<view class="EventDetail-top-viewButton-style">我要参加</view>
				</view>
			</view>
			<view class="EventDetail-mid">
				<view class="EventDetail-mid-bar">
					<view :class="tabIndex == 0 ?'EventDetail-mid-bar-label-active':''" @click="tabChangeToZero">活动奖励</view>
					<view :class="tabIndex == 1 ?'EventDetail-mid-bar-label-active':''" @click="tabChangeToOne">参赛方式</view>
					<view :class="tabIndex == 2 ?'EventDetail-mid-bar-label-active':''" @click="tabChangeToTwo">评比规则</view>
				</view>
				<view v-if="tabIndex==0" class="EventDetail-mid-avtivityAwards">
					<text class="EventDetail-mid-avtivityAwards-title">{{AwardsTitle}}:</text>
					<text class="EventDetail-mid-avtivityAwards-awards" v-for="(item,index) in ActivityAwards" :key="index">{{index+1}}、{{item}}</text>
				</view>
				<view v-if="tabIndex==1" class="EventDetail-mid-waysofAttend">
					<text class="EventDetail-mid-waysofAttend-line" v-for="(item,index) in waysofAttend" :key="index">{{index+1}}、{{item}}</text>
				</view>
				<view v-if="tabIndex==2" class="EventDetail-mid-Activityrules">
					<text class="EventDetail-mid-Activityrules-line" v-for="(item,index) in ActivityRules" :key="index">{{index+1}}.{{item}}</text>
				</view>
			</view>
			<view class="EventDetail-bottom">
				<view class="EventDetail-bottom-labelbar">
					<text style="margin-left: 20rpx;">参赛作品</text>
				</view>
				<view class="EventDetail-bottom-works-list">
					<view class="content-box">
						<waterfallsFlow ref="waterfallsFlow" :list="AttendWorksList" @wapper-lick="gotoWorksPage()" imageSrcKey="opus_photos" idKey="opus_id">
							<template v-slot:default="item" class="content-box-item">
								<view class="cnt">
									<view class="title">{{item.title}}</view>
									<view class="user-info-box">
										<image class="user-head-img" :src="item.header_pic" mode="aspectFill" @click.stop="gotoUserHomePage()"></image>
										<view class="user-name" @click.stop="gotoUserHomePage()">{{item.user_name}}</view>
										<!-- <view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.supportNum}}
										</view> -->
										<view class="view-num" >应援值: {{item.raised_money}}
										</view>
									</view>
								</view>
							</template>
						</waterfallsFlow>
						<uni-load-more :status="loadStatus"></uni-load-more>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xwCountDown from '@/components/xw-CountDown/index.vue';
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components: {
			xwCountDown,
			waterfallsFlow
		},
		async onLoad(options) {
			console.log(options.activity_id);
			const http = new this.$Request();
			this.activityid = options.activity_id;
			await http.get("http://81.68.73.252:8086/Activity/EventDetail/getEventDetail", {params:{activityId:this.activityid}}).then(res=>{
				this.EventDetailPageInfo = res.data[0];
			}).catch(err=>{
				console.log(err);
			});
			
			if(this.initList == true){
				await http.get("/Activity/getJoiningOpus",{params:{activity_id:this.activityid, pageNum:this.pageNum, pageSize:4}}).then(res=>{
					this.initList = false;
					this.pageNum++;
					this.AttendWorksList = res.data.list;
					if(res.data.hasNextPage == true){
						this.loadStatus = 'more';
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore"
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				});
				this.$refs.waterfallsFlow.refresh();
			}
		},
		async onReachBottom() {
			const http = new this.$Request();
			if(this.flag == true){
				this.loadStatus = "loading";
				await http.get("/Activity/getJoiningOpus",{params:{activity_id:this.activityid, pageNum:this.pageNum, pageSize:4}}).then(res=>{
					this.pageNum++;
					this.AttendWorksList = this.AttendWorksList.concat(res.data.list);
					if(res.data.hasNextPage == true){
						this.loadStatus = 'more';
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				});
				this.$refs.waterfallsFlow.refresh();
			}
		},
		data() {
			return {
				activityid:1,
				tabIndex:0,
				pageNum:1,
				pageSize:0,
				initList:true,
				flag:true,
				loadStatus:"noMore",
				EventDetailPageInfo: {
					image_url: "../../static/EventsSource/1.jpg",
					title: "【Cos正片征集】第10-9期",
					// content: [
					// 	' 本期Cos人物',
					// 	'《请问您今天要来点兔子吗?》保登 心爱',
					// 	' 快来晒出你的Cos正片吧!!!'
					// ],
					content:"本期Cos人物\n《请问您今天要来点兔子吗?》保登 心爱\n快来晒出你的Cos正片吧！！！",
					deadline: "2021-04-15 20:00:00"
				},
				datatime: 0,
				AwardsTitle:'最佳Cos奖',
				ActivityAwards:[
					'牛气冲天奖(4人) ————50京东卡',
					'暖心祝福奖(5人) ————50小圆饼',
					'Ayaya小棉袄奖(10人) ————20小圆饼'
				],
				waysofAttend:[
					'参与活动需勾选活动话题:#新年祝福姬#进行发帖',
					'发表内容需要围绕春节祝福,牛年许愿、新年flag等春节主题相关祝福语即可',
					'支持手写祝福、视频祝福、图文祝福或者手持祝福语的照片形式作品',
					'本次活动投稿作品/文案都需为本人原创;投稿内容杜绝血腥暴力、色情等相关元素投稿参赛用户可投稿多个作品参与评选，但是同一参赛者投稿的多个作品中，同意作品不可多次获奖',
					'擦赛作品除个人水印(美颜相机)外，需满足无其他平台水印要求，否则参赛不成功!',
					'发帖参考:发帖参考'
				],
				ActivityRules:[
					'参赛者在提交作品前，请确保已经阅读并且愿意遵守相关规则。',
					'本次活动所有参赛作品均有评委根据应援值综合作为质量评选出;评委包含官方摄影团队及官方运营团队。',
					'参赛者不限参赛次数，用户可投稿多个作品参与评选，但是同意参赛作品最多获奖1次!即相同作品本身不重复获奖',
					'获奖名单会在活动结束后的10个工作日内公布，活动领奖信息请关注站内信息。活动获奖信息公布后将保留获奖用户7个工作日的领奖有效时间，过期作废。',
					'同一参赛作品如有创作团队中多人提交，评奖将以最早提交的参赛作品为准。若作品获奖，请相关创作团队内部自行协调分配。'
				],
				AttendWorksList:[
					{
						id: 0,
						image_url: "../../static/CollectionSources/3.jpg",
						title: '【Cos正片】保登心爱1',
						headImg: '../../static/CollectionSources/avatar1.jpg',
						userName: '小娜',
						supportNum: 1114
					},
					{
						id: 1,
						image_url: "../../static/CollectionSources/5.jpg",
						title: '【Cos正片】保登心爱2',
						headImg: '../../static/CollectionSources/avatar1.jpg',
						userName: '奈奈喵',
						supportNum: 964
					},
					{
						id: 2,
						image_url: "../../static/CollectionSources/4.jpg",
						title: '【Cos正片】保登心爱3',
						headImg: '../../static/CollectionSources/avatar1.jpg',
						userName: '巨星',
						supportNum: 657
					},
					{
						id: 3,
						image_url: "../../static/CollectionSources/2.jpg",
						title: '【Cos正片】保登心爱4',
						headImg: '../../static/CollectionSources/avatar1.jpg',
						userName: '嘉Sama_',
						supportNum: 436
					}
				]
			}
		},
		methods: {
			tabChangeToZero(){
				this.tabIndex = 0
				console.log(this.tabIndex)
			},
			tabChangeToOne(){
				this.tabIndex = 1
				console.log(this.tabIndex)
			},
			tabChangeToTwo(){
				this.tabIndex = 2
				console.log(this.tabIndex)
			},
			// 进入用户个人主页
			gotoUserHomePage: function(){
				uni.navigateTo({
					url: '../Mypage/homePage/homePage'
				})
			},
			// 进入作品详情页面
			gotoWorksPage: function(){
				uni.navigateTo({
					url: '../works/works'
				})
			},
			gotoPostWorksPage(){
				uni.navigateTo({
					url:"../ContentReleasePage/postWorks"
				})
			}

		},
		computed: {
			getDatetime() {
				let endtime = new Date(this.EventDetailPageInfo.activity_time)
				return endtime.getTime() / 1000
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
	@import url("HotActivities.css");
	.EventDetail-mid-bar-label-active{
	    border-bottom-style: solid;
	    border-bottom-width: 8rpx;
	    border-bottom-color: rgba(236, 128, 141, 0.7);
	}
	
	.title{
		font-size: 28rpx;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
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
		color: #EC808D;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 25rpx;
		
	}
</style>
