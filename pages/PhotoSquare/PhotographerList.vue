<template>
	<view>
		<uni-popup ref="popup" type="ordermessage">
		    <uni-popup-ordermessage :duration="2000" :gotoOrderMsgPage="gotoOrderMsgPage"></uni-popup-ordermessage>
		</uni-popup>
		<view class="StayInCoser-page-wrapper">
			<view class="StayInCoser-topBar">
				<view class="StayInCoser-topBar-left">
					<image src="../../static/CoserlistSource/Coser-infobox-left.png" class="StayInCoser-topBar-left-img"></image>
					<text class="StayInCoser-topBar-left-text">入驻摄影师</text>
				</view>
				<view class="StayInCoser-topBar-right">
					<combox-search :isDisabled="true" placeholder="省份" :candidates="ProvinceList" emptyTips="无匹配数据" :value="ProvinceList[0]"></combox-search>
					<combox-search :isDisabled="true" placeholder="城市" :candidates="CityList" emptyTips="无匹配数据" :value="CityList[0]"></combox-search>
				</view>
			</view>
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :title="item.Coser_intro" :ellipsis="1" :border="false" direction="column" v-for="(item,index) in PhotographerInfoList" :key="index" class="StayInCoser-List-item">
						<view slot="header" class="StayInCoser-item">
							<image :src="item.Coser_avatar" class="StayInCoser-item-avatar" mode="aspectFill"></image>
							<view class="StayInCoser-item-info">
								<view class="StayInCoser-item-nameandlikenum">
									<text>{{item.Coser_name}}</text>
									<view class="StayInCoser-item-likenum">
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.Coser_likeNum}}</text>
									</view>
									<view class="StayInCoser-item-likebutton">
										<!-- <button class="StayInCoser-item-likebutton-btn">关注</button> -->
										<uni-fav class="StayInCoser-item-likebutton-like" circle="true" :checked="item.checked" star="false" :contentText="contentText" bgColor="rgba(242,163,195,0.33)" bgColorChecked="#797979" @click="LikeBtnClick(index)" fgColor="#FF5E98"></uni-fav>
										<uni-fav class="StayInCoser-item-likebutton-appoint" star="false" circle="true" :contentText="contentText2" bgColor="rgba(242,163,195,0.33)" fgColor="#FF5E98" @click="addOrder"></uni-fav>
									</view>
								</view>
								<view class="StayInCoser-item-position">
									<uni-icons type="location-filled" size="14"></uni-icons>
									<text>{{item.Coser_city}}</text>
								</view>
								<text class="StayInCoser-item-intro">个人介绍:{{item.Coser_intro}}</text>
							</view>
							
						</view>
						<view slot="body" class="StayInCoser-item-body">
							<uni-collapse :accordion="true">
								<uni-collapse-item ref="collapse_item" :showAnimation="true" class="collapse-item-wrapper">
									<view class="collapse-item-content-wrapper">
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.Coser_work1"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.Coser_work2"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.Coser_work3"></image>
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import comboxSearch from "../../components/cuihai-combox/cuihai-combox.vue"
	export default{
		components:{comboxSearch},
		data(){
			return{
				CityList:["全部","北京","上海","杭州","宁波","深圳","福建","绍兴","合肥","郑州","西安"],
				ProvinceList:["全国","浙江","广东","山东","福建","河南","河北","陕西","山西","江苏","安徽"],
				PhotographerInfoList:[
					{
						Coser_id:1,
						Coser_name:"摄影师1",
						Coser_avatar:"../../static/CoserlistSource/avatar1.jpg",
						Coser_intro:"底层泥坑里滚爬的一只小可爱",
						Coser_city:"杭州市",
						Coser_likeNum:2568,
						Coser_work1:"../../static/contentImg/2.jpg",
						Coser_work2:"../../static/contentImg/3.jpg",
						Coser_work3:"../../static/contentImg/4.jpg",
						checked: false
					},
					{
						Coser_id:2,
						Coser_name:"摄影师2",
						Coser_avatar:"../../static/CoserlistSource/avatar2.jpg",
						Coser_intro:"Lorem ipsum dolor sit amet",
						Coser_city:"杭州市",
						Coser_likeNum:2568,
						Coser_work1:"../../static/contentImg/2.jpg",
						Coser_work2:"../../static/contentImg/3.jpg",
						Coser_work3:"../../static/contentImg/4.jpg",
						checked: false
					}
				],
				contentText:{
					contentDefault: '关注',
					contentFav: '已关注'
				},
				contentText2:{
					contentDefault: '约拍',
					contentFav: ''
				}
				
			}
		},
		methods:{
			LikeBtnClick(e) {
				this.PhotographerInfoList[e].checked = !this.PhotographerInfoList[e].checked
				console.log(e,this.PhotographerInfoList[e].checked)
			},
			// 发起一个约拍订单
			addOrder() {
				uni.navigateTo({
					url: '../pictureOrder/addorder'
				})
			},
			// // 跳转至订单对话框
			gotoOrderMsgPage(){
				uni.navigateTo({
					url: '../MessageCenter/cos-dialogpage'
				})
			}
		},
		onShow(){
			uni.$on('showOrderMsg', res => {
				this.$refs.popup.open()
				// 清除监听
				uni.$off("showOrderMsg");
			})
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-fav-text {
		font-size: 24rpx;
	}
	/deep/ .uni-collapse-cell{
		border:none;
	}
</style>
<style>
	@import url("PhotographerList.css");
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
	/* button{
		font-size: 24rpx;
		background-color: #EC808D;
	} */
</style>
