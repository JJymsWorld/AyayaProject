<template>
	<view>
		<view class="CollectionContent-wrapper">
			<view class="tab-top-bar">
				<view class="tab-top-bar-left-Collection" @click="JumpToEventsPage">活动</view>
				<view class="tab-top-bar-right-Collection">季番合集</view>
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
					<uni-list-item :border="false" class="Events-list-item" v-for="(item,index) in EventsList"
						:key="index" direction="column" :title="item.content" :ellipsis="2" :to="'CoserHirePage?activity_id=' + item.activity_id">
						<view slot="header" class="Events-list-item-header">
							<image :src="item.photo" mode="aspectFill"></image>
						</view>
						<view slot="body" class="Events-list-item-body">
							<text>{{item.content}}</text>
						</view>
						<!-- <view slot="footer" class="Events-list-item-footer">
							<view class="Events-list-item-footer-left">
								<view class="Events-list-item-footer-EventsActive" v-if="item.isActive==true">进行中</view>
								<view class="Events-list-item-footer-EventsnoActive" v-if="item.isActive==false">已结束</view>
							</view>
							<view class="Events-list-item-footer-right">
								<view :class="['far','fa-user']" class="Events-list-item-footer-right-icon"></view>
								<text class="Events-list-item-footer-right-text">{{item.AttendentNum}}参与</text>
							</view>
						</view> -->
					</uni-list-item>
				</uni-list>
				<uni-load-more :status="loadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad() {
			const http = new this.$Request();
			if(this.initList == true){
				http.get("/Activity/CosCollections/getAllEvents",{params:{pageNum:this.pageNum, pageSize:4, type:1}}).then(res=>{
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
					console.log(err)
				});
			}
		},
		async onReachBottom() {
			const http = new this.$Request();
			if(this.flag == true){
				this.loadStatus = "loading";
				await http.get("/Activity/CosCollections/getAllEvents", {params:{pageNum:this.pageNum, pageSize:4, type:1}}).then(res=>{
					this.EventsList = this.EventsList.concat(res.data.list);
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
		data() {
			return {
				valValue:"全部",
				pageNum:1,
				pageSize:0,
				initList:true,
				flag:true,
				loadStatus:"noMore",
				EventsList: [
					// {
					// 	id: 0,
					// 	img_url: "../../static/EventsSource/1.jpg",
					// 	title: "【#Cos合集】第10期《请问您今天要来点兔子吗？》"
					// },
					// {
					// 	id: 2,
					// 	img_url: "../../static/EventsSource/2.jpg",
					// 	title: "【#Cos合集】第9期《租界女友》"
					// },
					// {
					// 	id: 3,
					// 	img_url: "../../static/EventsSource/2.jpg",
					// 	title: "【#Cos合集】第十期《请问您今天要来点兔子吗？》"
					// }
				]
			}
		},
		methods: {
			JumpToEventsPage() {
				uni.redirectTo({
					url:'EventsPage'
				})
			},
			gotoSearchPage(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			gotoWorksPage(){
				uni.navigateTo({
					url:"../works/works"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
<style>
	@import url("HotActivities.css");

	.uni-list::before {
		display: none;
	}

	.uni-list::after {
		display: none;
	}

	.tab-top-bar {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		width: 85%;
		margin-left: auto;
		margin-right: auto;
		align-items: flex-end;
	}

	.top-function-bar-right {
		display: flex;
		flex-direction: row;
		border-style: none;
		border-radius: 40rpx;
		background-color: rgba(242, 242, 242, 0.5);
		align-items: center;
		width: 25%;
		height: 40rpx;
		margin-left: auto;
		/* margin-right: 20rpx; */
		box-shadow: 0 0 4rpx 4rpx rgba(121, 121, 121, 0.1);
	}

	.popcoser-search-fs {
		font-size: 26rpx;
		margin-left: 20rpx;
		margin-top: auto;
		margin-bottom: auto;
	}

	.searchbar-search-Icon {
		color: #797979;
		font-size: 26rpx;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 20rpx;
	}

	.tab-top-bar-right-Collection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 68rpx;
		width: 192rpx;
		background-color: #F2A3C3;
		border-style: none;
		border-radius: 10rpx;
		color: white;
	}

	.tab-top-bar-left-Collection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 62rpx;
		width: 184rpx;
		border-style: dotted;
		border-radius: 10rpx;
		border-color: #E7A7C2;
		border-width: 4rpx;
		color: #797979;
		margin-right: 20rpx;
	}
</style>
