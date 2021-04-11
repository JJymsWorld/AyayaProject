<template>
	<view class="box">
		<view class="navigate-box">

		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" @cancel="onGoBack" :value="value"></uni-search-bar>
		</view>
		<view class="row-box tab-box">
			<view v-for="(tab,index) in tabBars" :key="index" :id='index' class='uni-tab-item' @click="ontabtap">
				<text class="uni-tab-item-title"
					:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab}}</text>
			</view>
			<view class="line-h"></view>
		</view>
		<view class="row-box user-box" v-if='tabIndex == 0'>
			<!-- 综合页面 -->

			<!-- 用户头像 -->
			<view class="recentBox">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
					<span v-for="(item,index) in recentUser" :key='index'>
						<image :src="item.avatarT"></image>
						<view>{{item.usernameT}}</view>
					</span>
				</scroll-view>
			</view>
			<!-- 作品页面 -->
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="index" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text">{{item.text}}</view>
							<view class="List-article">{{item.article}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.interestNum}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commentNum}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="row-box" v-if='tabIndex == 1'>
			<!-- 作品页面 -->
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="(item, index) in SearchWorksList"
					:key="index" :title="item.text">
					<!-- 左边作品图片 -->
					<template v-slot:body>
						<view class="Img-In-List">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
					<!-- 右边作品信息 -->
					<template v-slot:footer>
						<view class="slot-footer-box">
							<view class="List-text">{{item.text}}</view>
							<view class="List-article">{{item.article}}</view>
							<view class="List-Icon">
								<view class="like-box">
									<image class='littleIcon' src='../../static/icon/like.png'></image>
									<text class="number">{{item.interestNum}}</text>
								</view>
								<view class="chat-box">
									<image class='littleIcon' src="../../static/icon/chat.png"></image>
									<text class="number">{{item.commentNum}}</text>
								</view>
								<view class="relay-box">
									<image class='littleIcon' src="../../static/icon/relay.png"></image>
									<text class="number">{{item.relayNum}}</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="row-box" v-if='tabIndex == 2'>
			<!-- 用户页面 -->
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :border="false" direction="column" v-for="(item,index) in CoserInfoList" :key="index"
						class="StayInCoser-List-item">
						<view slot="header" class="StayInCoser-item">
							<image :src="item.Coser_avatar" class="StayInCoser-item-avatar" mode="aspectFill"></image>
							<view class="StayInCoser-item-info">
								<view class="StayInCoser-item-nameandlikenum">
									<text>{{item.Coser_name}}</text>
									<view>
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.Coser_likeNum}}</text>
									</view>
								</view>
								<view class="StayInCoser-item-position">
									<uni-icons type="location-filled"></uni-icons>
									<text>{{item.Coser_city}}</text>
								</view>
								<text class="StayInCoser-item-intro">个人介绍:{{item.Coser_intro}}</text>
							</view>
							<view class="StayInCoser-item-likebutton">
								<!-- <button class="StayInCoser-item-likebutton-btn">关注</button> -->
								<uni-fav :checked="item.checked" star="false" :contentText="contentText"
									bgColor="#EC808D" bgColorChecked="#797979" @click="LikeBtnClick(index)"
									fgColor="#333333"></uni-fav>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				value: "",
				tabBars: ["综合", "作品", "用户"],
				tabIndex: 0,
				recentUser: [{
						avatarT: '../../static/iconn/p2.jpg',
						usernameT: '蒲儿姓蒲'
					},
					{
						avatarT: '../../static/iconn/p3.jpg',
						usernameT: 'Suzy_Z'
					},
					{
						avatarT: '../../static/iconn/p2.jpg',
						usernameT: '机智的党妹'
					}
				],
				dynamicItem: [{
					avatarD: '../../static/iconn/p2.jpg',
					usernameD: '机智的党妹',
					date: '2020-06-25',
					title: '点赞表态!',
					imageD: '../../static/iconn/d1.jpg',
					textD: '蜜瓜JK妆！毕业要和姐妹去迪士尼拍照呀!',
					interestNum: '5482',
					commentNum: '2145',
					relayNum: '1141'
				}],
				CoserInfoList: [{
						Coser_id: 1,
						Coser_name: "Coser1",
						Coser_avatar: "../../static/CoserlistSource/avatar1.jpg",
						Coser_intro: "底层泥坑里滚爬的一只小可爱",
						Coser_city: "杭州市",
						Coser_likeNum: 2568,
						Coser_work1: "../../static/contentImg/2.jpg",
						Coser_work2: "../../static/contentImg/3.jpg",
						Coser_work3: "../../static/contentImg/4.jpg",
						checked: false
					},
					{
						Coser_id: 2,
						Coser_name: "Coser2",
						Coser_avatar: "../../static/CoserlistSource/avatar2.jpg",
						Coser_intro: "底层泥坑里滚爬的一只小可爱",
						Coser_city: "杭州市",
						Coser_likeNum: 2568,
						Coser_work1: "../../static/contentImg/2.jpg",
						Coser_work2: "../../static/contentImg/3.jpg",
						Coser_work3: "../../static/contentImg/4.jpg",
						checked: false
					}
				],
				contentText: {
					contentDefault: '关注',
					contentFav: '已关注'
				},
				SearchWorksList: [{
						image_url: '../../static/HotListImg/1.jpg',
						text: '蜜瓜JK妆!毕业要和姐妹去迪斯尼拍照呀!',
						article: '机智的党妹',
						interestNum: '5482',
						commentNum: '2145',
						relayNum: '1141'
					},
					{
						image_url: '../../static/HotListImg/2.jpg',
						text: '江南美人图|奇迹团团环游中华之乌镇',
						article: '机智的党妹',
						interestNum: '5482',
						commentNum: '2145',
						relayNum: '1141'
					}
				]
			}
		},
		onLoad(option) {
			this.value = option.value
		},
		methods: {
			onSearch: function(e) {
				this.value = e.value
				console.log(this.value)
				// 跳转至搜索结果页面
				uni.navigateTo({
					url: './searchRes'
				})
			},
			// 清空搜索历史
			delHsty: function() {
				console.log('清空搜索历史')
			},
			ontabtap: function(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
			// 返回前一页面
			onGoBack: function() {
				console.log('cancel')
				uni.navigateBack({

				})
			},
			LikeBtnClick: function(e) {
				this.CoserInfoList[e].checked = !this.CoserInfoList[e].checked
				console.log(e, this.CoserInfoList[e].checked)
			}
		}
	}
</script>

<style>
	@import url("./searchRes.css");
</style>
