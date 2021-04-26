<template>
	<view>
		<uni-list class="focusBox" :border="false">
	    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
	        <!-- 自定义 body -->
	        <view slot="body" class="focusItemBox">
				<image :src="item.avatar" mode="aspectFill"></image>
				<view class="focusText">
				 <view>{{item.username}}</view>
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
		data(){
			return {
				index: 0,
				userId:'',
				choosePersonName:'',
				focusPerson:[
					{
						userid:'',
						avatar:'../../static/iconn/2.jpg',
						username:'user1',
						ifchoose: false
					},
					{
						userid:'',
						avatar:'../../static/iconn/2.jpg',
						username:'user2',
						ifchoose: false
					},
					{
						userid:'',
						avatar:'../../static/iconn/2.jpg',
						username:'user3',
						ifchoose: false
					},
					{
						userid:'',
						avatar:'../../static/iconn/2.jpg',
						username:'user4',
						ifchoose: false
					},
					{
						userid:'',
						avatar:'../../static/iconn/2.jpg',
						username:'user5',
						ifchoose: false
					}
				]
			}
		},
		methods:{
			onChangeChoose: function(i){
				this.focusPerson[i].ifchoose = !this.focusPerson[i].ifchoose;
			}
		},
		onNavigationBarButtonTap(){
			for(var item in this.focusPerson){
				if(this.focusPerson[item].ifchoose)
					this.choosePersonName += '@' + this.focusPerson[item].username
			}
			// 传回@用户name及index到发布页面
			uni.$emit("emitChoosePersonName",{choosePersonName: this.choosePersonName, index: this.index});
			
			uni.navigateBack()
		},
		onLoad: function(option) {
		  this.index = option.index
		  // const eventChannel = this.getOpenerEventChannel()
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  
		}
	}
</script>

<style>
	.focusBox{
		background-color: #FFFFFF;
	}
	.focusItemBox{
		position: relative;
		top:0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		/* border-bottom: 1rpx solid #e9e9e9; */
	}
	.focusItemBox image{
		position: absolute;
		top: 7rpx;
		left: 30rpx;
		width: 85rpx;
		height: 85rpx;
		border-radius: 85rpx;
	}
	.focusText{
		position: absolute;
		top: 25rpx;
		left: 150rpx;
		width: 50%;
		display: inline-block;
	}
	.focusText view:first-child{
		font-size: 40rpx;
		font-weight: bold;
		color: #3B4144;
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
	.uni-list::before{
			display: none;
		}
	.uni-list::after{
		    display: none;
		}
	.uni-list-item__container{
		background-color: #FFFFFF;
	}
</style>
