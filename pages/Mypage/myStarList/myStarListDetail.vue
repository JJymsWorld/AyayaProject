<template>
	<view class="workBoxList">
		<view class="" v-for="(item,index) in StarWork" :key="index">
			<delSlideLeft :item="item" :data_transit="{index:index,item:item}" @delItem="delItem">
				<view class="workBox">
					<image :src="item.firstPic" mode="aspectFill" @click.stop="workNavi(item.collectedId)"></image>
					<text @click.stop="workNavi(item.collectedId)">{{item.title}}</text>
					<view v-if="myWish!=0" class="edit" @click="myWishNavi(item.collectedId,item.title)"><view>加入心愿单</view></view>
					<view v-if="addmakeuplabels!=0" class="edit" @click="onAddMakeupLabels(item.collectedId,item.title)"><view>选择该收藏</view></view>
				</view>
			</delSlideLeft>
		</view>
	</view>
</template>

<script>
	import delSlideLeft from '@/components/ay-operate/mydel_slideLeft.vue'
	export default {
		onLoad(option) {
			this.starListId=option.favourId || '1'
			console.log(this.starListId)
			console.log(option.myWish)
			this.myWish = option.myWish || 0
			this.wishId = option.wishId || ''
			this.addmakeuplabels = option.addmakeuplabels || 0
			this.getAll()
		},
		components: {
			delSlideLeft,
		},
		data() {
			return {
				addmakeuplabels: 0,		//1:存在发布作品的的参数传递
				myWish:0,
				wishId:'',
				starListId: '',
				StarWork: [{
						workId: "000001",
						first_pic: "../../../static/iconn/4.jpg",
						title: "江南美人图|奇迹党党环游中华之江南",
					},
					{
						workId: "000002",
						first_pic: "../../../static/iconn/4.jpg",
						title: "江南美人图|奇迹党党环游中华之江南",
					},
					{
						workId: "000003",
						first_pic: "../../../static/iconn/4.jpg",
						title: "江南美人图|奇迹党党环游中华之江南",
					}
				]
			}
		},
		methods: {
			async getAll() {
				// 填写获取该收藏夹中的所有收藏
				const res = await this.$myRequest({
					url:'/MyPage/MyStarList/getListWorks',
					data:{
						favour_id:this.starListId
					}
				}) 
				console.log("starList")
				//console.log(res.data[0].firstPic)
				this.StarWork = res.data
				console.log(res.data)
			},
			workNavi(i) {
				uni.navigateTo({ // 传递作品id
					url: '../../works/works?workId=' + i
				})
			},
			myWishNavi(i,n){
				uni.navigateBack({
					delta:2
				})
				uni.$emit('chooseMadeup',{
					madeupId:i,
					madeupTitle:n,
					wishId:this.wishId
				})
			},
			// 在发布界面添加该作品标题
			onAddMakeupLabels(workId,title){
				
				console.log('emit')
				
				uni.$emit("emitmakeuplabels", {
					workId: workId,
					title: title,
				});
				
				uni.navigateBack({
					delta: 2
				})
				
			},
			// 左滑删除收藏
			delItem: function(e) {
				this.StarWork.splice(e.data.index, 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.box-slideLeft .touch-slideLeft{
		white-space: normal;
		padding-bottom: 0;
	}
	.workBoxList{
		padding: 0;
	}
	.workBox {
		position: relative;
		width: 694rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 4px 4px 4px 4px rgba(221, 221, 221, 0.1);
		margin-bottom: 20rpx;
	}
	.workBox image {
		position: absolute;
		top: 30rpx;
		left: 40rpx;
		width: 138rpx;
		height: 138rpx;
		border-radius: 15rpx;
	}
	.workBox text {
		position: absolute;
		top: 40rpx;
		left: 220rpx;
		font-size: 32rpx;
		font-weight: bold;
		font-family: '黑体';
		width: 420rpx;
	}
	.edit {
			position: absolute;
			top: 135rpx;
			right: 30rpx;
			width: 150rpx;
			height: 40rpx;
			border: 3rpx solid #EC808D;
			border-radius: 20rpx;
	        line-height: 40rpx;
			text-align: center;
	}
	.edit view{
		font-size: 24rpx;
		color: #EC808D;
		z-index: 1;
	}
</style>
