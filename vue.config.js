module.exports = {
	devServer: {
		proxy: {
			'/yujian': {
				// target: 'http://192.168.0.124:8091',		//测试地址
				target: 'http://yujian.testgoup.com'
			}
		}
	}
}
