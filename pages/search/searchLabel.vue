<template>
	<view class="box">
		<view class="navigate-box">
		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" @cancel="onGoBack" :value="searchLabel" cancelButton="always"></uni-search-bar>
		</view>
		<!-- 动态内容 -->
		<view class="dynamicBox">
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in searchWorkList"
					:key="">
					<template v-slot:body>
						<view class="dynamicIt" @click="">
							<view class="dynamnicHead">
								<image class="dynamicAvatar" :src='item.header_pic'
									@click.stop="homePageNavi(item.user_id)"></image>
								<view class="dynamicUserDate">
									<view class="dynamicUsername" @click.stop="homePageNavi(item.user_id)">
										{{item.user_name}}
									</view>
									<view class="dynamicDate">{{item.upload_time}}</view>
								</view>
								<view class="attentionButton" v-if='!item.checked' @click.stop="changeChecked(item.user_id, index)"><text>关注</text></view>
								<view class="attentionButton NotattentionButton" v-if='item.checked' @click.stop="changeChecked(item.user_id, index)"><text>已关注</text></view>
							</view>
							<!-- 正文 -->
							<view class="dynamicText">{{item.main_body}}</view>

							<view v-if="item.opusId!=''" class="dynamicGridBox" @click.stop="workNavi(item.opus_id)">
								<image class="dynamicImage" :src='item.opus_photos' mode="aspectFill"></image>
								<view class="dynamicTitle">{{item.title}}</view>
							</view>
							<!-- 内容不为为作品end -->

							<!-- <table class="littleIconTable">
								<tr>
									<td  @click.stop="addLike()">
										<view style="width: 50rpx;height: 50rpx;">
											<span class="iconfont4" @click=''>&#xe608;</span>
											<text class="number1">{{item.likes_number}}</text>
										</view>
										
									</td>
									<td>
										<image class='littleIcon' src="../../static/icon/chat.png"
											@click="recommend(item.id)"></image>
										<text class="number">{{item.commented_num}}</text>
									</td>
									<td @click.stop="open">
										<image class='littleIcon2' src="../../static/icon/relay.png"></image>
										<text class="number">{{item.shared_num}}</text>
									</td>
								</tr>
							</table> -->
						</view>

					</template>

				</uni-list-item>
			</uni-list>

			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<!-- 转发 -->
		<uni-popup ref="popup" type="bottom">
			   <view class="relayPopBox">
				   <view class="relayPopBoxTitle">分享至</view>
				   <view class="relayPopBoxButtonBox">
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe61a;</span>
						   <view class="relayText">微信</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe65b;</span>
					   	   <view class="relayText">朋友圈</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe73c;</span>
					   	   <view class="relayText">微博</view>
					   </view>
					   <view class="relayPopBoxButton">
						   <span class="iconfontx" >&#xe60c;</span>
					   	   <view class="relayText">QQ</view>
					   </view>
				   </view>
				   
				   <view class="relayPopBoxExit" @click.stop="close()">取消</view>
			   </view>
		</uni-popup>
	</view>
</template>

<script>
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default {
		data() {
			return {
				loadStatus:	'noMore',
				searchLabel: '',
				userId: null,
				searchWorkList: [],
				workListTotal: null, // 搜索到的作品总数
				pageNum: 1,
				pageSize: 5
			}
		},
		components: {
			gridBox
		},
		async onLoad(option) {
			
			uni.getStorage({
				key: 'userId',
				success: res => {
					console.log(res.data);
					this.userId = res.data
				}
			});
			
			// 接收传入的搜索话题
			this.searchLabel = option.label

			const res = await this.onGetSearchWorksList()
			this.searchWorkList = res.list
			this.workListTotal = res.total
			console.log(this.searchWorkList)
		},
		async onReachBottom() {
			console.log('reach')
			const sum = this.pageNum * this.pageSize

			// 作品加载更多
			if (this.workListTotal > sum) {
				this.loadStatus = 'loading'
				this.pageNum++
				const res = await this.onGetSearchWorksList()
				this.searchWorkList = this.searchWorkList.concat(res.list)
			} else {
				this.loadStatus = 'noMore'
			}

		},
		methods: {
			open(){
			         // 通过组件定义的ref调用uni-popup方法
			         this.$refs.popup.open()
					 // var webView = this.$mp.page.$getAppWebview();  
					 // let titleNView = webView.getTitleNView();  
					 // titleNView && titleNView.hide();
					 // currentWebview.setStyle({
					 // titleNView:titleNView
					 // })
			},
			close(){
				this.$refs.popup.close()
			},
			// 获取作品列表
			async onGetSearchWorksList() {
				const res = await this.$myRequest({
					url: '/Search/getOpusByMark',
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						searchStr: this.searchLabel,
						user_id: this.userId
					}
				})
				for(var item in res.data.list){
					//  处理Date数据类型
					res.data.list[item].upload_time = this.$Format(res.data.list[item].upload_time,"yyyy-MM-dd")
				}
				return (res.data)
			},
			// 重新搜索
			async onSearch(e) {
				if(e.value != ''){
					this.searchLabel = e.value
					console.log(this.searchLabel)
					this.pageNum = 1
					
					const res = await this.onGetSearchWorksList()
					this.searchWorkList = res.list
					this.workListTotal = res.total
					console.log(this.searchWorkList)
				}
			},
			// 点赞作品
			addLike() {
				
			},
			// 返回前一页面
			onGoBack: function() {
				console.log('cancel')
				uni.navigateBack({})
			},
			// 取消关注
			deleteFocus(b){
				 this.$myRequest({
					url:'/MyPage/HomePage/delFocusPersonByBothId',
					method:'DELETE',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						account_a:this.userId,
						account_b:b
					}
				})
			},
			// 关注
			addFocus(b){
				 this.$myRequest({
					url:'/MyPage/HomePage/addFocus',
					method: 'POST',
					header:{'content-type':'application/x-www-form-urlencoded'},
					data:{
						account_a:this.userId,
						account_b:b
					}
				})
			},
			// 改变关注状态
			changeChecked(userb, e){
				if(this.searchWorkList[e].checked == 0){
					this.searchWorkList[e].checked = 1
					this.addFocus(userb)
				}
				else{
					this.searchWorkList[e].checked = 0
					this.deleteFocus(userb)
				}
			},
			workNavi(i) {
				// console.log(i)
				uni.navigateTo({
					url: '../works/works?workId=' + i
				})
			},
			dynamicDetailNavi: function(event, i) {
				// event = event || window.event;
				// event.preventDefault()
				//         if (event && event.stopPropagation) {
				//             event.stopPropagation();
				//         } else {
				//             event.cancelBubble = true;
				//         }
				uni.navigateTo({
					url: '../DynamicPage/dynamicDetails?dynamicId=' + i
				})
			},

			homePageNavi(i) {
				uni.navigateTo({
					url: '../Mypage/homePage/homePage?userId=' + i
				})
			}
		}

	}
</script>


<style lang="scss" scoped>
	/deep/ .uni-list-item {
		background-color: #FBFBFB;
		padding: 0;
		padding-bottom: 0rpx;
		padding-top: 5rpx;
	}

	/deep/ .uni-list-item__container {
		background-color: #FFFFFF;
		padding: 0;

	}
</style>
<style>
	@import url("../DynamicPage/dynamic.css");
	@import url("./searchRes.css");

	.attentionButton {
		position: absolute;
		top: 40rpx;
		right: 30rpx;
		width: 100rpx;
		height: 45rpx;
		border: 1rpx solid #EC808D;
		border-radius: 30rpx;
		text-align: center;
		line-height: 35rpx;
	}

	.attentionButton text {
		font-size: 23rpx;
		color: #EC808D;
	}
	
	.NotattentionButton {
		border: 1rpx solid #808080;
	}
	
	.NotattentionButton text {
		color: #808080;
	}
</style>
