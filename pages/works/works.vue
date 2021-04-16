<template>
	<view>
		<view class="headblank"></view>
		<!-- 顶部导航栏 -->
	<view class="head">
		<span class="iconfont" @click='backlast'>&#xe6b0;</span>
		<image :src="avertar" mode="aspectFill"></image>
		<text class="hText">{{username}}</text>
		<view class="contentIcon"><text>关注</text></view>
	</view>
	<!-- 内容部分 -->
	<view class="picbox">
		
		<view>
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
<<<<<<< HEAD
		                   
=======
		                    <swiper class="myswiper" :indicator-dots="true" :autoplay="false" :interval="interval" :duration="duration" indicator-active-color='#FF6EA2'>
								<swiper-item v-for="(item,index) in pic" >
										<image :src="item" mode="aspectFit"></image>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
								</swiper-item>
		                    </swiper>
		                </view>
		            </view>
		        </view>
				
	</view>
<<<<<<< HEAD
	<ul class="ull">
=======
<!-- 	<ul class="ull">
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
					<li></li>
					<li></li>
					<li></li>
					<li></li>
<<<<<<< HEAD
				</ul>
=======
				</ul> -->
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
	<view class="contentBox">
		<view>{{title}}</view>
		<table>
			<tr>
<<<<<<< HEAD
				<td>出境：<a>@{{model}}</a></td>
			</tr>
			<tr>
				<td>摄影：<a>@{{photography}}</a></td>
			</tr>
			<tr>
				<td>妆容：<a>#{{makeupLook}}#</a></td>
=======
				<td>出境：<text>@{{model}}</text></td>
			</tr>
			<tr>
				<td>摄影：<text>@{{photography}}</text></td>
			</tr>
			<tr>
				<td>妆容：<text>#{{makeupLook}}#</text></td>
			</tr>
			<tr>
				<td>服饰：<text @click="clothingClick(clothingLink)">#{{clothingName}}#</text></td>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			</tr>
		</table>
	</view>
	<!-- 正文 -->
	<view class="textBox">
		<view class="otherLabel">
			<span v-for="(item,index) in label" :key="index">
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
			<span v-for="(item,index) in recommend" :key='index'>
			<image :src="item.pic"></image>
			<view>{{item.title}}</view>
		    </span>
		</scroll-view>
		
	</view>
	<!-- 全部评论 -->
	<view class="commendbigBox">
		<view class="commendT">全部评论</view>
		<!-- 每一条评论 -->
<<<<<<< HEAD
		<view class="commentBox" v-for="(item,index) in comment" :key='index'>
			<view>
				<image :src="item.avatarC"></image>
				<span>
					<view>{{item.usernameC}}</view>
					<view class="commentTime">{{item.timeC}}</view>
				</span>
			</view>
			<view class="commentTextC">{{item.textC}}</view>
			<view class="commentIconBox">
			<span class="iconfont1">&#xe60b;</span>
			<span class="iconfont3">&#xe659;</span>
			<span class="iconfont1">&#xe6b3;</span>
			</view>
			<view class="commentedBox">
				<view>
					<a>国际巨星：</a>
					<span class="commendedtext">少女的恬静 夫人的端庄 书生的洒脱</span>
				</view>
				<view>共{{item.commentN}}条回复 ></view>
			</view>
			
		</view>
=======
		
		<uni-list :border="false" >
		    <uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in comment" :key='item.commentId'>
		        <template slot="body" class="slot-box slot-text">
					<view class="commentBox">
						<view class="commentboxFirst">
							<image :src="item.avatarC"></image>
							<span>
								<view>{{item.usernameC}}</view>
								<view class="commentTime">{{item.timeC}}</view>
							</span>
						</view>
						<view class="commentTextC">{{item.textC}}</view>
						<view class="commentIconBox">
						<span class="iconfont1">&#xe60b;</span>
						<span class="iconfont3">&#xe659;</span>
						<span class="iconfont1">&#xe6b3;</span>
						</view>
						<view class="commentedBox">
							<view class="commentedBoxv1">
								<text>国际巨星：</text>
								少女的恬静 夫人的端庄 书生的洒脱少女的恬静 夫人的端庄 书生的洒脱
							</view>
							<view class="commentBoxv2">共{{item.commentN}}条回复 ></view>
						</view>
						
					</view>
				</template>
		        
		    </uni-list-item>
		</uni-list>
		
		
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
	</view>
	<view class="lastBox">
		<ul>
			<li><input value="说点啥..."> </li>
			<li>
				<span class="iconfont2">&#xe785;</span>
<<<<<<< HEAD
				<span>2310</span>
			</li>
			<li>
				<span class="iconfont2">&#xe609;</span>
				<span >2310</span>
			</li>
			<li>
				<span class="iconfont2">&#xe600;</span>
				<span>2310</span>
			</li>
			<li>
				<span class="iconfont2">&#xe65f;</span>
				<span>2310</span>
			</li>
			<li>
				<span class="iconfont2">&#xe615;</span>
				<span>2310</span>
=======
				<span>{{interestNum}}</span>
			</li>
			<li>
				<span class="iconfont2">&#xe609;</span>
				<span >{{collectNum}}</span>
			</li>
			<li>
				<span class="iconfont2">&#xe600;</span>
				<span>{{commentNum}}</span>
			</li>
			<li>
				<span class="iconfont2">&#xe65f;</span>
				<span>{{relayNum}}</span>
			</li>
			<li>
				<span class="iconfont2">&#xe615;</span>
				<span>{{starNum}}</span>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			</li>
		</ul>
	</view>
	<view class="lastblank"></view>
</view>
</template>

<script>
	export default{
		data(){
			return{
				workId:'',
				userid:'',
				avertar:'../../static/CoserlistSource/userheadimg7.jpg',
				username:'国际巨星',
<<<<<<< HEAD
=======
				interestNum:'2310',
				isInterest:'0',
				collectNum:'2310',
				isCollect:'0',
				commentNum:'2310',
				relayNum:'2310',
				starNum:'2310',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
				pic:[
					'../../static/contentImg/3.jpg',
					'../../static/CoserlistSource/userheadimg7.jpg',
					'../../static/contentImg/3.jpg',
					'../../static/contentImg/3.jpg'
				],
				model:'国际巨星',
				photography:'超级摄影',
				makeupLook:'江南美人妆',
<<<<<<< HEAD
=======
				clothingName:'汉服',
				clothingLink:'hfeuigywbqbfiu',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
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
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告gaogaoagoagaogaoag'
					},
					{
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					},
					{
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					},
					{
						pic:'../../static/CoserlistSource/userheadimg7.jpg',
						title:'西域美人图 预告'
					}
				],
				comment:[
					{
<<<<<<< HEAD
=======
						commentId:'1',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						]
					},
					{
						commentId:'3',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						]
					},{
						commentId:'4',
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						]
					},{
						commentId:'55',
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						avatarC:'../../static/iconn/p2.jpg',
						usernameC:'蒲儿姓蒲',
						timeC:'2020-12-08      ',
						textC:'春水碧于天，画船听雨眠',
						commentN:'10',
						commented:[
							{
								usernameD:'国际巨星',
								textD:'少女的恬静 夫人的端庄 书生的洒脱'
							}
						]
					}
				],
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				
				
				background: ['color1', 'color2', 'color3'],
				            indicatorDots: true,
				        
				            interval: 2000,
				            duration: 500
			}
		},
		onLoad:function(option){
			console.log(option.id);
		},
		methods:{
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
			},
			makeTheSameNavi:function(){
				uni.navigateTo({
					url:'myWish'
				})
<<<<<<< HEAD
=======
			},
			clothingClick(i){
				uni.setClipboardData({
					data:i,
					success:function(){
						console.log(i);
						uni.hideToast();
					}
					
				})
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			}
		},
		
		changeIndicatorDots(e) {
		            this.indicatorDots = !this.indicatorDots
<<<<<<< HEAD
		        },
		        intervalChange(e) {
		            this.interval = e.target.value
		        },
		        durationChange(e) {
		            this.duration = e.target.value
		        }
=======
		},
		intervalChange(e) {
		            this.interval = e.target.value
		},
		durationChange(e) {
		            this.duration = e.target.value
		}
		
				
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
		    
	}
</script>

<style>
	@import url("works.css");
	@import url("workIcon.css");
</style>
