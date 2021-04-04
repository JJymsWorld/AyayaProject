<template>
	<view>
		<view class="EventsPage-wrapper">
			<view class="tab-top-bar">
				<view class="tab-top-bar-left">活动</view>
				<view class="tab-top-bar-right">季番合集</view>
			</view>
			<view class="top-function-bar">
				<view class="top-function-bar-left">
					<text>筛选</text>
					<view :class="['fas','fa-bars']" class="top-function-bar-left-icon"></view>
				</view>
				<view class="top-function-bar-right">
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
					<uni-list-item :border="false" class="Events-list-item" v-for="(item,index) in EventsList" :key="index" direction="column" :title="item.title" :ellipsis="2">
						<view slot="header" class="Events-list-item-header">
							<image :src="item.img_url" mode="aspectFill"></image>
						</view>
						<view slot="body" class="Events-list-item-body">
							<text>{{item.title}}</text>
						</view>
						<view slot="footer" class="Events-list-item-footer">
							<view class="Events-list-item-footer-left">
								<view class="Events-list-item-footer-EventsActive" v-if="item.isActive==true">进行中</view>
								<view class="Events-list-item-footer-EventsnoActive" v-if="item.isActive==false">已结束</view>
							</view>
							<view class="Events-list-item-footer-right">
								<view :class="['far','fa-user']" class="Events-list-item-footer-right-icon"></view>
								<text class="Events-list-item-footer-right-text">{{item.AttendentNum}}参与</text>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				EventsList:[
					{
						id:0,
						img_url:"../../static/EventsSource/1.jpg",
						title:"【Cos正片征集】第10-9期《请问您今天要来点兔子吗？》保登心爱",
						isActive:true,
						AttendentNum:1920
					},
					{
						id:2,
						img_url:"../../static/EventsSource/2.jpg",
						title:"【Cos正片征集】第10-1期《请问您金条要来天兔子吗？》宇治松 千夜",
						isActive:false,
						AttendentNum:1920
					},
					{
						id:3,
						img_url:"../../static/EventsSource/2.jpg",
						title:"【Cos合集】第十期《请问您今天要来点兔子吗？》",
						isActive:true,
						AttendentNum:1920
					}
				]
			}
		}
	}
</script>


<style lang="scss" scoped>
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
