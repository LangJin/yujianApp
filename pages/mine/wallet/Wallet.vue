<template>
	<view class="wallet">
		<view class="vip_img_box">
			<u-navbar title="钱包" title-color="#333333" title-size="36" back-icon-color="#333333"
				:background="background" :borderBottom="false"></u-navbar>
			<view class="vip_img">
				<image src="@/static/images/mine/vip.png" mode=""></image>
				<view class="img_text">点击查看详情</view>
			</view>
		</view>
		<view class="content">
			<view class="bottom_bg">
				<view class="has_question" @click="payQuestion">
					支付遇到问题?请点击这里
				</view>
				<view class="balance">
					<view class="ba_tit">
						<view>余额（钻）</view>
						<view class="refresh" @click="refresh">
							<image src="@/static/images/mine/refresh.png" mode=""></image>
						</view>
					</view>
					<view class="ba_num">0</view>
				</view>
			</view>
		</view>

		<!-- 支付失败弹窗 -->
		<fail-modal :show="failShow" @close="close"></fail-modal>
	</view>
</template>

<script>
	import indexBackgroundImage from '@/static/images/mine/bag_bg2.png';
	import FailModal from '@/components/payModal/FailModal.vue'

	export default {
		components: {
			FailModal
		},
		data() {
			return {
				indexBackgroundImage: indexBackgroundImage,
				background: {
					background: 'rgba(255, 255, 255, 0)'
				},
				failShow: false
			}
		},
		methods: {
			//支付问题
			payQuestion() {
				this.failShow = true;
			},
			//刷新
			refresh() {

			},
			//关闭支付失败弹窗
			close(){
				this.failShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallet{
		min-height: 100vh;
		background: url(@/static/images/mine/bag_bg.png) no-repeat;
		background-size: 100% 100%;
	}
	.vip_img_box {
		width: 100%;
		height: 326rpx;
		background: url(@/static/images/mine/bag_bg2.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.vip_img {
		width: 600rpx;
		height: 187rpx;
		position: absolute;
		bottom: 0;
		left: 75rpx;
	}

	.img_text {
		position: absolute;
		top: 32rpx;
		left: 240rpx;
		color: #FFFFFF;
		font-size: 20rpx;
	}

	.content {
		text-align: center;
		font-size: 24rpx;
	}

	.has_question {
		color: #B46628;
		padding: 32rpx;
		margin-bottom: 40rpx;
	}

	.ba_tit {
		color: #888888;
		margin-bottom: 40rpx;
		position: relative;

		.refresh {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 32rpx;
			top: 0;
		}
	}

	.ba_num {
		font-size: 60rpx;
		color: #333333;
	}
</style>
