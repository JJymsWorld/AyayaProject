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
				   <view><text>+关注</text></view>
				</view>
				
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
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					},
					{
						userid:'',
						avatar:'../../../static/iconn/2.jpg',
						username:'布兰妮老田田',
						signature:'没有个性签名！！！！'
					}
				]
			}
		}
	}
</script>

<style>
	@import url("fan.css");
</style>
