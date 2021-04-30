<template>
	<view class="">
		<!-- <view class="save" @click="saveNavi">保存</view> -->
		<view class="addLink">
			<view class="function-bar-editor" @click="addLink">
				<view :class="['fas','fa-edit']"></view>
			</view>
		</view>
		<view class="" v-for="(item,index) in clothList" :key="index">
			<delSlideLeft :item="item" :data_transit="{index:index,item:item}" @delItem="delItem">
				<view class="link-box">
					<view class="form-item">
						<text>标签:</text>
						<view class="form-item-input">
							<input type="text" :value="item.name" placeholder="" @input="editClothLabel($event, index)"/>
						</view>
					</view>
					<view class="form-item form-item1">
						<text>服饰链接:</text>
						<view class="form-item-input form-item-teatarea">
							<textarea :value="item.link" placeholder="在此处粘贴服饰链接" @input="editClothLink($event, index)"/>
						</view>
					</view>
				</view>
			</delSlideLeft>
		</view>
	</view>

</template>


<script>
	import delSlideLeft from '@/components/ay-operate/mydel_slideLeft.vue'
	export default {
		components: {
			delSlideLeft,
		},
		data() {
			return {
				wishId:'',
				myWish:'',
				// 服饰链接列表
				clothList: [
					{
                    name: '中牌',
					link: 'hwfeihwfowieh',
					},
					{
					name: '梗豆',
					link: 'whifeuowieiow',
					}
					
				],
				clothLabels: ''
			};
		},
		methods: {
			// 左滑删除链接
			delItem: function(e) {
				this.clothList.splice(e.data.index, 1)
			},
			// 添加一条链接
			addLink: function(){
				this.clothList.push({
					name: '',
					link: '',
				})
				console.log(this.clothList)
			},
			// 编辑服饰标签
			editClothLabel: function(e, i){
				console.log(e.detail.value)
				this.clothList[i].name = e.detail.value
			},
			// 编辑服饰链接
			editClothLink: function(e, i){
				console.log(e.detail.value)
				this.clothList[i].link = e.detail.value
				
			},
			saveNavi(){
				var list=JSON.stringify(this.clothList)
				const that=this
				if(that.myWish==1){
					uni.$emit('editClothLink',{
						clothList:list
					})
					uni.navigateBack({})
					// uni.navigateTo({
					// 	url:'../../works/myWish?clothList='+list+'&wishId='+that.wishId
					// })
					
				}
				else if (that.myWish==2){
					uni.navigateTo({
						url:'../../works/addMyWish?clothList='+list
					})
				}
			}

		},
		// 点击完成按钮触发事件
		onNavigationBarButtonTap() {
			var list=JSON.stringify(this.clothList)
			const that=this
			uni.$emit('editClothLink',{
				clothList:list
			})
			uni.navigateBack({})
			// if(that.myWish==1){
			// 	uni.$emit('editClothLink',{
			// 		clothList:list
			// 	})
			// 	uni.navigateBack({})
			// }
			// else if (that.myWish==2){
			// 	uni.navigateTo({
			// 		url:'../../works/addMyWish?clothList='+list
			// 	})
			// }
		},
		onLoad: function(option) {
			const that = this
			that.index = option.index
			that.wishId = option.wishId ||''
			that.myWish = option.myWish
			if(option.clothList){
				var t=JSON.parse(option.clothList)
				that.clothList = t
				console.log(that.clothList)
			}
			if(that.clothList.length == 0){
				that.clothList.push({
					name: '',
					link: '',})
			}
			const eventChannel = that.getOpenerEventChannel()
			// 监听emitClothLink事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('emitClothLink', function(data) {
			    that.clothList = data.clothList
				// 初始化服饰链接为空时添加一个空编辑框
				if(that.clothList.length == 0){
					that.clothList.push({
						name: '',
						link: '',})
				}
			})
		}
	}
</script>

<style>
	@import url("myClothLink.css");
</style>
