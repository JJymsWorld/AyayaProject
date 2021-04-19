<template>
	<view>
		<view class="dialog-box">
			<view class="row-box top-box">
				我的订单信息
			</view>
			<view class="row-box">
				拍摄要求：{{cosordermsg.demand}}
			</view>
			<view class="row-box">
				拍摄时间：{{cosordermsg.time}}
			</view>
			<view class="row-box">
				拍摄地点：{{cosordermsg.city}}
			</view>
			<view class="row-box">
				拍摄酬劳：{{cosordermsg.money}}
			</view>
			<view class="row-box">
				订单状态：
				<text>{{cosordermsg.state}}</text>
			</view>
			<view class="row-box">
				<view class="bottom-box">
					<view class="btn1" @click="editOrderMsg">
						修改订单信息
					</view>
					<view class="btn2" @click="onCancleOrder">
						取消订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		props: {
			cosordermsg: {
				type: Object,
				default: function() {
					return {};
				}
			},
			onCancleOrder: {
				type: Function,
				default: function() {
					return function() {}
				}
			},
			editOrderMsg: {
				type: Function,
				default: function() {
					return function() {}
				}
			}
		},
		mounted() {
			console.log(this.cosordermsg)
		}
	}
</script>

<style>
	.dialog-box {
		margin: auto;
		width: 550rpx;
	}
	.row-box {
		font-family: 'PingFang SC';
		font-size: 13px;
		padding: 0 40rpx;
		padding-bottom: 10rpx;
		overflow: visible;
	}
	.row-box text{
		background-color: #F2A3C3;
		border-radius: 10rpx;
		color: #FFFFFF;
		padding: 5rpx 50rpx;
	}
	.top-box {
		font-size: 15px;
		padding-top: 20rpx;
		font-weight: 700;
	}
	.bottom-box{
		width: 80%;
		margin: 0 auto;
	}
	.bottom-box view{
		font-family: 'PingFang SC';
		font-size: 14px;
		color: #AAAAAA;
		float: right;
		margin: 10rpx;
		padding: 0rpx 10rpx;
	}
	.bottom-box .btn1{
		border: 1px solid #585858;
		border-radius: 10rpx;
	}
</style>
