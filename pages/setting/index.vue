<template>
	<view class="content">
		<view style="height: 8rpx; background-color: #F4F4F4;"></view>
		<u-cell-group :border="false">
			<u-cell-item title="用户协议" :titleStyle="titleStyle" @click="toAgreement">
				<u-icon slot="icon" size="88" name="../../static/images/setting/icon_5.png"></u-icon>
			</u-cell-item>
			<u-cell-item title="账号与安全" :titleStyle="titleStyle" @click="toAccountSecurity">
				<u-icon slot="icon" size="88" name="../../static/images/setting/icon_6.png"></u-icon>
			</u-cell-item>
		</u-cell-group>
		<common-btn msg="退出登录" @toNext="handleExit"></common-btn>
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
				titleStyle: {
					'marginLeft': '10rpx',
					'color': '#333333'
				},
			}
		},
		methods: {
			handleExit() {
				try {
					uni.clearStorageSync();
				} catch (e) {}
				uni.reLaunch({
					url: '../account/login/Login'
				})
			},
			toAgreement() {
				uni.navigateTo({
					url: './agreement/Agreement'
				})
			},
			toAccountSecurity() {
				uni.navigateTo({
					url: './accountSecurity/AccountSecurity'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .base_btn {
		position: fixed;
		bottom: 98rpx;
		left: auto;
	}
</style>
