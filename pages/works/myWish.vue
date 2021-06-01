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
	
	<!-- 加载框 -->
	<kModel ref="kModel" />
  
  </view>
	
</template>

<script>
	import kModel from '@/components/k-model/k-model.vue';
	export default{
		components: {
			kModel
		},
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
			this.wishId = option.wishId || '1'
			this.userId=getApp().globalData.global_userId || '12'
			this.loadAll()
		},
		onNavigationBarButtonTap() {
			// 填写保存我的心愿内容接口
			// 
			// 
			// 
			const that = this
			//摄影师
			for (var i in that.photographer) {
				const item = that.photographer[i]
				console.log(item)
				that.photographerList.push(item.photographerId+"，"+item.photography)
			}
			
			//服饰
			for (var i in that.clothList){
				const item = that.clothList[i]
				that.clothingList.push(item.name+"，"+item.link)
			}
			
			//妆容
			for (var i in that.madeup){
				const item = that.madeup[i]
				//console.log(item)
				that.madeupList.push(item.makeupId+"，"+item.makeupLook)
			}
			
			//其他
			for (var i in that.otherTag){
				const item = that.otherTag[i]
				that.otherTagList.push(item.mark_id+"，"+item.mark)
				console.log(item)
			}
			console.log("--------------------------------------------------")
			console.log(that.photographerList)
			console.log(that.clothingList)
			console.log(that.madeupList)
			console.log(that.otherTagList)
			
			this.saveMyWish()
			// uni.navigateBack({})
		},
		data(){
			return{
				userId:'',
				wishId:'1',
				work:
					{
						workId:"",
						covers:"../../static/iconn/4.jpg",
						head:"江南美人图|奇迹党党环游中华之江南"
					},
				
				photographer:[],
				clothingId:'',
				clothingTitle:'',
				madeup:[
					// {
					// 	makeupId:'',
					// 	makeupLook:'...',
					// }
				],
				
				clothList: [
					// {
					// name: '中牌1',
					// link: 'hwfeihwfowieh',
					// },
					// {
					// name: '梗豆1',
					// link: 'whifeuowieiow',
					// }
				],
				otherTag:[
					// {
					// 	tagId:'',
					// 	tagName:'汉服'
					// }
				],
				photographerList:[],
				madeupList:[],
				clothingList:[],
				otherTagList:[]
				
				
			}
		},
		methods:{
			async loadAll(){
				//填写获取详细信息
				// 
				//
				 const res = await this.$myRequest({
					 url:'/MyPage/MyWishList/getAllDetail',
					 data:{
						 wish_id:this.wishId
					 }
				 })
				 console.log("-----------------------------------------")
				 console.log(res.data)
				 var t=res.data[0]
				
				 this.work.workId = t.opus_id
				 this.work.covers = t.first_pic
				 this.work.head = t.title

				 //拆分摄影师标签
				 var jsonO = JSON.parse(t.account_b)
				 console.log(jsonO)
				 var photographyObj={
				 		photographerId:'',
				 		photography:''
				 	}
				 var m = []
				 for (var prop in jsonO){
				 	m=jsonO[prop].split("，")
				 	photographyObj.photographerId = m[0]
				 	photographyObj.photography = m[1]
				 	// console.log(modelObj)
				 	this.photographer.push(photographyObj)
				 	//console.log(this.photography)
				 }
				 
				 
				 //拆分服饰标签
				 jsonO = JSON.parse(t.clothing_id)
				 //console.log(jsonO)
				 var clothObj={
				 		name: '',
				 		link: '',
				 	}
				 m = []
				 for (var prop in jsonO){
				 	//m=jsonO[prop].split("，")
				 	var i=0
				 	//console.log(jsonO[prop].length)
				 	for(i=0;i<jsonO[prop].length;i++){
				 		
				 		if(jsonO[prop][i]=="，"){
				 			break;
				 		}
				 	}
				 	console.log(i)
				 	clothObj.name = jsonO[prop].slice(0,i)
				 	clothObj.link = jsonO[prop].slice(i+1)
				 	//console.log(clothObj)
				 	this.clothList.push(clothObj)
				 }
				 
				 //拆分妆容标签
				 jsonO = JSON.parse(t.makeup_id)
				 console.log(jsonO)
				 var makeupObj={
				 		makeupId:'',
				 		makeupLook:'江南美人妆'
				 	}
				 m = []
				 for (var prop in jsonO){
				 	m=jsonO[prop].split("，")
				 	makeupObj.makeupId = m[0]
				 	makeupObj.makeupLook = m[1]
				 	// console.log(modelObj)
				 	this.madeup.push(makeupObj)
				 	//console.log(this.makeupLook)
				 }
				 
				 
				 // 拆分其他标签
				 jsonO = JSON.parse(t.mark_id)
				 console.log(jsonO)
				 var labelObj={
				 		mark_id:'',
				 		mark:''
				 	}
				 m = []
				 for (var prop in jsonO){
				 	m=jsonO[prop].split("，")
				 	labelObj.mark_id = m[0]
				 	labelObj.mark = m[1]
				 	// console.log(modelObj)
				 	this.otherTag.push(labelObj)
				 	//console.log(this.label)
				 }
				 
			},
			workNavi(){
				uni.navigateTo({
					url:'works'
				})
			},
			// 显示发布成功加载框
			startShow: function() {
				this.$refs['kModel'].showModel({
					type: 'success',
					title: '保存成功',
					duration: 1000
				});
			},
			//保存我的心愿单
			async saveMyWish(){
				const res = await this.$myRequest({
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					url: '/MyPage/MyWishList/changeWish',
					data: {
						accountB:this.photographerList,
						clothingId:this.clothingList,
						firstPic:this.work.covers,
						makeupId:this.madeupList,
						markId:this.otherTagList,
						opusId:this.work.workId,
						title:this.work.head,
						user_id:this.userId,
						wish_id:this.wishId
					}
				})
				if(res.statusCode == 200){
					//显示保存成功
					this.startShow()
				}
				else{
					
				}
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
