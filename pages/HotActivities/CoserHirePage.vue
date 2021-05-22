<template>
	<view>
		<view class="CosCollectionsPage-wrapper">
			<view class="CosCollections-top">
				<view class="CosCollections-top-imgwrapper">
					<image class="CosCollections-top-image" :src="PageInfo.image_url" mode="widthFix"></image>
				</view>
				<view class="CosCollections-top-title">
					{{PageInfo.title}}
				</view>
				<view class="CosCollections-top-themeandtime">
					<view class="CosCollections-top-theme">主题: {{PageInfo.theme}}</view>
					<view class="CosCollections-top-time">活动时间: {{PageInfo.time}}</view>
				</view>
			</view>
			<view class="CosCollections-list">
				<view class="CosCollections-taptab">
					<view class="CosCollections-taptab-left" :class="tabIndex == 0 ?'CosCollections-taptab-left-active':''" @click="tabChangeToZero">征集角色</view>
					<view class="CosCollections-taptab-right" :class="tabIndex == 1 ?'CosCollections-taptab-right-active':''" @click="tabChangeToOne">活动说明</view>
				</view>
				<view class="CosCollections-list-content" v-if="tabIndex==0">
					<uni-list class="CosCollections-list-content-unilist" :border="false">
						<uni-list-item :border="false" class="CosCollections-list-content-item" v-for="(item,index) in CoserCollectionList" :key="index" direction="row" :to="'./EventDetailPage?activity_id=' + item.id">
							<view slot="header" class="CosCollections-list-content-item-header">
								<image :src="item.image_url" mode="aspectFill" class="CosCollections-list-content-item-image"></image>
							</view>
							<view slot="body" class="CosCollections-list-content-item-body">
								<text class="CosCollections-list-content-item-body-title" >{{item.title}}</text>
								<view class="CosCollections-list-content-item-body-character">Cos人物: <text class="CosCollections-list-content-item-body-character-text">{{item.CosCharacter}}</text></view>
								<view class="CosCollections-list-content-item-body-activeStatus" v-if="item.isActive==true">进行中</view>
								<view class="CosCollections-list-content-item-body-notactiveStatus" v-if="item.isActive==false">已结束</view>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
				<view class="CosCollections-list-text" v-if="tabIndex==1">
					<text class="CosCollections-list-text-text" v-for="(item,index) in activity_intro" :key="index">{{index+1}}.{{item}}</text>
				</view>
			</view>
			<view class="CosCollections-allButton" :class="isallButtonStatus == true ?'CosCollections-allButton-active':''" @click="gotoCollectionContentPage()">
				<view class="CosCollections-Button" :class="isallButtonStatus == true ?'CosCollections-Button-active':''">查看合集活动</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options.activity_id);
		},
		data() {
			return {
				tabIndex:0,
				activity_intro:[
					'参赛者在提交作品前，请确保已经阅读并且愿意遵守相关规则。',
					'本次活动所有参赛作品均有评委根据应援值综合作为质量评选出;评委包含官方摄影团队及官方运营团队。',
					'参赛者不限参赛次数，用户可投稿多个作品参与评选，但是同意参赛作品最多获奖1次!即相同作品本身不重复获奖',
					'获奖名单会在活动结束后的10个工作日内公布，活动领奖信息请关注站内信息。活动获奖信息公布后将保留获奖用户7个工作日的领奖有效时间，过期作废。',
					'同一参赛作品如有创作团队中多人提交，评奖将以最早提交的参赛作品为准。若作品获奖，请相关创作团队内部自行协调分配。'
				],
				PageInfo: {
					image_url: "../../static/CollectionSources/1.jpg",
					title: "【季番人物征集】第10期",
					theme: "《请问您今天要来点兔子吗？》",
					time: "12月1日-1月10日"
				},
				CoserCollectionList: [{
						id: 2,
						image_url: "../../static/CollectionSources/6.jpeg",
						title: "【Cos正品征集】第10-1期",
						CosCharacter: "宇治松 千夜",
						isActive: false
					},
					{
						id: 3,
						image_url: "../../static/CollectionSources/7.jpeg",
						title: "【Cos正品征集】第10-2期",
						CosCharacter: "香风智乃",
						isActive: false
					},
					{
						id: 1,
						image_url: "../../static/CollectionSources/8.jpeg",
						title: "【Cos正品征集】第10-3期",
						CosCharacter: "保登 心爱",
						isActive: true
					},
					{
						id: 4,
						image_url: "../../static/CollectionSources/9.jpg",
						title: "【Cos正品征集】第10-4期",
						CosCharacter: "天天座理世",
						isActive: false
					},
					{
						id: 5,
						image_url: "../../static/CollectionSources/10.jpg",
						title: "【Cos正品征集】第10-5期",
						CosCharacter: "桐间纱路",
						isActive: false
					}
				]
			}
		},
		methods: {
			tabChangeToZero() {
				this.tabIndex = 0;
				console.log(this.tabIndex);
			},
			tabChangeToOne() {
				this.tabIndex = 1;
				console.log(this.tabIndex);
			},
			gotoEventDetailPage(e){
				uni.navigateTo({
					url:"./EventDetailPage?activity_id=" + e
				})
				console.log(e);
			},
			// 跳转至线下合集活动页面
			gotoCollectionContentPage(){
				uni.navigateTo({
					url:"./CollectionContentPage"
				})
			}
		},
		computed: {
			isallButtonStatus(){
				for(let i in this.CoserCollectionList){
					if (this.CoserCollectionList[i].isActive == true){
						return false
					}
				}
				return true
			}
		}
	}
</script>


<style lang="scss" scoped>
	/deep/ .uni-list-item{
		background-color: rgba(242, 163, 195, 0.33);
	}
</style>
<style>
	@import url("HotActivities.css");
	.uni-list::before{
		display: none;
	}
	.uni-list::after{
		display: none;
	}
	.CosCollections-list-text{
		display: flex;
		flex-direction: column;
		background-color: rgba(242, 163, 195, 0.33);
		font-size: 28rpx;
		padding-top: 20rpx;
		padding-bottom: 30rpx;
		color: #797979;
	}
	.CosCollections-list-text-text{
		margin-top: 5rpx;
		margin-bottom: 5rpx;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}
</style>
