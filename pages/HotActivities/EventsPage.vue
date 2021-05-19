<template>
	<view>
		<view class="EventsPage-wrapper">
			<view class="tab-top-bar">
				<view class="tab-top-bar-left">活动</view>
				<view class="tab-top-bar-right" @click="JumpToCollectionsPage">季番合集</view>
			</view>
			<view class="top-function-bar">
				<view class="top-function-bar-left" >
					<!-- <text>筛选</text>
					<view :class="['fas','fa-bars']" class="top-function-bar-left-icon"></view> -->
					<uni-combox @input="filterSelect" inputDisabled="true" iconType="bars" :iconSize="20" :value="filterList[0]" :candidates="filterList"></uni-combox>
				</view>
				<view class="top-function-bar-right" @click="gotoSearchPage">
					<input disabled="true" placeholder="搜索" placeholder-class="popcoser-search-fs" />
					<view class="searchbar-search-Icon">
						<slot class="search-icon">
							<view :class="['fas','fa-search']" class="searchIcon-style"></view>
						</slot>
					</view>
				</view>
			</view>
			<view class="Events-list">
				<uni-list class="Events-list-list" :border="false">
					<uni-list-item :border="false" class="Events-list-item" v-for="(item,index) in EventsList" :key="index" direction="column" :title="item.title" :ellipsis="2" :to="'EventDetailPage?activity_id=' + item.activity_id">
						<view slot="header" class="Events-list-item-header">
							<image :src="item.photo" mode="aspectFill"></image>
						</view>
						<view slot="body" class="Events-list-item-body">
							<text>{{item.content}}</text>
						</view>
						<view slot="footer" class="Events-list-item-footer">
							<view class="Events-list-item-footer-left">
								<view class="Events-list-item-footer-EventsActive" v-if="item.state==1">进行中</view>
								<view class="Events-list-item-footer-EventsnoActive" v-if="item.state==0">已结束</view>
							</view>
							<view class="Events-list-item-footer-right">
								<view :class="['far','fa-user']" class="Events-list-item-footer-right-icon"></view>
								<text class="Events-list-item-footer-right-text">{{item.number}}参与</text>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
				<uni-load-more :status="loadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		async onLoad() {
			const http = new this.$Request();
			if(this.initList == true){
				http.get("/Activity/Events/getAllEvents",{params:{pageNum:this.pageNum, pageSize:4}}).then(res=>{
					this.EventsList = res.data.list;
					this.pageNum++;
					this.initList = false;
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
		async onReachBottom() {
			const http = new this.$Request();
			if(this.flag == true && this.valValue == "全部"){
				this.loadStatus = "loading";
				await http.get("/Activity/Events/getAllEvents",{params:{pageNum:this.pageNum, pageSize:4}}).then(res=>{
					this.EventsList = this.EventsList.concat(res.data.list);
					this.pageNum++;
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
					console.log("加载执行成功")
				}).catch(err=>{
					console.log(err);
				})
			}
			
			if(this.flag == true && this.valValue == '进行中'){
				this.loadStatus = 'loading';
				await http.get("/Activity/Events/SelectEvents",{params:{pageNum:this.pageNum, pageSize:4, state:1}}).then(res=>{
					this.pageNum++;
					this.EventsList = this.EventsList.concat(res.data.list);
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
					console.log("加载执行成功")
				}).catch(err=>{
					console.log(err);
				})
			}
			
			if(this.flag == true && this.valValue == '已结束'){
				this.loadStatus = 'loading';
				await http.get("/Activity/Events/SelectEvents",{params:{pageNum:this.pageNum, pageSize:4, state:0}}).then(res=>{
					this.pageNum++;
					this.EventsList = this.EventsList.concat(res.data.list);
					if(res.data.hasNextPage == true){
						this.loadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.loadStatus = "noMore";
						this.flag = false;
					}
					console.log("加载执行成功")
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		data(){
			return {
				valValue:"全部",
				pageNum:1,
				pageSize:0,
				initList:true,
				flag:true,
				loadStatus:"noMore",
				filterList:['全部','进行中','已结束'],
				EventsList:[
					// {
					// 	id:0,
					// 	img_url:"../../static/EventsSource/1.jpg",
					// 	title:"【Cos正片征集】第10-9期《请问您今天要来点兔子吗？》保登心爱",
					// 	isActive:true,
					// 	AttendentNum:1920
					// },
					// {
					// 	id:2,
					// 	img_url:"../../static/EventsSource/2.jpg",
					// 	title:"【Cos正片征集】第10-1期《请问您金条要来天兔子吗？》宇治松 千夜",
					// 	isActive:false,
					// 	AttendentNum:1920
					// },
					// {
					// 	id:3,
					// 	img_url:"../../static/EventsSource/2.jpg",
					// 	title:"【Cos合集】第十期《请问您今天要来点兔子吗？》",
					// 	isActive:true,
					// 	AttendentNum:1920
					// }
				]
			}
		},
		methods:{
			JumpToCollectionsPage(){
				uni.redirectTo({
					url:'CosCollectionsPage'
				})
			},
			gotoSearchPage(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			filterSelect(e){
				console.log(e);
				const http = new this.$Request();
				if(this.valValue != e){
					this.valValue = e;
					this.pageNum = 1;
					if(this.valValue == '全部'){
						http.get("/Activity/Events/getAllEvents",{params:{pageNum:this.pageNum, pageSize:4}}).then(res=>{
							this.EventsList = res.data.list;
							console.log("获取"+e+"成功");
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
					if(this.valValue == "进行中"){
						http.get("/Activity/Events/SelectEvents",{params:{pageNum:this.pageNum, pageSize:4, state:1}}).then(res=>{
							this.EventsList = res.data.list;
							this.pageNum++;
							if(res.data.hasNextPage == true){
								this.loadStatus = "more";
							}
							if(res.data.hasNextPage == false){
								this.loadStatus = "noMore";
								this.flag = false;
							}
							console.log("获取"+e+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
					if(this.valValue == "已结束"){
						http.get("/Activity/Events/SelectEvents",{params:{pageNum:this.pageNum, pageSize:4, state:0}}).then(res=>{
							this.EventsList = res.data.list;
							this.pageNum++;
							if(res.data.hasNextPage == true){
								this.loadStatus = "more";
							}
							if(res.data.hasNextPage == false){
								this.loadStatus = "noMore";
								this.flag = false;
							}
							console.log("获取"+e+"成功");
						}).catch(err=>{
							console.log(err);
						})
					}
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
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
</style>
<style>
	@import url("HotActivities.css");
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
</style>
