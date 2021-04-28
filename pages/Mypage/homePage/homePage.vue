<template>
	<view>
	<view class="backbox">
		<span class="iconfont" @tap="navigateBack">&#xe6b0;</span>
		<view class="backBoxButtom"></view>
		<view class="backBoxMain">
			<image src="../../../static/iconn/2.jpg" mode="aspectFill"></image>
			<text class="backBoxUsername">{{username}}</text>
			<text class="backBoxSign">{{sign}}</text>
			<view v-if="userId==userId2" class="backBoxEdit" @click="editNavi"><text>编辑资料</text></view>
			<view class="backBoxCos"><text>cos榜</text></view>
			<table class='backBoxTable'>
				<tr>
					<td @click="interestNavi(userId)">
						<view class="boxTableNum">{{interstNum}}</view>
						<view class="boxTableText">关注</view>
					</td>
					<td @click="fanNavi(userId)">
						<view class="boxTableNum">{{fanNum}}</view>
						<view class="boxTableText">粉丝</view>
					</td>
					<td>
						<view class="boxTableNum">{{starNum}}</view>
						<view class="boxTableText">获应援</view>
					</td>
				</tr>
			</table>
		</view>
	</view>
	
	<view class="naviBox">
		<view class="navino" @click="changeFun(0)" :class="tabIndex==0 ? 'navi' : ''">动态</view>
		<view class="navino" @click="changeFun(1)" :class="tabIndex==1 ? 'navi' : ''">作品</view>
		<view class="navino" @click="changeFun(2)" :class="tabIndex==2 ? 'navi' : ''">收藏夹</view>
	</view>
	
	
	
	<!-- 动态列表 -->
	<view class="dynamicBox" v-if="tabIndex==0">
		<!-- 动态 -->
		<uni-list :border="false" >
			<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem1" :key="item.dynamicId" >
				<template v-slot:body>
					<view class="dynamicIt"@click="dynamicDetailNavi(item.dynamicId)">
						  <view class="dynamnicHead">
							<image class="dynamicAvatar" :src='item.headerPic'@click.stop="homePageNavi(item.accountB)"></image>
							<view class="dynamicUserDate">
								<view class="dynamicUsername"@click.stop="homePageNavi(item.accountB)">{{item.userName}}</view>
							    <view class="dynamicDate">{{item.uploadTime}}</view>
							</view>
							
							<view class="dynamicMoreIcon" @click.stop="open(1)">
								<span class="iconfont_dy">&#xe604;</span>
							</view>
							
						</view>
						<!-- 正文 -->
						<view class="dynamicText">{{item.mainBody}}</view>
						<!-- 内容不为作品 -->
						<view v-if="item.opusId ==''" class="dynamicGridBox">
							<gridBox :picture="item.dynamicPhotos"></gridBox>
						</view>
						<!-- 内容不为作品 end
						
						<!-- 内容为作品 -->
						<view v-if="item.opusId!=''" class="dynamicGridBox" @click.stop="workNavi(item.opusId)">
							<image class="dynamicImage" :src='item.opusPhotos' mode="aspectFill"></image>
							<view class="dynamicTitle">{{item.title}}</view>
						</view>
						<!-- 内容不为为作品end -->
						
						<table class="littleIconTable">
							<tr>
								<td>
									<view v-if="item.type==0" style="width: 50rpx;height: 50rpx;">
									    <span class="iconfont3" @click.stop='addLike(index)'>&#xe785;</span>
									    <text class="number">{{item.likesNumber}}</text>
									</view>
									    <view v-if="item.type==1" style="width: 50rpx;height: 50rpx;">
									    <span class="iconfont4" @click.stop='addLike(index)'>&#xe60f;</span>
									    <text class="number1">{{item.likesNumber}}</text>
									</view>
								</td>
								<td>
								    <image class='littleIcon' src="../../../static/icon/chat.png" @click.stop="recommend(item.id)"></image>
								    <text class="number">{{item.commentedNumber}}</text>
								</td>
								<td>
									<image class='littleIcon2' src="../../../static/icon/relay.png"@click.stop="open(0)"></image>
									<text class="number">{{item.sharedNumber}}</text>
								</td>
							</tr>
						</table>
					</view>
						    
				</template>
				
			</uni-list-item>
		</uni-list>
		<uni-load-more status="noMore"></uni-load-more>
		<!-- 动态end -->
		
		<!-- 删除动态pop -->
	
		<view v-if="popTag==1">
			<uni-popup ref="popup" type="bottom">
				<view class="sexBox">
					<view class="sexChoose" >删除</view>
					<view class="sexExitChoose"@click="close">取消</view>
				</view>
			</uni-popup>
		</view>
	
	</view>
	<!-- 动态列表end -->
	
	<!-- 作品列表 -->
	<view v-if="tabIndex==1">
		
		<view class="content-box">
			<waterfallsFlow :list="contentList" idKey="opus_id" imageSrcKey="opus_photos" @wapper-lick="workNavigate($event)" >
				<template v-slot:default="item" class="content-box-item">
					<view class="cnt" >
						<view class="title">{{item.title}}</view>
						<view class="ll">
							<span class="iconfont_dy">&#xe785;</span>
							<text>{{item.likes_number}}</text>
						</view>
					</view>
				</template>
			</waterfallsFlow>
			<uni-load-more status="noMore"></uni-load-more>
		</view>
		
	</view>
	
	
	<!-- 作品列表end -->
	
	<!-- 收藏夹列表 -->
	<view v-if="tabIndex==2" class="collectListBox">
		
		<image class="addPic" src="../../../static/icon/newlist.png" mode="aspectFill"@click="open"></image>
		<view v-for="(item,index) in collectList" :key="index" class="collectBox" @click="starListDetailNavi(item.favourId)">
			<image :src="pic" class="collectBoxImage"></image>
			<view class="textBox">
				<view class="collectTitle">{{item.tab}}</view>
				<view class="collectNumber">{{item.collectNum}}收藏</view>
			</view>
		</view>
		
		<!-- 新建收藏夹 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="input" placeholder="请输入收藏夹名" title="新建收藏夹"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
		<!-- 新建收藏夹 end-->
		
	</view>
	<!-- 收藏夹列表end -->
	
	
   <!-- 加载框 -->
   <kModel ref="kModel" />
   
   <!-- 转发 -->
    <view v-if="popTag==0">
		<uni-popup ref="popup" type="bottom">
			   <view class="relayPopBox">
				   <view class="relayPopBoxTitle">分享至</view>
				   <view class="relayPopBoxButtonBox">
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe61a;</span>
						   <view class="relayText">微信</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe65b;</span>
					   	   <view class="relayText">朋友圈</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe73c;</span>
					   	   <view class="relayText">微博</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe60c;</span>
					   	   <view class="relayText">QQ</view>
					   </view>
				   </view>
				   
				   <view class="relayPopBoxExit" @click.stop="close()">取消</view>
			   </view>
		</uni-popup>
		 
	</view>
   
   
   
   
   </view>
  
</template>

<script>
	import waterfallsFlow from "../../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	import gridBox from '../../../components/gridImage/gridImage.vue';
	import kModel from '@/components/k-model/k-model.vue';
	export default{
		onReady(option) {
			// 页面渲染完成后是否显示发布成功模态框
			if(this.showToast){
				this.startShow()
			}
			
			// this.userId=option.userId
			// this.userId2=option.userId2
		},
		onLoad(option) {
		    this.userId=option.userId // 上个页面传递的用户id
		    this.userId2=getApp().globalData.global_userId
		    this.loadHead()
		    	
		    // 标记是否由发布动态页面跳转进入
		    if(option.showToast == '1'){
		    	this.showToast = true
				this.tabIndex = 0
				this.loadDynamic()
				
		    }
		    // 标记是否由发布作品页面跳转进入
		    if(option.showToast == '2'){
		    	this.showToast = true
		    	this.tabIndex = 1
				this.loadWork()
		    }
		},
		components: {
			waterfallsFlow,
			kModel,
			gridBox
		},
		data(){
			return{
				popTag:0,
				showToast: false,	// 标记是否显示发布成功模态框
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				recommendTag:0,
				
				userId:'',
				userId2:'',
				avatar:'',
				username:'jennie',
				sign:'你还没有个性签名哦!',
				interstNum:'2',
				fanNum:'0',
				starNum:'0',
				tabBars:[
					'动态',
					'作品',
					'收藏夹'
				],
				tabIndex:0,  //标记当前选中的是导航栏的哪一栏
				dynamicItem:[
					{
						Id:'1',
						userId:'',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!蜜瓜JK妆!',
						interestNum:'5482',
						isInterest:'0',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'2',
						userId:'',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						isInterest:'0',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'3',
						userId:'',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						isInterest:'0',
						commentNum:'2145',
						relayNum:'1141'
					}
				],
				dynamicItem1:[
					{
						accountB:'4',
						commentedNumber:0,
						dynamicId:'1',
						dynamicPhotos:[
							"http://81.68.73.252:8080/picture/微信图片_20201224143937.jpg",
							"../../../static/iconn/d1.jpg",
							"../../../static/iconn/d1.jpg"
						],
						headerPic:"../../../static/iconn/p2.jpg",
						likesNumber:277,
						mainBody:"点赞表态!",
						opusId:'3',
						opusPhotos:"../../../static/iconn/d1.jpg",
						sharedNumber:0,
						title:"蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!",
						type:1,
						uploadTime:"2021-04-19T10:17:05.000+00:00",
						userName:"机智的党妹"
					},
					{
						accountB:'4',
						commentedNumber:0,
						dynamicId:'2',
						dynamicPhotos:[
							"http://81.68.73.252:8080/picture/微信图片_20201224143937.jpg",
							"../../../static/iconn/d1.jpg",
							"../../../static/iconn/d1.jpg"
						],
						headerPic:"http://81.68.73.252:8080/picture/微信图片_20201211115432.jpg",
						likesNumber:277,
						mainBody:"当不倒翁小姐姐cos楚乔传",
						opusId:'',
						opusPhotos:"http://81.68.73.252:8080/picture/微信图片_20201224143937.jpg",
						sharedNumber:0,
						title:"楚乔传",
						type:1,
						uploadTime:"2021-04-19T10:17:05.000+00:00",
						userName:"coser_a"
					},
					{
						accountB:'4',
						commentedNumber:0,
						dynamicId:'3',
						dynamicPhotos:"http://81.68.73.252:8080/picture/微信图片_20201224143937.jpg",
						headerPic:"http://81.68.73.252:8080/picture/微信图片_20201211115432.jpg",
						likesNumber:277,
						mainBody:"当不倒翁小姐姐cos楚乔传",
						opusId:'3',
						opusPhotos:"http://81.68.73.252:8080/picture/微信图片_20201224143937.jpg",
						sharedNumber:0,
						title:"楚乔传",
						type:1,
						uploadTime:"2021-04-19T10:17:05.000+00:00",
						userName:"coser_a"
					}
				],
				pic:'../../../static/icon/collectPic.png',
				recomendList:[
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:0
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					}
				],
				collectList:[
					{
						tab:'汉服',
						collectNum:'12'
					},
					{
						tab:'JK',
						collectNum:'12'
					},
					{
						tab:'国风',
						collectNum:'12'
					}
				],
				newList:{
					tab:'',
					collectNum:''
				},
				 contentList: [//{
				// 		id: 1,
				// 		// image_url: "../../static/contentImg/1.jpg",
				// 		image_url:"../../../static/contentImg/1.jpg",
				// 		title: '鬼灭之刃',
				// 		viewNum: 2206
				// 	},
				// 	{
				// 		id: 2,
				// 		image_url: "../../../static/contentImg/3.jpg",
				// 		title: '【汉服】西域美人',
				// 		viewNum: 2206
				// 	},{
				// 		id: 3,
				// 		image_url: "../../../static/contentImg/2.jpg",
				// 		title: '【Cos正品】楼兰',
				// 		viewNum: 2206
				// 	},
				// 	{
				// 		id: 4,
				// 		image_url: "../../../static/contentImg/1.jpg",
				// 		title: '鬼灭之刃',
				// 		viewNum: 2206
				// 	},
				// 	{
				// 		id: 5,
				// 		image_url: "../../../static/contentImg/1.jpg",
				// 		title: '鬼灭之刃',
				// 		viewNum: 2206
				// 	},
				// 	{
				// 		id: 6,
				// 		image_url: "../../../static/contentImg/1.jpg",
				// 		title: '鬼灭之刃',
				// 		viewNum: 2206
				// 	},
				// 	{
				// 		id: 7,
				// 		image_url: "../../../static/contentImg/1.jpg",
				// 		title: '鬼灭之刃',
				// 		viewNum: 2206
				// 	}
			
				],
			}
		},
		methods:{
			confirm(value){
				this.newList.tab = value
				this.newList.collectNum = '0'
				console.log(this.newList)
				this.collectList.push(this.newList)
				this.$refs.popup.close()
			},
			// 显示发布成功加载框
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '发布成功',
					duration: 3000
				});
			},
			async loadHead(){
				const res = await this.$myRequest({
					url:'/MyPage/HomePage/getMainAll',
					data:{
						user_id:5
					}
				})
				console.log(res)
				this.username=res.data[0].user_name
				this.avatar=res.data[0].header_pic
				this.interstNum=res.data[0].focus_num
				this.fanNum=res.data[0].focused_num
				this.starNum=res.data[0].raised_num
			},
			editNavi(){
				uni.navigateTo({
					url:'../reset/edit'
				})
			},
			open(i){
			         // 通过组件定义的ref调用uni-popup方法
					 this.popTag=i
			         this.$refs.popup.open()
			      },
			close(){
			         // 通过组件定义的ref调用uni-popup方法
			         this.$refs.popup.close()
			      },
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			upper: function(e) {
			           console.log(e)
			       },
			       lower: function(e) {
			           console.log(e)
			       },
			navigateBack(){
				uni.switchTab({
					url: '../mypage'
				})
			},
			changeFun(i){
				this.tabIndex=i;
				console.log(i);
				if(i==0){
					this.loadDynamic(1);
				}
				else if(i==1){
					this.loadWork();
				}
				else{}
			},
			addLike:function(i){
				var t=this.$data.dynamicItem1[i].type;
				if(t==0){
					this.$data.dynamicItem1[i].likesNumber++;
					this.$data.dynamicItem1[i].type=1;
				}
				else{
					this.$data.dynamicItem1[i].likesNumber--;
					this.$data.dynamicItem1[i].type=0;
				}
			},
			workNavigate(item){
				uni.navigateTo({
					url:'../../works/works?workId='+item.opus_id
				})
			},
			async loadDynamic(i){
				console.log(i)
				const res = await this.$myRequest({
					url:'/Login/login',
					data:{
						account: "17757273698"
					}
				});
				    console.log(res);
			},
			dynamicDetailNavi:function(event,i){
				uni.navigateTo({
					url:'../../DynamicPage/dynamicDetails?dynamicId='+i
				})
			},
			workNavi(i){
				uni.navigateTo({
					url:'../../works/works?workId='+i
				})
			},
			recommend(i){
				uni.navigateTo({
					url:'../../DynamicPage/dynamicDetails?pageScroll=1'
				})
			},
			async loadWork(i){
				const res=await this.$myRequest({
					url:'/MyPage/HomePage/getOpusById',
					data:{
						pageNum:1,
						pageSize:10,
						user_id:5
					}
				})
				console.log(res.data)
				this.contentList=res.data.list
			},
			recoomendExit(){
			this.recommendTag=0;	
			},
			recomendLike(i){
				if(this.recomendList[i].recLike==0){
					this.recomendList[i].recLike=1;
				}
				else{
					this.recomendList[i].recLike=0;
				}
			},
			interestNavi(i){
				uni.navigateTo({
					url:'../foucsAndFan/focus?userId='+i
				})
			},
			fanNavi(i){
				uni.navigateTo({
					url:'../foucsAndFan/fan?userId='+i
				})
			},
			dynamicNavi(event,i){
				uni.navigateTo({
					url:'../../DynamicPage/dynamicDetails?dynamicId='+i
				})
				return false
			},
			homePageNavi(i){
				uni.navigateTo({
					url:'homePage?userId='+i
				})
			},
			starListDetailNavi(i){
				uni.navigateTo({
					url:'../myStarList/myStarListDetail?favourId='+i
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content-box{
		width: 88%;
		margin-left: auto;
		margin-right: auto;
		.cnt{
			position: relative;
			top: 0;
			left: 0;
			padding: 10rpx;
		}
	}
	
		/deep/ .uni-list-item{
			background-color: #FBFBFB;
			padding: 0;
			padding-bottom: 0rpx;
			padding-top: 5rpx;
		}
		/deep/ .uni-list-item__container{
			background-color: #FFFFFF;
			padding: 0;
		
		}
</style>
<style>
	@import url("homePageCss");
</style>
