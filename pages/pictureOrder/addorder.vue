<template>
	<view>
		<view class="row-box demand-box">
			<text>要求描述</text>
			<view class="textarea-box">
				<textarea placeholder="描述拍摄要求，如拍摄照片的主题、风格等" @input='onGetDemand'></textarea>
			</view>
		</view>
		<view class="row-box picker-box">
			<view class="picker-box-content">
				拍摄时间
				<view class="picker-item">
					<picker mode="date" :value="time" @change='onChangeTime'>
						<view>{{time}}</view>
					</picker>
					<view class="picker-icon">
						<image src="../../static/picker-icon.png" mode="heightFix"></image>
					</view>
				</view>	
			</view>
		</view>
		<view class="row-box picker-box">
			<view class="picker-box-content">
				拍摄地点
				<view class="picker-item">
					<pickerAddress @change="onChangeCity">
						<view>{{city}}</view>
					</pickerAddress>
					<view class="picker-icon">
						<image src="../../static/picker-icon.png" mode="heightFix"></image>
					</view>
				</view>	
			</view>
		</view>
		<view class="row-box" style="padding: 0;">
			<view class="money-box">
				拍摄酬劳:
			</view>
		</view>
		<view class="row-box picker-box">
			<input type="text" @input='onGetMoney' value="" placeholder="可待定，与对方协商后再修改" placeholder-style="font-size: 14px; font-weight: 400;"/>
		</view>
		<view class="row-box bottom-box">
			<button @click="submitData">提交</button>
		</view>
	</view>
</template>

<script>
	import pickerAddress from '../../components/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		data() {
			return {
				demand: '',
				time: '请选择',
				city: '请选择',
				money: ''
			}
		},
		methods: {
			// 输入要求描述
			onGetDemand: function(e){
				this.demand = e.detail.value
				console.log(this.demand)
			},
			// 修改拍摄时间
			onChangeTime: function(e){
				this.time = e.detail.value
				console.log(this.time)
			},
			//修改拍摄地点
			onChangeCity: function(data){
				this.city = data.data.join('-')
				console.log(this.city)
			},
			//输入拍摄报酬
			onGetMoney: function(e){
				this.money = e.detail.value
				console.log(this.money)
			},
			//提交订单信息
			submitData: function(){
<<<<<<< HEAD
<<<<<<< HEAD
				this.$myRequest({
					url: '/Data/LaunchOrderPage/addOrder',
					method: 'POST',
					header:{'content-type':'application/x-www-form-urlencoded'},
					data: {
						area: this.city,
						date: this.time,
						content: this.demand,
						money: this.money,
						user_a: 4, // coserID
						user_b: 1, // 摄影师ID
					}
				})
=======
				
>>>>>>> d8453de1c67b4845791327ecbb57d726a1bba948
=======
				
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			}
		},
		components:{
			pickerAddress
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	@import url("addorder.css");
</style>
