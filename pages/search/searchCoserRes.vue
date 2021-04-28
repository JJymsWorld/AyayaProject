<template>
	<view class="box">
		<view class="navigate-box">

		</view>
		<view class="search-box">
			<uni-search-bar @confirm="onSearch" :radius="30" @cancel="onGoBack" :value="value" cancelButton="always"></uni-search-bar>
		</view>
		
		<view class="row-box">
			<!-- 用户页面 -->
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :border="false" direction="column" v-for="(item,index) in CoserInfoList" :key="index"
						class="StayInCoser-List-item" >
						<view slot="header" class="StayInCoser-item">
							<image :src="item.Coser_avatar" class="StayInCoser-item-avatar" mode="aspectFill" @click="gotoUserHomePage"></image>
							<view class="StayInCoser-item-info">
								<view class="StayInCoser-item-nameandlikenum">
									<text @click="gotoUserHomePage">{{item.Coser_name}}</text>
									<view>
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.Coser_likeNum}}</text>
									</view>
								</view>
								<view class="StayInCoser-item-position" @click="gotoUserHomePage">
									<uni-icons type="location-filled"></uni-icons>
									<text>{{item.Coser_city}}</text>
								</view>
								<text @click="gotoUserHomePage" class="StayInCoser-item-intro">个人介绍:{{item.Coser_intro}}</text>
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
						Coser_name: "Coser1111",
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
			}
		},
		onLoad(option) {
			this.value = option.label
		},
		methods: {
			onSearch: function(e) {
				this.value = e.value
				console.log(this.value)
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
			},
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
			}
		}
	}
</script>

<style>
	@import url("./searchRes.css");
</style>
