<template>
	<view class="backBox">
		<image src="../../../static/icon/newlist.png" class="pic" mode="aspectFill"@click="open"></image>
		<view v-for="(item,index) in list" :key="index" class="collectBox" @click="starListDetailNavi(item.favour_id)">
			<image :src="pic" class="collectBoxImage"></image>
			<view class="textBox">
				<view class="title">{{item.tab}}</view>
				<view class="number">{{item.collectNum}}收藏</view>
				<span class="iconfont_dy">&#xe604;</span>
			</view>
		</view>
		
		<!-- 新建收藏夹 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="input" placeholder="请输入收藏夹名" title="新建收藏夹"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
		<!-- 新建收藏夹 end-->
		
	</view>
</template>

<script>
	export default{
		onLoad(option) {
			this.userId=getApp().globalData.global_userId || '12'
			this.getAll()
			console.log("list:"+option.myWish)
			this.mywish = option.myWish || 0
			this.wishId = option.wishId || ''
			this.addmakeuplabels = option.addmakeuplabels || 0
		},
		data(){
			return{
				userId:'',
				addmakeuplabels: 0,  //1:存在发布作品的的参数传递
				mywish:0,   //1:存在加入戏院的的参数传递
				wishId:'',  //用户将作品加入心愿单中妆容板块的参数传递
				pic:'../../../static/icon/collectPic.png',
				list:[  
					
				],
				newList:{
					tab:'',
					collectNum:''
				}
			}
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			confirm(value){
				this.newList.tab = value
				this.newList.collectNum = '0'
				console.log(this.newList)
				this.list.push(this.newList)
				this.$refs.popup.close()
			},
			// 获取收藏夹列表
			loadList(i){
				uni.request({
					url:'/api/MyPage/MyStarList/getAllList',
					data:{
						user_id:this.userId
					},
					success:(res) => {
						  // console.log(res);
						  
						  console.log(res)
						  this.list=res.data
						  console.log(this.$data.list)
					}
				})
				console.log('------------------------------')
				console.log(this.userId)
				
			},
			async getAll (){
				const res = await this.$myRequest({
					url:'/MyPage/MyStarList/getAllList',
					data:{
						user_id: this.userId
					}
				})
				this.list=res.data
				console.log(res.data)
				// console.log(res)
			},
			starListDetailNavi(i){
			    console.log(i)
			    uni.navigateTo({
			     url:'myStarListDetail?favourId='+i+'&myWish='+this.mywish+'&wishId'+this.wishId+'&addmakeuplabels='+this.addmakeuplabels
			    })
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.backBox{
		margin: 20rpx auto;
		margin-left: 20rpx;
		margin-right: auto;
		overflow: hidden;
	}
	view{
		display: inline-block;
	}
	.pic{
		float: left;
		width: 321rpx;
		height: 321rpx;
		border-radius: 18rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
	}
	.collectBox{
		float: left;
		width: 321rpx;
		height: 321rpx;

		border-radius: 18rpx;
		background-color: #FFFFFF;
		margin-left: 20rpx;
		margin-top: 20rpx;
		box-shadow:4px 4px 10px 10px rgba(221, 221, 221, 0.1);
	}
	.collectBoxImage{
		width: 250rpx;
		height: 230rpx;
		margin-left: 35rpx;
		margin-top: 35rpx;
	}
	
	.textBox{
		position: relative;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 56rpx;
	}
	.title{
		position: absolute;
		top: 0;
		left: 35rpx;
		font-size: 28rpx;
	}
	.number{
		position: absolute;
		top: 5rpx;
		right: 45rpx;
		font-size: 20rpx;
	}
	.textBox span{
		position: absolute;
		top: 7rpx;
		right: 10rpx;
		font-size: 28rpx;
		opacity: 1;
	}
</style>
