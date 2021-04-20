<template name="gridBox">
	<view>
		<view v-if="picture.length!=4&&picture.length!=1" class="box">
		    <view class="gridBox" v-for="(i,k) in picture" :key="k">
			     <image :src="i" class="gridImage" mode="aspectFill" @click="preview(k)"></image>
		    </view>
	    </view>
		<view v-if="picture.length==4 " class="box">
		    <view class="gridBox1" v-for="(i,k) in picture" :key="k">
			     <image :src="i" class="gridImage" mode="aspectFill" @click="preview(k)"></image>
		    </view>
		</view>
		<view v-if="picture.length==1 " class="box">
		    <view v-for="(i,k) in picture" :key="k">
			     <image :src="i" class="gridImage1" mode="aspectFill" @click="preview(k)"></image>
		    </view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "gridBox",
		props:{
			picture:{
				type:Array,
			      default(){
			        return[]
			      }
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			preview:function(i){
				uni.previewImage({
					current:i,
					urls:this.picture
				})
			}
		}
	}
</script>

<style>
	.box{
		overflow: hidden;
	}
	.gridBox{
		width: 100%;
	}
	.gridBox1{
		width: 460rpx;
	}
	.gridImage{
		float: left;
		width: 215rpx;
		height: 215rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
	.gridImage1{
		width: 100%;
		height: 340rpx;
		margin-top: 20rpx;
	}
</style>
