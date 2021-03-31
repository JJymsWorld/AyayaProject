const BASE_URL = "http://8.136.216.96:8080"
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				uni.showToast({
					title: '接口请求成功'
				})
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '接口请求失败'
				})
				reject(err)
			}
		})
	})
}