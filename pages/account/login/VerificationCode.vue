<template>
	<view class="login">
		<view class="title">
			<view class="app_name">输入验证码</view>
			<view class="sub_intro">
				短信已发送至 +86 {{ phone }}
			</view>
			<view class="cut_line"></view>
		</view>
		<view class="content">
			<u-message-input class="code" :maxlength="6" :breathe="true" width="80" @change="change" @finish="finish">
			</u-message-input>
		</view>
		<view class="send_again">
			<text @click="sendMessge">重新发送</text>
		</view>
		<common-btn msg="登 录" @toNext="handleLogin"></common-btn>
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
				phone: '',
				code: ''
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync("phone");
		},
		methods: {
			change(e) {
				this.code = e;
			},
			finish(e) {
				this.code = e;
				console.log(this.code)
			},
			sendMessge() {
				this.$api.sendSms(this.phone).then(res => {
					if (res.code == 1) {
						this.$u.toast('发送成功');
					}
				})
			},
			handleLogin() {
				if (this.code == '' || this.code.length !== 6) {
					this.$u.toast('验证码输入有误')
					return false;
				}
				let data = {
					phone: this.phone,
					validateCode: this.code
				}
				this.$api.login(data).then(res => {
					if (res.code == 1) {
						let user = res.data[0];
						uni.setStorageSync('loginUser', user);
						uni.setStorageSync('isVip', user.isVip);
						if (user.gender) {
							uni.switchTab({
								url: '../../index/index'
							})
						} else {
							uni.navigateTo({
								url: '../userInfo/ChooseSex'
							})
						}
					}
				})
			}
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
		padding: 60rpx;
	}

	.content {
		margin-top: 260rpx;
		margin-bottom: 80rpx;
	}

	.send_again {
		color: #888888;
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 40rpx;
	}
</style>
