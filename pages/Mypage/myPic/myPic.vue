<template>
	<view>
		<gridBox :picture="pic"></gridBox>
	</view>
	
	
</template>

<script>
	import gridBox from '../../../components/gridImage/gridImage.vue'
	export default{
		components: {
			gridBox
		},
		data(){
			return{
				pic:[
					"../../../static/iconn/p2.jpg",
					"../../../static/iconn/p2.jpg",
					"../../../static/iconn/p2.jpg",
					"../../../static/iconn/p2.jpg"
				]
			}
		}
	}
</script>

<style>
	.box{
		overflow: hidden;
	}
	.gridBox{
		width: 90%;
	}
/* 	.gridImage{
		float: left;
		width: 200rpx;
		height: 200rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	} */
</style>
