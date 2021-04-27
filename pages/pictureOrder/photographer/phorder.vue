<template>
	<view>
		<view class="row-box">
			<view class="top-box">
				<view class="goback-box" @click="gotoMyPage">
					<image src="../../../static/goback.png" mode=""></image>
				</view>
				<view class="search-box" @click="onSearch">
					<image src="../../../static/search-icon.png" mode=""></image>
					<input type="text" value="" confirm-type="search" placeholder="搜索我的订单" />
				</view>
			</view>
		</view>
		<ssnavbar :navArr="navArr" :tabCurrentIndex="currentIndex" @navbarTap="navbarTapHandler"></ssnavbar>
		<!-- 全部 -->
		<view class="" v-if='currentIndex == 0'>
			<uni-list v-for='(item, index) in orderlist' :key='index'>
				<uni-list-item direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.ListNum}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
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
						<button class="pinkbutton">接受</button>
						<button>拒绝</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 待处理 -->
		<view class="" v-if='currentIndex == 1'>
			<uni-list v-for='(item, index) in orderlist' :key='index'>
				<uni-list-item direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.ListNum}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
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
						<button class="pinkbutton">接受</button>
						<button>拒绝</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 进行中 -->
		<view class="" v-if='currentIndex == 2'>
			<uni-list v-for='(item, index) in orderlist' :key='index'>
				<uni-list-item direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.ListNum}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
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
						<button class="pinkbutton">上传成片</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 已完成 -->
		<view class="" v-if='currentIndex == 3'>
			<uni-list v-for='(item, index) in orderlist' :key='index'>
				<uni-list-item direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.ListNum}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
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
						<button class="pinkbutton" @click="gotoWorkPage()">查看作品</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import ssnavbar from '../../../components/ss-navbar/ss-navbar.vue'
	export default {
		data() {
			return {
				currentIndex: 0,
				navArr: [{
					title: '全部',
					url: 'all'
				}, {
					title: '待处理',
					url: 'waiting'
				}, {
					title: '进行中',
					url: 'proceeding'
				}, {
					title: '已完成',
					url: 'finished'
				}],
				orderlist: [{
					ListNum: 'p32769',
					Statet: '',
					// CoserId
					AccountA: '',
					usernamA: '',
					imageA: '../../../static/coser.png',
					// 摄影师Id
					AccountB: '',
					usernamB: 'Suzy_Z',
					imageB: '../../../static/photograph.png',
					Content: '',
					Area: '浙江省 杭州市 西湖区',
					Time: '2020年12月25日',
					Money: 298
				}]

			}
		},
		components: {
			ssnavbar
		},
		methods: {
			// 改变导航栏状态
			navbarTapHandler: function(index) {
				this.currentIndex = index;
				var obj = this.navArr[index];
				console.log('url:' + obj.url);
			},
			gotoMyPage: function(){
				uni.switchTab({
					url:'../../Mypage/mypage'
				})
			},
			// 搜索我的订单
			onSearch: function(){
				uni.navigateTo({
					url: '../searchorder'
				})
			},
			// 进入用户个人主页
			gotoUserHomePage: function(){
				uni.navigateTo({
					url: '../../Mypage/homePage/homePage'
				})
			},
			// 进入作品详情页面
			gotoWorkPage: function(){
				uni.navigateTo({
					url: '../../works/works'
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function(){
				uni.navigateTo({
					url: '../../DynamicPage/dynamicDetails'
				})
			}
		}
	}
</script>

<style>
	@import url("../coser/myorder.css");
</style>
