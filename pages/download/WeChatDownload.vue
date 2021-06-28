<template>
	<view class="content d_flex">
		<view class="logo">
			<image src="@/static/images/download/touxiang.png" mode=""></image>
		</view>
		<view class="app_name">
			<image src="@/static/images/download/logo.png" mode=""></image>
		</view>
		<u-icon name="arrow-down-fill" color="#F1CAAB" size="30"></u-icon>
		<view class="app_intro">
			<image src="@/static/images/download/text.png" mode=""></image>
		</view>
		<view class="download_btn">
			<u-button class="btn" shape="circle">立即下载</u-button>
		</view>
		<view class="foot_note">
			<view class="note_1">真实身份：官方认证，人工审核，人脸识别</view>
			<view class="note_2">隐私保护：照片阅后即焚，视频、联系方式隐私查看</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					background: '#29282E'
				}
			}
		},
		methods: {

		},
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
		margin: 80rpx 0 38rpx 0;
	}

	.app_name {
		width: 171rpx;
		height: 82rpx;
		margin-bottom: 50rpx;
	}

	.app_intro {
		width: 560rpx;
		height: 145rpx;
		margin: 50rpx 0 40rpx 0;
	}

	.download_btn {
		width: 380rpx;
		height: 110rpx;

		.btn {
			width: 100%;
			height: 100%;
			background-color: rgba(136, 136, 136, 0.41);
			color: #F1CAAB;
			font-size: 38rpx;
			border: 4rpx solid rgba(255, 255, 255, 0.41);
		}
	}

	.foot_note {
		margin-top: 239rpx;
		background-color: rgba(51, 51, 51, 0.1);
		padding: 34rpx 26rpx;
		border-radius: 8rpx;

		view {
			color: #F8F8F8;
			font-size: 24rpx;
		}
		.note_1{
			margin-bottom: 26rpx;
		}
	}
</style>
