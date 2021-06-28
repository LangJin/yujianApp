// 使用函数节流防止重复点击
function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1500
	}
	let _lastTime = null

	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments)
			_lastTime = _nowTime
		}
	}
}