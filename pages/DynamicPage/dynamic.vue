<template>
	<view class="body">
		<!-- 搜索 -->
		<view class="searchBox" @click="searchNavi">
			<!-- <icon :type='inconType' size="26"></icon> -->
			<image class="searchIcon"src="../../static/icon/search.png"></image>
			<view class='searchiInput'><input  value="查找精彩动态内容" /></view>
		   	
		</view>
		<!-- 近期发布动态的用户 -->
		<view class="recentBox">
<!-- 			<table class='recentTable'>
				<tr>
					<td  v-for="(item,index) in recentUser" :key="index">
						<image :src='item.avatarT' mode="aspectFill"></image>
						<view>{{item.usernameT}}</view>
					</td>
				</tr>
				
			</table> -->
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
				<span v-for="(item,index) in recentUser" :key='index'>
				<image :src="item.avatarT" @click="homePageNavi(item.userId)"></image>
				<view>{{item.usernameT}}</view>
			    </span>
			</scroll-view>
		</view>
		<!-- 动态内容 -->
		<view class="dynamicBox">
			<uni-list :border="false" >
			<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem" :key="item.dynamicId" >
				<template v-slot:body>
					<view class="dynamicIt"@click="dynamicDetailNavi(item.dynamicId)">
						  <view class="dynamnicHead">
							<image class="dynamicAvatar" :src='item.headerPic'@click.stop="homePageNavi(item.accountB)"></image>
							<view class="dynamicUserDate">
								<view class="dynamicUsername">{{item.userName}}</view>
							    <view class="dynamicDate">{{item.uploadTime}}</view>
							</view>
							
						</view>
						<!-- 正文 -->
						<view class="dynamicText">{{item.mainBody}}</view>
						<!-- 内容不为作品 -->
						<!-- <image class="dynamicImage" :src='item.imageD' mode="aspectFill"></image> -->
					<!-- 	
						<view v-if="item.opusId ==''" class="dynamicGridBox">
							<gridBox :picture="item.dynamicPhotos"></gridBox>
						</view> -->
						<!-- 内容不为作品 end-->
						
						<!-- 内容不为为作品 -->
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
									    <span class="iconfont4" @click.stop='addLike(index)'>&#xe608;</span>
									    <text class="number1">{{item.likesNumber}}</text>
									</view>
								</td>
								<td>
								    <image class='littleIcon' src="../../static/icon/chat.png" @click.stop="recommend(item.id)"></image>
								    <text class="number">{{item.commentedNumber}}</text>
								</td>
								<td>
									<image class='littleIcon2' src="../../static/icon/relay.png"@click.stop="open"></image>
									<text class="number">{{item.sharedNumber}}</text>
								</td>
							</tr>
						</table>
					</view>
						    
				</template>
				
			</uni-list-item>
		</uni-list>
		
		<uni-load-more status="noMore"></uni-load-more>
		</view>

		

   <view class="lastBlank"></view>
   
   <!-- 转发 -->
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
</template>


<script>
	// var dynamicIt = document.getElementById("dynamicIt");
	// dynamicIt.onclick = function(e) {
	// 	e = e || window.event;
	// 	e.preventDefault();
	// 	console.log(e.target.innerHTML)
	// }
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default{
		onLoad() {
			this.userId = getApp().globalData.global_userId
			console.log(this.userId)
			this.LoadDynamic(1,1,10)
		},
		components: {
			gridBox
		},
		data(){
			return{
				userId:'',
				recommendTag:0,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				recentUser:[
					{
					avatarT:'../../static/iconn/p2.jpg',
					usernameT:'蒲儿姓蒲',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p3.jpg',
						usernameT:'Suzy_Z',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹',
					userId:''
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹',
					userId:''
					}
				],
				dynamicItem:[
					// {
					// 	Id:'1',
					// 	userId:'',
					// 	avatarD:'../../static/iconn/p2.jpg',
					// 	usernameD:'机智的党妹',
					// 	date:'2020-06-25',
					// 	title:'点赞表态!',
					// 	image:[
					// 		'../../static/iconn/d1.jpg'
					// 	],
					// 	work:{
					// 		workid:'1',
					// 		titleW:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
					// 		firstImage:'../../static/iconn/d1.jpg'
					// 	},
					// 	imageD:'../../static/iconn/d1.jpg',
					// 	interestNum:'5482',
					// 	isInterest:'0',
					// 	commentNum:'2145',
					// 	relayNum:'1141'
					// },
					// {
					// 	Id:'2',
					// 	userId:'',
					// 	avatarD:'../../static/iconn/p2.jpg',
					// 	usernameD:'机智的党妹',
					// 	date:'2020-06-25',
					// 	title:'点赞表态!',
					// 	image:[
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg'
					// 	],
					// 	work:{
					// 		workid:'',
					// 		titleW:''
					// 	},
					// 	imageD:'../../static/iconn/d1.jpg',
					// 	interestNum:'5482',
					// 	isInterest:'0',
					// 	commentNum:'2145',
					// 	relayNum:'1141'
					// },
					// {
					// 	Id:'3',
					// 	userId:'',
					// 	avatarD:'../../static/iconn/p2.jpg',
					// 	usernameD:'机智的党妹',
					// 	date:'2020-06-25',
					// 	title:'点赞表态!',
					// 	image:[
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg'
					// 	],
					// 	work:{
					// 		workid:'',
					// 		titleW:''
					// 	},
					// 	imageD:'../../static/iconn/d1.jpg',
					// 	interestNum:'5482',
					// 	isInterest:'0',
					// 	commentNum:'2145',
					// 	relayNum:'1141'
					// },
					// {
					// 	Id:'4',
					// 	userId:'',
					// 	avatarD:'../../static/iconn/p2.jpg',
					// 	usernameD:'机智的党妹',
					// 	date:'2020-06-25',
					// 	title:'点赞表态!',
					// 	image:[
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg',
					// 		'../../static/iconn/d1.jpg'
					// 	],
					// 	work:{
					// 		workid:'',
					// 		titleW:''
					// 	},
					// 	imageD:'../../static/iconn/d1.jpg',
					// 	interestNum:'5482',
					// 	isInterest:'0',
					// 	commentNum:'2145',
					// 	relayNum:'1141'
					// }
				],
			    recomendList:[
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:0
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					},
					{
						userIdR:'',
						usernameR:'机智的党妹',
						avatarR:'../../static/iconn/p2.jpg',
						date:'2020-06-25',
						text:'LILAC热卖！！！！！！！！',
						recLike:'0'
					}
				]
			}
		},
		methods:{
			open(){
			         // 通过组件定义的ref调用uni-popup方法
			         this.$refs.popup.open()
					 // var webView = this.$mp.page.$getAppWebview();  
					 // let titleNView = webView.getTitleNView();  
					 // titleNView && titleNView.hide();
					 // currentWebview.setStyle({
					 // titleNView:titleNView
					 // })
			},
			close(){
				this.$refs.popup.close()
			},
			searchNavi(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			addLike(i){
				var t=this.$data.dynamicItem[i].isInterest;
				if(t==0){
					this.$data.dynamicItem[i].interestNum++;
					this.$data.dynamicItem[i].isInterest=1;
				}
				else{
					this.$data.dynamicItem[i].interestNum--;
					this.$data.dynamicItem[i].isInterest=0;
				}
				
			},
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
			},
			recommend(i){
				this.recommendTag=1;
				uni.navigateTo({
					url:'dynamicDetails?pageScroll=1'
				})
			},
			recoomendExit(){
			this.recommendTag=0;	
			},
			 upper: function(e) {
			            console.log(e)
			        },
			        lower: function(e) {
			            console.log(e)
			        },
			recomendLike(i){
				if(this.recomendList[i].recLike==0){
					this.recomendList[i].recLike=1;
				}
				else{
					this.recomendList[i].recLike=0;
				}
			},
			workNavi(i){
				uni.navigateTo({
					url:'../works/works?workId='+i
				})
			},
			dynamicDetailNavi:function(event,i){
				uni.navigateTo({
					url:'dynamicDetails?dynamicId='+i
				})
			},
			async LoadDynamic(id,pNum,pSize){
				const res = await this.$myRequest({
						url:'/Dynamic/getFocusPersonItems',
						data:{
							user_id: id,
							pageNum: pNum,
							pageSize: pSize
						}
					})
					console.log(res.data)
					this.$data.dynamicItem=res.data.list
			},
			homePageNavi(i){
				uni.navigateTo({
					url:'../Mypage/homePage/homePage?userId='+i
				})
			}
		}
		
	}
	
</script>
<style lang="scss" scoped>
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
	@import url("dynamic.css");
</style>
