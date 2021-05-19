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
					<view class="Infobox-head-right" @click="gotoCoserIdenticate">成为入驻Coser</view>
				</view>
				<view class="Infobox-down">
					<view class="user-info-box" v-for="(item,index) in showThree" :key="index"
						@click="gotoCoserHomePage(item.user_id)">
						<image class="user-info-box-headimg" :src="item.header_Pic" mode="aspectFill"></image>
						<text class="user-info-box-name">{{item.user_name}}</text>
					</view>
					<view class="view-more-Coser" @click="gotoStayInCoserList">
						<view class="moreCoser-Icon">. . .</view>
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
				<view class="allRank" v-if="tabIndex == 0">
					<view class="CoserListbox-mid">
						<view class="Coser-Items">
							<view class="img-wrapper-1" @click="gotoCoserHomePage(userInfoList[1].user_id)">
								<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoList[1].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoList[1].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoList[1].energy}}</text>
						</view>
						<view class="Coser-Items" @click="gotoCoserHomePage(userInfoList[0].user_id)">
							<view class="img-wrapper-2">
								<image mode="aspectFill" class="CoserItem-img-First" :src="userInfoList[0].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoList[0].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoList[0].energy}}</text>
						</view>
						<view class="Coser-Items" @click="gotoCoserHomePage(userInfoList[2].user_id)">
							<view class="img-wrapper-3">
								<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoList[2].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoList[2].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoList[2].energy}}</text>
						</view>
					</view>
					<view class="CoserListbox-down">
						<uni-list class="CoserListbox-down-list" :border="false">
							<uni-list-item v-for="(item,index) in FourToSix" :key="index" direction="row"
								:title="item.user_name" :ellipsis="1"
								:to="'../Mypage/homePage/homePage?userid' + item.user_id">
								<view slot="header" class="CoserListbox-down-header">
									<text class="CoserListbox-down-header-text">{{index+4}}</text>
								</view>
								<view slot="body" class="CoserListbox-down-body">
									<image :src="item.header_Pic" class="CoserListbox-down-body-avatar"
										mode="aspectFill">
									</image>
									<text class="CoserListbox-down-body-name">{{item.user_name}}</text>
								</view>
								<view slot="footer" class="CoserListbox-down-footer">
									<text class="CoserListbox-down-footer-text">🔥人气值</text>
									<text class="CoserListbox-down-footer-popNum">{{item.energy}}</text>
								</view>
							</uni-list-item>
						</uni-list>
						<uni-load-more :status="allloadStatus"></uni-load-more>
					</view>
				</view>
				<view class="allRank" v-if="tabIndex == 1">
					<view class="CoserListbox-mid">
						<view class="Coser-Items">
							<view class="img-wrapper-1" @click="gotoCoserHomePage(userInfoListWeek[1].user_id)">
								<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoListWeek[1].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoListWeek[1].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoListWeek[1].energy}}</text>
						</view>
						<view class="Coser-Items" @click="gotoCoserHomePage(userInfoListWeek[0].user_id)">
							<view class="img-wrapper-2">
								<image mode="aspectFill" class="CoserItem-img-First" :src="userInfoListWeek[0].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoListWeek[0].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoListWeek[0].energy}}</text>
						</view>
						<view class="Coser-Items" @click="gotoCoserHomePage(userInfoListWeek[2].user_id)">
							<view class="img-wrapper-3">
								<image mode="aspectFill" class="CoserItem-img-Other" :src="userInfoListWeek[2].header_Pic">
								</image>
							</view>
							<text class="Coser-Items-text">{{userInfoListWeek[2].user_name}}</text>
							<text class="Coser-Item-Number">{{userInfoListWeek[2].energy}}</text>
						</view>
					</view>
					<view class="CoserListbox-down">
						<uni-list class="CoserListbox-down-list" :border="false">
							<uni-list-item v-for="(item,index) in FourToSixWeek" :key="index" direction="row"
								:title="item.user_name" :ellipsis="1"
								:to="'../Mypage/homePage/homePage?userId' + item.user_id">
								<view slot="header" class="CoserListbox-down-header">
									<text class="CoserListbox-down-header-text">{{index+4}}</text>
								</view>
								<view slot="body" class="CoserListbox-down-body">
									<image :src="item.header_Pic" class="CoserListbox-down-body-avatar"
										mode="aspectFill">
									</image>
									<text class="CoserListbox-down-body-name">{{item.user_name}}</text>
								</view>
								<view slot="footer" class="CoserListbox-down-footer">
									<text class="CoserListbox-down-footer-text">🔥人气值</text>
									<text class="CoserListbox-down-footer-popNum">{{item.energy}}</text>
								</view>
							</uni-list-item>
						</uni-list>
						<uni-load-more :status="WeekloadStatus"></uni-load-more>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad() {
			const http = new this.$Request();
			this.tabIndex = 0;
			if(this.allinitlist == true){
				http.get("/Cos/PopCoserList/getAllRank", {
					params: {
						pageNum: this.allpageNum,
						pageSize: 8
					}
				}).then(res => {
					this.userInfoList = res.data.list.sort((a, b) => {
						return b.energy - a.energy;
					});
					this.allpageNum++;
					this.allinitlist = false;
					if(res.data.hasNextPage == true){
						this.allloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.allloadStatus = "noMore";
						this.allflag = false;
					}
				}).catch(err => {
					console.log(err)
				});
			}
			
			if(this.Weekinitlist == true){
				http.get("/Cos/PopCoserList/getWeekRank", {
					params: {
						pageNum: this.WeekpageNum,
						pageSize: 8
					}
				}).then(res => {
					this.userInfoListWeek = res.data.list.sort((a, b) => {
						return b.energy - a.energy;
						// return a.energy - b.energy;
					});
					this.WeekpageNum++;
					this.Weekinitlist = false;
					if(res.data.hasNextPage == true){
						this.WeekloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.WeekloadStatus = "noMore";
						this.Weekflag = false;
					}
				}).catch(err => {
					console.log(err)
				});
			}
			
		},
		onShow() {
			
		},
		onHide() {
			this.allbeforePage = this.allpageNum;
			this.WeekbeforePage = this.WeekpageNum;
		},
		async onReachBottom() {
			const http = new this.$Request();
			if(this.tabIndex == 0 && this.allflag == true){
				this.allloadStatus = "loading";
				await http.get("/Cos/PopCoserList/getAllRank",{params:{pageNum:this.allpageNum,pageSize:8}}).then(res=>{
					this.userInfoList = this.userInfoList.concat(res.data.list);
					this.allpageNum++;
					if(res.data.hasNextPage == true){
						this.allloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.allloadStatus = "noMore";
						this.allflag = false;
					}
					
				}).catch(err=>{
					console.log(err);
				});
				
			}
			if(this.tabIndex == 1 && this.Weekflag == true){
				this.WeekloadStatus = "loading";
				await http.get("/Cos/PopCoserList/getWeekRank", {params:{pageNum:this.WeekpageNum, pageSize:8}}).then(res=>{
					this.userInfoListWeek = this.userInfoListWeek.concat(res.data.list);
					this.WeekpageNum++;
					if(res.data.hasNextPage == true){
						this.WeekloadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.WeekloadStatus = "noMore";
						this.Weekflag = false;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		data() {
			return {
				WeekloadStatus:"noMore",
				Weekinitlist:true,
				Weekflag:true,
				WeekpageNum:1,
				WeekpageSize:0,
				WeekbeforePage:0,
				allloadStatus:"noMore",
				allinitlist:true,
				allflag:true,
				allpageNum:1,
				allpageSize:0,
				allbeforePage:0,
				
				listTabsType: ['总榜', '周榜'],
				tabIndex: 0,
				userInfoList: [
					{
						user_id: 1,
						header_Pic: '../../static/CoserlistSource/userheadimg1.jpg',
						user_name: '嘉Sama',
						energy: 5947
					},
					{
						user_id: 2,
						header_Pic: '../../static/CoserlistSource/userheadimg2.jpg',
						user_name: '夜呀_mm',
						energy: 4747
					},
					{
						user_id: 3,
						header_Pic: '../../static/CoserlistSource/userheadimg3.jpg',
						user_name: '青玉子sei',
						energy: 3947
					},
					{
						user_id: 4,
						header_Pic: '../../static/CoserlistSource/userheadimg4.jpg',
						user_name: '小娜',
						energy: 3256
					},
					{
						user_id: 5,
						header_Pic: '../../static/CoserlistSource/userheadimg5.jpg',
						user_name: '奈奈喵',
						energy: 2756
					},
					{
						user_id: 6,
						header_Pic: '../../static/CoserlistSource/userheadimg6.jpg',
						user_name: '国际巨星',
						energy: 2733
					},
					{
						user_id: 7,
						header_Pic: '../../static/CoserlistSource/userheadimg7.jpg',
						user_name: 'abcde',
						energy: 1236
					},
					{
						user_id: 8,
						header_Pic: '../../static/CoserlistSource/userheadimg7.jpg',
						user_name: 'roserrrr',
						energy: 1235
					},
					{
						user_id: 9,
						header_Pic: '../../static/CoserlistSource/userheadimg7.jpg',
						user_name: '12344',
						energy: 1234
					}
				],
				userInfoListWeek:[]
			}
		},
		methods: {
			popcoserSearch() {
				uni.navigateTo({
					url: '../search/searchCoser'
				})
			},
			tabTap(e) {
				console.log(e.currentTarget.id)
				this.tabIndex = e.currentTarget.id
			},
			gotoStayInCoserList() {
				uni.navigateTo({
					url: './StayInCoserList'
				})
			},
			gotoCoserIdenticate() {
				uni.navigateTo({
					url: '../Mypage/identificationPage/coserIdenticate'
				})
			},
			gotoCoserHomePage(userid) {
				uni.navigateTo({
					url: "../Mypage/homePage/homePage?userId=" + userid
				})
				console.log(userid)
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
			},
			FourToSixWeek(){
				return this.userInfoListWeek.filter((data, index) => {
					return index >= 3;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-list-item {
		// padding-top: 15rpx;
		// padding-bottom: 15rpx;
		// border-bottom: 1rpx solid #e9e9e9;
		width: 88%;
		margin: 0 auto;
	}

	/deep/ .uni-list-item__container {
		// padding-top: 15rpx;
		// padding-bottom: 15rpx;
		// border-bottom: 1rpx solid #e9e9e9;
		padding-left: 0;
	}
</style>

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
		font-size: 25rpx;
		color: rgba(16, 16, 16, 0.33);
		margin-right: auto;
		width: auto;
	}

	.popcoser-search-Icon {
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
	}

	.searchIcon-style {
		color: rgba(16, 16, 16, 0.33);
		font-size: 25rpx;

	}

	.CoserInfo-box {
		display: flex;
		flex-direction: column;
		border-style: none;
		border-radius: 30rpx;
		margin-top: 30rpx;
		background-color: #FFFFFF;
		height: 280rpx;
		box-shadow: 0 0 10rpx 10rpx rgba(199, 199, 199, 0.15);
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
		font-size: 18rpx;
		color: rgba(255, 110, 162, 0.6);
		border-style: solid;
		border-radius: 10rpx;
		border-width: 2rpx;
		margin-top: auto;
		margin-bottom: auto;
		padding: 5rpx 10rpx 5rpx 10rpx;
		margin-left: auto;
		margin-right: 40rpx;
	}

	.Infobox-down {
		display: flex;
		flex-direction: row;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
		margin-right: auto;
		width: 92%;
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
		font-size: 20rpx;
		color: rgba(51, 51, 51, 0.42);
		text-align: center;
		margin-top: 5rpx;
		line-height: 50rpx;
		color: rgba(51, 51, 51, 0.42);
	}

	.user-info-box-more {
		font-size: 15rpx;
		color: rgba(51, 51, 51, 0.42);
	}

	.moreCoser-Icon {
		width: 70rpx;
		height: 70rpx;
		border-style: none;
		border-radius: 40rpx;
		background-color: #F2A3C3;
		/* text-align: center;*/
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		margin-bottom: 0rpx;
		font-size: 13rpx;
	}

	.CoserList-box {
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		background-color: #FFFFFF;
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
		color: #C6C6C6;
	}

	.ListTabs-title-active {
		font-size: 42rpx;
		font-weight: bold;
		color: #080808;

	}

	.CoserListbox-mid {
		display: flex;
		flex-direction: row;
		width: 90%;
		align-items: baseline;
		justify-content: space-around;
		margin: 60rpx auto;
		margin-bottom: 0rpx;
	}

	.Coser-Items {
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 30rpx;
	}

	.Coser-Items-text {
		font-size: 28rpx;
		font-weight: bold;
		line-height: 48rpx;
		color: rgba(32, 30, 30, 0.88);
	}

	.Coser-Item-Number {
		font-size: 26rpx;
		font-weight: bold;
		color: rgba(32, 30, 30, 0.88);
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
		font-size: 30rpx;
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
		margin-left: 20rpx;
		margin-right: 0rpx;
	}

	.CoserListbox-down-body-name {
		font-size: 30rpx;
		margin-left: 40rpx;
	}

	.uni-list::before {
		display: none;
	}

	.uni-list::after {
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
