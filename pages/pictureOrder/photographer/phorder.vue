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
			<uni-list :border="false">
				<uni-list-item :border="false" clickable v-for='(item, index) in allOrderList' :key='index' direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.photograph_id}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
							{{item.money}}
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-body-box">
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage()"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage()">
								Coser：{{item.usera_user_name}}
							</view>
							<view class="">
								拍摄时间：{{item.date}}
							</view>
							<view class="">
								拍摄地点：{{item.area}}
							</view>
						</view>
					</view>
					<!-- 自定义 footer-->
					<view slot="footer" class="slot-footer-box">
						<view class="" v-if='item.state == 0'>
							<button>已拒绝</button>
						</view>
						<view class="" v-if='item.state == 1'>
							<button class="pinkbutton">接受</button>
							<button>拒绝</button>
						</view>
						<view class="">
							<button v-if='item.state == 3' class="pinkbutton" @click="onPay">上传成片</button>
							<button v-if='item.state == 2' class="" @click="onPay">已接受</button>
						</view>
						<view class="" v-if='item.state == 4'>
							<button class="pinkbutton" @click="gotoWorkPage()">查看作品</button>
						</view>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 待处理 -->
		<view class="" v-if='currentIndex == 1'>
			<uni-list :border="false">
				<uni-list-item :border="false" clickable v-for='(item, index) in orderList1' :key='index' direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.photograph_id}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
							{{item.money}}
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-body-box">
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage()"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage()">
								Coser：{{item.usera_user_name}}
							</view>
							<view class="">
								拍摄时间：{{item.date}}
							</view>
							<view class="">
								拍摄地点：{{item.area}}
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
			<uni-list :border="false">
				<uni-list-item :border="false" clickable v-for='(item, index) in orderList2' :key='index' direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.photograph_id}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
							{{item.money}}
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-body-box">
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage()"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage()">
								Coser：{{item.usera_user_name}}
							</view>
							<view class="">
								拍摄时间：{{item.date}}
							</view>
							<view class="">
								拍摄地点：{{item.area}}
							</view>
						</view>
					</view>
					<!-- 自定义 footer-->
					<view slot="footer" class="slot-footer-box">
						<button v-if='item.state == 3' class="pinkbutton" @click="onPay">上传成片</button>
						<button v-if='item.state == 2' class="" @click="onPay">已接受</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 已完成 -->
		<view class="" v-if='currentIndex == 3'>
			<uni-list :border="false">
				<uni-list-item :border="false" clickable v-for='(item, index) in orderList3' :key='index' direction="column">
					<!-- 自定义 header -->
					<view slot="header" class="slot-header-box">
						订单编号: {{item.photograph_id}}
						<view class="money-box">
							<image src="../../../static/money.png" mode=""></image>
							{{item.money}}
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-body-box">
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage()"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage()">
								Coser：{{item.usera_user_name}}
							</view>
							<view class="">
								拍摄时间：{{item.date}}
							</view>
							<view class="">
								拍摄地点：{{item.area}}
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
				userId: 1,	// 用户Id
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
					state: 2,
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
				}],
				allOrderList: [],	// 所有约拍订单信息
				orderList1: [],		// state=1的订单
				orderList2: [],		// state=2 3的订单
				orderList3: [],		// state=4的订单
			}
		},
		components: {
			ssnavbar
		},
		methods: {
			// 获取不同状态的订单
			async getOrderByState(s){
				const res = await this.$myRequest({
					url: '/Order/getAllOrderByState2',
					data: {
						user_id: this.userId,
						state: s
					}
				})
				return (res.data)
			},
			// 获取所有的订单
			async getAllOrder(){
				const res = await this.$myRequest({
					url: '/Order/getAllOrderById2',
					data: {
						user_id: this.userId,
					}
				})
				return (res.data)
			},
			// state状态加1
			addState(pho_id){
				this.$myRequest({
					url: '/Order/addState',
					data: {
						photograph_id: pho_id,
					}
				})
			},
			// state状态减1
			subState(pho_id){
				this.$myRequest({
					url: '/Order/subState',
					data: {
						photograph_id: pho_id,
					}
				})
			},
			// 改变导航栏状态
			async navbarTapHandler(index) {
				this.currentIndex = index;
				if(index == 1){
					this.orderList1 = await this.getOrderByState(1)					
				}
				if(index == 2){
					this.orderList2 = await this.getOrderByState(2)		
					this.orderList2 = this.orderList2.concat(await this.getOrderByState(3))
				}
				if(index == 3){
					this.orderList3 = await this.getOrderByState(4)					
				}
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
		},
		async onLoad(){
			// uni.getStorage({
			// 	key: 'userId',
			// 	success: res => {
			// 		console.log(res.data);
			// 		this.userId = res.data
			// 	}
			// });
			const res = await this.getAllOrder()
			this.allOrderList = res
			console.log(res)
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../coser/myorder.css");
</style>
