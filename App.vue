<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.css");
	/*每个页面公共css */
	@import url("./common/uni.css");
	/* 动画库 */
	@import url("./common/animate.css");
	/* vant-weapp */
	@import "./wxcomponents/vant/dist/common/index.wxss";
	/* 自定义图标库 */
	@import url("./common/iconfont.css");
</style>
