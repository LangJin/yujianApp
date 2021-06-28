import config from '@/config/index.js'

const request = {}

request.globalRequest = (url, method, data) => {
	let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : null;
	const headers = {
		'Content-Type': 'application/json;charset=UTF-8'
	}
	if (user !== null) {
		headers.token = user.token
	}

	return uni.request({
		url: `${config.api}${url}`,
		method,
		data: data,
		header: headers
	}).then(res => {
		if (res[1].statusCode !== 200) {
			uni.$u.toast('请求错误');
		} else if (res[1].data.code == 0) {
			uni.$u.toast(res[1].data.msg);
		} else if (res[1].data.code && res[1].data.code == 9) {
			uni.$u.toast(res[1].data.msg);
			uni.reLaunch({
				url: '/pages/account/login/Login'
			})
		}
		return res[1].data
	}).catch(params => {
		return Promise.reject();
	})
}
export default request
