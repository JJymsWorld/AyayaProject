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
					<input type="text" value="" placeholder="来个醒目的标题吧！" @input="onTitleInput"/>
				</view>
			</view>
			<!-- 内容 -->
			<view class="row-box">
				<view class="content-item">
					<text>出镜：</text>
					<view class="chooseAt-box"  @click="onChooseAt(1)">
						<text class="at-text" v-if="this.worksContent[1].atPerson == ''">@</text>
						<text class="chooseAt-box-placehold" v-if="this.worksContent[1].atPerson == ''">仅限关注列表</text>
						<text class="at-text">{{this.worksContent[1].atPerson}}</text>
					</view>
				</view>
				<view class="content-item">
					<text>摄影：</text>
					<view class="chooseAt-box"  @click="onChooseAt(2)">
						<text class="at-text" v-if="this.worksContent[2].atPerson == ''">@</text>
						<text class="chooseAt-box-placehold" v-if="this.worksContent[2].atPerson == ''">仅限关注列表</text>
						<text class="at-text">{{this.worksContent[2].atPerson}}</text>
					</view>
				</view>
				<view class="content-item">
					<text>妆容：</text>
					<view class="chooseAt-box"  @click="onChooseCollection">
						<text class="at-text" v-if="this.worksContent[3].atPerson == ''">@</text>
						<text class="chooseAt-box-placehold" v-if="this.worksContent[3].atPerson == ''">仅限收藏列表</text>
						<text class="at-text">{{this.worksContent[3].atPerson}}</text>
					</view>
				</view>
				<view class="content-item">
					<text>服饰：</text>
					<view class="chooseAt-box"  @click="onEditCloth">
						<text class="chooseAt-box-placehold" v-if="this.worksContent[3].atPerson == ''">～点击编辑服饰链接</text>
						<text class="at-text">{{this.worksContent[3].atPerson}}</text>
					</view>
				</view>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" :value="this.worksContent[5].article" placeholder="正文和内容一样重要哦！" @input="onArticleInput"/>
				</view>
			</view>
			<!-- 发往圈子 -->
			<view class="row-box checked-box">
				<view class="checked-group-title">发往圈子</view>
				<!-- 选项卡 -->
				<view class="checked-group">
					<checkbox-group @change="onGetClass">
						<label class="checked-item" v-for="(item, index) in myclass" :key="index" >
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
				<image src="@/static/at.png" mode="widthFix" @click="onChooseAt(5)"></image>	
				<image src="@/static/addlabel.png" mode="widthFix" @click="onChooseLabel"></image>
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
				index: 0,	//	标记 出镜/摄影/妆容/服饰等跳转入口
				workClass: [],	//	标记作品发往的圈子
				worksContent: [
				{
					name: '标题',
					title: '',
				},
				{
					name: '出镜',
					atPerson: '',
				},
				{
					name: '摄影',
					atPerson: '',
				},
				{
					name: '妆容',
					atPerson: ''
				},
				{
					name: '服饰',
				},
				{
					name: '正文',
					article: '',
					atPerson: '',
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
			},
			// 编辑标题内容
			onTitleInput: function(e){
				this.worksContent[0].title = e.detail.value
			},
			// @出镜摄影用户
			onChooseAt: function(i){
				this.index = i
				console.log(i)
				uni.navigateTo({
					url: './at?index=' + this.index,
					// animationType:'slide-in-right',
				})
			},
			// 选择热门话题
			onChooseLabel: function(){
				uni.navigateTo({
					url: './label',
					// animationType:'slide-in-right',
				})
			},
			// 选择收藏的妆容作品
			onChooseCollection: function(){
				uni.navigateTo({
					url: '../Mypage/myStarList/myStarList',
					// animationType:'slide-in-right',
				})
			},
			// 编辑服饰链接
			onEditCloth: function(){
				
			},
			// 编辑正文内容
			onArticleInput: function(e){
				
				this.worksContent[5].article = e.detail.value
				
			},
			// 获取发往的圈子
			onGetClass: function(e){
				
				this.workClass = e.detail.value
				console.log(this.workClass)
				
			},
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
		},
		onShow(){
			uni.$on("emitChoosePersonName",res => {
				const i = res.index
				this.index = i
				this.worksContent[i].atPerson = res.choosePersonName
				if(i == 5){
					this.worksContent[i].article += res.choosePersonName
				}
				console.log(this.worksContent[i].atPerson)
				// 清除监听
				uni.$off("emitChoosePersonName");
			})
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	@import url("./post.css");
</style>
