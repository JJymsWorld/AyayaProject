<template>
	<view class="box">
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box addimages-box">
				<view class="addimages-item" v-for="(item, index) in images" :key="index" >
					<image :src="item" mode="widthFix"></image>
				</view>
				<view class="addimages-item">
					<image @click="onChooseImage" src="@/static/addimages.png" mode="widthFix"></image>
				</view>
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
			onChooseImage: function(){
				uni.chooseImage({
				    count: 9, 	//默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], 	//从相册选择
				    success: res=>{
				        console.log(JSON.stringify(res.tempFiles));
						this.images = res.tempFilePaths;
					}
				});
			}
		},
		// 页面导航栏按钮点击事件
		onNavigationBarButtonTap(){
			uni.switchTab({
				url:"../Index_Recommend/Index_Hot"
			})
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	.row-box{
		width: 90%;
		padding: 5px 0;
	}
	.addimages-box{
		padding: 20px;
	}
	.addimages-item{
		float: left;
		width: 20%;
		height: 150rpx;
		border-radius: 10px;
		overflow: hidden;
		margin: 5px;
		margin-bottom: 10px;
	}
	.addimages-box image{	
		width: 20%;
	}
	.addimages-item image{
		width: 100%;
	}
	.works-title{
		border-bottom: solid 1px rgba(121, 121, 121, 0.1);
	}
	.works-title input{
		font-size: 14px;
		margin-bottom: 5px;
	}
	.content-item{
		width: 100%;
		line-height: 20px;
		margin-bottom: 5px;
		/* 分离每行元素 */
		overflow: hidden;
	}
	.content-item text{
		float: left;
		font-size: 14px;
		line-height: 20px;
	}
	.content-item .at-text{
		color: #65A6FF;
		font-weight: 700;
	}
	.content-item input{
		float: left;
		width: 70%;
		font-size: 13px;
		line-height: 20px;
	}
	.works-article textarea{
		width: 100%;
		height: 150rpx;
		font-size: 14px;
	}
	.line{
		width: 100%;
		height: 7px;
		background-color: rgba(242, 242, 242, 0.5);
	}
	.checked-box{
		padding-bottom: 30px;
	}
	.checked-group-title{
		border-bottom: solid 1px rgba(121, 121, 121, 0.1);
		margin-bottom: 10px;
		width: 100%;
		font-size: 16px;
		font-weight: 700;
		font-family: "PingFang SC";
		line-height: 30px;
	}
	.checked-item{
		width: 25%;
		height: 30px;
		float: left;
		padding: 0;
	}
	.checked-item text{
		font-size: 13px;
		color: #101010;
		font-family: "Verdana";
	}
	.checked-item checkbox{
		/* 调整多选框大小 */
		transform: scale(0.6);
	}
	.agree-box{
		font-family: 'PingFang SC';
		font-size: 15px;
		padding: 10px 0;
		font-weight: 700;
	}
	.agree-box text{
		font-family: 'PingFang SC';
		font-size: 15px;
		color: #65A6FF;
		font-weight: 700;
	}
	.agree-box label{
		float: right;
	}
	.agree-box label radio{
		/* 调整单选框大小 */
		transform: scale(0.6);
	}
	.limit-box{
		padding-bottom: 50px;
	}
	.limit-box text{
		display: block;
		font-family: 'PingFang SC';
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 10px;
		color: #101010;
	}
	.limit-box .limit-content text{
		width: 100%;
		color: #555555;
		margin-bottom: 5px;
	}
	.limit-box .limit-content .text1{
		font-size: 16px;
	}
	.limit-box .limit-content .text2{
		font-size: 13px;
		font-weight: 400;
	}
	.limit-box switch{
		float: right;
	}
	.limit-content{
		float: left;
	}
	.fixed-bottom-box{
		width: 100%;
		height: 40px;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
	}
	.bottom-box image{
		width: 40px;
	}
	.bottom-box label{
		float: right;
		font-size: 13px;
		color: #333333;
	}
	.bottom-box radio{
		/* 调整单选框大小 */
		transform: scale(0.6);
	}
</style>
