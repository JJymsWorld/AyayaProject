<template>
	<view class="body">
		<!-- 搜索 -->
		<view class="searchBox">
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
				<image :src="item.avatarT"></image>
				<view>{{item.usernameT}}</view>
			    </span>
			</scroll-view>
		</view>
		<!-- 动态内容 -->
		<view class="dynamicBox">
			<uni-list :border="false" >
			<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem" :key="item.Id" >
				<template v-slot:body>
					<view class="dynamicIt" @click="dynamicDetailNavi(item.Id)">
						  <view class="dynamnicHead">
							<image class="dynamicAvatar" :src='item.avatarD'></image>
							<view class="dynamicUserDate">
								<view class="dynamicUsername">{{item.usernameD}}</view>
							    <view class="dynamicDate">{{item.date}}</view>
							</view>
							
						</view>
						<!-- 正文 -->
						<view class="dynamicText">{{item.title}}</view>
						<!-- 内容为作品 -->
						<!-- <image class="dynamicImage" :src='item.imageD' mode="aspectFill"></image> -->
						<view v-if="item.work.workid ==''" class="dynamicGridBox">
							<gridBox :picture="item.image"></gridBox>
						</view>
						<!-- 内容为作品 end-->
						
						<!-- 内容不为为作品 -->
						<view v-if="item.work.workid!=''" class="dynamicGridBox" @click="workNavi(item.work.workid)">
							<image class="dynamicImage" :src='item.imageD' mode="aspectFill"></image>
							<view class="dynamicTitle">{{item.work.titleW}}</view>
						</view>
						<!-- 内容不为为作品end -->
						
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
								    <image class='littleIcon' src="../../static/icon/chat.png" @click="recommend(item.id)"></image>
								    <text class="number">{{item.commentNum}}</text>
								</td>
								<td>
									<image class='littleIcon2' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</td>
							</tr>
						</table>
					</view>
						    
				</template>
				
			</uni-list-item>
		</uni-list>
		
		<uni-load-more status="noMore"></uni-load-more>
		</view>
		
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
						<span :class="item.recLike==1?'iconfont2':'iconfont'" @click='recomendLike(index)'>&#xe608;</span>
					</view>
                </scroll-view>
            </view>
			 </view>
		 </view>
		

   <view class="lastBlank"></view>
	</view>
</template>


<script>
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default{
		// data(){
		// 	return{
		// 		inconType:['search']
		// 	}
		// },
		// onLoad(){
		// 	this.inconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
		// }
		components: {
			gridBox
		},
		data(){
			return{
				recommendTag:0,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				recentUser:[
					{
					avatarT:'../../static/iconn/p2.jpg',
					usernameT:'蒲儿姓蒲'
					},
					{
						avatarT:'../../static/iconn/p3.jpg',
						usernameT:'Suzy_Z'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					},
					{
						avatarT:'../../static/iconn/p2.jpg',
						usernameT:'机智的党妹'
					}
				],
				dynamicItem:[
					{
						Id:'1',
						userId:'',
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						image:[
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
						relayNum:'1141'
					},
					{
						Id:'2',
						userId:'',
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						image:[
							'../../static/iconn/d1.jpg',
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
							workid:'',
							titleW:''
						},
						imageD:'../../static/iconn/d1.jpg',
						interestNum:'5482',
						isInterest:'0',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'3',
						userId:'',
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						image:[
							'../../static/iconn/d1.jpg',
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
							workid:'',
							titleW:''
						},
						imageD:'../../static/iconn/d1.jpg',
						interestNum:'5482',
						isInterest:'0',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'4',
						userId:'',
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						image:[
							'../../static/iconn/d1.jpg',
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
							workid:'',
							titleW:''
						},
						imageD:'../../static/iconn/d1.jpg',
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
			dynamicDetailNavi(i){
				uni.navigateTo({
					url:'dynamicDetails?dynamicId='+i
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
