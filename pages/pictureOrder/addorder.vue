<template>
	<view>
		<view class="row-box demand-box">
			<text>要求描述</text>
			<view class="textarea-box">
				<textarea placeholder="描述拍摄要求，如拍摄照片的主题、风格等"></textarea>
			</view>
		</view>
		<view class="row-box picker-box">
			<view class="picker-box-content">
				拍摄时间
				<view class="picker-item">
					<picker mode="date" :value="mydata" @change='onChangeData'>
						<view>{{mydata}}</view>
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
					<picker mode="date" :value="mydata" @change='onChangeData'>
						<view>{{mydata}}</view>
					</picker>
					<view class="picker-icon">
						<image src="../../static/picker-icon.png" mode="heightFix"></image>
					</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mydata:'请选择'
			}
		},
		methods: {
			onChangeData: function(e){
				this.mydata = e.detail.value
			}
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	@import url("../../static/css/mycss.css");
	.row-box{
		width: 90%;
	}
</style>
