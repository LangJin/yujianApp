<template>
	<view class="content">
		<u-navbar :background="background" :border-bottom="false">
			<view slot="right" class="right_icon" @click="handlePublish">发布</view>
		</u-navbar>
		<view class="main">
			<u-form :model="form" :border-bottom="false" class="form">
				<u-form-item prop="content">
					<u-input v-model="form.content" type="textarea" :height="height" :auto-height="true"
						placeholder="说点什么，让大家看到不一样的你..." :clearable="false" />
				</u-form-item>
				<u-form-item>
					<u-upload ref="uUpload" :action="action" name="upload" :header="header" :file-list="fileList"
						max-count="9" >
					</u-upload>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	import upload from '@/config/uploadFile.js'
	export default {
		data() {
			return {
				background: {
					background: '#FFFFFF'
				},
				form: {
					content: '',
					photos: undefined
				},
				fileList: [],
				height: 300,
				action: upload.url,
				header: {
					token: ''
				},
				user: null
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : null;
			if (this.user !== null) {
				this.header.token = this.user.token;
			}
		},
		methods: {
			//发布
			handlePublish() {
				if (this.form.content == '' || this.form.content.length <= 0) {
					this.$u.toast('请输入发布内容');
					return false;
				}
				this.form.photos = this.getFileList();
				if (this.form.photos.length === 0) {
					this.$u.toast('请上传图片');
					return false;
				}
				this.form.userId = this.user.id;
				this.$api.saveDynamic(this.form).then(res => {
					if (res.code == 1) {
						this.$u.toast('发布成功');
						setTimeout(() => {
							uni.switchTab({
								url: '../index'
							})
						}, 1000)
					}
				})
			},
			//获取图片路径
			getFileList() {
				let fileList = [];
				let nameFiles = [];
				fileList = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				for (let i = 0; i < fileList.length; i++) {
					nameFiles.push(fileList[i].response.data[0]);
				}
				return nameFiles;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.right_icon {
		background-color: #B46628;
		color: #FFFFFF;
		margin-right: 32rpx;
		font-size: 24rpx;
		padding: 8rpx 28rpx;
		border-radius: 40rpx;
	}

	.form {
		margin-top: 30rpx;
	}

	/deep/.u-list-item {
		width: 210rpx !important;
		height: 210rpx !important;
		margin-right: 9rpx;
	}
</style>
