<template>
	<view>
		<view class="CosumeMakeup-wrapper">
			<mingpop ref="mingpop" direction="center" :is_close="false" :width="80">
				<view class="fullTopic" v-for="(item,index) in CostumetopicContent" :key="index">
					<text class="topic-lable-mid-content-label">#{{item.label}}#</text>
					<text class="topic-lable-mid-content-title">{{item.title}}</text>
				</view>
			</mingpop>
			<view class="top-tab-bar">
				<view class="top-tab-bar-active">服饰</view>
				<view class="top-tab-bar-title" @click="tabToMakeup">妆容</view>
			</view>
			<view  class="Costume-wrapper">
				<view class="CostumeOrMakeup-swiper">
					<swiper indicator-dots="true" autoplay="true" interval="3000" circular="true">
						<swiper-item v-for="(item,index) in CostumeswiperImgs" :key="index" @click="gotoWorksPage">
							<image :src="item.photo" mode="aspectFill" class="swiper-item"></image>
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
					<view class="topic-lable-right" @click="viewMoreTopic">
						查看更多内容
					</view>
				</view>
				<view class="function-bar">
					<view class="function-bar-filter" >
						<!-- <text>分类</text>
						<view :class="['fas','fa-bars']" class="function-bar-filter-icon" ></view> -->
						<uni-combox inputDisabled="true" iconType="bars" :iconSize="20" :value="filterList[0]" :candidates="filterList"></uni-combox>
					</view>
					<view class="function-bar-searchbar" @click="gotoSearchPage">
						<input disabled="true" placeholder="搜索" placeholder-class="popcoser-search-fs" />
						<view class="searchbar-search-Icon">
							<slot class="search-icon">
								<view :class="['fas','fa-search']" class="searchIcon-style"></view>
							</slot>
						</view>
					</view>
					<view class="function-bar-editor" @click="gotoPostWorks">
						<view :class="['fas','fa-edit']"></view>
					</view>
				</view>
				<view class="CostumeOrMakeup-waterfallsflow">
					<waterfallsFlow :list="CostumeWorkslist" imageSrcKey="opus_photos" idKey="opus_id" @wapper-lick="gotoWorksPage">
						<template v-slot:default="item" class="content-box-item" >
							<view class="cnt">
								<view class="CostumeOrMakeup-waterfallsflow-title">{{item.main_body}}</view>
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
	import mingpop from "@/components/ming-pop/ming-pop.vue"
	export default {
		components:{waterfallsFlow,mingpop},
		onLoad() {
			const http = new this.$Request();
			//获取轮播图
			http.get("/Costume/getSlide",{params:{type:2}}).then(res=>{
				this.CostumeswiperImgs = res.data;
			}).catch(err=>{
				
			})
			//获取瀑布流内容
			
			
			http.get("/Costume/getAllWorks",{params:{type:2}}).then(res=>{
				console.log(res.data);
				this.CostumeWorkslist = res.data;
			}).catch(err=>{
				console.log(err)
			})
		},
		data() {
			return {
				filterList:['全部','Cos','JK','汉服','Lolita','妆容'],
				CostumeswiperImgs: [
					// {
					// 	img_id: 0,
					// 	photo: "http://8.136.216.96:8080/picture/O1CN01zUpm4224kX0ui6XMj_!!830107429.jpg"
					// },
					// {
					// 	img_id: 1,
					// 	photo: "../../static/swiperImg/4.jpg"
					// }
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
					// {
					// 	id:0,
					// 	opus_photos:"../../static/CostumeAndMakeup/5.jpg",
					// 	main_body:"王者荣耀:露娜紫霞仙子Cosplay"
					// },
					// {
					// 	id:1,
					// 	opus_photos:"../../static/CostumeAndMakeup/6.jpg",
					// 	main_body:"迪士尼万圣节攻略:装扮白雪公主"
					// },
					// {
					// 	id:2,
					// 	opus_photos:"../../static/CostumeAndMakeup/7.jpg",
					// 	main_body:"当不倒翁小姐姐Cosplay楚乔传"
					// },
					// {
					// 	id:3,
					// 	opus_photos:"../../static/CostumeAndMakeup/8.jpg",
					// 	main_body:"孙尚香-时之恋人"
					// }
				]
			}
		},
		methods: {
			tabToMakeup(){
				uni.redirectTo({
					url:'./MakeUpPage'
				})
			},
			viewMoreTopic(){
				this.$refs.mingpop.show();
			},
			gotoWorksPage(){
				uni.navigateTo({
					url:"../works/works"
				})
			},
			gotoSearchPage(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			gotoPostWorks(){
				uni.navigateTo({
					url:"../ContentReleasePage/postWorks"
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
	.fullTopic{
		display: flex;
		flex-direction: row;
		font-size: 25rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
</style>
