<template>
	<view class="box">
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box choose-image-box">
				<g-upload ref='gUpload' @chooseFile='onChooseImage' @imgDelete='onDeleteImage' :columnNum="columnNum" :maxCount='maxCount'></g-upload>
			</view>
			<!-- 来个醒目的标题吧！ -->
			<view class="row-box">
				<view class="works-title">
					<input type="text" value="" placeholder="来个醒目的标题吧！"/>
				</view>
			</view>
			<!-- 内容 -->
			<view class="row-box">
				<view class="content-item">
					<text>出镜：</text>
					<text class="at-text">@</text>
					<input type="text" value="" placeholder="仅限关注列表"/>
				</view>
				<view class="content-item">
					<text>摄影：</text>
					<text class="at-text">@</text>
					<input type="text" value="" placeholder="仅限关注列表"/>
				</view>
				<view class="content-item">
					<text>妆容：</text>
					<text class="at-text">@</text>
					<input type="text" value="" placeholder="仅限收藏列表"/>
				</view>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" value="" placeholder="正文和内容一样重要哦！" />
				</view>
			</view>
			<!-- 发往圈子 -->
			<view class="row-box checked-box">
				<view class="checked-group-title">发往圈子</view>
				<!-- 选项卡 -->
				<view class="checked-group">
					<checkbox-group name="" v-for="(item, index) in myclass" :key="index">
						<label class="checked-item">
							<checkbox :value="item.name" />
							<text>{{item.name}}</text>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<!-- 同意用户自制内容协议 -->
		<view class="my-content">
			<view class="row-box agree-box">
				同意<text>《用户自制内容协议》</text>
				<label><radio :checked="ifagree" @click="onChangeAgree"/></label>
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
				<switch :checked="ifdownloadimag" @change="onChangeLimit" color="rgba(248, 93, 159, 0.8)"/>
			</view>
		</view>
		<view class="line"></view>
		<!-- 底部固定栏 -->
		<view class="fixed-bottom-box">
			<view class="row-box bottom-box">
				<image src="@/static/at.png" mode="widthFix"></image>	
				<image src="@/static/addlabel.png" mode="widthFix"></image>
				<label><radio :checked="ifpostdynamic" @click="onChangePostDynamic"/>同时发布动态</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifagree: false,
				ifpostdynamic: false,
				ifdownloadimag: false,
				columnNum : 4,	//	上传图片显示几列
				maxCount: 9,	//	最多上传图片数量
				images: [],
				worksContent: [
				{
					name: '标题'
				},
				{
					name: '出镜'
				},
				{
					name: '摄影'
				},
				{
					name: '妆容'
				},
				{
					name: '正文'
				}
				],
				myclass: [{
					name:"cosplay"
				},
				{
					name:"汉服圈"
				},
				{
					name:"Lolita"
				},
				{
					name:"JK"
				},
				{
					name:"妆容"
				},
				{
					name:"服装"
				}]
			}
		},
		methods: {
			onChangeAgree: function(){
				this.ifagree = !this.ifagree;
			},
			onChangePostDynamic: function(){
				this.ifpostdynamic = !this.ifpostdynamic;
			},
			onChangeLimit: function(){
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
			onDeleteImage: function(list, v){
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
		onNavigationBarButtonTap(){
			// 上传图片至服务器
			uni.uploadFile({
			    url: 'http://8.136.216.96:8086/img_post', 
			    files: this.images,
			    success: (uploadFileRes) => {
			        console.log(uploadFileRes.data);
			    }
			});
			//上传其他信息
			
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
</style>
