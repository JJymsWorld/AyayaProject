<template>
	<view class="box">
		<view class="content">
			<view class="login-title">
				<image class="login-img" src="../../static/login.png" mode="heightFix"></image>
				<text class="app-name">Ayaya</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box phone-box">
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
				<text class="login-text">昵称</text>
				<input @input="onPwdInput" class="login-input" placeholder="请取一个昵称" />
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text">密码</text>
				<input @input="onPwdInput" password="true" class="login-input" placeholder="请输入您的密码" />
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text">确认密码</text>
				<input @input="onPwdInputAgain" password="true" class="login-input" placeholder="请再次输入您的密码" />
			</view>
		</view>
		<view class="content">
			<view class="row-box samePW-box">
				<text class="getPIN-text samePW-text" v-if="!samePW">密码不一致</text>
			</view>
		</view>
		<view class="content">
		    <view class="row-box">
		        <text class="login-text">性别</text>
				<view class="gender-box">
					<label class="radio"><radio class="gender" value="r1" :checked="gender === '1'" @click="radio('1')"/>男</label>
					<label class="radio"><radio class="gender" value="r2" :checked="gender === '2'" @click="radio('2')"/>女</label>
				</view>
		    </view>
		</view>
		<view class="content">
			<view class="row-box">
				<button class="btn" @click="getData">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:"",
				password1:"",
				password2:"",
				gender:'0',
				samePW: true
			}
		},
		methods: {
			getData:function(){
				console.log(this.account);
				console.log(this.password);
				uni.request({
				    url: 'http://192.168.109.1:8086/Login/user', 
				    data: {
				        account:"1812190507"
				    },
				    success: (res) => {
				        console.log(res.data);
				    },
					fail: (error) => {
				        console.log(error);
				    },
				});
			},
			onAccountInput:function(event){
				this.account = event.target.value;
			},
			onPwdInput:function(event){
				this.password1 = event.target.value;
				console.log(this.password1);
			},
			onPwdInputAgain:function(event){
				this.password2 = event.target.value;
				console.log(this.password2);
				if(this.password1 === this.password2){
					this.samePW = true;
				}
				else this.samePW = false;
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
			radio: function(e){
				this.gender = e;
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.row-box{
		padding: 10px 0;
	}
	.login-input{
		padding-left: 15px;
		border-radius: 5px;
		background-color: #F7F7F7;
		width: 68%;
		height: 35px;
		float: right;
		text-align: left;
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
	.phone-box, .getPIN-box, .samePW-box{
		padding: 2px 0;
	}
	.gender-box{
		float: right;
		width: 70%;
		overflow: hidden;
	}
	.radio{
		float: left;
		width: 50%;
		font-size: 13px;
	}
	.gender{
		/* 调整单选框大小 */
		transform: scale(0.7);
	}
	.btn{
		color: #FFFFFF;
		background-color: #F2A3C3;
		font-size: 19px;
		font-weight: 400;
		font-family: 'PingFang SC';
		line-height: 40px;
		width: 70%;
	}
</style>
