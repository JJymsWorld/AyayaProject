<template>
	<view>
	<view class="backbox">
		<span class="iconfont" @tap="navigateBack">&#xe6b0;</span>
		<view class="backBoxButtom"></view>
		<view class="backBoxMain">
			<image src="../../../static/iconn/2.jpg" mode="aspectFill"></image>
			<text class="backBoxUsername">{{username}}</text>
			<text class="backBoxSign">{{sign}}</text>
			<view class="backBoxEdit"><text>编辑资料</text></view>
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
		<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in dynamicItem" :key="item.dyId">
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
								<image class='littleIcon'src='../../../static/icon/like.png' @click="addLike(index)"></image>
								<text class="number">{{item.interestNum}}</text>
							</td>
							<td>
							    <image class='littleIcon' src="../../../static/icon/chat.png"></image>
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
		components: {
			waterfallsFlow
		},
		data(){
			return{
				
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
				tabIndex:1,
				dynamicItem:[
					{
						dyId:'1',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						dyId:'2',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						commentNum:'2145',
						relayNum:'1141'
					},
					{
						dyId:'3',
						avatarD:'../../../static/iconn/p2.jpg',
						usernameD:'机智的党妹',
						date:'2020-06-25',
						title:'点赞表态!',
						imageD:'../../../static/iconn/d1.jpg',
						textD:'蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
						interestNum:'5482',
						commentNum:'2145',
						relayNum:'1141'
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
			navigateBack(){
				uni.navigateBack();
			},
			changeFun(i){
				this.tabIndex=i;
			},
			addLike:function(i){
				this.dynamicItem[i].interestNum++;
			},
			workNavigate(){
				uni.navigateTo({
					url:'../../works/works'
				})
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
	
</style>
<style>
	@import url("homePageCss");
</style>
