<template>
	<view>
		<view>
			<view class="topNavi">
			    <span class="iconfont_dy"@click="backNavi">&#xe6b0;</span>
			    <view class="headText">个人信息</view>
				<view class="saveButton" @click="saveImformation" >保存</view>
		    </view>
		</view>
		<!-- 点击更换头像部分 -->
		<view>
			<view class="backBox" :style="background">
			 <view class="imageTextBox">
				<view>
					<image :src="avatar" mode="aspectFill"></image>
					<view class="avatarEdit"@click="changeAvatar"><span class="iconfont_dy">&#xe635;</span></view>
				</view>
			</view>
			<view class="editTextBox"><view @click="changeBackground"class="editTextBoxView"><span class="iconfont_dy">&#xe738;</span> 修改背景</view> </view>
		</view>
		</view>

		
		
		<!-- 账号，昵称，性别部分 -->
		
		<view class="textBoxTable">
			<table>
				<tr>
					<td class="inputBoxName">账号</td>
					<td class="inputBox"><view >{{account}}</view></td>
					<td><span class="iconfont_dy"@click="open(0)">&#xe6b2;</span></td>
				</tr>
				<tr>
					<td class="inputBoxName">昵称</td>
					<td class="inputBox"><view>{{username}}</view></td>
					<td><span class="iconfont_dy"@click="open(1)">&#xe6b2;</span></td>
				</tr>
				<tr>
					<td class="inputBoxName">性别</td>
					<td class="inputBox"><view>{{sex}}</view></td>
					<td><span class="iconfont_dy"@click="open(2)">&#xe6b2;</span></td>
				</tr>
				<tr>
					<td class="inputBoxName">个性签名</td>
					<td></td>
					<td><span class="iconfont_dy"@click="open(3)">&#xe6b2;</span></td>
				</tr>
			</table>
		</view>
		
		
		
		
		<!-- 个性签名 -->
		<view v-if="popTag==3">
			<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="input" placeholder="请输入个性签名" title="个性签名"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
		<!-- 个性签名 end-->
		</view>
		
		<!-- 性别选择框 -->
		<view v-if="popTag==2">
			<uni-popup ref="popup" type="bottom">
			<view class="sexBox">
				<view class="sexChoose" @click="sexChooseFunc(0)">男</view>
				<view class="sexChoose2" @click="sexChooseFunc(1)">女</view>
				<view class="sexExitChoose"@click="sexChooseFunc(2)">取消</view>
			</view>
		</uni-popup>
		</view>
		
		<!-- 性别选择框end -->
		
		<!-- 昵称 -->
		<view v-if="popTag==1">
			<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="input" placeholder="请输入昵称" title="昵称" message="" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
		<!-- 昵称end -->
		</view>
		<!-- 账号 -->
		<view v-if="popTag==0">
			<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="input" placeholder="请输入账号" title="账号"  message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm($event)"></uni-popup-dialog>
		</uni-popup>
		<!-- 账号 end-->
		</view>
		
	</view>
</template>

<script>
	export default{
		onLoad() {
			
		},
		data(){
			return{
				userId:'12',
				popTag:'',
				avatar:'../../../static/iconn/2.jpg',
				account:'18921969417',
				username:'jenniee',
				sex:'女',
				sexStatus:2,
				sign:'你还没有个性签名哦！',
				background:{
					'background-image': 'url("/../../../static/iconn/back.png")',
					'background-size': 'cover',
					'opacity':'0.9'
				},
				backgroundImage:'/../../../static/iconn/back.png',
				header_picAndBackground:[]
			}
		},
		methods:{
			backNavi(){
				uni.navigateBack({
					
				})
			},
			close(done){
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				// done()
				 this.$refs.popup.close()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(value){
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...
				
				if(this.popTag=='0'){
					this.$data.account=value
				}
				else if(this.popTag=='1'){
					this.$data.username=value
				}
				else if(this.popTag=='3'){
					this.$data.sign=value
				}
				// done()
				 this.$refs.popup.close()
			},
			open(i){
			         // 通过组件定义的ref调用uni-popup方法
					 this.popTag=i
			         this.$refs.popup.open()
			      },
		    sexChooseFunc(i){
				if(i==0){
					this.sex='男'
				}
				else if(i==1){
					this.sex='女'
				}
				this.$refs.popup.close()
			},
			changeAvatar(){
				var _self=this
				uni.chooseImage({
					count: 1,
					// sizeType:['original','compressed'],
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths))
						// uni.previewImage({
						// // 对选中的图片进行预览
						// urls: res.tempFilePaths,
					 // // urls:['','']  图片的地址 是数组形式
				  //     })
					  console.log(res.tempFilePaths[0])
					  _self.$data.avatar=res.tempFilePaths[0]
					 // _self.$data.background["background-image"]='url("'+res.tempFilePaths[0]+'")'
					},
				})
			},
			changeBackground(){
				var _self=this
				uni.chooseImage({
					count: 1,
					// sizeType:['original','compressed'],
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths))
						// uni.previewImage({
						// // 对选中的图片进行预览
						// urls: res.tempFilePaths,
					 // // urls:['','']  图片的地址 是数组形式
				  //     })
					  console.log(res.tempFilePaths[0])
					  _self.$data.background["background-image"]='url("'+res.tempFilePaths[0]+'")'
					  _self.$data.backgroundImage=res.tempFilePaths[0]
					},
				})
			},
			async saveImformation(){
				// var backgroundImage=this.background[0]
				var _self=this
				console.log(_self)
				var item = {
					name: 'header_picAndBackground',
					url: ''
				}
				item.url = _self.avatar
				_self.header_picAndBackground.push(item)
				item.url = _self.backgroundImage
				_self.header_picAndBackground.push(item)
				
				console.log(_self.header_picAndBackground)
				// var t = JSON.stringify(_self.header_picAndBackground)
				// const res = await this.$myRequest({
				// 	url:'/ChangePersonalInformation/changePersonalInformation',
				// 	header:{
				// 		'content-type':'application/x-www-form-urlencoded'
				// 	},
				// 	method:'PUT',
				// 	data:{
				// 		account:_self.account,
				// 		autograph:_self.sign,
				// 		gender:2,//_self.sex,
				// 		header_picAndBackground:_self.header_picAndBackground,
				// 		user_id: 1,//_self.userId,
				// 		user_name:_self.username
				// 	 }
				// })
				// console.log(res.data)
				
				_self.sexStatus = _self.sex == '女'?2:1
				uni.uploadFile({
					url: 'http://81.68.73.252:8086/ChangePersonalInformation/changePersonalInformation',
					files: _self.header_picAndBackground,
					formData: {
						'account':_self.account,
						'autograph':_self.sign,
						'gender':_self.sexStatus,
						'user_id': _self.userId,
						'user_name':_self.username
					},
					_method:'PUT',
					success: uploadFileRes => {
						// console.log(uploadFileRes.data);
						console.log(uploadFileRes)
					}
				});
			}
		}
	}
</script>

<style>
	input{
		display: inline-block;
	}
	.topNavi{
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 150rpx;
		background-color: #FFFFFF;
	}
	.topNavi span{
		position: absolute;
		top: 69rpx;
		left: 22rpx;
		font-size: 35rpx;
		opacity: 1;
	}
	.headText{
		width: 100%;
		text-align: center;
		line-height: 190rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	.saveButton{
		position: absolute;
		top: 70rpx;
		right: 32rpx;
	}
	/* .topNavi text{
		position: absolute;
		top: 25rpx;
		right: 100rpx;
		width: 50rpx;
		color: rgba(0,0,0,0.4);
	} */
	.imageTextBox{
		position: relative;
		top: 0;
		left: 0;
		text-align: center;
		padding-top: 115rpx;
		padding-bottom: 0rpx;
		width: 170rpx;
		height: 170rpx;
		border-radius: 170rpx;
		overflow: hidden;
		margin: 0 auto;
	}
	.avatarEdit{
		position: absolute;
		top:210rpx;
		background-color: rgba(0,0,0,0.4);
		width: 170rpx;
		height: 170rpx;
		margin: 0 auto;
	}
	.avatarEdit span{
		color: #FFFFFF;
		opacity: 0.6;
		line-height: 60rpx;
	}
	.imageTextBox image{
		width: 170rpx;
		height: 170rpx;
		border-radius: 170rpx;
	}
	.editTextBox{
		text-align: center;
		padding-top: 0rpx;
		padding-bottom: 40rpx;
		z-index: 1;
	}
	.editTextBoxView span{
		opacity: 1;
		font-size: 25rpx;
	}
	.editTextBox view{
		font-size: 27rpx;
		font-family: 'Verdana';
		/* color: #EC808D; */
		color: #EC808D;
		line-height: 48rpx;
	}
	.textBox{
		margin-top: 10rpx;
		background-color: #FFFFFF;
	}
	.textBoxView{
		position: relative;
		top: 0;
		left: 0;
		width: 90%;
		margin: 0 auto;
	}
	.textBoxView text{
		font-size: 29rpx;
		line-height: 90rpx;
		padding-left: 10rpx;
	}
	.textBoxTable{
		width: 90%;
		margin: 0 auto;
	}
	.inputBoxName{
		width: 20%;
		font-size: 32rpx;
		
		line-height: 90rpx;
	}
/* 	.textBoxView input{
		position: absolute;
		top: 38%;
		right: 40rpx;
		font-size: 26rpx;
		vertical-align: middle;
		margin-left: 100rpx;
		margin-bottom: 10rpx;
		text-align: right;
		color: #8F8F94;
	} */
	.inputBox{
		width: 75%;
		font-size: 30rpx;
		vertical-align: middle;
		margin-left: 100rpx;
		margin-bottom: 10rpx;
		color: #8F8F94;
		text-align: right;
	}
    .textBoxView span{
		position: absolute;
		top: 45%;
		right: 0rpx;
		font-size: 26rpx;
	}
	.sexBox{
		background-color: #FBFBFB;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		overflow: hidden;
	}
	.sexChoose{
		text-align: center;
		font-size: 30rpx;
		padding: 30rpx 0;
		/* border-bottom: 3rpx solid #fbfbfb; */
		background-color: #FFFFFF;
	}
	.sexChoose2{
		
		text-align: center;
		font-size: 30rpx;
		padding: 30rpx 0;
		border-top: 3rpx solid #fbfbfb;
		background-color: #FFFFFF;
	}
	.sexExitChoose{
		background-color: #FFFFFF;
		text-align: center;
		font-size: 30rpx;
		padding: 30rpx 0;
		margin-top: 20rpx;
	}

</style>
