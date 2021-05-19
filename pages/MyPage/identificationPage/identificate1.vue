<template>
	<view>
		<table class="tablestyle">
			<tr style="height: 120rpx;">
				<td style="width: 200rpx;"><view class="wordstyle">真实姓名</view></td>
				<td><input :value="realName" placeholder="请输入真实姓名" class="inputstyle" placeholder-style="font-size: 11pt;color: #B4B4B4;"@input="realNameInput($event)"  @confirm="realNameInput($event)"></td>
			</tr>
			<tr>
				<td><view class="wordstyle">身份证件号</view></td>
				<td><input  :value="idCard" placeholder="请输入身份证件号"class="inputstyle" maxlength="18" placeholder-style="font-size: 11pt;color: #B4B4B4;"@input="idCardInput($event)"@confirm="idCardInput($event)"></td>
			</tr>
		</table>
		<view v-if="tag==false" class="idCardCheck">*请输入正确的身份证号</view>
		<view><image src="../../../static/icon/11.png" style="width: 340rpx;height: 80rpx;padding-left: 205rpx;padding-top: 77rpx;" mode="aspectFill" @click="sendInformation"></image></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:'12',
				realName:'',
				idCard:'',
				tag:false
			}
		},
		methods:{
			realNameInput(e){
				this.realName = e.detail.value
			},
			idCardInput(e){
				if(e.detail.value.length == 18){
					this.idCard = e.detail.value
					this.tag = true
				}
				console.log(e.detail.value)
				
			},
			async sendInformation(){
				if (this.tag){
					const res = await this.$myRequest({
						url:'/MyPage/IdentificationPage/realNameApplication',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						data:{
							identity:this.idCard,
							real_name:this.realName,
							user_id:this.userId
						 }
					})
					console.log(res)
				}
			}
		}
	}
</script>

<style>
	.tablestyle{
		margin-left: 94rpx;
		margin-top: 120rpx;
	}
	.inputstyle{
		background-color: #F7F7F7;
		border-radius: 10rpx;
		display: inline-block;
		width: 300rpx;
		height: 70rpx;
		font-size: 11pt;
		color: #B4B4B4;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.wordstyle{
		font-size: 12pt;
		color: #333333;
	}
	.idCardCheck{
		font-size: 20rpx;
		color: #f31322;
		text-align: right;
		padding-right: 70rpx;
	}
</style>
