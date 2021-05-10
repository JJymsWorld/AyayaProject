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
					<span v-for="(item,index) in CoserInfoList" :key='index' @click='gotoUserHomePage'>
						<image :src="item.header_pic"></image>
						<view>{{item.user_name}}</view>
					</span>
				</scroll-view>
			</view>
			<!-- 作品/动态页面 -->
			<uni-list :border="false">
				<!-- 动态页面 -->
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in dynamicItem"
					:key="index" :title="item.text" to='../DynamicPage/dynamicDetails'>
					<!-- 左边动态图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoDynamicPage">
							<image class="ListImg-Style" :src="item.dynamic_photos" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边动态信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoDynamicPage">{{item.main_body}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.user_name}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.likes_number}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commented_num}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.shared_number}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
				<!-- 作品页面 -->
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="item.id" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoWorkPage">
							<image class="ListImg-Style" :src="item.opus_photos" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoWorkPage">{{item.title}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.user_name}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.likes_number}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commented_num}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.shared_num}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
				
			</uni-list>
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
		<view class="row-box" v-if='tabIndex == 1'>
			<!-- 作品页面 -->
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="index" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List" @click="gotoWorkPage">
							<image class="ListImg-Style" :src="item.opus_photos" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text" @click="gotoWorkPage">{{item.title}}</view>
							<view class="List-article" @click="gotoUserHomePage">{{item.user_name}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.likes_number}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commented_num}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.shared_num}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-load-more :status="loadStatus" ></uni-load-more>
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
				loadStatus:"onMore",
				pageNum: [1, 1, 1], 	// 综合页、作品页、用户页分页标记
				pageSize: 7,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				value: "",
				tabBars: ["综合", "作品", "用户"],
				tabIndex: 0,
				dynamicItem: [],	// 动态列表
				dynamicListTotal: [],	// 搜索到的动态总数
				CoserInfoList: [],	// 用户列表
				coserListTotal: null,	// 搜索到的用户总数
				contentText: {
					contentDefault: '关注',
					contentFav: '已关注'
				},
				SearchWorksList: [],	// 作品列表
				workListTotal: null,	// 搜索到的作品总数
			}
		},
		async onLoad(option) {
			this.value = option.label
			
			const res = await this.onGetDynamicList(0)
			this.dynamicItem = res.list
			this.dynamicListTotal = res.total
			
			const res1 = await this.onGetSearchWorksList(1)
			this.SearchWorksList = res1.list
			this.workListTotal = res1.total
			
			const res2 = await this.onGetCoserInfoList(2)
			this.CoserInfoList = res2.list
			this.coserListTotal = res2.total
			
		},
		async onReachBottom() {
			console.log('reach')
			const i = this.tabIndex
			const sum = this.pageNum[i] * this.pageSize
			// 综合页面加载更多
			if(i == 0){
				if(this.workListTotal > sum ||  this.dynamicListTotal > sum){
					this.loadStatus = 'loading'
					this.pageNum[i]++
					if(this.workListTotal > sum){
						this.pageNum[1] = this.pageNum[i]
						const res1 = await this.onGetSearchWorksList(i)
						this.SearchWorksList = this.SearchWorksList.concat(res1.list)
					}
					if(this.dynamicListTotal > sum){
						const res2 = await this.onGetDynamicList(i)
						this.dynamicItem = this.dynamicItem.concat(res2.list)
					}
				}
				else{
					this.loadStatus = 'noMore'
				}
			}
			// 作品页面加载更多
			else if(i == 1){
				if(this.workListTotal > sum){
					this.loadStatus = 'loading'
					this.pageNum[i]++
					const res = await this.onGetSearchWorksList(i)
					this.SearchWorksList = this.SearchWorksList.concat(res.list)
				}
				else{
					this.loadStatus = 'noMore'
				}
			}
			// 用户页面加载更多
			else if(i == 2){
				if(this.coserListTotal > sum){
					this.loadStatus = 'loading'
					this.pageNum[i]++
					const res = await this.onGetCoserInfoList(i)
					this.CoserInfoList = this.CoserInfoList.concat(res.list)
				}
				else{
					this.loadStatus = 'noMore'
				}
			}	
		},
		methods: {
			// 获取动态列表
			async onGetDynamicList(i){
				const res = await this.$myRequest({
					url: '/Search/getDynamicByString',
					data: {
						pageNum: this.pageNum[i],
						pageSize: this.pageSize,
						searchStr: this.value
					}
				})
				return (res.data)
			},
			// 获取作品列表
			async onGetSearchWorksList(i){
				const res = await this.$myRequest({
					url: '/Search/getOpusByString',
					data: {
						pageNum: this.pageNum[i],
						pageSize: this.pageSize,
						searchStr: this.value
					}
				})
				return (res.data)
			},
			// 获取用户列表
			async onGetCoserInfoList(i){
				const res = await this.$myRequest({
					url: '/Search/getUserByString',
					data: {
						pageNum: this.pageNum[i],
						pageSize: this.pageSize,
						searchStr: this.value
					}
				})
				return (res.data)
			},
			scroll: function(e) {
			    console.log(e)
			    this.old.scrollTop = e.detail.scrollTop
			},
			backlast: function() {
				uni.navigateBack()
			},
			async onSearch(e) {
				if(e.value != ''){
					this.value = e.value
					console.log(this.value)
					this.pageNum = [1, 1, 1]
					
					const res = await this.onGetDynamicList(0)
					this.dynamicItem = res.list
					this.dynamicListTotal = res.total
					
					const res1 = await this.onGetSearchWorksList(1)
					this.SearchWorksList = res1.list
					this.workListTotal = res1.total
					
					const res2 = await this.onGetCoserInfoList(2)
					this.CoserInfoList = res2.list
					this.coserListTotal = res2.total
				}
				
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
				if(this.CoserInfoList[e].checked == 0){
					this.CoserInfoList[e].checked = 1
				}
				else{
					this.CoserInfoList[e].checked = 0
				}
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
