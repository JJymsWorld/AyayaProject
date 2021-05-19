<template>
	<view>
		<view class="CoserHirePage-wrapper">
			<view class="CosCollections-top">
				<view class="CosCollections-top-imgwrapper">
					<image class="CosCollections-top-image" :src="CoserHirePageInfo.image_url" mode="widthFix"></image>
				</view>
				<view class="CosCollections-top-title">
					{{CoserHirePageInfo.title}}
				</view>
				<view class="CosCollections-top-themeandtime">
					<view class="CoserHirePage-top-theme">主题: {{CoserHirePageInfo.theme}}</view>
					<view class="CoserHirePage-top-time">线下活动时间: {{CoserHirePageInfo.time}}</view>
					<view class="CoserHirePage-top-positon">地址: {{CoserHirePageInfo.position}}</view>
				</view>
				<view class="CoserHirePage-viewButton" @click="gotoWorksPage(opusid)">
					<view class="CoserHirePage-viewButton-style">查看正片</view>
				</view>
			</view>
			<view class="AttendCoser-list">
				<view class="AttendCoserlist-bar">
					<text class="AttendCoserlist-bar-label">
						参演Coser
					</text>
				</view>
				<view class="AttendCoserlist-content">
					<uni-list class="AttendCoserlist-content-listWrapper" :border="false">
						<uni-list-item :border="false" class="AttendCoserlist-content-listItem" v-for="(item,index) in AttendCoserlist" :key="index" direction="row">
							<view slot="header" class="AttendCoserlist-content-listItem-header" >
								<text class="AttendCoserlist-content-listItem-header-Character" >{{item.Character_name}}:</text>
							</view>
							<view slot="body" class="AttendCoserlist-content-listItem-body">
								<text class="AttendCoserlist-content-listItem-body-Coser" @click="gotoCoserHomePage(item.id)">{{item.Coser_name}}</text>
								<text class="AttendCoserlist-content-listItem-body-label">#{{item.label}} #{{item.wardCategory}}</text>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				opusid:1,
				CoserHirePageInfo: {
					image_url: "../../static/CollectionSources/1.jpg",
					title: "【季番线下合集】第10期",
					theme: "《请问您今天要来点兔子吗？》",
					time: "2020年10月25日",
					position:"杭州市..."
				},
				AttendCoserlist:[
					{
						id:1,
						Character_name:"宇治松 千夜",
						Coser_name:"小娜",
						label:"【Cos正品征集】第10-1期",
						wardCategory:"最佳Coser"
					},
					{
						id:2,
						Character_name:"香风智乃",
						Coser_name:"奈奈猫",
						label:"【Cos正品征集】第10-2期",
						wardCategory:"最佳Coser"
					},
					{
						id:3,
						Character_name:"保登 心爱",
						Coser_name:"佳佳",
						label:"【Cos正品征集】第10-3期",
						wardCategory:"最佳Coser"
					},
					{
						id:4,
						Character_name:"天天座里世",
						Coser_name:"屿y",
						label:"【Cos正品征集】第10-4期",
						wardCategory:"最佳Coser"
					},
					{
						id:5,
						Character_name:"桐间纱路",
						Coser_name:"夜呀mmm",
						label:"【Cos正品征集】第10-5期",
						wardCategory:"最佳Coser"
					},
					{
						id:6,
						Character_name:"香风隆宏",
						Coser_name:"青玉子",
						label:"【Cos正品征集】第10-6期",
						wardCategory:"最佳Coser"
					}
				]
			}
		},
		methods:{
			gotoWorksPage(e){
				uni.navigateTo({
					url:"../works/works?workId=" + e
				})
			},
			gotoCoserHomePage(e){
				uni.navigateTo({
					url:"../Mypage/homePage/homePage?userId=" + e
				})
				console.log(e)
			}
		},
		computed:{
			
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
