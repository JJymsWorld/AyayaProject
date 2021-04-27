<template>
	<view>
		<!-- 头像 昵称部分 -->
		<view class="headBox">
			<image :src="avatarD"></image>
			<view class="headBoxText">
				<view>{{usernameD}}</view>
				<view>{{date}}</view>
			</view>
		</view>
		<!-- 头像 昵称部分 end-->

		<!-- 正文部分 -->
		<view class="TextBox">{{textD}}</view>
		<!-- 正文部分 -->

		<!-- 内容部分 -->
		<view class="gridImageBox">
			<gridBox :picture="image"></gridBox>
		</view>
		<!-- 内容部分end -->

		<view class="blank"></view>

		<!-- 评论转发部分 -->
		<view>
			<!-- 转发 评论导航栏 -->
			<ul>
				<li :class="tag=='1'?'naviBoxNo':'naviBox'" @click="tagSelect(1)">转发 <text>{{relayNum}}</text></li>
				<li :class="tag=='0'?'naviBoxNo':'naviBox'" @click="tagSelect(0)">评论 <text>{{commentNum}}</text> </li>
			</ul>
			<!-- 评论部分 -->
			<view class="commentBox" v-if="tag=='0'">
				<uni-list :border="false">
					<uni-list-item :border="false" :ellipsis='2' direction="column" v-for="(item,index) in recomendList"
						:key='item.commentId'>
						<template slot="body" class="slot-box slot-text">
							<view class="commentItemBox">
								<image class="commentAvatar" :src="item.avatarR" @click="homepageNavi(item.userIdR)">
								</image>
								<view class="commentTextBox">
									<view class="commentUsername" @click="homepageNavi(item.userIdR)">{{item.usernameR}}
									</view>
									<view class="commentText">{{item.text}}</view>
									<view class="commentDate">{{item.date}}</view>
								</view>
								<view class="likeIcon">
									<span class="iconfont_dy">&#xe608;</span>
								</view>

							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<!-- 评论转发部分end -->

		<!-- 底部导航栏 -->
		<view class="lastBox">
			<ul>
				<li><input value="说点啥..."> </li>
				<li>
					<span v-if="isInterest==0" class="iconfont_NoSelect"
						@click="interestButton(isInterest)">&#xe785;</span>
					<span v-if="isInterest==1" class="iconfont_select"
						@click="interestButton(isInterest)">&#xe608;</span>

					<span :class="isInterest==1?'icon_number':'icon_number'">{{interestNum}}</span>
				</li>

				<li>
					<span class="iconfont_NoSelect">&#xe600;</span>
					<span style="font-size: 30rpx;">{{commentNum}}</span>
				</li>
				<li>
					<span class="iconfont_NoSelect">&#xe65f;</span>
					<span style="font-size: 30rpx;">{{relayNum}}</span>
				</li>

			</ul>
		</view>
		<view class="lastblank"></view>
		<!-- 底部导航栏 end-->
	</view>
</template>

<script>
	import gridBox from '../../components/gridImage/gridImage.vue'
	export default {
		components: {
			gridBox
		},
		data() {
			return {
				tag: '0',
				dynamicId: '1',
				userId: '',
				avatarD: '../../static/iconn/p2.jpg',
				usernameD: '机智的党妹',
				date: '2020-06-25',
				textD: '点赞表态!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
				image: [
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg',
					'../../static/iconn/d1.jpg'
				],
				work: {
					workid: '1',
					titleW: '蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
					firstImage: '../../static/iconn/d1.jpg'
				},
				imageD: '../../static/iconn/d1.jpg',
				interestNum: '5482',
				isInterest: '0',
				commentNum: '2145',
				relayNum: '1141',
				recomendList: [{
						commentId: '1',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: 0
					},
					{
						commentId: '2',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					},
					{
						commentId: '3',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					},
					{
						commentId: '4',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					},
					{
						commentId: '5',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					},
					{
						commentId: '6',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					},
					{
						commentId: '7',
						userIdR: '',
						usernameR: '机智的党妹',
						avatarR: '../../static/iconn/p2.jpg',
						date: '2020-06-25',
						text: 'LILAC热卖！！！！！！！！',
						recLike: '0'
					}
				]
			}
		},
		methods: {
			tagSelect(i) {
				this.tag = i
			},
			homepageNavi(i) {
				uni.navigateTo({
					url: '../Mypage/homePage/homePage?userID=' + i
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-list-item {
		background-color: #FBFBFB;
		padding: 0;
		padding-bottom: 0rpx;
		padding-top: 5rpx;
	}

	/deep/ .uni-list-item__container {
		background-color: #FFFFFF;
		padding: 0;

	}
</style>

<style>
	@import url("dynamicDetails.css");
</style>
