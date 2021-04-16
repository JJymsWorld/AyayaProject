const BASE_URL = "http://8.136.216.96:8086"
<<<<<<< HEAD
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			header: options.header || {},
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data: options.data || {},
			sslVerify: false,
=======

			
>>>>>>> a3304d4e5b50c730a4f211d95d351218591e8029
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