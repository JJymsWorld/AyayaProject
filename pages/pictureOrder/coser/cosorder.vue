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
						<image :src="item.userb_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
								摄影师：{{item.userb_user_name}}
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
							<button>摄影师拒绝</button>
						</view>
						<view class="" v-if='item.state == 1'>
							<button @click="onCancelOrder(item.photograph_id)">取消订单</button>
							<button @click="onReviseOrderInfo(item.photograph_id, item.content, item.date, item.area, item.money)">修改订单信息</button>
						</view>
						<view class="">
							<button v-if='item.state == 2' class="pinkbutton" @click="onPay(item.photograph_id)">确认支付</button>
							<button v-if='item.state == 3' class="" @click="">已支付</button>
						</view>
						<view class="" v-if='item.state == 4'>
							<button class="pinkbutton" @click="gotoWorkPage(item.list_num)">查看成片</button>
						</view>
						<view class="" v-if='item.state == 5'>
							<button>已取消</button>
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
						<image :src="item.userb_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
								摄影师：{{item.userb_user_name}}
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
						<button @click="onCancelOrder(item.photograph_id)">取消订单</button>
						<button @click="onReviseOrderInfo(item.photograph_id, item.content, item.date, item.area, item.money)">修改订单信息</button>
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
						<image :src="item.userb_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
								摄影师：{{item.userb_user_name}}
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
						<button v-if='item.state == 2' class="pinkbutton" @click="onPay(item.photograph_id)">确认支付</button>
						<button v-if='item.state == 3' class="" @click="onPay">已支付</button>
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
						<image :src="item.userb_header_pic" mode="" @click="gotoUserHomePage(item.user_id)"></image>
						<view class="content-box">
							<view class="" @click="gotoUserHomePage(item.user_id)">
								摄影师：{{item.userb_user_name}}
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
						<button class="pinkbutton" @click="gotoWorkPage(item.list_num)">查看成片</button>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 输入支付密码 -->
		<jpPwd ref="jpPwds" contents="" @completed="completed"></jpPwd>
		<!-- 是否取消订单 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="是否取消该订单" :before-close="true" @close="close"
				@confirm="confirmCancel"></uni-popup-dialog>
		</uni-popup>
		<!-- 加载框 -->
		<kModel ref="kModel" />
	</view>
</template>

<script>
	import ssnavbar from '../../../components/ss-navbar/ss-navbar.vue'
	import jpPwd from '@/components/jp-pwd/jp-pwd.vue';
	import kModel from '@/components/k-model/k-model.vue';
	export default {
		data() {
			return {
				payOrderId: null,		// 确认支付的订单编号
				cancelOrderId: null,	// 取消的订单编号
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
			jpPwd,
			kModel
		},
		methods: {
			// 获取不同状态的订单
			async getOrderByState(s){
				const res = await this.$myRequest({
					url: '/Order/getAllOrderByState1',
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
					url: '/Order/getAllOrderById1',
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
			// 取消订单
			onCancelOrder: function(id){
				this.$refs.popup1.open()
				this.cancelOrderId = id
				// console.log(this.cancelOrderId)
			},
			// 修改订单信息
			onReviseOrderInfo(id, content, date, area, money){
				uni.navigateTo({
					url: '../reviseorderinfo',
					// animationType:'slide-in-right',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('emitReviseOrderInfo', {
							id: id,
							content: content,
							date: date,
							area: area,
							money: money
						})
					}
				})
			},
			// 确认支付
			onPay: function(id){
				this.payOrderId = id
				this.$refs.jpPwds.toOpen()
			},
			// 输入密码完成
			completed: function(e){
				// 密码输入正确
				this.$refs.jpPwds.toCancel()
				this.addState(this.payOrderId)
				this.onGetOrderList()
				// 密码输入错误
				// this.$refs.jpPwds.backs()
			},
			// 显示修改订单信息成功加载框
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '修改订单信息成功',
					duration: 3000
				});
			},
			// 取消对话框
			close: function(done) {
				done()
			},
			// 确认取消订单
			async confirmCancel() {
				console.log(this.cancelOrderId)
				this.$myRequest({
					url: '/Order/setState5',
					data: {
						photograph_id: this.cancelOrderId,
					}
				})
				if(this.currentIndex == 1){
					this.currentIndex --
				}
				this.onGetOrderList()
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
		
		},
		async onShow(){
			// 显示修改订单信息成功
			uni.$on('showReviseSuccess', res => {
				this.startShow()
				// 清除监听
				uni.$off("showOrderMsg");
			})
			this.onGetOrderList()
		}
	}
</script>

<style lang="scss" scoped>
	@import url("myorder.css");
</style>