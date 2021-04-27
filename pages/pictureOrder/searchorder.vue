<template>
	<view class="box">
		<view class="navigate-box">
	
		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" @cancel="onGoBack" :radius="30" cancelButton="always"></uni-search-bar>
		</view>
		<view class="row-box">
			<view class="search-hsty">
				<text class="search-text">搜索历史</text>
				<view class="delete-hsty" @click="delHsty">
					<span class="iconfont delete-icon">&#xe6ba;</span>
					<text class="delete-text">清空搜索历史</text>
					<!-- 点击清空历史时弹出提示对话框 -->
					<uni-popup ref="popup" type="dialog">
					    <uni-popup-dialog type="info" mode="base" content="是否清空搜索历史？" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
					</uni-popup>
				</view>
			</view>
			<view class="search-hsty">
				<view class="hsty-btn" v-for='(item,index) in searchHsty' :key='index' @click="chooseHsty(item.content)">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				searchHsty: [],
			}
		},
		methods: {
			// 搜索内容
			onSearch: function(e) {
				// 获取搜索内容
				this.value = e.value
				console.log(this.value)
				
				// 新增一条搜索历史
				this.addNewSearchHsty(this.value)
				
				// 跳转至搜索结果页面
				if(this.value != ''){
					// uni.navigateTo({
					// 	url: './searchRes?label=' + this.value
					// })
				}
			},
			// 新增一条搜索历史
			addNewSearchHsty: function(value){
				this.$myRequest({
					method: 'POST',
					url: '/Search/addRecord',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						content: value,
						user_id: 4
					}
				})
			},
			// 清空搜索历史
			delHsty: function() {
				this.$refs.popup.open()
			},
			// 取消清空历史记录
			close: function(done){
				done()
			},
			// 确认清空历史记录
			confirm: function(done){
				// this.$myRequest({
				// 	method: 'DELETE',
				// 	url: '/Search/deleteRecordById',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded'
				// 	},
				// 	data: {
				// 		user_id: 4
				// 	}
				// })
				console.log('已清空搜索历史')
				this.searchHsty = []
			},
			// 返回前一页面
			onGoBack: function() {
				console.log('cancel')
				uni.navigateBack({})
			},
			// 选择搜索历史
			chooseHsty: function(label){
				// 传入搜索标签
				uni.navigateTo({
					url: 'searchorderRes?label=' + label,
				})
			},
		},
		async onShow() {
			// 获取用户历史搜索记录
			const res = await this.$myRequest({
				url: '/Search/Index/Search/getRecordById',
				data: {
					'user_id': 4
				}
			})
			this.searchHsty = res.data
			console.log(res.data)
			
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	
	.navigate-box {
		width: 100%;
		height: 70rpx;
	}
	
	.row-box {
		width: 90%;
	}
	
	.search-text {
		font-size: 32rpx;
		font-family: 'Courier New';
	}
	
	.hsty-btn {
		float: left;
		margin-top: 40rpx;
		margin-right: 25rpx;
		padding: 0 30rpx;
		background-color: #FFF2F6;
		color: rgba(255, 110, 162, 0.7);
		border: 1rpx solid #FFF2F6;
		font-weight: 700;
		font-size: 24rpx;
		line-height: 45rpx;
		border-radius: 35rpx;
	}
	
	.hsty-btn {
		background-color: #F2F2F2;
		border: 1rpx solid #F2F2F2;
		color: #323233;
	}
	
	.delete-icon {}
	
	.delete-text {
		padding: 10rpx;
		font-size: 24rpx;
	}
	
	.delete-hsty {
		float: right;
	}
	
	page {
		background: #FFFFFF;
	}
</style>
