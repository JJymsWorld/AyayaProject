<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable @click="" class="message-item" :border="false" :ellipsis='2' direction="row"
				v-for="(item, index) in focusedList" :key="index">
				<!-- 左边头像 -->
				<template v-slot:body>
					<view class="message-item-lbox" @click="gotoUserHomePage(item.account_a)">
						<image :src="item.header_pic" mode="widthFix"></image>
					</view>
				</template>
				<!-- 右边信息 -->
				<template v-slot:footer>
					<view class="message-item-rbox">
						<view class="message-item-rbox-left">
							<view class="">
								<text @click.stop="gotoUserHomePage(item.account_a)">{{item.user_name}}</text>
							</view>
							<view class="">
								<text class="text2">对方关注了你～</text>
							</view>
							<view class="">
								<text class="text2">{{item.date}}</text>
							</view>
						</view>
						<view class="message-item-rbox-right">
							<uni-fav :checked="item.isFocus == 1" star="false" :contentText="contentText"
								bgColor="#EC808D" bgColorChecked="#797979" @click="LikeBtnClick(index)"
								fgColor="#333333"></uni-fav>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				useId: null, // 登录者的Id
				loadStatus: "onMore",
				pageNum: 1, // 分页标记
				pageSize: 10,
				focusedList: [],
				focusedListTotal: null, // 搜索到的被关注总数
				contentText: {
					contentDefault: '关注',
					contentFav: '已关注'
				}
			}
		},
		methods: {
			// 进入用户个人主页
			gotoUserHomePage: function(userId) {
				console.log(userId)
				uni.navigateTo({
					url: '../Mypage/homePage/homePage?userId=' + userId
				})
			},
			// 进入作品详情页面
			gotoWorkPage: function() {
				uni.navigateTo({
					url: '../works/works'
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function() {
				uni.navigateTo({
					url: '../DynamicPage/dynamicDetails'
				})
			},
			// 改变关注状态
			LikeBtnClick(i) {
				// 关注
				if (this.focusedList[i].isFocus == 1) {
					this.focusedList[i].isFocus = 0
				} else { // 取消关注
					this.focusedList[i].isFocus = 1
				}
			},
			// 获取新增关注列表
			async onGetFocusedList() {
				const res = await this.$myRequest({
					url: '/Contact/getFocusedList',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						user_id: this.userId
					}
				})
				for (var item in res.data.list) {
					//  处理Date数据类型
					res.data.list[item].date = this.$Format(res.data.list[item].date, "yyyy-MM-dd")
				}
				return res.data
			}
		},
		// 加载更多
		async onReachBottom() {
			const sum = this.pageNum * this.pageSize
			// 加载更多数据

			if (this.focusedListTotal > sum) {
				this.loadStatus = 'loading'
				this.pageNum++

				const res1 = await this.onGetFocusedList()
				this.focusedList = this.focusedList.concat(res1.list.reverse())

			} else {
				this.loadStatus = 'noMore'
			}

		},
		async onShow() {
			const res = await this.onGetFocusedList()
			this.focusedList = res.list.reverse()
			console.log(this.focusedList)
			this.focusedListTotal = res.total
			console.log(this.focusedListTotal)
		},
		onLoad(option) {
			uni.getStorage({
				key: 'userId',
				success: res => {
					this.userId = res.data
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import url("./collectmsg.css");
</style>
