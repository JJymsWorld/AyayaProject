<template>
	<view>
		<view class="Hotcontent-list-box">
			<uni-list :border="false">
				<uni-list-item :border="false" :ellipsis='2' direction="row" v-for="item in HotList" :key="item.id"
					:title="item.text">
					<template v-slot:body>
						<view class="List-text">{{item.text}}</view>
					</template>
					<template v-slot:footer>
						<view class="Img-In-List">
							<image class="ListImg-Style" :src="item.image_url" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				HotList: [{
						id: 1,
						image_url: '../../static/HotListImg/1.jpg',
						text: '蜜瓜JK妆!毕业要和姐妹去迪斯尼拍照呀!'
					},
					{
						id: 2,
						image_url: '../../static/HotListImg/2.jpg',
						text: '江南美人图|奇迹团团环游中华之乌镇'
					},
					{
						id: 3,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 4,
						image_url: '../../static/HotListImg/4.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 5,
						image_url: '../../static/HotListImg/5.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 6,
						image_url: '../../static/HotListImg/6.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 7,
						image_url: '../../static/HotListImg/7.jpg',
						text: '一梦 蜃影|奇迹党党环游中华之丝绸之路'
					},
					{
						id: 8,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 9,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 10,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 11,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					},
					{
						id: 12,
						image_url: '../../static/HotListImg/3.jpg',
						text: '"最是人间留不住·朱颜辞镜花辞树"黑塔利亚Cos'
					}
				]
			}
		},
		methods: {

		}

	}
</script>

<style>
	.Hotcontent-list-box {
		box-sizing: border-box;
		border-style: outset;
		border-radius: 30rpx;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 40rpx;
		background-color: #FFFFFF;
		padding: 10rpx;
	}

	.List-text {
		font-size: 26rpx;
		text-align: left;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 30rpx;
	}

	.Img-In-List {
		width: 200rpx;
		height: 120rpx;
	}

	.ListImg-Style {
		width: 200rpx;
		height: 120rpx;
		border-style: none;
		border-radius: 15rpx;
	}
	.uni-list::before{
		display: none;
	}
</style>
