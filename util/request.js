const BASE_URL = "http://81.68.73.252:8086"
// const BASE_URL = "/api"
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			header: options.header || {},
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data: options.data || {},
			sslVerify: false,
			success: (res)=>{
				// uni.showToast({
				// 	title: '接口请求成功'
				// })
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

export const myuploadFile = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.uploadFile({
			url:BASE_URL+options.url,
			files: options.files,
			formData: options.formData,
			success: (res)=>{
				// uni.showToast({
				// 	title: '接口请求成功'
				// })
				console.log(res)
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