<template>
	<view>
		<!-- 头像 昵称部分 -->
		<view class="headBox">
			<image :src="avatarD"></image>
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
		<view class="gridImageBox">
			<gridBox :picture="image"></gridBox>
		</view>
		<!-- 内容部分end -->
		
		<view class="blank"></view>
		
		<!-- 评论转发部分 -->
		<view class="navi" id="navi1">
			<!-- 转发 评论导航栏 -->
			<ul>
				<li :class="tag=='1'?'naviBoxNo':'naviBox'" @click="tagSelect(1)">转发 <text>{{relayNum}}</text></li>
				<li :class="tag=='0'?'naviBoxNo':'naviBox'" @click="tagSelect(0)">评论 <text>{{commentNum}}</text> </li>
			</ul>
			<!-- 评论部分 -->
			<view class="commendbigBox" v-if="tag=='0'">
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
									<span class="iconfont1"@click="open(true,index)">&#xe6b3;</span>
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
		onInit(option) {
			//this.pageScroll=1
		},
		onReady() {
			if(this.pageScroll==1){
				this.ScrollPosition();
			}
			
		},
		onLoad(option) {
			this.pageScroll=option.pageScroll || 0
		},
		components: {
			gridBox
		},
		data(){
			return{
				isFocus:0,
				pageScroll:0,
				tag:'0',
				dynamicId:'1',
				userId:'',
				avatarD:'../../static/iconn/p2.jpg',
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
					workid:'1',
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
				commentedIndex:''
			}
		},
	    methods:{
			homePageNavi(i){
				uni.navigateTo({
					url:'../Mypage/homePage/homePage?userId='+i
				})
			},
			interestCFunc(index,i){
				this.comment[index].isInterestC=i;
			},
			isExtendFunc(i){
				this.comment[i].isCommentExtend=!this.comment[i].isCommentExtend
			},
			focusButton(i){
				// 填写加关注和减关注
				//
				//
				//
				this.$data.isFocus=i
			},
			open(i,index){
			         // 通过组件定义的ref调用uni-popup方法
					 this.isCommented = i
					 this.commentedIndex = index
			         this.$refs.popup.open()
					 
			},
			tagSelect(i){
				this.tag=i
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
						commentId:'',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						userId:'',
						timeC:'',
						textC:'',
						commentN:'0',
						isCommentExtend:false,
						commented:[],
						isInterestC:''
					}
					var time = new Date()
					t.timeC=time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()
					t.textC=this.commentText
					this.comment.unshift(t)
				}
				else{
					t={
						userId:'',
						usernameD:'国际巨星',
						textD:''
					}
					t.textD=this.commentText
					this.comment[this.commentedIndex].commented.unshift(t)
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
