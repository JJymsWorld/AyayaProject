<template>
	<view class="box">
		<view class="navigate-box">

		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" @cancel="onGoBack" :value="value" cancelButton="always"></uni-search-bar>
		</view>
		<view class="row-box tab-box">
			<view v-for="(tab,index) in tabBars" :key="index" :id='index' class='uni-tab-item' @click="ontabtap">
				<text class="uni-tab-item-title"
					:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab}}</text>
			</view>
			<view class="line-h"></view>
		</view>
		<view class="row-box user-box" v-if='tabIndex == 0'>
			<!-- 综合页面 -->
			<!-- 用户头像 -->
			<view class="recentBox">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
					<span v-for="(item,index) in searchUser" :key='index' @click='gotoUserHomePage'>
						<image :src="item.avatarT"></image>
						<view>{{item.usernameT}}</view>
					</span>
				</scroll-view>
			</view>
			<!-- 作品/动态页面 -->
			<uni-list :border="false">
				<!-- 作品页面 -->
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="item.id" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoWorkPage">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoWorkPage">{{item.text}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.article}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.interestNum}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commentNum}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
				<!-- 动态页面 -->
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in dynamicItem"
					:key="index" :title="item.text" to='../DynamicPage/dynamicDetails'>
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoDynamicPage">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoDynamicPage">{{item.text}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.article}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.interestNum}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commentNum}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="row-box" v-if='tabIndex == 1'>
			<!-- 作品页面 -->
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="index" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoWorkPage">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoWorkPage">{{item.text}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.article}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.interestNum}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commentNum}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="row-box" v-if='tabIndex == 2'>
			<!-- 用户页面 -->
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :border="false" direction="column" v-for="(item,index) in CoserInfoList" :key="index"
						class="StayInCoser-List-item" >
						<view slot="header" class="StayInCoser-item">
							<image :src="item.header_pic" class="StayInCoser-item-avatar" mode="aspectFill" @click="gotoUserHomePage"></image>
							<view class="StayInCoser-item-info">
								<view class="StayInCoser-item-nameandlikenum">
									<text @click="gotoUserHomePage">{{item.user_name}}</text>
									<view>
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.focused_num}}</text>
									</view>
								</view>
								<view class="StayInCoser-item-position" @click="gotoUserHomePage">
									<uni-icons type="location-filled"></uni-icons>
									<text>{{item.city}}</text>
								</view>
								<text @click="gotoUserHomePage" class="StayInCoser-item-intro">个人介绍:{{item.autograph}}</text>
							</view>
							<view class="StayInCoser-item-likebutton">
								<!-- <button class="StayInCoser-item-likebutton-btn">关注</button> -->
								<uni-fav :checked="item.checked" star="false" :contentText="contentText"
									bgColor="#EC808D" bgColorChecked="#797979" @click="LikeBtnClick(index)"
									fgColor="#333333"></uni-fav>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
				<uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
	</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				loadStatus:"noMore",
				pageNum: [1, 1, 1], 	// 综合页、作品页、用户页分页标记
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				value: "",
				tabBars: ["综合", "作品", "用户"],
				tabIndex: 0,
				searchUser: [{
						avatarT: '../../static/iconn/p2.jpg',
						usernameT: '蒲儿姓蒲'
					},
					{
						avatarT: '../../static/iconn/p3.jpg',
						usernameT: 'Suzy_Z'
					},
					{
						avatarT: '../../static/iconn/p2.jpg',
						usernameT: '机智的党妹'
					}
				],
				dynamicItem: [{
					image_url: '../../static/iconn/d1.jpg',
					text: '点赞表态!',
					article: '机智的党妹',
					interestNum: '5482',
					commentNum: '2145',
					relayNum: '1141'
				}],
				CoserInfoList: [],	// 用户列表
				contentText: {
					contentDefault: '关注',
					contentFav: '已关注'
				},
				SearchWorksList: [
					{
						id:'1',
						image_url: '../../static/HotListImg/2.jpg',
						text: '江南美人图|奇迹团团环游中华之乌镇',
						article: '机智的党妹',
						interestNum: '5482',
						commentNum: '2145',
						relayNum: '1141'
					}
				]
			}
		},
		async onLoad(option) {
			this.value = option.label
			this.onGetCoserInfoList()
		},
		async onReachBottom() {
			console.log('reach')
			const i = this.tabIndex
			this.pageNum[i]++
			console.log(this.pageNum[i])
			const res = await this.$myRequest({
				url: '/Search/getUserByString',
				data: {
					pageNum: this.pageNum[i],
					pageSize: 7,
					searchStr: this.value
				}
			})
			console.log(res.data.list)
			this.CoserInfoList = this.CoserInfoList.concat(res.data.list)
			
		},
		methods: {
			// 获取用户列表
			
			async onGetCoserInfoList(i){
				const res = await this.$myRequest({
					url: '/Search/getUserByString',
					data: {
						pageNum: this.pageNum[i],
						pageSize: 7,
						searchStr: this.value
					}
				})
				this.CoserInfoList = res.data.list
				// for(var j in this.CoserInfoList){
				// 	this.CoserInfoList[j].checked = false
				// }
				console.log(this.CoserInfoList)
				
			},
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
			},
			onSearch: function(e) {
				this.value = e.value
				console.log(this.value)
				this.onGetCoserInfoList(2)
			},
			// 清空搜索历史
			delHsty: function() {
				console.log('清空搜索历史')
			},
			ontabtap: function(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
			// 返回前一页面
			onGoBack: function() {
				console.log('cancel')
				uni.navigateBack({

				})
			},
			LikeBtnClick: function(e) {
				this.CoserInfoList[e].checked = !this.CoserInfoList[e].checked
				console.log(e, this.CoserInfoList[e].checked)
			},
			// 进入用户个人主页
			gotoUserHomePage: function(){
				uni.navigateTo({
					url: '../Mypage/homePage/homePage'
				})
			},
			// 进入作品详情页面
			gotoWorkPage: function(){
				uni.navigateTo({
					url: '../works/works'
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function(){
				uni.navigateTo({
					url: '../DynamicPage/dynamicDetails'
				})
			}
		}
	}
</script>

<style>
	@import url("./searchRes.css");
</style>
