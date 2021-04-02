<template>
	<view>
		<view class="popcoser-wraper">
			<view class="popcoser-serch-box" @click="popcoserSearch">
				<view class="popcoser-search-Icon">
					<slot class="search-icon">
						<view :class="['fa','fa-search']" class="searchIcon-style"></view>
					</slot>
				</view>
				<input disabled="true" placeholder="搜索Coser" placeholder-class="popcoser-search-fs" />
			</view>
			<view class="CoserInfo-box">
				<view class="Infobox-head">
					<view class="Infobox-head-left">
						<image src="../../static/CoserlistSource/Coser-infobox-left.png" class="Infobox-leftimg">
						</image>
						<text class="Infobox-leftFont">入驻Coser</text>
					</view>
					<view class="Infobox-head-right">成为入驻Coser</view>
				</view>
				<view class="Infobox-down">
					<view class="user-info-box" v-for="(item,index) in showThree" :key="index">
						<image class="user-info-box-headimg" :src="item.headimg_url" mode="aspectFill"></image>
						<text class="user-info-box-name">{{item.username}}</text>
					</view>
					<view class="view-more-Coser">
						<view class="moreCoser-Icon">· · ·</view>
						<text class="user-info-box-name">查看更多</text>
					</view>
				</view>
			</view>
			<view class="CoserList-box">
				<view class="CoserListbox-head">
					<view class="ListTab-item" v-for="(item,index) in listTabsType" :key="index" :id="index"
						@click="tabTap">
						<text class="ListTabs-title"
							:class="tabIndex == index ? 'ListTabs-title-active' : ''">{{item}}</text>
					</view>
				</view>
				<view class="CoserListbox-mid">
					<view class="Coser-Items">
						<view class="img-wrapper-1">
							<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoList[4].headimg_url">
							</image>
						</view>
						<text>{{userInfoList[1].username}}</text>
						<text>🔥{{userInfoList[1].popularity_values}}</text>
					</view>
					<view class="Coser-Items">
						<view class="img-wrapper-2">
							<image mode="aspectFill" class="CoserItem-img-First" :src="userInfoList[3].headimg_url">
							</image>
						</view>
						<text>{{userInfoList[0].username}}</text>
						<text>🔥{{userInfoList[0].popularity_values}}</text>
					</view>
					<view class="Coser-Items">
						<view class="img-wrapper-3">
							<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoList[5].headimg_url">
							</image>
						</view>
						<text>{{userInfoList[2].username}}</text>
						<text>🔥{{userInfoList[2].popularity_values}}</text>
					</view>
				</view>
				<view class="CoserListbox-down">
					<uni-list class="CoserListbox-down-list" :border="false">
						<uni-list-item  v-for="(item,index) in FourToSix" :key="index" direction="row" :title="item.username" :ellipsis="1">
							<view slot="header" class="CoserListbox-down-header">
								<text class="CoserListbox-down-header-text">{{index+4}}</text>
							</view>
							<view slot="body" class="CoserListbox-down-body">
								<image :src="item.headimg_url" class="CoserListbox-down-body-avatar" mode="aspectFill">
								</image>
								<text class="CoserListbox-down-body-name">{{item.username}}</text>
							</view>
							<view slot="footer" class="CoserListbox-down-footer">
								<text class="CoserListbox-down-footer-text">🔥人气值</text>
								<text class="CoserListbox-down-footer-popNum">{{item.popularity_values}}</text>
							</view>
						</uni-list-item>
					</uni-list>
					<uni-load-more status="noMore"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listTabsType: ['总榜', '周榜'],
				tabIndex: 0,
				userInfoList: [{
						user_id: 1,
						headimg_url: '../../static/CoserlistSource/userheadimg1.jpg',
						username: '嘉Sama',
						popularity_values: 5947
					},
					{
						user_id: 2,
						headimg_url: '../../static/CoserlistSource/userheadimg2.jpg',
						username: '夜呀_mm',
						popularity_values: 4747
					},
					{
						user_id: 3,
						headimg_url: '../../static/CoserlistSource/userheadimg3.jpg',
						username: '青玉子sei',
						popularity_values: 3947
					},
					{
						user_id: 4,
						headimg_url: '../../static/CoserlistSource/userheadimg4.jpg',
						username: '小娜',
						popularity_values: 3256
					},
					{
						user_id: 5,
						headimg_url: '../../static/CoserlistSource/userheadimg5.jpg',
						username: '奈奈喵',
						popularity_values: 2756
					},
					{
						user_id: 6,
						headimg_url: '../../static/CoserlistSource/userheadimg6.jpg',
						username: '国际巨星',
						popularity_values: 2733
					},
					{
						user_id: 7,
						headimg_url: '../../static/CoserlistSource/userheadimg7.jpg',
						username: 'abcde',
						popularity_values: 1236
					},
					{
						user_id: 8,
						headimg_url: '../../static/CoserlistSource/userheadimg7.jpg',
						username: 'roserrrr',
						popularity_values: 1235
					},
					{
						user_id: 9,
						headimg_url: '../../static/CoserlistSource/userheadimg7.jpg',
						username: '12344',
						popularity_values: 1234
					},
				]
			}
		},
		methods: {
			popcoserSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			tabTap(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			}
		},
		computed: {
			showThree() {
				return this.userInfoList.filter((data, index) => {
					return index < 3;
				})
			},
			FourToSix() {
				return this.userInfoList.filter((data, index) => {
					return index >= 3;
				})
			}
		}
	}
</script>

<style>
	page {
		background-image: url(../../static/backgroundImg/bg3.png);
		background-size: contain;
		background-repeat: no-repeat;
	}


	.popcoser-wraper {
		width: 100%;
		height: 100%;
	}

	.popcoser-serch-box {
		display: flex;
		flex-direction: row;
		border-style: none;
		border-width: 2rpx;
		background-color: rgba(223, 223, 223, 0.4);
		border-radius: 50rpx;
		text-align: center;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30rpx;
	}

	input {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 20rpx;
	}

	.popcoser-search-fs {
		font-size: 30rpx;
		color: #797979;
		margin-right: auto;
		width: auto;
	}

	.popcoser-search-Icon {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
	}

	.searchIcon-style {
		color: #797979;
		font-size: 30rpx;
	}

	.CoserInfo-box {
		display: flex;
		flex-direction: column;
		border-style: none;
		border-radius: 50rpx;
		margin-top: 30rpx;
		background-color: #FFFFFF;
		height: 280rpx;
		box-shadow: 0 0 4rpx 4rpx rgba(199, 199, 199, 0.35);
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}

	.Infobox-head {
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}

	.Infobox-head-left {
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 200rpx;
		margin-left: 20rpx;
	}

	.Infobox-leftimg {
		width: 40rpx;
		height: 40rpx;
		margin-top: auto;
		margin-bottom: auto;
	}

	.Infobox-leftFont {
		font-size: 30rpx;
		color: #F0CFED;
		margin-top: auto;
		margin-bottom: auto;
	}

	.Infobox-head-right {
		font-size: 20rpx;
		color: rgba(255, 110, 162, 0.6);
		border-style: solid;
		border-radius: 10rpx;
		border-width: 2rpx;
		margin-top: auto;
		margin-bottom: auto;
		padding: 5rpx 10rpx 5rpx 10rpx;
		margin-left: auto;
		margin-right: 20rpx;
	}

	.Infobox-down {
		display: flex;
		flex-direction: row;
		margin-top: auto;
		margin-bottom: auto;
		width: 95%;
		align-items: center;
	}

	.user-info-box {
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
	}

	.user-info-box-headimg {
		width: 110rpx;
		height: 110rpx;
		border-style: none;
		border-radius: 55rpx;
	}

	.user-info-box-name {
		font-size: 25rpx;
		color: #797979;
		text-align: center;
		margin-top: 5rpx;
	}

	.moreCoser-Icon {
		width: 80rpx;
		height: 80rpx;
		border-style: none;
		border-radius: 40rpx;
		background-color: #F2A3C3;
		/* text-align: center;*/
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		font-size: 30rpx;
	}

	.CoserList-box {
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
	}

	.CoserListbox-head {
		display: flex;
		flex-direction: row;
		margin-left: auto;
		margin-right: auto;
	}

	.ListTab-item {
		margin-right: 20rpx;
		margin-left: 20rpx;
	}

	.ListTabs-title {
		font-size: 36rpx;
		color: #797979;
	}

	.ListTabs-title-active {
		font-size: 42rpx;
		color: #080808;
	}

	.CoserListbox-mid {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: space-around;
		margin-top: 30rpx;
	}

	.Coser-Items {
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 30rpx;
	}

	.CoserItem-img-Other {
		width: 134rpx;
		height: 134rpx;
		border-style: none;
		border-radius: 72rpx;
	}

	.CoserItem-img-First {
		width: 186rpx;
		height: 186rpx;
		border-style: none;
		border-radius: 100rpx;
	}

	.img-wrapper-1 {
		/* background-image: url(../../static/CoserlistSource/皇冠2.jpg);
		background-position: center;
		background-size: 300rpx 300rpx; */
	}

	.img-wrapper-2 {}

	.img-wrapper-3 {}

	.CoserListbox-down {
		margin-top: 30rpx;
	}

	.CoserListbox-down-body-avatar {
		width: 114rpx;
		height: 114rpx;
		border-style: none;
		border-radius: 20rpx;
	}

	.CoserListbox-down-header {
		margin-top: auto;
		margin-bottom: auto;
		font-size: 34rpx;
		color: #333333;
	}

	.CoserListbox-down-footer {
		margin-top: auto;
		margin-bottom: auto;
		font-size: 28rpx;
		color: #AAAAAA;
		margin-left: auto;
	}

	.CoserListbox-down-body {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: auto;
		margin-left: 40rpx;
	}

	.CoserListbox-down-footer-popNum {
		font-size: 30rpx;
		color: #F59A23;
		margin-left: 10rpx;
	}

	.CoserListbox-down-body-name {
		font-size: 28rpx;
		margin-left: 20rpx;
	}
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
	.uni-list--border {
		position: absolute;
		top: 0;
		right: 0;
		left: 25px;
		/* #ifdef APP-NVUE */
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
	}
	.uni-list--border:after {
		position: absolute;
		top: 0;
		right: 0;
		left: 25px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: $uni-border-color;
	}
</style>
