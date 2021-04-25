<template>
	<view class="">
		<view class="addLink">
			<view class="function-bar-editor" @click="addLink">
				<view :class="['fas','fa-edit']"></view>
			</view>
		</view>
		<view v-for="(item,index) in clothList" :key="index">
			<delSlideLeft :item="item" :data_transit="{index:index,item:item}" @delItem="delItem">
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
			</delSlideLeft>
		</view>
	</view>

</template>


<script>
	import delSlideLeft from '@/components/ay-operate/del_slideLeft.vue'
	export default {
		components: {
			delSlideLeft,
		},
		data() {
			return {
				// 服饰链接列表
				clothList: [{
                    name: '',
					link: '',
                    txtStyle:'',//该字段必须初始化传入
                }],
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
					txtStyle:'',//该字段必须初始化传入
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
				
			}

		},
		// 点击完成按钮触发事件
		onNavigationBarButtonTap() {
			for (var item in this.clothList) {
				this.clothLabels += '#' + this.clothList[item].name + '#'
			}
			// 传回@用户name及index到发布页面
			uni.$emit("emitClothLabels", {
				clothLabels: this.clothLabels,
			});

			uni.navigateBack()
		},
		onLoad: function(option) {
			this.index = option.index
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据

		}
	}
</script>

<style>
	@import url("./clothLink");
</style>
