<template>
	<view>
		<uni-popup ref="popup" type="ordermessage">
			<uni-popup-ordermessage :duration="2000" :headerPic="headerPic" :userName="userName"
				:gotoOrderMsgPage="gotoOrderMsgPage"></uni-popup-ordermessage>
		</uni-popup>
		<view class="StayInCoser-page-wrapper">
			<view class="StayInCoser-topBar">
				<view class="StayInCoser-topBar-left">
					<image src="../../static/CoserlistSource/Coser-infobox-left.png"
						class="StayInCoser-topBar-left-img"></image>
					<text class="StayInCoser-topBar-left-text">入驻摄影师</text>
				</view>
				<view class="StayInCoser-topBar-right">
					<!-- <uni-combox :isDisabled="true" placeholder="省份" :candidates="ProvinceList"
											:value="ProvinceList[0]"></uni-combox> -->
					<uni-combox @input="filterbcity" :isDisabled="true" placeholder="城市" :candidates="CityList"
						:value="CityList[0]"></uni-combox>
				</view>
			</view>
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :title="item.Coser_intro" :ellipsis="1" :border="false" direction="column"
						v-for="(item,index) in PhotographerInfoList" :key="index" class="StayInCoser-List-item">
						<view slot="header" class="StayInCoser-item">
							<image :src="item.header_pic" class="StayInCoser-item-avatar" mode="aspectFill"
								@click="gotoCoserHomePage"></image>
							<view class="StayInCoser-item-info">
								<view class="StayInCoser-item-nameandlikenum">
									<text class="StayInCoser-item-name">{{item.user_name}}</text>
									<view class="StayInCoser-item-likenum">
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.focused_num}}</text>
									</view>
									<view class="StayInCoser-item-likebutton">
										<!-- <button class="StayInCoser-item-likebutton-btn">关注</button> -->
										<uni-fav class="StayInCoser-item-likebutton-like" circle="true"
											:checked="item.checked" star="false" :contentText="contentText"
											bgColor="rgba(242,163,195,0.33)" bgColorChecked="#797979"
											@click="LikeBtnClick(index)" fgColor="#FF5E98"></uni-fav>
										<uni-fav class="StayInCoser-item-likebutton-appoint" star="false" circle="true"
											:contentText="contentText2" bgColor="rgba(242,163,195,0.33)"
											fgColor="#FF5E98" @click="addOrder(item.user_id, index)"></uni-fav>
									</view>
								</view>
								<view class="StayInCoser-item-position" @click="gotoCoserHomePage">
									<uni-icons type="location-filled" size="14"></uni-icons>
									<text>{{item.city}}</text>
								</view>
								<text class="StayInCoser-item-intro"
									@click="gotoCoserHomePage">个人介绍:{{item.autograph}}</text>
							</view>

						</view>
						<view slot="body" class="StayInCoser-item-body">
							<uni-collapse :accordion="true">
								<uni-collapse-item ref="collapse_item" :showAnimation="true"
									class="collapse-item-wrapper">
									<view class="collapse-item-content-wrapper">
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic1"
											@click="gotoCoserHomePage(item.user_id)"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic2"
											@click="gotoCoserHomePage(item.user_id)"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic3"
											@click="gotoCoserHomePage(item.user_id)"></image>
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view>
					</uni-list-item>
				</uni-list>
				<uni-load-more :status="LoadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import comboxSearch from "../../components/cuihai-combox/cuihai-combox.vue"
	export default {
		components: {
			comboxSearch
		},
		async onLoad(options) {
			// 获取登录者Id
			uni.getStorage({
				key: 'userId',
				success: res => {
					this.userId = res.data
				}
			});

			const http = new this.$Request();

			http.get("/Date/PhotographerList/getAllPg", {
				params: {
					pageNum: this.pageNum,
					pageSize: 8
				}
			}).then(res => {
				this.PhotographerInfoList = res.data.list;
				// console.log(this.PhotographerInfoList)
				this.pageNum++;
				this.initList = false;
				if (res.data.hasNextPage == true) {
					this.LoadStatus = "more";
				}
				if (res.data.hasNextPage == false) {
					this.LoadStatus = "noMore";
					this.flag = false;
				}
			}).catch(err => {
				console.log(err);
			});
		},
		onHide() {

		},
		onShow() {
			uni.$on('showOrderMsg', res => {
				this.$refs.popup.open()
				// 清除监听
				uni.$off("showOrderMsg");
			})
		},
		async onReachBottom() {
			const http = new this.$Request();
			if (this.flag == true && this.valvalue == "全部") {
				this.LoadStatus = "loading";
				await http.get("/Date/PhotographerList/getAllPg", {
					params: {
						pageNum: this.pageNum,
						pageSize: 8
					}
				}).then(res => {
					this.PhotographerInfoList = this.PhotographerInfoList.concat(res.data.list);
					this.pageNum++;
					if (res.data.hasNextPage == true) {
						this.LoadStatus = "more";
					}
					if (res.data.hasNextPage == false) {
						this.LoadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err => {
					console.log(err);
				});
			}

			if (this.flag == true && this.valvalue != "全部") {
				this.LoadStatus = "loading";
				await http.get("/Date/StayInPhotographerList/selectPgCity", {
					params: {
						city: this.valvalue,
						pageNum: this.pageNum,
						pageSize: 8
					}
				}).then(res => {
					this.PhotographerInfoList = this.PhotographerInfoList.concat(res.data.list);
					this.pageNum++;
					if (res.data.hasNextPage == true) {
						this.LoadStatus = "more";
					}
					if (res.dat.hasNextPage == false) {
						this.LoadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err => {
					console.log(err);
				})
			}

		},
		data() {
			return {
				dialogId: null, // 对话框Id
				userId: null, // 登录者Id
				other_userId: null, // 标记进行约拍的摄影师Id
				valvalue: "全部",
				pageNum: 1,
				pageSize: 0,
				beforePage: 0,
				initList: true,
				flag: true,
				LoadStatus: "noMore",
				CityList: ["全部", "北京", "上海", "杭州", "宁波", "深圳", "福建", "绍兴", "合肥", "郑州", "西安"],
				ProvinceList: ["全国", "浙江", "广东", "山东", "福建", "河南", "河北", "陕西", "山西", "江苏", "安徽"],
				PhotographerInfoList: [{
						Coser_id: 1,
						user_name: "摄影师11111111",
						Coser_avatar: "../../static/CoserlistSource/avatar1.jpg",
						Coser_intro: "底层泥坑里滚爬的一只小可爱",
						Coser_city: "杭州市",
						focused_num: 2568,
						Coser_work1: "../../static/contentImg/2.jpg",
						Coser_work2: "../../static/contentImg/3.jpg",
						Coser_work3: "../../static/contentImg/4.jpg",
						checked: false
					},
					{
						Coser_id: 2,
						user_name: "摄影师222",
						Coser_avatar: "../../static/CoserlistSource/avatar2.jpg",
						Coser_intro: "Lorem ipsum dolor sit amet",
						Coser_city: "杭州市",
						focused_num: 7,
						Coser_work1: "../../static/contentImg/2.jpg",
						Coser_work2: "../../static/contentImg/3.jpg",
						Coser_work3: "../../static/contentImg/4.jpg",
						checked: false
					}
				],
				headerPic: "", // 标记进行约拍的摄影师头像
				userName: "", // 标记进行约拍的摄影师昵称
				contentText: {
					contentDefault: '关注',
					contentFav: '已关注'
				},
				contentText2: {
					contentDefault: '约拍',
					contentFav: ''
				}

			}
		},
		methods: {
			// 获取对话框id
			async onGetDialogBox() {
				const res = await this.$myRequest({
					url: '/Contact/getDialogIdByTwoUser',
					data: {
						user_a: this.userId,
						user_b: this.other_userId
					}
				})
				return res.data
			},
			LikeBtnClick(e) {
				this.PhotographerInfoList[e].checked = !this.PhotographerInfoList[e].checked
				console.log(e, this.PhotographerInfoList[e].checked)
			},
			gotoCoserHomePage() {
				uni.navigateTo({
					url: "../Mypage/homePage/homePage"
				})
			},
			gotoWorksPage() {
				uni.navigateTo({
					url: "../works/works"
				})
			},
			// 发起一个约拍订单
			addOrder(user_id, i) {
				this.headerPic = this.PhotographerInfoList[i].header_pic
				this.userName = this.PhotographerInfoList[i].user_name
				this.other_userId = this.PhotographerInfoList[i].user_id
				uni.navigateTo({
					url: '../pictureOrder/addorder?user_id=' + user_id
				})
			},
			// 跳转至订单对话框
			async gotoOrderMsgPage() {
				const res = await this.onGetDialogBox()
				this.dialogId = res

				const that = this
				uni.navigateTo({
					url: '../MessageCenter/cos-dialogpage',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('emitDialogMsg', {
							dialog_id: that.dialogId,
							user_id: that.other_userId,
							header_pic: that.headerPic
						})
					}
				})
			},
			filterbcity(e) {
				console.log(e);
				const http = new this.$Request();
				if (this.valValue != e) {
					this.pageNum = 1;
					this.valvalue = e;
					if (this.valvalue == "全部") {
						http.get("/Date/PhotographerList/getAllPg", {
							params: {
								pageNum: this.pageNum,
								pageSize: 8
							}
						}).then(res => {
							this.PhotographerInfoList = res.data.list;
							console.log("获取" + this.valvalue + "成功");
							this.pageNum++;
							if (res.data.hasNextPage == true) {
								this.LoadStatus = "more";
							}
							if (res.data.hasNextPage == false) {
								this.LoadStatus = "noMore";
								this.flag = false;
							}
						}).catch(err => {
							console.log(err);
						})
					} else {
						http.get("/Date/StayInPhotographerList/selectPgCity", {
							params: {
								city: this.valvalue,
								pageNum: this.pageNum,
								pageSize: 8
							}
						}).then(res => {
							this.PhotographerInfoList = res.data.list;
							console.log("获取" + this.valvalue + "成功");
							this.pageNum++;
							if (res.data.hasNextPage == true) {
								this.LoadStatus = "more";
							}
							if (res.data.hasNextPage == false) {
								this.LoadStatus = "noMore";
								this.flag = false;
							}
						}).catch(err => {
							console.log(err);
						})
					}
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-fav-text {
		font-size: 24rpx;
	}

	/deep/ .uni-collapse-cell {
		border: none;
	}
</style>
<style>
	@import url("PhotographerList.css");

	.uni-list::before {
		display: none;
	}

	.uni-list::after {
		display: none;
	}

	/* button{
		font-size: 24rpx;
		background-color: #EC808D;
	} */
</style>
