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
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
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
							<button class="pinkbutton" @click="onAcceptOrder(item.photograph_id)">接受</button>
							<button @click="onRefuseOrder(item.photograph_id)">拒绝</button>
						</view>
						<view class="">
							<button v-if='item.state == 3' class="pinkbutton" @click="onPostWork(item.photograph_id)">上传成片</button>
							<button v-if='item.state == 2' class="" @click="onPay">已接受</button>
						</view>
						<view class="" v-if='item.state == 4'>
							<button class="pinkbutton" @click="gotoWorkPage(item.list_num)">查看作品</button>
						</view>
						<view class="" v-if='item.state == 5'>
							<button>对方已取消</button>
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
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
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
						<button class="pinkbutton" @click="onAcceptOrder(item.photograph_id)">接受</button>
						<button @click="onRefuseOrder(item.photograph_id)">拒绝</button>
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
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
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
						<button v-if='item.state == 3' class="pinkbutton" @click="onPostWork(item.photograph_id)">上传成片</button>
						<button v-if='item.state == 2' class="" @click="">已接受</button>
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
						<image :src="item.usera_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
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
						<button class="pinkbutton" @click="gotoWorkPage(item.list_num)">查看作品</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 是否拒绝该订单 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="是否拒绝该订单" :before-close="true" @close="close"
				@confirm="confirmRefuse"></uni-popup-dialog>
		</uni-popup>
		<!-- 是否接收该订单 -->
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="是否接受该订单" :before-close="true" @close="close"
				@confirm="confirmAccept"></uni-popup-dialog>
		</uni-popup>
		<!-- 加载框 -->
		<kModel ref="kModel" />
	</view>
</template>

<script>
	import ssnavbar from '../../../components/ss-navbar/ss-navbar.vue'
	import kModel from '@/components/k-model/k-model.vue';
	export default {
		data() {
			return {
				refuseOrderID: null,		// 	拒绝的订单编号
				acceptOrderID: null,		// 	接受的订单编号
				userId: null,	// 用户Id
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
				allOrderList: [],	// 所有约拍订单信息
				orderList1: [],		// state=1的订单
				orderList2: [],		// state=2 3的订单
				orderList3: [],		// state=4的订单
			}
		},
		components: {
			ssnavbar,
			kModel
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
			minusState(pho_id){
				this.$myRequest({
					url: '/Order/minusState',
					data: {
						photograph_id: pho_id,
					}
				})
			},
			// 改变导航栏状态
			async navbarTapHandler(index) {
				this.currentIndex = index;
				this.onGetOrderList()
			},
			// 获取订单列表
			async onGetOrderList() {
				console.log(this.currentIndex)
				if(this.currentIndex == 0){
					this.allOrderList = await this.getAllOrder()	
				    this.allOrderList.reverse()
				}
				else if(this.currentIndex == 1){
					this.orderList1 = await this.getOrderByState(1)		
				    this.orderList1.reverse()
				}
				else if(this.currentIndex == 2){
					this.orderList2 = await this.getOrderByState(2)		
					this.orderList2 = this.orderList2.concat(await this.getOrderByState(3))
					this.orderList2.reverse()
				}
				else if(this.currentIndex == 3){
					this.orderList3 = await this.getOrderByState(4)		
					this.orderList3.reverse()
				}
			},
			gotoMyPage: function(){
				uni.switchTab({
					url:'../../Mypage/mypage'
				})
			},
			// 搜索我的订单
			onSearch: function(){
				// uni.navigateTo({
				// 	url: '../searchorder'
				// })
			},
			// 进入用户个人主页
			gotoUserHomePage: function(id){
				uni.navigateTo({
					url: '../../Mypage/homePage/homePage?userId=' + id
				})
			},
			// 进入作品详情页面
			gotoWorkPage: function(list_num){
				console.log(list_num)
				uni.navigateTo({
					url: '../../works/works?workId=' + list_num
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function(){
				uni.navigateTo({
					url: '../../DynamicPage/dynamicDetails'
				})
			},
			// 拒绝订单
			onRefuseOrder: function(id){
				this.$refs.popup1.open()
				this.refuseOrderID = id
				// console.log(this.cancelOrderId)
			},
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '上传成品成功',
					duration: 3000
				});
			},
			// 取消对话框
			close: function(done) {
				done()
			},
			// 确认取消订单
			async confirmRefuse() {
				this.minusState(this.refuseOrderID)
				if(this.currentIndex == 1){
					this.currentIndex -- 
				}
				this.onGetOrderList()
			},
			// 接受订单
			onAcceptOrder: function(id){
				this.$refs.popup2.open()
				this.acceptOrderID = id
				// console.log(this.cancelOrderId)
			},
			// 确认接受订单
			async confirmAccept() {
				this.addState(this.acceptOrderID)
				if(this.currentIndex == 1){
					this.currentIndex ++ 
				}
				this.onGetOrderList()
			},
			// 上传成品
			onPostWork(id){
				uni.navigateTo({
					url: '../../ContentReleasePage/postWorks',
					// animationType:'slide-in-right',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('emitPictureOrder', {
							id: id,
						})
					}
				})
			}
		},
		async onLoad(){
			uni.getStorage({
				key: 'userId',
				success: res => {
					console.log(res.data);
					this.userId = res.data
				}
			});
			this.onGetOrderList()
		},
		async onShow(){
			// 显示上传成片成功
			uni.$on('showPostSuccess', res => {
				this.addState(res.photograph_id)
				this.startShow()
				// 清除监听
				uni.$off("showOrderMsg");
			})
			if(this.currentIndex == 2){
				this.currentIndex ++
			}
			this.onGetOrderList()
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../coser/myorder.css");
</style>
