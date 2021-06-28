<template>
	<view class="content">
		<view class="main">
			<view class="view_qrcode">
				<!-- 二维码 -->
				<view class="canvas canvas-hide">
					<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
				</view>
				<view class="image">
					<image :src="qrcodeSrc" />
				</view>
			</view>
			<common-btn msg="保存邀请二维码到相册" @toNext="saveToAlbum"></common-btn>
			<common-btn class="btn_2" msg="复制邀请链接到剪切板" @toNext="copyToShearPlate"></common-btn>
		</view>
		<view class="foot_note">
			<text @click="toSharePosters">如何分享？</text>
		</view>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	import uQRCode from '@/utils/uqrcode.js'
	import { saveHeadImgFile } from '@/utils/saveImageToAlbum.js'

	export default {
		components: {
			CommonBtn
		},
		data() {
			return {
				qrcodeText: '', //路径
				qrcodeSize: uni.upx2px(284),
				qrcodeSrc: '',
			}
		},
		onLoad() {
			let info = uni.getStorageSync('info') ? uni.getStorageSync('info') : undefined;
			let invitationCode = info.invitationCode;
			this.qrcodeText = `http://yujian.testgoup.com/#/?invitationCode=${invitationCode}`;
			this.make();
		},
		methods: {
			make() {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 6
				}).then(res => {
					this.qrcodeSrc = res
					this.show = true;
				}).finally(() => {
					uni.hideLoading()
				})
			},
			saveToAlbum() {
				saveHeadImgFile(this.qrcodeSrc, '').then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '保存成功！',
							icon: 'success',
							duration: 2000
						})
					}
				});
			},
			copyToShearPlate() {

			},
			toSharePosters() {
				uni.navigateTo({
					url: '../introPosters/IntroPosters'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 20rpx;
	}

	.view_qrcode {
		width: 686rpx;
		height: 849rpx;
		background: url(@/static/images/invite/share.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 50rpx;
		padding-top: 310rpx;
		padding-left: 201rpx;
	}

	::v-deep .btn {
		width: 100%;
		height: 92rpx;
		margin-bottom: 20rpx;
		background-color: #F2AC46;
	}

	.btn_2 {
		::v-deep .btn {
			background-color: #FFFFFF;
			color: #F2AC46;
			border: 1px solid;
		}
	}

	.foot_note {
		text-align: center;
		margin-top: 50rpx;
		color: #666666;
		font-size: 28rpx;
	}

	.image {
		width: 284rpx;
		height: 284rpx;
	}

	.canvas-hide {
		position: fixed;
		z-index: -9999;
		opacity: 0;
	}
</style>
