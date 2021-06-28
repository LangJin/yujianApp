<template>
	<!-- 支付成功 -->
	<u-mask :show="show">
		<view class="warp">
			<view class="rect" @tap.stop>
				<view v-if="isVip === 1" class="rect_tit">恭喜您已经成功续费</view>
				<view v-else class="rect_tit">恭喜您充值成功</view>
				<view class="vip_info">
					<view>月度VIP会员</view>
					<view class="vip_date">有效期至:2021-06-11</view>
				</view>
				<common-btn :msg="msg" class="sucess_modal" @toNext="close"></common-btn>
			</view>
		</view>
	</u-mask>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	export default{
		props: {
			show: Boolean,
			msg: String,
			isVip: Number
		},
		components: {
			CommonBtn
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
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.rect{
		width: 482rpx;
		height: 580rpx;
		background: url(@/static/images/vip/sucess_bg.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		color: #753E11;
	}
	.rect_tit{
		font-size: 34rpx;
		font-weight: 500;
		margin-top: 40rpx;
	}
	.vip_info{
		margin-top: 188rpx;
		font-size: 24rpx;
		margin-bottom: 110rpx;
		.vip_date{
			color: #BC6F31;
			font-size: 22rpx;
			margin-top: 8rpx;
		}
	}
	.sucess_modal{
		::v-deep.btn{
			width: 300rpx;
			height: 68rpx;
			font-size: 26rpx;
		}
	}
</style>
