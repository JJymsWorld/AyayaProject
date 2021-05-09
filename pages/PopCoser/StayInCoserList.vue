<template>
	<view>
		<view class="StayInCoser-page-wrapper">
			<view class="StayInCoser-topBar">
				<view class="StayInCoser-topBar-left">
					<image src="../../static/CoserlistSource/Coser-infobox-left.png" class="StayInCoser-topBar-left-img"></image>
					<text class="StayInCoser-topBar-left-text">入驻Coser</text>
				</view>
				<view class="StayInCoser-topBar-right">
					<combox-search :isDisabled="true" placeholder="省份" :candidates="ProvinceList" emptyTips="无匹配数据" :value="ProvinceList[0]"></combox-search>
					<combox-search :isDisabled="true" placeholder="城市" :candidates="CityList" emptyTips="无匹配数据" :value="CityList[0]"></combox-search>
				</view>
			</view>
			<view class="StayInCoser-List">
				<uni-list :border="false">
					<uni-list-item :border="false" direction="column" v-for="(item,index) in CoserInfoList" :key="index" class="StayInCoser-List-item" >
						<view slot="header" class="StayInCoser-item">
							<image :src="item.header_pic" class="StayInCoser-item-avatar" mode="aspectFill" @click="gotoCoserHomePage"></image>
							<view class="StayInCoser-item-info" @click="gotoCoserHomePage">
								<view class="StayInCoser-item-nameandlikenum">
									<text>{{item.user_name}}</text>
									<view>
										<!-- <image class="StayInCoser-item-info-likenumIcon"></image> -->
										<uni-icons type="heart-filled" color="red"></uni-icons>
										<text>{{item.focused_num}}</text>
									</view>
								</view>
								<view class="StayInCoser-item-position">
									<uni-icons type="location-filled"></uni-icons>
									<text>{{item.city}}</text>
								</view>
								<text class="StayInCoser-item-intro">个人介绍:{{item.autograph}}</text>
							</view>
							<view class="StayInCoser-item-likebutton">
								<!-- <button class="StayInCoser-item-likebutton-btn">关注</button> -->
								<uni-fav :checked="item.checked" star="false" :contentText="contentText" bgColor="#EC808D" bgColorChecked="#797979" @click="LikeBtnClick(index)" fgColor="#333333"></uni-fav>
								
							</view>
						</view>
						<view slot="body" class="StayInCoser-item-body">
							<uni-collapse :accordion="true">
								<uni-collapse-item ref="collapse_item" :showAnimation="true" class="collapse-item-wrapper">
									<view class="collapse-item-content-wrapper">
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic1" @click="gotoWorksPage"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic2" @click="gotoWorksPage"></image>
										<image class="collapse-item-content-img" mode="aspectFill" :src="item.pic3" @click="gotoWorksPage"></image>
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
	export default{
		components:{comboxSearch},
		async onLoad(options) {
			const http = new this.$Request();			//获取列表数据
			if(this.initList == true){
				http.get("/Cos/PopCoserList/getAllCoser",{params:{pageNum:this.pageNum, pageSize:8, user_id:1}}).then(res=>{
					this.initList = false;
					this.CoserInfoList = res.data.list;
					this.pageNum++;
					
					if(res.data.hasNextPage == true){
						this.LoadStatus = "more";
					}
					if(res.data.hasNextPage == false){
						this.LoadStatus = "noMore";
						this.flag = false;
					}
				}).catch(err=>{
					console.log(err);
				});
			}
		},
		async onReachBottom() {
			const http = new this.$Request();
			if(this.flag == true){
				this.LoadStatus = "loading";
				await http.get("/Cos/PopCoserList/getAllCoser",{params:{pageNum:this.pageNum, pageSize:8, user_id:1}}).then(res=>{
					this.CoserInfoList = this.CoserInfoList.concat(res.data.list);
					this.pageNum++;
					if(res.data.haxNextPage == true){
						this.LoadStatus = "more";
					}
					if(res.data.haxNextPage == false){
						this.LoadStatus = "noMore";
						this.flag == false;
					}
				}).catch(err=>{
					console.log(err);
				});
			}
		},
		onShow() {
			
		},
		onHide() {
			
		},
		data(){
			return{
				initList:true,
				pageSize:0,
				pageNum:1,
				beforePage:0,
				LoadStatus:"noMore",
				flag:true,
				CityList:["全部","北京","上海","杭州","宁波","深圳","福建","绍兴","合肥","郑州","西安"],
				ProvinceList:["全国","浙江","广东","山东","福建","河南","河北","陕西","山西","江苏","安徽"],
				CoserInfoList:[
					{
						Coser_id:1,
						Coser_name:"Coser1",
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
						Coser_name:"Coser2",
						Coser_avatar:"../../static/CoserlistSource/avatar2.jpg",
						Coser_intro:"底层泥坑里滚爬的一只小可爱",
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
				}
				
			}
		},
		methods:{
			LikeBtnClick(e) {
				this.CoserInfoList[e].checked = !this.CoserInfoList[e].checked
				console.log(e,this.CoserInfoList[e].checked)
			},
			gotoCoserHomePage(){
				uni.navigateTo({
					url:"../Mypage/homePage/homePage"
				})
			},
			gotoWorksPage(){
				uni.navigateTo({
					url:"../works/works"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-collapse-cell{
		border: none;
	}
</style>
<style>
	@import url("PopCoser.css");
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
