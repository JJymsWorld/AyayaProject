<template>
	<view>
		<view class="CosumeMakeup-wrapper">
			<view class="top-tab-bar">
				<view class="top-tab-bar-active">服饰</view>
				<view class="top-tab-bar-title" @click="tabToMakeup">妆容</view>
			</view>
			<view  class="Costume-wrapper">
				<view class="CostumeOrMakeup-swiper">
					<swiper indicator-dots="true" autoplay="true" interval="3000" circular="true">
						<swiper-item v-for="(item,index) in CostumeswiperImgs" :key="index">
							<image :src="item.url" mode="aspectFill" class="swiper-item"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="topic-lable">
					<view class="topic-lable-left">
						<text>话题</text>
					</view>
					<view class="topic-lable-mid">
						<view class="topic-lable-mid-content" v-for="(item,index) in TwoCostumeTopic" :key="index">
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
					<waterfallsFlow :list="CostumeWorkslist">
						<template v-slot:default="item" class="content-box-item">
							<view class="cnt">
								<view class="CostumeOrMakeup-waterfallsflow-title">{{item.title}}</view>
							</view>
						</template>
					</waterfallsFlow>
					<uni-load-more status="noMore"></uni-load-more>
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
				CostumeswiperImgs: [{
						img_id: 0,
						url: "../../static/swiperImg/3.jpg"
					},
					{
						img_id: 1,
						url: "../../static/swiperImg/4.jpg"
					}
				],
				CostumetopicContent:[
					{
						id:0,
						label:"服装推荐",
						title:"万圣节Cos服装"
					},
					{
						id:1,
						label:"12月新品发布",
						title:"中牌制服馆"
					},
					{
						id:2,
						label:"约拍广场",
						title:"谁知江南无醉意，笑看春风。"
					}
				],
				CostumeWorkslist:[
					{
						id:0,
						image_url:"../../static/CostumeAndMakeup/5.jpg",
						title:"王者荣耀:露娜紫霞仙子Cosplay"
					},
					{
						id:1,
						image_url:"../../static/CostumeAndMakeup/6.jpg",
						title:"迪士尼万圣节攻略:装扮白雪公主"
					},
					{
						id:2,
						image_url:"../../static/CostumeAndMakeup/7.jpg",
						title:"当不倒翁小姐姐Cosplay楚乔传"
					},
					{
						id:3,
						image_url:"../../static/CostumeAndMakeup/8.jpg",
						title:"孙尚香-时之恋人"
					}
				]
			}
		},
		methods: {
			tabToMakeup(){
				uni.redirectTo({
					url:'./MakeUpPage'
				})
			}
		},
		computed:{
			TwoCostumeTopic() {
				return this.CostumetopicContent.filter((item,index)=>{
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
</style>
