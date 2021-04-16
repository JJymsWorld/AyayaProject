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
<<<<<<< HEAD
									<image class='littleIcon'src='../../static/icon/like.png' @click="addLike(index)"></image>
									<text class="number">{{item.interestNum}}</text>
								</td>
								<td>
								    <image class='littleIcon' src="../../static/icon/chat.png"></image>
=======
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
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
<<<<<<< HEAD
		<uni-load-more status="noMore"></uni-load-more>
		</view>
	
		
=======
		
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
		

   <view class="lastBlank"></view>
	</view>
</template>

<script>
	export default{
		// data(){
		// 	return{
		// 		inconType:['search']
		// 	}
		// },
		// onLoad(){
		// 	this.inconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
		// }
		data(){
			return{
<<<<<<< HEAD
=======
				recommendTag:0,
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
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
<<<<<<< HEAD
=======
						userId:'',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
<<<<<<< HEAD
=======
						isInterest:'0',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'2',
<<<<<<< HEAD
=======
						userId:'',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
<<<<<<< HEAD
=======
						isInterest:'0',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						Id:'3',
<<<<<<< HEAD
=======
						userId:'',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						avatarD:'../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
<<<<<<< HEAD
						commentNum:'2145',
						relayNum:'1141'
					}
=======
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
				]
			}
		},
		methods:{
			addLike(i){
<<<<<<< HEAD
				this.$data.dynamicItem[i].interestNum++;
=======
				var t=this.$data.dynamicItem[i].isInterest;
				if(t==0){
					this.$data.dynamicItem[i].interestNum++;
					this.$data.dynamicItem[i].isInterest=1;
				}
				else{
					this.$data.dynamicItem[i].interestNum--;
					this.$data.dynamicItem[i].isInterest=0;
				}
				
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			},
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
<<<<<<< HEAD
			}
			
=======
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
			}
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
		}
		
	}
	
</script>

<style>
	@import url("dynamic.css");
</style>
