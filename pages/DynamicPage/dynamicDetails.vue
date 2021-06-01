<template>
	<view>
		<!-- 头像 昵称部分 -->
		<view class="headBox">
			<image :src="avatarD" @click='homePageNavi(userId)'></image>
			<view class="headBoxText">
				<view>{{usernameD}}</view>
				<view>{{date}}</view>
			</view>
			<!-- 关注按钮 -->
			<view class="contentButton">
				<view class="contentButtonY" v-if="isFocus==0"@click="focusButton(1)"><text>关注</text></view>
			    <view class="contentButtonN" v-if="isFocus==1"@click="focusButton(0)"><text>已关注</text></view>
			</view>
			
		</view>
		<!-- 头像 昵称部分 end-->
		
		<!-- 正文部分 -->
		<view class="TextBox">{{textD}}</view>
		<!-- 正文部分 -->
		
		<!-- 内容部分 -->
		<view class="gridImageBox" v-if="opusId=='0'">
			<gridBox :picture="image"></gridBox>
		</view>
		
		<view v-if="opusId!='0'" class="dynamicGridBox">
			<image class="dynamicImage" :src='opusPic' mode="aspectFill"></image>
			<view class="dynamicTitle">{{opusTitle}}</view>
		</view>
		<!-- 内容部分end -->
		
		<view class="blank"></view>
		
		<!-- 评论转发部分 -->
		<view class="navi" id="navi1">
			<!-- 转发 评论导航栏 -->
			<ul>
				<!-- <li :class="tag=='1'?'naviBoxNo':'naviBox'" @click="tagSelect(1)">转发 <text>{{relayNum}}</text></li> -->
				<li class="naviBoxNo" @click="tagSelect(0)">全部评论 </li>
			</ul>
			<!-- 评论部分 -->
			<view class="commendbigBox" v-if="comment!=''">
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
										<text @click="homePageNavi(item.userId)">{{item.commented[0].comment_name}}:</text>
										{{item.commented[0].item}}
									</view>
									<view class="commentBoxv2" v-if="item.isCommentExtend==false" @click="isExtendFunc(index)">共{{item.commentN}}条回复--展开 ></view>
								
									<view class="commentedBoxv1" v-if="item.isCommentExtend==true" v-for="(a,b) in item.commented" :key="b">
										<text @click="homePageNavi(item.userId)">{{a.comment_name}}:</text>
										{{a.item}}
									</view>
									<view class="commentBoxv2" v-if="item.isCommentExtend==true"@click="isExtendFunc(index)">共{{item.commentN}}条回复--收起 ></view>
								
								</view>
								
							</view>
						</template>
				        
				    </uni-list-item>
				</uni-list>
				
			</view>
			<view class="noComment" v-if="comment==''">快来给他评论吧！</view>
		</view>
		<!-- 评论转发部分end -->
		
		<!-- 底部导航栏 -->
		<view class="lastBox">
			<ul>
				<li><input placeholder="说点啥..." placeholder-style="color:rgba(9,9,9,0.3)"@confirm="commentConfirm($event)"> </li>
				<li v-if="isInterest==0">
					<span class="iconfont_NoSelect"@click="interestButton(isInterest)">&#xe785;</span>
					
					<span style="font-size: 30rpx;" class="icon_number_no">{{interestNum}}</span>
				</li>
				<li v-if="isInterest==1">
					
					<span class="iconfont_select"@click="interestButton(isInterest)">&#xe60f;</span>
					
					<span style="font-size: 30rpx;color: #EC808D;" class="icon_number">{{interestNum}}</span>
				</li>
				
				<li>
					<span class="iconfont_NoSelect" @click="open(false,0)">&#xe600;</span>
					<span style="font-size: 30rpx;"@click="open(false,0)">{{commentNum}}</span>
				</li>
				<li>
					<span class="iconfont_NoSelect">&#xe65f;</span>
					<span style="font-size: 30rpx;">{{relayNum}}</span>
				</li>

			</ul>
		</view>
		<view class="lastblank"></view>
		<!-- 底部导航栏 end-->
		
		
		<uni-popup ref="popup" type="bottom">
			<view class="commentPop">
				<view class="commentPopBox"><input placeholder="说点啥" @input="commentInput($event)"@confirm="commentConfirm($event)"/>
				
				</view>
				<view class="commentPopSend" @click="sendComment()">发送</view>
			</view>
				
		</uni-popup>
	</view>
	
</template>

<script>
	import gridBox from '../../components/gridImage/gridImage.vue' 
	export default{
		//返回按钮点击事件
		onNavigationBarButtonTap(){
			console.log("---------onNavigationBarButtonTap---------")
			const that = this
			uni.$emit('dynamicDetailsChange',
			{
				index:that.listIndex,
				dynamicId:that.dynamicId,
				commentNum:that.commentNum,
				interestNum:that.interestNum
			})
			uni.navigateBack({})  
		},
		onInit(option) {
			//this.pageScroll=1
		},
		onReady() {
			if(this.pageScroll==1){
				this.ScrollPosition();
			}
			
		},
		onShow() {
			// uni.$on("dynamicDetails",res => {
			// 	console.log(res)
			// 	// 清除监听
			// 	uni.$off("dynamicDetails");
			// })
			this.getIsFocus()
		},
		onLoad(option) {
			const that = this
			this.pageScroll=option.pageScroll || 0
			//console.log(this.work.workid)
			this.userId2=getApp().globalData.global_userId || '12'
			uni.getStorage({
			    key: 'userInfo',
			    success: res => {
			     console.log(res.data);
			     //this.userIdentity = res.data.identity
				 this.thisAvatar = res.data.header_pic || '../../static/iconn/avatar.png'
				 this.thisUsername = res.data.user_name
			    }
			});
			
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('dynamicDetails', function(data) {
				console.log(data)
				console.log(that.usernameD)
				that.listIndex=data.index
				that.userId=data.accountB
				that.commentNum=data.commentedNumber
				that.dynamicId=data.dynamicId
				that.image=data.dynamicPhotos
				that.avatarD=data.headerPic ||  '../../static/iconn/avatar.png' 
				that.interestNum=data.likesNumber
				that.textD=data.mainBody
				that.opusId=data.opusId
				that.opusPic=data.opusPhotos
				that.relayNum=data.sharedNumber
				that.opusTitle=data.title
				//data.type
				that.date=data.uploadTime
				that.usernameD=data.userName
			})
			that.loadComment()
		},
		components: {
			gridBox
		},
		data(){
			return{
				listIndex:'',
				isFocus:0,
				pageScroll:0,
				tag:'0',
				dynamicId:'1',
				opusId:'',
				opusPic:'',
				opusTitle:'',
				userId:'12',//发布该动态的人
				userId2:'',//登录者
				thisUsername:'',
				thisAvatar:'',
				avatarD:'../../static/iconn/avatar.png',
				usernameD:'机智的党妹',
				date:'2020-06-25',
				textD:'点赞表态!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
				image:[
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg'
				],
				work:{
					workid:'0',
					titleW:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
					firstImage:'../../static/iconn/d1.jpg'
				},
				imageD:'../../static/iconn/d1.jpg',
				interestNum:'5482',
				isInterest:'0',
				commentNum:'2145',
				relayNum:'1141',
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
								commentedId:'',
								userId:'',
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								commentedId:'',
								userId:'',
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								commentedId:'',
								userId:'',
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
								userId:'',
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								userId:'',
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							},
							{
								userId:'',
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						],
						isInterestC:''
					}
				],
				commentText:'',
				isCommented:false,
				commentedIndex:'0',
				currentCommentId:'100000'
			}
		},
	    methods:{
			async getIsFocus(){
				const res = await this.$myRequest({
					url:'/MyPage/HomePage/isFocus',
					data:{
						account_a:this.userId2,
						account_b:this.userId
					}
				})
				console.log("----------------------------")
				console.log(res.data)
				this.isFocus = res.data
			},
			homePageNavi(i){
				uni.navigateTo({
					url:'../Mypage/homePage/homePage?userId='+i
				})
			},
			interestCFunc(index,i){
				this.comment[index].isInterest=i;
			},
			isExtendFunc(i){
				console.log('extend:'+this.comment[i].isCommentExtend)
				this.comment[i].isCommentExtend=!this.comment[i].isCommentExtend
				//this.comment[i].isCommentExtend = true
				console.log('after:'+this.comment[i].isCommentExtend)
			},
			focusButton(i){
				// 加关注和减关注
				this.$data.isFocus=i
				this.isAddFocus(i)
			},
			async isAddFocus(i){
				//关注
				if(i){
					const res = await this.$myRequest({
						url:'/MyPage/HomePage/addFocus',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						data:{
							account_a:this.userId2,
							account_b:this.userId
						}
					})
					console.log('关注')
					console.log(res)
				}
				//取消关注
				else{
					const res = await this.$myRequest({
						url:'/MyPage/HomePage/delFocusPersonByBothId',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'DELETE',
						data:{
							account_a:this.userId2,
							account_b:this.userId
						}
					})
					console.log('取消关注')
					console.log(res)
				}
				
			},
			open(i,n,index){
			         // 通过组件定义的ref调用uni-popup方法
					 this.popTag=i
					 this.isCommented = n
					 this.commentedIndex = index
					 this.$refs.popup.open()
					 
			},
			tagSelect(i){
				//this.tag=i
			},
			homepageNavi(i){
				uni.navigateTo({
					url:'../Mypage/homePage/homePage?userID='+i
				})
			},
			interestButton(i){
				if(i==0){
					this.$data.isInterest=1;
					this.$data.interestNum++;
				}
				else if(i==1){
					this.$data.isInterest=0;
					this.$data.interestNum--;
				}
			},
			//滚动到指定位置
			ScrollPosition(){
				//let that = this;
				const query = uni.createSelectorQuery();
				query.select('#navi1').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  uni.pageScrollTo({
				  	scrollTop:data.top
				  })
				}).exec();
							
							
			},
			async loadComment(){
				const that = this
				const res = await this.$myRequest({
					//url:'/Dynamic/getComment',
					url:'/Opus/getOpusComments',
					data:{
						//dynamic_id:that.dynamicId
						opus_id:that.dynamicId,
						type:2,
						user_id:that.userId
					}
				})
				console.log(res.data)
				this.comment = res.data
				for(var item in this.comment){
					this.comment[item].comment_time = this.$Format(this.comment[item].comment_time,"yyyy-MM-dd")
					this.$set(this.comment[item], 'isCommentExtend', false)
					this.$set(this.comment[item], 'commentN', this.comment[item].commented.length)
					
					console.log('comment:'+item)
				}
				console.log(this.comment)
			},
			commentInput(event){
				console.log(event.detail)
				this.commentText=event.detail.value
			},
			commentConfirm(event){
				this.commentText=event.detail.value
				this.sendComment()
			},
			async sendCommentFunc(name,id,item,type){
				const that = this
				const res = await this.$myRequest({
					url:'/Opus/addCommentByType',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					data:{
						comment_name:name,//用户昵称
						dynamic_id:id, //动态或作品评论id
						item:item,//内容
						type:type,//给作品评论1，给动态评论2.给评论评论3
						user_id:that.userId2
					}
				})
				console.log(res)
			},
			sendComment(){
				console.log(this.isCommented)
				var t={}
				const that = this
				that.currentCommentId++;
				if(this.isCommented==false){
					 t={
						comment_id:that.currentCommentId,
						header_pic:that.thisAvatar,
						comment_name:that.thisUsername,
						user_id:that.userId2,
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
					 this.sendCommentFunc(that.thisUsername,this.dynamicId,this.commentText,2)
					this.commentNum++;
				}
				else{
					t={
						user_id:that.userId2,
						comment_name:that.thisUsername,
						item:''
					}
					t.item=this.commentText
					this.comment[this.commentedIndex].commentN++;
					this.comment[this.commentedIndex].commented.unshift(t)
					this.sendCommentFunc(t.comment_name,this.comment[this.commentedIndex].comment_id,t.item,3)
					this.commentNum++;
				}
				this.$refs.popup.close()
				
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
	@import url("dynamicDetails.css");
	@import url("../works/workIcon.css");
</style>
