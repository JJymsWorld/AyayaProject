<template>
	<view>
		<view class="CosumeMakeup-wrapper">
			<view class="top-tab-bar">
				<view class="top-tab-bar-title" @click="tabToCostume">服饰</view>
				<view class="top-tab-bar-active">妆容</view>
			</view>
			<view  class="Makeup-wrapper">
				<view class="CostumeOrMakeup-swiper">
					<swiper indicator-dots="true" autoplay="true" interval="3000" circular="true">
						<swiper-item v-for="(item,index) in MakeupswiperImgs" :key="index">
							<image :src="item.url" mode="aspectFill" class="swiper-item"></image>
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
					<view class="topic-lable-right">
						查看更多内容
					</view>
				</view>
				<view class="function-bar">
					<view class="function-bar-filter">
						<text>分类</text>
						<view :class="['fas','fa-bars']" class="function-bar-filter-icon" ></view>
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
</style>
