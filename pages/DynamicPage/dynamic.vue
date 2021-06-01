<template>
	<view class="body">
		<!-- 搜索 -->
		<view class="searchBox" @click="searchNavi">
			<!-- <icon :type='inconType' size="26"></icon> -->
			<image class="searchIcon"src="../../static/icon/search.png"></image>
			<view class='searchiInput'><input  value="查找精彩动态内容" /></view>
		   	
		</view>
		<view v-if="dynamicItem == ''" class="nothingBox">
			<view class="noIcon"><span class="iconfont_dy">&#xe73b;</span></view>
			<view class="nothingBoxFirst">你还没有关注的人哦！</view>
			<view class="nothingBoxSecond">快去<text @click="indexHotNavi">首页</text>逛逛吧!</view>
		</view>
		<!-- 近期发布动态的用户 -->
		<view class="recentBox" v-if="dynamicItem != ''">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
				<span v-for="(item,index) in recentUser" :key='index'>
				<image :src="item.avatarT" @click="homePageNavi(item.userId)"></image>
				<view>{{item.usernameT}}</view>
			    </span>
			</scroll-view>
		</view>
		<!-- 动态内容 -->
		<view class="dynamicBox" v-if="dynamicItem != ''">
			<uni-list :border="false" >
			<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem" :key="item.dynamicId" >
				<template v-slot:body>
					<view class="dynamicIt"@click="dynamicDetailNavi(item)">
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
						
						<view v-if="item.opusId =='0'" class="dynamicGridBox">
							<gridBox :picture="item.dynamicPhotos"></gridBox>
						</view>
						<!-- 内容不为作品 end-->
						
						<!-- 内容不为为作品 -->
						<view v-if="item.opusId!='0'" class="dynamicGridBox" @click.stop="workNavi(item.opusId)">
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
									    <view v-if="item.type!=0" style="width: 50rpx;height: 50rpx;">
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
		
		<uni-load-more :status="loadMoreStatus" @clickLoadMore="LoadDynamicMore($event)"></uni-load-more>
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
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default{
		onLoad() {
			this.userId = getApp().globalData.global_userId || '1'
			// console.log(this.userId)
			this.initDynamicList()
		},
		components: {
			gridBox
		},
		data(){
			return{
				pageNum:1,
				pageSize:10,
				prePage:0,
				hasNextPage:true,
				hasPreviousPage:false,
				isFirstPage:true,
				isLastPage:false,
				isNoMore:true,
				loadMoreStatus:'more',
				
				
				userId:'',
				recommendTag:0,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				recentUser:[
					// {
					// 	avatarT:'../../static/iconn/p2.jpg',
					// 	usernameT:'机智的党妹',
					// userId:''
					// }
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
					}
				]
			}
		},
		methods:{
			open(){
			         // 通过组件定义的ref调用uni-popup方法
			    this.$refs.popup.open()
				
			},
			close(){
				this.$refs.popup.close()
			},
			searchNavi(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			indexHotNavi(){
				console.log("111111111111")
				uni.switchTab({
					url:'../Index_Recommend/Index_Hot'
				})
			},
			addLike(i){
				var t=this.$data.dynamicItem[i].type;
				if(t==0){
					this.$data.dynamicItem[i].likesNumber++;
					this.$data.dynamicItem[i].type=1;
				}
				else{
					this.$data.dynamicItem[i].likesNumber--;
					this.$data.dynamicItem[i].type=0;
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
			dynamicDetailNavi:function(i){
				//console.log(i)
				uni.navigateTo({
					url:'dynamicDetails',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('dynamicDetails', {
							accountB:i.accountB,
							commentedNumber:i.commentedNumber,
							dynamicId:i.dynamicId,
							dynamicPhotos:i.dynamicPhotos,
							headerPic:i.headerPic,
							likesNumber:i.likesNumber,
							mainBody:i.mainBody,
							opusId:i.opusId,
							opusPhotos:i.opusPhotos,
							sharedNumber:i.sharedNumber,
							title:i.title,
							type:i.type,
							uploadTime:i.uploadTime,
							userName:i.userName
						})
					}
				})
			},
			// 第一次加载
			async initDynamicList(){ 
				const that = this
				that.isFirstPage = true
				that.pageNum = 1
				that.pageSize = 2
				// console.log("userId"+that.userId)
				const res = await this.$myRequest({
						url:'/Dynamic/getFocusPersonItems',
						data:{
							user_id: that.userId,
							pageNum: that.pageNum,
							pageSize: that.pageSize
						}
					})
				console.log(res.data)
				that.dynamicItem=res.data.list
				for (var i = 0;i< that.dynamicItem.length;i++){
					that.dynamicItem[i].uploadTime = this.$Format(that.dynamicItem[i].uploadTime,"yyyy-MM-dd")
					//console.log(that.dynamicItem[i].uploadTime)
					var photoes = that.dynamicItem[i].dynamicPhotos
					var jsonObj = JSON.parse(photoes)
					var p = []
					for (var prop in jsonObj)
					{
					    //输出 key-value值
					    //console.log("jsonObj[" + prop + "]=" + jsonObj[prop]);
						console.log(jsonObj[prop]);
						p.push(jsonObj[prop])
					}
					that.dynamicItem[i].dynamicPhotos = p
					this.recentUser.push({"avatarT":that.dynamicItem[i].headerPic,"usernameT":that.dynamicItem[i].userName,"userId":that.dynamicItem[i].accountB})
				}
				that.isLastPage = res.data.isLastPage
				that.loadMoreStatus = res.data.hasNextPage?'more':'noMore'
				that.hasNextPage = res.data.hasNextPage
				that.hasPreviousPage = res.data.hasPreviousPage
			},
			// 触发loadMore
			async LoadDynamicMore(e){
				const that = this
				if(that.loadMoreStatus == 'more'){
					that.pageNum++
					const res = await this.$myRequest({
							url:'/Dynamic/getFocusPersonItems',
							data:{
								user_id: that.userId,
								pageNum: that.pageNum,
								pageSize: that.pageSize
							}
						})
					console.log(res.data)
					var t= res.data.list
					
					for (var i = 0;i< t.length;i++){
						t[i].uploadTime = this.$Format(t[i].uploadTime,"yyyy-MM-dd")
						var photoes = t[i].dynamicPhotos
						var jsonObj = JSON.parse(photoes)
						var p = []
						for (var prop in jsonObj)
						{
							console.log(jsonObj[prop]);
							p.push(jsonObj[prop])
						}
						t[i].dynamicPhotos = p
					}
					that.dynamicItem=that.dynamicItem.concat(t)
					console.log(that.$data.dynamicItem)
					that.isLastPage = res.data.isLastPage
					that.loadMoreStatus = res.data.hasNextPage?'more':'noMore'
					that.hasNextPage = res.data.hasNextPage
					that.hasPreviousPage = res.data.hasPreviousPage
				}
				
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
