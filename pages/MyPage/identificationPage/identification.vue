<template>
	<view>
		<table class="tablestyle">
			<tr style="height: 120rpx;">
				<td style="width: 80rpx;"><image class="identypic" :src=identy mode="aspectFill"></image></td>
				<td style="width: 125rpx;vertical-align: top;"><text style="font-size: 10pt;line-height: 100rpx;">实名认证</text></td>
				<td style="width: 220rpx;"><image src="../../../static/icon/扩展.png"style="width: 23rpx;height: 23rpx;margin-bottom: 6rpx;"></image></td>
				<td >
					<navigator url="identificate1" open-type="navigate"><image class="identypic3"src="../../../static/icon/前往认证.png"mode="aspectFill"></image></navigator>
				</td>
			</tr>
			<tr style="height: 120rpx;">
				<td style="width: 80rpx;"><image class="identypic":src=coser_identy mode="aspectFill"></image></td>
				<td style="width: 125rpx;vertical-align: top;"><text style="font-size: 10pt;line-height: 100rpx;">Coser认证</text></td>
				<td><image src="../../../static/icon/扩展.png"style="width: 23rpx;height: 23rpx;margin-bottom: 6rpx;"></image></td>
				<td>
					<navigator url="coserIdenticate" open-type="navigate"><image class="identypic3"src="../../../static/icon/前往认证.png"mode="aspectFill"></image></navigator>
				</td>
			</tr>
			<tr style="height: 120rpx;">
				<td style="width: 80rpx;"><image class="identypic":src=photo_identy mode="aspectFill"></image></td>
				<td style="width: 125rpx;vertical-align: top;"><text style="font-size: 10pt;line-height: 100rpx;">摄影师认证</text></td>
				<td><image src="../../../static/icon/扩展.png"style="width: 23rpx;height: 23rpx;margin-bottom: 6rpx;"></image></td>
				<td>
					<navigator url="photoIdentificate" open-type="navigate"><image class="identypic3"src="../../../static/icon/前往认证.png"mode="aspectFill"></image></navigator>
				</td>
			</tr>
		</table>
	</view>
</template>

<script>
	export default{
		onLoad(){
			uni.hideTabBar(false);
		},
		data(){
			return{
				identy_frag:0,
				coser_identy_frag:0,
				photo_identy_frag:0,
				identy:"../../../static/icon/未实名.png",
				coser_identy:"../../../static/icon/coser未认证.png",
				photo_identy:"../../../static/icon/摄影师未认证.png"
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.tablestyle{
		margin-left: 70rpx;
		margin-top: 100rpx;
		width: 660rpx;
	}
	.identypic{
		width: 80rpx;
		height: 80rpx;
	},
	.identypic3{
		width:140rpx;
		height:40rpx;
	}
</style>
