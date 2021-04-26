<template>
	<view class="box">
		<!-- 至少选择一张图片上传 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请至少选择一张图片上传哦～" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请先同意《用户自制内容协议》 -->
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请先同意《用户自制内容协议》" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 是否发布动态 -->
		<uni-popup ref="popup3" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="确认发布动态吗？" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box choose-image-box">
				<g-upload ref='gUpload' @chooseFile='onChooseImage' @imgDelete='onDeleteImage' :columnNum="columnNum"
					:maxCount='maxCount'></g-upload>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" :value="this.article" placeholder="快来编辑一条动态内容吧!" @input="onArticleInput" />
				</view>
			</view>
		</view>
		<view class="line"></view>
		<!-- 同意用户自制内容协议 -->
		<view class="my-content">
			<view class="row-box agree-box">
				同意<text>《用户自制内容协议》</text>
				<label>
					<radio :checked="ifagree" @click="onChangeAgree" />
				</label>
			</view>
		</view>
		<view class="line"></view>
		<!-- 权限设置 -->
		<view class="my-content">
			<view class="row-box limit-box">
				<text>权限设置</text>
				<view class="limit-content">
					<text class="text1">图片可以下载保存</text>
					<text class="text2">开启后，别人可下载你所发布的图片</text>
				</view>
				<switch :checked="ifdownloadimag" @change="onChangeLimit" color="rgba(248, 93, 159, 0.8)" />
			</view>
		</view>
		<view class="line"></view>
		<!-- 底部固定栏 -->
		<view class="fixed-bottom-box">
			<view class="row-box bottom-box">
				<image src="@/static/at.png" mode="widthFix" @click="onChooseAt"></image>
				<image src="@/static/addlabel.png" mode="widthFix" @click="onChooseLabel"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import gUpload from "@/components/g-upload/g-upload.vue"
	export default {
		data() {
			return {
				ifagree: false,
				ifdownloadimag: false,
				columnNum: 4, //	上传图片显示几列
				maxCount: 9, //	最多上传图片数量
				images: [],
				article: '',
			}
		},
		components: {
			gUpload,
		},
		methods: {
			
			onChangeAgree: function() {
				this.ifagree = !this.ifagree;
			},
			onChangeLimit: function() {
				this.ifdownloadimag = !this.ifdownloadimag;
			},
			// 选择上传图片
			onChooseImage: function(list, v) {
				// uni.chooseImage({
				// 	count: 9, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: res => {
				// 		console.log(JSON.stringify(res.tempFiles));
				// 		this.images = res.tempFilePaths;
				// 	}
				// });
				this.images = list.map((value, index) => {
					return {
						name: 'img',
						uri: value
					}
				})
				console.log(this.images)
			},
			// 删除图片
			onDeleteImage: function(list, v) {
				this.images = list.map((value, index) => {
					return {
						name: 'img',
						uri: value
					}
				})
				console.log(this.images)
			},
			// 选择@的用户
			onChooseAt: function(i) {

				uni.navigateTo({
					url: './at',
					// animationType:'slide-in-right',
				})
			},
			// 选择热门话题
			onChooseLabel: function() {
				uni.navigateTo({
					url: './label',
					// animationType:'slide-in-right',
				})
			},
			onArticleInput: function(e) {
				this.article = e.detail.value
			},
			// 取消对话框
			close: function(done) {
				done()
			},
			// 确认发布动态
			confirm: function() {
				uni.uploadFile({
					url: 'http://81.68.73.252:8086/ContentReleasePage/dynamic',
					files: this.images,
					formData: {
						'user_id': 4,
						'callUser': 1,
						'mainBody': this.article
					},
					success: uploadFileRes => {
						// console.log(uploadFileRes.data);
						console.log(uploadFileRes)
					}
				});
				
				// 跳转至个人主页
				uni.redirectTo({
				    url: '../Mypage/homePage/homePage?showToast=1'
				});
			},
		},
		
		// 页面导航栏按钮点击事件
		onNavigationBarButtonTap() {
			
			// 如果未选择图片
			if (this.images.length == 0) {
				this.$refs.popup1.open()
			}
			// 如果未同意《用户自制内容协议》
			else if (!this.ifagree) {
				this.$refs.popup2.open()
			} else {
				this.$refs.popup3.open()
			}

			// // 提取json文件键字对
			// const res = await this.$myRequest({
			// 	url:'/MyPage/HomePage/dynamic',
			// 	data:{
			// 		user_id: 13
			// 	}
			// })
			// // 提取json文件键字对
			// console.log(res.data[0].photos)

			// var photoes = res.data[0].photos
			// console.log(photoes)
			// var jsonObj = eval('('+photoes+')')
			// console.log(jsonObj)
			// for (var prop in jsonObj)
			// {
			//     //输出 key-value值
			//     //console.log("jsonObj[" + prop + "]=" + jsonObj[prop]);
			// 	console.log(jsonObj[prop]);
			// 	this.photoes.push(jsonObj[prop])
			// }   

		},
		onShow() {
			// 获取@用户名
			uni.$on("emitChoosePersonName", res => {
				this.article += res.choosePersonName
				console.log(this.article)
				// 清除监听
				uni.$off("emitChoosePersonName");
			})
			// 获取热门话题标签
			uni.$on("emitAddHotTopic", res => {
				this.article += res.label
				console.log(this.article)
				// 清除监听
				uni.$off("emitAddHotTopic");
			})
		},
		// // 页面中如果使用了定时器，在离开这个页面的时候一定要记得清除，避免出现bug
		// onUnload() {
		// 	if(this.timer) {  
		// 		clearTimeout(this.timer);  
		// 		this.timer = null;  
		// 	}  
		// }
	}
</script>

<style>
	@import url("../../static/css/login.css");
	@import url("./post.css");

	.works-article {
		border-top: solid 1px rgba(121, 121, 121, 0.1);
		padding-top: 15px;
	}

	.works-article textarea {
		width: 100%;
		height: 450rpx;
		font-size: 14px;
	}
</style>
