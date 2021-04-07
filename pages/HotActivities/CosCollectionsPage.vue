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
					<view class="CosCollections-taptab-left" :class="tabIndex == 0 ?'CosCollections-taptab-left-active':''">征集角色</view>
					<view class="CosCollections-taptab-right" :class="tabIndex == 1 ?'CosCollections-taptab-right-active':''">活动说明</view>
				</view>
				<view class="CosCollections-list-content">
					<uni-list class="CosCollections-list-content-unilist" :border="false">
						<uni-list-item :border="false" class="CosCollections-list-content-item" v-for="(item,index) in CoserCollectionList" :key="index" direction="row">
							<view slot="header" class="CosCollections-list-content-item-header">
								<image :src="item.image_url" mode="aspectFill" class="CosCollections-list-content-item-image"></image>
							</view>
							<view slot="body" class="CosCollections-list-content-item-body">
								<text class="CosCollections-list-content-item-body-title">{{item.title}}</text>
								<view class="CosCollections-list-content-item-body-character">Cos人物: <text class="CosCollections-list-content-item-body-character-text">{{item.CosCharacter}}</text></view>
								<view class="CosCollections-list-content-item-body-activeStatus" v-if="item.isActive==true">进行中</view>
								<view class="CosCollections-list-content-item-body-notactiveStatus" v-if="item.isActive==false">已结束</view>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			<view class="CosCollections-allButton">
				<view class="CosCollections-Button">查看合集活动</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				PageInfo: {
					image_url: "../../static/CollectionSources/1.jpg",
					title: "【季番人物征集】第10期",
					theme: "《请问您今天要来点兔子吗？》",
					time: "12月1日-1月10日"
				},
				CoserCollectionList: [{
						id: 0,
						image_url: "../../static/CollectionSources/6.jpeg",
						title: "【Cos正品征集】第10-1期",
						CosCharacter: "宇治松 千夜",
						isActive: false
					},
					{
						id: 1,
						image_url: "../../static/CollectionSources/7.jpeg",
						title: "【Cos正品征集】第10-2期",
						CosCharacter: "香风智乃",
						isActive: false
					},
					{
						id: 2,
						image_url: "../../static/CollectionSources/8.jpeg",
						title: "【Cos正品征集】第10-3期",
						CosCharacter: "保登 心爱",
						isActive: true
					},
					{
						id: 3,
						image_url: "../../static/CollectionSources/9.jpg",
						title: "【Cos正品征集】第10-4期",
						CosCharacter: "天天座理世",
						isActive: false
					},
					{
						id: 4,
						image_url: "../../static/CollectionSources/10.jpg",
						title: "【Cos正品征集】第10-5期",
						CosCharacter: "桐间纱路",
						isActive: false
					}
				]
			}
		},
		methods: {

		},
		computed: {

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
</style>
