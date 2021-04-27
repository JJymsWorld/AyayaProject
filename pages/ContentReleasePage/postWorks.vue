<template>
	<view class="box">
		<!-- 至少选择一张图片上传 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请至少选择一张图片上传哦～" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 至少选择发往的圈子 -->
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请至少勾选一个发往的圈子" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 请先同意《用户自制内容协议》 -->
		<uni-popup ref="popup3" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="请先同意《用户自制内容协议》" :before-close="true" @close="close"
				@confirm=""></uni-popup-dialog>
		</uni-popup>
		<!-- 是否发布动态 -->
		<uni-popup ref="popup4" type="dialog">
			<uni-popup-dialog type="info" mode="base" content="确认发布作品吗？" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<view class="my-content">
			<!-- 图片 -->
			<view class="row-box choose-image-box">
				<g-upload ref='gUpload' @chooseFile='onChooseImage' @imgDelete='onDeleteImage' :columnNum="columnNum"
					:maxCount='maxCount'></g-upload>
			</view>
			<!-- 来个醒目的标题吧！ -->
			<view class="row-box">
				<view class="works-title">
					<input type="text" value="" placeholder="来个醒目的标题吧！" @input="onTitleInput" />
				</view>
			</view>
			<!-- 内容 -->
			<view class="row-box">
				<view class="content-item">
					<text>出镜：</text>
					<view class="chooseAt-box" @click="onChooseAt(1)">
						<text class="at-text" v-if="this.worksContent[1].atPerson == ''">@</text>
						<text class="chooseAt-box-placehold" v-if="this.worksContent[1].atPerson == ''">仅限关注列表</text>
						<text class="at-text">{{this.worksContent[1].atPerson}}</text>
					</view>
				</view>
				<view class="content-item">
					<text>摄影：</text>
					<view class="chooseAt-box" @click="onChooseAt(2)">
						<text class="at-text" v-if="this.worksContent[2].atPerson == ''">@</text>
						<text class="chooseAt-box-placehold" v-if="this.worksContent[2].atPerson == ''">仅限关注列表</text>
						<text class="at-text">{{this.worksContent[2].atPerson}}</text>
					</view>
				</view>
				<view class="content-item">
					<text>妆容：</text>
					<view class="chooseAt-box">
						<text class="chooseAt-box-placehold" v-if="this.worksContent[3].makeupLabels.length == 0"
							@click="onChooseCollection">～仅限收藏列表</text>
						<robby-tags v-model="worksContent[3].makeupLabels" @delete="delTag"
							@click="onChooseCollection" :enable-del="enableDel"></robby-tags>
					</view>
				</view>
				<view class="content-item">
					<text>服饰：</text>
					<view class="chooseAt-box" @click="onEditCloth">
						<text class="chooseAt-box-placehold"
							v-if="this.worksContent[4].clothLabels == ''">～点击编辑服饰链接</text>
						<text class="at-text">{{this.worksContent[4].clothLabels}}</text>
					</view>
				</view>
			</view>
			<!-- 内容和正文一样重要哦！ -->
			<view class="row-box">
				<view class="works-article">
					<textarea type="text" :value="this.worksContent[5].article" placeholder="正文和内容一样重要哦！"
						@input="onArticleInput" />
				</view>
			</view>
			<!-- 发往圈子 -->
			<view class="row-box checked-box">
				<view class="checked-group-title">发往圈子</view>
				<!-- 选项卡 -->
				<view class="checked-group">
					<checkbox-group @change="onGetClass">
						<label class="checked-item" v-for="(item, index) in myclass" :key="index">
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
				<image src="@/static/at.png" mode="widthFix" @click="onChooseAt(5)"></image>
				<image src="@/static/addlabel.png" mode="widthFix" @click="onChooseLabel"></image>
				<label>
					<radio :checked="ifpostdynamic" @click="onChangePostDynamic" />同时发布动态
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import robbyTags from '@/components/robby-tags/myrobby-tags.vue'
	export default {
		data() {
			return {
				enableDel: true,
				enableAdd: false,
				tagList: ['建筑', '动漫', '艺术'],
				ifagree: false,
				ifpostdynamic: false, // 是否同时发布动态
				ifdownloadimag: false,
				columnNum: 4, //	上传图片显示几列
				maxCount: 9, //	最多上传图片数量
				images: [],
				index: 0, //	标记 出镜/摄影/妆容/服饰等跳转入口
				workClass: [], //	标记作品发往的圈子
				worksContent: [{
						name: '标题',
						title: '',
					},
					{
						name: '出镜',
						atPersonList: [],
						atPerson: '',
					},
					{
						name: '摄影',
						atPersonList: [],
						atPerson: '',
					},
					{
						name: '妆容',
						makeupList: [],
						makeupLabels: []
					},
					{
						name: '服饰',
						clothList: [],
						clothLabels: ''
					},
					{
						name: '正文',
						article: '',
						atPerson: '',
					}
				],
				myclass: [{
						name: "cosplay"
					},
					{
						name: "汉服圈"
					},
					{
						name: "Lolita"
					},
					{
						name: "JK"
					},
					{
						name: "妆容"
					},
					{
						name: "服装"
					}
				]
			}
		},
		components: {
			robbyTags
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
			},
			// 编辑标题内容
			onTitleInput: function(e) {
				this.worksContent[0].title = e.detail.value
			},
			// @出镜摄影用户
			onChooseAt: function(i) {
				this.index = i
				const that = this
				uni.navigateTo({
					url: './at',
					// animationType:'slide-in-right',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('emitAtPersonList', {
							index: that.index,
							atPersonList: that.worksContent[i].atPersonList
						})
					}
				})
			},
			// 选择热门话题
			onChooseLabel: function() {
				uni.navigateTo({
					url: './label',
					// animationType:'slide-in-right',
				})
			},
			// 选择收藏的妆容作品
			onChooseCollection: function() {
				uni.navigateTo({
					url: '../Mypage/myStarList/myStarList?addmakeuplabels=1',
					// animationType:'slide-in-right',
				})
			},
			// 点击标签事件
			clickTag: function(e) {
				console.log(e)
			},
			// 删除标签事件
			delTag: function(e) {
				console.log(e)
			},
			// 编辑服饰链接
			onEditCloth: function() {
				const that = this
				uni.navigateTo({
					url: './clothLink',
					// animationType:'slide-in-right',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('emitClothLink', {
							clothList: that.worksContent[4].clothList
						})
					}
				})
			},
			// 编辑正文内容
			onArticleInput: function(e) {

				this.worksContent[5].article = e.detail.value
				console.log(this.worksContent[5].article)
			},
			// 获取发往的圈子
			onGetClass: function(e) {

				this.workClass = e.detail.value
				console.log(this.workClass)

			},
			// 取消对话框
			close: function(done) {
				done()
			},
			// 确认发布作品
			confirm: function() {
				// uni.uploadFile({
				//     url: 'http://81.68.73.252:8086/ContentReleasePage/works', 
				//     files: this.images,
				// 	formData: {
				// 		'accountA': 0,	// coserID
				// 		'accountB': 0,	// 摄影师ID
				// 		'clothingId': 0,		// 服饰id
				// 		'mainBody': 'test',	// 正文
				// 		'makeupId': 0,	// 妆容ID
				// 		'title': this.worksContent[0].title	// 标题
				// 		'type': 0, // 发往圈子id
				// 	},
				//     success: (uploadFileRes) => {
				//         console.log(uploadFileRes.data);
				//     }
				// });

				// 跳转至个人主页
				uni.redirectTo({
					url: '../Mypage/homePage/homePage?showToast=2'
				});
			}
		},
		// 页面导航栏按钮点击事件
		onNavigationBarButtonTap() {
			// 如果未选择图片
			if (this.images.length == 0) {
				this.$refs.popup1.open()
			}
			// 如果未勾选任何一个发往圈子
			else if (this.workClass.length == 0) {
				this.$refs.popup2.open()
			}
			// 如果未同意《用户自制内容协议》
			else if (!this.ifagree) {
				this.$refs.popup3.open()
			} else {
				this.$refs.popup4.open()
			}
		},
		onShow() {
			if(this.worksContent[3].makeupLabels.length != 0){
				
				this.enableAdd = true
				console.log(this.enableAdd)
			}
			// 监听@用户事件
			uni.$on("emitChoosePersonName", res => {
				const i = res.index
				this.index = i
				this.worksContent[i].atPerson = res.choosePersonName
				this.worksContent[i].atPersonList = res.atPersonList
				if (i == 5) {
					this.worksContent[i].article += res.choosePersonName
				}
				console.log(this.worksContent[i].atPerson)
				// 清除监听
				uni.$off("emitChoosePersonName");
			})

			// 监听编辑妆容链接事件
			uni.$on("emitmakeuplabels", res => {
				this.worksContent[3].makeupLabels.push(res.title)
				console.log(this.worksContent[3].makeupLabels)
				// 清除监听
				uni.$off("emitmakeuplabels");
			})

			// 监听编辑服饰链接事件
			uni.$on("emitClothLabels", res => {
				console.log(res.clothLabels)
				this.worksContent[4].clothLabels = res.clothLabels
				this.worksContent[4].clothList = res.clothList
				// 清除监听
				uni.$off("emitClothLabels");
			})

			// 监听获取热门话题标签事件
			uni.$on("emitAddHotTopic", res => {
				this.worksContent[5].article += res.label
				console.log(this.article)
				// 清除监听
				uni.$off("emitAddHotTopic");
			})
		},
		onLoad(option) {
			console.log(option)
		}
	}
</script>

<style>
	@import url("../../static/css/login.css");
	@import url("./post.css");
</style>
