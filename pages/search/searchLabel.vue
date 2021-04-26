<template>
	<view class="box">
		<view class="navigate-box">

		</view>
		<view class="search-box">
			<uni-search-bar @confirm="" :radius="30" @cancel="onGoBack" :value="searchLabel"></uni-search-bar>
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
								<view class="dynamicUsername" @click.stop="homePageNavi(item.accountB)">{{item.userName}}</view>
							    <view class="dynamicDate">{{item.uploadTime}}</view>
							</view>
							<view class="cancelButtonNot"  @click.stop=""><text>关注</text></view>
						</view>
						<!-- 正文 -->
						<view class="dynamicText">{{item.mainBody}}</view>
						
						<view v-if="item.opusId!=''" class="dynamicGridBox" @click.stop="workNavi(item.opusId)">
							<image class="dynamicImage" :src='item.opusPhotos' mode="aspectFill"></image>
							<view class="dynamicTitle">{{item.title}}</view>
						</view>
						<!-- 内容不为为作品end -->
						
						<table class="littleIconTable">
							<tr>
								<td>
									
									<view v-if="item.type==0" style="width: 50rpx;height: 50rpx;">
									    <span class="iconfont3" @click='addLike(index)'>&#xe785;</span>
									    <text class="number">{{item.likesNumber}}</text>
									</view>
									    <view v-if="item.type==1" style="width: 50rpx;height: 50rpx;">
									    <span class="iconfont4" @click='addLike(index)'>&#xe608;</span>
									    <text class="number1">{{item.likesNumber}}</text>
									</view>
								</td>
								<td>
								    <image class='littleIcon' src="../../static/icon/chat.png" @click="recommend(item.id)"></image>
								    <text class="number">{{item.commentedNumber}}</text>
								</td>
								<td>
									<image class='littleIcon2' src="../../static/icon/relay.png"></image>
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
		
		</view>
		
	</view>
	</view>

</template>

<script>
	
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default{
		onLoad(option) {
			// 接收传入的搜索话题
			this.searchLabel = option.label
			
			this.userId = getApp().globalData.global_userId
			console.log(this.userId)
			this.LoadDynamic(1,1,10)
		},
		
		components: {
			gridBox
		},
		data(){
			return{
				searchLabel: '',
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
			// 返回前一页面
			onGoBack: function(){
				console.log('cancel')
				uni.navigateBack({
					
				})
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
			dynamicDetailNavi:function(event,i){
				// event = event || window.event;
				// event.preventDefault()
				//         if (event && event.stopPropagation) {
				//             event.stopPropagation();
				//         } else {
				//             event.cancelBubble = true;
				//         }
				uni.navigateTo({
					url:'../DynamicPage/dynamicDetails?dynamicId='+i
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
	@import url("../DynamicPage/dynamic.css");
	@import url("./searchRes.css");
	.cancelButtonNot{
		position: absolute;
		top: 40rpx;
		right: 30rpx;
		width: 100rpx;
		height: 45rpx;
		border: 1rpx solid #EC808D;
		border-radius: 30rpx;
		text-align: center;
		line-height: 35rpx;
	}
	.cancelButtonNot text{
		font-size: 23rpx;
		color: #EC808D;
	}
</style>


