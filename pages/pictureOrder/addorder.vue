<template>
	<view>
		<!-- 请描述您的拍摄要求 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请描述您的拍摄要求" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请选择拍摄时间 -->
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请选择拍摄时间" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请选择拍摄地点 -->
		<uni-popup ref="popup3" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请选择拍摄地点" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
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
			<uni-popup ref="popup" type="dialog">
			    <uni-popup-dialog type="info" mode="base" content="确认提交该约拍订单？" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
			
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
				money: '',
				datetime: '',
				user_a: null, 		// coserID
				user_b: null, 	// 摄影师ID
			}
		},
		onLoad(Option){
			console.log(Option.user_id)
			this.user_b = Option.user_id
			uni.getStorage({
			    key: 'userId',
			    success: res=> {
			        console.log(res.data);
					this.user_a = res.data
			    }
			});
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
			// 提交订单信息
			submitData: function(){
				if(this.demand.length == 0){
					this.$refs.popup1.open()
				}
				else if(this.time == '请选择'){
					this.$refs.popup2.open()
				}
				else if(this.city == '请选择'){
					this.$refs.popup3.open()
				}
				else{
					this.$refs.popup.open()
				}
				
			},
			// 	取消提交订单
			close: function(done){
				console.log('text')
				done()
			},
			// 	确认提交订单
			confirm: function(done){
				this.$myRequest({
					url: '/Order/Data/LaunchOrderPage/addOrder',
					method: 'POST',
					header:{'content-type':'application/x-www-form-urlencoded'},
					data: {
						area: this.city,
						date: this.time,
						content: this.demand,
						money: this.money,
						user_a: this.user_a, // coserID
						user_b: this.user_b, // 摄影师ID
					}
				})
				uni.$emit('showOrderMsg')
				uni.navigateBack({})
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
