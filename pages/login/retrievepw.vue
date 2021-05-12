<template>
	<view class="box">
		<!-- 密码不能为空 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="密码不能为空" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请再次输入密码 -->
		<uni-popup ref="popup2" type="dialog">
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
				<text class="samePW-text" v-if="!samePW">密码不一致</text>
			</view>
		</view>
		<view class="content">
			<view class="row-box">
				<button class="btn" @click="retrievePw">修改密码</button>
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
				user_id: 0,
				account:"",
				password1:"",
				password2:"",
				gender:'0',
				samePW: true
			}
		},
		components:{
			kModel
		},
		methods: {
			onAccountInput:function(event){
				this.account = event.target.value;
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
			radio: function(e){
				this.gender = e;
			},
			// 修改密码
			retrievePw: function(){
				if(this.password1.length == 0){
					this.$refs.popup1.open()
				}
				else if(this.password2.length == 0){
					this.$refs.popup2.open()
				}
				else if(this.samePW){
					this.$myRequest({
						method: 'PUT',
						header:{'content-type':'application/x-www-form-urlencoded'},
						url:'/Login/changePassword',
						data:{
							password: this.password1,
							user_id: this.user_id
						}
					})
					this.startShow()
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						})
					},1000)
					
				}
			},
			// 显示发布成功加载框
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '密码修改成功',
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
		},
		onLoad(option){
			this.user_id = option.user_id
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
	.samePW-text{
		font-size: 14px;
		font-weight: 400;
		font-family: 'PingFang SC';
		color: #F76260;
		float: right;
	}
	.samePW-box{
		padding: 2px 0;
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
