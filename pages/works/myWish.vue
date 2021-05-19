<template>
	<view class="backBox">
		<view class="linkStyle">原作品链接:</view>
		<view class="workBox" @click="workNavi()">
		    <image :src="work.covers" mode="aspectFill"></image>
		    <text>{{work.head}}</text>
		</view>
		<!-- @内容部分 -->
		<view class="contenPart">
			<table class="contenTable">
				<tr>
					<td class="contenTableLeft"><text>摄影:</text></td>
					<td>
						<view class="contenViewT">
							<view v-if="photographer!=''" v-for="(item,index) in photographer" :key="index">@{{item.photography}}
							<span class="iconfont_dy" @click="deleteTab(0,index)">&#xe636;</span>
							</view>
							<view v-if="photographer==''">点击下方可选择摄影师</view>
						</view>
					    
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"@click="changePhotographer"></image>
						<view class="contentMore" @click="changePhotographer">添加更多约拍摄影师</view></td>
					</tr>
				<tr>
					<td class="contenTableLeft"><text>服饰:</text></td>
					<td>
						<view class="contenViewT">
							<!-- <text>@</text> -->
							<view v-if="clothList!=''" v-for="(item,index) in clothList" :key="index">#{{item.name}}#
								<span class="iconfont_dy" @click="deleteTab(1,index)">&#xe636;</span>
							</view>
							<view v-if="clothList==''">点击下方编辑服饰链接</view>
						</view>
						
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"@click="clothLinkNavi"></image>
						<view class="contentMore"@click="clothLinkNavi">编辑服饰链接</view></td>
					</tr>
				<tr>
					<td class="contenTableLeft"><text>妆容:</text></td>
					<td>
						<view class="contenViewT">
							<!-- <text>@</text> -->
							<view  v-if="madeup!=''" v-for="(item,index) in madeup" :key="index">#{{item.makeupLook}}#
								<span class="iconfont_dy" @click="deleteTab(2,index)">&#xe636;</span>
							</view>
							<view v-if="madeup==''">点击下方可选择妆容教程</view>
						</view>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<image class="moreIcon"src="../../static/icon/find.png" mode="aspectFill"@click="starListNavi(wishId)"></image>
						<view class="contentMore"@click="starListNavi(wishId)">添加更多妆容教程</view>
					</td>
					</tr>
			</table>

			<view class="other">其他标签:
				<view v-for="(item,index) in otherTag" :key="index">#{{item.mark}}#
					<span class="iconfont_dy" @click="deleteTab(3,index)">&#xe636;</span>
				</view>
			</view>
			<image src="../../static/icon/other.png" class="otherIcon" mode="aspectFill"@click="otherTagNavi"></image>
			
	</view>
	<view class="finalButton" @click="releaseWork()"><text>发布作品</text></view>
  </view>
	
</template>

<script>
	export default{
		onShow() {
			uni.$on("choosePhotographer",res => {
				this.photographer=this.photographer.concat(JSON.parse(res.photographer))
				console.log(this.photographer)
				// 清除监听
				uni.$off("choosePhotographer");
			})
			uni.$on("chooseMadeup",res => {
				this.madeup.push({makeupId:res.madeupId,makeupLook:res.madeupTitle})
				// 清除监听
				uni.$off("chooseMadeup");
			})
			uni.$on("editClothLink",res => {
				this.clothList = JSON.parse(res.clothList)
				uni.$off("editClothLink");
			})
			uni.$on("emitAddHotTopic",res => {
				console.log(res)
				this.otherTag.push(res.mark_item) 
				uni.$off("emitAddHotTopic");
			})
		},
		onLoad(option) {
			this.loadAll()
		},
		onNavigationBarButtonTap() {
			// 填写保存我的心愿内容接口
			// 
			// 
			// 
			uni.navigateBack({})
		},
		data(){
			return{
				wishId:'1',
				work:
					{
						workId:"",
						covers:"../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					},
				
				photographer:[
					{
						photographerId:'1',
						photography:'布兰妮',
					},
					{
						photographerId:'2',
						photography:'琪',
					},
				],
				clothingId:'',
				clothingTitle:'',
				madeup:[
					{
						makeupId:'',
						makeupLook:'...',
					}
				],
				
				clothList: [
					{
					name: '中牌1',
					link: 'hwfeihwfowieh',
					},
					{
					name: '梗豆1',
					link: 'whifeuowieiow',
					}
				],
				otherTag:[
					// {
					// 	tagId:'',
					// 	tagName:'汉服'
					// }
				]
				
				
			}
		},
		methods:{
			async loadAll(){
				//填写获取详细信息
				// 
				// 
			},
			workNavi(){
				uni.navigateTo({
					url:'works'
				})
			},
			releaseWork(){
				uni.navigateTo({
					url:'../ContentReleasePage/postDynamic'
				})
			},
			changePhotographer(){
				uni.navigateTo({
					url:'../Mypage/myWishList/myPhotografy'
				})
			},
			starListNavi(w){
				uni.navigateTo({
					url:'../Mypage/myStarList/myStarList?myWish=1'+'&wishId='+w
				})
			},
			clothLinkNavi(){
				var t=''
				const that=this
				if (that.clothList){
					t=JSON.stringify(that.clothList)
				}
				uni.navigateTo({
					url:'../Mypage/myWishList/myClothLink?clothList='+t+'&myWish=1'
				})
			},
			deleteTab(i,index){
				console.log("i:"+i)
				if(i==0){
					this.photographer.splice(index,1)
				}
				else if(i==1){
					this.clothList.splice(index,1)
				}
				else if(i==2){
					this.madeup.splice(index,1)
				}
				else if(i==3){
					this.otherTag.splice(index,1)
				}
			},
			otherTagNavi(){
				uni.navigateTo({
					url:'../ContentReleasePage/label'
				})
			}
		}
	}
</script>

<style>
	@import url("myWishCss.css");
</style>
