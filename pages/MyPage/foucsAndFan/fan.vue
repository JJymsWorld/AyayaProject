<template>
	<view>
		<uni-list class="focusBox" :border="false">
	    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
	        <!-- 自定义 body -->
	        <view slot="body" class="focusItemBox">
				<image :src="item.headerPic" mode="aspectFill" @click="homePageNavi(item.accountB)"></image>
				<view class="focusText">
				   <view @click="homePageNavi(item.accountB)" >{{item.userName}}</view>
				   <view>{{item.autograph}}</view>
				   <view @click="addFocus(userId,item.accountB)"><text>+关注</text></view>
				</view>
				
			</view>

	    </uni-list-item>
	</uni-list>
	</view>
	
</template>

<script>
	export default{
		onLoad() {
			this.loadFan()
		},
		data(){
			return {
				userId:'5',
				focusPerson:[
					// {
					// 	userid:'',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// }
				]
			}
		},
		methods:{
			async loadFan(){
				const res = await this.$myRequest({
					url:'/MyPage/HomePage/getFocused',
					data:{
						pageNum:1,
						pageSize:10,
						user_id:5
					}
				})
				this.focusPerson=res.data.list
				console.log(this.focusPerson)
			},
			async addFocus(a,b){
				const res = await this.$myRequest({
					url:'/MyPage/HomePage/addFocus',
					method:'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						account_a:a,
						account_b:b
					}
				})
				console.log(res.data)
			},
			homePageNavi(i){
				uni.navigateTo({
					url:'../homePage/homePage?userId='+i
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-list-item{
		background-color: #FBFBFB;
		padding: 0;
		padding-bottom: 0rpx;
		padding-top: 5rpx;
	}
	/deep/ .uni-list-item__container{
		background-color: #FFFFFF;
		padding: 0;

	}
</style>


<style>
	@import url("fan.css");
</style>
