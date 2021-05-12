<template>
	<view>
		<view class="CosumeMakeup-wrapper">
			<mingpop ref="mingpop" direction="center" :is_close="false" :width="50">
				<view class="fullTopic" v-for="(item,index) in MakeuptopicContent" :key="index" @click="TopicClick(item.mark)">
					<text class="topic-lable-mid-content-label">#{{item.mark}}#</text>
					<!-- <text class="topic-lable-mid-content-title">{{item.title}}</text> -->
				</view>
			</mingpop>
			<view class="top-tab-bar">
				<view class="top-tab-bar-title" @click="tabToCostume">服饰</view>
				<view class="top-tab-bar-active">妆容</view>
			</view>
			<view  class="Makeup-wrapper">
				<view class="CostumeOrMakeup-swiper">
					<swiper indicator-dots="true" autoplay="true" interval="3000" circular="true">
						<swiper-item v-for="(item,index) in MakeupswiperImgs" :key="index" @click="gotoWorksPage(item.opus_id)">
							<image :src="item.photo" mode="aspectFill" class="swiper-item"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="topic-lable">
					<view class="topic-lable-left">
						<text>话题</text>
					</view>
					<view class="topic-lable-mid">
						<view class="topic-lable-mid-content" >
							<text class="topic-lable-mid-content-label" @click="TopicClick(MakeUpTopic)">#{{MakeUpTopic}}#</text>
							<!-- <text class="topic-lable-mid-content-title">{{item.title}}</text> -->
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
						<uni-combox @input="filterSelect" inputDisabled="true" iconType="bars" :iconSize="20" :value="filterList[0]" :candidates="filterList"></uni-combox>
					</view>
					<view class="function-bar-searchbar" @click="gotoSearchPage">
						<input disabled="true" placeholder="搜索" placeholder-class="popcoser-search-fs" />
						<view class="searchbar-search-Icon">
							<slot class="search-icon">
								<view :class="['fas','fa-search']" class="searchIcon-style"></view>
							</slot>
						</view>
					</view>
					<view class="function-bar-editor" @click="gotoPostWorksPage">
						<view :class="['fas','fa-edit']"></view>
					</view>
				</view>
				<view class="CostumeOrMakeup-waterfallsflow">
					<waterfallsFlow ref="waterfallsFlow" :list="MakeupWorkslist" class="CostumeOrMakeup-waterfallsflow-style" imageSrcKey="opus_photos" idKey="opus_id" @wapper-lick="gotoWorksPageWaterFall($event)">
						<template v-slot:default="item" class="content-box-item">
							<view class="cnt">
								<view class="CostumeOrMakeup-waterfallsflow-title">{{item.main_body}}</view>
								<view class="user-info-box">
									<image class="user-head-img" :src="item.header_pic" mode="aspectFill"></image>
									<view class="user-name">{{item.user_name}}</view>
									<view class="view-num" :class="['far', 'fa-eye']" aria-hidden="true">{{item.browse_num}}
									</view>
								</view>
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
	import msDropdownMenu from "@/components/ms-dropdown/dropdown-menu.vue";
	import msDropdownItem from "@/components/ms-dropdown/dropdown-item.vue";
	import mingpop from "@/components/ming-pop/ming-pop.vue";
	export default {
		components:{waterfallsFlow,msDropdownMenu,msDropdownItem,mingpop},
		async onLoad() {
			const http = new this.$Request();
			
			http.get("/MakeUp/getSlide",{params:{type:3}}).then(res=>{
				this.MakeupswiperImgs = res.data;
			}).catch(err=>{
				console.log(err);
			})
			// uni.request({
			// 	url:"http://8.136.216.96:8086/MakeUp/getAllWorks",
			// 	data:{
			// 		type:2
			// 	},
			// 	success: (res) => {
			// 		console.log(res.data);
			// 		this.MakeupWorkslist = res.data;
			// 	},
			// 	fail: () => {
					
			// 	}
			// })
			
			
			//获取瀑布流内容
			
			
			if(this.initList == true){
				await http.get("/Costume/getAllWorks", {params:{pageNum:this.pageNum, pageSize:8, type:1}}).then(res=>{
					this.MakeupWorkslist = res.data.list;
					this.pageNum++;
					this.initList = false;
					if(res.data.hasNextPage == true){
						this.loadStatus ="more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
			
			//获取Topic
			await http.get("/MakeUp/getTopic",{params:{type:1}}).then(res=>{
				this.MakeuptopicContent = res.data;
				this.MakeUpTopic = this.MakeuptopicContent[0].mark;
			}).catch(err=>{
				console.log(err);
			});
			this.timeid = setInterval(()=>{
				this.MakeUpTopicIndex = (this.MakeUpTopicIndex + 1) % (this.MakeuptopicContent.length);
				// console.log(this.MakeUpTopicIndex)
				this.MakeUpTopic = this.MakeuptopicContent[this.MakeUpTopicIndex].mark;
			}, 3000);
		},
		async onReachBottom(){
			const http = new this.$Request();
			if(this.flag == true){
				this.loadStatus = "loading";
				await http.get("/Costume/getAllWorks",{params:{pageNum:this.pageNum, pageSize:8, type:1}}).then(res=>{
					this.CostumeWorkslist = this.CostumeWorkslist.concat(res.data.list);
					this.pageNum++;
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		onShow() {
			
		},
		onHide() {
			
		},
		onUnload() {
			clearInterval(this.timeId);
		},
		data() {
			return {
				valValue:"全部",
				pageNum:1,
				pageSize:0,
				flag:true,
				initList:true,
				loadStatus:"noMore",
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
				],
				MakeUpTopic:"",
				MakeUpTopicIndex:0,
				timeid:0,
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
					// {
					// 	id:0,
					// 	image_url:"../../static/CostumeAndMakeup/1.jpg",
					// 	title:"圣母玛利亚妆面the Virgin Mary油画质感创意欧美妆"
					// },
					// {
					// 	id:1,
					// 	image_url:"../../static/CostumeAndMakeup/2.jpg",
					// 	title:"偏光爆闪霓虹复古y2k妆面撞色吸睛眼妆"
					// },
					// {
					// 	id:2,
					// 	image_url:"../../static/CostumeAndMakeup/3.jpg",
					// 	title:"把BJD娃娃妆面画在脸上，BJD娃娃仿妆"
					// },
					// {
					// 	id:3,
					// 	image_url:"../../static/CostumeAndMakeup/4.jpg",
					// 	title:"加入Seraphine出新皮肤，会是这样的吗？"
					// },
					// {
					// 	id:4,
					// 	image_url:"../../static/CostumeAndMakeup/9.jpg",
					// 	title:"陶瓷姑娘|我又仿了我的画"
					// }
				]
			}
		},
		methods: {
			tabToCostume(){
				uni.redirectTo({
					url:"./CostumePage"
				})
			},
			viewMoreTopic(){
				this.$refs.mingpop.show();
			},
			gotoWorksPage(id){
				console.log(id);
				uni.navigateTo({
					url:"../works/works?workId=" + id
				})
			},
			gotoWorksPageWaterFall(event){
				console.log(event.opus_id);
				uni.navigateTo({
					url:"../works/works?workId=" + event.opus_id
				})
			},
			gotoSearchPage(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			gotoPostWorksPage(){
				uni.navigateTo({
					url:"../ContentReleasePage/postWorks"
				})
			},
			TopicClick(e){
				uni.navigateTo({
					url:"../search/searchLabel?label=" + e
				})
			},
			filterSelect(e){
				// console.log(e);
				const http = new this.$Request();
				if(this.valValue != e){
					this.pageNum = 1;
					this.valValue = e;
					if(this.valValue == "全部"){
						http.get("/Costume/selectWorks",{params:{type:1}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "Cos"){
						http.get("/Costume/selectWorks",{params:{type:2}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "JK"){
						http.get("/Costume/selectWorks",{params:{type:3}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "汉服"){
						http.get("/Costume/selectWorks",{params:{type:4}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "Lolita"){
						http.get("/Costume/selectWorks",{params:{type:5}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "妆容"){
						http.get("/Costume/selectWorks",{params:{type:6}}).then(res=>{
							this.MakeupWorkslist = res.data;
							console.log("获取"+this.valValue+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					this.$refs.waterfallsFlow.refresh();
				}
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
	.fullTopic{
		display: flex;
		flex-direction: row;
		font-size: 25rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.user-info-box {
		display: flex;
		flex-direction: row;
		margin: auto;
	}
	
	.user-head-img {
		width: 35rpx;
		height: 35rpx;
		border-style: none;
		border-radius: 25rpx;
		margin-right: 10rpx;
		margin-left: 5rpx;
	}
	
	.user-name {
		font-size: 8pt;
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: auto;
	}
	
	.view-num {
		color: #797979;
		margin-top: auto;
		margin-bottom: auto;
		font-size: 8pt;
	}
</style>
