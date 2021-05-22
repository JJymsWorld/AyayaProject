<template>
	<view>
		<view class="navigate-box">
		
		</view>
		<view class="">
			<uni-search-bar @confirm="" :radius="30" @cancel="onGoBack" :value="searchLabel"></uni-search-bar>
		</view>
		<view class="">
			<uni-list :border="false" v-for='(item, index) in searchOrderList' :key='index'>
				<uni-list-item :border="false" direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.ListNum}}
						<view class="money-box">
							<image src="../../static/money.png" mode=""></image>
							{{item.Money}}
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-body-box">
						<image :src="item.imageB" mode="" @click="gotoUserHomePage()"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage()">
								摄影师：{{item.usernamB}}
							</view>
							<view class="">
								拍摄时间：{{item.Time}}
							</view>
							<view class="">
								拍摄地点：{{item.Area}}
							</view>
						</view>
					</view>
					<!-- 自定义 footer-->
					<view slot="footer" class="slot-footer-box">
						<button>取消订单</button>
						<button>修改订单信息</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchLabel: '',
				searchOrderList: [{
					ListNum: 'p32769',
					Statet: '',
					// CoserId
					AccountA: '',
					usernamA: '',
					imageA: '../../static/coser.png',
					// 摄影师Id
					AccountB: '',
					usernamB: 'Suzy_Z',
					imageB: '../../static/photograph.png',
					Content: '',
					Area: '浙江省 杭州市 西湖区',
					Time: '2020年12月25日',
					Money: 298
				}]
			}
		},
		onLoad(option) {
			// 接收传入的搜索话题
			this.searchLabel = option.label
		},
		methods: {
			// 返回前一页面
			onGoBack: function(){
				console.log('cancel')
				uni.navigateBack({
					
				})
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

<style lang="scss" scoped>
	@import url("./coser/myorder.css");
	/deep/ .uni-list-item {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 4px 4px 4px 4px rgba(221, 221, 221, 0.1);
		margin-bottom: 20rpx;
	}
	
	/deep/ .uni-list-item__container {
		background-color: #FFFFFF;
	}
	.navigate-box {
		width: 100%;
		height: 70rpx;
	}
</style>
