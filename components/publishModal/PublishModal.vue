<template>
	<!-- 发布动态弹窗 -->
	<u-modal v-model="show" width="626" class="c_modal" :show-title="false" :show-confirm-button="false">
		<view class="modalContent">
			<view class="modal_icon">
				<image src="@/static/images/dynamic/vip.png" mode=""></image>
			</view>
			<view class="modal_text" v-html="text"></view>
			<common-btn msg="了解VIP" class="white_bg" @toNext="toVipCenter"></common-btn>
			<common-btn msg="成为VIP使用特权" @toNext="toVipCenter"></common-btn>
			<view class="close_btn" @click="close">
				<image src="@/static/images/home/close.png" mode=""></image>
			</view>
		</view>
	</u-modal>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue';
	export default {
		props: {
			show: Boolean,
			text: String
		},
		components: {
			CommonBtn
		},
		data() {
			return {

			}
		},
		methods: {
			toVipCenter() {
				uni.navigateTo({
					url: '/pages/vip/VipCenter'
				})
			},
			//关闭vip弹窗
			close() {
				this.$emit('close');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.modalContent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 48rpx 60rpx;
		color: #B46628;
		letter-spacing: 0px;
		position: relative;
	}

	.modal_icon {
		width: 184rpx;
		height: 184rpx;
	}

	.modal_text {
		width: 432rpx;
		font-size: 36rpx;
		font-weight: 500;
		margin-top: 56rpx;
		margin-bottom: 60rpx;
		text-align: center;
	}

	/deep/.btn {
		width: 506rpx;
		height: 88rpx;
	}

	.white_bg {
		margin-bottom: 37rpx;

		/deep/.btn {
			background-color: #FFFFFF;
			color: #B46628;
			border: 1px solid #B46628;
		}
	}

	.close_btn {
		width: 68rpx;
		height: 68rpx;
		position: fixed;
		bottom: 15%;
		left: auto;
	}
</style>
