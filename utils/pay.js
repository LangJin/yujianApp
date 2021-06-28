//支付宝app支付
export function AlipayApp(params) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'alipay',
			orderInfo: params,
			success(res) {
				console.log('success:' + JSON.stringify(res));
				if (res.errMsg === 'requestPayment:ok') {
					resolve({
						success: true,
						msg: '支付成功',
						desc: res.errMsg,
						rawData: res
					});
				} else {
					resolve({
						success: true,
						msg: '支付成功, 回调异常',
						desc: res.errMsg,
						rawData: res
					});
				}
			},
			fail(err) {
				console.log('fail:' + JSON.stringify(err));
				if (err.errMsg === 'requestPayment:fail') {
					reject({
						cancel: true,
						msg: '取消支付',
						desc: '用户取消支付操作',
						rawData: err
					});
				} else {
					reject({
						cancel: false,
						msg: '支付异常',
						desc: err.errMsg,
						rawData: err
					});
				}
			}
		})
	})
}

//微信app支付
export function WXPayApp(params) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			orderInfo: params,
			success(res) {
				console.log('success:' + JSON.stringify(res));
				if (res.errMsg === 'requestPayment:ok') {
					resolve({
						success: true,
						msg: '支付成功',
						desc: res.errMsg,
						rawData: res
					});
				} else {
					resolve({
						success: true,
						msg: '支付成功, 回调异常',
						desc: res.errMsg,
						rawData: res
					});
				}
			},
			fail(err) {
				console.log('fail:' + JSON.stringify(err));
				if (err.errMsg === 'requestPayment:fail') {
					reject({
						cancel: true,
						msg: '取消支付',
						desc: '用户取消支付操作',
						rawData: err
					});
				} else {
					reject({
						cancel: false,
						msg: '支付异常',
						desc: err.errMsg,
						rawData: err
					});
				}
			}
		})
	})
}


