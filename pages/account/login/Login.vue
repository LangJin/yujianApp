<template>
	<view class="login">
		<!-- :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}"> -->
		<view class="logo">
			<image src="../../../static/images/login/logo.png" mode=""></image>
		</view>
		<view class="title">
			<view class="app_name">遇见·高端交友社区</view>
			<view class="cut_line"></view>
		</view>
		<u-form :model="form" ref="uForm" :errorType="errorType" :borderBottom="false" class="loginForm">
			<u-form-item label="+86" prop="phone" :borderBottom="false" class="input_item" :labelStyle="{ fontSize: '30rpx' }">
				<u-input v-model="form.phone" placeholder="请输入手机号码" :placeholderStyle="'color: #B2B2B2; fontSize: 30rpx'"
					:clearable="false" :customStyle="customStyle"/>
			</u-form-item>
		</u-form>
		<common-btn msg="发送验证码" @toNext="sendMessge"></common-btn>
		<view class="note">未注册的手机号验证后自动登录</view>
		<view class="foot">
			登录即表示您同意并遵守<text>《APP服务协议》</text>和<text>《APP隐私政策》</text>
		</view>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	import indexBackgroundImage from '@/static/images/login/bg.png'
	export default {
		components: {
			CommonBtn
		},
		data() {
			return {
				indexBackgroundImage: indexBackgroundImage,
				form: {
					phone: ''
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: ['change', 'blur']
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '手机号码格式不正确',
						trigger: ['blur'],
					}]
				},
				errorType: ['toast'],
				customStyle: {
					fontSize: '30rpx'
				}
			}
		},
		methods: {
			sendMessge() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.setStorageSync("phone", this.form.phone);
						this.$api.sendSms(this.form.phone).then(res => {
							if (res.code == 1) {
								uni.navigateTo({
									url: './VerificationCode'
								})
							}
						})
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FAFAFA;
	}
</style>
<style lang="scss" scoped>
	.login {
		min-height: 100vh;
		padding: 0 70rpx;
		padding-top: 128rpx;
	}

	.logo {
		width: 160rpx;
		height: 160rpx;
	}

	.loginForm {
		margin: 218rpx 0rpx 40rpx 0rpx;
	}

	.input_item {
		width: 610rpx;
		margin: 0 auto;
		border-radius: 60rpx;
		background-color: #FFFFFF;
		padding: 10rpx 0;
		padding-left: 30rpx;
		box-shadow: 0rpx 3rpx 6rpx rgba(0, 0, 0, 0.16);
	}

	.note {
		text-align: center;
		margin-top: 40rpx;
		color: #888888;
		font-size: 24rpx;
	}

	.foot {
		width: 610rpx;
		position: fixed;
		bottom: 48rpx;
		left: auto;
		color: #888888;
		font-size: 22rpx;

		text {
			color: #B46628;
		}
	}
</style>
