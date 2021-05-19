<template>
	<view>
		<view v-if="focusPerson!=''">
			<uni-list class="focusBox" :border="false">
			    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
			        <!-- 自定义 body -->
			        <view slot="body" class="focusItemBox">
						<image :src="item.headerPic" mode="aspectFill"@click="homePageNavi(item.accountB)"></image>
						<view class="focusText">
						 <view @click="homePageNavi(item.accountB)">{{item.userName}}</view>
						 <view>{{item.autograph}}</view>
						</view>
						<view class="cancelButton" v-if="item.isFocus==true" @click="isFocusFunc(item.isFocus,index)"><text>已关注</text></view>
						<view class="cancelButtonNot" v-if="item.isFocus==false" @click="isFocusFunc(item.isFocus,index)"><text>关注</text></view>
					</view>
			    </uni-list-item>
			</uni-list>
			<uni-load-more :status="loadMoreStatus" @clickLoadMore="LoadMore($event)"></uni-load-more>
		</view>

		<view v-if="focusPerson==''">
			<view class="noIcon"><span class="iconfont_dy">&#xe73b;</span></view>
			<view class="noFocus">你还没有关注的人哦！</view>
		</view>
	
	</view>
	
</template>

<script>
	export default{
		onLoad(option) {
		  this.userId = option.userId || '1'
		  this.loadFocused()
		},
		data(){
			return {
				pageNum:1,
				pageSize:10,
				prePage:0,
				hasNextPage:true,
				hasPreviousPage:false,
				isFirstPage:true,
				isLastPage:false,
				isNoMore:true,
				loadMoreStatus:'more',
				
				
				userId:'5',
				isFocus:[],
				focusPerson:[
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
			if(i == false){
				this.focusPerson[index].isFocus=true
			}
			else{
				this.focusPerson[index].isFocus=false
			}
		},
		async loadFocused(){
			this.isFirstPage = true
			const res=await this.$myRequest({
				url:'/MyPage/HomePage/getFocus',
				data:{
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					user_id:this.userId
				}
			})
			console.log(res.data)
			this.focusPerson=res.data.list
			for (let i=0;i<this.focusPerson.length;i++){
				this.$set(this.focusPerson[i], 'isFocus', true)
			}
			this.isLastPage = res.data.isLastPage
			this.loadMoreStatus = res.data.hasNextPage?'more':'noMore'
			this.hasNextPage = res.data.hasNextPage
			this.hasPreviousPage = res.data.hasPreviousPage
			//console.log(this.focusPerson)
		},
		async LoadMore(){
			const that = this
			if(that.loadMoreStatus == 'more'){
				that.pageNum++
				const res=await this.$myRequest({
					url:'/MyPage/HomePage/getFocus',
					data:{
						pageNum:that.pageNum,
						pageSize:that.pageSize,
						user_id:that.userId
					}
				})
				var t=res.data.list
				for (let i=0;i<t.length;i++){
					this.$set(t[i], 'isFocus', true)
				}
				this.focusPerson = this.focusPerson.concat(t)
				that.isLastPage = res.data.isLastPage
				that.loadMoreStatus = res.data.hasNextPage?'more':'noMore'
				that.hasNextPage = res.data.hasNextPage
				that.hasPreviousPage = res.data.hasPreviousPage
			}
			
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
