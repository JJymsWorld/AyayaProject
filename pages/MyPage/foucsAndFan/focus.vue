<template>
	<view>
		<uni-list class="focusBox" :border="false">
	    <uni-list-item :border="false" v-for="(item,index) in focusPerson" :key="index">
	        <!-- 自定义 body -->
	        <view slot="body" class="focusItemBox">
				<image :src="item.avatar" mode="aspectFill"></image>
				<view class="focusText">
				 <view>{{item.username}}</view>
				 <view>{{item.signature}}</view>
				</view>
				<view class="cancelButton" v-if="item.isFocus==1" @click="isFocusFunc(item.isFocus,index)"><text>已关注</text></view>
				<view class="cancelButtonNot" v-if="item.isFocus==0" @click="isFocusFunc(item.isFocus,index)"><text>关注</text></view>
			</view>

	    </uni-list-item>
	</uni-list>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				userId:'',
				focusPerson:[
					{
						userid:'',
						isFocus: 1,
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						isFocus: 1,
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						isFocus: 1,
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						isFocus: 1,
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						isFocus: 1,
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					}
				]
			}
		},
	methods:{
		isFocusFunc(i,index){
			if(i == 0){
				this.$data.focusPerson[index].isFocus=1;
			}
			else{
				this.$data.focusPerson[index].isFocus=0;
			}
		}
	}
	}
</script>

<style>
	@import url("focus.css");
</style>
