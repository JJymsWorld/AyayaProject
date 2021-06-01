<template>
	<view>
		<view class="cancelButton"@click="addWish"><text>加入</text></view>
		<view v-if="focusPerson == '' " class="nothingBox">
			<view class="noIcon"><span class="iconfont_dy">&#xe73b;</span></view>
			<view class="nothingBoxFirst">你还没有关注的摄影师哦！</view>
			<view class="nothingBoxSecond">请前往<text @click="photoSquareNavi()">约拍广场</text>寻找你心仪的摄影师把</view>
		</view>
		<view v-if="focusPerson != '' "></view>
		<uni-list class="focusBox" :border="false">
		    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
		        <!-- 自定义 body -->
		        <view slot="body" class="focusItemBox">
					<image :src="item.headerPic" mode="aspectFill"></image>
					<view class="focusText">
					 <view >{{item.userName}}</view>
					 <view>{{item.autograph}}</view>
					</view>
					<label class="radio">
						<radio :checked="item.ifchoose" color="#EC808D" @click="onChangeChoose(index)"/>
					</label>
				</view>
		
		    </uni-list-item>
		</uni-list>
		
	</view>
</template>

<script>
	export default{
		onShow() {
			this.loadFocused()
		},
		onLoad() {
			this.loadFocused()
			this.userId=getApp().globalData.global_userId || '12'
		},
		data(){
			return{
				userId:'1',
				focusPerson:[
					// {
					// 	accountB:'',
					// 	isFocus:'1',
					// 	headerPic:'../../../static/iconn/2.jpg',
					// 	userName:'布兰妮老田田',
					// 	autograph:'没有个性签名！！！！',
					// 	ifchoose: false
					// }
				]
				// arr:[],
				// t:{
				// 	photographerId:'',
				// 	photographerName:''
				// }
			}
		},
		methods:{
			addWish(i,n){
				const that=this
				var arr=[]
				var t={
					photographerId:'',
					photography:''
				}
				for (var i=0;i<that.focusPerson.length;i++){
					if (that.focusPerson[i].ifchoose==true){
						arr.push({photographerId:that.focusPerson[i].accountB,photography:that.focusPerson[i].userName})
						
					}
				}
				console.log(arr)
				console.log(that.focusPerson)
				var _arr=JSON.stringify(arr)
				uni.$emit('choosePhotographer',{photographer:_arr})
				uni.navigateBack({})
				
				
			},
			onChangeChoose: function(i){
				this.focusPerson[i].ifchoose = !this.focusPerson[i].ifchoose;
			},
			photoSquareNavi(){
				uni.navigateTo({
					url:'../../PhotoSquare/AppoinentRecommend'
				})
			},
			async loadFocused(){
				const res=await this.$myRequest({
					url:'/MyPage/HomePage/getFocus',
					data:{
						pageNum:1,
						pageSize:10,
						user_id:this.userId
					}
				})
				this.focusPerson=res.data.list
				for (let i=0;i<this.focusPerson.length;i++){
					this.$set(this.focusPerson[i], 'ifchoose', false)
				}
				console.log(this.focusPerson)
			},
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
	.nothingBox{
		width: 100%;
		text-align: center;
	}
	.noIcon{
		width: 100%;
		text-align: center;
		padding-top: 150rpx;
		padding-bottom: 30rpx;
	}
	.noIcon span{
		font-size: 100rpx;
		text-align: center;
	}
	.nothingBoxFirst{
		font-size: 33rpx;
		color: #ACACAC;
	}
	.nothingBoxSecond{
		font-size: 30rpx;
		color: #ACACAC;
		line-height: 60rpx;
	}
	.nothingBoxSecond text{
		color: #f37ba6;
	}
	.focusBox{
		background-color: #FFFFFF;
	}
	.focusItemBox{
		position: relative;
		top:0;
		left: 0;
		width: 100%;
		height: 140rpx;
		background-color: #FFFFFF;
		/* border-bottom: 1rpx solid #e9e9e9; */
	}
	.focusItemBox image{
		position: absolute;
		top: 25rpx;
		left: 30rpx;
		width: 85rpx;
		height: 85rpx;
		border-radius: 85rpx;
	}
	.focusText{
		position: absolute;
		top: 30rpx;
		left: 140rpx;
		width: 75%;
		display: inline-block;
	}
	.focusText view:first-child{
		font-size: 28rpx;
		font-weight: bold;
	}
	.focusText view:last-child{
		color: #AAAAAA;
		font-size: 23rpx;
		line-height: 40rpx;
	}
	.cancelButton{
		position: fixed;
		top: 25rpx;
		right: 30rpx;
		width: 100rpx;
		height: 45rpx;
		/* border: 1rpx solid rgba(104,104,104,0.3);
		border-radius: 30rpx; */
		text-align: center;
		line-height: 35rpx;
		font-size: 25rpx;
		z-index: 10000;
	}
	.cancelButton text{
		font-size: 30rpx;
		color: rgba(104,104,104,1);
	}
	.uni-list::before{
			display: none;
		}
	.uni-list::after{
		    display: none;
		}
	.uni-list-item__container{
		background-color: #FFFFFF;
	}
	.radio{
		position: absolute;
		top: 30rpx;
		right: 0rpx;
		width: 100rpx;
		height: 45rpx;
	}
	.radio radio{
		/* 调整单选框大小 */
		transform: scale(0.7);
	}
</style>
