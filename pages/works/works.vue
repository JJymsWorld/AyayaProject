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
		                    <swiper class="myswiper" :indicator-dots="false" :autoplay="false" :interval="interval" :duration="duration" indicator-active-color='#FF6EA2'>
								<swiper-item v-for="(item,index) in pic" >
									<image :src="item" mode="aspectFit"></image>
								</swiper-item>
		                    </swiper>
		                </view>
		            </view>
		        </view>
				
	</view>
	<ul class="ull">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
	<view class="contentBox">
		<view>{{title}}</view>
		<table>
			<tr>
				<td>出境：<a>@{{model}}</a></td>
			</tr>
			<tr>
				<td>摄影：<a>@{{photography}}</a></td>
			</tr>
			<tr>
				<td>妆容：<a>#{{makeupLook}}#</a></td>
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
	</view>
	<view class="lastBox">
		<ul>
			<li><input value="说点啥..."> </li>
			<li>
				<span class="iconfont2">&#xe785;</span>
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
				pic:[
					'../../static/contentImg/3.jpg',
					'../../static/CoserlistSource/userheadimg7.jpg',
					'../../static/contentImg/3.jpg',
					'../../static/contentImg/3.jpg'
				],
				model:'国际巨星',
				photography:'超级摄影',
				makeupLook:'江南美人妆',
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

<style>
	@import url("works.css");
	@import url("workIcon.css");
</style>
