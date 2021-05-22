<template>
	<view class="uni-popup-message" @click="gotoOrderMsgPage">
		<view class="uni-popup-message__box fixforpc-width">
			<!-- 消息框内容 -->
			<view class="message-box">
				<view class="message-item">
					<view class="message-item-lbox">
						<image :src="headerPic" mode="aspectFill"></image>
					</view>
					<view class="message-item-rbox">
						<view class="message-item-rbox-left">
							<view class="">
								<text>{{userName}}</text>
							</view>
							<view class="">
								<text class="text1">[请核对约拍订单信息～]</text>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-消息提示
	 * @description 弹出层-消息提示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} message 消息提示文字
	 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
	 */

	export default {
		name: 'UniPopupOrdermessage',
		props: {
			/**
			 * 消息文字
			 */
			userName: {
				type: String,
				default: ''
			},
			headerPic: {
				type: String,
				default: ''
			},
			/**
			 * 显示时间，设置为 0 则不会自动关闭
			 */
			duration: {
				type: Number,
				default: 3000
			},
			/**
			 * 点击跳转到对应到消息页面
			 */
			gotoOrderMsgPage: {
				type: Function,
				default: function() {
					return function() {}
				}
			}
		},
		inject: ['popup'],
		data() {
			return {}
		},
		created() {
			this.popup.childrenMsg = this
		},
		methods: {
			open() {
				if (this.duration === 0) return
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.popup.close()
				}, this.duration)
			},
			close() {
				clearTimeout(this.popuptimer)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
	}

	.uni-popup-message__box {
		background-color: #FFF2F6;
		padding: 0;
		border-top: #eee solid 1rpx;
		// border-color: #eee;
		// border-style: solid;
		// border-width: 1px;
		flex: 1;
	}

	@media screen and (min-width: 500px) {
		.fixforpc-width {
			margin-top: 20px;
			border-radius: 4px;
			flex: none;
			min-width: 380px;
			/* #ifndef APP-NVUE */
			max-width: 50%;
			/* #endif */
			/* #ifdef APP-NVUE */
			max-width: 500px;
			/* #endif */
		}
	}

	.uni-popup-message-text {
		font-size: 14px;
		padding: 0;
	}

	.message-box{
		width: 90%;
		height: 120rpx;
		margin: 0 auto;
	}
	.message-item{
		margin-bottom: 17px;
		width: 100%;
		height: 100rpx;
	}
	.message-item-lbox{
		float: left;
		width: 15%;
		height: 100rpx;
		padding: 10rpx 0;
	}
	.message-item-lbox image{
		width: 100%;
		height: 100rpx;
		border-radius: 50%;
	}
	.message-item-rbox{
		float: right;
		overflow: hidden;
		width: 80%;
		height: 50px;
		font-size: 14px;
		font-family: 'PingFang SC';
		padding: 5px 0;
	}
	.message-item-rbox-left{
		float: left;
		width: 100%;
		height: 100%;
	}
	.message-item-rbox-left view{
		height: 45%;
		
	}
	.message-item-rbox-left text{
		font-size: 26rpx;
		font-family: 'PingFang SC';
		
	}
	.message-item-rbox-left .text1{
		
		color: #797979;
	}
</style>
