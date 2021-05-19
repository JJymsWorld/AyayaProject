<template>
	<view>
		<!-- 筛选框:全部、摄影师、coser、普通用户 -->
<!-- 		<ul>
			<li>全部</li>
			<li>摄影师</li>
			<li>coser</li>
			<li>普通用户</li>
		</ul> -->
		<uni-list class="focusBox" :border="false">
	    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
	        <!-- 自定义 body -->
	        <view slot="body" class="focusItemBox">
				<image :src="item.headerPic" mode="aspectFill"@click="homePageNavi(item.accountB)"></image>
				<view class="focusText">
				 <view @click="homePageNavi(item.accountB)">{{item.userName}}</view>
				 <view>{{item.autograph}}</view>
				</view>
				<view class="cancelButton" v-if="isFocus[index]==true" @click="isFocusFunc(isFocus[index],index)"><text>已关注</text></view>
				<view class="cancelButtonNot" v-if="isFocus[index]==false" @click="isFocusFunc(isFocus[index],index)"><text>关注</text></view>
			</view>

	    </uni-list-item>
	</uni-list>
	</view>
	
</template>

<script>
	export default{
		onLoad() {
		  this.loadFocused()
		},
		data(){
			return {
				userId:'5',
				isFocus:[],
				focusPerson:[
					// {
					// 	accountB:'',
					// 	isFocus:'1',
					// 	headerPic:'../../../static/iconn/2.jpg',
					// 	userName:'布兰妮老田田',
					// 	autograph:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	isFocus:'1',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	isFocus:'1',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	isFocus:'1',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// },
					// {
					// 	userid:'',
					// 	isFocus:'1',
					// 	avatar:'../../../static/iconn/2.jpg',
					// 	username:'布兰妮老田田',
					// 	signature:'没有个性签名！！！！'
					// }
				]
			}
		},
	methods:{
		isFocusFunc(i,index){
			//console.log(i)
			if(i == false){
				//this.$data.focusPerson[index].isFocus=1;
				
				this.$data.isFocus[index]=true
				console.log(this.$data.isFocus)
			}
			else{
				//this.$data.focusPerson[index].isFocus=0;
				// console.log(this.$data.focusPerson[index].isFocus)
				// this.deleteFocused(this.userId,this.$data.focusPerson[index].accountB)
				this.$data.isFocus[index]=false
				console.log(this.$data.isFocus)
			}
		},
		async loadFocused(){
			const res=await this.$myRequest({
				url:'/MyPage/HomePage/getFocus',
				data:{
					pageNum:1,
					pageSize:10,
					user_id:1
				}
			})
			// console.log(res.data)
			
			this.focusPerson=res.data.list
			// for (let i = 0;i<this.focusPerson.length; i++){
			// 	this.focusPerson[i]['isFocus']=1
			// }
			for (let i=0;i<this.focusPerson.length;i++){
				this.isFocus.push(true)
			}
			console.log(this.focusPerson)
		},
		async deleteFocused(a,b){
			const res= await this.$myRequest({
				url:'/MyPage/HomePage/delFocusPersonByBothId',
				method:'DELETE',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					account_a:a,
					account_b:b
				}
			})
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
		padding: 0rpx;
		padding-bottom: 0rpx;
		padding-top: 5rpx;
	}
	/deep/ .uni-list-item__container{
		background-color: #FFFFFF;
		padding: 15rpx;
		padding-bottom: 0rpx;
		padding-top: 0rpx;

	}
</style>
<style>
	@import url("focus.css");
</style>
