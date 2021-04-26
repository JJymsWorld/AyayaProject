<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable @click="" class="message-item" :border="false" :ellipsis='2' direction="row" v-for="(item, index) in collectList" :key="index">
				<!-- 左边头像 -->
				<template v-slot:body>
					<view class="message-item-lbox" @click="gotoUserHomePage">
						<image src="../../static/image1.png" mode="widthFix"></image>
					</view>
				</template>
				<!-- 右边信息 -->
				<template v-slot:footer>
					<view class="message-item-rbox">
						<view class="message-item-rbox-left">
							<view class="">
								<text @click.stop="gotoUserHomePage">机智的党妹</text>
							</view>
							<view class="">
								<text class="text2">对方关注了你～</text>
							</view>
							<view class="">
								<text class="text2">2020-12-08  21：33</text>
							</view>
						</view>
						<view class="message-item-rbox-right">
							<uni-fav :checked="item.checked" star="false" :contentText="contentText" bgColor="#EC808D" bgColorChecked="#797979" @click="LikeBtnClick(index)" fgColor="#333333"></uni-fav>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectList: [{
					username: '',	// 对方用户昵称
					userid: '',		// 对方用户ID
					userimage: '',		// 对方用户头像
					type: 0,	// 表示赞或收藏 0为赞 1为收藏
					time: '2020-12-08  21：33',		// 时间
					workID: 0,	// 动态ID
					dynamicID: 0,	// 作品ID
					picture: '',  // 动态/作品的第一张图
					checked: false	// 是否关注对方
				}],
				contentText:{
					contentDefault: '关注',
					contentFav: '已关注'
				}
			}
		},
		methods: {
			// 进入用户个人主页
			gotoUserHomePage: function(){
				uni.navigateTo({
					url: '../Mypage/homePage/homePage'
				})
			},
			// 进入作品详情页面
			gotoWorkPage: function(){
				uni.navigateTo({
					url: '../works/works'
				})
			},
			// 进入动态详情页面
			gotoDynamicPage: function(){
				uni.navigateTo({
					url: '../DynamicPage/dynamicDetails'
				})
			},
			// 改变关注状态
			LikeBtnClick(e) {
				this.collectList[e].checked = !this.collectList[e].checked
				console.log(e,this.collectList[e].checked)
				
				// 关注
				if(this.collectList[e].checked){
					
				}
				else{	// 取消关注
					
				}
			},
		},
	}
</script>
	
<style lang="scss" scoped>
	@import url("./collectmsg.css");
</style>
