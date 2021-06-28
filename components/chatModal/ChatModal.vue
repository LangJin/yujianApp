<template>
	<!-- 私聊弹窗 -->
	<u-modal v-model="show" width="626" class="c_modal" :show-title="false" :show-confirm-button="false">
		<view class="content">
			<view class="avater">
				<image v-if="imageUrl" :src="imageUrl" mode=""></image>
				<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
			</view>
			<view class="text">
				向对方表达诚意<br/>
				解锁私聊需要消耗100钻石
			</view>
			<view class="text_note">
				24小时未得到女生回复，钻石将退回您的钱包
			</view>
			<u-button class="btn" type="primary" shape="circle" hover-class="none" @click="toVipCenter">使用VIP特权免费解锁</u-button>
			<view class="annotation">
				VIP每月最高解锁310次
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
			show: Boolean,
			imageUrl: String
		},
		data() {
			return {
				
			}
		},
		methods: {
			close(){
				this.$emit('close');
			},
			toVipCenter(){
				this.$emit('toVipCenter')
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
		color: #B46628;
		letter-spacing: 0px;
		position: relative;
	}

	.avater {
		width: 184rpx;
		height: 184rpx;
		border-radius: 50%;
		image{
			border-radius: 50%;
		}
	}
	.text{
		width: 432rpx;
		font-size: 36rpx;
		font-weight: 500;
		margin-top: 58rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}
	.text_note{
		font-size: 20rpx;
		opacity: 0.7;
	}
	.btn{
		width: 506rpx;
		height: 88rpx;
		background-color: #B46628;
		margin-top: 70rpx;
		margin-bottom: 20rpx;
	}
	.annotation{
		font-size: 20rpx;
		opacity: 0.7;
	}
	.close_btn{
		width: 68rpx;
		height: 68rpx;
		position: fixed;
		bottom: 15%;
		left: auto;
	}
</style>
