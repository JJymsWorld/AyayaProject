<template>
	<view class="box">
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
				<text class="getPIN-text">获取验证码</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text">验证码</text>
				<input @input="onPwdInput" class="login-input" placeholder="请输入您的手机验证码" />
			</view>
		</view>
		
		<view class="content">
			<view class="row-box">
				<navigator url="./retrievepw">
					<button class="btn" @click="">下一步</button>
				</navigator>	
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:"",
				password:"",
			}
		},
		methods: {
			onAccountInput:function(event){
				this.account = event.target.value;
			},
			onPwdInput:function(event){
				this.password = event.target.value;
			},
			localStorage: function(e){
				var valid = e.detail.value;
				if(valid[0] == 'rempwd'){
					// 本地存入账号和密码
				}
				else{
					// 仅在本地存入账号
				}
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
