<template>
	<view>
		<view class="CosumeMakeup-wrapper">
<<<<<<< HEAD
=======
			<mingpop ref="mingpop" direction="center" :is_close="false" :width="80">
				<view class="fullTopic" v-for="(item,index) in MakeuptopicContent" :key="index">
					<text class="topic-lable-mid-content-label">#{{item.label}}#</text>
					<text class="topic-lable-mid-content-title">{{item.title}}</text>
				</view>
			</mingpop>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			<view class="top-tab-bar">
				<view class="top-tab-bar-title" @click="tabToCostume">服饰</view>
				<view class="top-tab-bar-active">妆容</view>
			</view>
			<view  class="Makeup-wrapper">
				<view class="CostumeOrMakeup-swiper">
					<swiper indicator-dots="true" autoplay="true" interval="3000" circular="true">
						<swiper-item v-for="(item,index) in MakeupswiperImgs" :key="index">
<<<<<<< HEAD
							<image :src="item.url" mode="aspectFill" class="swiper-item"></image>
=======
							<image :src="item.photo" mode="aspectFill" class="swiper-item"></image>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						</swiper-item>
					</swiper>
				</view>
				<view class="topic-lable">
					<view class="topic-lable-left">
						<text>话题</text>
					</view>
					<view class="topic-lable-mid">
						<view class="topic-lable-mid-content" v-for="(item,index) in TwoMakeupTopic" :key="index">
							<text class="topic-lable-mid-content-label">#{{item.label}}#</text>
							<text class="topic-lable-mid-content-title">{{item.title}}</text>
						</view>
					</view>
<<<<<<< HEAD
					<view class="topic-lable-right">
=======
					<view class="topic-lable-right" @click="viewMoreTopic">
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
						查看更多内容
					</view>
				</view>
				<view class="function-bar">
<<<<<<< HEAD
					<view class="function-bar-filter">
						<text>分类</text>
						<view :class="['fas','fa-bars']" class="function-bar-filter-icon" ></view>
=======
					<view class="function-bar-filter" >
						<!-- <text>分类</text>
						<view :class="['fas','fa-bars']" class="function-bar-filter-icon" ></view> -->
						<uni-combox inputDisabled="true" iconType="bars" :iconSize="20" :value="filterList[0]" :candidates="filterList"></uni-combox>
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
					</view>
					<view class="function-bar-searchbar">
						<input disabled="true" placeholder="搜索" placeholder-class="popcoser-search-fs" />
						<view class="searchbar-search-Icon">
							<slot class="search-icon">
								<view :class="['fas','fa-search']" class="searchIcon-style"></view>
							</slot>
						</view>
					</view>
					<view class="function-bar-editor">
						<view :class="['fas','fa-edit']"></view>
					</view>
				</view>
				<view class="CostumeOrMakeup-waterfallsflow">
					<waterfallsFlow :list="MakeupWorkslist" class="CostumeOrMakeup-waterfallsflow-style">
						<template v-slot:default="item" class="content-box-item">
							<view class="cnt">
								<view class="CostumeOrMakeup-waterfallsflow-title">{{item.title}}</view>
							</view>
						</template>
					</waterfallsFlow>
					<uni-load-more status="noMore" ></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "../../components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
<<<<<<< HEAD
	export default {
		components:{waterfallsFlow},
		data() {
			return {
				MakeupswiperImgs: [{
						img_id: 0,
						url: "../../static/swiperImg/5.jpg"
					},
					{
						img_id: 1,
						url: "../../static/swiperImg/6.png"
					}
=======
	import msDropdownMenu from "@/components/ms-dropdown/dropdown-menu.vue";
	import msDropdownItem from "@/components/ms-dropdown/dropdown-item.vue";
	import mingpop from "@/components/ming-pop/ming-pop.vue";
	export default {
		components:{waterfallsFlow,msDropdownMenu,msDropdownItem,mingpop},
		onLoad() {
			uni.request({
				url:"http://8.136.216.96:8086/MakeUp/getSlide",
				data:{
					type:1
				},
				success(res) {
					this.MakeupswiperImgs = res.data;
					console.log(this.MakeupswiperImgs)
				},
				fail() {
					cnosole.log('请求失败')
				}
			})
		},
		data() {
			return {
				filterList:['全部','Cos','JK','汉服','Lolita','妆容'],
				MakeupswiperImgs: [
					// {
					// 	img_id: 0,
					// 	url: "../../static/swiperImg/5.jpg"
					// },
					// {
					// 	img_id: 1,
					// 	url: "../../static/swiperImg/6.png"
					// }
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
				],
				MakeuptopicContent:[
					{
						id:0,
						label:"季番活动",
						title:"圣玛丽亚妆面比拼"
					},
					{
						id:1,
						label:"12月热门角色",
						title:"圣玛丽亚妆面比拼"
					}
				],
				MakeupWorkslist:[
					{
						id:0,
						image_url:"../../static/CostumeAndMakeup/1.jpg",
						title:"圣母玛利亚妆面the Virgin Mary油画质感创意欧美妆"
					},
					{
						id:1,
						image_url:"../../static/CostumeAndMakeup/2.jpg",
						title:"偏光爆闪霓虹复古y2k妆面撞色吸睛眼妆"
					},
					{
						id:2,
						image_url:"../../static/CostumeAndMakeup/3.jpg",
						title:"把BJD娃娃妆面画在脸上，BJD娃娃仿妆"
					},
					{
						id:3,
						image_url:"../../static/CostumeAndMakeup/4.jpg",
						title:"加入Seraphine出新皮肤，会是这样的吗？"
					},
					{
						id:4,
						image_url:"../../static/CostumeAndMakeup/9.jpg",
						title:"陶瓷姑娘|我又仿了我的画"
					}
				]
			}
		},
		methods: {
			tabToCostume(){
				uni.redirectTo({
					url:"./CostumePage"
				})
<<<<<<< HEAD
=======
			},
			viewMoreTopic(){
				this.$refs.mingpop.show();
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			}
		},
		computed:{
			TwoMakeupTopic() {
				return this.MakeuptopicContent.filter((item,index)=>{
					return index<=1
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.CostumeOrMakeup-waterfallsflow{
		width: 95%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30rpx;
		.cnt{
			padding: 10rpx;
		}
	}
<<<<<<< HEAD
=======
	/deep/ .uni-combox{
		height:20px;
		margin-top:auto;
		margin-bottom:auto;
		// width:40%;
	}
	/deep/ .uni-combox__input{
		flex:1;
		font-size:28rpx;
		height:15px;
		line-height:15px;
		text-align: center;
		width: 80rpx;
	}
	/deep/ .uni-combox__input-box{
		height:20px;		
	}
	/deep/ .product-window{
		background-color: rgba($color: #FFF, $alpha: 0.8);
	}
	// /deep/ .product-window{
	// 	background-color: rgba($color: #fff, $alpha: 0.9);
	// }
	// .filterbutton-wrapper{
	// 	background-color: rgba($color: #FFF, $alpha: 0.0);
	// }
	// .filterButton-style{
	// 	color: #797979;
	// 	font-size: 34rpx;
	// 	// background-color: rgba($color: #FFF, $alpha: 0.9);
	// 	border: none;
	// }
	// .filterButton-hover{
	// 	color: rgb(0,0,0);
	// 	background-color: rgba(0, 0, 0, 0.2);
	// 	opacity: 0.7;
	// }
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
</style>
<style>
	@import url("CostumeAndMakeup.css");

	page {
		background-image: url(../../static/backgroundImg/bg4.png);
		background-size: contain;
		background-repeat: no-repeat;
		/* background-color: #F2A3C3; */
	}
	
	.CostumeOrMakeup-waterfallsflow-title{
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}
	.CostumeOrMakeup-waterfallsflow-style{
		margin-bottom: 20rpx;
	}
<<<<<<< HEAD
=======
	.fullTopic{
		display: flex;
		flex-direction: row;
		font-size: 25rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
</style>
