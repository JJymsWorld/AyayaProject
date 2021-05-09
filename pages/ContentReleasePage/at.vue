<template>
	<view>
		<uni-list class="focusBox" :border="false">
			<uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
				<!-- 自定义 body -->
				<view slot="body" class="focusItemBox">
					<image :src="item.headerPic" mode="aspectFill"></image>
					<view class="focusText">
						<view>{{item.userName}}</view>
					</view>
					<label class="radio">
						<radio :checked="item.ifchoose" color="#EC808D" @click="onChangeChoose(index)" />
					</label>
				</view>
			</uni-list-item>
		</uni-list>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1, // 分页标记
				index: 0,
				userId: null,
				choosePersonName: '',
				atPersonList: [],
				focusPerson: []
			}
		},
		methods: {
			onChangeChoose: function(i) {
				this.focusPerson[i].ifchoose = !this.focusPerson[i].ifchoose;
			},
			// 加载已选择的列表
			onLoadChoose: function() {
				console.log('onLoadChoose')
				for (var item in this.atPersonList) {
					const i = this.atPersonList[item].index
					this.focusPerson[i].ifchoose = true
				}
				console.log(this.focusPerson)
			}
		},
		onNavigationBarButtonTap() {
			this.atPersonList = []
			for (var item in this.focusPerson) {
				if (this.focusPerson[item].ifchoose) {
					this.choosePersonName += '@' + this.focusPerson[item].userName
					this.atPersonList.push({
						index: item,
						userId: this.focusPerson[item].accountB,
						username: this.focusPerson[item].userName
					})
				}
			}
			console.log(this.atPersonList)
			// 传回@用户name及index到发布页面
			uni.$emit("emitChoosePersonName", {
				choosePersonName: this.choosePersonName,
				index: this.index,
				atPersonList: this.atPersonList
			});

			uni.navigateBack()
		},
		async onLoad(option) {
			const that = this

			// 获取登录账号userID
			uni.getStorage({
				key: 'userId',
				success: res => {
					console.log(res.data);
					that.userId = res.data
				}
			});
			// 获取用户关注列表
			const res = await that.$myRequest({
				url: '/MyPage/HomePage/getFocus',
				data: {
					pageNum: that.pageNum,
					pageSize: 10,
					user_id: that.userId
				}
			})
			for (var i in res.data.list) {
				res.data.list[i].ifchoose = false
			}
			that.focusPerson = res.data.list
			
			// const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			
			const eventChannel = that.getOpenerEventChannel()
			// 监听emitClothLink事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('emitAtPersonList', function(data) {
				console.log('emit')
				that.atPersonList = data.atPersonList
				that.index = data.index
				that.onLoadChoose()
			})
			
		},
		async onReachBottom() {
			this.pageNum++
			const res = await this.$myRequest({
				url: '/MyPage/HomePage/getFocus',
				data: {
					pageNum: this.pageNum,
					pageSize: 10,
					user_id: this.userId
				}
			})
			this.focusPerson = this.focusPerson.concat(res.data.list)
		}
	}
</script>

<style>
	.focusBox {
		background-color: #FFFFFF;
	}

	.focusItemBox {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		/* border-bottom: 1rpx solid #e9e9e9; */
	}

	.focusItemBox image {
		position: absolute;
		top: 7rpx;
		left: 30rpx;
		width: 85rpx;
		height: 85rpx;
		border-radius: 85rpx;
	}

	.focusText {
		position: absolute;
		top: 25rpx;
		left: 150rpx;
		width: 50%;
		display: inline-block;
	}

	.focusText view:first-child {
		font-size: 30rpx;
		font-weight: bold;
		color: #3B4144;
	}

	.radio {
		position: absolute;
		top: 30rpx;
		right: 0rpx;
		width: 100rpx;
		height: 45rpx;
	}

	.radio radio {
		/* 调整单选框大小 */
		transform: scale(0.7);
	}

	.uni-list::before {
		display: none;
	}

	.uni-list::after {
		display: none;
	}

	.uni-list-item__container {
		background-color: #FFFFFF;
	}
</style>
