<template>
	<view>
		<view class="CosumeMakeup-wrapper">
			<view class="top-tab-bar">
				<view class="top-tab-bar-item" v-for="(item,index) in tabs" :key="index" :id="index" @click="tabTap">
					<view class="top-tab-bar-title" :class="tabIndex == index ? 'top-tab-bar-active' :''">{{item}}</view>
				</view>
			</view>
			<view v-if="tabIndex==0" class="Costume-wrapper">
				<view class="CostumeOrMakeup-swiper">
					
				</view>
				<view class="topic-lable">
					
				</view>
				<view class="function-bar">
					
				</view>
				<view class="CostumeOrMakeup-waterfallsflow">
					
				</view>
			</view>
			<view  v-if="tabIndex==1" class="Makeup-wrapper">
				<view class="CostumeOrMakeup-swiper">
					
				</view>
				<view class="topic-lable">
					
				</view>
				<view class="function-bar">
					
				</view>
				<view class="CostumeOrMakeup-waterfallsflow">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:["服饰","妆容"],
				tabIndex:0,
				swiperImgs:[
					{
						img_id:0,
						url:"../../static/swiperImg/3.jpg"
					},
					{
						img_id:1,
						url:"../../static/swiperImg/4.jpg"
					}
				]
			}
		},
		methods: {
			tabTap(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
		}
	}
</script>


<style lang="scss" scoped>
	
</style>
<style>
	@import url("CostumeAndMakeup.css");
	page{
		background-image: url(../../static/backgroundImg/bg3.png);
		background-size: contain;
		background-repeat: no-repeat;
		/* background-color: #F2A3C3; */
	}
</style>
