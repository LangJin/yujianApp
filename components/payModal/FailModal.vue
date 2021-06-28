<template>
	<!-- 支付失败 -->
	<u-modal v-model="show" width="626" class="c_modal" :show-title="false" :show-confirm-button="false">
		<view class="content">
			<view class="avater">
				<image src="@/static/images/vip/icon_logo.png" mode=""></image>
			</view>
			<view class="text">
				如您遇到“支付失败”等问题
				请前往微信公众号“遇见App”
				联系客服解决。
			</view>
			<view class="close_btn" @click="close">
				<image src="@/static/images/home/close.png" mode=""></image>
			</view>
		</view>
	</u-modal>
</template>

<script>
	export default {
		props: {
			show: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			close(){
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 48rpx 60rpx;
		color: #F1CAAB;
		letter-spacing: 0px;
		position: relative;
		border: 1px solid;
		background-color: #4B4E66;
		border-radius: 16rpx;
	}

	.avater {
		width: 164rpx;
		height: 164rpx;
	}
	.text{
		width: 512rpx;
		font-size: 36rpx;
		font-weight: 500;
		margin-top: 58rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}
	.close_btn{
		width: 68rpx;
		height: 68rpx;
		position: fixed;
		bottom: 22%;
		left: auto;
	}
</style>
