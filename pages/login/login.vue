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
				<text class="login-text">账号</text>
				<input type="text" @input="onAccountInput" class="login-input" :value="account"/>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text" :value='password'>密码</text>
				<view class="login-input">
					<input :password="showPassword" @input="onPwdInput" class="login-input pwd-input"/>
					<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<checkbox-group @change="localStorage" class="rempwd">
					<label>
						<checkbox class="rempwd-check" value="rempwd"/><text class="login-text login-text1">记住密码</text>
					</label>
				</checkbox-group>
				<text class="login-text login-text2" @click="gotoFogotpw">忘记密码?</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box btn-box">
				<button class="btn" @click="getData">登录</button>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<text class="login-text login-text2" @click="gotoRegister">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:"",	//	测试账号13757269040
				password:"",
				userId: 0,
				realPW:"",
				showPassword: true,
				ifremPwd: false
			}
		},
		methods: {
			async getData(){
				console.log(this.account)
				console.log(this.password)
				const res = await this.$myRequest({
					url:'/Login/login',
					data:{
						account: this.account
					}
				})
				// 获取密码和用户ID
				this.realPW = res.data[0].password
				this.userId = res.data[0].user_id
				console.log(this.userId)
				console.log(this.realPW)
				console.log(this.password)
				// 判断账号不存在
				if(this.userId == 0){
					console.log('账号不存在')
				}
				// 账号密码正确跳转
				else if(this.password === this.realPW){
					// 本地存入密码
					if(this.ifremPwd){
						// 本地存入密码
						uni.setStorage({
						    key: 'userPassWord',
						    data: this.realPW,
						    success: function () {
						        console.log('success');
						    }
						});
					}
					//清空原本地密码中的内容
					else{
						uni.setStorage({
						    key: 'userPassWord',
						    data: '',
						    success: function () {
						        console.log('success');
						    }
						});
					}
					// 本地存入账号
					uni.setStorage({
					    key: 'userId',
					    data: this.account,
					    success: function () {
					        console.log('success');
					    }
					});
					//将用户ID存入全局变量
					getApp().globalData.global_userId = this.userId
					uni.switchTab({
						url:"../Mypage/mypage"
					})
				}
				// 判断密码错误
				else
					console.log('密码错误')
			},
			onAccountInput:function(event){
				this.account = event.target.value;
				console.log(this.account)
			},
			onPwdInput:function(event){
				this.password = event.target.value;
			},
			changePassword: function(){
			    this.showPassword = !this.showPassword;
			},
			localStorage: function(e){
				var valid = e.detail.value;
				console.log(valid)
				if(valid[0] == 'rempwd'){
					// 本地存入账号和密码
					this.ifremPwd = true
				}
				else{
					// 仅在本地存入账号
					this.ifremPwd = false
				}
			},
			gotoRegister: function(){
				uni.navigateTo({
					url:'./register'
				})
			},
			gotoFogotpw: function(){
				uni.navigateTo({
					url:'./fogotpw'
				})
			}
		},
		onLoad(){
			uni.getStorage({
			    key: 'userId',
			    success: res=> {
			        console.log(res.data);
					this.account = res.data
			    }
			});
			uni.getStorage({
			    key: 'userPassWord',
			    success: res=> {
			        console.log(res.data);
					this.password = res.data
			    }
			});
			console.log(getApp().globalData.global_userId)
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.login-input{
		border-bottom: 2px solid #AAAAAA;
		width: 80%;
		float: right;
		text-align: center;
		font-size: 18px;
	}
	.pwd-input{
		border: none;
		float: left;
	}
	.login-text{
		color: #797979;
		font-size: 18px;
		font-weight: 400;
		font-family: 'PingFang SC';
	}
	.login-text1{
		padding-right: 0;
		font-size: 16px;
	}
	.login-text2{
		padding-right: 0;
		float: right;
		font-size: 16px;
	}
	.uni-icon {
	    font-family: uniicons;
	    font-size: 20px;
	    font-weight: normal;
	    font-style: normal;
	    width: 20px;
	    height: 20px;
	    line-height: 20px;
	    color: #999999;
		float: right;
	}
	.uni-eye-active {
	    color: #F2A3C3;
	}
	.rempwd{
		float: left;
		width: 50%;
	}
	.rempwd-check{
		float: left;
	}
	.btn-box{
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
