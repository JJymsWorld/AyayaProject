<template>
	<view>
		<view class="headblank"></view>
		<!-- 顶部导航栏 -->
	<view class="head">
		<span class="iconfont" @click='backlast'>&#xe6b0;</span>
		<image :src="avertar" mode="aspectFill"@click="homePageNavi(userId)"></image>
		<text class="hText"@click="homePageNavi(userId)">{{username}}</text>
		<view class="contentIcon" v-if="isFocus==0"@click="focusButton(1)"><text>关注</text></view>
		<view class="contentIconY" v-if="isFocus==1"@click="focusButton(0)"><text>已关注</text></view>
	</view>
	<!-- 内容部分 -->
	<view class="picbox">
		
		<view>
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
		                    <swiper class="myswiper" :indicator-dots="true" :autoplay="false" :interval="interval" :duration="duration" indicator-active-color='#FF6EA2'>
								<swiper-item v-for="(item,index) in pic" >
										<image :src="item" mode="aspectFit" @click="preview(index)"></image>
								</swiper-item>
		                    </swiper>
		                </view>
		            </view>
		        </view>
				
	</view>
<!-- 	<ul class="ull">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul> -->
	<view class="contentBox">
		<view>{{title}}</view>
		<table>
			<tr>
				<td>出境：<text @click="homePageNavi(modelId)">@{{model}}</text></td>
			</tr>
			<tr>
				<td>摄影：<text @click="homePageNavi(photographyId)">@{{photography}}</text></td>
			</tr>
			<tr>
				<td>妆容：<text @click="workNavi">#{{makeupLook}}#</text></td>
			</tr>
			<!-- <tr>
				<td>服饰：<text @click="clothingClick(clothingLink)">#{{clothingName}}#</text></td>
			</tr> -->
			<tr>
				<td>服饰：<text v-for="(item,index) in clothList" :key="index" @click="clothingClick(item.link)">#{{item.name}}#</text></td>
			</tr>
		</table>
	</view>
	<!-- 正文 -->
	<view class="textBox">
		<view class="otherLabel">
			<span v-for="(item,index) in label" :key="index" @click="searchLabelNavi">
			#{{item}}#
		    </span>
		</view>
		<view>{{text}}</view>
	</view>
	<!-- 阅读量 -->
	<view class='timeAread'>
		<span>{{time}}</span>
		<span>阅读量 {{readN}}</span>
	</view> 
	<!-- 点击制作同款 -->
	<view>
		<view class="ttBox" @click='makeTheSameNavi'><text class="tt">点击制作同款</text></view>
	</view>
	<!-- 作品推荐 -->
	<view class="recomendBox">
		<view>作品推荐</view>
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
			<span v-for="(item,index) in recommend" :key='index' @click="workNavi(item.workId)">
			<image :src="item.pic"></image>
			<view>{{item.title}}</view>
		    </span>
		</scroll-view>
		
	</view>
	<!-- 全部评论 -->
	<view class="commendbigBox">
		<view class="commendT">全部评论</view>
		<!-- 每一条评论 -->
		
		<uni-list :border="false" >
		    <uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in comment" :key='item.commentId'>
		        <template slot="body" class="slot-box slot-text">
					<view class="commentBox">
						<view class="commentboxFirst" @click="homePageNavi(item.userId)">
							<image :src="item.avatarC"></image>
							<span>
								<view class="commentUserName">{{item.usernameC}}</view>
								<view class="commentTime">{{item.timeC}}</view>
							</span>
						</view>
						<view class="commentTextC">{{item.textC}}</view>
						<view class="commentIconBox">
							<!-- 给评论点赞 -->
							<span v-if="item.isInterestC==0" class="iconfont1"@click="interestCFunc(index,1)">&#xe60b;</span>
							<span v-if="item.isInterestC==1" class="iconfont1"@click="interestCFunc(index,0)"style="color:#ff8000;opacity: 1;font-size: 32rpx;">&#xe610;</span>
							<!-- 给评论点赞end -->
							<!-- <span class="iconfont3">&#xe659;</span> -->
							
							<!-- 回复该条评论 -->
							<span class="iconfont1"@click="open(0)">&#xe6b3;</span>
							<!-- 回复该条评论end -->
						</view>
						<view class="commentedBox">
							<view class="commentedBoxv1" v-if="item.isCommentExtend==false">
								<text @click="homePageNavi(item.userId)">{{item.commented[0].usernameD}}:</text>
								{{item.commented[0].textD}}
							</view>
							<view class="commentBoxv2" v-if="item.isCommentExtend==false" @click="isExtendFunc(index)">共{{item.commentN}}条回复--展开 ></view>
						
							<view class="commentedBoxv1" v-if="item.isCommentExtend==true" v-for="(a,b) in item.commented" :key="a">
								<text @click="homePageNavi(item.userId)">{{a.usernameD}}:</text>
								{{a.textD}}
							</view>
							<view class="commentBoxv2" v-if="item.isCommentExtend==true"@click="isExtendFunc(index)">共{{item.commentN}}条回复--收起 ></view>
						
						</view>
						
					</view>
				</template>
		        
		    </uni-list-item>
		</uni-list>
		
		
	</view>
	<view class="lastBox">
		<ul>
			<li><input value="说点啥..."> </li>
			<!-- 点赞 -->
			<li v-if="isInterest==0">
				<span class="iconfont2" @click="interestFunc(1)">&#xe785;</span>
				<span>{{interestNum}}</span>
			</li>
			<li v-if="isInterest==1">
				<span class="iconfont2" @click="interestFunc(0)" style="color:#EC808D;opacity: 1;">&#xe60f;</span>
				<span style="color:#EC808D;opacity: 1;">{{interestNum}}</span>
			</li>
			<!-- 点赞end -->
			
			<!-- 收藏 -->
			<li v-if="isCollect==0">
				<span class="iconfont2" @click="collectFunc">&#xe609;</span>
				<span >{{collectNum}}</span>
			</li>
			<li v-if="isCollect==1">
				<span class="iconfont2" @click="collectFunc"style="color:#EC808D;opacity: 1;">&#xe609;</span>
				<span style="color:#EC808D;opacity: 1;">{{collectNum}}</span>
			</li>
			<!-- 收藏end -->
			
			<li>
				<span class="iconfont2" @click="open(0)">&#xe600;</span>
				<span>{{commentNum}}</span>
			</li>
			<li>
				<span class="iconfont2" @click="open(1)">&#xe65f;</span>
				<span>{{relayNum}}</span>
			</li>
			<!-- 应援 -->
			<li>
				<span class="iconfont2">&#xe615;</span>
				<span>{{starNum}}</span>
			</li>
			<!-- 应援end -->
		</ul>
	</view>
	
	<!-- 评论pop -->
	<view v-if="popTag==0">
		<uni-popup ref="popup" type="bottom">
			<view class="commentPop">
				<view class="commentPopBox"><input placeholder="说点啥"/>  </view>
			</view>
		</uni-popup>
	</view>
	<!-- 评论pop end -->
	
	<!-- 分享pop -->
	<view v-if="popTag==1">
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
	<!-- 分享pop end -->
	
	<!-- 收藏pop -->
	<view v-if="popTag==2">
		<uni-popup ref="popup" type="bottom">
			   <view class="collectPopBox">
				   <view class="collectPopBoxTitle">添加收藏</view>
				   <view class="collectPopBoxAddList">
					   <view>
						   <span class="iconfont_dy">&#xe623;</span>
						   新建收藏夹
						</view>
				   </view>
				   <view v-for="(item,index) in collectList" :key="index" class="collectPopBoxDetail">
					   <image src="../../static/iconn/iconn/4.jpg" mode="aspectFill"></image>
					   <view>{{item.collectListTitle}}</view>
				   </view>
				   <view class="collectPopBoxExit" @click.stop="close()">取消</view>
			   </view>
		</uni-popup>
	</view>
	<!-- 收藏pop end -->
	
	<view class="lastblank"></view>
</view>
</template>

<script>
	export default{
		data(){
			return{
				popTag:'0',
				isFocus:'0',
				workId:'',
				userId:'',
				avertar:'../../static/CoserlistSource/userheadimg7.jpg',
				username:'国际巨星',
				interestNum:'2310',
				isInterest:'0',
				collectNum:'2310',
				isCollect:'0',
				commentNum:'2310',
				relayNum:'2310',
				starNum:'2310',
				isStar:'0',
				pic:[
					'../../static/contentImg/3.jpg',
					'../../static/CoserlistSource/userheadimg7.jpg',
					'../../static/contentImg/3.jpg',
					'../../static/contentImg/3.jpg'
				],
				modelId:'',
				model:'国际巨星',
				photographyId:'',
				photography:'超级摄影',
				makeupLook:'江南美人妆',
				clothingName:'汉服',
				clothingLink:'hfeuigywbqbfiu',
				clothList: [
					{
				    name: '中牌',
					link: 'hwfeihwfowieh',
					},
					{
					name: '梗豆',
					link: 'whifeuowieiow',
					}
					
				],
				label:[
					'汉服',
					'约拍广场'
				],
				title:'江南美人图|奇迹党党环游中华之江南',
				text:'谁知江南无醉意，笑看春风十里香。喜欢记得点赞哦！！！',
				time:'2020-12-08',
				readN:'3000',
				recommend:[
					{
						workId:'',
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告gaogaoagoagaogaoag'
					},
					{
						workId:'',
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					},
					{
						workId:'',
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					},
					{
						workId:'',
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					}
				],
				comment:[
					{
						commentId:'1',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						userId:'',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠春水碧于天，画船听雨眠春水碧于天，画船听雨眠春水碧于天，画船听雨眠',
						commentN:'3',
						isCommentExtend:false,
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						],
						isInterestC:''
					},
					{
						commentId:'3',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						userId:'',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						isCommentExtend:false,
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						],
						isInterestC:''
					},
					{
						commentId:'4',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						userId:'',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						isCommentExtend:false,
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						],
						isInterestC:''
					},
					{
						commentId:'55',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						userId:'',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						isCommentExtend:false,
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						],
						isInterestC:''
					}
				],
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
								        
				interval: 2000,
				duration: 500,
				collectList:[
					{
						collectListId:'9',
						collectListTitle:'国风'
					},
					{
						collectListId:'9',
						collectListTitle:'国风'
					},
					{
						collectListId:'9',
						collectListTitle:'国风'
					}
				]
			}
		},
		onLoad:function(option){
			console.log(option.workId);
		},
		methods:{
			open(i){
				this.popTag=i
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			focusButton(i){
				this.$data.isFocus=i
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.$data.pic
				})
			},
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
			},
			makeTheSameNavi:function(){
				var t=JSON.stringify(this.clothList)
				//console.log(t )
				uni.navigateTo({
					url:'addMyWish?workId='+this.workId+'&workTitle='+this.title+'&photographerId='+this.photographyId+'&clothingLink='+this.clothingLink+'&madeupId='+this.workId+'&clothList='+t
				})
			},
			clothingClick(i){
				uni.setClipboardData({
					data:i,
					success:function(){
						console.log(i);
						uni.hideToast();
					}
					
				})
			},
			searchLabelNavi(){
				uni.navigateTo({
					url:'../search/searchLabel'
				})
			},
			homePageNavi(i){
				uni.navigateTo({
					url:'../Mypage/homePage/homePage?userId='+i
				})
			},
			workNavi(i){
				uni.navigateTo({
					url:'works?workId='+i
				})
			},
			interestFunc(i){
				this.isInterest=i;
				if(i==0){
					this.interestNum--;
					// 填写取消点赞接口
					// 
					// 
				}
				else if(i==1){
					this.interestNum++;
					// 填写点赞接口
					// 
					// 
				}
			},
			interestCFunc(index,i){
				this.comment[index].isInterestC=i;
			},
			collectFunc(){
				this.popTag=2;
				this.$refs.popup.open()
				// this.isCollect==0时处于未收藏的状态
				if(this.isCollect==2){
					this.collectNum--;
					// 填写取消收藏接口
					// 
					// 
				}
				else if(this.isCollect==1){
					this.collectNum++;
					// 填写添加收藏接口
					// 
					//
				}
			},
			isExtendFunc(i){
				this.comment[i].isCommentExtend=!this.comment[i].isCommentExtend
			}
		},
		
		changeIndicatorDots(e) {
		            this.indicatorDots = !this.indicatorDots
		},
		intervalChange(e) {
		            this.interval = e.target.value
		},
		durationChange(e) {
		            this.duration = e.target.value
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
	@import url("works.css");
	@import url("workIcon.css");
</style>
