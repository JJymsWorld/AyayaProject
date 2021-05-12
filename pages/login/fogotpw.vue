<template>
	<view class="box">
		<!-- 请输入正确的手机号码 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请输入正确的手机号码" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 验证码错误 -->
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="error" mode="base" title="错误" content="请输入正确的验证码" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<view class="content">
			<view class="login-title">
				<image class="login-img" src="../../static/login.png" mode="heightFix"></image>
				<text class="app-name">Ayaya</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text">手机号</text>
				<input type="text" @input="onAccountInput" class="login-input" placeholder="请输入您的手机号码"/>
			</view>
		</view>
		<view class="content">
			<view class="row-box getPIN-box">
				<text class="getPIN-text" @click="onGetPIN">获取验证码</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text">验证码</text>
				<input @input="onPINInput" class="login-input" placeholder="请输入您的手机验证码" />
			</view>
		</view>
		
		<view class="content">
			<view class="row-box">
				<button class="btn" @click="gotoRetrievepw">下一步</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "",
				password: "",
				myPIN: "",
				user_id: 0,
			}
		},
		methods: {
			// 输入账号
			onAccountInput:function(event){
				this.account = event.target.value;
			},
			// 输入验证码
			onPINInput:function(event){
				this.myPIN = event.target.value;
			},
			localStorage: function(e){
				var valid = e.detail.value;
				if(valid[0] == 'rempwd'){
					// 本地存入账号和密码
				}
				else{
					// 仅在本地存入账号
				}
			},
			// 获取验证码
			onGetPIN: function(){
				// 验证手机号码的正确性
				if(this.account.length != 11){
					this.$refs.popup1.open()
				}
			},
			// 下一步修改密码
			async gotoRetrievepw(){
				if(this.account.length != 11){
					this.$refs.popup1.open()
				}
				else if(this.myPIN != '123456'){
					this.$refs.popup2.open()
				}
				else{	// 获取用户id
					const res = await this.$myRequest({
						url: "/Login/getUserIdByPhoneNum",
						data:{
							telephone_num: this.account
						}
					})
					this.user_id = res.data[0].user_id
					uni.navigateTo({
						url: 'retrievepw?user_id=' + this.user_id
					})
				}	
			},
			// 取消对话框
			close: function(done) {
				done()
			},
			// 确定对话框
			confirm: function(){	
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.login-input{
		border-radius: 5px;
		background-color: #F7F7F7;
		width: 80%;
		height: 35px;
		float: right;
		text-align: center;
		font-size: 15px;
	}
	.login-text{
		color: #333333;
		font-size: 15px;
		font-weight: 400;
		font-family: 'PingFang SC';
	}
	.getPIN-text{
		font-size: 13px;
		font-weight: 400;
		font-family: 'PingFang SC';
		color: #F76260;
		float: right;
	}
	.getPIN-box{
		padding: 0;
	}
	.btn{
		color: #FFFFFF;
		background-color: #F2A3C3;
		font-size: 19px;
		font-weight: 400;
	
		font-family: 'PingFang SC';
		line-height: 40px;
	}
</style>
