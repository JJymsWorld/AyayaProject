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

	<view class="contentBox">
		<view>{{title}}</view>
		<table>
			<tr v-if="model!=''">
				<td>出境：<text @click="homePageNavi(modelId)" v-for="(item,index) in model">@{{item.model}}</text></td>
			</tr>
			<tr v-if="photography!=''">
				<td>摄影：<text @click="homePageNavi(photographyId)" v-for="(item,index) in photography">@{{item.photography}}</text></td>
			</tr>
			<tr v-if="makeupLook!=''">
				<td>妆容：<text @click="workNavi" v-for="(item,index) in makeupLook">#{{item.makeupLook}}#</text></td>
			</tr>
			<tr v-if="clothList!=''">
				<td>服饰：<text v-for="(item,index) in clothList" :key="index" @click="clothingClickOpen(item.link)">#{{item.name}}#</text></td>
			</tr>
		</table>
	</view>
	<!-- 正文 -->
	<view class="textBox">
		<view class="otherLabel">
			<span v-for="(item,index) in label" :key="index" @click="searchLabelNavi(item)">
			#{{item.labelname}}#
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
		    <uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in comment" :key='item.comment_id'>
		        <template slot="body" class="slot-box slot-text">
					<view class="commentBox">
						<view class="commentboxFirst" @click="homePageNavi(item.user_id)">
							<image :src="item.header_pic"></image>
							<span>
								<view class="commentUserName">{{item.comment_name}}</view>
								<view class="commentTime">{{item.comment_time}}</view>
							</span>
						</view>
						<view class="commentTextC">{{item.item}}</view>
						<view class="commentIconBox">
							<!-- 给评论点赞 -->
							<span v-if="item.isInterest==0" class="iconfont1"@click="interestCFunc(index,1)">&#xe60b;</span>
							<span v-if="item.isInterest==1" class="iconfont1"@click="interestCFunc(index,0)"style="color:#ff8000;opacity: 1;font-size: 32rpx;">&#xe610;</span>
							<!-- 给评论点赞end -->
							<!-- <span class="iconfont3">&#xe659;</span> -->
							
							<!-- 回复该条评论 -->
							<span class="iconfont1"@click="open(0,true,index)">&#xe6b3;</span>
							<!-- 回复该条评论end -->
						</view>
						<view class="commentedBox" v-if="item.commentN!='0'">
							<view class="commentedBoxv1" v-if="item.isCommentExtend==false">
								<!-- <text @click="homePageNavi(item.userId)">{{item.commented[0].usernameD}}:</text>
								{{item.commented[0].textD}} -->
							</view>
							<view class="commentBoxv2" v-if="item.isCommentExtend==false" @click="isExtendFunc(index)">共{{item.commentN}}条回复--展开 ></view>
						
							<view class="commentedBoxv1" v-if="item.isCommentExtend==true" v-for="(a,b) in item.commented" :key="b">
								<!-- <text @click="homePageNavi(item.userId)">{{a.usernameD}}:</text>
								{{a.textD}} -->
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
				<span class="iconfont2" @click="open(0,false)">&#xe600;</span>
				<span>{{commentNum}}</span>
			</li>
			<li>
				<span class="iconfont2" @click="open(1)">&#xe65f;</span>
				<span>{{relayNum}}</span>
			</li>
			<!-- 应援 -->
			<li>
				<span class="iconfont2" @click="starAdd">&#xe615;</span>
				<span>{{starNum}}</span>
			</li>
			<!-- 应援end -->
		</ul>
	</view>
	
	<!-- 评论pop -->
	<view v-if="popTag==0">
		<uni-popup ref="popup" type="bottom">
			<view class="commentPop">
				<view class="commentPopBox"><input placeholder="说点啥" @input="commentInput($event)"@confirm="commentConfirm($event)"/>
				
				</view>
				<view class="commentPopSend" @click="sendComment()">发送</view>
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
					   <view @click="addCollectList">
						   <span class="iconfont_dy"style="font-size: 25rpx;opacity: 0.5;padding-right: 10rpx;">&#xe64f;</span>
						   新建收藏夹
						</view>
				   </view>
				   <view v-for="(item,index) in collectList" :key="index" class="collectPopBoxDetail" @click="addToCollectList(item.favourId)">
					   <image src="../../static/iconn/iconn/4.jpg" mode="aspectFill"></image>
					   <view>{{item.tab}}</view>
				   </view>
				   <view class="collectPopBoxExit" @click.stop="close()">取消</view>
			   </view>
		</uni-popup>
	</view>
	<!-- 收藏pop end -->
	
	<!-- 收藏成功提示 -->
	<view  v-if="popTag==3">
		<uni-popup ref="popup" type="dialog">
		    <!-- <uni-popup-message type="info" mode="base" content="加入收藏夹成功" title="提示" message="成功加入收藏夹!" :duration="2000":before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-message> -->
			<uni-popup-dialog type="info" mode="base" content="加入收藏夹成功!"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
	</view>
	
	<!-- 收藏成功end -->
	
	<!-- 收藏成功提示 -->
	<view  v-if="popTag==4">
		<uni-popup ref="popup" type="dialog">
		    <!-- <uni-popup-message type="info" mode="base" content="加入收藏夹成功" title="提示" message="成功加入收藏夹!" :duration="2000":before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-message> -->
			<uni-popup-dialog type="info" mode="input" placeholder="请输入收藏夹名称" title="收藏夹" content="加入收藏夹成功!"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
	</view>
	
	<!-- 收藏成功end -->
	
	<!-- 收藏成功提示 -->
	<view  v-if="popTag==5">
		<uni-popup ref="popup" type="center">
		    <view class="clothLinkPopBox">
				<view class="clothLink">{{currentClothLink}}</view>
				<view class="copyLink" @click="copyClothLink()">复制链接</view>
			</view>
		</uni-popup>
	</view>
	
	<!-- 收藏成功提示end -->
	
	<!-- 复制链接成功提示 -->
	<view  v-if="popTag==6">
		<uni-popup ref="popup" type="dialog">
		    <!-- <uni-popup-message type="info" mode="base" content="加入收藏夹成功" title="提示" message="成功加入收藏夹!" :duration="2000":before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-message> -->
			<uni-popup-dialog type="info" mode="base" content="复制服饰链接成功!"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
	</view>
	
	<!-- 复制链接成功end -->
	
	<view class="lastblank"></view>
</view>
</template>

<script>
	export default{
		data(){
			return{
				popTag:'0',
				isFocus:'0',
				workId:'34',
				userId:'12',
				avertar:'',
				username:'',
				interestNum:'',
				isInterest:'0',
				collectNum:'',
				isCollect:'0',
				commentNum:'',
				relayNum:'2310',
				starNum:'2310',
				isStar:'0',
				pic:[],
				model:[
					// {
					// 	modelId:'',
					// 	model:'国际巨星'
					// }
				],
				photography:[
					// {
					// 	photographyId:'',
					// 	photography:'超级摄影'
					// }
				],
				makeupLook:[
					// {
					// 	makeupId:'',
					// 	makeupLook:'江南美人妆'
					// }
				],
				clothList: [
					// {
				 //    name: '中牌',
					// link: 'hwfeihwfowieh',
					// },
					// {
					// name: '梗豆',
					// link: 'whifeuowieiow',
					// }
					
				],
				label:[
					// {
					// 	labelId:'',
					// 	labelname:''
					// }
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
					// {
					// 	commentId:'1',
					// 	avatarC:'../../static/iconn/p2.jpg',
					// 	usernameC:'蒲儿姓蒲',
					// 	userId:'',
					// 	timeC:'2020-12-08      ',
					// 	textC:'春水碧于天，画船听雨眠春水碧于天，画船听雨眠春水碧于天，画船听雨眠春水碧于天，画船听雨眠',
					// 	commentN:'3',
					// 	isCommentExtend:false,
					// 	commented:[
					// 		{
					// 			commentedId:'1',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'2',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'3',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		}
					// 	],
					// 	isInterestC:''
					// },
					// {
					// 	commentId:'3',
					// 	avatarC:'../../static/iconn/p2.jpg',
					// 	usernameC:'蒲儿姓蒲',
					// 	userId:'',
					// 	timeC:'2020-12-08      ',
					// 	textC:'春水碧于天，画船听雨眠',
					// 	commentN:'10',
					// 	isCommentExtend:false,
					// 	commented:[
					// 		{
					// 			commentedId:'1',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'2',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'3',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		}
					// 	],
					// 	isInterestC:''
					// },
					// {
					// 	commentId:'4',
					// 	avatarC:'../../static/iconn/p2.jpg',
					// 	usernameC:'蒲儿姓蒲',
					// 	userId:'',
					// 	timeC:'2020-12-08      ',
					// 	textC:'春水碧于天，画船听雨眠',
					// 	commentN:'10',
					// 	isCommentExtend:false,
					// 	commented:[
					// 		{
					// 			commentedId:'1',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'2',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'3',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		}
					// 	],
					// 	isInterestC:''
					// },
					// {
					// 	commentId:'55',
					// 	avatarC:'../../static/iconn/p2.jpg',
					// 	usernameC:'蒲儿姓蒲',
					// 	userId:'',
					// 	timeC:'2020-12-08      ',
					// 	textC:'春水碧于天，画船听雨眠',
					// 	commentN:'10',
					// 	isCommentExtend:false,
					// 	commented:[
					// 		{
					// 			commentedId:'1',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'2',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		},
					// 		{
					// 			commentedId:'3',
					// 			usernameD:'国际巨星',
					// 			textD:'少女的恬静 夫人的端庄 书生的洒脱'
					// 		}
					// 	],
					// 	isInterestC:''
					// }
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
					// {
					// 	collectListId:'9',
					// 	collectListTitle:'国风'
					// },
					// {
					// 	collectListId:'9',
					// 	collectListTitle:'国风'
					// },
					// {
					// 	collectListId:'9',
					// 	collectListTitle:'国风'
					// }
				],
				commentText:'',
				isCommented:false,
				commentedIndex:'0',
				currentClothLink:''
			}
		},
		onLoad:function(option){
			console.log(option.workId);
			//this.workId = option.workId;
			this.loadOpusDetail();
			this.loadComment();
		},
		methods:{
			async loadOpusDetail(){
				const res = await this.$myRequest({
					url:'/Opus/getOpusDetail',
					data:{
						opus_id:this.workId,
						user_id:this.userId
					}
				})
				var t=res.data[0]
				console.log(t)
				this.avertar = t.header_pic
				this.username = t.user_name
				this.interestNum = t.likes_number
				this.collectNum = t.collected_number
				this.commentNum = t.comment_number
				
				//作品图片json转化为数组
				var photoes = t.cover_photo
				var jsonObj = JSON.parse(photoes)
				var p = []
				for (var prop in jsonObj)
				{
				    //输出 key-value值
				    //console.log("jsonObj[" + prop + "]=" + jsonObj[prop]);
					//console.log(jsonObj[prop]);
					p.push(jsonObj[prop])
				}
				this.pic = p
				
				this.title = t.title
				this.text = t.main_body
				this.isCollect = t.isCollect
				this.isFocus = t.isFocus
				this.isInterest = t.isInterest
				this.time = t.upload_time
				this.readN = t.browse_num
				//分割出境
				var jsonO = JSON.parse(t.account_a)
				console.log(jsonO)
				var modelObj={
						modelId:'',
						model:'国际巨星'
					}
				var m = []
				for (var prop in jsonO){
					m=jsonO[prop].split("，")
					modelObj.modelId = m[0]
					modelObj.model = m[1]
					// console.log(modelObj)
					this.model.push(modelObj)
					//console.log(this.model)
				}
				
				//分割摄影师
				jsonO = JSON.parse(t.account_b)
				console.log(jsonO)
				var photographyObj={
						photographyId:'',
						photography:'超级摄影'
					}
			    m = []
				for (var prop in jsonO){
					m=jsonO[prop].split("，")
					photographyObj.photographyId = m[0]
					photographyObj.photography = m[1]
					// console.log(modelObj)
					this.photography.push(photographyObj)
					//console.log(this.photography)
				}
				
				//分割妆容
				jsonO = JSON.parse(t.makeup_id)
				console.log(jsonO)
				var makeupObj={
						makeupId:'',
						makeupLook:'江南美人妆'
					}
				m = []
				for (var prop in jsonO){
					m=jsonO[prop].split("，")
					makeupObj.makeupId = m[0]
					makeupObj.makeupLook = m[1]
					// console.log(modelObj)
					this.makeupLook.push(makeupObj)
					//console.log(this.makeupLook)
				}
				
				//分割其他标签
				jsonO = JSON.parse(t.mark_id)
				console.log(jsonO)
				var labelObj={
						labelId:'',
						labelname:''
					}
				m = []
				for (var prop in jsonO){
					m=jsonO[prop].split("，")
					labelObj.labelId = m[0]
					labelObj.labelname = m[1]
					// console.log(modelObj)
					this.label.push(labelObj)
					//console.log(this.label)
				}
				
				//分割服饰
				jsonO = JSON.parse(t.clothing_id)
				//console.log(jsonO)
				var clothObj={
						name: '',
						link: '',
					}
				m = []
				for (var prop in jsonO){
					//m=jsonO[prop].split("，")
					var i=0
					//console.log(jsonO[prop].length)
					for(i=0;i<jsonO[prop].length;i++){
						
						if(jsonO[prop][i]=="，"){
							break;
						}
					}
					console.log(i)
					clothObj.name = jsonO[prop].slice(0,i)
					clothObj.link = jsonO[prop].slice(i+1)
					//console.log(clothObj)
					this.clothList.push(clothObj)
				}
			},
			async loadComment(){
				this.workId=10
				this.userId=10
				const res = await this.$myRequest({
					url:'/Opus/getOpusComments',
					data:{
						opus_id:this.workId,
						user_id:this.userId
					}
				})
				//console.log(res.data)
				this.comment = res.data
				for(var item in this.comment){
					this.comment[item].isCommentExtend=false
					this.comment[item].commentN='0'
					console.log(item)
				}
				console.log(this.comment)
			},
			open(i,n,index){
				this.popTag=i
				this.isCommented = n
				this.commentedIndex = index
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			confirm(){
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
			clothingClickOpen(link){
				this.popTag = 5
				this.currentClothLink = link
				this.$refs.popup.open()
			},
			copyClothLink(){
				uni.setClipboardData({
					data:this.currentClothLink,
					success:function(){
						uni.hideToast();
					}
					
				}),
				this.popTag = 6
				this.$refs.popup.open()
			},
			searchLabelNavi(label){
				uni.navigateTo({
					url:"../search/searchLabel?label=" + label
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
					this.disInterestApi();
				}
				else if(i==1){
					this.interestNum++;
					// 填写点赞接口
					this.interestApi();
					
				}
			},
			async interestApi(){
				const res = await this.$myRequest({
					url:'/Opus/addOpusLikeRecord',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					data:{
						opus_id:this.workId,
						user_id:this.userId
					}
				})
				console.log(res)
			},
			async disInterestApi(){
				const res = await this.$myRequest({
					url:'/Opus/deleteOpusLikeRecord',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'DELETE',
					data:{
						opus_id:this.workId,
						user_id:this.userId
					}
				})
			},
			interestCFunc(index,i){
				this.comment[index].isInterest=i;
			},
			//获取所有收藏夹
			async getCollectListAll(){
				this.userId = 1
				const res = await this.$myRequest({
					url:'/MyPage/MyStarList/getAllList',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						user_id:this.userId
					}
				})
				//console.log(res.data)
				this.collectList = res.data
			},
			collectFunc(){
				if(this.isCollect==1){
					//取消收藏
					this.collectNum--
					this.isCollect=0
				}
				else{
					this.popTag=2;
					//获取所有收藏夹
					this.getCollectListAll()
					this.$refs.popup.open()
				}
			},
			//收藏接口
			async collectApi(i){
				const res = await this.$myRequest({
					url:'/Opus/addOpusFavourRecord',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					data:{
						favour_id:i,
						opus_id:this.workId,
						user_id:this.userId
					}
				})
				console.log(res)
			},
			starAdd(){
				this.starNum++
			},
			isExtendFunc(i){
				
				this.comment[i].isCommentExtend=!this.comment[i].isCommentExtend
			},
			addCollectList(){
				this.popTag = 4
			},
			addToCollectList(id){
				// 填写加入收藏夹接口
				this.collectApi(id)
				this.popTag = 3
				this.isCollect = 1
				this.collectNum++;
			},
			commentInput(event){
				console.log(event.detail)
				this.commentText=event.detail.value
			},
			commentConfirm(event){
				this.commentText=event.detail.value
				this.sendComment()
			},
			sendComment(){
				console.log(this.isCommented)
				var t={}
				if(this.isCommented==false){
					 t={
						comment_id:'8',
						header_pic:'../../static/iconn/p2.jpg',
						comment_name:'蒲儿姓蒲',
						user_id:'',
						comment_time:'',
						item:'',
						commentN:'0',
						isCommentExtend:false,
						commented:[],
						isInterest:''
					}
					var time = new Date()
					t.comment_time=time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()
					t.item=this.commentText
					 this.comment.unshift(t)
					 // 填写更新评论接口
					 // 
					 // 
					 // 
					 
				}
				else{
					t={
						userId:'',
						usernameD:'国际巨星',
						textD:''
					}
					t.textD=this.commentText
					this.comment[this.commentedIndex].commentN++;
					this.comment[this.commentedIndex].commented.unshift(t)
				}
				this.$refs.popup.close()
				
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
