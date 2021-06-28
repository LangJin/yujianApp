<template>
	<view class="login">
		<view class="title">
			<view class="app_name">请完善您的资料</view>
			<view class="cut_line"></view>
		</view>
		<view class="content">
			<u-form :model="form" ref="uForm" :borderBottom="false" :errorType="errorType">
				<!-- <u-form-item prop="avater">
					<u-upload :action="action" ref="uUpload" name="upload" :header="header" :file-list="fileList"
						:max-size="5 * 1024 * 1024" max-count="1" @on-success="onSuccess" @on-remove="onRemove">
					</u-upload>
				</u-form-item> -->
				<u-form-item prop="nickName" :style="labelStyle" class="input_item">
					<u-input v-model="form.nickName" placeholder="给自己取个昵称吧~"
						:placeholderStyle="'color: #888888; fontSize: 30rpx'" :clearable="clearable" :customStyle="customStyle"/>
				</u-form-item>
				<u-form-item prop="birthday" :style="labelStyle" class="input_item">
					<u-input v-model="form.birthday" type="select" placeholder="请选择你的生日" @click="show = true"
						:placeholderStyle="'color: #888888; fontSize: 30rpx'" :clearable="clearable" :customStyle="customStyle"/>
					<u-picker v-model="show" mode="time" @confirm="changeBirthday"></u-picker>
				</u-form-item>
				<u-form-item prop="invitationCode" :style="labelStyle" class="input_item">
					<u-input v-model="form.invitationCode" placeholder="邀请码（选填）"
						:placeholderStyle="'color: #888888; fontSize: 30rpx'" :clearable="clearable" :customStyle="customStyle"/>
				</u-form-item>
			</u-form>
		</view>
		<common-btn msg="下一步" @toNext="toNext"></common-btn>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	import Upload from '@/config/uploadFile.js'

	export default {
		components: {
			CommonBtn
		},
		data() {
			return {
				form: {
					// avatarUrl: '',
					nickName: '',
					birthday: '',
					invitationCode: ''
				},
				rules: {
					nickName: [{
						required: true,
						message: '给自己取个昵称吧~',
						trigger: ['blur']
					}],
					birthday: [{
						required: true,
						message: '请选择你的生日',
						trigger: ['blur']
					}]
				},
				errorType: ['toast'],
				clearable: false,
				customStyle: {
					fontSize: '30rpx'
				},
				action: Upload.url,
				header: {
					token: ''
				},
				fileList: [],
				labelStyle: {
					marginLeft: '20rpx'
				},
				show: false,
				mode: 'date',
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
			toNext() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.id = this.user.id;
						this.$api.saveUserInfo(this.form).then(res => {
							if (res.code == 1) {
								this.getUserInfo();
							}
						})
					}
				})
			},
			//获取个人信息
			getUserInfo() {
				let user = uni.getStorageSync('loginUser');

				this.$api.getUserInfo().then(res => {
					if (res.code == 1) {
						let data = res.data[0];
						user.gender = data.gender;
						uni.setStorageSync('loginUser', user);
						uni.switchTab({
							url: '../../index/index'
						})
					}
				})
			},
			changeBirthday(e) {
				this.form.birthday = e.year + "-" + e.month + "-" + e.day;
			},
			onSuccess(data) {
				//图片路径
				let imgUrl = data.data[0];
				this.form.avatarUrl = imgUrl;
			},
			onRemove() {
				this.form.avatarUrl = '';
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FAFAFA;
	}
</style>
<style lang="scss" scoped>
	.login {
		padding: 60rpx;
	}

	.content {
		margin: 100rpx 0;
		justify-content: space-around;
	}

	.input_item {
		width: 610rpx;
		margin: 0 auto;
		border-radius: 60rpx;
		background-color: #FFFFFF;
		padding: 10rpx 0;
		padding-left: 30rpx;
		box-shadow: 0rpx 3rpx 6rpx rgba(0, 0, 0, 0.16);
		margin-bottom: 40rpx;
	}

	/deep/.u-input {
		.u-input__right-icon--select {
			display: none;
		}
	}
</style>
