<template>
	<view>
		<!-- 是否取消订单 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="是否取消该订单" :before-close="true" @close="close"
				@confirm="confirmCancel"></uni-popup-dialog>
		</uni-popup>
		<!-- 顶部加载提示框 -->
		<view class="tips color_fff size_12 align_c" :class="{ 'show':ajax.loading }" @tap="getHistoryMsg">
			{{ajax.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${index}`">
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image @click="gotoUserHomePage(item.type)" :src="userPic[item.type]" mode="aspectFill"
							class="pic"></image>
						<!-- 普通消息 -->
						<view class="content" v-if='item.photograph_id == 0'>{{item.content}}</view>
						<!-- 订单消息 -->
						<view class="content" v-if='item.photograph_id != 0'>
							<view>
								<view class="dialog-box">
									<view class="row-box top-box">
										我的订单信息
									</view>
									<view class="row-box">
										拍摄要求：{{item.content}}
									</view>
									<view class="row-box">
										拍摄时间：{{item.date}}
									</view>
									<view class="row-box">
										拍摄地点：{{item.area}}
									</view>
									<view class="row-box">
										拍摄酬劳：{{item.money}}
									</view>
									<view class="row-box">
										订单状态：
										<text v-if='item.state == 0'>对方已拒绝</text>
										<text v-if='item.state == 1'>待处理</text>
										<text v-if='item.state == 2 || item.state == 3'>进行中</text>
										<text v-if='item.state == 4'>已完成</text>
										<text v-if='item.state == 5'>已取消</text>
									</view>
									<view class="row-box" v-if='item.state == 1'>
										<view class="bottom-box">
											<view class="btn1" @click="editOrderMsg(item.photograph_id, item.content, item.date, item.area, item.money)">
												修改订单信息
											</view>
											<view class="btn2" @click="onCancleOrder(item.photograph_id)">
												取消订单
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部发送框 -->
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容"
						placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import cosordermsg from './cos-dialog-ordermsg.vue'
	import phordermsg from './pho-dialog-ordermsg.vue'
	export default {
		data() {
			return {
				cancelOrderId: null, 	// 取消的订单编号
				ifload: false,	// 刷新时使用
				timer: null, // 设置计时器
				other_userId: null, // 对方Id
				userId: null, // 登录者Id
				dialog_id: null, // 对话框Id
				userPic: [], // 接收方的头像，发送方头像
				talkList: [],
				ajax: {
					rows: 20, //每页数量
					page: 1, //页码
					flag: true, // 请求开关
					loading: true, // 加载中
					loadText: '正在获取消息'
				},
				content: '',
			}
		},
		components: {
			cosordermsg,
			phordermsg
		},
		mounted() {
			this.$nextTick(() => {
				this.getHistoryMsg();
			});
			// console.log(this.talkList)
			
		},
		onHide(){
			this.onSetZero()
			clearInterval(this.timer)
		},
		onPageScroll(e) {
			// if(e.scrollTop<5){
			// 	this.getHistoryMsg();
			// }
		},
		methods: {
			// 设置未读消息数为0
			onSetZero(){
				this.$myRequest({
					url: '/Contact/setZero',
					data: {
						dialog_id: this.dialog_id,
						user_id: this.userId
					}
				})
			},
			// 进入用户个人主页
			gotoUserHomePage: function(type) {
				var userId = 0
				if (type == 1) userId = this.userId
				else userId = this.other_userId
				console.log(userId)
				uni.navigateTo({
					url: '../Mypage/homePage/homePage?userId=' + userId
				})
			},
			// 修改订单信息
			editOrderMsg(id, content, date, area, money) {
				// console.log('edit')
				// 编辑框
				uni.navigateTo({
					url: '../pictureOrder/reviseorderinfo',
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
			// 取消订单
			onCancleOrder(id) {
				// console.log('cancel')
				this.cancelOrderId = id
				this.$refs.popup1.open()
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
			},
			// 获取订单详情
			async onGetOrderMsg(id) {
				const res = await this.$myRequest({
					url: '/getOrderById',
					data: {
						photograph_id: id
					}
				})
				return res.data[0]
			},
			// 获取历史消息
			getHistoryMsg() {
				if (!this.ajax.flag) {
					return; //
				}

				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async () => {
					this.hideLoadTips();
					this.ajax.flag = false;
					let data = await this.joinHistoryMsg();

					// console.log('----- 模拟数据格式，供参考 -----');
					// console.log(data); // 查看请求返回的数据结构 

					// // 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
					// let selector = '';

					// if(this.ajax.page>1){
					// 	// 非第一页，则取历史消息数据的第一条信息元素
					// 	selector = `#msg-${this.talkList[0].id}`;
					// }else{
					// 	// 第一页，则取当前消息数据的最后一条信息元素
					// 	selector = `#msg-${data[data.length-1].id}`;
					// }

					let selector = `#msg-${data.length-1}`;

					// 将获取到的消息数据合并到消息数组中
					// this.talkList = [...data, ...this.talkList];
					this.talkList = data;
					// console.log(this.talkList)
					
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(() => {
						// 设置当前滚动的位置
						this.setPageScrollTo(selector);

						// 设置顶部加载项
						this.hideLoadTips(true);

						// if (data.length < this.ajax.rows) {
						// 	// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
						// 	// 可在此处编写无更多消息数据时的逻辑
						// } else {
						// 	this.ajax.page++;

						// 	// 延迟 200ms ，以保证设置窗口滚动已完成
						// 	setTimeout(() => {
						// 		this.ajax.flag = true;
						// 	}, 200)
						// }
						this.ajax.flag = true;
					})
				}
				get();
			},
			// 拼接历史记录消息，正式项目可替换为请求历史记录接口
			joinHistoryMsg() {
				let join = async () => {
					let arr = [];

					//通过当前页码及页数，模拟数据内容
					let startIndex = (this.ajax.page - 1) * this.ajax.rows;
					let endIndex = startIndex + this.ajax.rows;


					// 获取历史记录
					const res = await this.$myRequest({
						url: '/Contact/getDialogHistoryById',
						data: {
							dialog_id: this.dialog_id,
							user_id: this.userId
						}
					})
					console.log(res.data)
					arr = res.data

					for (var item in arr) {
						if (arr[item].photograph_id) {
							const type = arr[item].type
							const res = await this.onGetOrderMsg(arr[item].photograph_id)
							arr[item] = res
							arr[item].type = type
						}
					}

					// // 新增模拟消息记录
					// let i = 0;
					// for(let i = startIndex; i < endIndex; i++){
					// 	arr.push({
					// 		"id":i,	// 消息的ID
					// 		"content":`这是历史记录的第${i+1}条消息`,	// 消息内容
					// 		"type":Math.random() > 0.5 ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
					// 		"photograph_id": 0		// photograph_id为0表示普通消息类型
					// 	})
					// }

					/*
						颠倒数组中元素的顺序。将最新的数据排在本次接口返回数据的最后面。
						后端接口按 消息的时间降序查找出当前页的数据后，再将本页数据按消息时间降序排序返回。
						这是数据的重点，因为页面滚动条和上拉加载历史的问题。
					 */
					// arr.reverse();
					// this.ajax.flag = false;
					return arr;
				}

				// 此处用到 ES6 的 Promise 知识，不懂的请自行学习。
				return new Promise((done, fail) => {
					// 无数据请求接口，由 setTimeout 模拟，正式项目替换为 ajax 即可。
					setTimeout(() => {
						let data = join();
						done(data);
					}, 500);
				})
			},
			// 设置页面滚动位置
			setPageScrollTo(selector) {
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
						scrollTop: res.top, // -30 为多显示出大半个消息的高度，示意上面还有信息。
						duration: 0
					});
				}).exec();
			},
			// 隐藏加载提示
			hideLoadTips(flag) {
				// 刷新时不显示顶部加载框
				if(this.ifload){
					this.ajax.loading = false;
					return;
				} 
				if (flag) {
					this.ajax.loadText = '消息获取成功';
					setTimeout(() => {
						this.ajax.loading = false;
					}, 300);
				} else {
					this.ajax.loading = true;
					this.ajax.loadText = '正在获取消息';
				}
			},
			// 发送信息
			send() {
				if (!this.content) {
					uni.showToast({
						title: '请输入有效的内容',
						icon: 'none'
					})
					return;
				}

				uni.showLoading({
					title: '正在发送'
				})
				setTimeout(() => {
					uni.hideLoading();

					// 将当前发送信息 添加到消息列表。
					let data = {
						"id": new Date().getTime(),
						"content": this.content,
						"type": 1, // 0为接收的消息，1为发送的消息
						"photograph_id": 0 // photograph_id为0表示普通消息类型

					}
					this.talkList.push(data);

					// 新增一条普通消息
					this.$myRequest({
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						url: '/Contact/addMessage',
						data: {
							content: this.content,
							dialog_id: this.dialog_id,
							user_id: this.userId
						}
					})

					this.$nextTick(() => {
						// 清空内容框中的内容
						this.content = '';
						uni.pageScrollTo({
							scrollTop: 999999, // 设置一个超大值，以保证滚动条滚动到底部
							duration: 0
						});
					})
				}, 1500);
			}
		},
		onShow() {
			this.onSetZero()
			// 刷新数据
			const that = this
			that.ifload = true;
			that.timer = setInterval(() => {
				that.getHistoryMsg();
			}, 1000);
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					console.log(res.data);
					this.userPic[1] = res.data.header_pic
				}
			});

			uni.getStorage({
				key: 'userId',
				success: res => {
					this.userId = res.data
				}
			});

			const that = this
			const eventChannel = that.getOpenerEventChannel()
			// 监听emitDialogMsg事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('emitDialogMsg', function(data) {
				console.log(data)
				that.dialog_id = data.dialog_id
				that.userPic[0] = data.header_pic,
				that.other_userId = data.user_id
			})
			// 获取历史记录

		}
	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";
	@import "./dialog.css";
	page {
		background-color: #F3F3F3;
		font-size: 28rpx;
	}

	/* 加载数据提示 */
	.tips {
		position: fixed;
		left: 0;
		top: var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0, 0, 0, 0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform: translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;

		&.show {
			transform: translateY(0);
		}
	}

	.box-1 {
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;

		/* 兼容iPhoneX */
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
	}

	.box-2 {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;

		/* 兼容iPhoneX */
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		>view {
			padding: 0 20rpx;
			height: 100rpx;
		}

		.content {
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}

		.send {
			background-color: rgba(242, 163, 195, 0.7);
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;

			&:active {
				background-color: rgba(242, 163, 195, 0.7);
			}
		}
	}

	.talk-list {
		padding-bottom: 20rpx;

		/* 消息项，基础类 */
		.item {
			padding: 20rpx 20rpx 0 20rpx;
			align-items: flex-start;
			align-content: flex-start;
			color: #333;

			.pic {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}

			.content {
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}

			/* 收到的消息 */
			&.pull {
				.content {
					margin-left: 32rpx;
					background-color: #fff;

					&::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}

			/* 发出的消息 */
			&.push {
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;

				.content {
					margin-right: 32rpx;
					background-color: rgba(242, 163, 195, 0.2);

					&::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid rgba(242, 163, 195, 0.2);
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>
