<template>
	<view class="content d_flex">
		<view class="logo">
			<image src="@/static/images/download/touxiang.png" mode=""></image>
		</view>
		<view class="app_name">
			<image src="@/static/images/download/bg2.png" mode=""></image>
		</view>
		<view class="note">
			确定手机号后下载并注册遇见，前往公众号
			“<text>遇见App</text>”首次充值会员<text>八折优惠</text>~
		</view>
		<u-form :model="form" ref="uForm" :border-bottom="false" class="form">
			<u-form-item prop="phone" :border-bottom="false" class="input">
				<view class="left_icon">+86 <u-icon name="arrow-down-fill" size="22" color="#B2B2B2" :customStyle="iconStyle"></u-icon></view>
				<u-input v-model="form.phone" placeholder="请输入手机号码" :clearable="clearable"></u-input>
			</u-form-item>
			<u-form-item prop="code" :border-bottom="false" class="input">
				<u-input v-model="form.code" type="number" placeholder="请输入验证码" :clearable="clearable"></u-input>
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"
					:keep-running="true">
				</u-verification-code>
				<view @tap="getCode" style="color: #FFFFFF;">{{tips}}</view>
			</u-form-item>
		</u-form>
		<common-btn msg="确认手机号并下载" @toNext="toNext"></common-btn>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	export default {
		components: {
			CommonBtn
		},
		data() {
			return {
				form: {
					phone: '',
					code: ''
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: ['blur']
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur']
					}]
				},
				background: {
					background: '#29282E'
				},
				tips: '',
				seconds: 10,
				clearable: false,
				iconStyle: {
					margin: '0 38rpx 0 10rpx',
				}
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
			toNext(){
				this.$refs.uForm.validate(valid => {
					if(valid){
						
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: url(@/static/images/download/bg.png) no-repeat;
		background-size: 100% 100%;
		flex-direction: column;
	}

	.logo {
		width: 150rpx;
		height: 150rpx;
		margin: 60rpx 0 50rpx 0;
	}

	.app_name {
		width: 497rpx;
		height: 184rpx;
		margin-bottom: 50rpx;
	}

	.note {
		width: 616rpx;
		background-color: rgba(248, 248, 248, 0.2);
		padding: 30rpx;
		border-radius: 8rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 46rpx;
		margin-bottom: 70rpx;

		text {
			color: #F2AC46;
		}
	}

	.form {
		width: 610rpx;
	}
	.input{
		margin-bottom: 40rpx;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 80rpx;
		padding: 9rpx 30rpx;
	}
	.left_icon{
		color: #F8F8F8;
		font-size: 28rpx;
	}
	::v-deep .uni-input-input{
		color: #FFFFFF;
	}
	::v-deep .btn{
		margin-top: 60rpx;
		background-color: #CEA159;
		color: #333333;
	}
</style>
