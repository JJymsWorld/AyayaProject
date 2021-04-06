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
				<view class="bottom-box">
					<button class="btn1" @click="acceptOrder">接受</button>				
					<button class="btn2" @click="refuseOrder">拒绝</button>
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
			acceptOrder: {
				type: Function,
				default: function() {
					return function() {}
				}
			},
			refuseOrder: {
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
	.bottom-box button{
		font-family: 'PingFang SC';
		font-size: 14px;
		line-height: 14px;
		color: #AAAAAA;
		margin: 10rpx;
		padding: 10rpx 50rpx;
		color: #FFFFFF;
		font-weight: 700;
	}
	.bottom-box .btn1{
		background-color: #32C8FF;
		float: left;
	}
	.bottom-box .btn2{
		background-color: #D7D7D7;
		float: right;
	}
</style>
