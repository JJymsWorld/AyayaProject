<template>
	<view>
		<view v-if="focusPerson!=''">
			<uni-list class="focusBox" :border="false">
			    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
			        <!-- 自定义 body -->
			        <view slot="body" class="focusItemBox">
						<image :src="item.headerPic" mode="aspectFill" @click="homePageNavi(item.accountB)"></image>
						<view class="focusText">
						   <view @click="homePageNavi(item.accountB)" >{{item.userName}}</view>
						   <view>{{item.autograph}}</view>
						   <!-- <view @click="addFocus(userId,item.accountB)"><text>+关注</text></view> -->
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
		<view class="noFocus">你还没有粉丝哦！</view>
	</view>
	</view>
	
</template>

<script>
	export default{
		onLoad(option) {
			this.userId = option.userId || '5'
			this.loadFan()
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
				focusPerson:[
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
				this.isFirstPage = true
				const res = await this.$myRequest({
					url:'/MyPage/HomePage/getFocused',
					data:{
						pageNum:this.pageNum,
						pageSize:this.pageSize,
						user_id:this.userId
					}
				})
				this.focusPerson=res.data.list
				for (let i=0;i<this.focusPerson.length;i++){
					//this.isFocus.push(true)
					this.$set(this.focusPerson[i], 'isFocus', false)
				}
				this.isLastPage = res.data.isLastPage
				this.loadMoreStatus = res.data.hasNextPage?'more':'noMore'
				this.hasNextPage = res.data.hasNextPage
				this.hasPreviousPage = res.data.hasPreviousPage
				console.log(this.focusPerson)
			},
			async LoadMore(){
				const that = this
				if(that.loadMoreStatus == 'more'){
					that.pageNum++
					const res=await this.$myRequest({
						url:'/MyPage/HomePage/getFocused',
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
			},
			isFocusFunc(i,index){
				//console.log(i)
				if(i == false){
					//this.$data.focusPerson[index].isFocus=1;
					
					this.focusPerson[index].isFocus=true
					//console.log(this.$data.isFocus)
				}
				else{
					//this.$data.focusPerson[index].isFocus=0;
					// console.log(this.$data.focusPerson[index].isFocus)
					// this.deleteFocused(this.userId,this.$data.focusPerson[index].accountB)
					this.focusPerson[index].isFocus=false
					//console.log(this.$data.isFocus)
				}
			},
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
