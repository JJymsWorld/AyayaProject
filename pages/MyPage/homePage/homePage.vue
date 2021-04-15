<template>
	<view>
	<view class="backbox">
		<span class="iconfont" @tap="navigateBack">&#xe6b0;</span>
		<view class="backBoxButtom"></view>
		<view class="backBoxMain">
			<image src="../../../static/iconn/2.jpg" mode="aspectFill"></image>
			<text class="backBoxUsername">{{username}}</text>
			<text class="backBoxSign">{{sign}}</text>
			<view v-if="userId==userId2" class="backBoxEdit"><text>编辑资料</text></view>
			<view class="backBoxCos"><text>cos榜</text></view>
			<table class='backBoxTable'>
				<tr>
					<td>
						<view class="boxTableNum">{{interstNum}}</view>
						<view class="boxTableText">关注</view>
					</td>
					<td>
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
		<uni-list :border="false" >
		<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem" :key="item.Id">
			<template v-slot:body>
				<view class="dynamicIt">
					  <view class="dynamnicHead">
						<image class="dynamicAvatar" :src='item.avatarD'></image>
						<view class="dynamicUserDate">
							<view class="dynamicUsername">{{item.usernameD}}</view>
						    <view class="dynamicDate">{{item.date}}</view>
						</view>
						
					</view>
					<!-- 正文 -->
					<view class="dynamicText">{{item.title}}</view>
					<!-- 封面 -->
					<image class="dynamicImage" :src='item.imageD' mode="aspectFill"></image>
					<!-- 标题 -->
					<view class="dynamicTitle">{{item.textD}}</view>
					<table class="littleIconTable">
						<tr>
							<td>
								<view v-if="item.isInterest==0" style="width: 50rpx;height: 50rpx;">
								<span class="iconfont3" @click='addLike(index)'>&#xe785;</span>
								<text class="number">{{item.interestNum}}</text>
								</view>
								<view v-if="item.isInterest==1" style="width: 50rpx;height: 50rpx;">
								<span class="iconfont4" @click='addLike(index)'>&#xe608;</span>
								<text class="number1">{{item.interestNum}}</text>
								</view>
							</td>
							<td>
							    <image class='littleIcon' src="../../../static/icon/chat.png"@click="open"></image>
							    <text class="number">{{item.commentNum}}</text>
							</td>
							<td>
								<image class='littleIcon2' src="../../../static/icon/relay.png"></image>
								<text class="number">{{item.relayNum}}</text>
							</td>
						</tr>
					</table>
				</view>
					    
			</template>
			
		</uni-list-item>
	</uni-list>
	<uni-load-more status="noMore"></uni-load-more>
	

	<uni-popup ref="popup" type="bottom">
		
		<view>
			 <view  class="recommendBox">
			 			 <view class="recommendHead">10 条评论
			 			 <span class="iconfont1" @click='close'>&#xe623;</span>
			 			 </view>
			 			 
			 			 <view>
			 				 <view>
			        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			        @scroll="scroll" >
			            <view v-for="(item,index) in recomendList" :key='index' class="recomendItemBox">
			 						<image :src="item.avatarR" mode="aspectFill"></image>
			 						<view class="recomendItemT">
			 						<view>{{item.usernameR}}</view>
			 						<view>{{item.text}}</view>
			 						<view>{{item.date}}</view>
			 						
			 						</view>
			 						<span :class="item.recLike==1?'iconfont2':'iconfont5'" @click='recomendLike(index)'>&#xe608;</span>
			 					</view>
			        </scroll-view>
			    </view>
			 			 </view>
			 </view>
		 </view>
	</uni-popup>
	<view>
		 <view v-if="recommendTag==1" class="recommendBox">
		 			 <view class="recommendHead">10 条评论
		 			 <span class="iconfont1" @click='recoomendExit'>&#xe623;</span>
		 			 </view>
		 			 
		 			 <view>
		 				 <view>
		        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		        @scroll="scroll" >
		            <view v-for="(item,index) in recomendList" :key='index' class="recomendItemBox">
		 						<image :src="item.avatarR" mode="aspectFill"></image>
		 						<view class="recomendItemT">
		 						<view>{{item.usernameR}}</view>
		 						<view>{{item.text}}</view>
		 						<view>{{item.date}}</view>
		 						
		 						</view>
		 						<span :class="item.recLike==1?'iconfont2':'iconfont5'" @click='recomendLike(index)'>&#xe608;</span>
		 					</view>
		        </scroll-view>
		    </view>
		 			 </view>
		 </view>
	 </view>
	
	</view>
	<!-- 动态列表end -->
	
	<!-- 作品列表 -->
	<view v-if="tabIndex==1">
		
		<view class="content-box">
			<waterfallsFlow :list="contentList">
				<template v-slot:default="item" class="content-box-item">
					<view class="cnt" @click="workNavigate">
						<view class="title">{{item.title}}</view>
					</view>
				</template>
			</waterfallsFlow>
			<uni-load-more status="noMore"></uni-load-more>
		</view>
		
	</view>
	
	
	<!-- 作品列表end -->
	
	<!-- 收藏夹列表 -->
	<view v-if="tabIndex==2"></view>
	
	
	<!-- 收藏夹列表end -->
	
   </view>
   
</template>

<script>
	import waterfallsFlow from "../../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default{
		// onReady() {
		// 	document.getElementsByTagName('li')[this.tabIndex].className='navi'
		// },
		onReady(option) {
			// this.userId=option.userId
			// this.userId2=option.userId2
			
		},
		components: {
			waterfallsFlow
		},
		data(){
			return{
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				recommendTag:0,
				
				userId:'',
				userId2:'',
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
				tabIndex:0,
				dynamicItem:[
					{
						Id:'1',
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
				contentList: [{
						id: 1,
						// image_url: "../../static/contentImg/1.jpg",
						image_url:"../../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						viewNum: 2206
					},
					{
						id: 2,
						image_url: "../../../static/contentImg/3.jpg",
						title: '【汉服】西域美人',
						viewNum: 2206
					},{
						id: 3,
						image_url: "../../../static/contentImg/2.jpg",
						title: '【Cos正品】楼兰',
						viewNum: 2206
					},
					{
						id: 4,
						image_url: "../../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						viewNum: 2206
					},
					{
						id: 5,
						image_url: "../../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						viewNum: 2206
					},
					{
						id: 6,
						image_url: "../../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						viewNum: 2206
					},
					{
						id: 7,
						image_url: "../../../static/contentImg/1.jpg",
						title: '鬼灭之刃',
						viewNum: 2206
					}
			
				],
			}
		},
		methods:{
			open(){
			         // 通过组件定义的ref调用uni-popup方法
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
				uni.navigateBack();
			},
			changeFun(i){
				this.tabIndex=i;
				console.log(i);
				if(i==0){
					this.loadDynamic(1);
				}
			},
			addLike:function(i){
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
			workNavigate(){
				uni.navigateTo({
					url:'../../works/works'
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
			loadWork(i){
				uni.request({
					
				})
			},
			recommend(i){
			this.recommendTag=1;
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
