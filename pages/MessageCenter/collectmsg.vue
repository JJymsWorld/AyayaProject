<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable @click="" class="message-item" :border="false" :ellipsis='2' direction="row" v-for="(item, index) in allList" :key="index">
				<!-- 左边头像 -->
				<template v-slot:body>
					<view class="message-item-lbox" @click="gotoUserHomePage(item.user_id)">
						<image :src="item.header_pic" mode="aspectFill"></image>
					</view>
				</template>
				<!-- 右边信息 -->
				<template v-slot:footer>
					<view class="message-item-rbox">
						<view class="message-item-rbox-left">
							<view class="">
								<text @click="gotoUserHomePage(item.user_id)">{{item.user_name}}</text>
							</view>
							<view class="">
								<image v-if='item.opus_id' src="../../static/hearticon.png" mode="heightFix"></image>
								<image v-if='item.collected_id' src="../../static/staricon.png" mode="heightFix"></image>
							</view>
							<view class="">
								<text class="text2">{{item.time}}</text>
							</view>
						</view>
						<view class="message-item-rbox-right" @click="gotoWorkPage(item)">
							<image :src="item.opus_photos" mode="aspectFill"></image>
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
				pageSize: 5,
				allList: [],
				allListTotal: null
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
			gotoWorkPage: function(item) {
				var workId = 0
				if(item.collected_id){
					workId = item.collected_id
				}
				else{
					workId = item.opus_id
				}
				console.log(workId)
				uni.navigateTo({
					url: '../works/works?workId=' + workId
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function(){
				uni.navigateTo({
					url: '../DynamicPage/dynamicDetails'
				})
			},
			// 获取评论列表
			async onGetAllList() {
				// 获取点赞列表
				const res = await this.$myRequest({
					url: '/Contact/getLikedList',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						user_id: this.userId
					}
				})
				
				// 获取收藏列表
				const res2 = await this.$myRequest({
					url: '/Contact/getFavouredList',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						user_id: this.userId
					}
				})
				
				res.data.list = res.data.list.concat(res2.data.list)
				res.data.total = res.data.total + res2.data.total
				
				// // 根据时间由大到小排序
				// res.data.list.sort(function(a,b){
				//             return b.time-a.time});
							
				// for (var item in res.data.list) {
				// 	//  处理Date数据类型
				// 	res.data.list[item].time = this.$Format(res.data.list[item].time, "yyyy-MM-dd")
				// }
				return res.data
			}
		},
		// 加载更多
		async onReachBottom() {
			const sum = this.pageNum * this.pageSize * 2
			// 加载更多数据
		
			if (this.allListTotal > sum) {
				this.loadStatus = 'loading'
				this.pageNum++
		
				const res1 = await this.onGetAllList()
				this.allList = this.allList.concat(res1.list.reverse())
		
			} else {
				this.loadStatus = 'noMore'
			}
		
		},
		async onShow() {
			const res = await this.onGetAllList()
			this.allList = res.list.reverse()
			console.log(this.allList)
			this.allListTotal = res.total
			console.log(this.allListTotal)
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
