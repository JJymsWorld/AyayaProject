<template>
	<view>
		<view class="StayInCoser-page-wrapper">
			<view class="StayInCoser-topBar">
				<view class="StayInCoser-topBar-left">
					<image src="../../static/CoserlistSource/Coser-infobox-left.png"></image>
					<text>入驻Coser</text>
				</view>
				<view class="StayInCoser-topBar-right">
					<uni-combox inputDisabled="true" placeholder="省份"></uni-combox>
					<uni-combox inputDisabled="true" placeholder="城市"></uni-combox>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				CoserInfoList:[
					{
						Coser_id:1,
						Coser_name:"Coser1",
						Coser_avatar:"../../static/CoserlistSource/userheadimg1.jpg",
						Coser_intro:"底层泥坑里滚爬的一只小可爱",
						Coser_city:"杭州市",
						Coser_likeNum:2568,
						Coser_work1:"../../static/contentImg/2.jpg",
						Coser_work2:"../../static/contentImg/3.jpg",
						Coser_work3:"../../static/contentImg/4.jpg"
					}
				]
			}
		}
	}
</script>

<style>
	
</style>
