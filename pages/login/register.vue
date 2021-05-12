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
		<!-- 为自己取一个好听的昵称吧～ -->
		<uni-popup ref="popup3" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="为自己取一个好听的昵称吧～" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 密码不能为空 -->
		<uni-popup ref="popup4" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="密码不能为空" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请再次输入密码 -->
		<uni-popup ref="popup5" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请再次输入密码" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
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
				<text class="getPIN-text" @click="onGetPIN()">获取验证码</text>
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
				<text class="login-text">昵称</text>
				<input @input="onUsernameInput" class="login-input" placeholder="请取一个昵称" />
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
					<label class="radio"><radio class="gender" value="r1" :checked="gender === 1" @click="radio(1)"/>男</label>
					<label class="radio"><radio class="gender" value="r2" :checked="gender === 0" @click="radio(0)"/>女</label>
				</view>
		    </view>
		</view>
		<view class="content">
			<view class="row-box">
				<button class="btn" @click="onRegister">注册</button>
			</view>
		</view>
		<!-- 加载框 -->
		<kModel ref="kModel" />
	</view>
</template>

<script>
	import kModel from '@/components/k-model/k-model.vue';
	export default {
		data() {
			return {
				account:"",
				myPIN:"",
				password1:"",
				password2:"",
				user_name:"",
				gender:1,
				samePW: true
			}
		},
		components:{
			kModel
		},
		methods: {
			// 获取输入的手机号码
			onAccountInput:function(event){
				this.account = event.target.value;
			},
			// 获取验证码
			onGetPIN: function(){
				// 验证手机号码的正确性
				if(this.account.length != 11){
					this.$refs.popup1.open()
				}
			},
			// 输入验证码
			onPINInput:function(event){
				this.myPIN = event.target.value;
			},
			// 获取输入的昵称
			onUsernameInput:function(event){
				this.user_name = event.target.value;
			},
			onPwdInput:function(event){
				this.password1 = event.target.value;
			},
			onPwdInputAgain:function(event){
				this.password2 = event.target.value;
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
			},
			// 注册账号
			onRegister: function(){
				if(this.account.length != 11){
					this.$refs.popup1.open()
				}
				else if(this.myPIN != '123456'){
					this.$refs.popup2.open()
				}
				else if(this.user_name.length == 0){
					this.$refs.popup3.open()
				}
				else if(this.user_name.length == 0){
					this.$refs.popup3.open()
				}
				else if(this.password1.length == 0){
					this.$refs.popup4.open()
				}
				else if(this.password2.length == 0){
					this.$refs.popup5.open()
				}
				// 	判断注册条件
				else if(this.samePW){
					this.$myRequest({
						method: 'POST',
						header:{'content-type':'application/x-www-form-urlencoded'},
						url:'/Login/register',
						data:{
							account: this.account,
							gender: this.gender,
							password: this.password1,
							user_name: this.user_name
						}
					})
					this.startShow()
					setTimeout(() => {
						uni.navigateBack({})
					},1000)
				}
			},
			// 显示账号注册成功加载框
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '账号注册成功',
					duration: 3000
				});
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
