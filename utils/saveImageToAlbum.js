//保存二维码(base64)到相册
export function saveHeadImgFile(base64, quality) {
	const bitmap = new plus.nativeObj.Bitmap("test");
	return new Promise((resolve, reject) => {
		// 从本地加载Bitmap图片
		bitmap.loadBase64Data(base64, function() {
			const url = "_doc/" + new Date().getTime() + ".png"; // url为时间戳命名方式
			bitmap.save(url, {
				// overwrite: true, // 是否覆盖
				quality: quality // 图片清晰度
			}, (i) => {
				console.log('保存图片成功：'+JSON.stringify(i));  
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: function() {
						bitmap.clear();		//销毁Bitmap图片
						resolve({
							code: 1,
							msg: '保存成功',
							filePath: url
						});
					}
				});
			}, (e) => {
				reject('保存图片失败：' + JSON.stringify(e));
			});
		}, (e) => {
			reject('加载图片失败：' + JSON.stringify(e));
		});
	})
}
