<template>
	<view>
	<view class="backbox">
		<view class="back" @tap="navigateBack"><</view>
		<view class="backBoxButtom"></view>
		<view class="backBoxMain">
			<image src="../../../static/iconn/2.jpg" mode="aspectFill"></image>
			<text class="backBoxUsername">{{username}}</text>
			<text class="backBoxSign">{{sign}}</text>
			<view class="backBoxEdit"><text>编辑资料</text></view>
			<view class="backBoxCos"><text>cos榜</text></view>
			<table class='backBoxTable'>
				<tr>
					<td>
						<view class="boxTableNum">{{interstNum}}</view>
						<view class="boxTableText">关注</view>
					</td>
					<td>
						<view class="boxTableNum">{{fanNum}}</view>
						<view class="boxTableText">粉丝</view>
					</td>
					<td>
						<view class="boxTableNum">{{starNum}}</view>
						<view class="boxTableText">获应援</view>
					</td>
				</tr>
			</table>
		</view>
	</view>
	<!-- 导航栏 -->
	<view class="navigateUl">
		<ul>
			<li>动态</li>
			<li>作品</li>
			<li>收藏夹</li>
		</ul>
	</view>
   </view>
</template>

<script>
	export default{
		data(){
			return{
				username:'jennie',
				sign:'你还没有个性签名哦!',
				interstNum:'2',
				fanNum:'0',
				starNum:'0'
			}
		},
		methods:{
			navigateBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	@import url("homePageCss");
</style>
