<<<<<<< HEAD
<template>
	<view class="box">
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box choose-image-box">
				<g-upload ref='gUpload' @chooseFile='onChooseImage' @imgDelete='onDeleteImage' :columnNum="columnNum"
					:maxCount='maxCount'></g-upload>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" value="" placeholder="正文和内容一样重要哦！" />
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
				<image src="@/static/at.png" mode="widthFix"></image>
				<image src="@/static/addlabel.png" mode="widthFix"></image>
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
				ifpostdynamic: false,
				ifdownloadimag: false,
				columnNum: 4, //	上传图片显示几列
				maxCount: 9, //	最多上传图片数量
				images: [],
			}
		},
		components: {
			gUpload
		},
		methods: {
			onChangeAgree: function() {
				this.ifagree = !this.ifagree;
			},
			onChangePostDynamic: function() {
				this.ifpostdynamic = !this.ifpostdynamic;
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
			}
		},
		// 页面导航栏按钮点击事件
<<<<<<< HEAD
		onNavigationBarButtonTap() {
=======
		async onNavigationBarButtonTap() {
			
>>>>>>> d8453de1c67b4845791327ecbb57d726a1bba948
=======
<template>
	<view class="box">
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box choose-image-box">
				<g-upload ref='gUpload' @chooseFile='onChooseImage' @imgDelete='onDeleteImage' :columnNum="columnNum"
					:maxCount='maxCount'></g-upload>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" value="" placeholder="正文和内容一样重要哦！" />
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
				<image src="@/static/at.png" mode="widthFix"></image>
				<image src="@/static/addlabel.png" mode="widthFix"></image>
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
				ifpostdynamic: false,
				ifdownloadimag: false,
				columnNum: 4, //	上传图片显示几列
				maxCount: 9, //	最多上传图片数量
				images: [],
			}
		},
		components: {
			gUpload
		},
		methods: {
			onChangeAgree: function() {
				this.ifagree = !this.ifagree;
			},
			onChangePostDynamic: function() {
				this.ifpostdynamic = !this.ifpostdynamic;
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
			}
		},
		// 页面导航栏按钮点击事件
		async onNavigationBarButtonTap() {
			
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
			uni.uploadFile({
			    url: 'http://8.136.216.96:8086/ContentReleasePage/dynamic', 
			    files: this.images,
				formData: {
					'user_id': 13,
				    'callUser': 9,
					'mainBody': 'test'
				},
			    success: (uploadFileRes) => {
			        // console.log(uploadFileRes.data);
					console.log(uploadFileRes)
			    }
			});
<<<<<<< HEAD
<<<<<<< HEAD
			
			// 跳转至首页
			uni.switchTab({
				url:"../Index_Recommend/Index_Hot"
			})
			
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
=======
>>>>>>> d8453de1c67b4845791327ecbb57d726a1bba948
=======
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029

			// uni.uploadFile({
			//     url: 'http://8.136.216.96:8086/Date/PhotographerList/applyStayInPg', 
			//     files: this.images,
			// 	formData: {
			// 	    'city': '杭州',
			// 		'nick_name': 'wwweng',
			// 		'phone_num': 17395710519,
			// 		'real_name': '翁馨',
			// 		'user_id': 17395710519
			// 	},
			//     success: (uploadFileRes) => {
			//         // console.log(uploadFileRes.data);
			// 		console.log(uploadFileRes)
			//     }
<<<<<<< HEAD
<<<<<<< HEAD
			// });

			
=======
			// });
			
			// uni.request({
			// 	header: {
			// 		"Content-Type": "application/x-www-form-urlencoded"
			// 	},
			// 	url: "http://8.136.216.96:8086/ContentReleasePage/dynamic", //仅为示例，并非真实接口地址。
			// 	method: 'POST',
			// 	data: {
			// 		callUser: 13,
			// 		mainBody: 'test',
			// 		img: this.images[0].uri
			// 	},
			// 	dataType: 'json',
			// 	success: (res) => {
			// 		//var result = JSON.parse(res.data.projectList);
			// 		console.log(res)
			// 	}
			// });

			// // 上传图片至服务器
			// uni.uploadFile({
			//     url: 'http://8.136.216.96:8086/ContentReleasePage/dynamic', 
			//     files: this.images,
			//     success: (uploadFileRes) => {
			//         console.log(uploadFileRes.data);
			//     }
			// });
			// //上传其他信息

			// 跳转至首页
			uni.switchTab({
				url:"../Index_Recommend/Index_Hot"
			})
>>>>>>> d8453de1c67b4845791327ecbb57d726a1bba948
		}
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
=======
			// });
			
			// uni.request({
			// 	header: {
			// 		"Content-Type": "application/x-www-form-urlencoded"
			// 	},
			// 	url: "http://8.136.216.96:8086/ContentReleasePage/dynamic", //仅为示例，并非真实接口地址。
			// 	method: 'POST',
			// 	data: {
			// 		callUser: 13,
			// 		mainBody: 'test',
			// 		img: this.images[0].uri
			// 	},
			// 	dataType: 'json',
			// 	success: (res) => {
			// 		//var result = JSON.parse(res.data.projectList);
			// 		console.log(res)
			// 	}
			// });

			// // 上传图片至服务器
			// uni.uploadFile({
			//     url: 'http://8.136.216.96:8086/ContentReleasePage/dynamic', 
			//     files: this.images,
			//     success: (uploadFileRes) => {
			//         console.log(uploadFileRes.data);
			//     }
			// });
			// //上传其他信息

			// 跳转至首页
			uni.switchTab({
				url:"../Index_Recommend/Index_Hot"
			})
		}
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
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
</style>
